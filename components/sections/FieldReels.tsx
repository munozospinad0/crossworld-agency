'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Reveal} from '@/components/motion/Reveal';

/** Clips reales publicados por el cliente (material entregado el 1-sep-2026), transcodificados a 480x854.
 *  Sin etiquetas de marca: cada clip lleva su propia rotulación en el video. */
const reels = [
  {id: 1, seconds: 23},
  {id: 2, seconds: 36},
  {id: 3, seconds: 49},
  {id: 4, seconds: 86},
] as const;

function PlayGlyph({playing}: {playing: boolean}) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
      {playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5.5v13l11-6.5z" />}
    </svg>
  );
}

function Reel({r, active, onToggle, playLabel, pauseLabel}: {r: (typeof reels)[number]; active: boolean; onToggle: () => void; playLabel: string; pauseLabel: string}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    if (active) { v.play().catch(() => undefined); } else { v.pause(); }
  }, [active]);
  // Si el clip sale del viewport mientras suena, se pausa.
  useEffect(() => {
    const v = ref.current; if (!v || !active) return;
    const io = new IntersectionObserver((es) => { if (!es[0].isIntersecting) onToggle(); }, {threshold: 0.35});
    io.observe(v);
    return () => io.disconnect();
  }, [active, onToggle]);
  const mm = `${Math.floor(r.seconds / 60)}:${String(r.seconds % 60).padStart(2, '0')}`;
  return (
    <div className="shell-dark w-[min(72vw,250px)] shrink-0 snap-center md:w-auto">
      <div className="core group relative aspect-[9/16] overflow-hidden bg-ink-2">
        <video
          ref={ref}
          src={`/video/reel-${r.id}.mp4`}
          poster={`/video/reel-${r.id}.jpg`}
          preload="none"
          playsInline
          loop
          onEnded={() => active && onToggle()}
          className={`h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${active ? '' : 'group-hover:scale-[1.03]'}`}
        />
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(11,20,32,0.82),transparent_45%)] transition-opacity duration-300 ${active ? 'opacity-40' : 'opacity-100'}`} />
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${active ? pauseLabel : playLabel} ${r.id}`}
          aria-pressed={active}
          className="absolute inset-0 grid place-items-center text-white"
        >
          <span className={`grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-white/12 backdrop-blur-md transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${active ? 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100' : 'group-hover:scale-105'}`}>
            <PlayGlyph playing={active} />
          </span>
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-3.5 text-white">
          <span className="rounded-full border border-white/15 bg-white/8 px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.1em] uppercase">Clip {r.id}</span>
          <span className="font-mono text-[0.7rem] text-on-dark-muted tabular-nums">{mm}</span>
        </div>
      </div>
    </div>
  );
}

export function FieldReels() {
  const t = useTranslations('Home');
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="field" className="border-t border-white/8 bg-ink py-[clamp(72px,9vw,128px)] text-on-dark">
      <div className="wrap">
        <Reveal className="mb-8 max-w-[60ch] md:mb-10">
          <h2 className="t-h2 text-white">{t('reelsTitle')}</h2>
          <p className="mt-2 mb-0 text-[1.08rem] text-on-dark-muted">{t('reelsSub')}</p>
        </Reveal>
        <Reveal delay={1}>
          <div className="-mx-[var(--wrap-pad,20px)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--wrap-pad,20px)] pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
            {reels.map((r) => (
              <Reel key={r.id} r={r} active={active === r.id} onToggle={() => setActive((a) => (a === r.id ? null : r.id))} playLabel={t('reelPlay')} pauseLabel={t('reelPause')} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
