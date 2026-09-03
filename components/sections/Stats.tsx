import {getTranslations} from 'next-intl/server';
import {site} from '@/content/site';
import {Reveal} from '@/components/motion/Reveal';
import {SectionKicker} from '@/components/brand/SectionKicker';

/**
 * Registro verificado: cuatro asientos con valor, regla que se dibuja al entrar
 * el Reveal y fuente citada en mono. Artefacto-documento: sin hover, sin JS.
 * Los valores viven en código; rótulos y fuentes vienen de messages (Home.stats).
 */
export async function Stats() {
  const t = await getTranslations('Home');
  const rows = t.raw('stats') as Array<{label: string; source: string}>;
  const values: Array<string | number> = [
    Number(site.foundingDate.slice(0, 4)), // 2010
    site.certifications.length,
    2,
    '24/7',
  ];
  return (
    <section className="py-[clamp(56px,7vw,96px)]">
      <div className="wrap">
        <Reveal>
          <SectionKicker k="record" index={2} />
        </Reveal>
        <div className="shell grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((row, i) => (
            <Reveal key={row.label} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="core flex h-full flex-col overflow-hidden bg-surface">
                {/* Franja graduada superior, puramente decorativa */}
                <span
                  aria-hidden="true"
                  className="block h-2 shrink-0"
                  style={{background: 'repeating-linear-gradient(90deg, rgba(11,20,32,0.12) 0 1px, transparent 1px 12px)'}}
                />
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="font-mono text-[0.66rem] tracking-[0.18em] text-muted uppercase tabular-nums">
                    REF {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-3 font-brand text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-brand-navy tabular-nums">
                    {values[i]}
                  </div>
                  <span aria-hidden="true" className="rule mt-4 block h-px bg-line-strong" />
                  <p className="mt-3 mb-0 max-w-[26ch] text-[0.95rem] text-text">{row.label}</p>
                  <p className="mt-auto mb-0 pt-3 font-mono text-[0.7rem] text-muted">{row.source}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
