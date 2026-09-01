import type {Metadata} from 'next';
import Image from 'next/image';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {ports} from '@/content/ports';
import {pageMetadata} from '@/lib/seo';

const copy = {
  en: {title: 'Ports we serve at the Panama Canal', sub: 'Balboa on the Pacific side and Cristóbal on the Atlantic side, with the terminals around them. Send the terminal and the ETA and the duty officer confirms attendance.', others: 'Terminals around them', metaTitle: 'Ports: Balboa, Cristóbal and the terminals we serve', metaDesc: 'Ship agency, surveys and bunker attendance at Balboa (Pacific) and Cristóbal (Atlantic), and the terminals around them.'},
  es: {title: 'Puertos que atendemos en el Canal de Panamá', sub: 'Balboa en el Pacífico y Cristóbal en el Atlántico, con los terminales a su alrededor. Envíe el terminal y la ETA y el oficial de guardia confirma la atención.', others: 'Terminales alrededor', metaTitle: 'Puertos: Balboa, Cristóbal y los terminales que atendemos', metaDesc: 'Agencia naviera, inspecciones y atención de bunker en Balboa (Pacífico) y Cristóbal (Atlántico), y los terminales a su alrededor.'},
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
    </>
  );
}
