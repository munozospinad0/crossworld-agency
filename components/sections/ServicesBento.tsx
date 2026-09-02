import Image from 'next/image';
import {getLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {services} from '@/content/services';
import type {Locale} from '@/i18n/routing';
import {Reveal} from '@/components/motion/Reveal';
import {serviceIcons} from '@/components/brand/Icons';
import {InstrumentChip, ChartLines} from '@/components/brand/InstrumentChip';

const withImage = new Set(['agency', 'bunker', 'sts']);
const cardImages: Record<string, string> = {agency: '/images/canal-transit.jpg', bunker: '/images/oil-terminal.jpg', sts: '/images/ship-bow.jpg'};

export async function ServicesBento() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Home');
  const cta = await getTranslations('Cta');
  return (
    <section id="services" className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <div className="mb-12 grid gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
          <h2 className="t-h2">{t('servicesTitle')}</h2>
          <p className="m-0 text-[1.08rem] text-muted md:pb-1">{t('servicesSub')}</p>
        </div>
        <div className="shell grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(220px,auto)]">
          {services.map((s, i) => {
            const img = withImage.has(s.key);
            const wide = s.key === 'agency';
            const Icon = serviceIcons[s.key as keyof typeof serviceIcons];
            return (
              <Reveal key={s.key} delay={(i % 4) as 0 | 1 | 2 | 3} className={`${wide ? 'lg:col-span-2' : ''}`}>
                <Link
                  href={{pathname: '/services/[slug]', params: {slug: s.slug[locale]}}}
                  className={`core group relative flex h-full min-h-[220px] flex-col justify-end gap-2 overflow-hidden bg-surface p-6 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] fine-pointer:hover:-translate-y-0.5 fine-pointer:hover:shadow-lift ${img ? 'min-h-[300px] text-white' : ''}`}
                >
                  {img ? (
                    <>
                      <Image src={cardImages[s.key] ?? s.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] fine-pointer:group-hover:scale-[1.04]" />
                      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,20,32,0.94)_0%,rgba(11,20,32,0.45)_50%,rgba(11,20,32,0.05)_100%)]" />
                    </>
                  ) : (
                    <>
                      <ChartLines className={`absolute -top-5 -right-7 h-[150px] w-[230px] text-ink opacity-[0.055] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none fine-pointer:group-hover:translate-x-1.5 ${i % 2 ? '-scale-x-100' : ''}`} />
                      <InstrumentChip className="absolute top-6 left-6">
                        <Icon size={30} />
                      </InstrumentChip>
                    </>
                  )}
                  <span className={`relative font-mono text-[0.72rem] tracking-[0.12em] ${img ? 'text-on-dark-muted' : 'text-muted'}`}>0{i + 1}</span>
                  <h3 className={`relative text-[1.2rem] leading-tight ${img ? 'text-white' : ''}`}>{s.title[locale]}</h3>
                  <p className={`relative m-0 text-[0.95rem] ${img ? 'text-on-dark' : 'text-text'}`}>{s.oneLiner[locale]}</p>
                  <span className={`relative mt-2 inline-flex items-center gap-2 text-[0.9rem] font-medium ${img ? 'text-white' : 'text-accent-ink'}`}>
                    {cta('learnMore')}
                    <span aria-hidden="true" className={`grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 ${img ? 'bg-white/15' : 'bg-accent/10'}`}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
