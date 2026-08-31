# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> accessibility: no serious or critical violations on key templates
- Location: tests/site.spec.ts:62:5

# Error details

```
Error: /en/contact: link-in-text-block

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 70

- Array []
+ Array [
+   Object {
+     "description": "Ensure links are distinguished from surrounding text in a way that does not rely on color",
+     "help": "Links must be distinguishable without relying on color",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/link-in-text-block?application=playwright",
+     "id": "link-in-text-block",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "contrastRatio": 1.38,
+               "messageKey": "fgContrast",
+               "nodeColor": "#173fae",
+               "parentColor": "#2b3640",
+               "requiredContrastRatio": 3,
+             },
+             "id": "link-in-text-block",
+             "impact": "serious",
+             "message": "The link has insufficient color contrast of 1.38:1 with the surrounding text. (Minimum contrast is 3:1, link text: #173fae, surrounding text: #2b3640)",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"mt-2 font-mono text-[0.9rem] leading-relaxed\">Operations 24/7<!-- -->: <a class=\"text-accent-ink\" href=\"tel:+50762664242\">+507 6266-4242</a><br>24/7, all year</div>",
+                 "target": Array [
+                   ".p-5.rounded-card.bg-surface:nth-child(1) > .leading-relaxed.mt-2.text-\\[0\\.9rem\\]",
+                 ],
+               },
+             ],
+           },
+           Object {
+             "data": null,
+             "id": "link-in-text-block-style",
+             "impact": "serious",
+             "message": "The link has no styling (such as underline) to distinguish it from the surrounding text",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"mt-2 font-mono text-[0.9rem] leading-relaxed\">Operations 24/7<!-- -->: <a class=\"text-accent-ink\" href=\"tel:+50762664242\">+507 6266-4242</a><br>24/7, all year</div>",
+                 "target": Array [
+                   ".p-5.rounded-card.bg-surface:nth-child(1) > .leading-relaxed.mt-2.text-\\[0\\.9rem\\]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   The link has insufficient color contrast of 1.38:1 with the surrounding text. (Minimum contrast is 3:1, link text: #173fae, surrounding text: #2b3640)
+   The link has no styling (such as underline) to distinguish it from the surrounding text",
+         "html": "<a class=\"text-accent-ink\" href=\"tel:+50762664242\">+507 6266-4242</a>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".text-accent-ink[href=\"tel:+50762664242\"]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2a",
+       "wcag141",
+       "TTv5",
+       "TT13.a",
+       "EN-301-549",
+       "EN-9.1.4.1",
+       "RGAAv4",
+       "RGAA-10.6.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - link "Skip to content" [ref=f3e2] [cursor=pointer]:
    - /url: "#content"
  - navigation "Main" [ref=f3e3]:
    - generic [ref=f3e4]:
      - link "Cross World Agency" [ref=f3e5] [cursor=pointer]:
        - /url: /en
        - generic [ref=f3e6]: CW
        - text: Cross World Agency
      - generic [ref=f3e7]:
        - link "Services" [ref=f3e8] [cursor=pointer]:
          - /url: /en/services
        - link "Canal guide" [ref=f3e9] [cursor=pointer]:
          - /url: /en/panama-canal-transit-guide
        - link "Ports" [ref=f3e10] [cursor=pointer]:
          - /url: /en/ports
        - link "About" [ref=f3e11] [cursor=pointer]:
          - /url: /en/about
        - link "Contact" [ref=f3e12] [cursor=pointer]:
          - /url: /en/contact
        - link "Request a port call" [ref=f3e13] [cursor=pointer]:
          - /url: /en/request-port-call
        - link "Español" [ref=f3e14] [cursor=pointer]:
          - /url: /es/contacto
  - main [ref=f3e15]:
    - generic [ref=f3e17]:
      - heading "Contact the duty officer" [level=1] [ref=f3e18]
      - paragraph [ref=f3e19]: The duty officer answers 24/7. For a transit or port call, use the request form so we can issue a PDA with a request number.
    - generic [ref=f3e21]:
      - generic [ref=f3e22]:
        - generic [ref=f3e23]:
          - generic [ref=f3e24]:
            - heading "Pacific side · Balboa" [level=2] [ref=f3e25]
            - generic [ref=f3e26]:
              - text: "Operations 24/7:"
              - link "+507 6266-4242" [ref=f3e27] [cursor=pointer]:
                - /url: tel:+50762664242
              - text: 24/7, all year
          - generic [ref=f3e28]:
            - heading "Atlantic side · Cristóbal" [level=2] [ref=f3e29]
            - generic [ref=f3e30]: +507 (to confirm)Boarding officer resident in Colón or boarding partner (to confirm)
          - generic [ref=f3e31]:
            - heading "Office" [level=2] [ref=f3e32]
            - generic [ref=f3e33]:
              - link "+507 383-0128" [ref=f3e34] [cursor=pointer]:
                - /url: tel:+5073830128
              - text: "Email:"
              - link "gpena@crossworldagency.com" [ref=f3e35] [cursor=pointer]:
                - /url: mailto:gpena@crossworldagency.com
              - text: (to confirm)
          - generic [ref=f3e36]:
            - heading "Address" [level=2] [ref=f3e37]
            - generic [ref=f3e38]: Cross World Agencies, S.A.RBS Tower, 9th floor, office 902Calle Ramón H. Jurado, PaitillaPanama City, PanamaAll times in Panama time (UTC-5, no daylight saving).
        - paragraph [ref=f3e39]: "Ethics channel: address to confirm."
      - complementary [ref=f3e40]:
        - generic [ref=f3e41]:
          - paragraph [ref=f3e42]: "Transit or port call? Use the request form: you get a request number and an itemized PDA."
          - generic [ref=f3e43]:
            - link "Request a port call" [ref=f3e44] [cursor=pointer]:
              - /url: /en/request-port-call
            - link "WhatsApp duty officer" [ref=f3e45] [cursor=pointer]:
              - /url: "#contact"
        - paragraph [ref=f3e46]: Bank details are issued only on the PDA and confirmed by phone with your duty officer. We never change bank details by email.
  - contentinfo [ref=f3e47]:
    - generic [ref=f3e48]:
      - generic [ref=f3e49]:
        - heading "Cross World Agency" [level=4] [ref=f3e50]
        - paragraph [ref=f3e51]: Ship agency, marine surveys, bunker and claims support at the Panama Canal. Licensed by the AMP and authorized by the Panama Canal Authority since 2010.
        - paragraph [ref=f3e52]:
          - text: Cross World Agencies, S.A. · RUC 1675308-1-680680 DV 34 · IMO company number 5785507RBS Tower, 9th floor, office 902 · Calle Ramón H. Jurado, Paitilla · Panama City
          - link "+507 6266-4242" [ref=f3e53] [cursor=pointer]:
            - /url: tel:+50762664242
          - text: ·
          - link "+507 383-0128" [ref=f3e54] [cursor=pointer]:
            - /url: tel:+5073830128
          - text: All times in Panama time (UTC-5, no daylight saving).
      - generic [ref=f3e55]:
        - heading "Services" [level=4] [ref=f3e56]
        - list [ref=f3e57]:
          - listitem [ref=f3e58]:
            - link "Ship agency & Canal transit" [ref=f3e59] [cursor=pointer]:
              - /url: /en/services/ship-agency-panama-canal-transit
          - listitem [ref=f3e60]:
            - link "Marine surveys" [ref=f3e61] [cursor=pointer]:
              - /url: /en/services/marine-surveys
          - listitem [ref=f3e62]:
            - link "Bunker surveys & claims support" [ref=f3e63] [cursor=pointer]:
              - /url: /en/services/bunker-surveys-and-claims-support
          - listitem [ref=f3e64]:
            - link "Marine fuel supply" [ref=f3e65] [cursor=pointer]:
              - /url: /en/services/marine-fuel-supply
          - listitem [ref=f3e66]:
            - link "Ship-to-ship & offshore" [ref=f3e67] [cursor=pointer]:
              - /url: /en/services/ship-to-ship-and-offshore
          - listitem [ref=f3e68]:
            - link "Marine claims support" [ref=f3e69] [cursor=pointer]:
              - /url: /en/services/marine-claims-support
          - listitem [ref=f3e70]:
            - link "Consulting & audits" [ref=f3e71] [cursor=pointer]:
              - /url: /en/services/maritime-consulting-and-audits
      - generic [ref=f3e72]:
        - heading "Company" [level=4] [ref=f3e73]
        - list [ref=f3e74]:
          - listitem [ref=f3e75]:
            - link "About" [ref=f3e76] [cursor=pointer]:
              - /url: /en/about
          - listitem [ref=f3e77]:
            - link "Certifications" [ref=f3e78] [cursor=pointer]:
              - /url: /en/certifications
          - listitem [ref=f3e79]:
            - link "Compliance & KYC pack" [ref=f3e80] [cursor=pointer]:
              - /url: /en/compliance
          - listitem [ref=f3e81]:
            - link "Ports" [ref=f3e82] [cursor=pointer]:
              - /url: /en/ports
          - listitem [ref=f3e83]:
            - link "Panama Canal guide" [ref=f3e84] [cursor=pointer]:
              - /url: /en/panama-canal-transit-guide
          - listitem [ref=f3e85]:
            - link "Contact" [ref=f3e86] [cursor=pointer]:
              - /url: /en/contact
      - generic [ref=f3e87]:
        - heading "Nominate" [level=4] [ref=f3e88]
        - list [ref=f3e89]:
          - listitem [ref=f3e90]:
            - link "Request a port call" [ref=f3e91] [cursor=pointer]:
              - /url: /en/request-port-call
          - listitem [ref=f3e92]:
            - link "WhatsApp duty officer (to confirm)" [ref=f3e93] [cursor=pointer]:
              - /url: "#contact"
          - listitem [ref=f3e94]:
            - link "Ethics channel" [ref=f3e95] [cursor=pointer]:
              - /url: /en/compliance
    - generic [ref=f3e96]:
      - generic [ref=f3e97]: © 2026 Cross World Agencies, S.A.. All rights reserved.
      - link "Privacy" [ref=f3e98] [cursor=pointer]:
        - /url: /en/privacy
      - link "Standard Trading Conditions" [ref=f3e99] [cursor=pointer]:
        - /url: /en/terms
      - generic [ref=f3e100]: Canal figures are referential and sourced from the Panama Canal Authority.
  - alert [ref=f3e101]
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
  59 |   await expect(page.getByRole('status')).toContainText(/Request CW-\d{8}-[A-Z0-9]{3,4} received/, {timeout: 25_000});
  60 | });
  61 | 
  62 | test('accessibility: no serious or critical violations on key templates', async ({page}) => {
  63 |   for (const path of ['/en', '/en/services/marine-surveys', '/en/panama-canal-transit-guide', '/en/contact', '/en/request-port-call']) {
  64 |     await page.goto(`${BASE}${path}`);
  65 |     const results = await new AxeBuilder({page}).analyze();
  66 |     const bad = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
> 67 |     expect(bad, `${path}: ${bad.map((b) => b.id).join(', ')}`).toEqual([]);
     |                                                                ^ Error: /en/contact: link-in-text-block
  68 |   }
  69 | });
  70 | 
```