import type {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link, getPathname} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {services, serviceBySlug, serviceByKey} from '@/content/services';
import {site, whatsappHref} from '@/content/site';
import {pageMetadata} from '@/lib/seo';
import {breadcrumbJsonLd, serviceJsonLd} from '@/lib/schema';
import {ButtonLink, ButtonA} from '@/components/ui/Button';

const ui = {
  en: {services: 'Services', includes: 'What is included', deliver: 'What you receive and when', ports: 'Ports and terminals', start: 'How to start', why: 'Why Cross World', independence: 'Independence', faq: 'Frequently asked questions', related: 'Related services', needs: 'Send us', reviewed: 'Last reviewed'},
  es: {services: 'Servicios', includes: 'Qué incluye', deliver: 'Qué recibe y cuándo', ports: 'Puertos y terminales', start: 'Cómo empezar', why: 'Por qué Cross World', independence: 'Independencia', faq: 'Preguntas frecuentes', related: 'Servicios relacionados', needs: 'Envíenos', reviewed: 'Última revisión'},
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => services.map((s) => ({locale, slug: s.slug[locale]})));
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}): Promise<Metadata> {
  const {locale: l, slug} = await params;
  const locale = l as Locale;
  const s = serviceBySlug(locale, slug);
  if (!s) return {};
  return pageMetadata({
    locale,
    title: s.metaTitle[locale],
    description: s.metaDescription[locale],
    href: {pathname: '/services/[slug]', params: {slug: s.slug[locale]}},
    esHref: {pathname: '/services/[slug]', params: {slug: s.slug.es}},
    image: s.image,
  });
}

export default async function ServicePage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale: l, slug} = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const s = serviceBySlug(locale, slug);
  if (!s) notFound();
  const t = ui[locale];
  const cta = await getTranslations('Cta');
  const c = await getTranslations('Common');
  const url = `${site.url}${getPathname({locale, href: {pathname: '/services/[slug]', params: {slug: s.slug[locale]}}})}`;
  const requestUrl = `${site.url}${getPathname({locale, href: '/request-port-call'})}`;
  const ctaLabel = cta(s.cta);
  const related = s.related.map((k) => serviceByKey(k)).filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(serviceJsonLd(locale, {h1: s.h1[locale], description: s.metaDescription[locale], url, requestUrl}))}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd([{name: 'Home', url: `${site.url}/${locale}`}, {name: t.services, url: `${site.url}${getPathname({locale, href: '/services'})}`}, {name: s.title[locale], url}]))}} />

      <section className="border-b border-line bg-surface py-[clamp(40px,5vw,72px)]">
        <div className="wrap grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 font-mono text-[0.78rem] text-muted">
              <Link href="/" className="hover:text-ink">Home</Link> / <Link href="/services" className="hover:text-ink">{t.services}</Link> / <span className="text-ink">{s.title[locale]}</span>
            </nav>
            <h1 className="t-display">{s.h1[locale]}</h1>
            <p className="t-lead mt-4 max-w-[60ch]">{s.summary[locale]}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/request-port-call">{ctaLabel}</ButtonLink>
              <ButtonA href={whatsappHref()} variant="ghost" title={site.whatsapp.confirm ? c('toConfirm') : undefined}>{cta('whatsapp')}</ButtonA>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image src={s.image} alt={s.imageAlt[locale]} fill priority sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-[clamp(48px,6vw,88px)]">
        <div className="wrap grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="grid gap-10">
            <div>
              <h2 className="t-h2">{t.includes}</h2>
              <ul className="mt-4 grid list-disc gap-2 pl-5 sm:grid-cols-2">
                {s.includes[locale].map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="t-h2">{t.deliver}</h2>
              <div className="mt-4 overflow-hidden rounded-card border border-line bg-surface">
                <table className="w-full border-collapse text-[0.95rem]">
                  <tbody>
                    {s.deliverables[locale].map((d) => (
                      <tr key={d.name} className="border-b border-line last:border-0">
                        <td className="p-3.5 align-top">{d.name}</td>
                        <td className="p-3.5 align-top font-mono text-[0.82rem] whitespace-nowrap text-accent-ink">{d.timing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h2 className="t-h2">{t.start}</h2>
              <ol className="mt-4 grid gap-3 pl-0 sm:grid-cols-3" style={{listStyle: 'none'}}>
                {s.steps[locale].map((x, i) => (
                  <li key={x} className="rounded-card border border-line bg-surface p-4">
                    <span className="block font-mono text-[0.78rem] text-muted">{i + 1}</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ol>
            </div>
            {s.independence && (
              <div className="rounded-card border-l-[3px] border-accent bg-accent-soft-2 p-5">
                <h2 className="text-[1.05rem]">{t.independence}</h2>
                <p className="m-0 mt-1">{s.independence[locale]}</p>
              </div>
            )}
            <div>
              <h2 className="t-h2">{t.faq}</h2>
              <div className="mt-4 grid gap-3">
                {s.faq[locale].map((f) => (
                  <details key={f.q} className="group rounded-card border border-line bg-surface p-4 open:shadow-1">
                    <summary className="cursor-pointer list-none font-medium text-ink">{f.q}</summary>
                    <p className="m-0 mt-2 text-text">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
          <aside className="grid content-start gap-4">
            <div className="rounded-card bg-ink p-6 text-on-dark">
              <h2 className="text-[1.15rem] text-white">{t.why}</h2>
              <ul className="mt-3 grid list-disc gap-2 pl-5 text-[0.95rem]">
                {s.why[locale].map((x) => <li key={x}>{x}</li>)}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/request-port-call" variant="light">{ctaLabel}</ButtonLink>
              </div>
            </div>
            <div className="rounded-card border border-line bg-surface p-5 text-[0.95rem]">
              <h2 className="text-[1.05rem]">{t.ports}</h2>
              <p className="m-0 mt-1">{s.ports[locale]}</p>
              <p className="mt-3 mb-0 font-mono text-[0.8rem] text-muted">{c('operations')}: <a className="text-ink" href={`tel:${site.phones.operations.e164}`}>{site.phones.operations.display}</a></p>
            </div>
            <div className="rounded-card border border-line bg-surface p-5 text-[0.95rem]">
              <h2 className="text-[1.05rem]">{t.related}</h2>
              <ul className="m-0 mt-2 grid list-none gap-1.5 p-0">
                {related.map((r) => r && (
                  <li key={r.key}><Link className="text-accent-ink hover:underline" href={{pathname: '/services/[slug]', params: {slug: r.slug[locale]}}}>{r.title[locale]}</Link></li>
                ))}
              </ul>
            </div>
            <p className="m-0 font-mono text-[0.78rem] text-muted">{t.reviewed}: 2026-08-31</p>
          </aside>
        </div>
      </section>
    </>
  );
}
