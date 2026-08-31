'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {site} from '@/content/site';

export function NominateBlock() {
  const t = useTranslations('Home');
  const c = useTranslations('Common');
  const [copied, setCopied] = useState(false);
  const lines = [
    `${site.legalName} (brand: ${site.name})`,
    `RUC ${site.ruc} · IMO company number ${site.imoCompanyNumber}`,
    `AMP-licensed ship agency, authorized by the Panama Canal Authority (agency code: ${site.acpAgencyCode.value || c('toConfirm')})`,
    `${site.address.street}, ${site.address.street2}, ${site.address.city}, ${site.address.country}`,
    `${site.emails.operations.address}${site.emails.operations.confirm ? ` ${c('toConfirm')}` : ''}`,
    `${site.phones.operations.display} · ${site.phones.office.display}`,
  ];
  const text = lines.join('\n');
  return (
    <div className="relative rounded-card border border-white/10 bg-ink-2 p-6 font-mono text-[0.84rem] leading-relaxed text-on-dark">
      <button
        type="button"
        aria-live="polite"
        onClick={() => { navigator.clipboard?.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2500); }}
        className="absolute top-4 right-4 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-sans text-[0.85rem] font-medium text-on-dark hover:bg-white/10"
      >
        {copied ? t('copied') : t('copy')}
      </button>
      <h3 className="mb-2 font-sans text-[1.15rem] text-white">{t('nominateTitle')}</h3>
      <div>
        {lines.map((l) => (
          <span key={l} className="block">{l}</span>
        ))}
      </div>
      <p className="mt-3.5 font-sans text-[0.9rem] text-on-dark-muted">{t('nominateHelp')} {t('bankNote')}</p>
    </div>
  );
}
