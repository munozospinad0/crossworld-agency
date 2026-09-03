import type {Metadata} from 'next';
import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {services} from '@/content/services';
import {pageMetadata} from '@/lib/seo';
import {ButtonLink} from '@/components/ui/Button';
import {Reveal} from '@/components/motion/Reveal';
import {serviceIcons} from '@/components/brand/Icons';
import {InstrumentChip} from '@/components/brand/InstrumentChip';

const copy = {
  en: {title: 'Services at both ends of the Panama Canal', sub: 'Ship agency and Canal transit, marine surveys, tank gauging and bunker operations, marine fuel supply, ship-to-ship and offshore, marine accident investigation, and consulting and audits at Balboa and Cristóbal.', help: 'Not sure which one you need? Describe your case and the duty officer answers.', contact: 'Contact', metaTitle: 'Services: Ship Agency, Surveys, Bunker Operations, Accident Investigation', metaDesc: 'Ship agency and Canal transit, marine surveys, tank gauging and bunker operations, marine fuel supply, STS and offshore, marine accident investigation, and consulting at Balboa and Cristóbal.'},
  es: {title: 'Servicios en ambos lados del Canal de Panamá', sub: 'Agencia naviera y tránsito del Canal, inspecciones marítimas, medición y muestreo de tanques y operaciones de bunker, suministro de combustible, ship-to-ship y offshore, investigación de accidentes marítimos, y consultoría y auditorías en Balboa y Cristóbal.', help: '¿No sabe cuál necesita? Describa su caso y el oficial de guardia responde.', contact: 'Contacto', metaTitle: 'Servicios: agencia naviera, inspecciones, bunker, investigación de accidentes', metaDesc: 'Agencia naviera y tránsito del Canal, inspecciones marítimas, medición y muestreo de tanques y operaciones de bunker, suministro de combustible, STS y offshore, investigación de accidentes marítimos y consultoría en Balboa y Cristóbal.'},
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const c = copy[locale as Locale];
  return pageMetadata({locale: locale as Locale, title: c.metaTitle, description: c.metaDesc, href: '/services'});
}

export default async function ServicesHub({params}: {params: Promise<{locale: string}>}) {
  const {locale: l} = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const c = copy[locale];
  const cta = await getTranslations('Cta');
  return (
    <>
      <section className="border-b border-line bg-surface py-[clamp(48px,6vw,88px)]">
        <div className="wrap max-w-[72ch]">
          <h1 className="t-display">{c.title}</h1>
          <p className="t-lead mt-4 text-muted">{c.sub}</p>
        </div>
      </section>
      <section className="py-[clamp(48px,6vw,88px)]">
        <div className="wrap grid gap-4">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.key as keyof typeof serviceIcons];
            return (
              <Reveal key={s.key} as="article" className="shell">
                <div className="core grid grid-cols-1 gap-6 bg-surface p-3 md:grid-cols-[260px_minmax(0,1fr)_auto] md:items-center md:p-4">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-[calc(var(--radius-core)-0.25rem)] md:aspect-[4/3]">
                    <Image src={s.image} alt={s.imageAlt[locale]} fill sizes="(max-width: 768px) 100vw, 260px" className="object-cover" />
                  </div>
                  <div className="px-2 md:px-2">
                    <div className="mb-2 flex items-center gap-3">
                      <InstrumentChip className="h-10 w-10"><Icon size={18} /></InstrumentChip>
                      <span className="font-mono text-[0.7rem] tracking-[0.16em] text-muted tabular-nums">0{i + 1} / 0{services.length}</span>
                    </div>
                    <h2 className="text-[1.4rem] leading-tight">
                      <Link href={{pathname: '/services/[slug]', params: {slug: s.slug[locale]}}} className="hover:text-accent-ink">{s.title[locale]}</Link>
                    </h2>
                    <p className="mt-2 mb-0 max-w-[66ch] text-[0.98rem] text-text">{s.summary[locale][0]}</p>
                  </div>
                  <ButtonLink href={{pathname: '/services/[slug]', params: {slug: s.slug[locale]}}} variant="ghost" className="mx-2 mb-2 justify-self-start md:mx-0 md:mb-0 md:mr-2">{cta('learnMore')}</ButtonLink>
                </div>
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
