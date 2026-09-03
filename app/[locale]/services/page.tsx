import type {Metadata} from 'next';
import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {services} from '@/content/services';
import {pageMetadata} from '@/lib/seo';
import {Reveal} from '@/components/motion/Reveal';
import {serviceIcons} from '@/components/brand/Icons';
import {InstrumentChip, ChartLines} from '@/components/brand/InstrumentChip';

const copy = {
  en: {title: 'Services at both ends of the Panama Canal', sub: 'Ship agency and Canal transit, marine surveys, tank gauging and bunker operations, marine fuel supply, ship-to-ship and offshore, marine accident investigation, and consulting and audits at Balboa and Cristóbal.', help: 'Not sure which one you need? Describe your case and the duty officer answers.', contact: 'Contact', open: 'Open service', index: 'Index', metaTitle: 'Services: Ship Agency, Surveys, Bunker Operations, Accident Investigation', metaDesc: 'Ship agency and Canal transit, marine surveys, tank gauging and bunker operations, marine fuel supply, STS and offshore, marine accident investigation, and consulting at Balboa and Cristóbal.'},
  es: {title: 'Servicios en ambos lados del Canal de Panamá', sub: 'Agencia naviera y tránsito del Canal, inspecciones marítimas, medición y muestreo de tanques y operaciones de bunker, suministro de combustible, ship-to-ship y offshore, investigación de accidentes marítimos, y consultoría y auditorías en Balboa y Cristóbal.', help: '¿No sabe cuál necesita? Describa su caso y el oficial de guardia responde.', contact: 'Contacto', open: 'Abrir servicio', index: 'Índice', metaTitle: 'Servicios: agencia naviera, inspecciones, bunker, investigación de accidentes', metaDesc: 'Agencia naviera y tránsito del Canal, inspecciones marítimas, medición y muestreo de tanques y operaciones de bunker, suministro de combustible, STS y offshore, investigación de accidentes marítimos y consultoría en Balboa y Cristóbal.'},
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const c = copy[locale as Locale];
  return pageMetadata({locale: locale as Locale, title: c.metaTitle, description: c.metaDesc, href: '/services'});
}

/**
 * Hub de servicios: cabecera con índice de los siete (anclas a cada ficha) y una ficha
 * editorial por servicio: foto en lámina con el chip de instrumento montado en la esquina,
 * folio "0N / 07", título, descripción y enlace. Toda la ficha es clicable.
 */
export default async function ServicesHub({params}: {params: Promise<{locale: string}>}) {
  const {locale: l} = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const c = copy[locale];
  const cta = await getTranslations('Cta');
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-surface py-[clamp(48px,6vw,88px)]">
        <ChartLines marks={false} className="pointer-events-none absolute -top-12 right-[-4%] hidden h-[320px] w-[520px] text-ink opacity-[0.045] lg:block" />
        <div className="wrap relative grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div className="max-w-[60ch]">
            <h1 className="t-display">{c.title}</h1>
            <p className="t-lead mt-4 text-muted">{c.sub}</p>
          </div>
          <nav aria-label={c.index} className="lg:justify-self-end">
            <p className="mb-2 font-mono text-[0.68rem] tracking-[0.18em] uppercase text-muted">{c.index}</p>
            <ol className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-1 p-0 sm:grid-cols-2">
              {services.map((s, i) => (
                <li key={s.key} className="flex items-baseline gap-3 border-b border-line py-1.5 text-[0.9rem]">
                  <span className="font-mono text-[0.7rem] text-accent tabular-nums">0{i + 1}</span>
                  <a href={`#${s.key}`} className="text-ink hover:text-accent-ink">{s.title[locale]}</a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
      <section className="py-[clamp(48px,6vw,88px)]">
        <div className="wrap grid gap-4">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.key as keyof typeof serviceIcons];
            return (
              <Reveal key={s.key} as="article" className="shell scroll-mt-28" delay={(i % 2) as 0 | 1}>
                <Link
                  id={s.key}
                  href={{pathname: '/services/[slug]', params: {slug: s.slug[locale]}}}
                  className="core group grid grid-cols-1 gap-6 bg-surface p-3 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] fine-pointer:hover:-translate-y-0.5 fine-pointer:hover:shadow-lift md:grid-cols-[300px_minmax(0,1fr)] md:items-center md:p-4"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius-core)-0.25rem)] bg-ink-2">
                    <Image src={s.image} alt={s.imageAlt[locale]} fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] fine-pointer:group-hover:scale-[1.04]" />
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,20,32,0.55)_0%,transparent_55%)]" />
                    <InstrumentChip className="absolute bottom-3 left-3"><Icon size={26} /></InstrumentChip>
                    <span className="absolute right-3 bottom-4 font-mono text-[0.68rem] tracking-[0.16em] text-white tabular-nums">0{i + 1} / 0{services.length}</span>
                  </div>
                  <div className="px-2 pb-2 md:px-4 md:pb-0">
                    <span className="mb-2 flex items-center gap-3 font-mono text-[0.74rem] text-muted">
                      <span className="text-accent tabular-nums">0{i + 1}</span>
                      <span className="h-px w-5 bg-line-strong" aria-hidden="true" />
                      <span className="max-w-[56ch]">{s.oneLiner[locale]}</span>
                    </span>
                    <h2 className="text-[clamp(1.35rem,2vw,1.7rem)] leading-tight">{s.title[locale]}</h2>
                    <p className="mt-2 mb-0 max-w-[68ch] text-[0.98rem] text-text">{s.summary[locale][0]}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.92rem] font-medium text-accent-ink">
                      {cta('learnMore')}
                      <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-accent/10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
          <div className="rounded-card border-l-[3px] border-accent bg-accent-soft-2 p-5">
            <p className="m-0">{c.help} <Link href="/contact" className="font-medium text-accent-ink underline">{c.contact}</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}
