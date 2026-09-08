import type {Metadata} from 'next';
import Image from 'next/image';
import {setRequestLocale} from 'next-intl/server';
import {Link, getPathname} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {articlesByDate} from '@/content/articles';
import {site} from '@/content/site';
import {pageMetadata} from '@/lib/seo';
import {breadcrumbJsonLd} from '@/lib/schema';

const ui = {
  en: {
    title: 'Insights from the duty desk',
    metaTitle: 'Panama Canal and port call insights',
    metaDescription: 'Notes from the duty desk on Panama Canal transits, booking, port calls, surveys and bunker operations, written by Capt. Guillermo A. Peña with the source for every figure.',
    lead: 'What we learn moving ships through Panama, written down. Every figure carries the notice or tariff it comes from, so you can check it before you rely on it.',
    byline: 'Written by the Cross World Agency operations team.',
    empty: 'The first notes are being reviewed and will appear here shortly.',
    read: 'Read',
    min: 'min',
    feed: 'RSS feed',
  },
  es: {
    title: 'Análisis del puesto de guardia',
    metaTitle: 'Análisis del Canal de Panamá y escalas',
    metaDescription: 'Notas del puesto de guardia sobre tránsitos del Canal de Panamá, reservas, escalas, inspecciones y bunker, escritas por el capitán Guillermo A. Peña con la fuente de cada cifra.',
    lead: 'Lo que aprendemos moviendo buques por Panamá, puesto por escrito. Cada cifra lleva el aviso o el tarifario del que sale, para que pueda comprobarla antes de usarla.',
    byline: 'Escrito por el equipo de operaciones de Cross World Agency.',
    empty: 'Las primeras notas están en revisión y aparecerán aquí en breve.',
    read: 'Leer',
    min: 'min',
    feed: 'Canal RSS',
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: l} = await params;
  const locale = l as Locale;
  const t = ui[locale];
  return pageMetadata({locale, title: t.metaTitle, description: t.metaDescription, href: '/insights', image: '/images/canal-transit.jpg'});
}

export default async function InsightsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: l} = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const t = ui[locale];
  const list = articlesByDate();
  const url = `${site.url}${getPathname({locale, href: '/insights'})}`;

  // ItemList: le dice a los buscadores qué contiene este índice sin depender de que rastreen cada ficha.
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.title,
    url,
    itemListElement: list.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${site.url}${getPathname({locale, href: {pathname: '/insights/[slug]', params: {slug: a.slug[locale]}}})}`,
      name: a.title[locale],
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(itemList)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd([
        {name: locale === 'es' ? 'Inicio' : 'Home', url: `${site.url}/${locale}`},
        {name: t.title, url},
      ]))}} />

      <section className="border-b border-line bg-surface py-[clamp(40px,5vw,72px)]">
        <div className="wrap max-w-[76ch]">
          <nav aria-label="Breadcrumb" className="mb-4 font-mono text-[0.78rem] text-muted">
            <Link href="/" className="hover:text-ink">{locale === 'es' ? 'Inicio' : 'Home'}</Link> / <span className="text-ink">{t.title}</span>
          </nav>
          <h1 className="t-display">{t.title}</h1>
          <p className="mt-4 text-[1.1rem]">{t.lead}</p>
          <p className="mt-4 font-mono text-[0.78rem] text-muted">
            {t.byline} · <a href={`/${locale}/rss.xml`} className="underline underline-offset-2 hover:text-ink">{t.feed}</a>
          </p>
        </div>
      </section>

      <section className="py-[clamp(48px,6vw,88px)]">
        <div className="wrap">
          {list.length === 0 ? (
            <p className="max-w-[60ch] text-muted">{t.empty}</p>
          ) : (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {list.map((a) => (
                <li key={a.key} className="grid">
                  <article className="group grid overflow-hidden rounded-card border border-line bg-surface">
                    <Link href={{pathname: '/insights/[slug]', params: {slug: a.slug[locale]}}} className="block">
                      <Image src={a.image} alt={a.imageAlt[locale]} width={800} height={450} className="aspect-[16/9] w-full object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    </Link>
                    <div className="grid content-start gap-3 p-5">
                      <p className="m-0 font-mono text-[0.75rem] tracking-wide text-muted uppercase">
                        {a.topic[locale]} · <time dateTime={a.published}>{a.published}</time> · {a.readingMinutes} {t.min}
                      </p>
                      <h2 className="text-[1.15rem] leading-snug font-semibold text-ink">
                        <Link href={{pathname: '/insights/[slug]', params: {slug: a.slug[locale]}}} className="hover:text-accent-ink">{a.title[locale]}</Link>
                      </h2>
                      <p className="m-0 text-[0.95rem] text-text">{a.standfirst[locale]}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
