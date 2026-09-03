import type {ReactNode} from 'react';
import type {StaticPage as SP} from '@/content/pages';
import {ChartLines} from '@/components/brand/InstrumentChip';

/** Viñeta propia de las listas: marca de calado con línea de flotación (nada de discos genéricos). */
function ListMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="mt-[0.42em] shrink-0 text-accent">
      <path d="M5 2v11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M7.5 4h3.5M7.5 7h2M7.5 10h3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M1.5 13.2c1.1-.9 2.1-.9 3.2 0s2.1.9 3.2 0 2.1-.9 3.2 0 2.1.9 3.2 0" stroke="#4C8DF0" strokeWidth="1.1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/**
 * Plantilla de páginas de texto (nosotros, certificaciones, cumplimiento, contacto, legales):
 * cabecera con curvas batimétricas, bloques numerados con hairline y listas con viñeta propia.
 */
export function StaticPage({page, children, aside}: {page: SP; children?: ReactNode; aside?: ReactNode}) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-surface py-[clamp(40px,5vw,72px)]">
        <ChartLines marks={false} className="pointer-events-none absolute -top-10 right-[-6%] hidden h-[300px] w-[520px] text-ink opacity-[0.045] lg:block" />
        <div className="wrap relative max-w-[70ch]">
          <h1 className="t-display">{page.title}</h1>
          <p className="t-lead mt-4 text-muted">{page.lead}</p>
        </div>
      </section>
      <section className="py-[clamp(48px,6vw,88px)]">
        <div className={`wrap grid grid-cols-1 gap-10 ${aside ? 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'max-w-[76ch]'}`}>
          <div className="grid gap-9">
            {children}
            {page.blocks.map((b, i) => (
              <div key={b.h2} className="grid grid-cols-[2.6rem_minmax(0,1fr)] gap-x-3">
                <span aria-hidden="true" className="pt-[0.45em] font-mono text-[0.7rem] tracking-[0.14em] text-accent tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <h2 className="flex items-center gap-4 text-[1.3rem]">
                    <span>{b.h2}</span>
                    <span aria-hidden="true" className="hidden h-px flex-1 bg-line sm:block" />
                  </h2>
                  {b.p?.map((p) => <p key={p} className="mt-2.5">{p}</p>)}
                  {b.ul && (
                    <ul className="m-0 mt-3 grid list-none gap-2 p-0">
                      {b.ul.map((x) => (
                        <li key={x} className="flex items-start gap-3">
                          <ListMark />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          {aside && <aside className="grid content-start gap-4">{aside}</aside>}
        </div>
      </section>
    </>
  );
}
