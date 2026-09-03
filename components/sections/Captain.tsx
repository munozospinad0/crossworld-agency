import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {ButtonLink} from '@/components/ui/Button';
import {SectionKicker} from '@/components/brand/SectionKicker';
import {ChartLines} from '@/components/brand/InstrumentChip';
import {site} from '@/content/site';

/* Micro-dial de instrumento para las placas de credenciales: aro tenue en
   currentColor + 4 ticks cardinales. El giro al hover es adorno puro. */
function PillDial() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none fine-pointer:group-hover/pill:rotate-[18deg]"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" className="block">
        <circle cx="7" cy="7" r="5.2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        {[0, 90, 180, 270].map((a) => (
          <line key={a} x1="7" y1="0.8" x2="7" y2="2.8" strokeWidth="1" strokeLinecap="round" className="stroke-brand-sky" transform={`rotate(${a} 7 7)`} />
        ))}
      </svg>
    </span>
  );
}

/**
 * "Bienvenido a Cross World" (texto del cliente, 2-sep-2026). La foto del capitán va
 * recortada sin fondo sobre una lámina de carta náutica: la figura rompe el marco por
 * arriba, y el rótulo con nombre y credencial queda al pie de la lámina.
 */
export async function Captain() {
  const t = await getTranslations('Home');
  const paragraphs = t.raw('captainParagraphs') as string[];
  return (
    <section id="captain" className="overflow-hidden py-[clamp(72px,9vw,128px)]">
      <div className="wrap grid grid-cols-1 items-center gap-[clamp(28px,5vw,72px)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal className="w-full max-w-[440px] justify-self-center pt-10 md:justify-self-start">
          <div className="shell">
            <div className="core relative aspect-[15/16] bg-ink-2">
              {/* Lámina: curvas batimétricas + halo cenital */}
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[inherit]">
                <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(76,141,240,0.28),transparent_60%)]" />
                <ChartLines marks={false} className="absolute -right-8 -bottom-6 h-[62%] w-[120%] text-white opacity-[0.10]" />
                <span className="absolute inset-x-6 top-6 flex items-center justify-between font-mono text-[0.62rem] tracking-[0.18em] text-on-dark-muted uppercase">
                  <span>CWA · 2010</span>
                  <span>{site.captain.experience} YRS</span>
                </span>
              </div>
              {/* Figura recortada: sobresale del marco por arriba */}
              <div className="absolute inset-x-0 -top-10 bottom-0">
                <Image
                  src="/images/captain-cutout.png"
                  alt={`Captain ${site.captain.name} in uniform, Cross World Agency, Panama City`}
                  fill
                  sizes="(max-width: 768px) 90vw, 440px"
                  quality={88}
                  className="object-contain object-bottom drop-shadow-[0_24px_28px_rgba(11,20,32,0.45)]"
                />
              </div>
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 rounded-b-[inherit] bg-[linear-gradient(0deg,rgba(11,20,32,0.92),rgba(11,20,32,0.55)_60%,transparent)] p-5 pt-14 text-white">
                <span className="block font-brand text-[0.9rem] tracking-[0.12em]">CAPT. GUILLERMO A. PEÑA</span>
                <span className="block font-mono text-[0.72rem] text-on-dark-muted">ISM Code Internal Auditor · {site.captain.experience} years</span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <SectionKicker k="captain" index={5} />
          <h2 className="t-h2">{t('captainTitle')}</h2>
          <p className="mt-3 max-w-[44ch] text-[clamp(1.15rem,1.7vw,1.35rem)] leading-snug font-medium tracking-[-0.01em] text-ink">{t('captainSub')}</p>
          {paragraphs.map((p) => (
            <p key={p} className="mt-4 max-w-[62ch]">{p}</p>
          ))}
          <p className="mt-7 mb-0 border-l-2 border-brand-sky pl-5 font-brand text-[clamp(1.2rem,2.2vw,1.7rem)] leading-snug tracking-[0.02em] text-brand-navy">
            {t('captainQuote')}
          </p>
          <p className="mt-7 mb-2 font-mono text-[0.68rem] tracking-[0.16em] uppercase text-muted">{t('captainCredentialsLabel')}</p>
          <div className="flex flex-wrap gap-2 font-mono text-[0.78rem]">
            {site.captain.credentials.map((c) => (
              <span
                key={c}
                className="group/pill inline-flex items-center gap-1.5 rounded-full bg-[radial-gradient(120%_120%_at_32%_18%,#ffffff_0%,var(--color-accent-soft-2)_55%,var(--color-accent-soft)_100%)] px-3 py-1.5 text-accent-ink shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(11,20,32,0.06)] ring-1 ring-ink/8"
              >
                <PillDial />
                {c}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <ButtonLink href="/about" variant="ghost">{t('captainCta')}</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
