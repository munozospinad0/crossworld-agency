import type {Block} from '@/content/articles';
import type {Locale} from '@/i18n/routing';

/**
 * Render de los bloques de un análisis.
 *
 * Cada formato existe por una razón de captación, no de decoración:
 * - `answer` es un bloque pregunta/respuesta visible (no un <details>): lo que está plegado se
 *   indexa, pero pesa menos y los asistentes lo citan peor que el texto a la vista.
 * - `table` porque un dato comparable dentro de una tabla se cita mucho más que en prosa.
 * - `note` marca de dónde sale una cifra, junto al dato y no solo al pie.
 */
export function ArticleBody({blocks, locale}: {blocks: Block[]; locale: Locale}) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'h2':
            return <h2 key={b.id} id={b.id} className="t-h2 mt-10 scroll-mt-28 first:mt-0">{b.text[locale]}</h2>;
          case 'h3':
            return <h3 key={i} className="mt-7 text-[1.15rem] font-semibold text-ink">{b.text[locale]}</h3>;
          case 'p':
            return <p key={i} className="mt-3">{b.text[locale]}</p>;
          case 'ul':
            return (
              <ul key={i} className="mt-4 grid list-disc gap-2 pl-5">
                {b.items[locale].map((x) => <li key={x}>{x}</li>)}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="mt-4 grid list-decimal gap-2 pl-5">
                {b.items[locale].map((x) => <li key={x}>{x}</li>)}
              </ol>
            );
          case 'table':
            return (
              <figure key={i} className="mt-6">
                <div className="overflow-x-auto rounded-card border border-line">
                  <table className="w-full border-collapse text-[0.95rem]">
                    <caption className="sr-only">{b.caption[locale]}</caption>
                    <thead>
                      <tr className="bg-paper text-left">
                        {b.head[locale].map((h) => (
                          <th key={h} scope="col" className="border-b border-line px-4 py-3 font-mono text-[0.78rem] font-medium tracking-wide text-muted uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows[locale].map((row, r) => (
                        <tr key={r} className="border-b border-line last:border-0">
                          {row.map((cell, c) => (
                            <td key={c} className={`px-4 py-3 align-top ${c === 0 ? 'font-medium text-ink' : ''}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <figcaption className="mt-2 text-[0.85rem] text-muted">{b.caption[locale]}</figcaption>
              </figure>
            );
          case 'answer':
            return (
              <div key={i} className="mt-6 rounded-card border border-line bg-surface p-5">
                <p className="m-0 font-semibold text-ink">{b.q[locale]}</p>
                <p className="m-0 mt-2">{b.a[locale]}</p>
              </div>
            );
          case 'note':
            return (
              <p key={i} className="mt-4 border-l-[3px] border-accent bg-accent-soft-2 px-4 py-3 text-[0.9rem]">{b.text[locale]}</p>
            );
          case 'quote':
            return (
              <blockquote key={i} className="mt-6 border-l-[3px] border-line-strong pl-4 text-[1.05rem] text-ink italic">
                {b.text[locale]}
              </blockquote>
            );
        }
      })}
    </>
  );
}
