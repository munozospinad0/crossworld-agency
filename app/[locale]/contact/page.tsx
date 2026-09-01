import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {pages} from '@/content/pages';
import {site, whatsappHref} from '@/content/site';
import {pageMetadata} from '@/lib/seo';
import {StaticPage} from '@/components/layout/StaticPage';
import {ButtonLink, ButtonA} from '@/components/ui/Button';

const ui = {
  en: {pacific: 'Pacific side · Balboa', atlantic: 'Atlantic side · Cristóbal', office: 'Office', email: 'Email', address: 'Address', hours: '24/7, all year', form: 'Transit or port call? Use the request form: you get a request number and an itemized PDA.', bank: 'Bank details are issued only on the PDA and confirmed by phone with your duty officer. We never change bank details by email.', ethics: 'Concerns about our conduct: write to the office email.'},
  es: {pacific: 'Lado Pacífico · Balboa', atlantic: 'Lado Atlántico · Cristóbal', office: 'Oficina', email: 'Correo', address: 'Dirección', hours: '24/7, todo el año', form: '¿Tránsito o escala? Use el formulario de solicitud: recibe un número de solicitud y una PDA detallada.', bank: 'Los datos bancarios se emiten solo en la PDA y se confirman por teléfono con su oficial de guardia. Nunca cambiamos datos bancarios por correo.', ethics: 'Inquietudes sobre nuestra conducta: escriba al correo de la oficina.'},
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const p = pages.contact[locale as Locale];
  return pageMetadata({locale: locale as Locale, title: p.metaTitle, description: p.metaDescription, href: '/contact'});
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: l} = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const p = pages.contact[locale];
  const t = ui[locale];
  const cta = await getTranslations('Cta');
  const c = await getTranslations('Common');
  const Card = ({title, children}: {title: string; children: React.ReactNode}) => (
    <div className="rounded-card border border-line bg-surface p-5">
      <h2 className="text-[1.05rem]">{title}</h2>
      <div className="mt-2 font-mono text-[0.9rem] leading-relaxed">{children}</div>
    </div>
  );
  return (
    <StaticPage
      page={p}
      aside={
        <>
          <div className="rounded-card bg-ink p-6 text-on-dark">
            <p className="m-0">{t.form}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ButtonLink href="/request-port-call" variant="light">{cta('portcall')}</ButtonLink>
              <ButtonA href={whatsappHref()} variant="ghostDark" title={site.whatsapp.confirm ? c('toConfirm') : undefined}>{cta('whatsapp')}</ButtonA>
            </div>
          </div>
          <p className="m-0 text-[0.88rem] text-muted">{t.bank}</p>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Card title={t.pacific}>
          {site.phones.operations.label}: <a className="text-accent-ink underline" href={`tel:${site.phones.operations.e164}`}>{site.phones.operations.display}</a><br />{t.hours}
        </Card>
        <Card title={t.atlantic}>
          {site.phones.atlantic.display}<br />{locale === 'es' ? 'Atención coordinada desde la mesa de operaciones' : 'Attendance coordinated by the operations desk'}
        </Card>
        <Card title={t.office}>
          <a className="text-accent-ink underline" href={`tel:${site.phones.office.e164}`}>{site.phones.office.display}</a><br />{t.email}: <a className="text-accent-ink underline" href={`mailto:${site.emails.operations.address}`}>{site.emails.operations.address}</a>{site.emails.operations.confirm ? ` ${c('toConfirm')}` : ''}
        </Card>
        <Card title={t.address}>
          {site.legalName}<br />{site.address.street}<br />{site.address.street2}<br />{site.address.city}, {site.address.country}<br />{c('timezone')}
        </Card>
      </div>
      <p className="m-0 text-[0.9rem] text-muted">{t.ethics}</p>
    </StaticPage>
  );
}
