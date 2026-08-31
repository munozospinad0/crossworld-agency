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
        <div className="grid gap-3">
          {site.certifications.map((c) => (
            <div key={c.standard} className="grid grid-cols-[72px_1fr] items-center gap-3.5 rounded-card border border-line bg-surface p-4">
              <div className="grid h-[72px] w-[72px] place-items-center rounded-[10px] border border-line bg-accent-soft-2 text-center font-mono text-[0.72rem] leading-tight font-medium text-accent-ink">{c.standard.split(':')[0]}</div>
              <div>
                <b className="block text-ink">{c.standard} · {c.name}</b>
                <span className="text-[0.88rem] text-muted">{c.issuer}</span>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-[72px_1fr] items-center gap-3.5 rounded-card border border-line bg-surface p-4">
            <div className="grid h-[72px] w-[72px] place-items-center rounded-[10px] border border-line bg-accent-soft-2 text-center font-mono text-[0.72rem] leading-tight font-medium text-accent-ink">IMO<br />{site.imoCompanyNumber}</div>
            <div><b className="block text-ink">IMO company number</b><span className="text-[0.88rem] text-muted">{site.legalName}</span></div>
          </div>
        </div>
      }
    />
  );
}
