import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {ButtonLink} from '@/components/ui/Button';
import {site} from '@/content/site';

export async function Captain() {
  const t = await getTranslations('Home');
  return (
    <section id="captain" className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap grid grid-cols-1 items-center gap-[clamp(28px,5vw,72px)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal className="shell w-full max-w-[420px] justify-self-center md:-rotate-1 md:justify-self-start">
          <div className="core relative aspect-[15/14] overflow-hidden bg-surface">
            <Image src="/images/captain.jpg" alt={`Captain ${site.captain.name} in uniform, Cross World Agency, Panama City`} fill sizes="(max-width: 768px) 90vw, 420px" quality={88} className="object-cover object-[50%_10%]" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(11,20,32,0.85),transparent)] p-5 pt-16 text-white">
              <span className="block font-brand text-[0.9rem] tracking-[0.12em]">CAPT. GUILLERMO A. PEÑA</span>
              <span className="block font-mono text-[0.72rem] text-on-dark-muted">ISM Code Internal Auditor · {site.captain.experience} years</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="t-h2">{t('captainTitle')}</h2>
          <p className="mt-4 max-w-[60ch]">{t('captainText')}</p>
          <blockquote className="mt-6 mb-0 max-w-[40ch] border-l-2 border-brand-sky pl-5 text-[clamp(1.2rem,1.8vw,1.5rem)] leading-[1.4] font-medium tracking-[-0.01em] text-ink">“{t('captainQuote')}”</blockquote>
          <div className="mt-6 flex flex-wrap gap-2 font-mono text-[0.78rem]">
            {site.captain.credentials.map((c) => (
              <span key={c} className="rounded-full border border-line bg-surface px-3 py-1.5 text-ink">{c}</span>
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
