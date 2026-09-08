import {articlesByDate} from '@/content/articles';
import {site} from '@/content/site';
import {getPathname} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';

/**
 * Feed por idioma: /en/rss.xml y /es/rss.xml.
 *
 * `next.config.ts` ya redirigía /feed y /comments/feed (herencia del WordPress viejo) hacia
 * /en/rss.xml, que hasta ahora no existía: eran dos 308 que terminaban en un 404.
 */

export const dynamic = 'force-static';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CHANNEL = {
  en: {title: 'Cross World Agency — Insights', description: 'Notes from the duty desk on Panama Canal transits, port calls, surveys and bunker operations, with the source for every figure.'},
  es: {title: 'Cross World Agency — Análisis', description: 'Notas del puesto de guardia sobre tránsitos del Canal de Panamá, escalas, inspecciones y operaciones de bunker, con la fuente de cada cifra.'},
};

export async function GET(_req: Request, {params}: {params: Promise<{locale: string}>}) {
  const {locale: l} = await params;
  const locale = (routing.locales.includes(l as Locale) ? l : 'en') as Locale;
  const c = CHANNEL[locale];
  const home = `${site.url}${getPathname({locale, href: '/insights'})}`;
  const items = articlesByDate().map((a) => {
    const url = `${site.url}${getPathname({locale, href: {pathname: '/insights/[slug]', params: {slug: a.slug[locale]}}})}`;
    return [
      '    <item>',
      `      <title>${esc(a.title[locale])}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${new Date(a.published).toUTCString()}</pubDate>`,
      `      <description>${esc(a.standfirst[locale])}</description>`,
      `      <category>${esc(a.topic[locale])}</category>`,
      `      <dc:creator>${esc(site.name)}</dc:creator>`,
      '    </item>',
    ].join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${esc(c.title)}</title>`,
    `    <link>${home}</link>`,
    `    <description>${esc(c.description)}</description>`,
    `    <language>${locale}</language>`,
    `    <lastBuildDate>${new Date(articlesByDate()[0]?.updated ?? Date.now()).toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${site.url}/${locale}/rss.xml" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
