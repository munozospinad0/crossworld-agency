# Cross World Agency · Especificación técnica v1

Complemento del [plan maestro](PLAN.md). Aquí vive lo que un desarrollador necesita para construir sin preguntar: versiones, estructura, rutas, modelo de contenido, formularios y datos, analítica, SEO, seguridad, CI, pruebas, migración y operación. **v1 (28-ago-2026):** incorpora los 25 hallazgos de la auditoría técnica (verificados contra npm y documentación oficial de Next.js, next-intl, Vercel, Cloudflare, Keystatic, Google y Resend).

---

## 1. Stack y versiones (scaffold generado el 28-ago-2026)

| Paquete | Versión | Notas |
|---|---|---|
| next | 16.3.3 | App Router, React Server Components, Turbopack por defecto (no hace falta `--turbopack`). En 16 el middleware se llama **`proxy.ts`**, los `params` son Promise, y `next/root-params` (16.3+) lee el `[locale]` en layouts y páginas. **`root-params` no funciona en Server Actions ni Route Handlers**: ahí el locale llega por FormData o por la ruta. |
| react / react-dom | 19.2.8 | |
| tailwindcss | 4.x | Configuración CSS-first con `@theme` en `app/globals.css`; plugin `@tailwindcss/postcss`. Variantes propias: `@custom-variant reduced-transparency (@media (prefers-reduced-transparency: reduce))`. |
| next-intl | 4.14.1 (peer `^16`) | Rutas `/en` y `/es`, `defineRouting` con `pathnames`, `localeDetection: false`, `alternateLinks: false`, `createNavigation`. `generateStaticParams` sigue siendo obligatorio. |
| motion | 13.1.1 | `LazyMotion` + `m` + `domAnimation` (no `motion` completo, ~34 KB gz); solo en client leaves. |
| @phosphor-icons/react | 2.1 | `weight="regular"`, `size={20}` por defecto. |
| geist | 1.7.2 | `GeistSans` y `GeistMono` vía `next/font`. |
| zod | 4.x | Validación en servidor. En Zod 4: `z.email()`, `z.iso.datetime({offset:true})` (los métodos encadenados están deprecados). |
| resend | 6.x | Email transaccional, con `Idempotency-Key`. |
| @vercel/blob | ≥ 2.3 | Adjuntos con **subida directa desde el navegador a un store Private** (ver §5.2). |
| @neondatabase/serverless | última | Tabla `leads` en **Neon (Marketplace de Vercel)**; driver HTTP para inserciones. En plan free el compute se suspende a los 5 min (primer envío del día paga ~0,5 a 1 s). |
| @keystatic/core, @keystatic/next | 5.0.x (peer `next >=14`) | Fase post-lanzamiento. Modo `github` en producción con `branchPrefix` y PR automático (ver §4). |
| @vercel/analytics, @vercel/speed-insights, @next/third-parties | última | GTM se carga con `@next/third-parties/google`. |
| Node | 22 LTS | `.nvmrc` = 22 |

Instalación reproducible: `research/_scaffold.sh` (script local, no versionado; crea el proyecto en `/tmp/cw-site` con `--ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm`).

---

## 2. Estructura del repositorio

```
app/
  [locale]/
    layout.tsx                 html lang, fuentes, nav, footer, JSON-LD Organization, Analytics; generateStaticParams; hasLocale → notFound
    page.tsx                   home
    services/page.tsx          hub (7 servicios)
    services/[slug]/page.tsx   + opengraph-image.tsx
    who-we-serve/page.tsx · who-we-serve/[slug]/page.tsx
    panama-canal-transit-guide/page.tsx
    resources/page.tsx
    ports/page.tsx · ports/[slug]/page.tsx
    about/page.tsx · certifications/page.tsx · compliance/page.tsx
    insights/page.tsx · insights/[slug]/page.tsx (+ opengraph-image.tsx)
    contact/page.tsx · request-port-call/page.tsx
    privacy/page.tsx · terms/page.tsx
    rss.xml/route.ts           un feed por idioma (/en/rss.xml, /es/rss.xml)
    [...rest]/page.tsx         catch-all → notFound() (404 traducido)
    not-found.tsx
  global-not-found.tsx         rutas fuera del matcher
  keystatic/[[...params]]/page.tsx · api/keystatic/[...params]/route.ts   (fuera de [locale])
  api/attachments/route.ts     handleUpload de @vercel/blob/client (token para subida directa)
  api/file/route.ts            sirve un adjunto privado (autenticado)
  sitemap.ts · robots.ts
  globals.css                  @theme con los tokens (--container-max: 1320px, colores, radios, sombras)
proxy.ts                       next-intl + 410 de WordPress + minúsculas
i18n/routing.ts · i18n/navigation.ts · i18n/request.ts
messages/en.json · messages/es.json          textos de interfaz (nav, botones, formularios, errores, correos)
content/
  en/services/*.mdx · es/services/*.mdx · en/ports · es/ports · en/posts · es/posts · en/audiences · es/audiences · en/cases · es/cases
  shared/{site,contact,team,certifications,partners,testimonials,redirects}.json
keystatic.config.ts
components/
  ui/            Button, Chip, Input, Select, Textarea, Field, Card, Section, Container, Prose, SkipLink
  layout/        Nav (aria-expanded), Footer, LocaleSwitch (hreflang/lang), WhatsAppButton, Breadcrumbs
  sections/      Hero (sin animación de entrada), CredentialStrip (aria-hidden en la copia, botón Pausa), ServicesBento, PortCallProcess (client, useScroll), PortsCards, Captain, Audiences, Proof, LatestInsights, FinalCta, NominateBlock (aria-live)
  forms/         PortCallForm (client, 2 pasos, submissionId, Turnstile en paso 2), SurveyorForm, FuelQuoteForm, ContactForm
  motion/        Reveal (client; solo desde la sección 3), StickyStack (client), Parallax (client, dynamic ssr:false)
lib/
  seo.ts         metadata por plantilla, alternates/hreflang desde translationOf
  schema.ts      generadores JSON-LD
  analytics.ts   LISTA CANÓNICA de eventos (tipada, exportada) + track()
  leads.ts       insertLead (idempotente), requestNumber (contador atómico), outbox
  email.ts       plantillas Resend
  content.ts     lectura de MDX/JSON tipada
  llms.ts        genera llms-full.txt en prebuild
public/
  images/        fotos (AVIF/WebP los genera next/image; en public/ solo los originales)
  fonts/         Geist-SemiBold.ttf (para opengraph-image)
  llms.txt · llms-full.txt (generado) · <indexnow-key>.txt
tests/           Playwright (+ @axe-core/playwright)
scripts/         indexnow.mjs (post-deploy), export-leads.mjs (backup semanal)
docs/            plan y página de avances (GitHub Pages)
research/        keyword research y scripts
.github/workflows/ci.yml · keystatic-automerge.yml · indexnow.yml
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
  localeDetection: false,   // Google desaconseja redirigir por idioma; Googlebot llega sin Accept-Language
  alternateLinks: false,    // hreflang solo desde generateMetadata (evita cabeceras Link duplicadas y hreflang a páginas sin traducción)
  pathnames: {
    '/': '/',
    '/services': {en: '/services', es: '/servicios'},
    '/services/[slug]': {en: '/services/[slug]', es: '/servicios/[slug]'},
    '/who-we-serve': {en: '/who-we-serve', es: '/a-quien-servimos'},
    '/who-we-serve/[slug]': {en: '/who-we-serve/[slug]', es: '/a-quien-servimos/[slug]'},
    '/panama-canal-transit-guide': {en: '/panama-canal-transit-guide', es: '/guia-transito-canal-de-panama'},
    '/resources': {en: '/resources', es: '/recursos'},
    '/ports': {en: '/ports', es: '/puertos'},
    '/ports/[slug]': {en: '/ports/[slug]', es: '/puertos/[slug]'},
    '/about': {en: '/about', es: '/nosotros'},
    '/certifications': {en: '/certifications', es: '/certificaciones'},
    '/compliance': {en: '/compliance', es: '/cumplimiento'},
    '/insights': {en: '/insights', es: '/blog'},
    '/insights/[slug]': {en: '/insights/[slug]', es: '/blog/[slug]'},
    '/contact': {en: '/contact', es: '/contacto'},
    '/request-port-call': {en: '/request-port-call', es: '/solicitar-port-call'},
    '/privacy': {en: '/privacy', es: '/privacidad'},
    '/terms': {en: '/terms', es: '/terminos'},
  },
});
```

Slugs de servicios (EN → ES): `ship-agency-panama-canal-transit` → `agencia-naviera-transito-canal-de-panama` · `marine-surveys` → `inspecciones-maritimas` · `bunker-surveys-and-claims-support` → `inspecciones-de-bunker-y-soporte-a-reclamos` · `marine-fuel-supply` → `suministro-de-combustible-marino` · `ship-to-ship-and-offshore` → `ship-to-ship-y-offshore` · `marine-claims-support` → `soporte-a-reclamos-maritimos` · `maritime-consulting-and-audits` → `consultoria-maritima-y-auditorias`. El mapa EN↔ES vive en el frontmatter de cada MDX (`translationOf`); `generateMetadata` emite `alternates.languages` con `getPathname({locale:'es', href:{pathname:'/services/[slug]', params:{slug: esSlug}}})` **solo si existe la traducción**; `x-default` apunta a la versión EN.

**Raíz `/`:** redirección fija en `next.config.ts` (`{source:'/', destination:'/en', permanent:true}`; los `redirects()` corren antes del proxy). Para hispanohablantes, un aviso discreto en cliente ("¿Prefieres español?") con `navigator.language`, sin redirigir.

`proxy.ts`:
```ts
import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';
const intl = createMiddleware(routing);
const GONE = [/^\/wp-(content|admin|includes|json)\//, /^\/xmlrpc\.php$/, /^\/wp-login\.php$/, /^\/(category|tag|author)\//, /^\/\?p=\d+/];
export default function proxy(req: NextRequest) {
  const {pathname, search} = req.nextUrl;
  if (GONE.some(r => r.test(pathname))) return new NextResponse(null, {status: 410});
  if (pathname !== pathname.toLowerCase()) return NextResponse.redirect(new URL(pathname.toLowerCase() + search, req.url), 308);
  return intl(req);
}
export const config = {matcher: ['/((?!api|keystatic|_next|_vercel|.*\\..*).*)', '/wp-content/:path*', '/wp-admin/:path*', '/wp-includes/:path*', '/wp-json/:path*', '/wp-login.php', '/xmlrpc.php']};
```

`app/[locale]/layout.tsx`: `generateStaticParams()` con los dos locales; `const {locale} = await params; if (!hasLocale(routing.locales, locale)) notFound();`. Cada `[slug]/page.tsx` tiene su `generateStaticParams` leyendo `content/{locale}/...`. `app/[locale]/[...rest]/page.tsx` llama `notFound()` para que `/en/lo-que-sea` devuelva el 404 traducido; `app/global-not-found.tsx` cubre lo que queda fuera del matcher. Next normaliza la barra final con 308: los `source` de los redirects se escriben **sin** barra final.

---

## 4. Modelo de contenido (Keystatic, post-lanzamiento; hasta entonces los mismos archivos se editan a mano)

| Colección / singleton | Campos |
|---|---|
| **site** (singleton) | name, legalName, ruc, imoCompanyNumber, foundingDate, taglineEN/ES, phones[] {label, e164, side: pacific/atlantic/office/casualty}, whatsappE164, emails[] {area, address}, address {street, floor, office, district, city, country, lat, lng}, hours ("24/7"), social {linkedin, linkedinCaptain}, acpAgencyCode, sameAs[] |
| **services** (por idioma) | title, slug, translationOf, summary, h1, metaTitle, metaDescription, heroImage, includes[], deliverables[] {name, timing}, ports[] (ref), steps[] {title, text}, why[] {title, text}, independenceNote, faq[] {q, a}, related[] (ref), cta (portcall/surveyor/fuel/attendance/contact), body (MDX), lastReviewed |
| **audiences** | title, slug, translationOf, concerns[], whatWeDo[] {serviceRef, text}, howWeWork[], documents[], cases[] (ref), cta, body |
| **ports** | name, slug, translationOf, side (pacific/atlantic), operator, terminals[], coordinates, anchorage, maxDraft, bunkerAvailable[], distanceToLocksNm, dutyPhone, attendanceNote ("boarding officer resident in Colón" / "boarding partner"), particulars (MDX), dataReviewed |
| **posts** | title, slug, translationOf, category (canal/surveys/bunker/claims/company), excerpt, cover, author (ref team), reviewer (ref team), publishedAt, updatedAt, sources[] {label, url}, faq[], body (MDX), tldr[] |
| **cases** | title, vesselType, port, problem, solution, timing, serviceRefs[], anonymized: true, approvedBy |
| **team** | name, role, photo, bioEN/ES, credentials[] {name, issuer, year, image}, linkedin |
| **certifications** | name, standard, issuer ("AQC Middle East LLC, accredited by IAS"), number, scope (textual del certificado), validFrom, validTo, image, pdf |
| **partners** | name, logo, url, permission: bool, permissionDate |
| **testimonials** | quote, name, role, company, permission: bool |
| **redirects** | from, to, status (301/308) |

Reglas: `permission=false` nunca se renderiza. `validTo` vencido muestra aviso interno y oculta la fecha. Todo MDX pasa por `remark-gfm` y un sanitizador; no se permiten scripts en contenido.

**Keystatic en producción:** rutas `app/keystatic/[[...params]]/page.tsx` (`makePage`) y `app/api/keystatic/[...params]/route.ts` (`makeRouteHandler`) fuera de `[locale]` y excluidas del matcher. `storage: {kind:'github', repo:'munozospinad0/crossworld-agency', branchPrefix:'content/'}`: el CMS escribe en ramas `content/*` y abre PR; `keystatic-automerge.yml` hace `gh pr merge --auto --squash` cuando CI pasa, así `main` sigue protegida y la publicación llega en minutos. Variables: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, **`NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`**. Los editores necesitan permiso `write` en el repo. `robots`: `Disallow: /keystatic` y `/api/keystatic`.

---

## 5. Formularios, leads y notificaciones

### 5.1 Esquemas (Zod 4, servidor)
```ts
const PortCall = z.object({
  submissionId: z.uuid(),                          // lo genera el cliente una sola vez por formulario (idempotencia)
  vesselName: z.string().min(2).max(80),
  imo: z.string().regex(/^\d{7}$/).refine(imoChecksum, 'invalid IMO'),
  vesselType: z.enum(['bulk','tanker','container','lpg','lng','general','roro','passenger','tug','barge','fishing','offshore','other']),
  flag: z.string().max(40).optional(),
  loa: z.number().positive().max(400), beam: z.number().positive().max(60), draft: z.number().positive().max(20), gt: z.number().positive().optional(),
  cargo: z.string().max(120).optional(),
  eta: z.iso.datetime({offset: true}), etaTz: z.string().default('America/Panama'),
  ports: z.array(z.enum(['balboa','cristobal','manzanillo','cct','bahia-las-minas','psa-rodman','taboguilla','melones','vacamonte','other'])).min(1),
  transit: z.enum(['none','northbound','southbound']),
  principalType: z.enum(['owner','charterer','manager','trader','pandi','insurer','lawyer','other']),
  services: z.array(z.enum(['agency','surveys','bunker_survey','fuel','sts','claims','consulting'])).min(1),
  notes: z.string().max(2000).optional(),
  attachmentPathname: z.string().startsWith('attachments/').optional(),   // subido antes, directo al Blob privado
  contactName: z.string().min(2), company: z.string().min(2), jobTitle: z.string().optional(),
  email: z.email(), phone: z.string().regex(/^\+\d{7,15}$/),
  locale: z.enum(['en','es']), consent: z.literal(true),
  attribution: z.object({utm_source: z.string().optional(), utm_medium: z.string().optional(), utm_campaign: z.string().optional(), utm_content: z.string().optional(), gclid: z.string().optional(), fbclid: z.string().optional(), referrer: z.string().optional(), landing: z.string().optional(), page: z.string()}),
  turnstileToken: z.string(),
});
```
`imoChecksum`: suma de los 6 primeros dígitos × (7..2) mod 10 = séptimo dígito.
Variantes: `SurveyorRequest` (surveyType enum del catálogo, port, date, vesselName, imo opcional, instructions, contacto) · `FuelQuote` (product: mgo/ulsd/vlsfo/other, quantityMt, port, deliveryDate, vesselName, contacto) · `AttendanceRequest` (claims: tipo, buque, puerto, instructing party, contacto) · `Contact` (name, company, email, message).

### 5.2 Adjuntos (límite real de Vercel: 4,5 MB por request; Server Actions 1 MB por defecto)
El navegador sube directo al Blob **Private** y la Server Action recibe solo el `pathname`:
```ts
// app/api/attachments/route.ts
import {handleUpload, type HandleUploadBody} from '@vercel/blob/client';
export async function POST(req: Request) {
  const body = (await req.json()) as HandleUploadBody;
  return Response.json(await handleUpload({
    body, request: req,
    onBeforeGenerateToken: async () => ({access: 'private', allowedContentTypes: ['application/pdf','image/jpeg','image/png'], maximumSizeInBytes: 10 * 1024 * 1024, addRandomSuffix: true}),
    onUploadCompleted: async () => {},
  }));
}
// cliente: const {pathname} = await upload(`attachments/${file.name}`, file, {access: 'private', handleUploadUrl: '/api/attachments'});
```
`bodySizeLimit` queda en `'1mb'`. El correo interno y el webhook reciben una URL prefirmada (máx. 7 días) o `/api/file?pathname=` autenticada que hace `get(pathname, {access: 'private'})`.

### 5.3 Flujo del Server Action `submitPortCall`
1. Validar Turnstile con `siteverify` (enviando `idempotency_key = submissionId` y `remoteip`); reintentar solo errores de red. Zod. Rate limiting con una **regla del Vercel WAF** (Pro): `POST` a `/(en|es)/(request-port-call|solicitar-port-call|contact|contacto)` → 10/h por IP, acción challenge (las Server Actions son POST a la URL de la página, así que la regla las cubre). Si hace falta a nivel de app: Upstash Redis (Marketplace) + `@upstash/ratelimit` por IP + email. (Vercel KV ya no existe.)
2. **Idempotencia:** índice único sobre `submission_id`; si ya existe, devolver el `request_number` existente (doble clic, reintento tras error de red).
3. Número de solicitud con contador atómico: `insert into request_counter (day, n) values (current_date, 1) on conflict (day) do update set n = request_counter.n + 1 returning n` → `CW-YYYYMMDD-NNN`. Si la base no responde: `CW-YYYYMMDD-` + 4 caracteres aleatorios base32 y `db_error=true` (nunca perder el lead).
4. Insertar en `leads` (estado `received`) y **responder ya** al usuario con `{ok, requestNumber, sla}`.
5. Con `after()` de `next/server`, encolar en `outbox`: confirmación al cliente (Resend, plantilla por `locale`, `Idempotency-Key = submissionId`), aviso interno a `operations@` con todos los campos y enlace `wa.me` al cliente, y el webhook al CRM. Un cron horario (Pro) reintenta lo que quede pendiente en `outbox` (3 intentos, backoff).
6. El cliente dispara `port_call_request` en GA4 con `principal_type`, `services`, `locale`.
7. En error de validación: errores por campo, `turnstile.reset()` y el token se vuelve a ejecutar en el reintento (el token vale 300 s y es de un solo uso, por eso **el widget invisible se ejecuta en el submit del paso 2**, no en el paso 1). En error de red: el cliente conserva el estado y muestra reintento con el mismo `submissionId`.

### 5.4 Tabla `leads` (Neon, Marketplace de Vercel)
```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid unique not null,
  request_number text unique not null,
  type text not null check (type in ('port_call','surveyor','fuel_quote','attendance','contact')),
  status text not null default 'received', -- received, contacted, qualified, pda_sent, nominated, served, invoiced, lost
  locale text not null,
  payload jsonb not null, attribution jsonb not null, score int default 0,
  attachment_pathname text,
  db_error boolean default false,
  first_response_at timestamptz, assigned_to text, notes text,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create index on leads (created_at desc); create index on leads (status);
create table request_counter (day date primary key, n int not null);
create table outbox (id bigserial primary key, lead_id uuid references leads(id), kind text not null, -- email_client, email_internal, webhook_crm
  attempts int default 0, last_error text, status text default 'pending', next_attempt_at timestamptz default now(), created_at timestamptz default now());
create or replace function touch_updated_at() returns trigger as $$ begin new.updated_at = now(); return new; end $$ language plpgsql;
create trigger leads_touch before update on leads for each row execute function touch_updated_at();
```
Backup: `scripts/export-leads.mjs` semanal (cron) exporta `leads` a CSV en el Blob privado (Neon free solo guarda 6 h de historial; Launch 7 días).

### 5.5 Contrato del webhook al CRM ECUS
`POST {CRM_WEBHOOK_URL}` · cabeceras `Content-Type: application/json`, `X-CW-Timestamp: {epoch}`, `X-CW-Signature: v1={HMAC_SHA256(secret, timestamp + "." + body)}`, `Idempotency-Key: {submission_id}`. El receptor rechaza si `|now - timestamp| > 300 s`, compara con `timingSafeEqual`, guarda las claves procesadas (CacheService o columna) y responde 200 a duplicados sin crear fila.
```json
{"source":"crossworldagency.com","submission_id":"…","request_number":"CW-20260915-014","type":"port_call","received_at":"2026-09-15T11:02:33Z","locale":"en",
 "contact":{"name":"…","company":"…","job_title":"…","email":"…","phone":"+30…"},
 "vessel":{"name":"…","imo":"9786543","type":"bulk","loa":229,"beam":32.2,"draft":12.8,"gt":43000,"cargo":"grain","flag":"Panama"},
 "call":{"eta":"2026-09-20T06:00:00-05:00","ports":["balboa","cristobal"],"transit":"northbound","principal_type":"owner","services":["agency","bunker_survey"],"notes":"…","attachment_url":"(prefirmada, 7 días)"},
 "attribution":{"utm_source":"google","utm_medium":"cpc","utm_campaign":"panama_services_en","gclid":"…","referrer":"…","landing":"/en/services/ship-agency-panama-canal-transit","page":"/en/request-port-call"},
 "score":85}
```
Respuesta `200 {"ok":true,"crm_id":"…"}`. Los cambios de etapa desde el dashboard vuelven por `PATCH /api/leads/{request_number}` con el mismo esquema de firma y alimentan las conversiones offline.

### 5.6 Correos (Resend; textos en `CONTENIDO-v0.md` §7)
`confirmation_en`, `confirmation_es`, `internal_alert`, `pda_followup_48h`, `review_request`. Remitente `Cross World Agency <requests@send.crossworldagency.com>` (subdominio **`send.`**, nunca `mail.`, que suele ser el host IMAP/webmail del hosting actual), reply-to `operations@crossworldagency.com` (**crear en S1 en el proveedor actual**). DNS: SPF/DKIM de Resend solo en `send.`; en el apex, `_dmarc` con `v=DMARC1; p=none; rua=mailto:…` desde T-7 y subir a `quarantine` a los 60 días (un `quarantine` el día 0 puede rebotar correo legítimo de gpena@). Prueba con seedlist (Gmail, Outlook, dominio corporativo) en T-1.
**Aviso por WhatsApp a Cross World:** decisión pendiente. Opción A (lanzamiento): el aviso interno por correo lleva botón `wa.me` al cliente; el número de guardia recibe además un SMS/push por el propio correo. Opción B (post-lanzamiento): WhatsApp Cloud API con plantilla aprobada (como en Modumon), coste y aprobación aparte.

---

## 6. Analítica y atribución

- **GTM** con `@next/third-parties/google`, cargado `afterInteractive`. **Consent Mode v2 sin servidor** (leer `x-vercel-ip-country` en el layout vuelve dinámicas las páginas), con `region`:
```js
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500,
  region:['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']});
gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
```
Banner con opt-in en esas regiones; aviso con opt-out en el resto (la Ley 81 de Panamá es de datos personales, no exige opt-in de cookies).
- **Lista canónica de eventos (`lib/analytics.ts`, tipada; PLAN §11 la referencia, no la copia):** `port_call_request`, `survey_request`, `fuel_quote_request`, `attendance_request`, `contact_submit`, `whatsapp_click`, `phone_click`, `email_click`, `profile_download`, `resource_download`, `language_switch`, `guide_read_75`, `cta_click`, `form_step`, `form_error`, `nominate_copy`. Parámetros comunes: `page_path`, `locale`, `page_type`, `service_slug`, `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, `fbclid`, `referrer`. Las etapas offline (`qualified`, `nomination`) **no** son eventos GA4: van a Google Ads.
- **Atribución de primera parte:** cookie `cw_attr` (JSON, 90 días) con utm/gclid/fbclid/referrer/landing de la primera visita; **se escribe solo cuando `analytics_storage` es `granted`**.
- **Conversiones:** en GA4, los 5 eventos de formulario. En Google Ads: etiqueta de conversión en GTM con la variable "User-Provided Data" (email y teléfono normalizados) para `port_call_request`; **Enhanced Conversions for Leads** (hash de email) como vía principal para `qualified` y `nomination`, con `gclid` como refuerzo (script diario desde `leads`, mismo patrón que `crm-ads-sync.js` de Sandra); `whatsapp_click` como conversión **secundaria**.
- **Vercel Web Analytics + Speed Insights** en `layout.tsx`. **Search Console** (propiedad de dominio por TXT) y **Bing Webmaster**: **verificar en S1 sobre el sitio actual** para exportar cobertura e impresiones antes de congelar el mapa de 301/410.

---

## 7. SEO técnico

- `generateMetadata` por plantilla: `title` (≤ 60), `description` (≤ 155), `alternates.canonical` + `alternates.languages` (en, es solo si existe, x-default = en), `alternates.types['application/rss+xml']`, `openGraph` con la imagen del segmento, `robots` (noindex en formularios y páginas de gracias).
- **Imágenes OG:** convención `opengraph-image.tsx` por segmento (`app/[locale]/services/[slug]/opengraph-image.tsx`, `insights/[slug]/…`) generada en build por slug; carga la fuente con `fetch(new URL('../../../../public/fonts/Geist-SemiBold.ttf', import.meta.url)).then(r => r.arrayBuffer())`. **Nada de `/api/og?title=`** (texto arbitrario bajo el dominio y caché ilimitada).
- **JSON-LD** (`lib/schema.ts`). Organization en el layout:
```json
{"@context":"https://schema.org","@type":["Organization","ProfessionalService"],"@id":"https://crossworldagency.com/#org",
 "name":"Cross World Agency","legalName":"Cross World Agencies, S.A.","url":"https://crossworldagency.com/","logo":"https://crossworldagency.com/images/logo.png",
 "foundingDate":"2010-03-04","taxID":"1675308-1-680680 DV 34","identifier":{"@type":"PropertyValue","propertyID":"IMO company number","value":"5785507"},
 "address":{"@type":"PostalAddress","streetAddress":"RBS Tower, 9th floor, office 902, Calle Ramón H. Jurado, Paitilla","addressLocality":"Panama City","addressCountry":"PA"},
 "geo":{"@type":"GeoCoordinates","latitude":"(confirmar)","longitude":"(confirmar)"},
 "telephone":"+50762664242","email":"operations@crossworldagency.com (confirmar)",
 "openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"},
 "areaServed":["Panama","Caribbean","Latin America"],"knowsLanguage":["en","es"],
 "hasCertification":[{"@type":"Certification","name":"ISO 9001:2015","issuedBy":{"@type":"Organization","name":"AQC Middle East LLC (accredited by IAS)"},"validFrom":"(confirmar)","expires":"(confirmar)"},{"@type":"Certification","name":"ISO 14001:2015"},{"@type":"Certification","name":"ISO 45001:2018"},{"@type":"Certification","name":"ISO 22000:2018"}],
 "sameAs":["(LinkedIn)","(GBP)"],
 "founder":{"@type":"Person","name":"Guillermo A. Peña","jobTitle":"Captain (cargo: confirmar)","hasCredential":[{"@type":"EducationalOccupationalCredential","name":"ISM Code Internal Auditor"}]}}
```
Por servicio: `Service` con `serviceType`, `provider` (`@id` de la org), `areaServed`, `availableChannel: {"@type":"ServiceChannel","serviceUrl":"https://crossworldagency.com/en/request-port-call","availableLanguage":["en","es"]}`; sin `offers`. Por post: `BlogPosting` con `author` y `reviewedBy` Person, `datePublished`, `dateModified`, `citation`. Por puerto: `Place`. `BreadcrumbList` en todas las páginas interiores (no en la home). Los `sameAs` con marcador no llegan a producción. Validación con Rich Results y el validador de schema.org en CI.
- `app/robots.ts` (**un solo grupo**; los bots con grupo propio ignorarían el `*` y podrían rastrear `/api/`; los bots de IA quedan permitidos por defecto):
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /keystatic
Disallow: /api/keystatic
Sitemap: https://crossworldagency.com/sitemap.xml
```
Sin `Disallow` de `utm_`: las URLs de anuncios se consolidan por canonical.
- `app/sitemap.ts`: todas las rutas de ambos idiomas con `lastModified` real (frontmatter `updatedAt`) y `alternates.languages`; sin `priority` ni `changeFrequency`.
- `llms.txt` (curado, en `public/`) y `llms-full.txt` **regenerado en `prebuild`** desde los MDX (`lib/llms.ts`) para que no derive.
- **RSS por idioma:** `/en/rss.xml` y `/es/rss.xml`; `/feed` y `/comments/feed` → `/en/rss.xml`.
- **IndexNow:** `public/<clave>.txt` y `indexnow.yml` (post-deploy): compara el sitemap con el deploy anterior y hace POST a `https://api.indexnow.org/indexnow` con `keyLocation`.
- **Mapa de redirecciones** (inventario del sitio viejo, 28-ago-2026: 7 URLs con 200; completar con la exportación de GSC, `site:` y Wayback antes de congelar):

| URL vieja | Nueva | Código |
|---|---|---|
| `/` | `/en` | 308 (redirect fijo en next.config) |
| `/about` (Next normaliza `/about/` → `/about` con 308 antes) | `/en/about` | 308 |
| `/contact` | `/en/contact` | 308 |
| `/products`, `/projects` | `/en/services` | 308 |
| `/feed`, `/comments/feed` | `/en/rss.xml` | 308 |
| `/wp-content/*`, `/wp-admin/*`, `/wp-includes/*`, `/wp-json/*`, `/wp-login.php`, `/xmlrpc.php`, `/category/*`, `/tag/*`, `/author/*` | (nada) | **410** desde `proxy.ts` (`redirects()` no admite 410) |

---

## 8. Seguridad

- **CSP por allowlist, sin nonce** (el nonce obliga a render dinámico en todo el sitio y contradice el prerender estático; GTM necesita `'unsafe-inline'` de todas formas). Primero dos semanas en `Content-Security-Policy-Report-Only`:
```
default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com https://va.vercel-scripts.com;
connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vitals.vercel-insights.com;
img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com; style-src 'self' 'unsafe-inline'; font-src 'self';
frame-src https://challenges.cloudflare.com https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
```
(`frame-src www.google.com` por el mapa de /contact.) Más adelante, `experimental.sri` para hashes en build sin perder SSG.
- **HSTS escalonado:** lanzamiento con la cabecera por defecto de Vercel (`max-age=63072000`, sin `includeSubDomains`); a los 30 días, tras el inventario DNS, `includeSubDomains` (solo si no hay `webmail.`/`cpanel.` en HTTP); `preload` solo tras un trimestre y con decisión explícita del cliente (es casi irreversible).
- Otras cabeceras: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- Formularios: Turnstile (claves de prueba en Playwright: `1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`), WAF rate limiting, adjuntos por Blob privado con tipo y tamaño acotados, sanitización, honeypot.
- Secretos solo en Vercel (`Production`/`Preview` separados). Nunca en el repo ni en el chat. Dependabot semanal; `npm audit` en CI.

**Variables de entorno**

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://crossworldagency.com` |
| `NEXT_PUBLIC_GTM_ID` · `NEXT_PUBLIC_GA4_ID` | analítica |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` · `TURNSTILE_SECRET_KEY` | anti-spam (la pública lleva prefijo `NEXT_PUBLIC_`) |
| `RESEND_API_KEY` · `EMAIL_FROM` · `EMAIL_TO_OPERATIONS` | correo |
| `DATABASE_URL` | Neon |
| `BLOB_READ_WRITE_TOKEN` | adjuntos (store Private) |
| `CRM_WEBHOOK_URL` · `CRM_WEBHOOK_SECRET` | paquete ECUS |
| `NEXT_PUBLIC_WHATSAPP_DUTY_E164` | número de guardia (público, centralizado) |
| `KEYSTATIC_GITHUB_CLIENT_ID` · `KEYSTATIC_GITHUB_CLIENT_SECRET` · `KEYSTATIC_SECRET` · `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | CMS (post-lanzamiento) |
| `INDEXNOW_KEY` | IndexNow (también como archivo público) |
| `GOOGLE_ADS_*` | importación de conversiones (script aparte, no en el sitio) |

---

## 9. CI/CD

`.github/workflows/ci.yml` en cada PR y en `main`: `npm ci` → `npm run lint` → `npm run typecheck` → `npm run build` (con `NEXT_PUBLIC_GTM_ID` vacío) → `npx playwright test` → Lighthouse CI (`lhci autorun`; presupuestos: performance ≥ 0.95, accessibility ≥ 0.95, seo = 1, LCP ≤ 2000 ms, CLS ≤ 0.05, **JS de primera parte ≤ 150 KB gzip en la home; los terceros (GTM+GA4, ~200 KB gz) se miden aparte con Speed Insights en producción**). Vercel: preview por PR con **"Shareable links"** (Pro) para que Irene las vea sin cuenta; producción solo desde `main` (protección de rama con checks obligatorios; el CMS entra por PR automático). Commits sin `Co-Authored-By`.

---

## 10. Pruebas

**Playwright (tests/):** home en EN y ES y el switch mantiene la ruta · nav completa en una línea a **1024 px (breakpoint `lg:`)** · formulario de port call: IMO inválido, paso 1→2, subida de adjunto al Blob (mock), envío exitoso con Turnstile de prueba y número de solicitud en pantalla, reintento con el mismo `submissionId` no duplica · surveyor, fuel quote y attendance · 404 traducido en `/en/lo-que-sea` · 410 en `/wp-login.php` · 308 en `/about` → `/en/about` · hreflang, canonical y JSON-LD parseable en 6 plantillas · enlaces internos sin 4xx · WhatsApp y teléfonos con `href` correctos · reduced motion desactiva parallax y pila.
**Accesibilidad:** `@axe-core/playwright` en 6 plantillas sin violaciones `serious`/`critical`; teclado en el formulario; contraste; skip link; marquesina con pausa y copia `aria-hidden`.
**Matriz:** Chrome, Safari (macOS/iOS), Firefox, Edge; iPhone 13/15, Pixel 7, iPad; 360, 414, 768, 1024, 1280, 1440 px.

---

## 11. Rendimiento

- **Sin animación de entrada por encima del pliegue** (hero, franja de credenciales): Chrome no cuenta como LCP un elemento con `opacity: 0`, y un reveal de 0,7 s retrasa el LCP por diseño. `Reveal` solo desde la sección 3.
- Hero: `next/image` con `priority`, `sizes="(max-width: 900px) 100vw, 46vw"`, `formats: ['image/avif','image/webp']` en `next.config.ts` (no duplicar formatos en `public/`); poster < 120 KB.
- Fuentes con `next/font` (self-hosted, `display: swap`). Phosphor con tree-shaking.
- `LazyMotion` + `m` + `domAnimation`; `StickyStack` (`useScroll` + `useTransform`, escala 1 → 0.92) y `Parallax` con `dynamic(() => import(...), {ssr: false})`, apagados con `useReducedMotion`.
- GTM `afterInteractive`; ningún otro tercero en la ruta crítica; WhatsApp es un enlace, no un widget.

---

## 12. Migración y lanzamiento (runbook)

1. **S1 (no T-7):** verificar el dominio en Search Console y Bing sobre el sitio actual; exportar cobertura e impresiones; inventario de URLs con `site:` y Wayback; crear `operations@` en el proveedor actual.
2. **T-7:** bajar TTL del DNS a 300 s; **documentar todos los registros actuales** (A/CNAME, MX, TXT SPF/DKIM/DMARC, verificaciones, `webmail.`/`cpanel.` si existen); añadir `_dmarc` con `p=none`. Confirmar quién administra el correo.
3. **T-5:** en Vercel añadir apex y `www`, **apex como primario** (Vercel redirige `www` con 308); copiar los valores A/CNAME/TXT que muestre el panel del proyecto, no los de artículos. Configurar `send.crossworldagency.com` en Resend (SPF, DKIM).
4. **T-3:** cargar redirects y la lista 410; congelar contenido; checklist de lanzamiento (plan §24).
5. **T-1:** ensayo en preview con `Host` forzado: `curl -I` de las 7 URLs viejas (308 en un salto), `/wp-login.php` (410), `/EN/Services` (308 a minúsculas); formularios con correos reales; seedlist de correo.
6. **Día 0:** cambiar A/CNAME; verificar HTTPS; enviar sitemap en GSC y Bing; disparar IndexNow; publicar GBP; anuncio en LinkedIn. `curl -I https://crossworldagency.com/` y `/about/` para confirmar 308 → `/en` y `/en/about`.
7. **Día 0 a 3:** GSC (cobertura, redirecciones), Vercel (4xx/5xx, logs), Speed Insights; correo entrante/saliente del dominio.
8. **Día 30:** posiciones, leads, CWV; `includeSubDomains` en HSTS si el inventario DNS lo permite; apagar el hosting viejo. **Día 60:** DMARC a `quarantine`.
**Plan B por escrito:** si el DNS no llega a tiempo, `preview.crossworldagency.com` (o el dominio `.vercel.app` con `noindex`) mientras no se pueda mover el apex; producción protegida con Vercel Authentication hasta el día 0.

---

## 13. Monitoreo y runbook de incidentes

| Síntoma | Primer paso | Dueño |
|---|---|---|
| Sitio caído / 5xx | Vercel status y último deploy; rollback con un clic | ECUS |
| Formulario no envía | Logs de la Server Action; Turnstile (token caducado → reset), WAF; los leads siguen en `leads` aunque falle el correo | ECUS |
| Correos no llegan | DMARC/DKIM en Resend (`send.`); spam; reintentar desde `outbox` | ECUS |
| Webhook al CRM falla | `outbox.status`; reintento por cron; el lead nunca se pierde | ECUS |
| Dominio o DNS | Registrador; TTL; registros documentados en T-7 | Cliente + ECUS |
| Caída de posiciones | GSC (cobertura, acciones manuales), cambios recientes, redirecciones | ECUS |

Alertas: Vercel (deploy fallido, errores), chequeo externo de uptime cada 5 minutos a `/en` y `/es`, resumen semanal de leads sin respuesta > 4 h y de `outbox` con fallos.
