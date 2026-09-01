# Cambio de DNS a Vercel · crossworldagency.com

Decisión (1-sep-2026): la aplicación vive en Vercel (proyecto `crossworld-agency`, team `munozospinad0s-projects`); el dominio sigue en el registrador del cliente y **solo se cambian los registros DNS**. El correo `gpena@crossworldagency.com` NO se toca.

## Antes de tocar nada (T-7, esta semana)
1. Entrar al registrador del dominio (quien lo administre en la familia) y **exportar o fotografiar todos los registros actuales**: A, AAAA, CNAME, MX, TXT (SPF, DKIM, verificaciones), NS y TTL.
2. Bajar el TTL de los registros A y CNAME a 300 segundos (para que el cambio del lunes propague en minutos).
3. Confirmar qué hosting tiene el WordPress actual (cPanel, Hostinger, GoDaddy…): sirve para la página puente y para apagarlo a los 30 días.
4. Crear el correo `operations@crossworldagency.com` en el proveedor de correo actual (o decidir usar solo gpena@).

## En Vercel (lo hace Daniel, 5 minutos)
1. Proyecto `crossworld-agency` → Settings → Domains → Add: `crossworldagency.com` y `www.crossworldagency.com`. Marcar el **apex como primario** (Vercel redirige `www` con 308).
2. Copiar los valores que muestra el panel (normalmente `A @ 76.76.21.21` y `CNAME www cname.vercel-dns.com`, más un `TXT _vercel` de verificación si lo pide). **Usar los del panel, no los de artículos viejos.**
3. Settings → Environment Variables: cargar `.env.example` con valores reales (`NEXT_PUBLIC_SITE_URL=https://crossworldagency.com`, `NEXT_PUBLIC_WHATSAPP_DUTY_E164`, Resend, Neon, Turnstile, GTM, Blob). Redeploy.

## En el registrador (día 0, lunes 7)
1. Registro `A` para `@` → valor del panel de Vercel (borrar el A viejo que apunta al hosting de WordPress).
2. Registro `CNAME` para `www` → `cname.vercel-dns.com` (o el valor del panel).
3. **No borrar** MX, SPF (`v=spf1 …`), DKIM ni TXT de verificación existentes.
4. Añadir `_dmarc` TXT con `v=DMARC1; p=none; rua=mailto:gpena@crossworldagency.com` (modo observación; se sube a `quarantine` a los 60 días).
5. Cuando Resend esté configurado: añadir sus registros en el subdominio `send.crossworldagency.com` (los da el panel de Resend).

## Verificación (10 minutos después)
- `https://crossworldagency.com/` → 308 a `/en` en un solo salto; `/about/` → `/en/about`; `/wp-login.php` → 410.
- Candado HTTPS válido en apex y `www`.
- Enviar y recibir un correo desde gpena@ (nada cambió en MX).
- Enviar el formulario de port call con un correo real y confirmar que llega el acuse.
- Search Console: agregar la propiedad de dominio (TXT) y enviar `https://crossworldagency.com/sitemap.xml`; Bing Webmaster: importar desde GSC.

## Plan B
Si el acceso al registrador no llega el lunes, el sitio queda en `crossworld-agency-git-main-munozospinad0s-projects.vercel.app` (ya público) y se apunta el dominio el día que llegue; nada más cambia.

## Después
- Día 30: apagar el hosting del WordPress (o dejarlo solo para correo si el correo vive ahí) y activar `includeSubDomains` en HSTS.
- Día 60: DMARC a `p=quarantine`.
