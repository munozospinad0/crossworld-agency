import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {ButtonLink, ButtonA} from '@/components/ui/Button';
import {SignalFlags} from '@/components/brand/Logo';
import {ChartLines} from '@/components/brand/InstrumentChip';
import {site, dutyChannel} from '@/content/site';

/**
 * Hero. El H1 son las tres líneas que pidió el cliente (2-sep-2026): tres oficios,
 * un solo titular, compuestos como asientos de un manifiesto con índice en mono.
 * Sin subtítulo (retirado a pedido del cliente).
 */
export async function Hero() {
  const t = await getTranslations('Home');
  const cta = await getTranslations('Cta');
  const lines = t.raw('h1Lines') as string[];
  const duty = dutyChannel();
  return (
    <header className="deep relative isolate -mt-[92px] min-h-[min(100dvh,900px)] overflow-hidden text-on-dark">
      {/* Foto a sangre con movimiento lento de cámara */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Aerial view of a container vessel working cargo at a port terminal"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={82}
          className="kenburns object-cover object-[62%_40%]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,20,32,0.96)_0%,rgba(11,20,32,0.84)_36%,rgba(11,20,32,0.38)_64%,rgba(11,20,32,0.16)_100%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#0b1420_0%,transparent_100%)]" />
        {/* Curvas batimétricas: declaran el sistema cartográfico sobre la zona oscura del gradiente */}
        <ChartLines marks={false} className="pointer-events-none absolute -left-8 bottom-24 hidden w-[420px] text-white opacity-[0.05] md:block" />
      </div>

      <div className="wrap relative z-10 flex min-h-[min(100dvh,900px)] flex-col justify-end pt-32 pb-24 md:justify-center md:pt-28 md:pb-24">
        <div className="max-w-[54rem]">
          <p className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 font-mono text-[0.72rem] tracking-[0.14em] text-on-dark uppercase backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-sky shadow-[0_0_0_4px_rgba(76,141,240,0.25)]" />
            AMP · ACP · IMO {site.imoCompanyNumber} · 2010
          </p>
          <h1 className="m-0 text-white">
            {lines.map((line, i) => (
              <span
                key={line}
                className="hero-line grid grid-cols-[2.4rem_minmax(0,1fr)] items-baseline gap-x-3 border-t border-white/10 py-[0.55em] first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)]"
                style={{animationDelay: `${120 + i * 110}ms`}}
              >
                <span aria-hidden="true" className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-sky tabular-nums">0{i + 1}</span>
                <span className="block text-[clamp(1.75rem,4.3vw,3.55rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-balance">{line}</span>
              </span>
            ))}
          </h1>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/request-port-call" variant="light">{cta('portcall')}</ButtonLink>
            <ButtonA href={duty.href} variant="ghostDark">{cta(duty.label)}</ButtonA>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-5 md:mt-20">
          <SignalFlags className="h-6 w-auto opacity-90" />
          <p className="m-0 font-mono text-[0.78rem] tracking-[0.08em] text-on-dark-muted">Balboa · Cristóbal · 24/7 · UTC-5</p>
        </div>
      </div>
    </header>
  );
}
