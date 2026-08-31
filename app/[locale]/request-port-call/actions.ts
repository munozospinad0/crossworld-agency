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

function imoChecksum(imo: string) {
  const d = imo.split('').map(Number);
  const sum = d.slice(0, 6).reduce((acc, n, i) => acc + n * (7 - i), 0);
  return sum % 10 === d[6];
}

const list = (v: unknown) => (Array.isArray(v) ? v : v ? [v] : []).map(String);

const Schema = z.object({
  submissionId: z.uuid(),
  step: z.string().optional(),
  vesselName: z.string().trim().min(2).max(80),
  imo: z.string().trim().regex(/^\d{7}$/, 'imo').refine(imoChecksum, 'imo'),
  vesselType: z.enum(['bulk', 'tanker', 'container', 'lpg', 'lng', 'general', 'roro', 'passenger', 'tug', 'barge', 'fishing', 'offshore', 'other']),
  flag: z.string().trim().max(40).optional(),
  loa: z.coerce.number().positive().max(400).optional(),
  beam: z.coerce.number().positive().max(80).optional(),
  draft: z.coerce.number().positive().max(25).optional(),
  gt: z.coerce.number().positive().optional(),
  cargo: z.string().trim().max(120).optional(),
  eta: z.string().trim().min(10, 'eta'),
  ports: z.array(z.enum(['balboa', 'cristobal', 'manzanillo', 'cct', 'bahia-las-minas', 'psa-rodman', 'taboguilla', 'melones', 'vacamonte', 'other'])).min(1, 'ports'),
  transit: z.enum(['none', 'northbound', 'southbound']),
  principalType: z.enum(['owner', 'charterer', 'manager', 'trader', 'pandi', 'insurer', 'lawyer', 'other']),
  services: z.array(z.enum(['agency', 'surveys', 'bunker_survey', 'fuel', 'sts', 'claims', 'consulting'])).min(1, 'services'),
  notes: z.string().trim().max(2000).optional(),
  contactName: z.string().trim().min(2).max(80),
  company: z.string().trim().min(2).max(120),
  jobTitle: z.string().trim().max(80).optional(),
  email: z.email(),
  phone: z.string().trim().regex(/^\+\d{7,15}$/, 'phone'),
  locale: z.enum(['en', 'es']),
  consent: z.literal('on', {message: 'consent'}),
  turnstileToken: z.string().optional(),
  attribution: z.string().optional(),
});

export type FormState = {ok: boolean; requestNumber?: string; errors?: Record<string, string>; message?: string};

export async function submitPortCall(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw: Record<string, unknown> = {};
  for (const [k, v] of formData.entries()) {
    if (k === 'ports' || k === 'services') { (raw[k] as string[] | undefined) ? (raw[k] as string[]).push(String(v)) : (raw[k] = [String(v)]); }
    else raw[k] = typeof v === 'string' ? v : undefined;
  }
  raw.ports = list(raw.ports); raw.services = list(raw.services);
  for (const k of ['loa', 'beam', 'draft', 'gt', 'flag', 'cargo', 'jobTitle', 'notes']) if (raw[k] === '') delete raw[k];

  const parsed = Schema.safeParse(raw);
  if (!parsed.success) {
    const KNOWN = new Set(['imo', 'eta', 'ports', 'services', 'phone', 'consent', 'turnstile']);
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!errors[key]) errors[key] = KNOWN.has(issue.message) ? issue.message : 'generic';
    }
    return {ok: false, errors};
  }
  const d = parsed.data;
  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (!(await verifyTurnstile(d.turnstileToken, ip, d.submissionId))) return {ok: false, errors: {form: 'turnstile'}};

  let attribution: Record<string, unknown> = {};
  try { attribution = d.attribution ? JSON.parse(d.attribution) : {}; } catch { attribution = {}; }
  attribution.page = getPathname({locale: d.locale, href: '/request-port-call'});
  attribution.userAgent = h.get('user-agent') ?? undefined;

  const score = scoreLead({imo: d.imo, eta: d.eta, principalType: d.principalType, email: d.email, services: d.services});
  const {submissionId, turnstileToken: _t, attribution: _a, consent: _c, step: _s, ...payload} = d;
  void _t; void _a; void _c; void _s;

  const {requestNumber, duplicate} = await insertLead({submissionId, type: 'port_call', locale: d.locale, payload, attribution, score});

  if (!duplicate) {
    after(async () => {
      await sendMail(confirmationMail(d.locale, {name: d.contactName, email: d.email, number: requestNumber, type: d.locale === 'es' ? 'port call' : 'port call', vessel: d.vesselName, imo: d.imo, eta: d.eta, ports: d.ports.join(', ')}));
      await sendMail(internalAlert({number: requestNumber, type: 'port_call', score, fields: payload as Record<string, unknown>, attribution}));
      await postToCrm({
        source: new URL(site.url).hostname, submission_id: submissionId, request_number: requestNumber, type: 'port_call', received_at: new Date().toISOString(), locale: d.locale,
        contact: {name: d.contactName, company: d.company, job_title: d.jobTitle, email: d.email, phone: d.phone},
        vessel: {name: d.vesselName, imo: d.imo, type: d.vesselType, loa: d.loa, beam: d.beam, draft: d.draft, gt: d.gt, cargo: d.cargo, flag: d.flag},
        call: {eta: d.eta, ports: d.ports, transit: d.transit, principal_type: d.principalType, services: d.services, notes: d.notes},
        attribution, score,
      }, submissionId);
    });
  }
  return {ok: true, requestNumber};
}
