import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {SectionKicker} from '@/components/brand/SectionKicker';
import {IsthmusGlyph} from '@/components/brand/IsthmusGlyph';
import {site} from '@/content/site';

function PortCard({p, duty, dutyNote, mouth, delay}: {p: (k: string) => string; duty: string; dutyNote?: string; mouth: 'pacific' | 'atlantic'; delay: 0 | 1}) {
  const rows: [string, string][] = [
    [p('anchorage'), p('anchorageValue')],
    [p('locks'), p('locksValue')],
    [p('crew'), p('crewValue')],
    [p('duty'), dutyNote ? `${duty} · ${dutyNote}` : duty],
  ];
  return (
    <Reveal delay={delay} className="shell-dark">
      <div className="core relative overflow-hidden bg-ink-2 p-6 font-mono text-[0.86rem] leading-[1.7] text-on-dark">
        {/* Mini-carta del istmo: la boca del Canal que corresponde al puerto. */}
        <IsthmusGlyph mouth={mouth} className="absolute right-5 top-5 w-20 text-white/25 sm:w-20 max-sm:w-14 max-sm:opacity-70" />
        {/* Cabecera de ficha: entrada + hairline estático (no .rule, es un documento). */}
        <div className="mb-2 flex items-center gap-3 font-mono text-[0.66rem] tracking-[0.16em] uppercase text-on-dark-muted">
          {p('entrance')}
          <span aria-hidden="true" className="h-px flex-1 bg-white/12" />
        </div>
        <h3 className="mb-3 pr-24 font-sans text-[1.3rem] text-white">
          {p('name')}
          <span className="ml-2.5 inline-block rounded-full border border-white/12 bg-white/6 px-2.5 py-0.5 align-middle font-mono text-[0.7rem] font-medium tracking-[0.1em] uppercase">{p('side')}</span>
        </h3>
        <dl className="m-0 space-y-1.5">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-2">
              <dt className="shrink-0 text-on-dark-muted">{k}</dt>
              <span aria-hidden="true" className="min-w-4 flex-1 -translate-y-[0.28em] border-b border-dotted border-white/15" />
              <dd className="m-0 min-w-0 break-words text-right text-white">{v}</dd>
            </div>
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
        <Reveal className="mb-10 max-w-[64ch]">
          <SectionKicker k="ports" index={4} dark />
          <h2 className="t-h2 text-white">{t('portsTitle')}</h2>
          <p className="mt-2 text-[1.08rem] text-on-dark-muted">{t('portsSub')}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <PortCard p={(k) => pb(k)} duty={site.phones.operations.display} mouth="pacific" delay={0} />
          <PortCard p={(k) => pc(k)} duty={site.phones.atlantic.display} dutyNote={pc('dutyNote')} mouth="atlantic" delay={1} />
        </div>
        <Reveal delay={2} className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[0.8rem] text-on-dark">
          {others.map((o) => <span key={o} className="rounded-full border border-white/12 bg-white/6 px-2.5 py-1">{o}</span>)}
          <span className="text-on-dark-muted">{t('portsNote')}</span>
        </Reveal>
      </div>
    </section>
  );
}
