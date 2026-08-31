'use client';

import {useRef} from 'react';
import {LazyMotion, domAnimation, m, useScroll, useTransform, useReducedMotion} from 'motion/react';

type Step = {n: string; title: string; text: string; when: string};

function Card({s, i, total}: {s: Step; i: number; total: number}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  // Cuando la siguiente tarjeta llega, esta se reduce a 0.94 y se atenúa: pila física.
  const {scrollYProgress} = useScroll({target: ref, offset: ['start 96px', 'end 96px']});
  const scale = useTransform(scrollYProgress, [0, 1], [1, i === total - 1 ? 1 : 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, i === total - 1 ? 1 : 0.55]);
  return (
    <li ref={ref} className="sticky" style={{top: `${96 + i * 14}px`}}>
      <m.div
        style={reduce ? undefined : {scale, opacity, transformOrigin: 'top center'}}
        className="shell-dark"
      >
        <div className="core grid grid-cols-1 gap-5 bg-ink-2 p-[clamp(22px,3vw,36px)] md:grid-cols-[120px_1fr_auto] md:items-start">
          <div>
            <span className="block font-sans text-[3rem] leading-none font-bold tracking-[-0.05em] text-brand-sky">{s.n}</span>
            <span className="mt-2 block font-mono text-[0.72rem] tracking-[0.14em] text-on-dark-muted uppercase">Step</span>
          </div>
          <div>
            <h3 className="text-[1.4rem] text-white">{s.title}</h3>
            <p className="mt-2 mb-0 max-w-[56ch] text-on-dark">{s.text}</p>
          </div>
          <span className="justify-self-start rounded-full border border-white/12 bg-white/6 px-3 py-1.5 font-mono text-[0.78rem] whitespace-nowrap text-on-dark">{s.when}</span>
        </div>
      </m.div>
    </li>
  );
}

export function StickyStack({steps}: {steps: Step[]}) {
  return (
    <LazyMotion features={domAnimation}>
      <ol className="m-0 grid list-none gap-5 p-0">
        {steps.map((s, i) => <Card key={s.n} s={s} i={i} total={steps.length} />)}
      </ol>
    </LazyMotion>
  );
}
