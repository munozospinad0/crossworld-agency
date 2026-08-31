import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {ButtonLink, ButtonA} from '@/components/ui/Button';
import {site, whatsappHref} from '@/content/site';

export async function Hero() {
  const t = await getTranslations('Home');
  const cta = await getTranslations('Cta');
  const c = await getTranslations('Common');
  return (
    <header className="relative isolate grid min-h-[min(calc(100dvh-68px),820px)] grid-cols-1 overflow-hidden bg-ink text-on-dark md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)]">
      <div className="relative z-10 flex flex-col justify-center gap-5 px-[clamp(18px,4vw,44px)] py-10 md:py-24 md:pl-[max(clamp(18px,4vw,44px),calc((100vw-var(--container-max))/2+clamp(18px,4vw,44px)))]">
        <h1 className="t-display max-w-[14ch] text-white">{t('h1')}</h1>
        <p className="t-lead m-0 max-w-[44ch] text-on-dark-muted">{t('sub')}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink href="/request-port-call" variant="light">{cta('portcall')}</ButtonLink>
          <ButtonA href={whatsappHref()} variant="ghostDark" title={site.whatsapp.confirm ? c('toConfirm') : undefined}>{cta('whatsapp')}</ButtonA>
        </div>
      </div>
      <div className="relative order-first min-h-[260px] md:order-none md:min-h-[340px]">
        <Image
          src="/images/canal-transit.jpg"
          alt="Vessel entering the locks of the Panama Canal, seen from the deck"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 46vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 z-[1] bg-[linear-gradient(0deg,#0e1620_0%,rgba(14,22,32,0.15)_55%,rgba(14,22,32,0)_100%)] md:bg-[linear-gradient(90deg,#0e1620_0%,rgba(14,22,32,0.45)_22%,rgba(14,22,32,0)_55%)]" />
      </div>
    </header>
  );
}
