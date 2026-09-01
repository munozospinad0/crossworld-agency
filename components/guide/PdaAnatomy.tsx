'use client';

import {useState} from 'react';

type Who = 'acp' | 'third' | 'agency';
type Line = {id: string; label: string; basis: string; who: Who; known: string; note: string};

const T = {
  en: {
    title: 'Anatomy of a PDA',
    sub: 'Every line of a proforma disbursement account, and what it means. Touch a line.',
    doc: 'PROFORMA DISBURSEMENT ACCOUNT · SAMPLE STRUCTURE',
    vessel: 'MV (vessel) · IMO (number) · Panamax bulk carrier · southbound transit',
    who: {acp: 'Panama Canal Authority', third: 'Third party', agency: 'Cross World'},
    knownLabel: 'Known',
    receiverLabel: 'Paid to',
    figures: 'Figures are not shown: tolls and fees come from the ACP tariff in force on your transit date and from third-party rates. Your PDA states each amount with its basis.',
    lines: [
      {id: 'toll', label: 'Canal toll', basis: 'By segment and size (TEU, DWT, PC/UMS or m³)', who: 'acp', known: 'At PDA, from the tariff in force', note: 'The largest line. Containerships pay capacity plus loaded and empty TEU; bulk carriers per DWT; tankers, car carriers and general cargo per PC/UMS ton; gas carriers per cubic metre in tiers. We state the basis we used so you can check it.'},
      {id: 'fixed', label: 'Fixed tariff per transit', basis: 'By vessel category', who: 'acp', known: 'At PDA', note: 'A lump sum set by the ACP for each category, separate from the toll. It does not change with cargo.'},
      {id: 'booking', label: 'Reservation fee or auction premium', basis: 'Booking period; slot auction if unreserved', who: 'acp', known: 'At booking', note: 'If you reserve a slot you pay the reservation fee of your period (higher if last minute). If you bid for an unreserved slot, the premium replaces it. We show which one applies and why.'},
      {id: 'security', label: 'Security charge', basis: 'By vessel size', who: 'acp', known: 'At PDA', note: 'A fixed ACP charge per transit.'},
      {id: 'inspection', label: 'Inspection and admeasurement', basis: 'Per transit; admeasurement on first transit', who: 'acp', known: 'At PDA', note: 'Boarding inspection on arrival. First-time transits also pay admeasurement for the PC/UMS certificate.'},
      {id: 'pilot', label: 'Pilotage', basis: 'Transit and port pilotage', who: 'acp', known: 'At PDA; delays adjust at FDA', note: 'Canal pilots are ACP pilots. Transit delays attributable to the vessel can add pilotage time, which we explain in the FDA with the ACP voucher.'},
      {id: 'tugs', label: 'Tugs', basis: 'Complete or partial transit; Panamax or Neopanamax package', who: 'acp', known: 'At PDA', note: 'The ACP assigns tugs by lock type and vessel size. Neopanamax packages are larger.'},
      {id: 'linehandlers', label: 'Linehandlers', basis: 'Per handler, per transit', who: 'acp', known: 'At PDA', note: 'The ACP linehandlers who take the lines in the chambers. Their number depends on the vessel.'},
      {id: 'launch', label: 'Launch and boarding', basis: 'Per boarding', who: 'third', known: 'At PDA; extra boardings at FDA', note: 'Launch service to board at the anchorage. Extra runs (crew, spares, surveyor) appear with their voucher in the FDA.'},
      {id: 'husbandry', label: 'Husbandry (if requested)', basis: 'Actual cost with voucher', who: 'third', known: 'At FDA', note: 'Crew changes, transport, provisions, spares, medical, cash to master. Only what you request, each line with its voucher.'},
      {id: 'agency', label: 'Agency fee', basis: 'One line, all inclusive', who: 'agency', known: 'At PDA, fixed', note: 'Our fee in a single line. No communication, handling or bank surcharges added later. (Publication of the amount: to confirm.)'},
      {id: 'bank', label: 'Bank charges', basis: 'Actual', who: 'third', known: 'At FDA', note: 'What the banks charge to receive your funds. Bank details are issued only on the PDA and confirmed by phone; we never change them by email.'},
      {id: 'contingency', label: 'Contingency', basis: 'Small percentage, returned if unused', who: 'agency', known: 'At PDA; settled at FDA', note: 'A buffer for ACP or third-party variations. Whatever is not used is returned in the FDA.'},
    ] as Line[],
    legend: 'Paid to',
  },
  es: {
    title: 'Anatomía de una PDA',
    sub: 'Cada línea de una cuenta proforma de desembolsos, y qué significa. Toque una línea.',
    doc: 'CUENTA PROFORMA DE DESEMBOLSOS · ESTRUCTURA DE MUESTRA',
    vessel: 'MV (buque) · IMO (número) · granelero Panamax · tránsito hacia el sur',
    who: {acp: 'Autoridad del Canal de Panamá', third: 'Tercero', agency: 'Cross World'},
    knownLabel: 'Se conoce',
    receiverLabel: 'Se paga a',
    figures: 'No se muestran cifras: los peajes y tasas salen del tarifario de la ACP vigente en la fecha de su tránsito y de las tarifas de terceros. Su PDA indica cada monto con su base.',
    lines: [
      {id: 'toll', label: 'Peaje del Canal', basis: 'Por segmento y tamaño (TEU, DWT, PC/UMS o m³)', who: 'acp', known: 'En la PDA, del tarifario vigente', note: 'La línea mayor. Los portacontenedores pagan capacidad más TEU cargados y vacíos; los graneleros por DWT; tanqueros, car carriers y carga general por tonelada PC/UMS; los gaseros por metro cúbico en tramos. Indicamos la base que usamos para que la pueda verificar.'},
      {id: 'fixed', label: 'Tarifa fija por tránsito', basis: 'Por categoría de buque', who: 'acp', known: 'En la PDA', note: 'Una suma fija de la ACP para cada categoría, aparte del peaje. No cambia con la carga.'},
      {id: 'booking', label: 'Tasa de reserva o prima de subasta', basis: 'Periodo de reserva; subasta si no hay reserva', who: 'acp', known: 'Al reservar', note: 'Si reserva un slot paga la tasa de su periodo (más alta si es de último momento). Si puja por un slot no reservado, la prima la reemplaza. Mostramos cuál aplica y por qué.'},
      {id: 'security', label: 'Cargo de seguridad', basis: 'Por tamaño de buque', who: 'acp', known: 'En la PDA', note: 'Un cargo fijo de la ACP por tránsito.'},
      {id: 'inspection', label: 'Inspección y arqueo', basis: 'Por tránsito; arqueo en el primero', who: 'acp', known: 'En la PDA', note: 'Inspección de abordaje al arribo. El primer tránsito paga además el arqueo para el certificado PC/UMS.'},
      {id: 'pilot', label: 'Practicaje', basis: 'De tránsito y de puerto', who: 'acp', known: 'En la PDA; demoras se ajustan en la FDA', note: 'Los prácticos del Canal son de la ACP. Las demoras atribuibles al buque pueden sumar tiempo de practicaje, que explicamos en la FDA con el comprobante de la ACP.'},
      {id: 'tugs', label: 'Remolcadores', basis: 'Tránsito completo o parcial; paquete Panamax o Neopanamax', who: 'acp', known: 'En la PDA', note: 'La ACP asigna remolcadores por tipo de esclusa y tamaño del buque. Los paquetes Neopanamax son mayores.'},
      {id: 'linehandlers', label: 'Pasacables', basis: 'Por pasacable, por tránsito', who: 'acp', known: 'En la PDA', note: 'Los pasacables de la ACP que toman las líneas en las cámaras. Su número depende del buque.'},
      {id: 'launch', label: 'Lancha y abordaje', basis: 'Por abordaje', who: 'third', known: 'En la PDA; abordajes extra en la FDA', note: 'Servicio de lancha para abordar en el fondeadero. Los viajes extra (tripulación, repuestos, surveyor) aparecen con su comprobante en la FDA.'},
      {id: 'husbandry', label: 'Husbandry (si lo solicita)', basis: 'Costo real con comprobante', who: 'third', known: 'En la FDA', note: 'Cambios de tripulación, transporte, provisiones, repuestos, atención médica, cash to master. Solo lo que pida, cada línea con su comprobante.'},
      {id: 'agency', label: 'Honorario de agencia', basis: 'Una línea, todo incluido', who: 'agency', known: 'En la PDA, fijo', note: 'Nuestro honorario en una sola línea. Sin recargos de comunicaciones, manejo o banco añadidos después. (Publicación del monto: a confirmar.)'},
      {id: 'bank', label: 'Cargos bancarios', basis: 'Reales', who: 'third', known: 'En la FDA', note: 'Lo que cobran los bancos por recibir sus fondos. Los datos bancarios se emiten solo en la PDA y se confirman por teléfono; nunca los cambiamos por correo.'},
      {id: 'contingency', label: 'Contingencia', basis: 'Pequeño porcentaje, se devuelve si no se usa', who: 'agency', known: 'En la PDA; se liquida en la FDA', note: 'Un margen para variaciones de la ACP o de terceros. Lo que no se usa se devuelve en la FDA.'},
    ] as Line[],
    legend: 'Se paga a',
  },
} as const;

const whoColor: Record<Who, string> = {acp: 'bg-brand-sky', third: 'bg-on-dark-muted', agency: 'bg-white'};

export function PdaAnatomy({locale}: {locale: 'en' | 'es'}) {
  const t = T[locale];
  const [active, setActive] = useState(0);
  const line = t.lines[active];
  return (
    <div className="shell-dark">
      <div className="core deep p-5 text-on-dark md:p-7">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-[1.35rem] text-white">{t.title}</h3>
            <p className="m-0 mt-1 text-[0.95rem] text-on-dark-muted">{t.sub}</p>
          </div>
          <div className="flex flex-wrap gap-3 font-mono text-[0.7rem] tracking-[0.08em] text-on-dark-muted uppercase">
            <span className="text-on-dark">{t.legend}:</span>
            {(['acp', 'third', 'agency'] as Who[]).map((w) => (
              <span key={w} className="inline-flex items-center gap-1.5"><i className={`inline-block h-2 w-2 rounded-full ${whoColor[w]}`} />{t.who[w]}</span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* el documento */}
          <div className="rounded-[10px] border border-white/10 bg-ink-2 p-4 font-mono text-[0.8rem] md:p-5" role="tablist" aria-label={t.title}>
            <div className="mb-3 border-b border-dashed border-white/15 pb-3">
              <div className="text-[0.68rem] tracking-[0.14em] text-brand-sky uppercase">{t.doc}</div>
              <div className="mt-1 text-on-dark-muted">{t.vessel}</div>
            </div>
            <ol className="m-0 grid list-none gap-1 p-0">
              {t.lines.map((l, i) => (
                <li key={l.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    aria-controls="pda-panel"
                    onClick={() => setActive(i)}
                    className={`grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 ${active === i ? 'bg-white/10 text-white' : 'text-on-dark hover:bg-white/5'}`}
                  >
                    <i aria-hidden="true" className={`h-2 w-2 rounded-full ${whoColor[l.who]}`} />
                    <span className="truncate">{String(i + 1).padStart(2, '0')}  {l.label}</span>
                    <span className="text-on-dark-muted">····</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-3 border-t border-dashed border-white/15 pt-3 text-[0.72rem] text-on-dark-muted">{t.figures}</div>
          </div>
          {/* el panel */}
          <div id="pda-panel" role="tabpanel" className="rounded-[10px] border border-white/10 bg-white/5 p-5">
            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-brand-sky uppercase">{String(active + 1).padStart(2, '0')} · {t.who[line.who]}</span>
            <h4 className="mt-1.5 text-[1.15rem] text-white">{line.label}</h4>
            <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 font-mono text-[0.78rem]">
              <dt className="text-on-dark-muted">{locale === 'es' ? 'Base' : 'Basis'}</dt><dd className="m-0 text-on-dark">{line.basis}</dd>
              <dt className="text-on-dark-muted">{t.receiverLabel}</dt><dd className="m-0 text-on-dark">{t.who[line.who]}</dd>
              <dt className="text-on-dark-muted">{t.knownLabel}</dt><dd className="m-0 text-on-dark">{line.known}</dd>
            </dl>
            <p className="m-0 mt-4 text-[0.95rem] text-on-dark">{line.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
