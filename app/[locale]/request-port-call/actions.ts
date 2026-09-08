'use server';

import {after} from 'next/server';
import {headers} from 'next/headers';
import {getPathname} from '@/i18n/navigation';
import {site} from '@/content/site';
import {insertLead, scoreLead} from '@/lib/leads';
import {sendMail, confirmationMail, internalAlert} from '@/lib/email';
import {postToCrm} from '@/lib/webhook';
import {verifyTurnstile} from '@/lib/turnstile';
import {PortCallSchema, fieldErrors, rawFromFormData} from '@/lib/formSchemas';

export type FormState = {ok: boolean; requestNumber?: string; errors?: Record<string, string>; message?: string};

/**
 * Registro interno de la solicitud. El canal que el visitante ve es WhatsApp (el formulario
 * abre el chat con todo escrito); esta acción corre en paralelo y solo hace algo si están
 * configurados la base, Resend o el webhook del CRM. Sin esas variables no falla: no registra.
 */
export async function submitPortCall(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = PortCallSchema.safeParse(rawFromFormData(formData, ['ports', 'services']));
  if (!parsed.success) return {ok: false, errors: fieldErrors(parsed.error)};
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
