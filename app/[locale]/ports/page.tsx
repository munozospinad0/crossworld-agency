import type {Metadata} from 'next';
import Image from 'next/image';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {ports} from '@/content/ports';
import {pageMetadata} from '@/lib/seo';

const copy = {
  en: {
    title: 'Ports we serve at the Panama Canal',
    sub: 'Balboa on the Pacific side and Cristóbal on the Atlantic side, with the terminals around them. Send the terminal and the ETA and the duty officer confirms attendance.',
    others: 'Terminals around them',
    metaTitle: 'Ports we serve at the Panama Canal',
    metaDesc: 'Ship agency, surveys and bunker attendance at Balboa (Pacific) and Cristóbal (Atlantic), and the terminals around them.',
    geoTitle: 'One country, two coasts, and an hour of road between them',
    geoP: [
      'Panama is unusual for an agent: the same call can be served on the Pacific or on the Atlantic, and the choice changes almost everything about how the day runs. Colón, where Cristóbal sits, is roughly an hour by road from Panama City, where Balboa is. That hour is what decides whether a crew change, a spare part or a surveyor arrives in time.',
      'A vessel transiting north to south enters through Cristóbal and leaves through Balboa; southbound is the reverse. If the call is only a stop, and not a transit, the side is a decision rather than a consequence, and it is worth making it on purpose.',
    ],
    tableCaption: 'What changes between the two ends of the Canal.',
    tableHead: ['', 'Pacific side', 'Atlantic side'],
    tableRows: [
      ['Port', 'Balboa', 'Cristóbal (Colón)'],
      ['Locks at that end', 'Miraflores', 'Gatún and Agua Clara'],
      ['City', 'Panama City, alongside the port', 'Colón, about an hour from Panama City'],
      ['Terminals nearby', 'PSA Panama (Rodman)', 'Manzanillo (MIT), CCT, Bahía Las Minas oil terminals'],
      ['Typical for', 'Crew changes and supplies with airport access', 'Container transhipment and oil terminal work'],
    ],
    tzNote: 'Panama runs on UTC−5 all year, with no daylight saving. An ETA quoted in local time means the same thing in January and in July, which is not true of most of the ports your vessel came from.',
    choosingTitle: 'Choosing a side for the call',
    choosing: [
      'Crew change: Tocumen International is on the Pacific side, so Balboa usually saves the crew a road transfer at the end of a long flight.',
      'Spares and stores: what side the supplier is on matters more than what side the vessel is on, because the road between them is the slow part.',
      'Bunker and tank work: the oil terminals of Bahía Las Minas sit on the Atlantic side, near Cristóbal.',
      'Container transhipment: the Atlantic cluster around Colón concentrates the box terminals.',
    ],
  },
  es: {
    title: 'Puertos que atendemos en el Canal de Panamá',
    sub: 'Balboa en el Pacífico y Cristóbal en el Atlántico, con los terminales a su alrededor. Envíe el terminal y la ETA y el oficial de guardia confirma la atención.',
    others: 'Terminales alrededor',
    metaTitle: 'Puertos que atendemos en el Canal',
    metaDesc: 'Agencia naviera, inspecciones y atención de bunker en Balboa (Pacífico) y Cristóbal (Atlántico), y los terminales a su alrededor.',
    geoTitle: 'Un país, dos costas y una hora de carretera entre ellas',
    geoP: [
      'Panamá es un caso raro para un agente: la misma escala se puede atender en el Pacífico o en el Atlántico, y esa elección cambia casi todo el día de trabajo. Colón, donde está Cristóbal, queda a cosa de una hora por carretera de Ciudad de Panamá, donde está Balboa. Esa hora es la que decide si un cambio de tripulación, un repuesto o un inspector llegan a tiempo.',
      'Un buque que transita de norte a sur entra por Cristóbal y sale por Balboa; hacia el sur es al revés. Si la escala es solo una parada, y no un tránsito, el lado es una decisión y no una consecuencia, y conviene tomarla a propósito.',
    ],
    tableCaption: 'Qué cambia entre un extremo del Canal y el otro.',
    tableHead: ['', 'Lado Pacífico', 'Lado Atlántico'],
    tableRows: [
      ['Puerto', 'Balboa', 'Cristóbal (Colón)'],
      ['Esclusas de ese extremo', 'Miraflores', 'Gatún y Agua Clara'],
      ['Ciudad', 'Ciudad de Panamá, junto al puerto', 'Colón, a cerca de una hora de Ciudad de Panamá'],
      ['Terminales cercanos', 'PSA Panama (Rodman)', 'Manzanillo (MIT), CCT, terminales de hidrocarburos de Bahía Las Minas'],
      ['Habitual para', 'Cambios de tripulación y suministros con acceso al aeropuerto', 'Trasbordo de contenedores y trabajo en terminales petroleros'],
    ],
    tzNote: 'Panamá está en UTC−5 todo el año, sin horario de verano. Una ETA dada en hora local significa lo mismo en enero que en julio, cosa que no ocurre en la mayoría de los puertos de los que viene su buque.',
    choosingTitle: 'Elegir el lado de la escala',
    choosing: [
      'Cambio de tripulación: el aeropuerto de Tocumen está del lado Pacífico, así que Balboa suele ahorrarle a la tripulación un traslado por carretera al final de un vuelo largo.',
      'Repuestos y provisiones: pesa más de qué lado está el proveedor que de qué lado está el buque, porque la carretera entre ambos es la parte lenta.',
      'Bunker y trabajo de tanques: los terminales de hidrocarburos de Bahía Las Minas están del lado Atlántico, cerca de Cristóbal.',
      'Trasbordo de contenedores: el conglomerado atlántico alrededor de Colón concentra los terminales de contenedores.',
    ],
  },
};
const others = ['Manzanillo (MIT)', 'CCT', 'Bahía Las Minas', 'PSA Panama (Rodman)'];

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const c = copy[locale as Locale];
  return pageMetadata({locale: locale as Locale, title: c.metaTitle, description: c.metaDesc, href: '/ports'});
}

export default async function PortsHub({params}: {params: Promise<{locale: string}>}) {
  const {locale: l} = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const c = copy[locale];
  return (
    <>
      <section className="border-b border-line bg-surface py-[clamp(40px,5vw,72px)]">
        <div className="wrap max-w-[70ch]">
          <h1 className="t-display">{c.title}</h1>
          <p className="t-lead mt-4 text-muted">{c.sub}</p>
        </div>
      </section>
      <section className="py-[clamp(48px,6vw,88px)]">
        <div className="wrap grid gap-4 md:grid-cols-2">
          {ports.map((p) => (
            <Link key={p.key} href={{pathname: '/ports/[slug]', params: {slug: p.slug[locale]}}} className="group overflow-hidden rounded-card border border-line bg-surface transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-1">
              <div className="relative aspect-[3/2]">
                <Image src={p.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-5">
                <span className="font-mono text-[0.78rem] text-muted">{p.side[locale]}</span>
                <h2 className="mt-1 text-[1.35rem]">{p.name[locale]}</h2>
                <p className="mt-1.5 mb-0 text-[0.95rem]">{p.summary[locale]}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="wrap mt-6 flex flex-wrap items-center gap-2 font-mono text-[0.8rem] text-text">
          <span className="text-muted">{c.others}:</span>
          {others.map((o) => <span key={o} className="rounded-full border border-line-strong bg-surface px-2.5 py-1">{o}</span>)}
        </div>
      </section>

      {/* El hub tenía 154 palabras de contenido propio: para una consulta como "puertos de Panamá"
          eso no compite con nada. Esto es lo que un operador necesita decidir antes de la escala. */}
      <section className="border-t border-line bg-surface py-[clamp(48px,6vw,88px)]">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="max-w-[70ch]">
            <h2 className="t-h2">{c.geoTitle}</h2>
            {c.geoP.map((p) => <p key={p} className="mt-4">{p}</p>)}

            <div className="mt-8 overflow-x-auto rounded-card border border-line">
              <table className="w-full border-collapse text-[0.95rem]">
                <caption className="sr-only">{c.tableCaption}</caption>
                <thead>
                  <tr className="bg-paper text-left">
                    {c.tableHead.map((h, i) => (
                      <th key={i} scope="col" className="border-b border-line px-4 py-3 font-mono text-[0.72rem] font-medium tracking-wide text-muted uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.tableRows.map((row) => (
                    <tr key={row[0]} className="border-b border-line last:border-0">
                      {row.map((cell, i) => (
                        <td key={i} className={`px-4 py-3 align-top ${i === 0 ? 'font-medium text-ink' : ''}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[0.85rem] text-muted">{c.tableCaption}</p>

            <p className="mt-6 border-l-[3px] border-accent bg-accent-soft-2 px-4 py-3 text-[0.92rem]">{c.tzNote}</p>
          </div>

          <aside className="grid content-start gap-4">
            <div className="rounded-card border border-line bg-paper p-6">
              <h2 className="text-[1.05rem] font-semibold text-ink">{c.choosingTitle}</h2>
              <ul className="mt-3 grid list-disc gap-2.5 pl-5 text-[0.95rem]">
                {c.choosing.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
            <div className="rounded-card border border-line bg-paper p-6">
              <p className="m-0 text-[0.95rem]">
                <Link href="/panama-canal-transit-guide" className="text-accent-ink underline underline-offset-2">
                  {locale === 'es' ? 'Cómo funciona un tránsito por el Canal, paso a paso' : 'How a Panama Canal transit works, step by step'}
                </Link>
              </p>
              <p className="m-0 mt-3 text-[0.95rem]">
                <Link href={{pathname: '/insights/[slug]', params: {slug: locale === 'es' ? 'reserva-de-transito-canal-de-panama' : 'panama-canal-transit-booking'}}} className="text-accent-ink underline underline-offset-2">
                  {locale === 'es' ? 'Reservar un cupo: tasas, periodos y penalidades' : 'Booking a slot: fees, periods and penalties'}
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
