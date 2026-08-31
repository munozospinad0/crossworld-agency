import 'server-only';
import {Resend} from 'resend';
import {site} from '@/content/site';

type Mail = {to: string; subject: string; text: string; html?: string; replyTo?: string; idempotencyKey?: string};

const from = process.env.EMAIL_FROM ?? `Cross World Agency <requests@send.crossworldagency.com>`;
const toOps = process.env.EMAIL_TO_OPERATIONS ?? site.emails.operations.address;

/** Envía por Resend si hay clave; si no, registra en consola (preview / arranque). Nunca lanza. */
export async function sendMail(m: Mail): Promise<'sent' | 'logged' | 'failed'> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log('[email:logged]', m.to, m.subject);
    return 'logged';
  }
  try {
    const resend = new Resend(key);
    const res = await resend.emails.send(
      {from, to: m.to, subject: m.subject, text: m.text, html: m.html, replyTo: m.replyTo ?? toOps},
      m.idempotencyKey ? {idempotencyKey: m.idempotencyKey} : undefined,
    );
    if (res.error) { console.error('[email] resend error', res.error); return 'failed'; }
    return 'sent';
  } catch (e) {
    console.error('[email] failed', e);
    return 'failed';
  }
}

export function confirmationMail(locale: string, d: {name: string; email: string; number: string; type: string; vessel?: string; imo?: string; eta?: string; ports?: string}): Mail {
  const es = locale === 'es';
  const subject = es ? `Solicitud ${d.number} recibida · Cross World Agency` : `Request ${d.number} received · Cross World Agency`;
  const body = es
    ? `Hola ${d.name},\n\nRecibimos su solicitud (${d.type})${d.vessel ? ` para ${d.vessel}` : ''}${d.imo ? ` (IMO ${d.imo})` : ''}${d.eta ? `, ETA ${d.eta}` : ''}${d.ports ? `, ${d.ports}` : ''}.\n\nSu número de solicitud es ${d.number}. El oficial de guardia ya la tiene y responde 24/7.\nSi es urgente, llame al ${site.phones.operations.display}.\n\n${site.legalName} · Agencia naviera con licencia AMP, autorizada por la Autoridad del Canal de Panamá · IMO company number ${site.imoCompanyNumber}\n\nLos datos bancarios se emiten solo en la PDA y se confirman por teléfono. Nunca cambiamos datos bancarios por correo.`
    : `Hello ${d.name},\n\nWe received your ${d.type} request${d.vessel ? ` for ${d.vessel}` : ''}${d.imo ? ` (IMO ${d.imo})` : ''}${d.eta ? `, ETA ${d.eta}` : ''}${d.ports ? `, ${d.ports}` : ''}.\n\nYour request number is ${d.number}. The duty officer has it and will reply 24/7.\nIf it is urgent, call ${site.phones.operations.display}.\n\n${site.legalName} · AMP-licensed ship agency, authorized by the Panama Canal Authority · IMO company number ${site.imoCompanyNumber}\n\nBank details are issued only on the PDA and confirmed by phone. We never change bank details by email.`;
  return {to: d.email, subject, text: body, idempotencyKey: `conf-${d.number}`};
}

export function internalAlert(d: {number: string; type: string; score: number; fields: Record<string, unknown>; attribution: Record<string, unknown>}): Mail {
  const rows = Object.entries(d.fields).filter(([, v]) => v !== undefined && v !== '' && v !== null).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : String(v)}`).join('\n');
  const attr = Object.entries(d.attribution).filter(([, v]) => v).map(([k, v]) => `${k}: ${String(v)}`).join('\n');
  const phone = String(d.fields.phone ?? '').replace(/\D/g, '');
  const text = `[${d.score}] ${d.type} · ${d.number}\n\n${rows}\n\nOrigen:\n${attr || '(directo)'}\n\nWhatsApp al cliente: https://wa.me/${phone}`;
  return {to: toOps, subject: `[${d.score}] ${d.type} · ${d.number} · ${d.fields.vesselName ?? d.fields.company ?? ''}`, text, idempotencyKey: `int-${d.number}`};
}
