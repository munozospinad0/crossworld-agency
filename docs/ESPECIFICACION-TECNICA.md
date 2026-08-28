# Cross World Agency · Especificación técnica v0

Complemento del [plan maestro](PLAN.md). Aquí vive lo que un desarrollador necesita para construir sin preguntar: versiones, estructura, rutas, modelo de contenido, formularios y datos, analítica, SEO, seguridad, CI, pruebas, migración y operación.

---

## 1. Stack y versiones (scaffold generado el 28-ago-2026)

| Paquete | Versión | Notas |
|---|---|---|
| next | 16.3.3 | App Router, React Server Components, Turbopack. En 16 el middleware se llama **`proxy.ts`**, los `params` son Promise, y `next/root-params` (16.3+) lee el `[locale]` sin `setRequestLocale`. |
| react / react-dom | 19.2.8 | |
| tailwindcss | 4.x | Configuración CSS-first con `@theme` en `app/globals.css`; plugin `@tailwindcss/postcss`. |
| next-intl | 4.14 | Rutas `/en` y `/es`, `defineRouting` con `pathnames` localizados, `createNavigation`. |
| motion | 13.x | `import {motion} from "motion/react"`; solo en client leaves. |
| @phosphor-icons/react | 2.1 | `weight="regular"`, `size={20}` por defecto. |
| geist | 1.7 | `GeistSans` y `GeistMono` vía `next/font`. |
| zod | 4.x | Validación de formularios en servidor. |
| resend | 6.x | Email transaccional. |
| @keystatic/core, @keystatic/next | última | Fase 3. Modo `github` en producción, `local` en desarrollo. |
| @vercel/analytics, @vercel/speed-insights | última | |
| @neondatabase/serverless (o `pg`) | última | Tabla `leads`. Alternativa sin base: Vercel Blob + hoja del CRM. |
| Node | 22 LTS | `.nvmrc` = 22 |

Instalación reproducible: `research/_scaffold.sh` (crea el proyecto en `/tmp/cw-site` con las mismas banderas: `--ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --turbopack`).

---

## 2. Estructura del repositorio

```
app/
  [locale]/
    layout.tsx                 html lang, fuentes, nav, footer, JSON-LD Organization, Analytics
    page.tsx                   home
    services/page.tsx          hub
    services/[slug]/page.tsx   7 servicios (contenido MDX)
    who-we-serve/[slug]/page.tsx
    panama-canal-transit-guide/page.tsx
    resources/page.tsx
    ports/page.tsx · ports/[slug]/page.tsx
    about/page.tsx · certifications/page.tsx
    insights/page.tsx · insights/[slug]/page.tsx
    contact/page.tsx · request-port-call/page.tsx
    privacy/page.tsx · terms/page.tsx
    not-found.tsx
  api/
    leads/route.ts             (solo si hace falta un endpoint externo; los formularios usan Server Actions)
    og/route.tsx               imágenes OG dinámicas (next/og)
  sitemap.ts · robots.ts · rss.xml/route.ts · llms.txt/route.ts
  globals.css                  @theme con los tokens
proxy.ts                       next-intl (antes middleware.ts)
i18n/routing.ts · i18n/navigation.ts · i18n/request.ts
messages/en.json · messages/es.json          textos de interfaz (nav, botones, formularios, errores)
content/
  en/services/*.mdx · es/services/*.mdx
  en/ports/*.mdx · es/ports/*.mdx
  en/posts/*.mdx · es/posts/*.mdx
  en/audiences/*.mdx · es/audiences/*.mdx
  en/cases/*.mdx · es/cases/*.mdx
  shared/{site,contact,team,certifications,partners,testimonials}.json
keystatic.config.ts
components/
  ui/            Button, Chip, Input, Select, Textarea, Field, Card, Section, Container, Prose
  layout/        Nav, Footer, LocaleSwitch, WhatsAppButton, Breadcrumbs
  sections/      Hero, CredentialStrip, ServicesBento, PortCallProcess (client), PortsCards, Captain, Audiences, Proof, LatestInsights, FinalCta, NominateBlock
  forms/         PortCallForm (client), SurveyorForm, FuelQuoteForm, ContactForm, Turnstile
  motion/        Reveal (client), StickyStack (client), Parallax (client)
lib/
  seo.ts         metadata por plantilla, alternates/hreflang
  schema.ts      generadores JSON-LD
  analytics.ts   track(event, params) con tipos
  leads.ts       insertLead, notify, webhook, requestNumber
  email.ts       plantillas Resend (react-email opcional)
  content.ts     lectura de MDX/JSON tipada
  utils.ts
public/
  images/        fotos optimizadas (AVIF/WebP + fallback), logos con permiso
  llms-full.txt
tests/           Playwright
docs/            plan y página de avances (GitHub Pages)
research/        keyword research y scripts
.github/workflows/ci.yml
```

---

## 3. Rutas e i18n

`i18n/routing.ts`:
```ts
import {defineRouting} from 'next-intl/routing';
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/services': {en: '/services', es: '/servicios'},
    '/services/[slug]': {en: '/services/[slug]', es: '/servicios/[slug]'},
    '/who-we-serve/[slug]': {en: '/who-we-serve/[slug]', es: '/a-quien-servimos/[slug]'},
    '/panama-canal-transit-guide': {en: '/panama-canal-transit-guide', es: '/guia-transito-canal-de-panama'},
    '/resources': {en: '/resources', es: '/recursos'},
    '/ports': {en: '/ports', es: '/puertos'},
    '/ports/[slug]': {en: '/ports/[slug]', es: '/puertos/[slug]'},
    '/about': {en: '/about', es: '/nosotros'},
    '/certifications': {en: '/certifications', es: '/certificaciones'},
    '/insights': {en: '/insights', es: '/blog'},
    '/insights/[slug]': {en: '/insights/[slug]', es: '/blog/[slug]'},
    '/contact': {en: '/contact', es: '/contacto'},
    '/request-port-call': {en: '/request-port-call', es: '/solicitar-port-call'},
    '/privacy': {en: '/privacy', es: '/privacidad'},
    '/terms': {en: '/terms', es: '/terminos'},
  },
});
```

Slugs de servicios (EN → ES): `ship-agency-panama-canal-transit` → `agencia-naviera-transito-canal-de-panama` · `marine-surveys` → `inspecciones-maritimas` · `bunker-surveys-and-claims` → `inspecciones-de-bunker-y-reclamos` · `bunkering-and-oil-operations` → `suministro-de-combustible-y-operaciones-petroleras` · `ship-to-ship-and-offshore` → `ship-to-ship-y-offshore` · `marine-claims` → `reclamos-maritimos` · `maritime-consulting-and-brokerage` → `consultoria-maritima-y-brokerage`. El mapa EN↔ES vive en el frontmatter de cada MDX (`translationOf`) y alimenta los `alternates` de hreflang.

`proxy.ts`:
```ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
export default createMiddleware(routing);
export const config = {matcher: '/((?!api|_next|_vercel|.*\\..*).*)'};
```
`/` sin prefijo redirige por `Accept-Language` a `/en` o `/es` (x-default apunta a `/en`).

---

## 4. Modelo de contenido (Keystatic, fase 3; en fases 1 y 2 los mismos archivos se editan a mano)

| Colección / singleton | Campos |
|---|---|
| **site** (singleton) | name, legalName, ruc, imo, foundingDate, taglineEN/ES, phones[] {label, e164, side: pacific/atlantic/office}, whatsappE164, emails[] {area, address}, address {street, floor, office, district, city, country, lat, lng}, hours ("24/7"), social {linkedin, linkedinCaptain, facebook, youtube}, acpAgencyCode, sameAs[] |
| **services** (por idioma) | title, slug, translationOf, summary (2 líneas), h1, metaTitle, metaDescription, heroImage, includes[] (string), deliverables[] {name, timing}, ports[] (ref), steps[] {title, text}, why[] {title, text}, faq[] {q, a}, related[] (ref), cta {label, form: portcall/surveyor/fuel/claim/contact}, body (MDX), lastReviewed |
| **audiences** | title, slug, translationOf, concerns[], whatWeDo[] {serviceRef, text}, howWeWork[], documents[], cases[] (ref), cta, body |
| **ports** | name, slug, translationOf, side (pacific/atlantic), operator, terminals[], coordinates, anchorage, maxDraft, bunkerAvailable[], distanceToLocksNm, dutyPhone, particulars (MDX), dataReviewed |
| **posts** | title, slug, translationOf, category (canal/surveys/bunker/claims/company), excerpt, cover, author (ref team), publishedAt, updatedAt, sources[] {label, url}, faq[], body (MDX), tldr[] |
| **cases** | title, vesselType, port, problem, solution, timing, serviceRefs[], anonymized: true |
| **team** | name, role, photo, bioEN/ES, credentials[] {name, issuer, year, image}, linkedin |
| **certifications** | name, standard, issuer, number, scope, validFrom, validTo, image, pdf |
| **partners** | name, logo, url, permission: bool, permissionDate |
| **testimonials** | quote, name, role, company, permission: bool |
| **redirects** | from, to, status (301) |

Reglas: `permission=false` nunca se renderiza. `validTo` vencido muestra aviso interno y oculta la fecha. Todo MDX pasa por `remark-gfm` y un sanitizador; no se permiten scripts en contenido.

---

## 5. Formularios, leads y notificaciones

### 5.1 Esquemas (Zod, servidor)
```ts
const PortCall = z.object({
  vesselName: z.string().min(2).max(80),
  imo: z.string().regex(/^\d{7}$/).refine(imoChecksum, 'invalid IMO'),
  vesselType: z.enum(['bulk','tanker','container','lpg','lng','general','roro','passenger','tug','barge','fishing','offshore','other']),
  flag: z.string().max(40).optional(),
  loa: z.number().positive().max(400), beam: z.number().positive().max(60), draft: z.number().positive().max(20), gt: z.number().positive().optional(),
  cargo: z.string().max(120).optional(),
  eta: z.string().datetime(), etaTz: z.string().default('America/Panama'),
  ports: z.array(z.enum(['balboa','cristobal','colon','manzanillo','psa','rodman','other'])).min(1),
  transit: z.enum(['none','northbound','southbound']),
  principalType: z.enum(['owner','charterer','manager','trader','pandi','other']),
  services: z.array(z.enum(['agency','surveys','bunker_survey','fuel','sts','claims','consulting'])).min(1),
  notes: z.string().max(2000).optional(),
  attachment: z.instanceof(File).optional(), // ≤ 10 MB, pdf/jpg/png
  contactName: z.string().min(2), company: z.string().min(2), jobTitle: z.string().optional(),
  email: z.string().email(), phone: z.string().regex(/^\+\d{7,15}$/),
  locale: z.enum(['en','es']), consent: z.literal(true),
  attribution: z.object({utm_source:z.string().optional(), utm_medium:z.string().optional(), utm_campaign:z.string().optional(), utm_content:z.string().optional(), gclid:z.string().optional(), fbclid:z.string().optional(), referrer:z.string().optional(), landing:z.string().optional(), page:z.string()}),
  turnstileToken: z.string(),
});
```
`imoChecksum`: suma de los 6 primeros dígitos × (7..2) mod 10 = séptimo dígito.
Variantes: `SurveyorRequest` (surveyType enum del catálogo, port, date, vesselName, imo opcional, instructions, contacto) · `FuelQuote` (product: mgo/ulsd/vlsfo/other, quantityMt, port, deliveryDate, vesselName, contacto) · `Contact` (name, company, email, message).

### 5.2 Flujo del Server Action `submitPortCall`
1. Validar Turnstile (`siteverify`) y Zod. Rate limit por IP (10/hora) con Vercel KV o cabecera + memoria.
2. Generar `requestNumber` = `CW-` + fecha `YYYYMMDD` + `-` + secuencia diaria de 3 dígitos (contador en la tabla).
3. Insertar en `leads` (estado `received`). Si falla la base, seguir con email y marcar `db_error=true` (nunca perder el lead).
4. Subir adjunto a Vercel Blob (privado) y guardar la URL.
5. Enviar por Resend: confirmación al cliente (plantilla por `locale`), aviso interno a `operations@` con todos los campos y enlace `wa.me` al cliente.
6. Webhook al CRM ECUS (5.4) con reintento (3 intentos, backoff 2 s/8 s/30 s); registrar `webhook_status`.
7. Devolver `{ok:true, requestNumber, sla}`; el cliente dispara `port_call_request` en GA4 con `principal_type`, `services`, `locale`, `request_number` (hash).
8. En error de validación: devolver errores por campo (nunca perder lo escrito). En error de red: el cliente conserva el estado y muestra reintento.

### 5.3 Tabla `leads` (Postgres/Neon)
```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  request_number text unique not null,
  type text not null check (type in ('port_call','surveyor','fuel_quote','contact')),
  status text not null default 'received', -- received, contacted, qualified, pda_sent, nominated, served, invoiced, lost
  locale text not null,
  payload jsonb not null,              -- todos los campos del formulario
  attribution jsonb not null,          -- utm, gclid, fbclid, referrer, landing, page
  score int default 0,
  attachment_url text,
  email_status text, webhook_status text, db_error boolean default false,
  first_response_at timestamptz, assigned_to text, notes text,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create index on leads (created_at desc); create index on leads (status);
create table request_counter (day date primary key, n int not null);
```

### 5.4 Contrato del webhook al CRM ECUS
`POST {CRM_WEBHOOK_URL}` · cabeceras `Content-Type: application/json`, `X-CW-Signature: sha256=HMAC(body, CRM_WEBHOOK_SECRET)`, `Idempotency-Key: {request_number}`.
```json
{
  "source": "crossworldagency.com",
  "request_number": "CW-20260915-014",
  "type": "port_call",
  "received_at": "2026-09-15T11:02:33Z",
  "locale": "en",
  "contact": {"name": "…", "company": "…", "job_title": "…", "email": "…", "phone": "+30…"},
  "vessel": {"name": "…", "imo": "9786543", "type": "bulk", "loa": 229, "beam": 32.2, "draft": 12.8, "gt": 43000, "cargo": "grain", "flag": "Panama"},
  "call": {"eta": "2026-09-20T06:00:00-05:00", "ports": ["balboa","cristobal"], "transit": "northbound", "principal_type": "owner", "services": ["agency","bunker_survey"], "notes": "…", "attachment_url": null},
  "attribution": {"utm_source": "google", "utm_medium": "cpc", "utm_campaign": "panama_services_en", "gclid": "…", "referrer": "…", "landing": "/en/services/ship-agency-panama-canal-transit", "page": "/en/request-port-call"},
  "score": 85
}
```
Respuesta esperada `200 {"ok":true,"crm_id":"…"}`. El CRM (hoja + Apps Script del paquete ECUS) crea la fila con alias de campos; los cambios de etapa en el dashboard devuelven `status` por `PATCH /api/leads/{request_number}` (autenticado con el mismo HMAC) para mantener la tabla sincronizada y disparar las conversiones offline.

### 5.5 Plantillas de correo (Resend, texto en `CONTENIDO-v0.md` §6)
`confirmation_en`, `confirmation_es` (asunto: "Request {number} received · Cross World Agency"), `internal_alert` (asunto: "[{score}] {type} · {vessel} · {ports} · {eta}"), `pda_followup_48h`, `review_request`. Remitente `Cross World Agency <requests@mail.crossworldagency.com>`, reply-to `operations@crossworldagency.com`. Dominio `mail.crossworldagency.com` con SPF, DKIM y DMARC (`p=quarantine`) para no tocar el correo principal.

---

## 6. Analítica y atribución

- **GA4** vía GTM (`GTM-XXXX` a crear) con Consent Mode v2 (analytics_storage por defecto `granted` para visitantes fuera de la UE, `denied` en la UE hasta consentimiento; se detecta por cabecera `x-vercel-ip-country`).
- **Eventos** (`lib/analytics.ts` con tipos, nombres fijos): `port_call_request`, `survey_request`, `fuel_quote_request`, `contact_submit`, `whatsapp_click`, `phone_click`, `email_click`, `profile_download`, `resource_download`, `language_switch`, `guide_read_75`, `cta_click`, `form_step`, `form_error`, `nominate_copy`. Parámetros comunes: `page_path`, `locale`, `page_type` (home/service/guide/port/post/contact/form), `service_slug`, `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, `fbclid`, `referrer`.
- **Atribución de primera parte:** cookie `cw_attr` (JSON, 90 días) con utm/gclid/fbclid/referrer/landing de la primera visita; se adjunta a todo formulario.
- **Conversiones:** GA4 marca como conversión los 4 eventos de formulario + `whatsapp_click`. Google Ads: Enhanced Conversions (email + teléfono hasheados) para `port_call_request`; importación offline de `qualified` y `nomination` desde la tabla `leads` (script diario, mismo patrón que `crm-ads-sync.js` de Sandra).
- **Vercel Web Analytics + Speed Insights** en `layout.tsx`. **Search Console** (propiedad de dominio) y **Bing Webmaster** (importación desde GSC) con el sitemap enviado el día del lanzamiento.

---

## 7. SEO técnico

- `generateMetadata` por plantilla: `title` (≤ 60 caracteres, marca al final), `description` (≤ 155), `alternates.canonical` + `alternates.languages` (en, es, x-default), `openGraph` con imagen de `/api/og`, `robots` (index salvo formularios y páginas de gracias).
- **JSON-LD** (`lib/schema.ts`), ejemplo Organization en el layout:
```json
{"@context":"https://schema.org","@type":["Organization","ProfessionalService"],"@id":"https://crossworldagency.com/#org",
 "name":"Cross World Agency","legalName":"Cross World Agencies, S.A.","url":"https://crossworldagency.com/","logo":"https://crossworldagency.com/images/logo.png",
 "foundingDate":"2010-03-04","identifier":[{"@type":"PropertyValue","propertyID":"IMO","value":"5785507"},{"@type":"PropertyValue","propertyID":"RUC","value":"1675308-1-680680 DV 34"}],
 "address":{"@type":"PostalAddress","streetAddress":"RBS Tower, 9th floor, office 902, Calle Ramón H. Jurado, Paitilla","addressLocality":"Panama City","addressCountry":"PA"},
 "geo":{"@type":"GeoCoordinates","latitude":8.98,"longitude":-79.52},
 "telephone":"+50762664242","email":"operations@crossworldagency.com",
 "openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"},
 "areaServed":["Panama","Caribbean","Latin America"],"knowsLanguage":["en","es"],
 "hasCredential":[{"@type":"EducationalOccupationalCredential","name":"ISO 9001:2015"},{"@type":"EducationalOccupationalCredential","name":"ISO 14001:2015"},{"@type":"EducationalOccupationalCredential","name":"ISO 45001:2018"},{"@type":"EducationalOccupationalCredential","name":"ISO 22000:2018"}],
 "sameAs":["https://www.linkedin.com/company/…","https://g.page/…"],
 "founder":{"@type":"Person","name":"Guillermo A. Peña","jobTitle":"Captain, Managing Director"}}
```
Por servicio: `Service` con `serviceType`, `provider` (`@id` de la org), `areaServed`, `availableChannel` (URL del formulario), `offers` sin precio. Por post: `BlogPosting` con `author` Person, `datePublished`, `dateModified`, `citation` (fuentes). Por puerto: `Place`. Todas las páginas: `BreadcrumbList`.
- `app/robots.ts`:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /keystatic
Disallow: /*?*utm_
User-agent: GPTBot
Allow: /
(idem OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Bingbot, meta-externalagent)
Sitemap: https://crossworldagency.com/sitemap.xml
```
- `app/sitemap.ts`: todas las rutas de ambos idiomas con `lastModified` real (frontmatter `updatedAt`), `alternates.languages`; sin `priority` ni `changeFrequency`.
- `llms.txt` (raíz):
```
# Cross World Agency
> Panama Canal ship agency, marine surveys, bunker surveys and claims, bunkering, ship-to-ship and maritime consulting. Licensed by the AMP and the Panama Canal Authority since 2010. ISO 9001, 14001, 45001, 22000. IMO 5785507. 24/7.
## Services
- [Ship agency & Panama Canal transit](https://crossworldagency.com/en/services/ship-agency-panama-canal-transit): …
…
## Guides
- [Panama Canal transit guide](…)
## Company
- [About](…) · [Certifications](…) · [Contact](…)
```
- **Mapa de redirecciones 301** (inventario del sitio viejo, 28-ago-2026: 7 URLs, todas 200):

| URL vieja | Nueva |
|---|---|
| `/` | `/en` (por idioma) |
| `/about/` | `/en/about` |
| `/contact/` | `/en/contact` |
| `/products/` | `/en/services` |
| `/projects/` | `/en/services` |
| `/feed/` | `/rss.xml` |
| `/comments/feed/` | `/rss.xml` |
| `/wp-content/uploads/*` | `410 Gone` (o 301 a `/en` si Search Console muestra tráfico) |
| `/wp-admin/*`, `/wp-login.php`, `/xmlrpc.php` | 410 |

En `next.config.ts` → `redirects()` (permanent) leídos de `content/shared/redirects.json`.
- OG: `/api/og?title=…&type=service` con la tipografía del sitio y la foto de la página.

---

## 8. Seguridad

- Cabeceras (en `next.config.ts` `headers()` o en `proxy.ts`): `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `Content-Security-Policy` con nonce por request (scripts propios, GTM, GA, Turnstile, Vercel; `frame-ancestors 'none'`), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- Formularios: Turnstile, rate limit, tamaño máximo de adjunto 10 MB y tipos permitidos, sanitización de texto, honeypot adicional.
- Secretos solo en Vercel (`Production`/`Preview` separados). Nunca en el repo ni en el chat.
- Keystatic: acceso por GitHub OAuth a una lista de usuarios; el repo público no expone nada sensible porque el contenido es público por diseño.
- Dependabot semanal; `npm audit` en CI.

**Variables de entorno**

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://crossworldagency.com` |
| `NEXT_PUBLIC_GTM_ID` · `NEXT_PUBLIC_GA4_ID` | analítica |
| `TURNSTILE_SITE_KEY` (pública) · `TURNSTILE_SECRET_KEY` | anti-spam |
| `RESEND_API_KEY` · `EMAIL_FROM` · `EMAIL_TO_OPERATIONS` | correo |
| `DATABASE_URL` | Neon |
| `BLOB_READ_WRITE_TOKEN` | adjuntos |
| `CRM_WEBHOOK_URL` · `CRM_WEBHOOK_SECRET` | paquete ECUS |
| `WHATSAPP_DUTY_E164` | número de guardia (público en el sitio, pero centralizado) |
| `KEYSTATIC_GITHUB_CLIENT_ID` · `KEYSTATIC_GITHUB_CLIENT_SECRET` · `KEYSTATIC_SECRET` | CMS (fase 3) |
| `GOOGLE_ADS_*` | importación offline de conversiones (script aparte, no en el sitio) |

---

## 9. CI/CD

`.github/workflows/ci.yml` en cada PR y en `main`: `npm ci` → `npm run lint` → `npm run typecheck` → `npm run build` → `npx playwright test` (contra el build) → Lighthouse CI (`lhci autorun`, presupuestos: performance ≥ 0.95, accessibility ≥ 0.95, seo = 1, LCP ≤ 2000 ms, CLS ≤ 0.05, total JS ≤ 150 KB en home). Vercel crea preview por PR; producción solo desde `main` con "Require checks to pass" en la protección de rama. Commits sin `Co-Authored-By`.

---

## 10. Pruebas

**Playwright (tests/):** home carga en EN y ES y el switch mantiene la ruta · nav en una línea a 1024 px · formulario de port call: validación de IMO inválido, paso 1→2, envío exitoso (Resend en modo test) y número de solicitud en pantalla · surveyor y fuel quote · 404 · hreflang y canonical presentes · JSON-LD parseable en 5 plantillas · enlaces internos sin 4xx · WhatsApp y teléfonos con `href` correctos · reduced motion desactiva parallax.
**Accesibilidad:** `@axe-core/playwright` en 6 plantillas, sin violaciones `serious`/`critical`; navegación por teclado del formulario; contraste verificado.
**Matriz:** Chrome, Safari (macOS/iOS), Firefox, Edge; iPhone 13/15, Pixel 7, iPad; 360, 414, 768, 1024, 1280, 1440 px.

---

## 11. Rendimiento

- Hero: `next/image` con `priority`, `sizes`, AVIF; poster < 120 KB. Fuentes con `next/font` (self-hosted, `display: swap`). Sin librerías de iconos completas (tree-shaking de Phosphor).
- Motion solo en client leaves; `StickyStack` y `Parallax` cargan con `dynamic()` y se apagan con reduced motion.
- GTM cargado `afterInteractive`; ningún otro tercero en la ruta crítica. Sin chat widgets pesados: el botón de WhatsApp es un enlace.
- Presupuestos vigilados por Lighthouse CI; Speed Insights en producción.

---

## 12. Migración y lanzamiento (runbook)

1. **T-7 días:** bajar TTL del DNS a 300 s; inventariar registros actuales (A/CNAME, MX, TXT SPF/DKIM/DMARC, verificaciones). Confirmar quién administra el correo.
2. **T-5:** agregar dominio en Vercel (`crossworldagency.com` + `www`), verificar TXT. Configurar `mail.crossworldagency.com` para Resend.
3. **T-3:** cargar redirects, revisar checklist de lanzamiento (plan §24), congelar contenido.
4. **T-1:** ensayo: `curl -I` de las 7 URLs viejas en preview con `Host` forzado; prueba de formularios en preview con correos reales.
5. **Día 0:** cambiar A/CNAME a Vercel; `www` → apex; HSTS; verificar HTTPS; enviar sitemap en GSC y Bing; publicar GBP; anuncio en LinkedIn.
6. **Día 0 a 3:** monitorear GSC (cobertura, redirecciones), Vercel (errores 4xx/5xx, logs), Speed Insights; probar el correo entrante/saliente del dominio; revisar que el WordPress viejo quede apagado tras 30 días.
7. **Día 30:** revisión de posiciones, leads, CWV; retirar el hosting viejo.

---

## 13. Monitoreo y runbook de incidentes

| Síntoma | Primer paso | Dueño |
|---|---|---|
| Sitio caído / 5xx | Vercel status y último deploy; rollback a la versión anterior con un clic | ECUS |
| Formulario no envía | Logs de la Server Action; verificar Turnstile y Resend; los leads siguen en `leads` aunque falle el correo | ECUS |
| Correos no llegan | DMARC/DKIM en Resend; carpeta de spam; reintentar desde la tabla | ECUS |
| Webhook al CRM falla | `webhook_status` en la tabla; reintento manual; el lead nunca se pierde | ECUS |
| Dominio o DNS | Registrador; TTL; registros de respaldo documentados | Cliente + ECUS |
| Caída de posiciones | GSC (cobertura, manual actions), cambios recientes, redirecciones | ECUS |

Alertas: Vercel (deploy fallido, errores), chequeo externo de uptime cada 5 minutos (UptimeRobot u otro gratuito) al `/en` y al `/es`, resumen semanal de leads sin respuesta > 4 h.
