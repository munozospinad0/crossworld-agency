'use server';

import {after} from 'next/server';
import {headers} from 'next/headers';
import {getPathname} from '@/i18n/navigation';
import {site} from '@/content/site';
import {insertLead, scoreLead} from '@/lib/leads';
import {sendMail, confirmationMail, internalAlert} from '@/lib/email';
import {postToCrm} from '@/lib/webhook';
import {verifyTurnstile} from '@/lib/turnstile';
import {FdaSchema, fieldErrors, rawFromFormData} from '@/lib/formSchemas';

export type FdaState = {ok: boolean; requestNumber?: string; errors?: Record<string, string>};

/** Registro interno; el canal visible para el visitante es WhatsApp (ver FdaCompareForm). */
export async function submitFdaCompare(_prev: FdaState, formData: FormData): Promise<FdaState> {
  const parsed = FdaSchema.safeParse(rawFromFormData(formData));
  if (!parsed.success) return {ok: false, errors: fieldErrors(parsed.error)};
  const d = parsed.data;
  const h = await headers();
  if (!(await verifyTurnstile(d.turnstileToken, h.get('x-forwarded-for')?.split(',')[0]?.trim(), d.submissionId))) return {ok: false, errors: {form: 'turnstile'}};

  let attribution: Record<string, unknown> = {};
  try { attribution = d.attribution ? JSON.parse(d.attribution) : {}; } catch { attribution = {}; }
  attribution.page = getPathname({locale: d.locale, href: '/compare-your-fda'});

  const score = scoreLead({imo: d.imo || undefined, email: d.email, principalType: 'owner'});
  const {submissionId, turnstileToken: _t, attribution: _a, consent: _c, ...payload} = d;
  void _t; void _a; void _c;
  const {requestNumber, duplicate} = await insertLead({submissionId, type: 'contact', locale: d.locale, payload: {...payload, kind: 'fda_compare'}, attribution, score});

  if (!duplicate) {
    after(async () => {
      await sendMail(confirmationMail(d.locale, {name: d.contactName, email: d.email, number: requestNumber, type: d.locale === 'es' ? 'comparación de FDA' : 'FDA comparison', vessel: d.vesselName, imo: d.imo || undefined}));
      await sendMail(internalAlert({number: requestNumber, type: 'fda_compare', score, fields: payload as Record<string, unknown>, attribution}));
      await postToCrm({source: new URL(site.url).hostname, submission_id: submissionId, request_number: requestNumber, type: 'fda_compare', received_at: new Date().toISOString(), locale: d.locale, contact: {name: d.contactName, company: d.company, email: d.email, phone: d.phone}, vessel: {name: d.vesselName, imo: d.imo || undefined}, call: {ports: [d.port], notes: d.notes, attachment_pathname: d.attachmentPathname || undefined}, attribution, score}, submissionId);
    });
  }
  return {ok: true, requestNumber};
}
