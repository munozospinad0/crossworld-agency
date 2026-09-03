import {getLocale, getTranslations} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {Reveal} from '@/components/motion/Reveal';
import {SectionKicker} from '@/components/brand/SectionKicker';
import {site} from '@/content/site';

/**
 * Registro de socios con salto de escala: el numeral de experiencia sube a Cinzel
 * (el momento de mayor escala tipográfica de la home), con regla `.rule` y firma
 * del capitán debajo; los socios se listan como filas-registro con líder punteado
 * e índice, y la representación como chips de país. Artefacto-documento: sin hover.
 */
export async function Proof() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Home');
  return (
    <section id="proof" className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <Reveal>
          <SectionKicker k="proof" index={8} />
        </Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
          <Reveal>
            {/* Numeral de registro: aria-hidden porque proofTitle ya enuncia la cifra. */}
            <span aria-hidden="true" className="block font-brand text-[clamp(3.2rem,7vw,6.2rem)] leading-none tabular-nums text-brand-navy">
              {site.captain.experience}
            </span>
            <span aria-hidden="true" className="rule mt-3 block h-px bg-line-strong" />
            <p className="mt-2 mb-0 font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted">
              {site.captain.title[locale]} {site.captain.name}
            </p>
            <h2 className="m-0 mt-6 max-w-[26ch] text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.2] font-medium tracking-[-0.02em] text-ink">{t('proofTitle')}</h2>
            <p className="mt-4 mb-0 max-w-[62ch] text-[0.98rem] text-muted">{t('proofText')}</p>
            <p className="mt-5 mb-0 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-brand text-[0.78rem] tracking-[0.1em] text-brand-navy">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-sky" />
              {site.sisterBrand.name} · {site.sisterBrand.tagline}
            </p>
          </Reveal>
          <Reveal delay={1} className="md:border-l md:border-line md:pl-8">
            <b className="block font-mono text-[0.7rem] font-normal tracking-[0.14em] uppercase text-muted">{t('partnersLabel')}</b>
            <ol className="m-0 mt-2 list-none p-0">
              {site.partners.map((p, i) => (
                <li key={p.name} className="flex flex-wrap items-baseline gap-2 border-b border-line py-2">
                  <span className="text-[0.92rem] text-ink">{p.name}</span>
                  <span aria-hidden="true" className="flex-1 -translate-y-[0.28em] border-b border-dotted border-line-strong" />
                  <span className="font-mono text-[0.7rem] tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
                  {p.role ? <span className="basis-full font-mono text-[0.7rem] text-muted">{p.role[locale]}</span> : null}
                </li>
              ))}
            </ol>
            <b className="mt-6 block font-mono text-[0.7rem] font-normal tracking-[0.14em] uppercase text-muted">{t('representationLabel')}</b>
            <p className="mt-2 mb-0 flex flex-wrap gap-1.5">
              {site.representation.map((c) => (
                <span key={c.en} className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[0.72rem]">{c[locale]}</span>
              ))}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
