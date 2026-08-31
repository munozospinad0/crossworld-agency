import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {ButtonLink} from '@/components/ui/Button';
import {site} from '@/content/site';

export async function Captain() {
  const t = await getTranslations('Home');
  return (
    <section id="captain" className="py-[clamp(56px,7vw,104px)]">
      <div className="wrap grid grid-cols-1 items-center gap-[clamp(24px,4vw,56px)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal className="relative aspect-[3/2] overflow-hidden rounded-card md:aspect-[4/5]">
          <Image src="/images/captain.jpg" alt={`${site.captain.name}, Cross World Agency, Panama City`} fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover object-[50%_20%]" />
        </Reveal>
        <Reveal delay={1}>
          <h2 className="t-h2">{t('captainTitle')}</h2>
          <p className="mt-3">{t('captainText')}</p>
          <blockquote className="mt-4 mb-0 max-w-[40ch] border-l-[3px] border-accent pl-4 text-[1.15rem] leading-[1.45] font-medium text-ink">“{t('captainQuote')}”</blockquote>
          <div className="mt-4 flex flex-wrap gap-2 font-mono text-[0.78rem]">
            {site.captain.credentials.map((c) => (
              <span key={c} className="rounded-full border border-line-strong bg-surface px-2.5 py-1 text-ink">{c}</span>
            ))}
          </div>
          <div className="mt-5">
            <ButtonLink href="/about" variant="ghost">{t('captainCta')}</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
