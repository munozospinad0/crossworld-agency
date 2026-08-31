'use client';

import {startTransition, useActionState, useEffect, useMemo, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {submitPortCall, type FormState} from '@/app/[locale]/request-port-call/actions';
import {track} from '@/lib/analytics';
import {site} from '@/content/site';

const initial: FormState = {ok: false};

function Field({label, htmlFor, error, help, children}: {label: string; htmlFor: string; error?: string; help?: string; children: React.ReactNode}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[0.9rem] font-medium text-ink">{label}</label>
      {children}
      {help && !error && <p id={`${htmlFor}-help`} className="mt-1 text-[0.82rem] text-muted">{help}</p>}
      {error && <p id={`${htmlFor}-error`} role="alert" className="mt-1 text-[0.82rem] text-err">{error}</p>}
    </div>
  );
}

const input = 'w-full rounded-field border border-line-strong bg-white px-3 py-2.5 text-[1rem] text-ink focus:border-accent focus:shadow-[0_0_0_3px_rgba(31,79,216,0.18)] focus:outline-none aria-[invalid=true]:border-err';

export function PortCallForm() {
  const t = useTranslations('Form');
  const locale = useLocale();
  const [state, action, pending] = useActionState(submitPortCall, initial);
  const [step, setStep] = useState<1 | 2>(1);
  const [submissionId] = useState(() => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`));
  const [attribution, setAttribution] = useState('{}');
  const errors = state.errors ?? {};
  const err = (k: string) => (errors[k] ? t(`errors.${errors[k]}` as never) : undefined);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cw_attr');
      if (raw) setAttribution(raw);
      else {
        const u = new URL(window.location.href);
        const a: Record<string, string> = {};
        for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid', 'fbclid']) { const v = u.searchParams.get(k); if (v) a[k] = v; }
        if (document.referrer) a.referrer = document.referrer;
        a.landing = u.pathname;
        setAttribution(JSON.stringify(a));
      }
    } catch { /* sin almacenamiento */ }
  }, []);

  useEffect(() => {
    if (state.ok && state.requestNumber) {
      track('port_call_request', {request_number: state.requestNumber});
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else if (state.errors) {
      track('form_error', {field: Object.keys(state.errors)[0]});
      // si el error está en el paso 1, volver a él
      const step1 = ['vesselName', 'imo', 'vesselType', 'flag', 'loa', 'beam', 'draft', 'gt', 'cargo', 'eta', 'ports', 'transit', 'principalType'];
      if (Object.keys(state.errors).some((k) => step1.includes(k))) setStep(1);
    }
  }, [state]);

  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const portOptions = useMemo(() => ['balboa', 'cristobal', 'manzanillo', 'cct', 'bahia-las-minas', 'psa-rodman', 'taboguilla', 'melones', 'vacamonte', 'other'] as const, []);
  const serviceOptions = ['agency', 'surveys', 'bunker_survey', 'fuel', 'sts', 'claims', 'consulting'] as const;

  if (state.ok && state.requestNumber) {
    return (
      <div role="status" className="rounded-card border border-[#bfe3cf] bg-ok-soft p-6 text-[#134a30]">
        <b className="block text-[1.15rem] text-[#0f3d27]">{t('success.title', {number: state.requestNumber})}</b>
        <p className="m-0 mt-2">{t('success.text', {phone: site.phones.operations.display})}</p>
      </div>
    );
  }

  return (
    <form
      // Se invoca la acción dentro de una transición (y no vía action={}) para que React NO reinicie
      // los campos tras una respuesta con errores: lo escrito por el usuario se conserva.
      onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); startTransition(() => action(fd)); }}
      className="grid gap-5 rounded-card border border-line bg-surface p-6"
      noValidate
    >
      <input type="hidden" name="submissionId" value={submissionId} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="attribution" value={attribution} />
      <div className="flex items-center gap-2 font-mono text-[0.78rem] text-muted" aria-label={t('steps.label')}>
        <b className={step === 1 ? 'text-accent-ink' : ''}>1 {t('steps.vessel')}</b><i className={`h-0.5 flex-1 rounded ${step >= 1 ? 'bg-accent' : 'bg-line'}`} />
        <b className={step === 2 ? 'text-accent-ink' : ''}>2 {t('steps.contact')}</b><i className={`h-0.5 flex-1 rounded ${step === 2 ? 'bg-accent' : 'bg-line'}`} />
      </div>

      {errors.form && <p role="alert" className="m-0 rounded-field bg-err-soft px-3 py-2 text-[0.9rem] text-err">{t(`errors.${errors.form}` as never)}</p>}

      <fieldset className={`grid gap-4 border-0 p-0 m-0 ${step === 1 ? '' : 'hidden'}`} aria-hidden={step !== 1}>
        <legend className="sr-only">{t('steps.vessel')}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t('vesselName')} htmlFor="vesselName" error={err('vesselName')}>
            <input id="vesselName" name="vesselName" className={input} required aria-invalid={!!errors.vesselName} placeholder="MV …" />
          </Field>
          <Field label={t('imo')} htmlFor="imo" error={err('imo')} help={t('imoHelp')}>
            <input id="imo" name="imo" inputMode="numeric" pattern="\d{7}" className={`${input} font-mono tracking-wider`} required aria-invalid={!!errors.imo} aria-describedby={errors.imo ? 'imo-error' : 'imo-help'} />
          </Field>
          <Field label={t('vesselType')} htmlFor="vesselType" error={err('vesselType')}>
            <select id="vesselType" name="vesselType" className={input} defaultValue="bulk">
              {['bulk', 'tanker', 'container', 'lpg', 'lng', 'general', 'roro', 'passenger', 'tug', 'barge', 'fishing', 'offshore', 'other'].map((v) => <option key={v} value={v}>{t(`vesselTypes.${v}` as never)}</option>)}
            </select>
          </Field>
          <Field label={t('flag')} htmlFor="flag"><input id="flag" name="flag" className={input} /></Field>
          <Field label={t('loa')} htmlFor="loa"><input id="loa" name="loa" type="number" step="0.01" min="1" className={`${input} font-mono`} /></Field>
          <Field label={t('beam')} htmlFor="beam"><input id="beam" name="beam" type="number" step="0.01" min="1" className={`${input} font-mono`} /></Field>
          <Field label={t('draft')} htmlFor="draft"><input id="draft" name="draft" type="number" step="0.01" min="1" className={`${input} font-mono`} /></Field>
          <Field label={t('gt')} htmlFor="gt"><input id="gt" name="gt" type="number" min="1" className={`${input} font-mono`} /></Field>
          <Field label={t('cargo')} htmlFor="cargo"><input id="cargo" name="cargo" className={input} /></Field>
          <Field label={t('eta')} htmlFor="eta" error={err('eta')} help={t('etaHelp')}>
            <input id="eta" name="eta" type="datetime-local" className={`${input} font-mono`} required aria-invalid={!!errors.eta} />
          </Field>
        </div>
        <Field label={t('ports')} htmlFor="ports" error={err('ports')}>
          <div id="ports" className="grid gap-2 sm:grid-cols-2">
            {portOptions.map((p) => (
              <label key={p} className="flex items-center gap-2 text-[0.95rem]"><input type="checkbox" name="ports" value={p} className="h-4 w-4 accent-accent" />{t(`portOptions.${p}` as never)}</label>
            ))}
          </div>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t('transit')} htmlFor="transit">
            <select id="transit" name="transit" className={input} defaultValue="none">
              {['none', 'northbound', 'southbound'].map((v) => <option key={v} value={v}>{t(`transitOptions.${v}` as never)}</option>)}
            </select>
          </Field>
          <Field label={t('principalType')} htmlFor="principalType">
            <select id="principalType" name="principalType" className={input} defaultValue="owner">
              {['owner', 'charterer', 'manager', 'trader', 'pandi', 'insurer', 'lawyer', 'other'].map((v) => <option key={v} value={v}>{t(`principalTypes.${v}` as never)}</option>)}
            </select>
          </Field>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => { setStep(2); track('form_step', {step: 2}); }} className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 py-3 font-medium text-white hover:bg-accent-ink">{t('next')}</button>
          <span className="text-[0.85rem] text-muted">{t('draftNote')}</span>
        </div>
      </fieldset>

      <fieldset className={`grid gap-4 border-0 p-0 m-0 ${step === 2 ? '' : 'hidden'}`} aria-hidden={step !== 2}>
        <legend className="sr-only">{t('steps.contact')}</legend>
        <Field label={t('services')} htmlFor="services" error={err('services')}>
          <div id="services" className="grid gap-2 sm:grid-cols-2">
            {serviceOptions.map((s) => (
              <label key={s} className="flex items-center gap-2 text-[0.95rem]"><input type="checkbox" name="services" value={s} className="h-4 w-4 accent-accent" defaultChecked={s === 'agency'} />{t(`serviceOptions.${s}` as never)}</label>
            ))}
          </div>
        </Field>
        <Field label={t('notes')} htmlFor="notes" help={t('notesHelp')}>
          <textarea id="notes" name="notes" rows={4} className={input} maxLength={2000} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t('contactName')} htmlFor="contactName" error={err('contactName')}><input id="contactName" name="contactName" className={input} required autoComplete="name" aria-invalid={!!errors.contactName} /></Field>
          <Field label={t('company')} htmlFor="company" error={err('company')}><input id="company" name="company" className={input} required autoComplete="organization" aria-invalid={!!errors.company} /></Field>
          <Field label={t('jobTitle')} htmlFor="jobTitle"><input id="jobTitle" name="jobTitle" className={input} autoComplete="organization-title" /></Field>
          <Field label={t('email')} htmlFor="email" error={err('email')}><input id="email" name="email" type="email" className={input} required autoComplete="email" aria-invalid={!!errors.email} /></Field>
          <Field label={t('phone')} htmlFor="phone" error={err('phone')} help={t('phoneHelp')}><input id="phone" name="phone" type="tel" className={`${input} font-mono`} required autoComplete="tel" placeholder="+507…" aria-invalid={!!errors.phone} /></Field>
        </div>
        <label className="flex items-start gap-2 text-[0.9rem]">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-accent" aria-invalid={!!errors.consent} />
          <span>{t('consent')}</span>
        </label>
        {errors.consent && <p role="alert" className="m-0 text-[0.82rem] text-err">{t('errors.consent')}</p>}
        {turnstileKey && <div className="cf-turnstile" data-sitekey={turnstileKey} data-size="invisible" data-response-field-name="turnstileToken" />}
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => setStep(1)} className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 py-3 font-medium text-accent-ink hover:bg-accent-soft">{t('back')}</button>
          <button type="submit" disabled={pending} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-white hover:bg-accent-ink disabled:opacity-60">
            {pending && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
            {pending ? t('sending') : t('submit')}
          </button>
          <span className="text-[0.85rem] text-muted">{t('sla')}</span>
        </div>
      </fieldset>
      {turnstileKey && <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
    </form>
  );
}
