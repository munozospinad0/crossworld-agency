import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {SectionKicker} from '@/components/brand/SectionKicker';
import {ButtonLink} from '@/components/ui/Button';

/**
 * Momento-documento "Compare su FDA": a la izquierda la propuesta (3 pasos y CTA),
 * a la derecha una cuenta de desembolso en blanco — worksheet con las 12 líneas
 * típicas, líder punteado y casilla de monto vacía, marcada SPECIMEN. Es un
 * artefacto-documento: se lee, no se acaricia (sin hover); el CTA vive a la
 * izquierda y el shell no es link. Server component, cero JS propio.
 */
export async function FdaHomeTeaser() {
  const t = await getTranslations('Fda');
  const h = await getTranslations('Home');
  const steps = t.raw('howItems') as string[];
  const lines = h.raw('fdaLines') as string[];
  return (
    <section className="border-t border-line bg-surface py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <Reveal className="grid items-start gap-[clamp(28px,5vw,72px)] md:grid-cols-2">
          {/* Izquierda: rúbrica, titular, pasos y CTA. */}
          <div>
            <SectionKicker k="fda" index={11} />
            <h2 className="t-h2 m-0">{t('title')}</h2>
            <p className="mt-3 mb-0 text-[1.08rem] text-muted">{t('lead')}</p>
            <ol className="m-0 mt-7 list-none space-y-4 p-0">
              {steps.map((step, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="shrink-0 font-mono text-[0.78rem] tabular-nums text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.95rem] leading-relaxed text-text">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <ButtonLink href="/compare-your-fda" variant="primary">{h('fdaCta')}</ButtonLink>
            </div>
          </div>

          {/* Derecha: el worksheet — cuenta de desembolso en blanco, no un dato fabricado. */}
          <div className="shell">
            <div className="core relative overflow-hidden bg-surface p-0">
              {/* Cabecera de folio. */}
              <div className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2.5 font-mono text-[0.66rem] tracking-[0.16em] uppercase text-muted sm:px-5">
                <span>{h('fdaDoc.header')}</span>
                <span>{h('fdaDoc.sub')}</span>
              </div>
              {/* Las 12 líneas: numeración, concepto, líder punteado y casilla vacía. */}
              <ol className="m-0 list-none p-0">
                {lines.map((line, i) => (
                  <li key={i} className="flex items-baseline gap-2 px-4 py-[7px] font-mono text-[0.72rem] text-text odd:bg-paper/60 sm:px-5 sm:text-[0.78rem]">
                    <span className="shrink-0 tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <span>{line}</span>
                    <span aria-hidden="true" className="flex-1 -translate-y-[0.28em] border-b border-dotted border-line-strong" />
                    <span aria-hidden="true" className="w-12 shrink-0 self-stretch border-b border-line sm:w-16" />
                  </li>
                ))}
              </ol>
              {/* Sello SPECIMEN sobre el documento. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 grid -rotate-[14deg] select-none place-items-center font-brand text-[3.2rem] tracking-[0.3em] uppercase text-ink opacity-[0.05] max-sm:text-[2.2rem]"
              >
                {h('fdaDoc.specimen')}
              </span>
            </div>
            <p className="m-0 px-2 pt-2 text-[0.8rem] text-muted">{t('privacyNote')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
