import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {site} from '@/content/site';

function PortCard({p, duty, dutyNote, delay}: {p: (k: string) => string; duty: string; dutyNote?: string; delay: 0 | 1}) {
  const rows: [string, string][] = [
    [p('operator'), p('operatorValue')],
    [p('anchorage'), p('anchorageValue')],
    [p('bunker'), p('bunkerValue')],
    [p('locks'), p('locksValue')],
    [p('duty'), dutyNote ? `${duty} · ${dutyNote}` : duty],
  ];
  return (
    <Reveal delay={delay} className="rounded-card bg-ink p-6 font-mono text-[0.86rem] leading-[1.7] text-on-dark">
      <h3 className="mb-2.5 font-sans text-[1.25rem] text-white">
        {p('name')}
        <span className="ml-2.5 inline-block rounded-full bg-white/10 px-2.5 py-0.5 align-middle text-[0.72rem] font-medium">{p('side')}</span>
      </h3>
      <dl className="m-0 grid grid-cols-[max-content_1fr] gap-x-4.5 gap-y-1">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-on-dark-muted">{k}</dt>
            <dd className="m-0 text-white">{v}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

export async function PortsCards() {
  const t = await getTranslations('Home');
  const pb = await getTranslations('Ports.balboa');
  const pc = await getTranslations('Ports.cristobal');
  const others = (await getTranslations('Ports')).raw('others') as string[];
  return (
    <section id="ports" className="py-[clamp(56px,7vw,104px)]">
      <div className="wrap">
        <div className="mb-9 max-w-[64ch]">
          <h2 className="t-h2">{t('portsTitle')}</h2>
          <p className="mt-2 text-[1.08rem] text-muted">{t('portsSub')}</p>
        </div>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          <PortCard p={(k) => pb(k)} duty={site.phones.operations.display} delay={0} />
          <PortCard p={(k) => pc(k)} duty={site.phones.atlantic.display} dutyNote={pc('dutyNote')} delay={1} />
        </div>
        <Reveal delay={2} className="mt-3.5 flex flex-wrap items-center gap-2 font-mono text-[0.8rem] text-text">
          {others.map((o) => (
            <span key={o} className="rounded-full border border-line-strong bg-surface px-2.5 py-1">{o}</span>
          ))}
          <span className="text-muted">{t('portsNote')}</span>
        </Reveal>
      </div>
    </section>
  );
}
