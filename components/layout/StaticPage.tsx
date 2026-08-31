import type {ReactNode} from 'react';
import type {StaticPage as SP} from '@/content/pages';

export function StaticPage({page, children, aside}: {page: SP; children?: ReactNode; aside?: ReactNode}) {
  return (
    <>
      <section className="border-b border-line bg-surface py-[clamp(40px,5vw,72px)]">
        <div className="wrap max-w-[70ch]">
          <h1 className="t-display">{page.title}</h1>
          <p className="t-lead mt-4 text-muted">{page.lead}</p>
        </div>
      </section>
      <section className="py-[clamp(48px,6vw,88px)]">
        <div className={`wrap grid grid-cols-1 gap-10 ${aside ? 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'max-w-[76ch]'}`}>
          <div className="grid gap-8">
            {children}
            {page.blocks.map((b) => (
              <div key={b.h2}>
                <h2 className="text-[1.35rem]">{b.h2}</h2>
                {b.p?.map((p) => <p key={p} className="mt-2">{p}</p>)}
                {b.ul && (
                  <ul className="mt-2 grid list-disc gap-1.5 pl-5">
                    {b.ul.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {aside && <aside className="grid content-start gap-4">{aside}</aside>}
        </div>
      </section>
    </>
  );
}
