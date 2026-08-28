// Analiza las 3 pasadas del planner: deduplica por concepto, clasifica segmento/intención/encaje,
// calcula estacionalidad y variación anual, y deja CSV + JSON listos para el plan.
import {readFileSync, writeFileSync} from 'fs';
const DIR = '/home/daniel/crossworld/research';
const PASSES = ['en_world', 'en_pa_us', 'es_latam'];

const MES = {JANUARY: 1, FEBRUARY: 2, MARCH: 3, APRIL: 4, MAY: 5, JUNE: 6, JULY: 7, AUGUST: 8,
  SEPTEMBER: 9, OCTOBER: 10, NOVEMBER: 11, DECEMBER: 12};
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const STOP = new Set(['de', 'la', 'el', 'en', 'con', 'para', 'y', 'a', 'las', 'los', 'un', 'una', 'del', 'al',
  'the', 'of', 'in', 'for', 'to', 'and', 'an', 'at', 'on', 'by', 'is', 'what', 'que', 'por']);
function lema(w) {
  w = w.replace(/&/g, 'and');
  const map = {agencies: 'agency', services: 'service', ships: 'ship', vessels: 'vessel', surveys: 'survey',
    surveyors: 'surveyor', claims: 'claim', agents: 'agent', ports: 'port', tolls: 'toll', fees: 'fee',
    draught: 'draft', bunkers: 'bunker', bunkering: 'bunker', inspections: 'inspection', companies: 'company',
    navieras: 'naviera', navieros: 'naviero', agencias: 'agencia', agentes: 'agente', buques: 'buque', barcos: 'barco',
    puertos: 'puerto', peajes: 'peaje', inspecciones: 'inspeccion', inspectores: 'inspector', maritimos: 'maritimo',
    maritimas: 'maritimo', maritima: 'maritimo', costos: 'costo', precios: 'precio', empresas: 'empresa'};
  if (map[w]) return map[w];
  if (w.length > 4 && /ies$/.test(w)) return w.slice(0, -3) + 'y';
  if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
  return w;
}
const clave = t => norm(t).replace(/[^a-z0-9ñ& ]/g, ' ').split(/\s+/).filter(w => w && !STOP.has(w)).map(lema).sort().join('|');

// ---- clasificación ----
const EXCL = /(cruise|crucero|tour\b|tours|ferry|charter a yacht|yacht charter|yacht rental|boat rental|alquiler|jobs?\b|empleo|vacante|salary|salario|career|curso|course|school|escuela|universidad|wikipedia|history|historia|documentary|documental|movie|pelicula|museum|museo|hotel|airbnb|flights?|vuelo|dhl|fedex|ups\b|courier|paquete|parcel|package|envio|shipping to|shipping from|freight rate|amazon|ebay|container house|contenedor casa|venta de contenedor|container for sale|used container|casino|game|juego|lego|model kit|maqueta|toy|juguete|visa|pasaporte|passport|weather|clima|earthquake|terremoto|map\b|mapa|webcam|live cam|camera|photos|fotos|images|imagenes|pdf|ppt|wallpaper|quiz|trivia|song|cancion|lyrics|crossword|crucigrama|worldagency|world agency travel|agencia de viajes|travel agency|marketing|advertis|analytics|media agenc|digital agenc|design agenc|staffing|recruit|talent|insurance agenc|real estate|travel|vehicle|car shipping|auto shipping|freight forward|forwarder|survey world|surveymonkey|smart survey|company survey|customer survey|online survey|survey app|survey software|questionnaire|land survey|surveying equipment|quantity surveyor|building survey|property survey|drone survey|suez|egypt|us canal|erie|visitor center|centro de visitantes|miraflores visitor|estatua|gasolina|motor barca|scale model|3d model|how long is|how wide|when was|who built|quien construyo|built the|length of|width of|panama city panama canal|canal cross\b|panama cl\b|find vessel|vessel tracking|find ship|imo testing|ship's parts|towage|tug boat for sale|for sale|barco en venta|vessels for sale|container ship\b|cargo ship\b|gas tanker|owner ship|international ship\b|ship services\b|shipping services\b|port of calls|authority port|shipping authority|maritime medical|hospital|clinic)/;
// contexto marítimo obligatorio para agencia/survey (si no, "agency marketing" o "survey world" se cuelan)
const MAR = /(ship|vessel|port|maritim|marine|cargo|canal|husbandry|crew|transit|naviera|naviero|buque|barco|steamship|protecting|bunker|hull|hatch|p&i|tank|container|ism\b|petroleum|loss control|warranty|on hire|off hire|pre purchase|prepurchase|condition survey|naval|carga|embarcaci|tripulaci|draft survey|draught|tanker|charter|fletament|offshore|sts\b|lightering|terminal|boat|yacht|velero|armador|shipowner|owner)/;
const SEG = [
  ['CONQUEST', /(\bgac\b|wilhelmsen|inchcape|\bleth\b|norton lilly|fenton|boyd|adimar|panama ship service|orca ships|associated steamship|pacific shipping|cross ?world)/],
  ['BUNKER', /(bunker|búnker|fuel|mgo\b|vlsfo|ulsd|gas oil|gasoil|gasóleo|diesel|combustible|fueloil)/],
  ['SURVEY', /(survey|inspect|inspec|surveyor|audit|ultrason|draft survey|draught|perit|hatch cover|\bism\b|loss control|warranty)/],
  ['CLAIMS', /(claim|reclam|damage|daño|liability|injury|adjust)/],
  ['STS_OFFSHORE', /(ship to ship|\bsts\b|offshore|lightering|oil terminal|terminal petrol|platform|plataforma|trasiego|mooring master)/],
  ['AGENCIA', /(agenc|agent|husbandry|port call|crew change|cambio de tripul|protecting|booking|reserva de tr|transit service|transit agent|servicios portuarios|agenciamiento|naviera|naviero|steamship|consignatari)/],
  ['CONSULT', /(consult|advis|broker|asesor|corredor|charter|fletament|ship management|gestión de buques|gestion de buques|maritime services|servicios mar[ií]timos|shipping company|empresa mar[ií]tima|maritime company|ship chandler|chandler|shipowner|armador)/],
  ['INFO_CANAL', /(canal|toll|peaje|registry|registro|flag|bandera|abandera|authority|autoridad|port of|puerto|balboa|cristobal|cristóbal|neopanamax|lock|esclusa|manzanillo|colon container)/],
];
const INFO_RX = /(how|what|why|when|cost|cuanto|cuánto|como|cómo|qué|que es|requirement|requisito|time|tiempo|schedule|water|level|expansion|delay|per day|por dia|por día|toll|peaje|fee|price|precio|rate|tarifa|list|lista|meaning|significado|definition|definicion|funciona|works|regulation|restriction|restricci|guide|guia)/;
const SERVICE_WORDS = /(service|servicio|company|empresa|agency|agencia|agent|agente|provider|supplier|proveedor|surveyor|inspector|consultant|consultor|near me|cerca|contractor|firm|chandler|broker|corredor)/;
const GEO_RX = /(panama|panamá|colon|colón|balboa|cristobal|cristóbal|manzanillo)/;
// info del canal que SÍ nos sirve como blog núcleo (decisiones de armadores/operadores), vs info general
const BLOG_CORE = /(toll|peaje|fee|cost|cuanto|cuánto|price|precio|rate|tarifa|transit time|tiempo de tr|requirement|requisito|booking|reserva|draft|calado|restriction|restricci|schedule|ships per day|barcos por|delay|congestion|water level|nivel|neopanamax|registry|registro|flag|bandera|abandera|authority|autoridad|port of|puerto|balboa|cristobal|cristóbal|manzanillo|crew change|regulation|bunker|surcharge|lng|tanker|vessel size|dimensions|beam|length)/;

function segmento(t) {
  for (const [s, rx] of SEG) {
    if (!rx.test(t)) continue;
    if ((s === 'AGENCIA' || s === 'SURVEY' || s === 'CONSULT' || s === 'CLAIMS') && !MAR.test(t)) return 'FUERA';
    return s;
  }
  return 'OTRO';
}
function intencion(t, seg) {
  if (seg === 'CONQUEST') return 'NAVEGACIONAL';
  if (seg === 'INFO_CANAL') return SERVICE_WORDS.test(t) && !INFO_RX.test(t) ? 'COMERCIAL' : 'INFORMACIONAL';
  if (INFO_RX.test(t) && !SERVICE_WORDS.test(t)) return 'INFORMACIONAL';
  return (SERVICE_WORDS.test(t) || GEO_RX.test(t)) ? 'COMERCIAL' : 'GENERICA';
}
function encaje(t, seg, intent) {
  if (EXCL.test(t) || seg === 'FUERA') return 'EXCLUIR';
  if (seg === 'CONQUEST') return 'CONQUEST';
  if (seg === 'OTRO') return 'REVISAR';
  if (seg === 'INFO_CANAL') {
    if (intent === 'COMERCIAL') return GEO_RX.test(t) ? 'SERVICIO_PANAMA' : 'SERVICIO';
    if (/^(panama canal|canal de panama|el canal de panama|panamanian canal|panama de canal|canal panama)$/.test(t)) return 'EXCLUIR';
    return BLOG_CORE.test(t) ? 'BLOG_CORE' : 'BLOG_GENERAL';
  }
  if (intent === 'INFORMACIONAL') return 'BLOG_CORE';
  return GEO_RX.test(t) ? 'SERVICIO_PANAMA' : 'SERVICIO';
}

const resumen = {};
const csv = [['pass', 'keyword', 'segmento', 'intencion', 'encaje', 'busquedas_mes', 'competencia', 'idx_comp', 'cpc_usd', 'puja_baja', 'puja_alta', 'var_anual_pct', 'pico_mes', 'variantes', 'otras_variantes', 'tags'].join(',')];
const q = s => '"' + String(s).replace(/"/g, '""') + '"';

for (const pass of PASSES) {
  let raw;
  try { raw = JSON.parse(readFileSync(`${DIR}/kw_raw_${pass}.json`, 'utf8')); } catch { console.error('falta', pass); continue; }
  const grupos = new Map();
  for (const o of raw) {
    if (!o.avg) continue; // sin volumen = no sirve para el plan
    const k = clave(o.kw) + '#' + o.avg;
    if (!grupos.has(k)) grupos.set(k, []);
    grupos.get(k).push(o);
  }
  const conceptos = [];
  for (const [, arr] of grupos) {
    arr.sort((a, b) => a.kw.length - b.kw.length || a.kw.localeCompare(b.kw));
    const rep = arr[0];
    const t = norm(rep.kw);
    const seg = segmento(t); const intent = intencion(t, seg); const enc = encaje(t, seg, intent);
    // serie: 23 meses sep-2024..jul-2026 → var anual: (ago25-jul26) vs (sep24-jul25 escalado a 12)
    const byKey = {}; for (const p of rep.serie) byKey[p.y * 100 + MES[p.m]] = p.v;
    let ult = 0, prev = 0, nPrev = 0;
    for (const [k, v] of Object.entries(byKey)) { const n = +k; if (n >= 202508) ult += v; else { prev += v; nPrev++; } }
    const varAnual = nPrev && prev ? ((ult / (prev * 12 / nPrev)) - 1) * 100 : null;
    const porMes = Array(13).fill(0); for (const p of rep.serie) porMes[MES[p.m]] += p.v;
    const pico = porMes.indexOf(Math.max(...porMes.slice(1)));
    conceptos.push({...rep, pass, seg, intent, enc, varAnual, pico, variantes: arr.length, otras: arr.slice(1, 4).map(x => x.kw)});
  }
  conceptos.sort((a, b) => b.avg - a.avg);
  writeFileSync(`${DIR}/kw_conceptos_${pass}.json`, JSON.stringify(conceptos, null, 1));

  const util = conceptos.filter(c => c.enc !== 'EXCLUIR' && c.enc !== 'REVISAR');
  const sum = a => a.reduce((x, y) => x + y.avg, 0);
  const porSeg = {}; const porEnc = {};
  for (const c of util) { porSeg[c.seg] = (porSeg[c.seg] || 0) + c.avg; porEnc[c.enc] = (porEnc[c.enc] || 0) + c.avg; }
  // curva mensual agregada (servicios) para estacionalidad
  const curva = Array(13).fill(0);
  for (const c of util.filter(x => x.enc.startsWith('SERVICIO'))) for (const p of c.serie) curva[MES[p.m]] += p.v;
  const prom = curva.slice(1).reduce((a, b) => a + b, 0) / 12;
  resumen[pass] = {
    crudas: raw.length, conVolumen: raw.filter(o => o.avg).length, conceptos: conceptos.length, utiles: util.length,
    volumenUtil: sum(util), porSegmento: porSeg, porEncaje: porEnc,
    curvaServicios: curva.slice(1).map(v => +(v / (prom || 1)).toFixed(2)),
    top: {},
  };
  for (const enc of ['SERVICIO_PANAMA', 'SERVICIO', 'BLOG_CORE', 'BLOG_GENERAL', 'CONQUEST']) {
    resumen[pass].top[enc] = util.filter(c => c.enc === enc).slice(0, 60)
      .map(c => ({kw: c.kw, avg: c.avg, seg: c.seg, comp: c.comp, cpc: +c.cpc.toFixed(2), varAnual: c.varAnual == null ? null : Math.round(c.varAnual), pico: c.pico, variantes: c.variantes}));
  }
  for (const c of conceptos) csv.push([pass, q(c.kw), c.seg, c.intent, c.enc, c.avg, c.comp, c.compIdx, c.cpc.toFixed(2), c.bidLow.toFixed(2), c.bidHigh.toFixed(2),
    c.varAnual == null ? '' : Math.round(c.varAnual), c.pico, c.variantes, q(c.otras.join(' | ')), q(c.tags.join(' '))].join(','));

  console.log(`\n===== ${pass} =====`);
  console.log(`crudas ${raw.length} · con volumen ${resumen[pass].conVolumen} · conceptos ${conceptos.length} · útiles ${util.length} · volumen útil ${sum(util).toLocaleString('en-US')}/mes`);
  console.log('por segmento:', Object.entries(porSeg).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v.toLocaleString('en-US')}`).join(' · '));
  console.log('por encaje:  ', Object.entries(porEnc).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v.toLocaleString('en-US')}`).join(' · '));
  console.log('curva mensual servicios (1=promedio):', resumen[pass].curvaServicios.join(' '));
  for (const enc of ['SERVICIO_PANAMA', 'SERVICIO', 'BLOG_CORE', 'BLOG_GENERAL', 'CONQUEST']) {
    console.log(`\n-- TOP ${enc}`);
    const n = enc === 'SERVICIO_PANAMA' ? 60 : enc === 'BLOG_GENERAL' ? 12 : 45;
    for (const c of resumen[pass].top[enc].slice(0, n)) console.log(`  ${c.kw.padEnd(48)} ${String(c.avg).padStart(7)}  ${c.seg.padEnd(13)} ${c.comp.padEnd(7)} cpc$ ${(c.cpc / 4100).toFixed(2)}  yoy ${c.varAnual ?? '-'}%`);
  }
  console.log('\n-- REVISAR (sin segmento, top 20):');
  for (const c of conceptos.filter(x => x.enc === 'REVISAR').slice(0, 20)) console.log(`  ${c.kw.padEnd(48)} ${c.avg}`);
}
writeFileSync(`${DIR}/kw_resumen.json`, JSON.stringify(resumen, null, 1));
writeFileSync(`${DIR}/keyword-research-crossworld.csv`, '﻿' + csv.join('\n'));
console.log('\nguardado kw_resumen.json + keyword-research-crossworld.csv');
