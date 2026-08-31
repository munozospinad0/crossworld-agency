import 'server-only';

/** Verifica el token de Turnstile. Sin TURNSTILE_SECRET_KEY (preview) se acepta. */
export async function verifyTurnstile(token: string | undefined, remoteip?: string, idempotencyKey?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({secret, response: token, remoteip, idempotency_key: idempotencyKey}),
    });
    const data = (await res.json()) as {success: boolean};
    return !!data.success;
  } catch {
    return false;
  }
}
