import 'server-only';
import {neon} from '@neondatabase/serverless';

/**
 * Persistencia de leads. Con DATABASE_URL usa Neon (tablas de la especificación §5.4).
 * Sin base de datos (preview / arranque) usa memoria de proceso: el lead nunca se pierde
 * porque además se envía por correo y al webhook; el número se genera con sufijo aleatorio.
 */

export type LeadType = 'port_call' | 'surveyor' | 'fuel_quote' | 'attendance' | 'contact';

export type LeadInput = {
  submissionId: string;
  type: LeadType;
  locale: string;
  payload: Record<string, unknown>;
  attribution: Record<string, unknown>;
  score: number;
};

const mem = new Map<string, string>();

function sql() {
  const url = process.env.DATABASE_URL;
  return url ? neon(url) : null;
}

export async function ensureSchema() {
  const db = sql();
  if (!db) return;
  await db`create table if not exists leads (
    id uuid primary key default gen_random_uuid(),
    submission_id uuid unique not null,
    request_number text unique not null,
    type text not null,
    status text not null default 'received',
    locale text not null,
    payload jsonb not null, attribution jsonb not null, score int default 0,
    attachment_pathname text, db_error boolean default false,
    first_response_at timestamptz, assigned_to text, notes text,
    created_at timestamptz default now(), updated_at timestamptz default now())`;
  await db`create table if not exists request_counter (day date primary key, n int not null)`;
  await db`create table if not exists outbox (id bigserial primary key, lead_id uuid, kind text not null, attempts int default 0, last_error text, status text default 'pending', next_attempt_at timestamptz default now(), created_at timestamptz default now())`;
}

function day() {
  const d = new Date();
  return `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
}

function randomSuffix() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 4; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}

/** Inserta el lead de forma idempotente y devuelve el número de solicitud. */
export async function insertLead(lead: LeadInput): Promise<{requestNumber: string; duplicate: boolean; dbError: boolean}> {
  const existing = mem.get(lead.submissionId);
  if (existing) return {requestNumber: existing, duplicate: true, dbError: false};

  const db = sql();
  if (db) {
    try {
      await ensureSchema();
      const dup = await db`select request_number from leads where submission_id = ${lead.submissionId}`;
      if (dup.length) return {requestNumber: dup[0].request_number as string, duplicate: true, dbError: false};
      const counter = await db`insert into request_counter (day, n) values (current_date, 1)
        on conflict (day) do update set n = request_counter.n + 1 returning n`;
      const n = Number(counter[0].n);
      const requestNumber = `CW-${day()}-${String(n).padStart(3, '0')}`;
      await db`insert into leads (submission_id, request_number, type, locale, payload, attribution, score)
        values (${lead.submissionId}, ${requestNumber}, ${lead.type}, ${lead.locale}, ${JSON.stringify(lead.payload)}::jsonb, ${JSON.stringify(lead.attribution)}::jsonb, ${lead.score})`;
      mem.set(lead.submissionId, requestNumber);
      return {requestNumber, duplicate: false, dbError: false};
    } catch (e) {
      console.error('[leads] db error', e);
    }
  }
  const requestNumber = `CW-${day()}-${randomSuffix()}`;
  mem.set(lead.submissionId, requestNumber);
  console.log('[leads] stored in memory (no DATABASE_URL)', requestNumber, lead.type);
  return {requestNumber, duplicate: false, dbError: !!db};
}

export function scoreLead(p: {imo?: string; eta?: string; principalType?: string; email?: string; services?: string[]; country?: string}) {
  let s = 0;
  if (p.imo && /^\d{7}$/.test(p.imo)) s += 25;
  if (p.eta) {
    const days = (new Date(p.eta).getTime() - Date.now()) / 86400000;
    if (days >= 0 && days <= 30) s += 20;
  }
  if (p.principalType && ['owner', 'charterer', 'pandi', 'insurer'].includes(p.principalType)) s += 20;
  if (p.email && !/@(gmail|hotmail|yahoo|outlook|icloud)\./i.test(p.email)) s += 15;
  if (p.services?.some((x) => ['sts', 'claims', 'bunker_survey'].includes(x))) s += 10;
  return Math.min(100, s);
}
