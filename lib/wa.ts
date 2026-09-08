/**
 * Convierte lo que el visitante llenó en un mensaje de WhatsApp legible.
 *
 * El sitio no tiene correo ni CRM conectados: WhatsApp es el canal por el que llega la
 * solicitud al oficial de guardia. Por eso el mensaje debe bastarse solo — todos los campos
 * llenos, en secciones, sin nada que haya que preguntar después.
 *
 * WhatsApp entiende *negrita* entre asteriscos; los saltos de línea viajan literales dentro
 * del parámetro `text` de wa.me (ver `dutyChannel` en content/site.ts).
 */

import type {FdaData, PortCallData} from '@/lib/formSchemas';

/** Traductor de next-intl visto como función simple: las claves se arman en tiempo de ejecución. */
export type Labeler = (key: string) => string;

type Row = [label: string, value: unknown];

function section(title: string, rows: Row[]): string {
  const body = rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([label, v]) => `${label}: ${String(v).trim()}`)
    .join('\n');
  return body ? `*${title}*\n${body}` : '';
}

function join(parts: string[]): string {
  return parts.filter(Boolean).join('\n\n');
}

/** "2026-09-12T08:00" → "2026-09-12 08:00" (el valor nativo de datetime-local). */
function readableDateTime(v: string): string {
  return v.replace('T', ' ').slice(0, 16);
}

/** Eslora / manga / calado en una sola línea; se omite si no llenó ninguna. */
function dimensions(d: PortCallData): string | undefined {
  const v = [d.loa, d.beam, d.draft];
  if (v.every((x) => x === undefined)) return undefined;
  return v.map((x) => (x === undefined ? '—' : String(x))).join(' / ');
}

/**
 * Mensaje de la solicitud de port call.
 * `t` es el traductor del namespace `Form`.
 */
export function portCallMessage(d: PortCallData, t: Labeler): string {
  return join([
    `*${t('wa.title')}*`,
    section(t('wa.vessel'), [
      [t('wa.name'), d.vesselName],
      [t('imo'), d.imo],
      [t('vesselType'), t(`vesselTypes.${d.vesselType}`)],
      [t('flag'), d.flag],
      [t('wa.dims'), dimensions(d)],
      [t('gt'), d.gt],
      [t('cargo'), d.cargo],
    ]),
    section(t('wa.call'), [
      [t('wa.eta'), readableDateTime(d.eta)],
      [t('ports'), d.ports.map((p) => t(`portOptions.${p}`)).join(', ')],
      [t('transit'), t(`transitOptions.${d.transit}`)],
      [t('services'), d.services.map((s) => t(`serviceOptions.${s}`)).join(', ')],
    ]),
    section(t('wa.contact'), [
      [t('wa.name'), d.contactName],
      [t('company'), d.company],
      [t('jobTitle'), d.jobTitle],
      [t('principalType'), t(`principalTypes.${d.principalType}`)],
      [t('wa.email'), d.email],
      [t('wa.phone'), d.phone],
    ]),
    d.notes ? `*${t('wa.notes')}*\n${d.notes}` : '',
  ]);
}

/**
 * Mensaje de la comparación de FDA.
 * `t` es el traductor del namespace `Fda`; `f`, el del namespace `Form` (etiquetas comunes).
 */
export function fdaMessage(d: FdaData, t: Labeler, f: Labeler): string {
  return join([
    `*${t('wa.title')}*`,
    section(t('wa.call'), [
      [t('wa.kind'), t(`portOptions.${d.port}`)],
      [f('vesselName'), d.vesselName],
      [f('imo'), d.imo],
    ]),
    section(f('wa.contact'), [
      [f('wa.name'), d.contactName],
      [f('company'), d.company],
      [f('wa.email'), d.email],
      [f('wa.phone'), d.phone],
    ]),
    d.notes ? `*${f('wa.notes')}*\n${d.notes}` : '',
    // El archivo no viaja por wa.me: se le pide que lo suelte en el mismo chat.
    d.attachmentPathname ? t('wa.attached') : t('wa.attach'),
  ]);
}
