# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> accessibility: no serious or critical violations on key templates
- Location: tests/site.spec.ts:62:5

# Error details

```
Error: /en: color-contrast

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 58

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0b1420",
+               "contrastRatio": 1.08,
+               "expectedContrastRatio": "3:1",
+               "fgColor": "#141c28",
+               "fontSize": "134.4pt (179.2px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.08 (foreground color: #141c28, background color: #0b1420, font size: 134.4pt (179.2px), font weight: normal). Expected contrast ratio of 3:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<footer class=\"relative overflow-hidden border-t border-white/10 bg-ink pt-16 pb-28 text-[0.92rem] text-on-dark-muted\">",
+                 "target": Array [
+                   "footer",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.08 (foreground color: #141c28, background color: #0b1420, font size: 134.4pt (179.2px), font weight: normal). Expected contrast ratio of 3:1",
+         "html": "<div aria-hidden=\"true\" class=\"pointer-events-none absolute -bottom-6 left-0 font-brand text-[clamp(4rem,14vw,12rem)] leading-none font-semibold tracking-[0.06em] whitespace-nowrap text-white/[0.035] select-none\">CROSS WORLD</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".-bottom-6",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#content"
  - banner:
    - navigation "Main" [ref=e3]:
      - link "Cross World Agency" [ref=e4] [cursor=pointer]:
        - /url: /en
        - generic [ref=e12]: CROSS WORLD AGENCY
      - generic [ref=e13]:
        - link "Services" [ref=e14] [cursor=pointer]:
          - /url: /en/services
        - link "Canal guide" [ref=e15] [cursor=pointer]:
          - /url: /en/panama-canal-transit-guide
        - link "Ports" [ref=e16] [cursor=pointer]:
          - /url: /en/ports
        - link "About" [ref=e17] [cursor=pointer]:
          - /url: /en/about
        - link "Contact" [ref=e18] [cursor=pointer]:
          - /url: /en/contact
        - link "Español" [ref=e19] [cursor=pointer]:
          - /url: /es
        - link "Request a port call" [ref=e20] [cursor=pointer]:
          - /url: /en/request-port-call
  - main [ref=e24]:
    - generic [ref=e25]:
      - img "Vessel entering the locks of the Panama Canal, seen from the deck" [ref=e27]
      - generic [ref=e30]:
        - generic [ref=e31]:
          - paragraph [ref=e32]: AMP · ACP · IMO 5785507 · 2010
          - heading "Ship agency and marine surveys at the Panama Canal." [level=1] [ref=e34]
          - paragraph [ref=e35]: Licensed by the Panama Maritime Authority and authorized by the Panama Canal Authority since 2010. One team for the port call. Independent surveyors for the evidence. 24/7.
          - generic [ref=e36]:
            - link "Request a port call" [ref=e37] [cursor=pointer]:
              - /url: /en/request-port-call
            - link "WhatsApp duty officer" [ref=e42] [cursor=pointer]:
              - /url: "#contact"
        - paragraph [ref=e54]: Balboa · Cristóbal · 24/7 · UTC-5
    - region "Credentials" [ref=e55]:
      - list [ref=e56]:
        - listitem [ref=e57]: AMP-licensed ship agency
        - listitem [ref=e58]: Authorized by the Panama Canal Authority
        - listitem [ref=e59]: IMO company number 5785507
        - listitem [ref=e60]: ISO 9001:2015
        - listitem [ref=e61]: ISO 14001:2015
        - listitem [ref=e62]: ISO 45001:2018
        - listitem [ref=e63]: Since 2010
        - listitem [ref=e64]: Balboa and Cristóbal
        - listitem [ref=e65]: AMP-licensed ship agency
        - listitem [ref=e66]: Authorized by the Panama Canal Authority
        - listitem [ref=e67]: IMO company number 5785507
        - listitem [ref=e68]: ISO 9001:2015
        - listitem [ref=e69]: ISO 14001:2015
        - listitem [ref=e70]: ISO 45001:2018
        - listitem [ref=e71]: Since 2010
        - listitem [ref=e72]: Balboa and Cristóbal
      - button "Pause" [ref=e73]
    - generic [ref=e75]:
      - generic [ref=e76]:
        - heading "What we do at both ends of the Canal" [level=2] [ref=e77]
        - paragraph [ref=e78]: Seven services, one accountable team for the port call, and independent surveyors for the evidence. Nominate us for the transit; the survey and the fuel are the same phone call.
      - generic [ref=e79]:
        - link "01 Ship agency & Canal transit Nomination to FDA, both sides of the Canal. Learn more" [ref=e81] [cursor=pointer]:
          - /url: /en/services/ship-agency-panama-canal-transit
          - generic [ref=e83]: "01"
          - heading "Ship agency & Canal transit" [level=3] [ref=e84]
          - paragraph [ref=e85]: Nomination to FDA, both sides of the Canal.
          - generic [ref=e86]: Learn more
        - link "02 Marine surveys Independent surveys, reported in the format underwriters and P&I clubs expect. Learn more" [ref=e91] [cursor=pointer]:
          - /url: /en/services/marine-surveys
          - generic [ref=e95]: "02"
          - heading "Marine surveys" [level=3] [ref=e96]
          - paragraph [ref=e97]: Independent surveys, reported in the format underwriters and P&I clubs expect.
          - generic [ref=e98]: Learn more
        - link "03 Bunker surveys & claims support We measure, sample and document so the claim stands on evidence. Learn more" [ref=e103] [cursor=pointer]:
          - /url: /en/services/bunker-surveys-and-claims-support
          - generic [ref=e105]: "03"
          - heading "Bunker surveys & claims support" [level=3] [ref=e106]
          - paragraph [ref=e107]: We measure, sample and document so the claim stands on evidence.
          - generic [ref=e108]: Learn more
        - link "04 Marine fuel supply MGO and ULSD arranged in Panama, CIF or FOB, quantity verified by an independent surveyor. Learn more" [ref=e113] [cursor=pointer]:
          - /url: /en/services/marine-fuel-supply
          - generic [ref=e117]: "04"
          - heading "Marine fuel supply" [level=3] [ref=e118]
          - paragraph [ref=e119]: MGO and ULSD arranged in Panama, CIF or FOB, quantity verified by an independent surveyor.
          - generic [ref=e120]: Learn more
        - link "05 Ship-to-ship & offshore STS and terminal operations planned, attended and documented. Learn more" [ref=e125] [cursor=pointer]:
          - /url: /en/services/ship-to-ship-and-offshore
          - generic [ref=e127]: "05"
          - heading "Ship-to-ship & offshore" [level=3] [ref=e128]
          - paragraph [ref=e129]: STS and terminal operations planned, attended and documented.
          - generic [ref=e130]: Learn more
        - link "06 Marine claims support Attendance and evidence preserved in the first 24 hours, under your club's instructions. Learn more" [ref=e135] [cursor=pointer]:
          - /url: /en/services/marine-claims-support
          - generic [ref=e139]: "06"
          - heading "Marine claims support" [level=3] [ref=e140]
          - paragraph [ref=e141]: Attendance and evidence preserved in the first 24 hours, under your club's instructions.
          - generic [ref=e142]: Learn more
        - link "07 Consulting & audits ISM preparation, projects and advice from a working captain. Learn more" [ref=e147] [cursor=pointer]:
          - /url: /en/services/maritime-consulting-and-audits
          - generic [ref=e151]: "07"
          - heading "Consulting & audits" [level=3] [ref=e152]
          - paragraph [ref=e153]: ISM preparation, projects and advice from a working captain.
          - generic [ref=e154]: Learn more
    - generic [ref=e160]:
      - generic [ref=e161]:
        - generic [ref=e162]: "2010"
        - paragraph [ref=e163]: Licensed by the AMP and authorized by the ACP since
      - generic [ref=e164]:
        - generic [ref=e165]: "3"
        - paragraph [ref=e166]: ISO certifications shown with issuer and scope (9001, 14001, 45001)
      - generic [ref=e167]:
        - generic [ref=e168]: "2"
        - paragraph [ref=e169]: "Sides of the Canal with duty attendance: Balboa and Cristóbal"
      - generic [ref=e170]:
        - generic [ref=e171]: 24/7
        - paragraph [ref=e172]: A duty officer answers, all year, in English and Spanish
    - generic [ref=e174]:
      - generic [ref=e175]:
        - heading "How a port call works with us" [level=2] [ref=e176]
        - paragraph [ref=e177]: Four steps, each with what you receive and when.
      - list [ref=e178]:
        - listitem [ref=e179]:
          - generic [ref=e181]:
            - generic [ref=e182]:
              - generic [ref=e183]: "1"
              - generic [ref=e184]: Step
            - generic [ref=e185]:
              - heading "Nomination" [level=3] [ref=e186]
              - paragraph [ref=e187]: Send vessel particulars, ETA and the services you need. We confirm receipt with a request number and the duty officer takes it from there.
            - generic [ref=e188]: Immediately
        - listitem [ref=e189]:
          - generic [ref=e191]:
            - generic [ref=e192]:
              - generic [ref=e193]: "2"
              - generic [ref=e194]: Step
            - generic [ref=e195]:
              - heading "Proforma disbursement account" [level=3] [ref=e196]
              - paragraph [ref=e197]: Canal tolls, reservation fee, fixed tariff, pilotage, tugs, linehandlers and every third-party cost itemized, with the agency fee as one line.
            - generic [ref=e198]: Same working day (to confirm)
        - listitem [ref=e199]:
          - generic [ref=e201]:
            - generic [ref=e202]:
              - generic [ref=e203]: "3"
              - generic [ref=e204]: Step
            - generic [ref=e205]:
              - heading "Boarding and transit" [level=3] [ref=e206]
              - paragraph [ref=e207]: Our officer boards at the anchorage and coordinates the Authority, pilots, tugs, linehandlers, crew changes and supplies. One WhatsApp thread, one daily update.
            - generic [ref=e208]: Throughout the call
        - listitem [ref=e209]:
          - generic [ref=e211]:
            - generic [ref=e212]:
              - generic [ref=e213]: "4"
              - generic [ref=e214]: Step
            - generic [ref=e215]:
              - heading "Final disbursement account" [level=3] [ref=e216]
              - paragraph [ref=e217]: Reconciled line by line against the PDA, every third-party charge with its voucher, variances explained. If a survey came up during the call, its report travels with it.
            - generic [ref=e218]: Within 30 days (to confirm)
    - generic [ref=e220]:
      - generic [ref=e221]:
        - heading "Both sides of the Canal" [level=2] [ref=e222]
        - paragraph [ref=e223]: Duty officers on the Pacific and the Atlantic side, and the Panamanian ports we serve.
      - img [ref=e225]:
        - generic [ref=e228]: Balboa
        - generic [ref=e231]: Miraflores
        - generic [ref=e234]: Pedro Miguel
        - generic [ref=e237]: Gatún
        - generic [ref=e240]: Cristóbal
      - generic [ref=e243]:
        - generic [ref=e245]:
          - heading "Port of Balboa Pacific" [level=3] [ref=e246]:
            - text: Port of Balboa
            - generic [ref=e247]: Pacific
          - generic [ref=e248]:
            - generic [ref=e249]:
              - term [ref=e250]: Operator
              - definition [ref=e251]: Panama Ports Company
            - generic [ref=e252]:
              - term [ref=e253]: Anchorage
              - definition [ref=e254]: Pacific anchorage
            - generic [ref=e255]:
              - term [ref=e256]: Bunker
              - definition [ref=e257]: MGO, VLSFO by barge
            - generic [ref=e258]:
              - term [ref=e259]: To the locks
              - definition [ref=e260]: Miraflores
            - generic [ref=e261]:
              - term [ref=e262]: Duty officer
              - definition [ref=e263]: +507 6266-4242
        - generic [ref=e265]:
          - heading "Port of Cristóbal Atlantic" [level=3] [ref=e266]:
            - text: Port of Cristóbal
            - generic [ref=e267]: Atlantic
          - generic [ref=e268]:
            - generic [ref=e269]:
              - term [ref=e270]: Operator
              - definition [ref=e271]: Panama Ports Company
            - generic [ref=e272]:
              - term [ref=e273]: Anchorage
              - definition [ref=e274]: Cristóbal anchorage
            - generic [ref=e275]:
              - term [ref=e276]: Bunker
              - definition [ref=e277]: MGO, VLSFO by barge
            - generic [ref=e278]:
              - term [ref=e279]: To the locks
              - definition [ref=e280]: Gatún / Agua Clara
            - generic [ref=e281]:
              - term [ref=e282]: Attendance
              - definition [ref=e283]: +507 (to confirm) · boarding officer resident in Colón or boarding partner (to confirm)
      - generic [ref=e284]:
        - generic [ref=e285]: Manzanillo (MIT)
        - generic [ref=e286]: CCT
        - generic [ref=e287]: Bahía Las Minas
        - generic [ref=e288]: PSA Panama (Rodman)
        - generic [ref=e289]: Taboguilla · Melones
        - generic [ref=e290]: Vacamonte
        - generic [ref=e291]: Sample port data; only the ports we actually serve will be published.
    - generic [ref=e293]:
      - generic [ref=e295]:
        - img "Guillermo A. Peña, Cross World Agency, Panama City" [ref=e296]
        - generic [ref=e297]:
          - generic [ref=e298]: CAPT. GUILLERMO A. PEÑA
          - generic [ref=e299]: ISM Code Internal Auditor
      - generic [ref=e300]:
        - heading "A captain answers the phone." [level=2] [ref=e301]
        - paragraph [ref=e302]: Captain Guillermo A. Peña has commanded and inspected vessels for (years to confirm). He holds the ISM Code Internal Auditor credential, trained at the Seafarers Training Center and Maersk Training Centre, and reviews every survey report that leaves this office.
        - blockquote [ref=e303]: “When you call at three in the morning, you speak with someone who has stood a bridge watch.”
        - generic [ref=e304]:
          - generic [ref=e305]: ISM Code Internal Auditor · ABSG Consulting
          - generic [ref=e306]: Seafarers Training Center
          - generic [ref=e307]: Maersk Training Centre
          - generic [ref=e308]: NFPA · Texas Engineering Extension Service
        - link "About Cross World" [ref=e310] [cursor=pointer]:
          - /url: /en/about
    - generic [ref=e316]:
      - generic [ref=e317]:
        - heading "Who we serve" [level=2] [ref=e318]
        - paragraph [ref=e319]: Different principals, different worries. Tell us who you are and we tell you how we work with you.
      - generic [ref=e320]:
        - link "Shipowners & managers Transit agency, husbandry and surveys with one accountable officer." [ref=e322] [cursor=pointer]:
          - /url: /en/contact
          - generic [ref=e324]:
            - heading "Shipowners & managers" [level=3] [ref=e325]
            - paragraph [ref=e326]: Transit agency, husbandry and surveys with one accountable officer.
        - link "Charterers & traders Bunker quantity, STS attendance and protective agency." [ref=e328] [cursor=pointer]:
          - /url: /en/contact
          - generic [ref=e330]:
            - heading "Charterers & traders" [level=3] [ref=e331]
            - paragraph [ref=e332]: Bunker quantity, STS attendance and protective agency.
        - link "P&I correspondents & insurers Condition surveys, claims attendance and evidence preserved." [ref=e334] [cursor=pointer]:
          - /url: /en/contact
          - generic [ref=e336]:
            - heading "P&I correspondents & insurers" [level=3] [ref=e337]
            - paragraph [ref=e338]: Condition surveys, claims attendance and evidence preserved.
        - link "Fishing fleets & regional operators Fuel supply and agency in Spanish, on WhatsApp." [ref=e340] [cursor=pointer]:
          - /url: /en/contact
          - generic [ref=e342]:
            - heading "Fishing fleets & regional operators" [level=3] [ref=e343]
            - paragraph [ref=e344]: Fuel supply and agency in Spanish, on WhatsApp.
    - generic [ref=e346]:
      - generic [ref=e347]:
        - generic [ref=e348]: “
        - paragraph [ref=e349]: The surveyor was on board at Cristóbal the same day, and the report closed the dispute.
        - paragraph [ref=e350]: SampleSample testimonial. Real quotes are published only with written permission.
      - generic [ref=e351]:
        - generic [ref=e352]: Partners and representation
        - list [ref=e353]:
          - listitem [ref=e354]: Andrew Moore & Associates
          - listitem [ref=e355]: Sabatino Pizzolante
          - listitem [ref=e356]: Victoria Corporation
          - listitem [ref=e357]: EcoGreen
          - listitem [ref=e358]: White Glacier
        - paragraph [ref=e359]: Panama · Venezuela · Brazil · Aruba · Greece
    - generic [ref=e361]:
      - generic [ref=e362]:
        - heading "Your next Panama call, handled." [level=2] [ref=e372]
        - paragraph [ref=e373]: Send the vessel particulars and ETA. You get a request number now and an itemized PDA from the duty officer.
        - generic [ref=e374]:
          - link "Request a port call" [ref=e375] [cursor=pointer]:
            - /url: /en/request-port-call
          - link "WhatsApp duty officer" [ref=e380] [cursor=pointer]:
            - /url: "#contact"
      - generic [ref=e383]:
        - button "Copy" [ref=e384]
        - heading "Nominate Cross World" [level=3] [ref=e385]
        - generic [ref=e386]:
          - generic [ref=e387]: "Cross World Agencies, S.A. (brand: Cross World Agency)"
          - generic [ref=e388]: RUC 1675308-1-680680 DV 34 · IMO company number 5785507
          - generic [ref=e389]: "AMP-licensed ship agency, authorized by the Panama Canal Authority (agency code: (to confirm))"
          - generic [ref=e390]: RBS Tower, 9th floor, office 902, Calle Ramón H. Jurado, Paitilla, Panama City, Panama
          - generic [ref=e391]: gpena@crossworldagency.com (to confirm)
          - generic [ref=e392]: +507 6266-4242 · +507 383-0128
        - paragraph [ref=e393]: Paste this block in your nomination message to the charterer or the Authority. Bank details are issued only on the PDA and confirmed by phone with your duty officer. We never change bank details by email.
  - contentinfo [ref=e394]:
    - generic: CROSS WORLD
    - generic [ref=e395]:
      - generic [ref=e396]:
        - generic [ref=e397]: CROSS WORLD AGENCY
        - paragraph [ref=e406]: Ship agency, marine surveys, bunker and claims support at the Panama Canal. Licensed by the AMP and authorized by the Panama Canal Authority since 2010.
        - paragraph [ref=e416]:
          - text: Cross World Agencies, S.A. · RUC 1675308-1-680680 DV 34IMO company number 5785507RBS Tower, 9th floor, office 902 · Calle Ramón H. Jurado, PaitillaPanama City, Panama
          - link "+507 6266-4242" [ref=e417] [cursor=pointer]:
            - /url: tel:+50762664242
          - text: ·
          - link "+507 383-0128" [ref=e418] [cursor=pointer]:
            - /url: tel:+5073830128
          - text: All times in Panama time (UTC-5, no daylight saving).
      - generic [ref=e419]:
        - heading "Services" [level=4] [ref=e420]
        - list [ref=e421]:
          - listitem [ref=e422]:
            - link "Ship agency & Canal transit" [ref=e423] [cursor=pointer]:
              - /url: /en/services/ship-agency-panama-canal-transit
          - listitem [ref=e424]:
            - link "Marine surveys" [ref=e425] [cursor=pointer]:
              - /url: /en/services/marine-surveys
          - listitem [ref=e426]:
            - link "Bunker surveys & claims support" [ref=e427] [cursor=pointer]:
              - /url: /en/services/bunker-surveys-and-claims-support
          - listitem [ref=e428]:
            - link "Marine fuel supply" [ref=e429] [cursor=pointer]:
              - /url: /en/services/marine-fuel-supply
          - listitem [ref=e430]:
            - link "Ship-to-ship & offshore" [ref=e431] [cursor=pointer]:
              - /url: /en/services/ship-to-ship-and-offshore
          - listitem [ref=e432]:
            - link "Marine claims support" [ref=e433] [cursor=pointer]:
              - /url: /en/services/marine-claims-support
          - listitem [ref=e434]:
            - link "Consulting & audits" [ref=e435] [cursor=pointer]:
              - /url: /en/services/maritime-consulting-and-audits
      - generic [ref=e436]:
        - heading "Company" [level=4] [ref=e437]
        - list [ref=e438]:
          - listitem [ref=e439]:
            - link "About" [ref=e440] [cursor=pointer]:
              - /url: /en/about
          - listitem [ref=e441]:
            - link "Certifications" [ref=e442] [cursor=pointer]:
              - /url: /en/certifications
          - listitem [ref=e443]:
            - link "Compliance & KYC pack" [ref=e444] [cursor=pointer]:
              - /url: /en/compliance
          - listitem [ref=e445]:
            - link "Ports" [ref=e446] [cursor=pointer]:
              - /url: /en/ports
          - listitem [ref=e447]:
            - link "Panama Canal guide" [ref=e448] [cursor=pointer]:
              - /url: /en/panama-canal-transit-guide
          - listitem [ref=e449]:
            - link "Contact" [ref=e450] [cursor=pointer]:
              - /url: /en/contact
      - generic [ref=e451]:
        - heading "Nominate" [level=4] [ref=e452]
        - list [ref=e453]:
          - listitem [ref=e454]:
            - link "Request a port call" [ref=e455] [cursor=pointer]:
              - /url: /en/request-port-call
          - listitem [ref=e456]:
            - link "WhatsApp duty officer (to confirm)" [ref=e457] [cursor=pointer]:
              - /url: "#contact"
          - listitem [ref=e458]:
            - link "Ethics channel" [ref=e459] [cursor=pointer]:
              - /url: /en/compliance
    - generic [ref=e460]:
      - generic [ref=e461]: © 2026 Cross World Agencies, S.A.. All rights reserved.
      - link "Privacy" [ref=e462] [cursor=pointer]:
        - /url: /en/privacy
      - link "Standard Trading Conditions" [ref=e463] [cursor=pointer]:
        - /url: /en/terms
      - generic [ref=e464]: Canal figures are referential and sourced from the Panama Canal Authority.
  - alert [ref=e465]
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
     |                                                                ^ Error: /en: color-contrast
  68 |   }
  69 | });
  70 | 
```