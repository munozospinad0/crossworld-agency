// Keyword research — Cross World Agency (Panamá) · SEO/GEO para el sitio nuevo
// Fuente: Google Ads API · KeywordPlanIdeaService.generateKeywordIdeas
// Reusa el método probado en Merge/lg/keywords-hs (token de Merge + cuenta hija del planner).
import {readFileSync, writeFileSync, mkdirSync} from 'fs';

const ENVP = '/home/daniel/clientes/Merge/.meta/google-ads.env';
const env = Object.fromEntries(readFileSync(ENVP, 'utf8').split('\n')
  .filter(l => l.includes('=') && !l.trim().startsWith('#'))
  .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; }));

const V = env.GOOGLE_ADS_API_VER || 'v22';
const MCC = env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
const CID = '2282990954'; // cuenta hija solo para consumir el planner (no se toca nada)
const OUT = '/home/daniel/crossworld/research';
mkdirSync(OUT, {recursive: true});

const tk = await (await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  body: new URLSearchParams({
    client_id: env.GOOGLE_ADS_CLIENT_ID, client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
    refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN, grant_type: 'refresh_token',
  }),
})).json();
if (!tk.access_token) { console.error('AUTH FAIL'); process.exit(1); }

const H = {Authorization: 'Bearer ' + tk.access_token, 'developer-token': env.GOOGLE_ADS_DEVELOPER_TOKEN,
  'Content-Type': 'application/json', 'login-customer-id': MCC};

const HIST = {
  yearMonthRange: {start: {year: 2024, month: 'SEPTEMBER'}, end: {year: 2026, month: 'JULY'}},
  includeAverageCpc: true,
};

// geoTargetConstants: Panamá 2591 · EE.UU. 2840 · Colombia 2170 · Venezuela 2862 · México 2484
const PASSES = {
  en_world: {language: 'languageConstants/1000'},                                   // inglés, mundial
  en_pa_us: {language: 'languageConstants/1000', geoTargetConstants: ['geoTargetConstants/2591', 'geoTargetConstants/2840']},
  es_latam: {language: 'languageConstants/1003', geoTargetConstants: ['geoTargetConstants/2591', 'geoTargetConstants/2170', 'geoTargetConstants/2862', 'geoTargetConstants/2484']},
};

const SEEDS_EN = {
  agencia: ['ship agency panama', 'shipping agency panama', 'ship agent panama', 'port agent panama',
    'maritime agency panama', 'panama canal agent', 'panama canal transit agent', 'panama canal transit services',
    'husbandry services panama', 'husbandry agent', 'protecting agent panama', 'owners protecting agent',
    'crew change panama', 'panama canal booking', 'vessel agent panama', 'ship agency services',
    'port agency services', 'shipping agent colon panama', 'ship agent balboa', 'ship agent cristobal'],
  bunker: ['bunker supply panama', 'bunkering panama', 'marine fuel panama', 'bunker fuel panama',
    'mgo panama', 'vlsfo panama', 'ulsd marine fuel', 'bunker prices panama', 'bunker survey',
    'bunker quantity survey', 'bunker surveyor panama', 'bunker dispute', 'bunker claims',
    'on hire bunker survey', 'off hire bunker survey', 'marine gas oil supplier', 'physical bunker supplier panama',
    'fuel supply fishing vessels panama', 'bunker delivery note', 'bunker quality dispute'],
  survey: ['marine surveyor panama', 'marine survey panama', 'draft survey', 'draught survey',
    'cargo survey panama', 'pre purchase survey vessel', 'pre purchase inspection ship', 'condition survey vessel',
    'p&i condition survey', 'p&i surveyor panama', 'hatch cover ultrasonic test', 'ultrasonic hatch cover testing',
    'tank inspection vessel', 'load securing survey', 'lashing survey', 'cargo damage survey', 'on hire survey',
    'off hire survey', 'ism audit', 'ism code internal audit', 'petroleum inspection', 'cargo inspection company panama',
    'independent marine surveyor', 'loss control survey', 'marine warranty survey', 'project cargo survey',
    'container inspection panama', 'reefer container survey'],
  claims: ['marine claims', 'cargo claims', 'container damage claims', 'reefer container claims',
    'p&i claims handling', 'charterers liability claims', 'marine claims consultant', 'marine claims adjuster',
    'cargo claims handling', 'marine cargo claims', 'steel cargo damage survey', 'personal injury claim seafarer'],
  offshore_sts: ['ship to ship transfer panama', 'sts transfer services', 'ship to ship operations',
    'offshore platform services', 'oil terminal services', 'lightering services', 'sts panama',
    'ship to ship transfer', 'sts mooring master', 'offshore support services'],
  consultoria: ['maritime consultant panama', 'maritime broker panama', 'ship broker panama', 'chartering broker',
    'maritime advisory', 'shipping consultant', 'maritime consulting services', 'ship management panama',
    'maritime services panama', 'shipping company panama', 'ship chandler panama', 'panama maritime services company'],
  info: ['panama canal tolls', 'panama canal transit time', 'panama canal transit cost', 'how to transit panama canal',
    'panama canal requirements', 'panama canal draft restrictions', 'panama canal reservation', 'panama ship registry',
    'panama flag registration', 'panama ports', 'port of balboa', 'port of cristobal', 'panama maritime authority',
    'panama canal neopanamax', 'panama canal schedule', 'crew change regulations panama', 'bunker fuel price panama',
    'panama canal water levels', 'panama canal locks', 'panama canal expansion', 'panama canal delays',
    'panama canal ships per day', 'panama canal fees', 'how much does it cost to cross the panama canal'],
  conquest: ['gac panama', 'wilhelmsen panama', 'inchcape panama', 'leth agencies', 'norton lilly panama',
    'c b fenton', 'boyd steamship', 'adimar shipping', 'panama ship service', 'orca ships agents',
    'associated steamship agents', 'pacific shipping agencies panama', 'cross world agency', 'crossworld agency panama',
    'panama agencies shipping', 'sea shipping agency panama'],
};

const SEEDS_ES = {
  agencia: ['agencia naviera panamá', 'agente naviero panamá', 'agencia marítima panamá', 'agencias navieras en panamá',
    'agente de buques panamá', 'agente portuario panamá', 'tránsito canal de panamá', 'agente canal de panamá',
    'servicios portuarios panamá', 'cambio de tripulación panamá', 'agenciamiento marítimo', 'agencia de barcos panamá',
    'empresas navieras en panamá', 'agencia naviera', 'agente marítimo', 'agencia de aduanas marítima panamá',
    'servicios marítimos panamá', 'empresa marítima panamá'],
  bunker: ['búnker panamá', 'bunker panamá', 'combustible marino panamá', 'suministro de combustible a buques',
    'venta de combustible marino', 'diesel marino panamá', 'bunkering panamá', 'inspección de bunker',
    'survey de bunker', 'precio bunker panamá', 'suministro de combustible marino', 'combustible para barcos',
    'gasoil marino', 'fuel oil marino', 'abastecimiento de combustible buques panamá'],
  inspeccion: ['inspector naval panamá', 'inspección naval panamá', 'inspector marítimo', 'perito naval',
    'peritaje naval', 'inspección de buques', 'inspección de carga', 'survey marítimo', 'draft survey',
    'inspección precompra embarcación', 'auditoría ism', 'inspección de contenedores', 'reclamos marítimos',
    'reclamaciones de carga', 'inspección de tanques buque', 'inspector de carga', 'surveyor marítimo',
    'inspección de bodegas', 'prueba ultrasónica escotillas', 'inspección p&i'],
  consultoria: ['consultor marítimo', 'asesoría marítima panamá', 'corredor marítimo', 'broker marítimo',
    'consultoría naviera', 'asesor naviero', 'gestión de buques panamá', 'armadores panamá', 'fletamento de buques',
    'operaciones ship to ship', 'trasiego de combustible', 'plataformas offshore', 'operaciones offshore panamá',
    'terminal petrolero panamá'],
  info: ['peajes canal de panamá', 'cuánto cuesta cruzar el canal de panamá', 'tiempo de tránsito canal de panamá',
    'registro de buques panamá', 'abanderamiento panamá', 'autoridad marítima de panamá', 'puerto de balboa',
    'puerto de cristóbal', 'requisitos para transitar el canal de panamá', 'canal de panamá barcos por día',
    'reserva de tránsito canal de panamá', 'restricciones de calado canal de panamá', 'esclusas del canal de panamá',
    'bandera panameña buques', 'puertos de panamá', 'cómo funciona el canal de panamá'],
};

const URLS = [
  'https://www.adimarships.com/',
  'https://panamashipservice.com/',
  'https://www.gac.com/panama/shipping/ship-agency',
  'https://lethagencies.com/panama',
  'https://orcashipsagents.com/',
  'https://www.24marine.com/',
  'https://crossworldagency.com/',
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function ideas(pass, base, seedObj, tag, store, stats) {
  let pageToken = null, page = 0;
  do {
    const body = {...base, keywordPlanNetwork: 'GOOGLE_SEARCH', includeAdultKeywords: false,
      historicalMetricsOptions: HIST, ...seedObj};
    if (pageToken) body.pageToken = pageToken;
    let r, tries = 0;
    while (true) {
      r = await fetch(`https://googleads.googleapis.com/${V}/customers/${CID}:generateKeywordIdeas`,
        {method: 'POST', headers: H, body: JSON.stringify(body)});
      stats.calls++;
      if (r.ok || (r.status !== 503 && r.status !== 429) || tries >= 4) break;
      tries++; await sleep(1500 * tries);
    }
    if (!r.ok) {
      const t = await r.text();
      console.error('ERR', pass, tag, r.status, t.slice(0, 300));
      return;
    }
    const j = await r.json();
    for (const x of j.results || []) {
      const m = x.keywordIdeaMetrics || {};
      const k = x.text;
      if (!store.has(k)) {
        store.set(k, {
          kw: k,
          avg: Number(m.avgMonthlySearches || 0),
          comp: m.competition || 'UNKNOWN',
          compIdx: Number(m.competitionIndex || 0),
          bidLow: Number(m.lowTopOfPageBidMicros || 0) / 1e6,
          bidHigh: Number(m.highTopOfPageBidMicros || 0) / 1e6,
          cpc: Number(m.averageCpcMicros || 0) / 1e6,
          serie: (m.monthlySearchVolumes || []).map(s => ({y: +s.year, m: s.month, v: +s.monthlySearches})),
          tags: [tag],
        });
      } else if (!store.get(k).tags.includes(tag)) store.get(k).tags.push(tag);
    }
    pageToken = j.nextPageToken || null;
    page++;
  } while (pageToken && page < 2);
  console.error(`  [${pass}] ${tag}: acumulado ${store.size} (${stats.calls} llamadas)`);
}

for (const [pass, base] of Object.entries(PASSES)) {
  const store = new Map(); const stats = {calls: 0};
  const SEEDS = pass === 'es_latam' ? SEEDS_ES : SEEDS_EN;
  for (const [tag, kws] of Object.entries(SEEDS)) {
    // el planner acepta máx 20 keywords por semilla
    for (let i = 0; i < kws.length; i += 20) {
      await ideas(pass, base, {keywordSeed: {keywords: kws.slice(i, i + 20)}}, tag + (i ? '_' + (i / 20 + 1) : ''), store, stats);
    }
  }
  if (pass !== 'es_latam') {
    for (const u of URLS) await ideas(pass, base, {urlSeed: {url: u}}, 'url:' + new URL(u).hostname.replace('www.', ''), store, stats);
  }
  const out = [...store.values()].sort((a, b) => b.avg - a.avg);
  writeFileSync(`${OUT}/kw_raw_${pass}.json`, JSON.stringify(out, null, 1));
  console.error(`\n== ${pass}: ${out.length} keywords · ${stats.calls} llamadas -> kw_raw_${pass}.json\n`);
}
console.error('LISTO');
