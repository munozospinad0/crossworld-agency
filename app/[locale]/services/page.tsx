import type {Metadata} from 'next';
import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {services} from '@/content/services';
import {pageMetadata} from '@/lib/seo';
import {ButtonLink} from '@/components/ui/Button';

const copy = {
  en: {title: 'Services at both ends of the Panama Canal', sub: 'Seven services, one accountable team for the port call and independent surveyors for the evidence. Nominate us for the transit; the survey and the fuel are the same phone call.', includes: 'What it includes', help: 'Not sure which one you need? Describe your case and the duty officer answers.', metaTitle: 'Services: Ship Agency, Surveys, Bunker, Claims Support', metaDesc: 'Ship agency and Canal transit, independent marine surveys, bunker surveys and claims support, marine fuel supply, STS and offshore, claims support and consulting at Balboa and Cristóbal.'},
  es: {title: 'Servicios en ambos lados del Canal de Panamá', sub: 'Siete servicios, un solo equipo responsable de la escala y surveyors independientes para la evidencia. Nomínenos para el tránsito; la inspección y el combustible son la misma llamada.', includes: 'Qué incluye', help: '¿No sabe cuál necesita? Describa su caso y el oficial de guardia responde.', metaTitle: 'Servicios: agencia naviera, inspecciones, bunker, reclamos', metaDesc: 'Agencia naviera y tránsito del Canal, inspecciones marítimas independientes, inspecciones de bunker y soporte a reclamos, suministro de combustible, STS y offshore, y consultoría en Balboa y Cristóbal.'},
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
        <div className="wrap max-w-[70ch]">
          <h1 className="t-display">{c.title}</h1>
          <p className="t-lead mt-4 text-muted">{c.sub}</p>
        </div>
      </section>
      <section className="py-[clamp(48px,6vw,88px)]">
        <div className="wrap grid gap-4">
          {services.map((s) => (
            <article key={s.key} className="grid grid-cols-1 gap-6 rounded-card border border-line bg-surface p-6 md:grid-cols-[220px_1fr_auto] md:items-start">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[8px]">
                <Image src={s.image} alt={s.imageAlt[locale]} fill sizes="(max-width: 768px) 100vw, 220px" className="object-cover" />
              </div>
              <div>
                <h2 className="text-[1.35rem]">
                  <Link href={{pathname: '/services/[slug]', params: {slug: s.slug[locale]}}} className="hover:text-accent-ink">{s.title[locale]}</Link>
                </h2>
                <p className="mt-1.5 mb-3 max-w-[70ch]">{s.summary[locale]}</p>
                <p className="mb-1 font-mono text-[0.78rem] text-muted">{c.includes}</p>
                <ul className="m-0 grid list-disc gap-1 pl-5 text-[0.95rem] sm:grid-cols-2">
                  {s.includes[locale].slice(0, 4).map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
              <ButtonLink href={{pathname: '/services/[slug]', params: {slug: s.slug[locale]}}} variant="ghost" className="md:mt-1">{cta('learnMore')}</ButtonLink>
            </article>
          ))}
          <div className="rounded-card border-l-[3px] border-accent bg-accent-soft-2 p-5">
            <p className="m-0">{c.help} <Link href="/contact" className="font-medium text-accent-ink underline">{locale === 'es' ? 'Contacto' : 'Contact'}</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}
