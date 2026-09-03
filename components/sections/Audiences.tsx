import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/motion/Reveal';
import {SectionKicker} from '@/components/brand/SectionKicker';
import {ChartLines, InstrumentChip} from '@/components/brand/InstrumentChip';
import {serviceIcons} from '@/components/brand/Icons';

/**
 * Cuatro públicos, cuatro paneles instrumentales iguales (sin fotos: las de archivo
 * mezclaban lenguajes). Icono por público: armadores → esclusas; fletadores → muestra de
 * bunker; P&I y aseguradores → balanza; flotas y operadores regionales → barcaza de combustible.
 */
const panelIcons = [serviceIcons.agency, serviceIcons.bunker, serviceIcons.claims, serviceIcons.fuel] as const;

export async function Audiences() {
  const t = await getTranslations('Home');
  const who = t.raw('who') as {title: string; text: string}[];
  return (
    <section id="who" className="border-t border-line bg-surface py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <Reveal className="mb-12">
          <SectionKicker k="clients" index={7} />
          <div className="grid gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
            <h2 className="t-h2">{t('whoTitle')}</h2>
            <p className="m-0 text-[1.08rem] text-muted md:pb-1">{t('whoSub')}</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {who.map((w, i) => {
            const Icon = panelIcons[i] ?? serviceIcons.agency;
            return (
              <Reveal key={w.title} delay={i as 0 | 1 | 2 | 3} className="shell h-full">
                <Link href="/contact" className="core group flex h-full flex-col overflow-hidden bg-surface transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] fine-pointer:hover:-translate-y-0.5 fine-pointer:hover:shadow-lift">
                  <div className="relative grid aspect-[5/3] place-items-center overflow-hidden bg-ink-2">
                    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_100%,rgba(76,141,240,0.22),transparent_65%)]" />
                    <ChartLines marks={false} className={`absolute inset-x-0 bottom-0 h-[70%] w-full text-white opacity-[0.10] ${i % 2 ? '-scale-x-100' : ''}`} />
                    <span className="absolute top-4 left-5 font-mono text-[0.66rem] tracking-[0.18em] text-on-dark-muted uppercase tabular-nums">0{i + 1}</span>
                    <InstrumentChip className="h-16 w-16"><Icon size={30} /></InstrumentChip>
                  </div>
                  <div className="flex flex-1 flex-col px-5 py-4.5">
                    <h3 className="mb-1 text-[1.05rem]">{w.title}</h3>
                    <p className="m-0 text-[0.92rem] text-text">{w.text}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 font-mono text-[0.8rem] font-medium text-accent-ink transition-transform motion-reduce:transition-none fine-pointer:group-hover:translate-x-0.5">
                      {t('whoCta')}
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
