'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {site} from '@/content/site';

export function CredentialStrip() {
  const t = useTranslations('Home.credentials');
  const [paused, setPaused] = useState(false);
  const items = [t('amp'), t('acp'), t('imo'), ...site.certifications.map((c) => c.standard), t('since'), t('sides')];
  const Item = ({text, hidden}: {text: string; hidden?: boolean}) => (
    <li aria-hidden={hidden || undefined} className="whitespace-nowrap before:mr-4 before:inline-block before:h-2.5 before:w-[13px] before:align-[-2px] before:content-[''] before:bg-[repeating-linear-gradient(90deg,rgba(76,141,240,0.9)_0_1px,transparent_1px_6px)]">
      {text}
    </li>
  );
  return (
    <section className={`mq relative overflow-hidden border-b border-white/10 bg-ink py-4 ${paused ? 'paused' : ''}`} aria-label={t('label')}>
      <ul className="mq-track m-0 flex list-none gap-12 px-6 font-mono text-[0.8rem] tracking-[0.06em] text-on-dark">
        {items.map((x) => <Item key={x} text={x} />)}
        {items.map((x) => <Item key={`${x}-2`} text={x} hidden />)}
      </ul>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((v) => !v)}
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-white/12 bg-white/6 px-2.5 py-1 font-mono text-[0.7rem] tracking-[0.1em] text-on-dark uppercase transition-colors duration-300 motion-reduce:transition-none fine-pointer:hover:bg-white/12"
      >
        {paused ? t('play') : t('pause')}
      </button>
    </section>
  );
}
