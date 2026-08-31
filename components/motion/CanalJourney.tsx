'use client';

import {useEffect, useRef, useState} from 'react';
import {LazyMotion, domAnimation, useReducedMotion, useScroll, useTransform, useMotionValueEvent} from 'motion/react';

export type Stage = {name: string; title: string; text: string};

// Ruta estilizada del istmo, de Balboa (Pacífico, izquierda) a Cristóbal (Atlántico, derecha).
const ROUTE = 'M70 330 C 150 322 200 300 250 268 C 292 241 300 210 336 196 C 372 182 402 196 440 178 C 500 150 520 118 596 108 C 664 100 700 118 744 150 C 792 185 818 226 838 268';
// Posiciones de las 5 etapas a lo largo de la ruta (fracción de longitud)
const STOPS = [0.02, 0.3, 0.55, 0.78, 0.985];
const LABEL_DY = [-16, -16, -18, -16, -16];

function Scene({stage, vesselRef, drawRef, markersReady, ptsRef}: {stage: number; vesselRef: React.RefObject<SVGGElement | null>; drawRef: React.RefObject<SVGPathElement | null>; markersReady: boolean; ptsRef: React.RefObject<{x: number; y: number}[]>; }) {
  return (
    <svg viewBox="0 0 900 420" className="h-auto w-full" role="img" aria-label="Stylized map of the Panama Canal route from Balboa to Cristóbal">
      <defs>
        <linearGradient id="landA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16283f" />
          <stop offset="1" stopColor="#101f33" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(76,141,240,0.35)" />
          <stop offset="1" stopColor="rgba(76,141,240,0)" />
        </radialGradient>
      </defs>

      {/* masas de tierra con líneas de costa */}
      <path d="M0 420 L0 352 C 90 356 160 330 236 292 C 300 260 306 224 350 210 C 330 260 260 330 190 372 C 130 406 60 418 0 420 Z" fill="url(#landA)" />
      <path d="M900 0 L900 240 C 850 208 806 170 744 132 C 690 100 640 84 560 90 C 640 40 760 10 900 0 Z" fill="url(#landA)" />
      <path d="M0 420 C 120 400 220 350 320 260" fill="none" stroke="rgba(76,141,240,0.12)" strokeWidth="1" />
      <path d="M560 92 C 660 60 780 30 890 12" fill="none" stroke="rgba(76,141,240,0.12)" strokeWidth="1" />

      {/* lago Gatún */}
      <ellipse cx="520" cy="120" rx="120" ry="52" fill="rgba(76,141,240,0.10)" />
      <ellipse cx="520" cy="120" rx="120" ry="52" fill="url(#glow)" opacity={stage === 2 ? 1 : 0.35} style={{transition: 'opacity 600ms cubic-bezier(0.23,1,0.32,1)'}} />

      {/* rótulos de océanos */}
      <text x="120" y="90" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2" fill="rgba(169,182,195,0.65)">PACIFIC OCEAN</text>
      <text x="640" y="360" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2" fill="rgba(169,182,195,0.65)">CARIBBEAN SEA</text>

      {/* ruta base + progreso */}
      <path d={ROUTE} fill="none" stroke="rgba(76,141,240,0.22)" strokeWidth="8" strokeLinecap="round" />
      <path ref={drawRef} d={ROUTE} fill="none" stroke="#4C8DF0" strokeWidth="2.5" strokeLinecap="round" />

      {/* marcadores de etapa (posicionados sobre la ruta tras montar) */}
      {markersReady && ptsRef.current.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <circle r={i === 0 || i === 4 ? 7 : 5} fill={stage === i ? '#fff' : '#0b1420'} stroke={stage >= i ? '#4C8DF0' : 'rgba(76,141,240,0.4)'} strokeWidth="2.5" style={{transition: 'fill 400ms, stroke 400ms'}} />
          {stage === i && <circle r="13" fill="none" stroke="rgba(76,141,240,0.4)" strokeWidth="1.5" />}
          <text y={LABEL_DY[i]} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={stage === i ? '#ffffff' : 'rgba(169,182,195,0.8)'} style={{transition: 'fill 400ms'}}>
            {['Balboa', 'Miraflores', 'Gatún Lake', 'Gatún', 'Cristóbal'][i]}
          </text>
        </g>
      ))}

      {/* buque (vista cenital) */}
      <g ref={vesselRef} style={{willChange: 'transform'}}>
        <g transform="rotate(90)">
          <path d="M0 -13 C 4 -9 5 -2 5 4 L 5 10 C 5 12 3.5 13 0 13 C -3.5 13 -5 12 -5 10 L -5 4 C -5 -2 -4 -9 0 -13 Z" fill="#EEF2F6" stroke="#0B2E8A" strokeWidth="1.2" />
          <rect x="-2.6" y="-1" width="5.2" height="7" rx="1" fill="#4C8DF0" opacity="0.9" />
          <circle cx="0" cy="-6.5" r="1.3" fill="#0B2E8A" />
        </g>
      </g>
    </svg>
  );
}

export function CanalJourney({stages, hint}: {stages: Stage[]; hint: string}) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const vesselRef = useRef<SVGGElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const ptsRef = useRef<{x: number; y: number}[]>([]);
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);

  const {scrollYProgress} = useScroll({target: containerRef, offset: ['start start', 'end end']});
  const t = useTransform(scrollYProgress, [0.04, 0.96], [0, 1], {clamp: true});

  useEffect(() => {
    const path = drawRef.current;
    if (!path) return;
    const L = path.getTotalLength();
    ptsRef.current = STOPS.map((s) => {
      const p = path.getPointAtLength(s * L);
      return {x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10};
    });
    path.style.strokeDasharray = String(L);
    path.style.strokeDashoffset = reduce ? '0' : String(L);
    if (vesselRef.current) {
      const p0 = path.getPointAtLength(reduce ? L : 0);
      vesselRef.current.style.transform = `translate(${p0.x}px, ${p0.y}px)`;
    }
    setReady(true);
    if (reduce) setStage(stages.length - 1);
  }, [reduce, stages.length]);

  useMotionValueEvent(t, 'change', (v) => {
    if (reduce) return;
    const path = drawRef.current;
    const vessel = vesselRef.current;
    if (!path || !vessel) return;
    const L = path.getTotalLength();
    const d = v * L;
    const p = path.getPointAtLength(d);
    const p2 = path.getPointAtLength(Math.min(L, d + 2));
    const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
    vessel.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${angle}deg)`;
    path.style.strokeDashoffset = String(L * (1 - v));
    let s = 0;
    for (let i = 0; i < STOPS.length; i++) if (v >= STOPS[i] - 0.08) s = i;
    setStage((prev) => (prev === s ? prev : s));
  });

  if (reduce) {
    return (
      <div>
        <Scene stage={stages.length - 1} vesselRef={vesselRef} drawRef={drawRef} markersReady={ready} ptsRef={ptsRef} />
        <ol className="mt-8 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {stages.map((s, i) => (
            <li key={s.name} className="shell-dark">
              <div className="core h-full bg-ink-2 p-5">
                <span className="font-mono text-[0.72rem] tracking-[0.14em] text-brand-sky uppercase">0{i + 1} · {s.name}</span>
                <h3 className="mt-2 text-[1.1rem] text-white">{s.title}</h3>
                <p className="m-0 mt-1.5 text-[0.95rem] text-on-dark">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} style={{height: '340vh'}}>
        <div className="sticky top-[92px] flex h-[calc(100dvh-92px)] flex-col justify-center gap-6">
          <Scene stage={stage} vesselRef={vesselRef} drawRef={drawRef} markersReady={ready} ptsRef={ptsRef} />
          <div className="relative mx-auto min-h-[168px] w-full max-w-[620px]">
            {stages.map((s, i) => (
              <div
                key={s.name}
                aria-hidden={stage !== i}
                className="absolute inset-0"
                style={{opacity: stage === i ? 1 : 0, transform: stage === i ? 'none' : 'translateY(14px)', transition: 'opacity 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1)', pointerEvents: stage === i ? 'auto' : 'none'}}
              >
                <div className="shell-dark">
                  <div className="core bg-ink-2 p-5 md:p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-[0.72rem] tracking-[0.14em] text-brand-sky uppercase">0{i + 1} · {s.name}</span>
                      <span className="font-mono text-[0.72rem] text-on-dark-muted">{i + 1} / {stages.length}</span>
                    </div>
                    <h3 className="mt-2 text-[1.2rem] text-white">{s.title}</h3>
                    <p className="m-0 mt-1.5 text-[0.98rem] text-on-dark">{s.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p aria-hidden="true" className="m-0 text-center font-mono text-[0.72rem] tracking-[0.2em] text-on-dark-muted uppercase" style={{opacity: stage === stages.length - 1 ? 0 : 1, transition: 'opacity 400ms'}}>{hint} ↓</p>
        </div>
      </div>
    </LazyMotion>
  );
}
