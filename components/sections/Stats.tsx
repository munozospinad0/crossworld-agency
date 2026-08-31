'use client';

import {useEffect, useRef, useState} from 'react';
import {useLocale} from 'next-intl';

type Stat = {value: number; prefix?: string; suffix?: string; label: {en: string; es: string}; static?: string};

const stats: Stat[] = [
  {value: 2010, label: {en: 'Licensed by the AMP and authorized by the ACP since', es: 'Licencia AMP y autorización ACP desde'}},
  {value: 3, label: {en: 'ISO certifications shown with issuer and scope (9001, 14001, 45001)', es: 'Certificaciones ISO con emisor y alcance (9001, 14001, 45001)'}},
  {value: 2, label: {en: 'Sides of the Canal with duty attendance: Balboa and Cristóbal', es: 'Lados del Canal con atención de guardia: Balboa y Cristóbal'}},
  {value: 24, suffix: '/7', label: {en: 'A duty officer answers, all year, in English and Spanish', es: 'Un oficial de guardia responde, todo el año, en inglés y español'}},
];

/** Renderiza el valor final desde el servidor (bots y sin JS lo ven completo); con JS cuenta desde 0 al entrar en viewport. */
function useCountUp(target: number, run: boolean, ms = 1400) {
  const [v, setV] = useState(target);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(target); return; }
    let raf = 0; const t0 = performance.now();
    setV(0);
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const e = 1 - Math.pow(1 - p, 4); // ease-out quart
      setV(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const safety = window.setTimeout(() => setV(target), ms + 300); // si rAF no corre (pestaña en segundo plano), el valor final igual aparece
    return () => { cancelAnimationFrame(raf); window.clearTimeout(safety); };
  }, [run, target, ms]);
  return v;
}

function Item({s, run, i}: {s: Stat; run: boolean; i: number}) {
  const locale = useLocale() as 'en' | 'es';
  const v = useCountUp(s.value, run, 1200 + i * 150);
  return (
    <div className="core bg-surface p-6 md:p-7">
      <div className="font-sans text-[clamp(2.4rem,4vw,3.6rem)] leading-none font-bold tracking-[-0.04em] text-ink tabular-nums">
        {s.prefix}{v}{s.suffix}
      </div>
      <p className="mt-3 mb-0 max-w-[26ch] text-[0.95rem] text-text">{s.label[locale]}</p>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setRun(true); io.disconnect(); } }, {threshold: 0.3});
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="py-[clamp(56px,7vw,96px)]">
      <div className="wrap" ref={ref}>
        <div className="shell grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => <Item key={s.label.en} s={s} run={run} i={i} />)}
        </div>
      </div>
    </section>
  );
}
