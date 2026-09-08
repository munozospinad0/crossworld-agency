/**
 * Esquemas de los formularios, compartidos por el cliente y por la Server Action.
 *
 * El cliente valida con el MISMO esquema antes de abrir WhatsApp: así el mensaje sale
 * completo y el visitante ve los errores sin esperar al servidor. La acción vuelve a
 * validar (nunca se confía en el cliente) para el registro interno.
 *
 * Este archivo no puede llevar 'use server': un módulo de servidor solo exporta funciones.
 */

import {z} from 'zod';

/** Dígito de control del IMO: los 6 primeros por 7..2, módulo 10. */
export function imoChecksum(imo: string) {
  const d = imo.split('').map(Number);
  const sum = d.slice(0, 6).reduce((acc, n, i) => acc + n * (7 - i), 0);
  return sum % 10 === d[6];
}

export const PORT_OPTIONS = ['balboa', 'cristobal', 'manzanillo', 'cct', 'bahia-las-minas', 'psa-rodman', 'taboguilla', 'melones', 'vacamonte', 'other'] as const;
export const SERVICE_OPTIONS = ['agency', 'surveys', 'bunker_survey', 'fuel', 'sts', 'claims', 'consulting'] as const;
export const VESSEL_TYPES = ['bulk', 'tanker', 'container', 'lpg', 'lng', 'general', 'roro', 'passenger', 'tug', 'barge', 'fishing', 'offshore', 'other'] as const;
export const TRANSIT_OPTIONS = ['none', 'northbound', 'southbound'] as const;
export const PRINCIPAL_TYPES = ['owner', 'charterer', 'manager', 'trader', 'pandi', 'insurer', 'lawyer', 'other'] as const;

export const PortCallSchema = z.object({
  submissionId: z.uuid(),
  step: z.string().optional(),
  vesselName: z.string().trim().min(2).max(80),
  imo: z.string().trim().regex(/^\d{7}$/, 'imo').refine(imoChecksum, 'imo'),
  vesselType: z.enum(VESSEL_TYPES),
  flag: z.string().trim().max(40).optional(),
  loa: z.coerce.number().positive().max(400).optional(),
  beam: z.coerce.number().positive().max(80).optional(),
  draft: z.coerce.number().positive().max(25).optional(),
  gt: z.coerce.number().positive().optional(),
  cargo: z.string().trim().max(120).optional(),
  eta: z.string().trim().min(10, 'eta'),
  ports: z.array(z.enum(PORT_OPTIONS)).min(1, 'ports'),
  transit: z.enum(TRANSIT_OPTIONS),
  principalType: z.enum(PRINCIPAL_TYPES),
  services: z.array(z.enum(SERVICE_OPTIONS)).min(1, 'services'),
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

export type PortCallData = z.infer<typeof PortCallSchema>;

export const FdaSchema = z.object({
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

export type FdaData = z.infer<typeof FdaSchema>;

/** Campos numéricos u opcionales que llegan vacíos: se borran para que `.optional()` funcione. */
const DROP_IF_EMPTY = ['loa', 'beam', 'draft', 'gt', 'flag', 'cargo', 'jobTitle', 'notes', 'vesselName'];

/** FormData → objeto plano, agrupando las casillas múltiples en arrays. */
export function rawFromFormData(fd: FormData, arrayKeys: readonly string[] = []) {
  const raw: Record<string, unknown> = {};
  for (const [k, v] of fd.entries()) {
    const value = typeof v === 'string' ? v : undefined;
    if (arrayKeys.includes(k)) {
      const prev = (raw[k] as string[] | undefined) ?? [];
      prev.push(String(value ?? ''));
      raw[k] = prev;
    } else raw[k] = value;
  }
  for (const k of arrayKeys) raw[k] = raw[k] ?? [];
  for (const k of DROP_IF_EMPTY) if (raw[k] === '') delete raw[k];
  return raw;
}

/** Mensajes de error conocidos → clave de traducción; el resto cae en 'generic'. */
const KNOWN = new Set(['imo', 'eta', 'ports', 'services', 'phone', 'consent', 'turnstile']);

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (!errors[key]) errors[key] = KNOWN.has(issue.message) ? issue.message : 'generic';
  }
  return errors;
}

/** UUID v4 válido incluso donde no existe crypto.randomUUID (el esquema exige uuid). */
export function newSubmissionId(): string {
  const c: Crypto | undefined = typeof crypto !== 'undefined' ? crypto : undefined;
  if (typeof c?.randomUUID === 'function') return c.randomUUID();
  const b = new Uint8Array(16);
  if (typeof c?.getRandomValues === 'function') c.getRandomValues(b);
  else for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}
