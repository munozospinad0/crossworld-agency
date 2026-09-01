import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {site} from '@/content/site';

/** Prueba real: años de experiencia (dato del propio cliente), licencias desde 2010, marca hermana, socios y representación. */
export async function Proof() {
  const t = await getTranslations('Home');
  return (
    <section id="proof" className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] md:items-end">
        <Reveal>
          <span aria-hidden="true" className="block font-brand text-[clamp(4rem,9vw,7rem)] leading-[0.9] tracking-[-0.03em] text-brand-navy">
            {site.captain.experience}
          </span>
          <h2 className="m-0 mt-4 max-w-[26ch] text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.2] font-medium tracking-[-0.02em] text-ink">{t('proofTitle')}</h2>
          <p className="mt-4 mb-0 max-w-[62ch] text-[0.98rem] text-muted">{t('proofText')}</p>
        </Reveal>
        <Reveal delay={1} className="text-[0.92rem] text-muted md:border-l md:border-line md:pl-8">
          <b className="block font-medium text-ink">{t('partnersLabel')}</b>
          <ul className="m-0 mt-2 grid list-none gap-1 p-0">
            {site.partners.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <p className="mt-3 font-mono text-[0.78rem]">{site.representation.join(' · ')}</p>
          <p className="mt-5 mb-0 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-brand text-[0.78rem] tracking-[0.1em] text-brand-navy">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-sky" />
            {site.sisterBrand.name} · {site.sisterBrand.tagline}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
