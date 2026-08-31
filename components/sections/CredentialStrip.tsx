'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {site} from '@/content/site';

export function CredentialStrip() {
  const t = useTranslations('Home.credentials');
  const [paused, setPaused] = useState(false);
  const items = [t('amp'), t('acp'), t('imo'), ...site.certifications.filter((c) => c.hero).map((c) => c.standard), t('since'), t('sides')];
  const Item = ({text, hidden}: {text: string; hidden?: boolean}) => (
    <li aria-hidden={hidden || undefined} className="whitespace-nowrap before:mr-3 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-sky before:align-middle before:content-['']">
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
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-white/15 bg-ink px-2.5 py-1 text-[0.78rem] font-medium text-on-dark"
      >
        {paused ? t('play') : t('pause')}
      </button>
    </section>
  );
}
