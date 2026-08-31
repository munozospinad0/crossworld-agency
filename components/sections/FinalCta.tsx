import {getTranslations} from 'next-intl/server';
import {ButtonLink, ButtonA} from '@/components/ui/Button';
import {NominateBlock} from './NominateBlock';
import {site, whatsappHref} from '@/content/site';

export async function FinalCta() {
  const t = await getTranslations('Home');
  const cta = await getTranslations('Cta');
  const c = await getTranslations('Common');
  return (
    <section id="request" className="bg-ink py-[clamp(56px,7vw,104px)] text-on-dark">
      <div className="wrap grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] md:grid-cols-2">
        <div>
          <h2 className="t-h2 text-white">{t('finalTitle')}</h2>
          <p className="t-lead mt-3 max-w-[44ch] text-on-dark-muted">{t('finalSub')}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href="/request-port-call" variant="light">{cta('portcall')}</ButtonLink>
            <ButtonA href={whatsappHref()} variant="ghostDark" title={site.whatsapp.confirm ? c('toConfirm') : undefined}>{cta('whatsapp')}</ButtonA>
          </div>
        </div>
        <NominateBlock />
      </div>
    </section>
  );
}
