import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {pages} from '@/content/pages';
import {site} from '@/content/site';
import {pageMetadata} from '@/lib/seo';
import {StaticPage} from '@/components/layout/StaticPage';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const p = pages.certifications[locale as Locale];
  return pageMetadata({locale: locale as Locale, title: p.metaTitle, description: p.metaDescription, href: '/certifications'});
}

export default async function CertificationsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const p = pages.certifications[locale as Locale];
  return (
    <StaticPage
      page={p}
      aside={
        <div className="shell grid gap-1.5">
          {[...site.certifications.map((c) => ({k: c.standard, seal: c.standard.split(':')[0], title: c.standard, sub: c.name})), {k: 'imo', seal: `IMO ${site.imoCompanyNumber}`, title: 'IMO company number', sub: site.name}].map((c, i) => (
            <div key={c.k} className="core grid grid-cols-[76px_1fr] items-center gap-4 bg-surface p-4">
              {/* Sello: anillo graduado con el número de la norma al centro */}
              <div className="relative grid h-[76px] w-[76px] place-items-center text-center font-mono text-[0.66rem] leading-tight font-medium text-accent-ink">
                <svg viewBox="0 0 76 76" aria-hidden="true" className="absolute inset-0 h-full w-full">
                  <circle cx="38" cy="38" r="35" fill="var(--color-accent-soft-2)" stroke="var(--color-line)" strokeWidth="1" />
                  <circle cx="38" cy="38" r="29" fill="none" stroke="var(--color-accent)" strokeWidth="0.8" strokeDasharray="1.5 3.2" opacity="0.7" />
                </svg>
                <span className="relative px-2">{c.seal}</span>
              </div>
              <div>
                <span className="block font-mono text-[0.64rem] tracking-[0.16em] text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <b className="block text-ink">{c.title}</b>
                <span className="text-[0.88rem] text-muted">{c.sub}</span>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}
