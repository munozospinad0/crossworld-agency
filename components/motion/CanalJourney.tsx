'use client';

import {useEffect, useRef, useState} from 'react';
import {LazyMotion, domAnimation, useReducedMotion, useScroll, useSpring, useTransform, useMotionValueEvent} from 'motion/react';

export type Stage = {name: string; title: string; text: string; tag: string};

type Geo = {
  id: 'd' | 'm';
  viewBox: string;
  route: string;
  land: string[];
  coast: string[];
  lake: {cx: number; cy: number; rx: number; ry: number};
  oceans: {text: string; x: number; y: number}[];
  stops: number[];
  labels: string[];
  labelDx: number[];
  labelDy: number[];
  labelAnchor: ('start' | 'middle' | 'end')[];
  locks: number[];
  compass: {x: number; y: number};
  soundings: {x: number; y: number; v: string}[];
};

// Carta horizontal (escritorio): Pacífico a la izquierda, Caribe a la derecha.
const DESKTOP: Geo = {
  id: 'd',
  viewBox: '0 0 900 420',
  route: 'M70 330 C 150 322 200 300 250 268 C 292 241 300 210 336 196 C 372 182 402 196 440 178 C 500 150 520 118 596 108 C 664 100 700 118 744 150 C 792 185 818 226 838 268',
  land: [
    'M0 420 L0 352 C 90 356 160 330 236 292 C 300 260 306 224 350 210 C 330 260 260 330 190 372 C 130 406 60 418 0 420 Z',
    'M900 0 L900 240 C 850 208 806 170 744 132 C 690 100 640 84 560 90 C 640 40 760 10 900 0 Z',
  ],
  coast: ['M0 420 C 120 400 220 350 320 260', 'M560 92 C 660 60 780 30 890 12'],
  lake: {cx: 520, cy: 120, rx: 120, ry: 52},
  oceans: [{text: 'PACIFIC OCEAN', x: 200, y: 205}, {text: 'CARIBBEAN SEA', x: 760, y: 368}],
  stops: [0.02, 0.3, 0.55, 0.78, 0.985],
  labels: ['Balboa', 'Miraflores', 'Gatún Lake', 'Gatún', 'Cristóbal'],
  labelDx: [0, 0, 0, 0, 0],
  labelDy: [-16, -16, -18, -16, -16],
  labelAnchor: ['middle', 'middle', 'middle', 'middle', 'middle'],
  locks: [1, 3],
  compass: {x: 62, y: 66},
  soundings: [
    {x: 132, y: 262, v: '54'}, {x: 96, y: 150, v: '61'}, {x: 306, y: 112, v: '46'},
    {x: 680, y: 300, v: '38'}, {x: 806, y: 330, v: '27'}, {x: 566, y: 236, v: '33'},
  ],
};

// Carta vertical (celular): Pacífico abajo, Caribe arriba, como la geografía real.
const MOBILE: Geo = {
  id: 'm',
  viewBox: '0 0 420 640',
  route: 'M84 592 C 116 562 128 520 150 474 C 172 428 176 386 206 338 C 238 288 240 242 252 194 C 262 154 292 114 330 76',
  land: [
    'M0 606 C 40 602 66 598 84 592 C 116 562 128 520 150 474 C 172 428 176 386 206 338 C 238 288 240 242 252 194 C 262 154 292 114 330 76 C 280 62 190 82 110 98 L0 120 Z',
    'M100 606 C 132 576 144 532 166 486 C 188 440 192 398 222 350 C 254 300 256 254 268 206 C 278 166 306 128 344 84 L420 106 L420 556 C 330 574 200 592 100 606 Z',
  ],
  coast: ['M0 616 C 140 606 300 584 420 566', 'M0 110 C 140 92 280 74 420 96'],
  lake: {cx: 216, cy: 338, rx: 74, ry: 58},
  oceans: [{text: 'PACIFIC OCEAN', x: 210, y: 632}, {text: 'CARIBBEAN SEA', x: 210, y: 30}],
  stops: [0.02, 0.3, 0.55, 0.78, 0.985],
  labels: ['Balboa', 'Miraflores', 'Gatún Lake', 'Gatún', 'Cristóbal'],
  labelDx: [16, 18, -18, 18, -16],
  labelDy: [-8, 4, 4, 4, -6],
  labelAnchor: ['start', 'start', 'end', 'start', 'end'],
  locks: [1, 3],
  compass: {x: 46, y: 178},
  soundings: [{x: 330, y: 600, v: '54'}, {x: 90, y: 626, v: '61'}, {x: 120, y: 44, v: '46'}, {x: 350, y: 40, v: '38'}],
};

// Perfil de elevación: 0 m → +26 m (lago) → 0 m
const PROFILE = 'M8 46 L64 46 C 84 46 88 20 108 20 L192 20 C 212 20 216 46 236 46 L292 46';

type Pt = {x: number; y: number; a: number};

function Compass({x, y}: {x: number; y: number}) {
  return (
    <g transform={`translate(${x} ${y})`} opacity="0.55">
      <circle r="16" fill="none" stroke="rgba(169,182,195,0.5)" strokeWidth="0.8" />
      <path d="M0 -14 L3 0 L0 14 L-3 0 Z" fill="rgba(238,242,246,0.85)" />
      <path d="M-14 0 L0 3 L14 0 L0 -3 Z" fill="rgba(169,182,195,0.5)" />
      <text y="-20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(238,242,246,0.8)">N</text>
    </g>
  );
}

function Scene({geo, stage, pts, ready, vesselRef, drawRef, onStop}: {geo: Geo; stage: number; pts: Pt[]; ready: boolean; vesselRef: React.RefObject<SVGGElement | null>; drawRef: React.RefObject<SVGPathElement | null>; onStop: (i: number) => void}) {
  return (
    <svg viewBox={geo.viewBox} preserveAspectRatio="xMidYMid meet" className="h-full w-full" role="img" aria-label="Nautical-chart style map of the Panama Canal route from Balboa to Cristóbal">
      <defs>
        <linearGradient id="landA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16283f" />
          <stop offset="1" stopColor="#101f33" />
        </linearGradient>
        <radialGradient id="lakeGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(76,141,240,0.35)" />
          <stop offset="1" stopColor="rgba(76,141,240,0)" />
        </radialGradient>
        <radialGradient id="vGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(127,176,255,0.5)" />
          <stop offset="1" stopColor="rgba(127,176,255,0)" />
        </radialGradient>
      </defs>

      {geo.land.map((d) => <path key={d.slice(0, 24)} d={d} fill="url(#landA)" />)}
      {geo.coast.map((d) => <path key={d.slice(0, 24)} d={d} fill="none" stroke="rgba(76,141,240,0.14)" strokeWidth="1" />)}

      {/* sondas de profundidad, como en una carta náutica */}
      {geo.soundings.map((s) => (
        <text key={`${s.x}-${s.y}`} x={s.x} y={s.y} fontFamily="var(--font-mono)" fontSize="9" fill="rgba(169,182,195,0.38)" fontStyle="italic">{s.v}</text>
      ))}

      <ellipse cx={geo.lake.cx} cy={geo.lake.cy} rx={geo.lake.rx} ry={geo.lake.ry} fill="rgba(76,141,240,0.10)" />
      <ellipse cx={geo.lake.cx} cy={geo.lake.cy} rx={geo.lake.rx} ry={geo.lake.ry} fill="url(#lakeGlow)" opacity={stage === 2 ? 1 : 0.3} style={{transition: 'opacity 600ms cubic-bezier(0.23,1,0.32,1)'}} />

      {geo.oceans.map((o) => (
        <text key={o.text} x={o.x} y={o.y} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2.5" fill="rgba(169,182,195,0.6)">{o.text}</text>
      ))}
      <Compass x={geo.compass.x} y={geo.compass.y} />

      <path d={geo.route} fill="none" stroke="rgba(76,141,240,0.2)" strokeWidth="8" strokeLinecap="round" />
      <path ref={drawRef} d={geo.route} fill="none" stroke="#4C8DF0" strokeWidth="2.5" strokeLinecap="round" />

      {/* cámaras de esclusas: tres compuertas cruzando el cauce, se encienden en su etapa */}
      {ready && geo.locks.map((li) => {
        const p = pts[li];
        if (!p) return null;
        const active = stage === li;
        return (
          <g key={`lock-${li}`} transform={`translate(${p.x} ${p.y}) rotate(${p.a})`}>
            {[-9, 0, 9].map((o) => (
              <rect key={o} x={o - 1.4} y={-8} width={2.8} height={16} rx={1.2} fill={active ? '#7FB0FF' : 'rgba(127,176,255,0.35)'} style={{transition: 'fill 500ms'}} />
            ))}
          </g>
        );
      })}

      {/* marcadores de etapa (clicables con puntero; el teclado usa los puntos de la tarjeta) */}
      {ready && pts.map((p, i) => (
        <g key={`stop-${i}`} transform={`translate(${p.x} ${p.y})`} onClick={() => onStop(i)} style={{cursor: 'pointer'}}>
          <circle r="14" fill="rgba(0,0,0,0)" />
          <circle r={i === 0 || i === 4 ? 7 : 5} fill={stage === i ? '#fff' : '#0b1420'} stroke={stage >= i ? '#4C8DF0' : 'rgba(76,141,240,0.4)'} strokeWidth="2.5" style={{transition: 'fill 400ms, stroke 400ms'}} />
          {stage === i && <circle r="13" fill="none" stroke="rgba(76,141,240,0.45)" strokeWidth="1.5" />}
          <text x={geo.labelDx[i]} y={geo.labelDy[i]} textAnchor={geo.labelAnchor[i]} fontFamily="var(--font-mono)" fontSize="12" fill={stage === i ? '#ffffff' : 'rgba(169,182,195,0.85)'} style={{transition: 'fill 400ms'}}>
            {geo.labels[i]}
          </text>
        </g>
      ))}

      {/* buque con halo y estela */}
      <g ref={vesselRef} style={{willChange: 'transform'}}>
        <circle r="17" fill="url(#vGlow)" />
        <g transform="rotate(90)">
          <path d="M0 -13 C 4 -9 5 -2 5 4 L 5 10 C 5 12 3.5 13 0 13 C -3.5 13 -5 12 -5 10 L -5 4 C -5 -2 -4 -9 0 -13 Z" fill="#EEF2F6" stroke="#0B2E8A" strokeWidth="1.2" />
          <rect x="-2.6" y="-1" width="5.2" height="7" rx="1" fill="#4C8DF0" opacity="0.9" />
          <circle cx="0" cy="-6.5" r="1.3" fill="#0B2E8A" />
          <path d="M-3.5 15 L-6 21 M0 15.5 L0 22 M3.5 15 L6 21" stroke="rgba(238,242,246,0.4)" strokeWidth="1" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

function ElevationProfile({profRef, dotRef, tags}: {profRef: React.RefObject<SVGPathElement | null>; dotRef: React.RefObject<SVGCircleElement | null>; tags: {sea: string; lake: string}}) {
  return (
    <svg viewBox="0 0 300 60" className="h-[52px] w-full max-w-[620px]" aria-hidden="true">
      <line x1="8" y1="46" x2="292" y2="46" stroke="rgba(169,182,195,0.2)" strokeWidth="1" strokeDasharray="3 4" />
      <path ref={profRef} d={PROFILE} fill="none" stroke="rgba(76,141,240,0.55)" strokeWidth="1.8" strokeLinecap="round" />
      <text x="8" y="58" fontFamily="var(--font-mono)" fontSize="8.5" fill="rgba(169,182,195,0.7)">{tags.sea}</text>
      <text x="150" y="12" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="rgba(169,182,195,0.85)">{tags.lake}</text>
      <text x="292" y="58" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8.5" fill="rgba(169,182,195,0.7)">{tags.sea}</text>
      <circle ref={dotRef} r="3.4" fill="#fff" stroke="#4C8DF0" strokeWidth="2" />
    </svg>
  );
}

export function CanalJourney({stages, hint}: {stages: Stage[]; hint: string}) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const vesselRef = useRef<SVGGElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const profRef = useRef<SVGPathElement>(null);
  const profDotRef = useRef<SVGCircleElement>(null);
  const [pts, setPts] = useState<Pt[]>([]);
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);
  const geo = mobile ? MOBILE : DESKTOP;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)');
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const {scrollYProgress} = useScroll({target: containerRef, offset: ['start start', 'end end']});
  const raw = useTransform(scrollYProgress, [0.04, 0.96], [0, 1], {clamp: true});
  const t = useSpring(raw, {stiffness: 75, damping: 24, mass: 0.45});

  // Medición del trazado (se repite al cambiar la orientación gracias a key={geo.id})
  useEffect(() => {
    const path = drawRef.current;
    if (!path) return;
    const L = path.getTotalLength();
    setPts(geo.stops.map((s) => {
      const p = path.getPointAtLength(s * L);
      const p2 = path.getPointAtLength(Math.min(L, s * L + 2));
      return {x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10, a: Math.round((Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI)};
    }));
    path.style.strokeDasharray = String(L);
    const v0 = reduce ? 1 : Math.min(1, Math.max(0, raw.get()));
    path.style.strokeDashoffset = String(L * (1 - v0));
    if (vesselRef.current) {
      const p = path.getPointAtLength(v0 * L);
      const p2 = path.getPointAtLength(Math.min(L, v0 * L + 2));
      const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
      vesselRef.current.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${angle}deg)`;
    }
    setReady(true);
    if (reduce) setStage(stages.length - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.id, reduce, stages.length]);

  useMotionValueEvent(t, 'change', (v) => {
    if (reduce) return;
    const path = drawRef.current;
    const vessel = vesselRef.current;
    if (!path || !vessel) return;
    const L = path.getTotalLength();
    const d = Math.min(Math.max(v, 0), 1) * L;
    const p = path.getPointAtLength(d);
    const p2 = path.getPointAtLength(Math.min(L, d + 2));
    const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
    vessel.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${angle}deg)`;
    path.style.strokeDashoffset = String(L * (1 - Math.min(Math.max(v, 0), 1)));
    const prof = profRef.current;
    const dot = profDotRef.current;
    if (prof && dot) {
      const Lp = prof.getTotalLength();
      const pp = prof.getPointAtLength(Math.min(Math.max(v, 0), 1) * Lp);
      dot.setAttribute('cx', String(pp.x));
      dot.setAttribute('cy', String(pp.y));
    }
    let s = 0;
    for (let i = 0; i < geo.stops.length; i++) if (v >= geo.stops[i] - 0.08) s = i;
    setStage((prev) => (prev === s ? prev : s));
  });

  const scrollToStage = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    const progress = 0.04 + geo.stops[i] * 0.92;
    window.scrollTo({top: top + progress * scrollable, behavior: reduce ? 'auto' : 'smooth'});
  };

  const card = (s: Stage, i: number, overlay: boolean) => (
    <div className={overlay ? 'shell-dark' : 'shell-dark h-full'}>
      <div className={`core bg-ink-2 p-5 md:p-6 ${overlay ? '' : 'h-full'}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="font-mono text-[0.72rem] tracking-[0.14em] text-brand-sky uppercase">0{i + 1} · {s.name}</span>
          <span className="rounded-full border border-white/12 bg-white/6 px-2.5 py-0.5 font-mono text-[0.66rem] tracking-[0.1em] text-on-dark">{s.tag}</span>
        </div>
        <h3 className="mt-2 text-[1.15rem] text-white md:text-[1.2rem]">{s.title}</h3>
        <p className="m-0 mt-1.5 text-[0.95rem] text-on-dark md:text-[0.98rem]">{s.text}</p>
      </div>
    </div>
  );

  if (reduce) {
    return (
      <div key={geo.id}>
        <div className="h-[52vh] min-h-[320px]">
          <Scene geo={geo} stage={stages.length - 1} pts={pts} ready={ready} vesselRef={vesselRef} drawRef={drawRef} onStop={() => undefined} />
        </div>
        <ol className="mt-8 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {stages.map((s, i) => <li key={s.name}>{card(s, i, false)}</li>)}
        </ol>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} style={{height: '380vh'}}>
        <div key={geo.id} className="sticky top-[80px] flex h-[calc(100dvh-92px)] flex-col justify-center gap-2.5 md:gap-4">
          <div className="min-h-0 max-h-[44dvh] flex-1 md:max-h-none">
            <Scene geo={geo} stage={stage} pts={pts} ready={ready} vesselRef={vesselRef} drawRef={drawRef} onStop={scrollToStage} />
          </div>
          <div className="mx-auto w-full max-w-[620px]">
            <ElevationProfile profRef={profRef} dotRef={profDotRef} tags={{sea: '0 m', lake: '+26 m · Gatún'}} />
          </div>
          <div className="relative mx-auto min-h-[188px] w-full max-w-[620px] md:min-h-[172px]">
            {stages.map((s, i) => (
              <div
                key={s.name}
                aria-hidden={stage !== i}
                className="absolute inset-0"
                style={{opacity: stage === i ? 1 : 0, transform: stage === i ? 'none' : 'translateY(14px)', transition: 'opacity 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1)', pointerEvents: stage === i ? 'auto' : 'none'}}
              >
                {card(s, i, true)}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2" role="group" aria-label="Stages">
              {stages.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  aria-label={`${i + 1} · ${s.name}`}
                  aria-current={stage === i}
                  onClick={() => scrollToStage(i)}
                  className={`h-2.5 rounded-full transition-[width,background-color] duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] ${stage === i ? 'w-7 bg-brand-sky' : 'w-2.5 bg-white/25 hover:bg-white/45'}`}
                />
              ))}
            </div>
            <p aria-hidden="true" className="m-0 font-mono text-[0.7rem] tracking-[0.2em] text-on-dark-muted uppercase" style={{opacity: stage === stages.length - 1 ? 0 : 1, transition: 'opacity 400ms'}}>{hint} ↓</p>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
