'use client';

import {useEffect, useState} from 'react';
import {useReducedMotion, useScroll, useSpring, useMotionValueEvent} from 'motion/react';
import {useTranslations} from 'next-intl';
import {IconHelm} from '@/components/brand/Icons';

/** Timón fijo que gira con el avance de lectura y vuelve arriba al pulsarlo. Solo escritorio; sin rotación con reduced motion. */
export function HelmProgress() {
  const t = useTranslations('Common');
  const reduce = useReducedMotion();
  const {scrollYProgress} = useScroll();
  const smooth = useSpring(scrollYProgress, {stiffness: 90, damping: 22, mass: 0.4});
  const [p, setP] = useState(0);
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(smooth, 'change', (v) => setP(v));
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const R = 19;
  const C = 2 * Math.PI * R;
  return (
    <button
      type="button"
      aria-label={t('backToTop')}
      onClick={() => window.scrollTo({top: 0, behavior: reduce ? 'auto' : 'smooth'})}
      className="fixed bottom-6 left-6 z-40 hidden h-12 w-12 place-items-center rounded-full border border-ink/10 bg-white/85 text-ink shadow-soft backdrop-blur transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white lg:grid"
      style={{opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', pointerEvents: visible ? 'auto' : 'none'}}
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(24,70,194,0.15)" strokeWidth="2.5" />
        <circle cx="24" cy="24" r={R} fill="none" stroke="#1846C2" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} />
      </svg>
      <span aria-hidden="true" style={{transform: reduce ? 'none' : `rotate(${p * 540}deg)`, display: 'grid', placeItems: 'center'}}>
        <IconHelm size={20} />
      </span>
    </button>
  );
}
