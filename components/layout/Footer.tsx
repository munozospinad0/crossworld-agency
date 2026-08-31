import {getLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {site, whatsappHref} from '@/content/site';
import {services} from '@/content/services';
import type {Locale} from '@/i18n/routing';

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Footer');
  const c = await getTranslations('Common');
  const cta = await getTranslations('Cta');
  return (
    <footer className="border-t border-white/10 bg-ink pt-10 pb-24 text-[0.92rem] text-on-dark-muted">
      <div className="wrap grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <h4 className="mb-2 text-[0.95rem] font-semibold text-white">{site.name}</h4>
          <p className="m-0 max-w-[40ch]">{t('tagline')}</p>
          <p className="mt-3 font-mono text-[0.82rem]">
            {site.legalName} · RUC {site.ruc} · IMO company number {site.imoCompanyNumber}
            <br />
            {site.address.street} · {site.address.street2} · {site.address.city}
            <br />
            <a className="hover:text-white" href={`tel:${site.phones.operations.e164}`}>{site.phones.operations.display}</a> · <a className="hover:text-white" href={`tel:${site.phones.office.e164}`}>{site.phones.office.display}</a>
            <br />
            <span>{c('timezone')}</span>
          </p>
        </div>
        <div>
          <h4 className="mb-2 text-[0.95rem] font-semibold text-white">{t('services')}</h4>
          <ul className="m-0 grid list-none gap-1.5 p-0">
            {services.map((s) => (
              <li key={s.key}>
                <Link className="hover:text-white" href={{pathname: '/services/[slug]', params: {slug: s.slug[locale]}}}>{s.title[locale]}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-[0.95rem] font-semibold text-white">{t('company')}</h4>
          <ul className="m-0 grid list-none gap-1.5 p-0">
            <li><Link className="hover:text-white" href="/about">{t('about')}</Link></li>
            <li><Link className="hover:text-white" href="/certifications">{t('certifications')}</Link></li>
            <li><Link className="hover:text-white" href="/compliance">{t('compliance')}</Link></li>
            <li><Link className="hover:text-white" href="/ports">{t('ports')}</Link></li>
            <li><Link className="hover:text-white" href="/panama-canal-transit-guide">{t('guide')}</Link></li>
            <li><Link className="hover:text-white" href="/contact">{t('contact')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-[0.95rem] font-semibold text-white">{t('nominate')}</h4>
          <ul className="m-0 grid list-none gap-1.5 p-0">
            <li><Link className="hover:text-white" href="/request-port-call">{cta('portcall')}</Link></li>
            <li><a className="hover:text-white" href={whatsappHref()}>{cta('whatsapp')}{site.whatsapp.confirm ? ` ${c('toConfirm')}` : ''}</a></li>
            <li><Link className="hover:text-white" href="/compliance">{t('ethics')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-4 text-[0.82rem]">
        <span>© {new Date().getFullYear()} {site.legalName}. {t('rights')}</span>
        <Link className="hover:text-white" href="/privacy">{t('privacy')}</Link>
        <Link className="hover:text-white" href="/terms">{t('terms')}</Link>
        <span>{t('figures')}</span>
      </div>
    </footer>
  );
}
