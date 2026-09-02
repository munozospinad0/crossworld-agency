import type {ReactNode} from 'react';

/**
 * Bisel de instrumento náutico para iconos: cara con luz cenital, corona de
 * graduación de 60 marcas (las cardinales en azul de marca) y doble anillo.
 * Dentro de un `group` con hover fino, la corona gira unos grados como un dial.
 */
export function InstrumentChip({children, className = ''}: {children: ReactNode; className?: string}) {
  const ticks: ReactNode[] = [];
  for (let i = 0; i < 60; i++) {
    const a = (i * 6 * Math.PI) / 180;
    const cardinal = i % 15 === 0;
    const r1 = 26;
    const r2 = cardinal ? 22.2 : 24;
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    ticks.push(
      <line
        key={i}
        x1={(28 + r1 * sin).toFixed(2)}
        y1={(28 - r1 * cos).toFixed(2)}
        x2={(28 + r2 * sin).toFixed(2)}
        y2={(28 - r2 * cos).toFixed(2)}
        strokeWidth={cardinal ? 1.4 : 0.8}
        className={cardinal ? 'stroke-brand-sky/80' : 'stroke-ink/20'}
        strokeLinecap="round"
      />,
    );
  }
  return (
    <span
      className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[radial-gradient(120%_120%_at_32%_18%,#ffffff_0%,var(--color-accent-soft-2)_55%,var(--color-accent-soft)_100%)] text-accent-ink shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_12px_20px_-14px_rgba(11,46,138,0.4)] ring-1 ring-ink/8 [--ico2:var(--color-brand-sky)] ${className}`}
    >
      <svg viewBox="0 0 56 56" aria-hidden="true" className="absolute inset-0 h-full w-full">
        <g className="origin-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none fine-pointer:group-hover:rotate-[18deg]">{ticks}</g>
        <circle cx="28" cy="28" r="19.5" fill="none" strokeWidth="1" className="stroke-accent-ink/12" />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

/** Curvas batimétricas de carta náutica, para el fondo de tarjetas sin foto. */
export function ChartLines({className = ''}: {className?: string}) {
  return (
    <svg viewBox="0 0 230 150" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <path d="M-6 28C42 44 92 20 150 40s62 8 86 22" />
      <path d="M-6 58c52 20 96 0 152 18s60 4 84 16" />
      <path d="M-6 92c46 16 102-6 156 12s56 10 80 18" />
      <path d="M22 8c38 12 84-4 132 14" strokeDasharray="1 7" strokeLinecap="round" />
      <circle cx="58" cy="46" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="132" cy="74" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="182" cy="42" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="96" cy="112" r="1.4" fill="currentColor" stroke="none" />
      <path d="M156 104l5 5m0-5l-5 5" strokeWidth="0.9" />
      <path d="M44 84l5 5m0-5l-5 5" strokeWidth="0.9" />
    </svg>
  );
}
