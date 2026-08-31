'use client';

import {useEffect, useRef, type ReactNode} from 'react';

/** Revelado al entrar en viewport. Nunca usar por encima del pliegue (retrasa el LCP). */
export function Reveal({children, delay = 0, className = '', as: Tag = 'div'}: {children: ReactNode; delay?: 0 | 1 | 2 | 3; className?: string; as?: 'div' | 'section' | 'li' | 'article'}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      {threshold: 0.15, rootMargin: '0px 0px -8% 0px'},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const T = Tag as 'div';
  return (
    <T ref={ref as React.RefObject<HTMLDivElement>} className={`rv ${delay ? `d${delay}` : ''} ${className}`}>
      {children}
    </T>
  );
}
