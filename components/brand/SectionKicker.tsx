import {getTranslations} from 'next-intl/server';

/**
 * Rúbrica de folio de sección: regla graduada + índice + rótulo + hairline que se
 * dibuja (`.rule`) cuando el Reveal contenedor recibe `.in`. La numeración sigue el
 * orden real de las secciones en app/[locale]/page.tsx. Server component, cero JS.
 */
export async function SectionKicker({k, index, dark = false, className = ''}: {k: string; index: number; dark?: boolean; className?: string}) {
  const t = await getTranslations('Home.kickers');
  const accent = dark ? 'text-brand-sky' : 'text-accent';
  return (
    <p className={`mb-4 flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.18em] uppercase ${dark ? 'text-on-dark-muted' : 'text-muted'} ${className}`}>
      <svg width="25" height="10" viewBox="0 0 25 10" aria-hidden="true" className={`shrink-0 ${accent}`}>
        {Array.from({length: 8}, (_, i) => (
          <line key={i} x1={0.7 + i * 3.4} y1={10} x2={0.7 + i * 3.4} y2={i % 4 === 0 ? 1 : 4.5} stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        ))}
      </svg>
      <span className={`tabular-nums ${accent}`}>{String(index).padStart(2, '0')}</span>
      <span>{t(k)}</span>
      <span aria-hidden="true" className={`rule h-px flex-1 ${dark ? 'bg-white/12' : 'bg-line'}`} />
    </p>
  );
}
