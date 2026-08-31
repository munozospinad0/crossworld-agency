import 'server-only';
import {createHmac} from 'crypto';

/** Webhook firmado al CRM ECUS (especificación §5.5). Sin CRM_WEBHOOK_URL no hace nada. */
export async function postToCrm(payload: Record<string, unknown>, idempotencyKey: string): Promise<'sent' | 'skipped' | 'failed'> {
  const url = process.env.CRM_WEBHOOK_URL;
  const secret = process.env.CRM_WEBHOOK_SECRET ?? '';
  if (!url) return 'skipped';
  const body = JSON.stringify(payload);
  const ts = String(Math.floor(Date.now() / 1000));
  const sig = createHmac('sha256', secret).update(`${ts}.${body}`).digest('hex');
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'X-CW-Timestamp': ts, 'X-CW-Signature': `v1=${sig}`, 'Idempotency-Key': idempotencyKey},
      body,
    });
    return res.ok ? 'sent' : 'failed';
  } catch (e) {
    console.error('[webhook] failed', e);
    return 'failed';
  }
}
