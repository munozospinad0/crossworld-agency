import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/motion/Reveal';
import {SectionKicker} from '@/components/brand/SectionKicker';
import {ChartLines, InstrumentChip} from '@/components/brand/InstrumentChip';
import {serviceIcons} from '@/components/brand/Icons';

// Indices 0 y 1 no llevan foto (duplicaban las del bento): panel instrumental.
const images = [null, null, '/images/port-cranes.jpg', '/images/crane.jpg'] as const;
// Icono por publico: 0 = armadores y gestores -> esclusas (agencia de transito);
// 1 = fletadores y traders -> barcaza de combustible (cantidad de bunker).
const panelIcons = [serviceIcons.agency, serviceIcons.fuel, undefined, undefined] as const;

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
            const img = images[i];
            const Icon = panelIcons[i];
            return (
              <Reveal key={w.title} delay={i as 0 | 1 | 2 | 3} className="shell h-full">
                <Link href="/contact" className="core group block h-full overflow-hidden bg-surface transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] fine-pointer:hover:-translate-y-0.5 fine-pointer:hover:shadow-lift">
                  {img ? (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={img} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] fine-pointer:group-hover:scale-[1.04]" />
                    </div>
                  ) : (
                    <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-ink-2">
                      <ChartLines className="absolute inset-0 h-full w-full text-white opacity-[0.08]" />
                      <InstrumentChip>{Icon ? <Icon size={24} /> : null}</InstrumentChip>
                    </div>
                  )}
                  <div className="px-5 py-4.5">
                    <h3 className="mb-1 text-[1.05rem]">{w.title}</h3>
                    <p className="m-0 text-[0.92rem] text-text">{w.text}</p>
                    <span className="mt-3 inline-flex items-center gap-2 font-mono text-[0.8rem] font-medium text-accent-ink transition-transform motion-reduce:transition-none fine-pointer:group-hover:translate-x-0.5">
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
