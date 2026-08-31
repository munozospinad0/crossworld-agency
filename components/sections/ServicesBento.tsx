import Image from 'next/image';
import {getLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {services} from '@/content/services';
import type {Locale} from '@/i18n/routing';
import {Reveal} from '@/components/motion/Reveal';

const withImage = new Set(['agency', 'bunker', 'sts']);

export async function ServicesBento() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Home');
  const cta = await getTranslations('Cta');
  return (
    <section id="services" className="py-[clamp(56px,7vw,104px)]">
      <div className="wrap">
        <div className="mb-9 max-w-[64ch]">
          <h2 className="t-h2">{t('servicesTitle')}</h2>
          <p className="mt-2 text-[1.08rem] text-muted">{t('servicesSub')}</p>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(200px,auto)]">
          {services.map((s, i) => {
            const img = withImage.has(s.key);
            const wide = s.key === 'agency';
            return (
              <Reveal key={s.key} delay={(i % 4) as 0 | 1 | 2 | 3} className={`${wide ? 'lg:col-span-2' : ''}`}>
                <Link
                  href={{pathname: '/services/[slug]', params: {slug: s.slug[locale]}}}
                  className={`group relative flex h-full min-h-[200px] flex-col justify-end gap-1.5 overflow-hidden rounded-card border border-line bg-surface p-5.5 transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-1 ${img ? 'min-h-[280px] text-white' : ''}`}
                >
                  {img && (
                    <>
                      <Image src={s.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,22,32,0.92)_0%,rgba(14,22,32,0.35)_55%,rgba(14,22,32,0)_100%)]" />
                    </>
                  )}
                  <h3 className={`relative text-[1.15rem] ${img ? 'text-white' : ''}`}>{s.title[locale]}</h3>
                  <p className={`relative m-0 text-[0.95rem] ${img ? 'text-on-dark' : 'text-text'}`}>{s.oneLiner[locale]}</p>
                  <span className={`relative mt-1.5 text-[0.9rem] font-medium ${img ? 'text-white' : 'text-accent-ink'}`}>{cta('learnMore')} →</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
