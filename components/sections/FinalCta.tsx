import {getTranslations} from 'next-intl/server';
import {ButtonLink, ButtonA} from '@/components/ui/Button';
import {NominateBlock} from './NominateBlock';
import {SignalFlags} from '@/components/brand/Logo';
import {site, whatsappHref} from '@/content/site';

export async function FinalCta() {
  const t = await getTranslations('Home');
  const cta = await getTranslations('Cta');
  const c = await getTranslations('Common');
  return (
    <section id="request" className="deep py-[clamp(72px,9vw,128px)] text-on-dark">
      <div className="wrap grid grid-cols-1 items-start gap-[clamp(28px,5vw,72px)] md:grid-cols-2">
        <div>
          <SignalFlags className="mb-8 h-5 w-auto opacity-80" />
          <h2 className="t-h2 text-white">{t('finalTitle')}</h2>
          <p className="t-lead mt-4 max-w-[44ch] text-on-dark-muted">{t('finalSub')}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/request-port-call" variant="light">{cta('portcall')}</ButtonLink>
            <ButtonA href={whatsappHref()} variant="ghostDark" title={site.whatsapp.confirm ? c('toConfirm') : undefined}>{cta('whatsapp')}</ButtonA>
          </div>
        </div>
        <div className="shell-dark"><NominateBlock /></div>
      </div>
    </section>
  );
}
