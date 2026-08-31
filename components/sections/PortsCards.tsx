import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {site} from '@/content/site';

function CanalRoute({labels}: {labels: string[]}) {
  // Esquema de la ruta: Balboa (Pacífico) → Miraflores → Pedro Miguel → Gatún → Cristóbal (Atlántico)
  const xs = [40, 190, 330, 560, 760];
  return (
    <svg viewBox="0 0 800 120" className="route h-auto w-full" aria-hidden="true">
      <path d="M40 70 C 120 70, 150 40, 190 40 S 300 60, 330 62 S 480 26, 560 24 S 700 54, 760 70" fill="none" stroke="rgba(76,141,240,0.28)" strokeWidth="10" strokeLinecap="round" />
      <path className="draw" pathLength={1} d="M40 70 C 120 70, 150 40, 190 40 S 300 60, 330 62 S 480 26, 560 24 S 700 54, 760 70" fill="none" stroke="#4C8DF0" strokeWidth="2.5" strokeLinecap="round" />
      {xs.map((x, i) => {
        const y = [70, 40, 62, 24, 70][i];
        const end = i === 0 || i === 4;
        return (
          <g key={x}>
            <circle cx={x} cy={y} r={end ? 7 : 4.5} fill={end ? '#fff' : '#0B1420'} stroke="#4C8DF0" strokeWidth={end ? 3 : 2} />
            <text x={x} y={y + (i === 3 || i === 1 ? -16 : 26)} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fill={end ? '#fff' : '#A9B6C3'}>{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function PortCard({p, duty, dutyNote, delay}: {p: (k: string) => string; duty: string; dutyNote?: string; delay: 0 | 1}) {
  const rows: [string, string][] = [[p('operator'), p('operatorValue')], [p('anchorage'), p('anchorageValue')], [p('bunker'), p('bunkerValue')], [p('locks'), p('locksValue')], [p('duty'), dutyNote ? `${duty} · ${dutyNote}` : duty]];
  return (
    <Reveal delay={delay} className="shell-dark">
      <div className="core bg-ink-2 p-6 font-mono text-[0.86rem] leading-[1.7] text-on-dark">
        <h3 className="mb-3 font-sans text-[1.3rem] text-white">
          {p('name')}
          <span className="ml-2.5 inline-block rounded-full border border-white/12 bg-white/6 px-2.5 py-0.5 align-middle font-mono text-[0.7rem] font-medium tracking-[0.1em] uppercase">{p('side')}</span>
        </h3>
        <dl className="m-0 grid grid-cols-[max-content_1fr] gap-x-5 gap-y-1.5">
          {rows.map(([k, v]) => (
            <div key={k} className="contents"><dt className="text-on-dark-muted">{k}</dt><dd className="m-0 text-white">{v}</dd></div>
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
    <section id="ports" className="deep py-[clamp(72px,9vw,128px)] text-on-dark">
      <div className="wrap">
        <div className="mb-10 max-w-[64ch]">
          <h2 className="t-h2 text-white">{t('portsTitle')}</h2>
          <p className="mt-2 text-[1.08rem] text-on-dark-muted">{t('portsSub')}</p>
        </div>
        <Reveal className="mb-8">
          <CanalRoute labels={['Balboa', 'Miraflores', 'Pedro Miguel', 'Gatún', 'Cristóbal']} />
        </Reveal>
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
