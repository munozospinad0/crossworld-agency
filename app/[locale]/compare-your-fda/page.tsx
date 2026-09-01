import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {pageMetadata} from '@/lib/seo';
import {FdaCompareForm} from '@/components/forms/FdaCompareForm';
import {site} from '@/content/site';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Fda'});
  return pageMetadata({locale: locale as Locale, title: t('metaTitle'), description: t('metaDescription'), href: '/compare-your-fda'});
}

export default async function CompareFdaPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Fda');
  const c = await getTranslations('Common');
  return (
    <>
      <section className="border-b border-line bg-surface py-[clamp(40px,5vw,64px)]">
        <div className="wrap max-w-[70ch]">
          <h1 className="t-display">{t('title')}</h1>
          <p className="t-lead mt-4 text-muted">{t('lead')}</p>
        </div>
      </section>
      <section className="py-[clamp(40px,5vw,72px)]">
        <div className="wrap grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <FdaCompareForm />
          <aside className="grid content-start gap-4">
            <div className="rounded-card bg-ink p-6 text-on-dark">
              <h2 className="text-[1.05rem] text-white">{t('howTitle')}</h2>
              <ol className="mt-2 grid gap-2 pl-5 text-[0.92rem]">
                {(t.raw('howItems') as string[]).map((x) => <li key={x}>{x}</li>)}
              </ol>
              <p className="mt-4 mb-0 font-mono text-[0.85rem] text-on-dark-muted">{c('operations')}: {site.phones.operations.display}</p>
            </div>
            <p className="m-0 text-[0.85rem] text-muted">{t('privacyNote')}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
