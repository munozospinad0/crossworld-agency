import {getTranslations} from 'next-intl/server';
import {ButtonLink, ButtonA} from '@/components/ui/Button';
import {NominateBlock} from './NominateBlock';
import {SignalFlags} from '@/components/brand/Logo';
import {SectionKicker} from '@/components/brand/SectionKicker';
import {Reveal} from '@/components/motion/Reveal';
import {dutyChannel} from '@/content/site';

export async function FinalCta() {
  const t = await getTranslations('Home');
  const cta = await getTranslations('Cta');
  const p = await getTranslations('Ports');
  const duty = dutyChannel();
  return (
    <section id="request" className="deep py-[clamp(72px,9vw,128px)] text-on-dark">
      <div className="wrap grid grid-cols-1 items-start gap-[clamp(28px,5vw,72px)] md:grid-cols-2">
        <div>
          <SignalFlags className="mb-8 h-5 w-auto opacity-80" />
          <Reveal>
            <SectionKicker k="request" index={9} dark />
            <h2 className="t-h2 text-white">{t('finalTitle')}</h2>
            {/* Ruta Balboa→Cristóbal como subrayado: `.draw` se dibuja cuando este Reveal recibe `.in` (mecanismo en globals.css). preserveAspectRatio="none" estira el trazo al ancho real para que los extremos coincidan con los rótulos. */}
            <svg viewBox="0 0 320 28" preserveAspectRatio="none" aria-hidden="true" className="route mt-4 h-7 w-full max-w-[420px]">
              <path
                d="M6 22 C 90 18 140 20 176 14 C 220 6 260 8 314 8"
                pathLength={1}
                className="draw"
                stroke="var(--color-brand-sky)"
                strokeWidth={1.6}
                fill="none"
                strokeLinecap="round"
              />
              <circle cx={6} cy={22} r={2.5} fill="var(--color-brand-sky)" opacity={0.9} />
              <circle cx={314} cy={8} r={2.5} fill="var(--color-brand-sky)" opacity={0.9} />
            </svg>
            <div className="mt-2 flex w-full max-w-[420px] justify-between gap-4 font-mono text-[0.62rem] tracking-[0.14em] uppercase text-on-dark-muted">
              <span>{p('balboa.name')} · {p('balboa.side')}</span>
              <span className="text-right">{p('cristobal.name')} · {p('cristobal.side')}</span>
            </div>
          </Reveal>
          <p className="t-lead mt-4 max-w-[44ch] text-on-dark-muted">{t('finalSub')}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/request-port-call" variant="light">{cta('portcall')}</ButtonLink>
            <ButtonA href={duty.href} variant="ghostDark">{cta(duty.label)}</ButtonA>
          </div>
        </div>
        <div className="shell-dark"><NominateBlock /></div>
      </div>
    </section>
  );
}
