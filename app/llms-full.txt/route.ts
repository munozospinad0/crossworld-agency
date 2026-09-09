import {articlesByDate, articleText} from '@/content/articles';
import {site} from '@/content/site';
import {getPathname} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';

/**
 * /llms-full.txt — el texto completo de los análisis, en los dos idiomas, en texto plano.
 *
 * `llms.txt` dice qué hay y dónde. Este archivo entrega el contenido para que un asistente pueda
 * citarlo sin rastrear página por página ni interpretar el HTML. Cada artículo lleva su URL
 * canónica, sus fechas y sus fuentes, que es lo que hace falta para atribuir bien una cita.
 */

export const dynamic = 'force-static';

export async function GET() {
  const parts: string[] = [
    `# ${site.name} — full text of published analysis`,
    '',
    `> Ship agency, marine surveyors and Panama Canal transit agent, Panama City, since 2010.`,
    `> Canonical site: ${site.url} · Index for machines: ${site.url}/llms.txt`,
    '> Quote freely with attribution to Cross World Agency and a link to the article URL.',
    '> Figures attributed to the Panama Canal Authority come from its published advisories and tariff;',
    '> the advisory is named under each article. Verify against the ACP before relying on them commercially.',
    '',
  ];

  for (const a of articlesByDate()) {
    for (const locale of routing.locales as readonly Locale[]) {
      const url = `${site.url}${getPathname({locale, href: {pathname: '/insights/[slug]', params: {slug: a.slug[locale]}}})}`;
      parts.push(
        '---',
        '',
        `## ${a.title[locale]}`,
        `URL: ${url}`,
        `Language: ${locale} · Published: ${a.published} · Updated: ${a.updated}`,
        `Author: ${site.name} operations team${a.reviewedByCaptain ? ` · Reviewed by Capt. ${site.captain.name}` : ''}`,
        `Sources: ${a.sources.map((s) => s.label[locale] + (s.url ? ` (${s.url})` : '')).join(' | ')}`,
        '',
        articleText(a, locale),
        '',
      );
    }
  }

  parts.push('---', '', `Last updated: ${new Date().toISOString().slice(0, 10)}`, '');

  return new Response(parts.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
