import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {site} from '@/content/site';

export async function Proof() {
  const t = await getTranslations('Home');
  return (
    <section className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] md:items-end">
        <Reveal>
          <span aria-hidden="true" className="block font-brand text-[4rem] leading-none text-brand-sky/70">“</span>
          <p className="m-0 -mt-6 max-w-[30ch] text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.25] font-medium tracking-[-0.02em] text-ink">{t('proofQuote')}</p>
          <p className="mt-5 text-[0.95rem] text-muted">
            <span className="mr-2 rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.72rem] text-accent-ink">Sample</span>
            {t('proofNote')}
          </p>
        </Reveal>
        <Reveal delay={1} className="text-[0.92rem] text-muted md:border-l md:border-line md:pl-8">
          <b className="block font-medium text-ink">{t('partnersLabel')}</b>
          <ul className="m-0 mt-2 grid list-none gap-1 p-0">
            {site.partners.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <p className="mt-3 mb-0 font-mono text-[0.78rem]">{site.representation.join(' · ')}</p>
        </Reveal>
      </div>
    </section>
  );
}
