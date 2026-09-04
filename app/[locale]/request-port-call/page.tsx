import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {pageMetadata} from '@/lib/seo';
import {PortCallForm} from '@/components/forms/PortCallForm';
import {site, dutyChannel} from '@/content/site';
import {ButtonA} from '@/components/ui/Button';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Form'});
  return pageMetadata({locale: locale as Locale, title: t('metaTitle'), description: t('metaDescription'), href: '/request-port-call', noindex: true});
}

export default async function RequestPortCallPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Form');
  const cta = await getTranslations('Cta');
  const c = await getTranslations('Common');
  const duty = dutyChannel();
  return (
    <>
      <section className="border-b border-line bg-surface py-[clamp(40px,5vw,64px)]">
        <div className="wrap max-w-[70ch]">
          <h1 className="t-display">{t('title')}</h1>
          <p className="t-lead mt-4 text-muted">{t('lead')}</p>
        </div>
      </section>
      <section className="py-[clamp(40px,5vw,72px)]">
        <div className="wrap grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <PortCallForm />
          <aside className="grid content-start gap-4">
            <div className="rounded-card bg-ink p-6 text-on-dark">
              <h2 className="text-[1.05rem] text-white">{t('asideTitle')}</h2>
              <ul className="mt-2 grid list-disc gap-1.5 pl-5 text-[0.92rem]">
                {(t.raw('asideItems') as string[]).map((x) => <li key={x}>{x}</li>)}
              </ul>
              <div className="mt-4 grid gap-2">
                <a className="font-mono text-[0.9rem] text-white" href={`tel:${site.phones.operations.e164}`}>{c('operations')}: {site.phones.operations.display}</a>
                <ButtonA href={duty.href} variant="ghostDark" className="justify-self-start">{cta(duty.label)}</ButtonA>
              </div>
            </div>
            <p className="m-0 text-[0.85rem] text-muted">{t('attachmentsNote')}</p>
            <p className="m-0 text-[0.85rem] text-muted">{t('bankNote')}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
