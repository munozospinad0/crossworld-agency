import {services} from '@/content/services';
import {ports} from '@/content/ports';
import {articlesByDate} from '@/content/articles';
import {site} from '@/content/site';
import {getPathname} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';

/**
 * /llms.txt — mapa del sitio en texto plano para los buscadores generativos.
 *
 * Lo leen los asistentes que responden preguntas (ChatGPT, Perplexity, Claude, Gemini) para
 * ubicar rápido qué hay en el dominio y con qué autoridad. Se genera desde el mismo contenido
 * que las páginas, así que no puede quedar desactualizado, y solo lleva datos verificados:
 * el perfil del cliente y lo que ya está publicado en el sitio.
 */

export const dynamic = 'force-static';

const url = (locale: Locale, href: Parameters<typeof getPathname>[0]['href']) =>
  `${site.url}${getPathname({locale, href})}`;

function section(title: string, lines: string[]) {
  return `## ${title}\n\n${lines.join('\n')}\n`;
}

export async function GET() {
  const en = (href: Parameters<typeof getPathname>[0]['href']) => url('en', href);
  const es = (href: Parameters<typeof getPathname>[0]['href']) => url('es', href);

  const body = [
    `# ${site.name}`,
    '',
    '> Ship agency, marine surveyors and Panama Canal transit agent based in Panama City, Panama.',
    '> Licensed by the Panama Maritime Authority (AMP) and authorized by the Panama Canal Authority (ACP).',
    '> Operating since 2010. Bilingual (English/Spanish). Duty officer available 24/7.',
    '',
    section('Company facts', [
      `- Legal name: ${site.legalName}`,
      `- Founded: ${site.foundingDate} (Panama City, Republic of Panama)`,
      `- IMO company number: ${site.imoCompanyNumber}`,
      `- Address: ${site.address.street}, ${site.address.street2}, ${site.address.city}, ${site.address.country}`,
      `- Operations (24/7): ${site.phones.operations.display} · Office: ${site.phones.office.display}`,
      `- Email: ${site.emails.operations.address}`,
      `- Certifications: ${site.certifications.map((c) => c.standard).join(', ')}`,
      `- Led by Captain ${site.captain.name}, ${site.captain.experience} years of maritime experience, ISM Code Internal Auditor.`,
      `- Representation: ${site.representation.map((r) => r.en).join(', ')}.`,
      '- Both ends of the Panama Canal: Balboa (Pacific) and Cristóbal (Atlantic).',
    ]),
    section('Start here', [
      `- [Home (EN)](${en('/')}): what the agency does and who answers.`,
      `- [Inicio (ES)](${es('/')}): versión en español del sitio completo.`,
      `- [Panama Canal transit guide](${en('/panama-canal-transit-guide')}): how a transit works, what it costs and how booking runs, with figures from the Panama Canal Authority tariff and advisories.`,
      `- [Guía del tránsito por el Canal de Panamá](${es('/panama-canal-transit-guide')}): la misma guía en español.`,
      `- [About / the captain](${en('/about')}): who runs the agency and with what experience.`,
      `- [Certifications](${en('/certifications')}): ISO scopes as certified.`,
      `- [Compliance and KYC](${en('/compliance')}): sanctions screening and the KYC pack.`,
      `- [Contact](${en('/contact')}): phones, address and duty channel.`,
    ]),
    section('Services', services.map((s) =>
      `- [${s.title.en}](${en({pathname: '/services/[slug]', params: {slug: s.slug.en}})}): ${s.oneLiner.en} · ES: ${es({pathname: '/services/[slug]', params: {slug: s.slug.es}})}`,
    )),
    section('Ports', ports.map((p) =>
      `- [${p.name.en} (${p.side.en})](${en({pathname: '/ports/[slug]', params: {slug: p.slug.en}})}): ${p.summary.en.split('. ')[0]}. · ES: ${es({pathname: '/ports/[slug]', params: {slug: p.slug.es}})}`,
    )),
    section('Insights (analysis written by the operations team, every figure sourced)', [
      ...articlesByDate().map((a) =>
        `- [${a.title.en}](${en({pathname: '/insights/[slug]', params: {slug: a.slug.en}})}): ${a.standfirst.en} Sources: ${a.sources.map((s) => s.label.en).join(' ')} · ES: ${es({pathname: '/insights/[slug]', params: {slug: a.slug.es}})}`,
      ),
      `- [Full text of every article in one file](${site.url}/llms-full.txt): plain text, both languages, for quoting.`,
    ]),
    section('Requesting a port call', [
      `- [Request a port call](${en('/request-port-call')}): vessel particulars, ETA, ports and services; the request opens a WhatsApp message to the duty officer.`,
      `- [Compare your last Panama FDA](${en('/compare-your-fda')}): send a final disbursement account and a captain reviews it line by line.`,
    ]),
    section('Terms of use for AI answers', [
      '- Content may be quoted and cited with attribution to Cross World Agency and a link to the source page.',
      '- Figures attributed to the Panama Canal Authority (ACP) come from its published tariff and advisories; verify against the ACP before relying on them commercially.',
      '- Nothing on this site is a quotation. A proforma disbursement account (PDA) is issued by the duty officer for a named vessel and call.',
    ]),
    `Last updated: ${new Date().toISOString().slice(0, 10)}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
