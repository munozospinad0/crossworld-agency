import {getTranslations} from 'next-intl/server';

export async function PortCallProcess() {
  const t = await getTranslations('Home');
  const steps = t.raw('process') as {n: string; title: string; text: string; when: string}[];
  const tops = ['md:top-[92px]', 'md:top-[108px]', 'md:top-[124px]', 'md:top-[140px]'];
  return (
    <section id="process" className="border-y border-line bg-surface py-[clamp(56px,7vw,104px)]">
      <div className="wrap">
        <div className="mb-9 max-w-[64ch]">
          <h2 className="t-h2">{t('processTitle')}</h2>
          <p className="mt-2 text-[1.08rem] text-muted">{t('processSub')}</p>
        </div>
        <ol className="m-0 grid list-none gap-4.5 p-0">
          {steps.map((s, i) => (
            <li key={s.n} className={`grid grid-cols-1 items-start gap-5 rounded-card border border-line bg-paper p-[clamp(22px,3vw,36px)] shadow-1 md:sticky md:grid-cols-[110px_1fr_auto] ${tops[i]}`}>
              <div className="font-mono text-[0.8rem] text-muted">
                <b className="block font-sans text-[2.4rem] leading-none font-bold tracking-[-0.04em] text-accent">{s.n}</b>
              </div>
              <div>
                <h3 className="text-[1.35rem]">{s.title}</h3>
                <p className="mt-1.5 mb-0 max-w-[56ch]">{s.text}</p>
              </div>
              <span className="justify-self-start rounded-full bg-accent-soft px-3 py-1.5 font-mono text-[0.8rem] whitespace-nowrap text-accent-ink">{s.when}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
