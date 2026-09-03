import {getLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {site, whatsappHref} from '@/content/site';
import {services} from '@/content/services';
import type {Locale} from '@/i18n/routing';
import {AnchorMark, Wordmark} from '@/components/brand/Logo';
import {FlagWordmark} from '@/components/brand/FlagWordmark';

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Footer');
  const c = await getTranslations('Common');
  const cta = await getTranslations('Cta');
  const col = 'mb-3 font-mono text-[0.72rem] tracking-[0.14em] text-on-dark-muted uppercase';
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink pt-16 pb-28 text-[0.92rem] text-on-dark-muted">
      <svg aria-hidden="true" className="pointer-events-none absolute -bottom-4 left-0 h-[clamp(4rem,14vw,12rem)] w-auto select-none" viewBox="0 0 1200 160" preserveAspectRatio="xMinYMax meet">
        <text x="0" y="150" fontFamily="var(--font-brand)" fontWeight="600" fontSize="160" letterSpacing="8" fill="rgba(255,255,255,0.04)">CROSS WORLD</text>
      </svg>
      <div className="wrap relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3"><AnchorMark size={36} onDark /><Wordmark onDark /></div>
          <p className="mt-4 mb-0 max-w-[40ch]">{t('tagline')}</p>
          <FlagWordmark className="mt-6" />
          <p className="mt-5 font-mono text-[0.8rem] leading-relaxed">
            {site.name} · RUC {site.ruc}<br />IMO company number {site.imoCompanyNumber}<br />
            {site.address.street2}<br />{site.address.street}<br />{site.address.city}, {site.address.country}<br />
            <a className="underline decoration-white/20 underline-offset-4 hover:text-white" href={`mailto:${site.emails.operations.address}`}>{site.emails.operations.address}</a><br />
            <a className="underline decoration-white/20 underline-offset-4 hover:text-white" href={`tel:${site.phones.operations.e164}`}>{site.phones.operations.display}</a> · <a className="underline decoration-white/20 underline-offset-4 hover:text-white" href={`tel:${site.phones.office.e164}`}>{site.phones.office.display}</a><br />
            {c('timezone')}
          </p>
        </div>
        <div>
          <h4 className={col}>{t('services')}</h4>
          <ul className="m-0 grid list-none gap-2 p-0">
            {services.map((s) => (
              <li key={s.key}><Link className="transition-colors hover:text-white" href={{pathname: '/services/[slug]', params: {slug: s.slug[locale]}}}>{s.title[locale]}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={col}>{t('company')}</h4>
          <ul className="m-0 grid list-none gap-2 p-0">
            <li><Link className="transition-colors hover:text-white" href="/about">{t('about')}</Link></li>
            <li><Link className="transition-colors hover:text-white" href="/certifications">{t('certifications')}</Link></li>
            <li><Link className="transition-colors hover:text-white" href="/compliance">{t('compliance')}</Link></li>
            <li><Link className="transition-colors hover:text-white" href="/ports">{t('ports')}</Link></li>
            <li><Link className="transition-colors hover:text-white" href="/panama-canal-transit-guide">{t('guide')}</Link></li>
            <li><Link className="transition-colors hover:text-white" href="/contact">{t('contact')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className={col}>{t('nominate')}</h4>
          <ul className="m-0 grid list-none gap-2 p-0">
            <li><Link className="transition-colors hover:text-white" href="/request-port-call">{cta('portcall')}</Link></li>
            <li><a className="transition-colors hover:text-white" href={whatsappHref()}>{cta('whatsapp')}{site.whatsapp.confirm ? ` ${c('toConfirm')}` : ''}</a></li>
            <li><Link className="transition-colors hover:text-white" href="/compare-your-fda">{t('compare')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap relative mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[0.82rem]">
        <span>© {new Date().getFullYear()} {site.name}. {t('rights')}</span>
        <Link className="hover:text-white" href="/privacy">{t('privacy')}</Link>
        <Link className="hover:text-white" href="/terms">{t('terms')}</Link>
        <span>{t('figures')}</span>
      </div>
    </footer>
  );
}
