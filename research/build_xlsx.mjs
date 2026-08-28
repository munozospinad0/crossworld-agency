// Entregable Excel del keyword research de Cross World (formato tipo LG): resumen, mapa por página, 3 pasadas, excluidas.
import ExcelJS from 'exceljs';
import {readFileSync} from 'fs';
const DIR = '/home/daniel/crossworld/research';
const OUT = `${DIR}/KEYWORD RESEARCH - Cross World Agency - ago 2026.xlsx`;
const PASSES = [['en_world', 'EN mundial'], ['en_pa_us', 'EN Panamá + EE.UU.'], ['es_latam', 'ES LATAM']];
const NAVY = 'FF0E1620', COB = 'FF1F4FD8', SOFT = 'FFE6ECFB', PAPER = 'FFF5F7F9', LINE = 'FFDBE1E7';
const wb = new ExcelJS.Workbook();
wb.creator = 'ECUS Agency'; wb.created = new Date('2026-08-28');

function head(ws, cols) {
  ws.columns = cols.map(c => ({header: c.h, key: c.k, width: c.w}));
  const r = ws.getRow(1); r.height = 24;
  r.eachCell(c => { c.font = {bold: true, color: {argb: 'FFFFFFFF'}, name: 'Calibri', size: 11}; c.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: NAVY}}; c.alignment = {vertical: 'middle'}; c.border = {bottom: {style: 'thin', color: {argb: COB}}}; });
  ws.views = [{state: 'frozen', ySplit: 1}];
  ws.autoFilter = {from: {row: 1, column: 1}, to: {row: 1, column: cols.length}};
}
function zebra(ws) { ws.eachRow((row, i) => { if (i === 1) return; row.eachCell(c => { c.border = {bottom: {style: 'hair', color: {argb: LINE}}}; if (i % 2 === 0) c.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: PAPER}}; }); }); }

// ---- Portada / Resumen ----
const res = JSON.parse(readFileSync(`${DIR}/kw_resumen.json`, 'utf8'));
const ws0 = wb.addWorksheet('Resumen');
ws0.columns = [{width: 40}, {width: 22}, {width: 22}, {width: 22}, {width: 60}];
ws0.getCell('A1').value = 'Keyword research · Cross World Agency (Panamá)';
ws0.getCell('A1').font = {bold: true, size: 18, color: {argb: NAVY}};
ws0.getCell('A2').value = 'Google Ads Keyword Planner · 27 de agosto de 2026 · 3 pasadas · 23 meses de histórico (sep-2024 a jul-2026) · deduplicado por concepto · ECUS Agency';
ws0.getCell('A2').font = {color: {argb: 'FF66727F'}, size: 10};
ws0.mergeCells('A2:E2');
let r = 4;
const put = (a, b, c, d, e, bold) => { const row = ws0.getRow(r++); row.values = [a, b, c, d, e]; if (bold) row.font = {bold: true}; };
put('Pasada', 'Keywords crudas', 'Conceptos únicos', 'Útiles (sin ruido)', 'Volumen útil / mes', true);
ws0.getRow(r - 1).eachCell(c => { c.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: SOFT}}; });
for (const [k, name] of PASSES) { const p = res[k]; put(name, p.crudas, p.conceptos, p.utiles, p.volumenUtil); }
r++;
put('Hallazgos', '', '', '', '', true);
[
  'El nicho transaccional en Google es minúsculo: "panama canal transit agent" 20/mes (+83% anual), "panama canal agent" 30-40, "ship agency panama" 10-30, "marine surveyor panama" 10, "bunkering panama" 20. Todo con competencia LOW: ser #1 es cuestión de semanas.',
  'El volumen está en el clúster informativo del Canal: costo/peajes ~2.900, booking y schedule ~1.000, puertos (Balboa, Cristóbal, Manzanillo) ~12.000 EN+ES, AMP/registro/ACP ~4.000, y ~3.000 en español donde ningún competidor publica.',
  'Estacionalidad (EN, Panamá+EE.UU.): picos en diciembre (2,08x) y enero (1,85x); valle en agosto (0,39x). Lanzar antes de noviembre.',
  'Marca débil: "cross world agency" 10-30/mes vs "gac panama" 1.300. Google confunde la marca con Cross Roads Agencies: construir entidad (GBP, schema, contenido firmado).',
  'Excluido a propósito: "panama canal" genérico (368.000, turismo/historia), "agency marketing", "freight forwarding", cruceros, empleos, Miraflores Visitor Center. Traen tráfico que no convierte.',
  'CPC en COP en el planner (cuenta del planner en pesos); en el archivo se muestra convertido a USD (÷ 4.100). Casi todo el nicho está entre USD 0,5 y 5.',
].forEach(t => { const row = ws0.getRow(r++); row.values = [t]; ws0.mergeCells(`A${r - 1}:E${r - 1}`); row.alignment = {wrapText: true, vertical: 'top'}; row.height = Math.ceil(t.length / 130) * 17 + 8; });
r++;
const hdrRow = r++;
ws0.getRow(hdrRow).values = ['Curva mensual (1 = promedio)', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
ws0.getRow(hdrRow).font = {bold: true};
ws0.getRow(hdrRow).eachCell(c => { c.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: SOFT}}; });
for (const [k, name] of PASSES) { const row = ws0.getRow(r++); row.values = [name, ...res[k].curvaServicios]; row.eachCell((c, i) => { if (i > 1) c.numFmt = '0.00'; }); }
for (let i = 2; i <= 13; i++) ws0.getColumn(i).width = i <= 5 ? 22 : 8;

// ---- Mapa keyword → página ----
const ws1 = wb.addWorksheet('Mapa por página');
head(ws1, [{h: 'Página', k: 'p', w: 36}, {h: 'Keyword principal', k: 'kw', w: 38}, {h: 'Vol./mes', k: 'v', w: 12}, {h: 'Secundarias', k: 's', w: 90}, {h: 'CTA', k: 'c', w: 26}]);
[
  ['Ship agency & Canal transit', 'panama canal transit agent', '20 (+83% yoy)', 'panama canal agent 30-40 · panama shipping agency 10-30 · ship agent panama · husbandry services panama · crew change panama 10 · panama canal booking 320 (HIGH, vía contenido)', 'Request a port call'],
  ['Marine surveys', 'marine surveyor panama', '10', 'marine survey 2.900-8.100 (global) · draft survey 1.600 · condition surveys 320 (+488%) · petroleum inspection 210 · marine inspection 140 · underwater inspection of ships 140', 'Request a surveyor'],
  ['Bunker surveys & claims', 'bunker survey', 'long tail', 'bunker cost 480-720 · bunker rates 260-2.900 · bunker pricing 210-2.400 · bunker quality dispute · on/off hire bunker survey', 'Request a bunker surveyor'],
  ['Bunkering & oil operations', 'bunkering panama', '10-20', 'marine fuel panama 10 · bunker fuel panama 10 · mgo panama 10 · marine fuels 880-2.400 · fuel for ship 390-2.900 · ES combustible de barco 170 (+137%) · combustible para barcos 110 · trasiego de combustible 210', 'Request a fuel quote'],
  ['Ship-to-ship & offshore', 'sts panama', '40', 'ship to ship transfer 140-1.900 · ship to ship transfer guide 210 · offshore services 140-1.300 · maritime offshore 260 · ES plataformas offshore 210', 'Plan an STS operation'],
  ['Marine claims', 'cargo claims', '260', 'marine claims · container damage claims · charterers liability claims · p&i claims handling', 'Report a claim'],
  ['Consulting & brokerage', 'maritime consulting', '90-590', 'ship broker 720-3.600 · chartering broker 880-1.600 · chartering services 590-1.600 · maritime services panama 10-20 · ES contratos de fletamento 140 · agente naviero 210 · agencia naviera 170', 'Talk to the captain'],
  ['Home / marca', 'panama shipping company', '210-320', 'shipping agency panama · agencias navieras en panamá 30 · navieras en panamá 20 · agencias marítimas en panamá 10 · crossworld maritime agency 30 · cross world agency 10', 'Request a port call'],
  ['Guía pilar: Canal transit cost & tolls', 'panama canal fee / price / rates / cost', '880 (PA+US 390)', 'how much does it cost to transit the panama canal 480 · panama canal toll 320 · cost to go through panama canal 320 · transit fee 170 · crossing fee 170 · cost per ship 90', 'Request a transit PDA'],
  ['Guía: booking & schedule', 'panama canal booking', '320', 'panama canal schedule 260 · ship schedule 170 · transit schedule 140 · pre booking 10 · booking system 10', 'Request a transit PDA'],
  ['Guía de puerto: Balboa', 'port of balboa', '1.900', 'balboa port panama 1.900 · balboa port terminal 880 · ES puerto de balboa 2.900 · puerto balboa 1.300', 'Request a port call'],
  ['Guía de puerto: Cristóbal / Colón', 'port of cristobal', '1.600', 'cristobal panama 1.300 · ES puerto de colón 170 · navieras en colon 20', 'Request a port call'],
  ['Guía de puerto: Manzanillo', 'manzanillo panama', '3.600', 'manzanillo panama port 590', 'Request a port call'],
  ['Guía: AMP y registro', 'panama maritime authority', '1.000', 'panama ship registry 480 · panama canal authority 1.600 · ES autoridad marítima de panamá 1.000 (+98%)', 'Talk to the captain'],
  ['Guía: precios de bunker', 'bunker rates', '2.900', 'bunker cost 720 · bunker pricing 2.400 · ES gasoil marino precio', 'Request a fuel quote'],
  ['Guía ES: cómo funciona el Canal', 'canal de panamá cómo funciona', '880-1.600', 'esclusas del canal 210-880 · esclusas de gatún 480 · cuánto cuesta cruzar el canal 50-70 · reserva de tránsito · calado', 'Solicitar port call'],
  ['Comparativa: how to choose a ship agent in Panama', 'gac panama', '1.300', 'norton lilly panama 480 · cb fenton 260 · inchcape panama 210 · adimar shipping 90 · leth agencies 140 · boyd steamship 50', 'Request a port call'],
].forEach(v => ws1.addRow(v));
ws1.eachRow(row => { row.alignment = {wrapText: true, vertical: 'top'}; });
zebra(ws1);

// ---- Pasadas ----
const csv = readFileSync(`${DIR}/keyword-research-crossworld.csv`, 'utf8').replace(/^﻿/, '').split('\n').filter(Boolean);
const hdr = csv[0].split(',');
function parse(line) { const out = []; let cur = '', q = false; for (let i = 0; i < line.length; i++) { const ch = line[i]; if (ch === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; } else if (ch === ',' && !q) { out.push(cur); cur = ''; } else cur += ch; } out.push(cur); return out; }
const rows = csv.slice(1).map(parse).map(a => Object.fromEntries(hdr.map((h, i) => [h, a[i]])));
const cols = [{h: 'Keyword', k: 'keyword', w: 44}, {h: 'Segmento', k: 'segmento', w: 14}, {h: 'Intención', k: 'intencion', w: 14}, {h: 'Encaje', k: 'encaje', w: 16}, {h: 'Búsquedas/mes', k: 'busquedas_mes', w: 14}, {h: 'Competencia', k: 'competencia', w: 12}, {h: 'Índice comp.', k: 'idx_comp', w: 11}, {h: 'CPC USD', k: 'cpc_usd', w: 10}, {h: 'Puja baja USD', k: 'puja_baja', w: 12}, {h: 'Puja alta USD', k: 'puja_alta', w: 12}, {h: 'Var. anual %', k: 'var_anual_pct', w: 11}, {h: 'Pico (mes)', k: 'pico_mes', w: 10}, {h: 'Variantes', k: 'variantes', w: 10}, {h: 'Otras variantes', k: 'otras_variantes', w: 50}];
const ORDER = {SERVICIO_PANAMA: 0, SERVICIO: 1, BLOG_CORE: 2, BLOG_GENERAL: 3, CONQUEST: 4, REVISAR: 5, EXCLUIR: 6};
for (const [k, name] of PASSES) {
  const ws = wb.addWorksheet(name);
  head(ws, cols);
  rows.filter(x => x.pass === k && x.encaje !== 'EXCLUIR').sort((a, b) => (ORDER[a.encaje] - ORDER[b.encaje]) || (+b.busquedas_mes - +a.busquedas_mes)).forEach(x => {
    ws.addRow({keyword: x.keyword, segmento: x.segmento, intencion: x.intencion, encaje: x.encaje, busquedas_mes: +x.busquedas_mes, competencia: x.competencia, idx_comp: +x.idx_comp,
      cpc_usd: +(x.cpc_usd / 4100).toFixed(2), puja_baja: +(x.puja_baja / 4100).toFixed(2), puja_alta: +(x.puja_alta / 4100).toFixed(2), var_anual_pct: x.var_anual_pct === '' ? null : +x.var_anual_pct, pico_mes: +x.pico_mes, variantes: +x.variantes, otras_variantes: x.otras_variantes});
  });
  ws.getColumn('busquedas_mes').numFmt = '#,##0'; ['cpc_usd', 'puja_baja', 'puja_alta'].forEach(c => ws.getColumn(c).numFmt = '$#,##0.00'); ws.getColumn('var_anual_pct').numFmt = '0"%"';
  ws.addConditionalFormatting({ref: `E2:E${ws.rowCount}`, rules: [{type: 'dataBar', minLength: 0, maxLength: 100, cfvo: [{type: 'min'}, {type: 'max'}], color: {argb: COB}, gradient: true}]});
  ws.addConditionalFormatting({ref: `D2:D${ws.rowCount}`, rules: [{type: 'containsText', operator: 'containsText', text: 'SERVICIO_PANAMA', style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: SOFT}}, font: {bold: true, color: {argb: COB}}}}]});
  zebra(ws);
}
// ---- Excluidas ----
const wsx = wb.addWorksheet('Excluidas (ruido)');
head(wsx, [{h: 'Pasada', k: 'pass', w: 12}, {h: 'Keyword', k: 'keyword', w: 44}, {h: 'Búsquedas/mes', k: 'v', w: 14}, {h: 'Por qué se excluye', k: 'why', w: 60}]);
const why = t => /cruise|crucero|tour|ferry|visitor|museum|history|historia/.test(t) ? 'Turismo / historia' : /marketing|advertis|analytics|media|staffing|recruit|freight|forward|vehicle|car shipping/.test(t) ? 'Otra industria (agencias de marketing, forwarding, vehículos)' : /survey world|surveymonkey|smart survey|company survey|online survey|questionnaire|land survey|quantity surveyor/.test(t) ? 'Encuestas / topografía, no marítimo' : /jobs?\b|empleo|vacante|salary|career|curso|course|school/.test(t) ? 'Empleo / formación' : /^(panama canal|canal de panama|panamanian canal|panama de canal|canal panama)$/.test(t) ? 'Genérico sin intención de servicio' : 'Fuera del portafolio';
rows.filter(x => x.encaje === 'EXCLUIR' && +x.busquedas_mes >= 100).sort((a, b) => +b.busquedas_mes - +a.busquedas_mes).slice(0, 400).forEach(x => wsx.addRow({pass: x.pass, keyword: x.keyword, v: +x.busquedas_mes, why: why(x.keyword.toLowerCase())}));
wsx.getColumn('v').numFmt = '#,##0'; zebra(wsx);

await wb.xlsx.writeFile(OUT);
console.log('OK', OUT, 'hojas:', wb.worksheets.map(w => `${w.name} (${w.rowCount})`).join(' · '));
