'use client';

import {startTransition, useActionState, useEffect, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {upload} from '@vercel/blob/client';
import {submitFdaCompare, type FdaState} from '@/app/[locale]/compare-your-fda/actions';
import {track} from '@/lib/analytics';
import {site} from '@/content/site';

const initial: FdaState = {ok: false};
const input = 'w-full rounded-field border border-line-strong bg-white px-3 py-2.5 text-[1rem] text-ink focus:border-accent focus:shadow-[0_0_0_3px_rgba(24,70,194,0.18)] focus:outline-none aria-[invalid=true]:border-err';

export function FdaCompareForm() {
  const t = useTranslations('Fda');
  const f = useTranslations('Form');
  const locale = useLocale();
  const [state, action, pending] = useActionState(submitFdaCompare, initial);
  const [submissionId] = useState(() => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`));
  const [attribution, setAttribution] = useState('{}');
  const [uploads, setUploads] = useState<boolean | null>(null);
  const [uploading, setUploading] = useState(false);
  const [pathname, setPathname] = useState('');
  const [uploadError, setUploadError] = useState('');
  const errors = state.errors ?? {};
  const err = (k: string) => (errors[k] ? f(`errors.${errors[k]}` as never) : undefined);

  useEffect(() => {
    try {
      const u = new URL(window.location.href);
      const a: Record<string, string> = {};
      for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid', 'fbclid']) { const v = u.searchParams.get(k); if (v) a[k] = v; }
      if (document.referrer) a.referrer = document.referrer;
      a.landing = u.pathname;
      setAttribution(JSON.stringify(a));
    } catch { /* sin almacenamiento */ }
    // ¿están habilitadas las subidas? (503 si no hay token de Blob)
    fetch('/api/attachments', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: '{}'}).then((r) => setUploads(r.status !== 503)).catch(() => setUploads(false));
  }, []);

  useEffect(() => {
    if (state.ok && state.requestNumber) { track('contact_submit', {kind: 'fda_compare', request_number: state.requestNumber}); window.scrollTo({top: 0, behavior: 'smooth'}); }
    else if (state.errors) track('form_error', {field: Object.keys(state.errors)[0]});
  }, [state]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError('');
    if (file.size > 10 * 1024 * 1024) { setUploadError(t('tooBig')); return; }
    setUploading(true);
    try {
      const blob = await upload(`attachments/${submissionId}-${file.name}`, file, {access: 'private', handleUploadUrl: '/api/attachments'});
      setPathname(blob.pathname);
    } catch {
      setUploadError(t('uploadFailed'));
    } finally {
      setUploading(false);
    }
  }

  if (state.ok && state.requestNumber) {
    return (
      <div role="status" className="rounded-card border border-[#bfe3cf] bg-ok-soft p-6 text-[#134a30]">
        <b className="block text-[1.15rem] text-[#0f3d27]">{t('success.title', {number: state.requestNumber})}</b>
        <p className="m-0 mt-2">{t('success.text', {phone: site.phones.operations.display})}</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); startTransition(() => action(fd)); }} className="grid gap-4 rounded-card border border-line bg-surface p-6" noValidate>
      <input type="hidden" name="submissionId" value={submissionId} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="attribution" value={attribution} />
      <input type="hidden" name="attachmentPathname" value={pathname} />
      {errors.form && <p role="alert" className="m-0 rounded-field bg-err-soft px-3 py-2 text-[0.9rem] text-err">{f(`errors.${errors.form}` as never)}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="c1" className="mb-1.5 block text-[0.9rem] font-medium text-ink">{f('contactName')}</label><input id="c1" name="contactName" className={input} required autoComplete="name" aria-invalid={!!errors.contactName} />{err('contactName') && <p role="alert" className="mt-1 text-[0.82rem] text-err">{err('contactName')}</p>}</div>
        <div><label htmlFor="c2" className="mb-1.5 block text-[0.9rem] font-medium text-ink">{f('company')}</label><input id="c2" name="company" className={input} required autoComplete="organization" aria-invalid={!!errors.company} />{err('company') && <p role="alert" className="mt-1 text-[0.82rem] text-err">{err('company')}</p>}</div>
        <div><label htmlFor="c3" className="mb-1.5 block text-[0.9rem] font-medium text-ink">{f('email')}</label><input id="c3" name="email" type="email" className={input} required autoComplete="email" aria-invalid={!!errors.email} />{err('email') && <p role="alert" className="mt-1 text-[0.82rem] text-err">{err('email')}</p>}</div>
        <div><label htmlFor="c4" className="mb-1.5 block text-[0.9rem] font-medium text-ink">{f('phone')}</label><input id="c4" name="phone" type="tel" className={`${input} font-mono`} required autoComplete="tel" placeholder="+30…" aria-invalid={!!errors.phone} />{err('phone') && <p role="alert" className="mt-1 text-[0.82rem] text-err">{err('phone')}</p>}</div>
        <div><label htmlFor="c5" className="mb-1.5 block text-[0.9rem] font-medium text-ink">{f('vesselName')}</label><input id="c5" name="vesselName" className={input} /></div>
        <div><label htmlFor="c6" className="mb-1.5 block text-[0.9rem] font-medium text-ink">{f('imo')}</label><input id="c6" name="imo" inputMode="numeric" className={`${input} font-mono`} aria-invalid={!!errors.imo} />{err('imo') && <p role="alert" className="mt-1 text-[0.82rem] text-err">{err('imo')}</p>}</div>
        <div><label htmlFor="c7" className="mb-1.5 block text-[0.9rem] font-medium text-ink">{t('port')}</label>
          <select id="c7" name="port" className={input} defaultValue="transit">
            {(['transit', 'balboa', 'cristobal', 'other'] as const).map((v) => <option key={v} value={v}>{t(`portOptions.${v}`)}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="c8" className="mb-1.5 block text-[0.9rem] font-medium text-ink">{t('file')}</label>
        {uploads === false ? (
          <p className="m-0 rounded-field border border-dashed border-line-strong bg-paper px-3 py-3 text-[0.9rem] text-muted">{t('uploadsOff')}</p>
        ) : (
          <>
            <input id="c8" type="file" accept="application/pdf,image/jpeg,image/png" onChange={onFile} className="block w-full rounded-field border border-dashed border-line-strong bg-paper px-3 py-3 text-[0.9rem] text-text file:mr-3 file:rounded-full file:border-0 file:bg-accent-soft file:px-3 file:py-1.5 file:font-medium file:text-accent-ink" />
            <p className="mt-1 text-[0.82rem] text-muted">{uploading ? t('uploading') : pathname ? t('uploaded') : t('fileHelp')}</p>
            {uploadError && <p role="alert" className="mt-1 text-[0.82rem] text-err">{uploadError}</p>}
          </>
        )}
      </div>

      <div><label htmlFor="c9" className="mb-1.5 block text-[0.9rem] font-medium text-ink">{f('notes')}</label><textarea id="c9" name="notes" rows={3} className={input} maxLength={2000} /></div>

      <label className="flex items-start gap-2 text-[0.9rem]"><input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-accent" aria-invalid={!!errors.consent} /><span>{f('consent')}</span></label>
      {errors.consent && <p role="alert" className="m-0 text-[0.82rem] text-err">{f('errors.consent')}</p>}
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-size="invisible" data-response-field-name="turnstileToken" />}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending || uploading} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-white hover:bg-accent-ink disabled:opacity-60">
          {pending && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
          {pending ? f('sending') : t('submit')}
        </button>
        <span className="text-[0.85rem] text-muted">{t('sla')}</span>
      </div>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
    </form>
  );
}
