import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Link, getPathname} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {guide} from '@/content/guide';
import {site} from '@/content/site';
import {pageMetadata} from '@/lib/seo';
import {breadcrumbJsonLd} from '@/lib/schema';
import {ButtonLink} from '@/components/ui/Button';
import {PdaAnatomy} from '@/components/guide/PdaAnatomy';

const ui = {
  en: {tldr: 'In short', contents: 'Contents', faq: 'Frequently asked questions', sources: 'Sources', reviewed: 'Last reviewed', byline: 'Written by the Cross World operations team. Reviewed by Capt. Guillermo A. Peña, ISM internal auditor.'},
  es: {tldr: 'En resumen', contents: 'Contenido', faq: 'Preguntas frecuentes', sources: 'Fuentes', reviewed: 'Última revisión', byline: 'Escrito por el equipo de operaciones de Cross World. Revisado por el capitán Guillermo A. Peña, auditor interno ISM.'},
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const g = guide[locale as Locale];
  return pageMetadata({locale: locale as Locale, title: g.metaTitle, description: g.metaDescription, href: '/panama-canal-transit-guide', image: '/images/canal-transit.jpg'});
}

export default async function GuidePage({params}: {params: Promise<{locale: string}>}) {
  const {locale: l} = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const g = guide[locale];
  const t = ui[locale];
  const url = `${site.url}${getPathname({locale, href: '/panama-canal-transit-guide'})}`;
  const article = {
    '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.metaDescription, url, inLanguage: locale,
    datePublished: '2026-09-07', dateModified: g.reviewed,
    author: {'@type': 'Organization', name: 'Cross World Agency operations team'},
    reviewedBy: {'@type': 'Person', name: site.captain.name, jobTitle: 'Captain'},
    publisher: {'@id': `${site.url}/#org`},
    citation: g.sources.map((s) => s.url),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(article)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd([{name: 'Home', url: `${site.url}/${locale}`}, {name: g.metaTitle, url}]))}} />
      <section className="border-b border-line bg-surface py-[clamp(40px,5vw,72px)]">
        <div className="wrap max-w-[76ch]">
          <nav aria-label="Breadcrumb" className="mb-4 font-mono text-[0.78rem] text-muted"><Link href="/" className="hover:text-ink">Home</Link> / <span className="text-ink">{locale === 'es' ? 'Guía del Canal' : 'Canal guide'}</span></nav>
          <h1 className="t-display">{g.title}</h1>
          <p className="mt-4 font-mono text-[0.8rem] text-muted">{t.reviewed}: {g.reviewed} · {t.byline}</p>
          <div className="mt-6 rounded-card border-l-[3px] border-accent bg-accent-soft-2 p-5">
            <h2 className="text-[1.05rem]">{t.tldr}</h2>
            <ul className="mt-2 grid list-disc gap-1.5 pl-5">{g.tldr.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <p className="mt-4 text-[0.9rem] text-muted">{g.verifiedNote}</p>
          <div className="mt-6"><ButtonLink href="/request-port-call">{g.cta}</ButtonLink></div>
        </div>
      </section>
      <section className="py-[clamp(48px,6vw,88px)]">
        <div className="wrap grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <article className="grid gap-10">
            {g.sections.map((s) => (
              <div key={s.id} id={s.id}>
                <h2 className="t-h2">{s.h2}</h2>
                {s.p?.map((p) => <p key={p} className="mt-3">{p}</p>)}
                {s.ul && <ul className="mt-4 grid list-disc gap-2 pl-5">{s.ul.map((x) => <li key={x}>{x}</li>)}</ul>}
                {s.id === 'agent' && <div className="mt-6"><PdaAnatomy locale={locale} /></div>}
              </div>
            ))}
            <div id="faq">
              <h2 className="t-h2">{t.faq}</h2>
              <div className="mt-4 grid gap-3">
                {g.faq.map((f) => (
                  <details key={f.q} className="rounded-card border border-line bg-surface p-4">
                    <summary className="cursor-pointer list-none font-medium text-ink">{f.q}</summary>
                    <p className="m-0 mt-2">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-[1.15rem]">{t.sources}</h2>
              <ul className="mt-2 grid list-disc gap-1.5 pl-5 text-[0.95rem]">{g.sources.map((s) => <li key={s.url}><a className="text-accent-ink underline" href={s.url} rel="noopener">{s.label}</a></li>)}</ul>
            </div>
          </article>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card border border-line bg-surface p-5">
              <h2 className="text-[1rem]">{t.contents}</h2>
              <ol className="mt-2 grid gap-1.5 pl-0 text-[0.92rem]" style={{listStyle: 'none'}}>
                {g.sections.map((s) => <li key={s.id}><a className="text-accent-ink hover:underline" href={`#${s.id}`}>{s.h2}</a></li>)}
                <li><a className="text-accent-ink hover:underline" href="#faq">{t.faq}</a></li>
              </ol>
            </div>
            <div className="mt-4 rounded-card bg-ink p-6 text-on-dark">
              <p className="m-0 text-[0.95rem]">{locale === 'es' ? 'Envíe los datos del buque y reciba una PDA detallada con número de solicitud.' : 'Send the vessel particulars and receive an itemized PDA with a request number.'}</p>
              <div className="mt-4"><ButtonLink href="/request-port-call" variant="light">{g.cta}</ButtonLink></div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
