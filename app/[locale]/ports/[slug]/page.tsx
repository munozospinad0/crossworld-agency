import type {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link, getPathname} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {ports, portBySlug} from '@/content/ports';
import {site} from '@/content/site';
import {pageMetadata} from '@/lib/seo';
import {breadcrumbJsonLd} from '@/lib/schema';
import {ButtonLink} from '@/components/ui/Button';

const ui = {
  en: {ports: 'Ports', what: 'What we do here', particulars: 'Particulars', attendance: 'Attendance', faq: 'Frequently asked questions', reviewed: 'Port data reviewed'},
  es: {ports: 'Puertos', what: 'Qué hacemos aquí', particulars: 'Particularidades', attendance: 'Atención', faq: 'Preguntas frecuentes', reviewed: 'Datos de puerto revisados'},
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => ports.map((p) => ({locale, slug: p.slug[locale]})));
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}): Promise<Metadata> {
  const {locale: l, slug} = await params;
  const locale = l as Locale;
  const p = portBySlug(locale, slug);
  if (!p) return {};
  return pageMetadata({locale, title: p.metaTitle[locale], description: p.metaDescription[locale], href: {pathname: '/ports/[slug]', params: {slug: p.slug[locale]}}, esHref: {pathname: '/ports/[slug]', params: {slug: p.slug.es}}, image: p.image});
}

export default async function PortPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale: l, slug} = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const p = portBySlug(locale, slug);
  if (!p) notFound();
  const t = ui[locale];
  const cta = await getTranslations('Cta');
  const url = `${site.url}${getPathname({locale, href: {pathname: '/ports/[slug]', params: {slug: p.slug[locale]}}})}`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({'@context': 'https://schema.org', '@type': 'Place', name: p.name[locale], description: p.metaDescription[locale], url, address: {'@type': 'PostalAddress', addressCountry: 'PA'}})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd([{name: 'Home', url: `${site.url}/${locale}`}, {name: t.ports, url: `${site.url}${getPathname({locale, href: '/ports'})}`}, {name: p.name[locale], url}]))}} />
      <section className="border-b border-line bg-surface py-[clamp(40px,5vw,72px)]">
        <div className="wrap grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 font-mono text-[0.78rem] text-muted">
              <Link href="/" className="hover:text-ink">Home</Link> / <Link href="/ports" className="hover:text-ink">{t.ports}</Link> / <span className="text-ink">{p.name[locale]}</span>
            </nav>
            <span className="font-mono text-[0.8rem] text-accent-ink">{p.side[locale]}</span>
            <h1 className="t-display mt-1">{p.metaTitle[locale].split(':')[0]}</h1>
            <p className="t-lead mt-4 max-w-[60ch]">{p.summary[locale]}</p>
            <div className="mt-6"><ButtonLink href="/request-port-call">{cta('portcall')}</ButtonLink></div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image src={p.image} alt="" fill priority sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="py-[clamp(48px,6vw,88px)]">
        <div className="wrap grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="grid gap-10">
            <div>
              <h2 className="t-h2">{t.what}</h2>
              <ul className="mt-4 grid list-disc gap-2 pl-5">{p.whatWeDo[locale].map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h2 className="t-h2">{t.particulars}</h2>
              {p.particulars[locale].map((x) => <p key={x} className="mt-2">{x}</p>)}
            </div>
            <div>
              <h2 className="t-h2">{t.faq}</h2>
              <div className="mt-4 grid gap-3">
                {p.faq[locale].map((f) => (
                  <details key={f.q} className="rounded-card border border-line bg-surface p-4">
                    <summary className="cursor-pointer list-none font-medium text-ink">{f.q}</summary>
                    <p className="m-0 mt-2">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
          <aside className="grid content-start gap-4">
            <div className="rounded-card bg-ink p-6 font-mono text-[0.86rem] leading-[1.7] text-on-dark">
              <h2 className="mb-2.5 font-sans text-[1.25rem] text-white">{p.name[locale]}</h2>
              <dl className="m-0 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1">
                {p.facts[locale].map((f) => (
                  <div key={f.k} className="contents"><dt className="text-on-dark-muted">{f.k}</dt><dd className="m-0 text-white">{f.v}</dd></div>
                ))}
              </dl>
              <p className="mt-3 mb-0 text-[0.8rem] text-on-dark-muted">{t.attendance}: {p.attendance[locale]}</p>
            </div>
            <p className="m-0 font-mono text-[0.78rem] text-muted">{t.reviewed}: {p.reviewed}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
