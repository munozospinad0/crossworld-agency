import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {site} from '@/content/site';

function PortCard({p, duty, dutyNote, delay}: {p: (k: string) => string; duty: string; dutyNote?: string; delay: 0 | 1}) {
  const rows: [string, string][] = [[p('anchorage'), p('anchorageValue')], [p('locks'), p('locksValue')], [p('duty'), dutyNote ? `${duty} · ${dutyNote}` : duty]];
  return (
    <Reveal delay={delay} className="shell-dark">
      <div className="core bg-ink-2 p-6 font-mono text-[0.86rem] leading-[1.7] text-on-dark">
        <h3 className="mb-3 font-sans text-[1.3rem] text-white">
          {p('name')}
          <span className="ml-2.5 inline-block rounded-full border border-white/12 bg-white/6 px-2.5 py-0.5 align-middle font-mono text-[0.7rem] font-medium tracking-[0.1em] uppercase">{p('side')}</span>
        </h3>
        <dl className="m-0 grid grid-cols-[max-content_1fr] gap-x-5 gap-y-1.5">
          {rows.map(([k, v]) => (
            <div key={k} className="contents"><dt className="text-on-dark-muted">{k}</dt><dd className="m-0 min-w-0 break-words text-white">{v}</dd></div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}

export async function PortsCards() {
  const t = await getTranslations('Home');
  const pb = await getTranslations('Ports.balboa');
  const pc = await getTranslations('Ports.cristobal');
  const others = (await getTranslations('Ports')).raw('others') as string[];
  return (
    <section id="ports" className="border-t border-white/8 bg-ink py-[clamp(72px,9vw,128px)] text-on-dark">
      <div className="wrap">
        <div className="mb-10 max-w-[64ch]">
          <h2 className="t-h2 text-white">{t('portsTitle')}</h2>
          <p className="mt-2 text-[1.08rem] text-on-dark-muted">{t('portsSub')}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <PortCard p={(k) => pb(k)} duty={site.phones.operations.display} delay={0} />
          <PortCard p={(k) => pc(k)} duty={site.phones.atlantic.display} dutyNote={pc('dutyNote')} delay={1} />
        </div>
        <Reveal delay={2} className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[0.8rem] text-on-dark">
          {others.map((o) => <span key={o} className="rounded-full border border-white/12 bg-white/6 px-2.5 py-1">{o}</span>)}
          <span className="text-on-dark-muted">{t('portsNote')}</span>
        </Reveal>
      </div>
    </section>
  );
}
