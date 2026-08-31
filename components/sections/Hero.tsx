import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {ButtonLink, ButtonA} from '@/components/ui/Button';
import {SignalFlags} from '@/components/brand/Logo';
import {site, whatsappHref} from '@/content/site';

export async function Hero() {
  const t = await getTranslations('Home');
  const cta = await getTranslations('Cta');
  const c = await getTranslations('Common');
  return (
    <header className="deep relative isolate min-h-[min(100dvh,900px)] overflow-hidden text-on-dark">
      {/* Foto a sangre con movimiento lento de cámara */}
      <div className="absolute inset-0">
        <Image
          src="/images/canal-transit.jpg"
          alt="Vessel entering the locks of the Panama Canal, seen from the deck"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="kenburns object-cover object-[60%_45%]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,20,32,0.96)_0%,rgba(11,20,32,0.82)_34%,rgba(11,20,32,0.35)_62%,rgba(11,20,32,0.15)_100%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#0b1420_0%,transparent_100%)]" />
      </div>

      <div className="wrap relative z-10 flex min-h-[min(100dvh,900px)] flex-col justify-end pt-32 pb-14 md:justify-center md:pt-28 md:pb-24">
        <div className="max-w-[46rem]">
          <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 font-mono text-[0.72rem] tracking-[0.14em] text-on-dark uppercase backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-sky shadow-[0_0_0_4px_rgba(76,141,240,0.25)]" />
            AMP · ACP · IMO {site.imoCompanyNumber} · 2010
          </p>
          <h1 className="t-display text-white">{t('h1')}</h1>
          <p className="t-lead mt-6 max-w-[44ch] text-on-dark-muted">{t('sub')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/request-port-call" variant="light">{cta('portcall')}</ButtonLink>
            <ButtonA href={whatsappHref()} variant="ghostDark" title={site.whatsapp.confirm ? c('toConfirm') : undefined}>{cta('whatsapp')}</ButtonA>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-end justify-between gap-6 md:mt-20">
          <SignalFlags className="h-6 w-auto opacity-90" />
          <p className="m-0 font-mono text-[0.78rem] text-on-dark-muted">Balboa · Cristóbal · 24/7 · UTC-5</p>
        </div>
      </div>
    </header>
  );
}
