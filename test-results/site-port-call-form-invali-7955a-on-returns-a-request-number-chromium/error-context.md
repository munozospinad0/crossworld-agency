# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> port call form: invalid IMO shows an error, valid submission returns a request number
- Location: tests/site.spec.ts:41:5

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('status')
Expected pattern: /Request CW-\d{8}-[A-Z0-9]{3,4} received/
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for getByRole('status')

```

```yaml
- link "Skip to content":
  - /url: "#content"
- navigation "Main":
  - link "Cross World Agency":
    - /url: /en
  - link "Services":
    - /url: /en/services
  - link "Canal guide":
    - /url: /en/panama-canal-transit-guide
  - link "Ports":
    - /url: /en/ports
  - link "About":
    - /url: /en/about
  - link "Contact":
    - /url: /en/contact
  - link "Request a port call":
    - /url: /en/request-port-call
  - link "Español":
    - /url: /es/solicitar-port-call
- main:
  - heading "Request a port call" [level=1]
  - paragraph: "Two steps: the vessel, then services and contact. You receive a request number on screen and a confirmation by email; the duty officer replies 24/7."
  - text: 1 Vessel 2 Services and contact
  - group "Vessel":
    - text: Vessel Vessel name
    - textbox "Vessel name" [invalid]:
      - /placeholder: MV …
    - alert: Check this field.
    - text: IMO number
    - textbox "IMO number"
    - paragraph: 7 digits; we validate the check digit.
    - text: Vessel type
    - combobox "Vessel type":
      - option "Bulk carrier" [selected]
      - option "Tanker"
      - option "Container ship"
      - option "LPG carrier"
      - option "LNG carrier"
      - option "General cargo"
      - option "RoRo / vehicle carrier"
      - option "Passenger / cruise"
      - option "Tug"
      - option "Barge"
      - option "Fishing vessel"
      - option "Offshore unit"
      - option "Other"
    - text: Flag
    - textbox "Flag"
    - text: LOA (m)
    - spinbutton "LOA (m)"
    - text: Beam (m)
    - spinbutton "Beam (m)"
    - text: Draft (m)
    - spinbutton "Draft (m)"
    - text: GT
    - spinbutton "GT"
    - text: Cargo
    - textbox "Cargo"
    - text: ETA (Panama time, UTC-5)
    - textbox "ETA (Panama time, UTC-5)" [invalid]
    - alert: Enter the ETA.
    - text: Ports
    - checkbox "Balboa (Pacific)"
    - text: Balboa (Pacific)
    - checkbox "Cristóbal (Atlantic)"
    - text: Cristóbal (Atlantic)
    - checkbox "Manzanillo (MIT)"
    - text: Manzanillo (MIT)
    - checkbox "CCT"
    - text: CCT
    - checkbox "Bahía Las Minas"
    - text: Bahía Las Minas
    - checkbox "PSA Panama (Rodman)"
    - text: PSA Panama (Rodman)
    - checkbox "Taboguilla"
    - text: Taboguilla
    - checkbox "Melones"
    - text: Melones
    - checkbox "Vacamonte"
    - text: Vacamonte
    - checkbox "Other / not sure"
    - text: Other / not sure
    - alert: Select at least one port.
    - text: Canal transit
    - combobox "Canal transit":
      - option "No transit (port call only)" [selected]
      - option "Northbound (Pacific to Atlantic)"
      - option "Southbound (Atlantic to Pacific)"
    - text: You are
    - combobox "You are":
      - option "Shipowner" [selected]
      - option "Charterer"
      - option "Ship manager"
      - option "Trader"
      - option "P&I club or correspondent"
      - option "Insurer / underwriter"
      - option "Law firm"
      - option "Other"
    - button "Continue to services"
    - text: Nothing is sent until you submit the second step.
  - complementary:
    - heading "What happens next" [level=2]
    - list:
      - listitem: You get a request number immediately and a confirmation email.
      - listitem: The duty officer reviews the particulars and prepares the PDA.
      - listitem: Same working day for standard transits, within 24 hours otherwise (to confirm).
      - listitem: Funds are called ahead of transit; the ACP requires them 48 hours before.
    - 'link "Operations 24/7: +507 6266-4242"':
      - /url: tel:+50762664242
    - link "WhatsApp duty officer":
      - /url: "#contact"
    - paragraph: "Attachments (charter party instructions, certificates): reply to the confirmation email with the files. Direct upload is coming soon."
    - paragraph: Bank details are issued only on the PDA and confirmed by phone with your duty officer. We never change bank details by email.
- contentinfo:
  - heading "Cross World Agency" [level=4]
  - paragraph: Ship agency, marine surveys, bunker and claims support at the Panama Canal. Licensed by the AMP and authorized by the Panama Canal Authority since 2010.
  - paragraph:
    - text: Cross World Agencies, S.A. · RUC 1675308-1-680680 DV 34 · IMO company number 5785507 RBS Tower, 9th floor, office 902 · Calle Ramón H. Jurado, Paitilla · Panama City
    - link "+507 6266-4242":
      - /url: tel:+50762664242
    - text: ·
    - link "+507 383-0128":
      - /url: tel:+5073830128
    - text: All times in Panama time (UTC-5, no daylight saving).
  - heading "Services" [level=4]
  - list:
    - listitem:
      - link "Ship agency & Canal transit":
        - /url: /en/services/ship-agency-panama-canal-transit
    - listitem:
      - link "Marine surveys":
        - /url: /en/services/marine-surveys
    - listitem:
      - link "Bunker surveys & claims support":
        - /url: /en/services/bunker-surveys-and-claims-support
    - listitem:
      - link "Marine fuel supply":
        - /url: /en/services/marine-fuel-supply
    - listitem:
      - link "Ship-to-ship & offshore":
        - /url: /en/services/ship-to-ship-and-offshore
    - listitem:
      - link "Marine claims support":
        - /url: /en/services/marine-claims-support
    - listitem:
      - link "Consulting & audits":
        - /url: /en/services/maritime-consulting-and-audits
  - heading "Company" [level=4]
  - list:
    - listitem:
      - link "About":
        - /url: /en/about
    - listitem:
      - link "Certifications":
        - /url: /en/certifications
    - listitem:
      - link "Compliance & KYC pack":
        - /url: /en/compliance
    - listitem:
      - link "Ports":
        - /url: /en/ports
    - listitem:
      - link "Panama Canal guide":
        - /url: /en/panama-canal-transit-guide
    - listitem:
      - link "Contact":
        - /url: /en/contact
  - heading "Nominate" [level=4]
  - list:
    - listitem:
      - link "Request a port call":
        - /url: /en/request-port-call
    - listitem:
      - link "WhatsApp duty officer (to confirm)":
        - /url: "#contact"
    - listitem:
      - link "Ethics channel":
        - /url: /en/compliance
  - text: © 2026 Cross World Agencies, S.A.. All rights reserved.
  - link "Privacy":
    - /url: /en/privacy
  - link "Standard Trading Conditions":
    - /url: /en/terms
  - text: Canal figures are referential and sourced from the Panama Canal Authority.
- alert
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | 
  4  | const BASE = process.env.BASE_URL ?? 'https://crossworld-agency-git-main-munozospinad0s-projects.vercel.app';
  5  | 
  6  | test('home EN renders hero, credentials and services', async ({page}) => {
  7  |   await page.goto(`${BASE}/en`);
  8  |   await expect(page.getByRole('heading', {level: 1})).toContainText('Ship agency and marine surveys');
  9  |   await expect(page.getByRole('region', {name: 'Credentials'})).toBeVisible();
  10 |   await expect(page.getByRole('link', {name: /Request a port call/}).first()).toBeVisible();
  11 |   const html = await page.content();
  12 |   expect(html).toContain('hreflang="es"');
  13 |   expect(html).toContain('application/ld+json');
  14 | });
  15 | 
  16 | test('locale switch keeps the route', async ({page}) => {
  17 |   await page.goto(`${BASE}/en/services`);
  18 |   await page.getByRole('link', {name: 'Español'}).first().click();
  19 |   await expect(page).toHaveURL(/\/es\/servicios$/);
  20 |   await expect(page.getByRole('heading', {level: 1})).toContainText('Servicios');
  21 | });
  22 | 
  23 | test('redirects and 410 for legacy WordPress routes', async ({request}) => {
  24 |   const root = await request.get(`${BASE}/`, {maxRedirects: 0});
  25 |   expect([301, 308]).toContain(root.status());
  26 |   const about = await request.get(`${BASE}/about`, {maxRedirects: 0});
  27 |   expect([301, 308]).toContain(about.status());
  28 |   const gone = await request.get(`${BASE}/wp-login.php`);
  29 |   expect(gone.status()).toBe(410);
  30 |   const nf = await request.get(`${BASE}/en/does-not-exist`);
  31 |   expect(nf.status()).toBe(404);
  32 | });
  33 | 
  34 | test('service pages exist in both languages', async ({page}) => {
  35 |   await page.goto(`${BASE}/en/services/ship-agency-panama-canal-transit`);
  36 |   await expect(page.getByRole('heading', {level: 1})).toContainText('Panama Canal transit agent');
  37 |   await page.goto(`${BASE}/es/servicios/agencia-naviera-transito-canal-de-panama`);
  38 |   await expect(page.getByRole('heading', {level: 1})).toContainText('Agente de tránsito');
  39 | });
  40 | 
  41 | test('port call form: invalid IMO shows an error, valid submission returns a request number', async ({page}) => {
  42 |   await page.goto(`${BASE}/en/request-port-call`);
  43 |   await page.fill('#vesselName', 'MV Playwright Test');
  44 |   await page.fill('#imo', '1234568'); // dígito de control inválido (el correcto para 123456 es 7)
  45 |   await page.fill('#eta', '2026-09-20T06:00');
  46 |   await page.check('input[name="ports"][value="balboa"]');
  47 |   await page.getByRole('button', {name: /Continue to services/}).click();
  48 |   await page.fill('#contactName', 'QA Bot');
  49 |   await page.fill('#company', 'ECUS QA');
  50 |   await page.fill('#email', 'qa@example.com');
  51 |   await page.fill('#phone', '+50760000000');
  52 |   await page.check('input[name="consent"]');
  53 |   await page.getByRole('button', {name: /Request a port call/}).click();
  54 |   await expect(page.locator('#imo-error')).toContainText('check digit');
  55 |   // IMO válido (9074729 = Maersk Sealand ejemplo con checksum correcto)
  56 |   await page.fill('#imo', '9074729');
  57 |   await page.getByRole('button', {name: /Continue to services/}).click();
  58 |   await page.getByRole('button', {name: /Request a port call/}).click();
> 59 |   await expect(page.getByRole('status')).toContainText(/Request CW-\d{8}-[A-Z0-9]{3,4} received/);
     |                                          ^ Error: expect(locator).toContainText(expected) failed
  60 | });
  61 | 
  62 | test('accessibility: no serious or critical violations on key templates', async ({page}) => {
  63 |   for (const path of ['/en', '/en/services/marine-surveys', '/en/panama-canal-transit-guide', '/en/contact', '/en/request-port-call']) {
  64 |     await page.goto(`${BASE}${path}`);
  65 |     const results = await new AxeBuilder({page}).analyze();
  66 |     const bad = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  67 |     expect(bad, `${path}: ${bad.map((b) => b.id).join(', ')}`).toEqual([]);
  68 |   }
  69 | });
  70 | 
```