import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {site} from '@/content/site';

export async function Proof() {
  const t = await getTranslations('Home');
  return (
    <section className="border-y border-line bg-surface py-[clamp(56px,7vw,104px)]">
      <div className="wrap">
        <Reveal>
          <p className="m-0 max-w-[32ch] text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.3] font-medium tracking-[-0.015em] text-ink">“{t('proofQuote')}”</p>
        </Reveal>
        <Reveal delay={1} className="mt-3.5 text-[0.95rem] text-muted">
          <span className="mr-2 rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.72rem] text-accent-ink">Sample</span>
          {t('proofNote')}
        </Reveal>
        <Reveal delay={2} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-[0.9rem] text-muted">
          <b className="font-medium text-ink">{t('partnersLabel')}</b>
          {site.partners.map((p) => <span key={p}>{p}</span>)}
          <span>{site.representation.join(' · ')}</span>
        </Reveal>
      </div>
    </section>
  );
}
