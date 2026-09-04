'use client';

import {useState, type ReactNode} from 'react';
import {useTranslations} from 'next-intl';
import {site} from '@/content/site';

// Rotulos de expediente para el <dl>. El bloque nominable es un documento
// maritimo en ingles (igual que el texto que se copia), por eso van fijos.
const ROW_LABELS = ['Agent', 'RUC · IMO', 'Authority', 'Address', 'Email', 'Phone'];

/** Sello circular de goma: dos anillos, 12 marcas de graduacion y texto circular. */
function Seal() {
  const ticks: ReactNode[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180;
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    ticks.push(
      <line
        key={i}
        x1={(50 + 34 * sin).toFixed(2)}
        y1={(50 - 34 * cos).toFixed(2)}
        x2={(50 + 44 * sin).toFixed(2)}
        y2={(50 - 44 * cos).toFixed(2)}
        stroke="white"
        strokeWidth="1"
      />,
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="pointer-events-none absolute right-4 bottom-4 h-[72px] w-[72px] rotate-[-8deg] opacity-10 sm:h-[92px] sm:w-[92px] sm:opacity-[0.14]"
    >
      <circle cx="50" cy="50" r="44" fill="none" stroke="white" strokeWidth="1" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="white" strokeWidth="1" />
      {ticks}
      <path id="sealpath-nb" d="M50 11a39 39 0 1 1 0 78 39 39 0 1 1 0-78" fill="none" />
      <text className="font-mono" fontSize="8" letterSpacing="2" fill="white">
        <textPath href="#sealpath-nb">CROSS WORLD AGENCY · PANAMA · IMO 5785507 · </textPath>
      </text>
    </svg>
  );
}

export function NominateBlock() {
  const t = useTranslations('Home');
  const [copied, setCopied] = useState(false);
  const lines = [
    site.name,
    `RUC ${site.ruc} · IMO company number ${site.imoCompanyNumber}`,
    `AMP-licensed ship agency, authorized by the Panama Canal Authority${site.acpAgencyCode.value ? ` (agency code: ${site.acpAgencyCode.value})` : ''}`,
    `${site.address.street2}, ${site.address.street}, ${site.address.city}, ${site.address.country}`,
    site.emails.operations.address,
    `${site.phones.operations.display} · ${site.phones.office.display}`,
  ];
  const text = lines.join('\n');
  return (
    <div className="core relative overflow-hidden bg-ink-2 p-6 font-mono text-[0.84rem] leading-relaxed text-on-dark">
      <button
        type="button"
        aria-live="polite"
        onClick={() => { navigator.clipboard?.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2500); }}
        className={`absolute top-4 right-4 rounded-full border bg-white/5 px-3.5 py-1.5 font-sans text-[0.85rem] font-medium transition-[background-color,border-color] duration-300 motion-reduce:transition-none fine-pointer:hover:bg-white/10 ${copied ? 'border-brand-sky/40 text-white' : 'border-white/15 text-on-dark'}`}
      >
        {copied ? t('copied') : t('copy')}
      </button>
      {/* Cabecera de expediente: titulo a la izquierda, RUC a la derecha. */}
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-dashed border-white/15 pb-2 pr-24 text-[0.66rem] uppercase tracking-[0.16em]">
        <h3 className="text-white">{t('nominateTitle')}</h3>
        <span className="text-on-dark-muted tabular-nums">RUC {site.ruc}</span>
      </div>
      <dl className="space-y-2.5">
        {lines.map((l, i) => (
          <div
            key={ROW_LABELS[i]}
            className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-baseline gap-x-3 sm:grid-cols-[1.5rem_6.5rem_minmax(0,1fr)]"
          >
            <span aria-hidden="true" className="text-[0.66rem] text-white/50 tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-on-dark-muted">{ROW_LABELS[i]}</dt>
            <dd className="col-start-2 min-w-0 break-words text-white sm:col-start-3 sm:row-start-1">{l}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3.5 font-sans text-[0.9rem] text-on-dark-muted">{t('nominateHelp')} {t('bankNote')}</p>
      <Seal />
    </div>
  );
}
