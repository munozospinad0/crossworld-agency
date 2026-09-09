import type {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {Link, getPathname} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {articles, articleBySlug, articlesByDate, articleWordCount} from '@/content/articles';
import {site} from '@/content/site';
import {pageMetadata} from '@/lib/seo';
import {breadcrumbJsonLd, WD} from '@/lib/schema';
import {ButtonLink} from '@/components/ui/Button';
import {ArticleBody} from '@/components/insights/ArticleBody';

const ui = {
  en: {
    insights: 'Insights', contents: 'On this page', sources: 'Sources', related: 'Keep reading', published: 'Published', updated: 'Updated',
    min: 'min read', more: 'More from the duty desk',
    byTeam: 'Cross World Agency operations team',
    reviewedBy: 'Reviewed by',
    bylineRole: 'ISM Code Internal Auditor',
    ctaTitle: 'A vessel to move through Panama?',
    ctaText: 'Send the particulars and the duty officer prepares an itemized PDA. Answers 24/7, in English and Spanish.',
    cta: 'Request a port call',
  },
  es: {
    insights: 'Análisis', contents: 'En esta página', sources: 'Fuentes', related: 'Seguir leyendo', published: 'Publicado', updated: 'Actualizado',
    min: 'min de lectura', more: 'Más del puesto de guardia',
    byTeam: 'Equipo de operaciones de Cross World Agency',
    reviewedBy: 'Revisado por el capitán',
    bylineRole: 'auditor interno del Código ISM',
    ctaTitle: '¿Un buque que mover por Panamá?',
    ctaText: 'Envíe los datos y el oficial de guardia prepara una PDA detallada. Responde 24/7, en español e inglés.',
    cta: 'Solicitar port call',
  },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => articles.map((a) => ({locale, slug: a.slug[locale]})));
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}): Promise<Metadata> {
  const {locale: l, slug} = await params;
  const locale = l as Locale;
  const a = articleBySlug(locale, slug);
  if (!a) return {};
  return pageMetadata({
    locale,
    title: a.metaTitle[locale],
    description: a.metaDescription[locale],
    href: {pathname: '/insights/[slug]', params: {slug: a.slug[locale]}},
    enHref: {pathname: '/insights/[slug]', params: {slug: a.slug.en}},
    esHref: {pathname: '/insights/[slug]', params: {slug: a.slug.es}},
    image: a.image,
    imageAlt: a.imageAlt[locale],
  });
}

export default async function InsightPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale: l, slug} = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const a = articleBySlug(locale, slug);
  if (!a) notFound();
  const t = ui[locale];
  const url = `${site.url}${getPathname({locale, href: {pathname: '/insights/[slug]', params: {slug: a.slug[locale]}}})}`;
  const headings = a.body.filter((b) => b.t === 'h2');
  const others = articlesByDate().filter((x) => x.key !== a.key).slice(0, 2);

  // La revisión del capitán solo se declara cuando de verdad ocurrió (`reviewedByCaptain`).
  // Atribuirle un texto que no ha leído sería exactamente el tipo de dato inventado que el
  // cliente prohibió, y además es la clase de señal que hunde la credibilidad si se descubre.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title[locale],
    description: a.metaDescription[locale],
    url,
    inLanguage: locale,
    datePublished: a.published,
    dateModified: a.updated,
    image: `${site.url}${a.image}`,
    author: {'@type': 'Organization', '@id': `${site.url}/#org`, name: `${site.name} operations team`},
    ...(a.reviewedByCaptain && {
      reviewedBy: {
        '@type': 'Person',
        name: site.captain.name,
        jobTitle: locale === 'es' ? 'Capitán' : 'Captain',
        worksFor: {'@id': `${site.url}/#org`},
        hasCredential: site.captain.credentials.map((c) => ({'@type': 'EducationalOccupationalCredential', name: c})),
      },
    }),
    publisher: {'@id': `${site.url}/#org`},
    isPartOf: {'@type': 'Blog', name: `${site.name} — ${t.insights}`, url: `${site.url}${getPathname({locale, href: '/insights'})}`},
    citation: a.sources.filter((s) => s.url).map((s) => s.url),
    // Señales para buscadores generativos: de qué trata exactamente, a qué entidades conocidas
    // se refiere, cuánto contenido hay y que se puede leer y citar sin muro de pago.
    about: {'@type': 'Thing', name: 'Panama Canal', sameAs: WD.panamaCanal},
    mentions: [
      {'@type': 'Organization', name: 'Panama Canal Authority', sameAs: WD.canalAuthority},
      {'@type': 'Organization', name: 'Panama Maritime Authority', sameAs: WD.maritimeAuthority},
    ],
    articleSection: a.topic[locale],
    wordCount: articleWordCount(a, locale),
    isAccessibleForFree: true,
    license: `${site.url}/llms.txt`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd([
        {name: locale === 'es' ? 'Inicio' : 'Home', url: `${site.url}/${locale}`},
        {name: t.insights, url: `${site.url}${getPathname({locale, href: '/insights'})}`},
        {name: a.title[locale], url},
      ]))}} />

      <section className="border-b border-line bg-surface py-[clamp(40px,5vw,72px)]">
        <div className="wrap max-w-[76ch]">
          <nav aria-label="Breadcrumb" className="mb-4 font-mono text-[0.78rem] text-muted">
            <Link href="/" className="hover:text-ink">{locale === 'es' ? 'Inicio' : 'Home'}</Link> /{' '}
            <Link href="/insights" className="hover:text-ink">{t.insights}</Link> /{' '}
            <span className="text-ink">{a.topic[locale]}</span>
          </nav>
          <h1 className="t-display">{a.title[locale]}</h1>
          {/* Respuesta directa: el pasaje que citan los buscadores generativos. */}
          <p className="mt-5 text-[1.15rem] leading-relaxed text-ink">{a.standfirst[locale]}</p>
          <p className="mt-5 font-mono text-[0.78rem] text-muted">
            {a.reviewedByCaptain ? `${t.byTeam} · ${t.reviewedBy} ${site.captain.name}, ${t.bylineRole}` : t.byTeam}
          </p>
          <p className="mt-1 font-mono text-[0.78rem] text-muted">
            {t.published} <time dateTime={a.published}>{a.published}</time>
            {a.updated !== a.published && <> · {t.updated} <time dateTime={a.updated}>{a.updated}</time></>}
            {' '}· {a.readingMinutes} {t.min}
          </p>
        </div>
      </section>

      <section className="py-[clamp(48px,6vw,88px)]">
        <div className="wrap grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <article className="max-w-[76ch]">
            <Image src={a.image} alt={a.imageAlt[locale]} width={1200} height={675} className="mb-8 w-full rounded-card object-cover" sizes="(max-width: 1024px) 100vw, 66vw" priority />
            <ArticleBody blocks={a.body} locale={locale} />

            {a.related.length > 0 && (
              <div className="mt-12 border-t border-line pt-6">
                <h2 className="text-[1.05rem] font-semibold text-ink">{t.related}</h2>
                <ul className="mt-3 grid gap-2">
                  {a.related.map((r, i) => (
                    <li key={i}>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <Link href={r.href as any} className="text-accent-ink underline underline-offset-2 hover:text-accent">{r.label[locale]}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 border-t border-line pt-6">
              <h2 className="text-[1.05rem] font-semibold text-ink">{t.sources}</h2>
              <ul className="mt-3 grid gap-2 text-[0.9rem] text-muted">
                {a.sources.map((s, i) => (
                  <li key={i}>
                    {s.url
                      ? <a href={s.url} className="underline underline-offset-2 hover:text-ink" rel="nofollow noopener" target="_blank">{s.label[locale]}</a>
                      : s.label[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="grid content-start gap-6">
            {headings.length > 1 && (
              <nav aria-label={t.contents} className="rounded-card border border-line bg-surface p-5 lg:sticky lg:top-24">
                <h2 className="font-mono text-[0.78rem] tracking-wide text-muted uppercase">{t.contents}</h2>
                <ul className="mt-3 grid gap-2 text-[0.95rem]">
                  {headings.map((h) => (
                    <li key={h.id}><a href={`#${h.id}`} className="text-accent-ink hover:underline">{h.text[locale]}</a></li>
                  ))}
                </ul>
              </nav>
            )}
            {/* bg-ink, no bg-deep: esa clase no existe en el tema y dejaba texto blanco sobre
                fondo claro, ilegible. Mismo patrón que la caja de la guía del Canal. */}
            <div className="rounded-card bg-ink p-6 text-on-dark">
              <h2 className="text-[1.05rem] text-white">{t.ctaTitle}</h2>
              <p className="mt-2 text-[0.95rem]">{t.ctaText}</p>
              <div className="mt-4"><ButtonLink href="/request-port-call" variant="light">{t.cta}</ButtonLink></div>
            </div>
            {others.length > 0 && (
              <div className="rounded-card border border-line bg-surface p-5">
                <h2 className="font-mono text-[0.78rem] tracking-wide text-muted uppercase">{t.more}</h2>
                <ul className="mt-3 grid gap-3 text-[0.95rem]">
                  {others.map((o) => (
                    <li key={o.key}>
                      <Link href={{pathname: '/insights/[slug]', params: {slug: o.slug[locale]}}} className="text-accent-ink hover:underline">{o.title[locale]}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
