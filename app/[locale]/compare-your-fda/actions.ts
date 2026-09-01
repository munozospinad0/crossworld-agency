'use server';

import {after} from 'next/server';
import {headers} from 'next/headers';
import {z} from 'zod';
import {getPathname} from '@/i18n/navigation';
import {site} from '@/content/site';
import {insertLead, scoreLead} from '@/lib/leads';
import {sendMail, confirmationMail, internalAlert} from '@/lib/email';
import {postToCrm} from '@/lib/webhook';
import {verifyTurnstile} from '@/lib/turnstile';

const Schema = z.object({
  submissionId: z.uuid(),
  contactName: z.string().trim().min(2).max(80),
  company: z.string().trim().min(2).max(120),
  email: z.email(),
  phone: z.string().trim().regex(/^\+\d{7,15}$/, 'phone'),
  vesselName: z.string().trim().max(80).optional(),
  imo: z.string().trim().regex(/^\d{7}$/).optional().or(z.literal('')),
  port: z.enum(['balboa', 'cristobal', 'transit', 'other']),
  notes: z.string().trim().max(2000).optional(),
  attachmentPathname: z.string().startsWith('attachments/').optional().or(z.literal('')),
  locale: z.enum(['en', 'es']),
  consent: z.literal('on', {message: 'consent'}),
  turnstileToken: z.string().optional(),
  attribution: z.string().optional(),
});

export type FdaState = {ok: boolean; requestNumber?: string; errors?: Record<string, string>};

export async function submitFdaCompare(_prev: FdaState, formData: FormData): Promise<FdaState> {
  const raw: Record<string, unknown> = {};
  for (const [k, v] of formData.entries()) raw[k] = typeof v === 'string' ? v : undefined;
  for (const k of ['vesselName', 'notes']) if (raw[k] === '') delete raw[k];
  const parsed = Schema.safeParse(raw);
  if (!parsed.success) {
    const KNOWN = new Set(['phone', 'consent', 'turnstile']);
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!errors[key]) errors[key] = KNOWN.has(issue.message) ? issue.message : 'generic';
    }
    return {ok: false, errors};
  }
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
