// Cuarta pasada del keyword research: espanol limitado a PANAMA (geoTargetConstants/2591).
//
// Por que hacia falta: las tres pasadas del 28-ago miden inglés mundial, inglés Panama+EEUU y
// español agregando Panama+Colombia+Venezuela+Mexico. Esa ultima no permite saber cuanto se busca
// DESDE Panama, que es justo lo que hay que saber antes de decidir cuanto contenido en espanol
// escribir. Esta pasada lo separa y compara contra la agregada.
//
// Fuente: Google Ads API, KeywordPlanIdeaService.generateKeywordIdeas, credenciales de la agencia.
// No modifica ninguna cuenta: el planner es de solo lectura.
import {readFileSync, writeFileSync} from 'fs';

const ENVP = '/home/daniel/clientes/Merge/.meta/google-ads.env';
const env = Object.fromEntries(readFileSync(ENVP, 'utf8').split('\n')
  .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
  .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; }));

const V = env.GOOGLE_ADS_API_VER || 'v22';
const MCC = env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
const CID = '2282990954'; // cuenta hija solo para consumir el planner
const OUT = '/home/daniel/crossworld/research';

const tk = await (await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  body: new URLSearchParams({
    client_id: env.GOOGLE_ADS_CLIENT_ID,
    client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
    refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  }),
})).json();
if (!tk.access_token) { console.error('AUTH FAIL'); process.exit(1); }

const H = {
  Authorization: 'Bearer ' + tk.access_token,
  'developer-token': env.GOOGLE_ADS_DEVELOPER_TOKEN,
  'Content-Type': 'application/json',
  'login-customer-id': MCC,
};

const BASE = {
  language: 'languageConstants/1003',            // español
  geoTargetConstants: ['geoTargetConstants/2591'], // SOLO Panamá
  historicalMetricsOptions: {
    yearMonthRange: {start: {year: 2024, month: 'SEPTEMBER'}, end: {year: 2026, month: 'JULY'}},
    includeAverageCpc: true,
  },
};

// Las semillas que concentran el volumen segun el estudio de agosto.
const SEEDS = [
  ['info', ['peajes canal de panamá', 'cuánto cuesta cruzar el canal de panamá', 'autoridad marítima de panamá',
    'puerto de balboa', 'puerto de cristóbal', 'esclusas del canal de panamá', 'cómo funciona el canal de panamá',
    'reserva de tránsito canal de panamá', 'puertos de panamá', 'requisitos para transitar el canal de panamá',
    'restricciones de calado canal de panamá', 'canal de panamá barcos por día']],
  ['agencia', ['agencia naviera panamá', 'agente naviero panamá', 'agencia marítima panamá', 'agencias navieras en panamá',
    'tránsito canal de panamá', 'agente canal de panamá', 'cambio de tripulación panamá', 'servicios marítimos panamá']],
  ['tecnico', ['inspector naval panamá', 'inspección de buques', 'draft survey', 'survey de bunker',
    'combustible marino panamá', 'bunkering panamá', 'reclamaciones de carga', 'operaciones ship to ship']],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const store = new Map();
let calls = 0;

for (const [tag, kws] of SEEDS) {
  let pageToken = null;
  do {
    const body = {...BASE, keywordSeed: {keywords: kws}, pageSize: 1000};
    if (pageToken) body.pageToken = pageToken;
    const res = await fetch(`https://googleads.googleapis.com/${V}/customers/${CID}:generateKeywordIdeas`, {
      method: 'POST', headers: H, body: JSON.stringify(body),
    });
    calls++;
    if (!res.ok) { console.error('ERR', tag, res.status, (await res.text()).slice(0, 300)); break; }
    const j = await res.json();
    for (const r of j.results ?? []) {
      const m = r.keywordIdeaMetrics ?? {};
      store.set(r.text, {
        keyword: r.text,
        vol: Number(m.avgMonthlySearches ?? 0),
        comp: m.competition ?? 'UNKNOWN',
        idx: Number(m.competitionIndex ?? 0),
        tag,
      });
    }
    pageToken = j.nextPageToken ?? null;
    await sleep(400);
  } while (pageToken);
  console.error(`  [${tag}] acumulado ${store.size} (${calls} llamadas)`);
}

const rows = [...store.values()].sort((a, b) => b.vol - a.vol);
writeFileSync(`${OUT}/kw_panama_es.json`, JSON.stringify(rows, null, 1));
console.error(`\n== espanol solo Panama: ${rows.length} keywords · ${calls} llamadas`);

// Comparacion contra la pasada agregada de 4 paises.
const csv = readFileSync(`${OUT}/keyword-research-crossworld.csv`, 'utf8').split('\n').filter(Boolean);
const split = (line) => {
  const out = []; let cur = ''; let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q; else if (ch === ',' && !q) { out.push(cur); cur = ''; } else cur += ch;
  }
  out.push(cur); return out;
};
const head = split(csv[0]).map((h) => h.trim());
const I = Object.fromEntries(head.map((h, i) => [h, i]));
const latam = new Map();
for (const line of csv.slice(1)) {
  const r = split(line);
  if (r[I.pass] === 'es_latam') latam.set((r[I.keyword] ?? '').toLowerCase().trim(), Number(r[I.busquedas_mes] || 0));
}

console.log('\nkeyword                                  PANAMA   4 PAISES   % Panama');
for (const r of rows.slice(0, 25)) {
  const l = latam.get(r.keyword.toLowerCase().trim());
  const pct = l ? Math.round((r.vol / l) * 100) + '%' : '—';
  console.log(`${r.keyword.slice(0, 38).padEnd(40)} ${String(r.vol).padStart(6)} ${String(l ?? '—').padStart(10)} ${pct.padStart(10)}`);
}
const totPa = rows.reduce((s, r) => s + r.vol, 0);
console.log(`\nTOTAL Panama en estas semillas: ${totPa.toLocaleString('es')} busquedas/mes`);
