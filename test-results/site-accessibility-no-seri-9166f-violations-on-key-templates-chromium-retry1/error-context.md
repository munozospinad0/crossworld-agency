# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> accessibility: no serious or critical violations on key templates
- Location: tests/site.spec.ts:62:5

# Error details

```
Error: /en/panama-canal-transit-guide: aria-required-children, aria-required-parent

expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 354

- Array []
+ Array [
+   Object {
+     "description": "Ensure elements with an ARIA role that require child roles contain them",
+     "help": "Certain ARIA roles must contain particular children",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/aria-required-children?application=playwright",
+     "id": "aria-required-children",
+     "impact": "critical",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "messageKey": "unallowed",
+               "values": "ol",
+             },
+             "id": "aria-required-children",
+             "impact": "critical",
+             "message": "Element has children which are not allowed: ol",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<ol class=\"m-0 grid list-none gap-1 p-0\">",
+                 "target": Array [
+                   ".bg-ink-2 > ol",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has children which are not allowed: ol",
+         "html": "<div class=\"rounded-[10px] border border-white/10 bg-ink-2 p-4 font-mono text-[0.8rem] md:p-5\" role=\"tablist\" aria-label=\"Anatomy of a PDA\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           ".bg-ink-2",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.aria",
+       "wcag2a",
+       "wcag131",
+       "EN-301-549",
+       "EN-9.1.3.1",
+       "RGAAv4",
+       "RGAA-9.3.1",
+     ],
+   },
+   Object {
+     "description": "Ensure elements with an ARIA role that require parent roles are contained by them",
+     "help": "Certain ARIA roles must be contained by particular parents",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/aria-required-parent?application=playwright",
+     "id": "aria-required-parent",
+     "impact": "critical",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"true\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 bg-white/10 text-white\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           ".bg-white\\/10",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(2) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(3) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(4) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(5) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(6) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(7) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(8) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(9) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(10) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(11) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(12) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Array [
+               "tablist",
+             ],
+             "id": "aria-required-parent",
+             "impact": "critical",
+             "message": "Required ARIA parent role not present: tablist",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Required ARIA parent role not present: tablist",
+         "html": "<button type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"pda-panel\" class=\"grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 rounded-[6px] px-2 py-1.5 text-left transition-colors duration-200 text-on-dark hover:bg-white/5\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(13) > .hover\\:bg-white\\/5.grid-cols-\\[14px_1fr_auto\\].rounded-\\[6px\\]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.aria",
+       "wcag2a",
+       "wcag131",
+       "EN-301-549",
+       "EN-9.1.3.1",
+       "RGAAv4",
+       "RGAA-9.3.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=f2e1]:
  - link "Skip to content" [ref=f2e2] [cursor=pointer]:
    - /url: "#content"
  - banner:
    - navigation "Main" [ref=f2e3]:
      - link "Cross World Agency" [ref=f2e4] [cursor=pointer]:
        - /url: /en
        - generic [ref=f2e12]: CROSS WORLD AGENCY
      - generic [ref=f2e13]:
        - link "Services" [ref=f2e14] [cursor=pointer]:
          - /url: /en/services
        - link "Canal guide" [ref=f2e15] [cursor=pointer]:
          - /url: /en/panama-canal-transit-guide
        - link "Ports" [ref=f2e16] [cursor=pointer]:
          - /url: /en/ports
        - link "About" [ref=f2e17] [cursor=pointer]:
          - /url: /en/about
        - link "Contact" [ref=f2e18] [cursor=pointer]:
          - /url: /en/contact
        - link "Español" [ref=f2e19] [cursor=pointer]:
          - /url: /es/guia-transito-canal-de-panama
        - link "Request a port call" [ref=f2e20] [cursor=pointer]:
          - /url: /en/request-port-call
  - main [ref=f2e24]:
    - generic [ref=f2e26]:
      - navigation "Breadcrumb" [ref=f2e27]:
        - link "Home" [ref=f2e28] [cursor=pointer]:
          - /url: /en
        - text: / Canal guide
      - 'heading "Panama Canal transit cost, tolls and booking: the guide for shipowners and operators" [level=1] [ref=f2e29]'
      - paragraph [ref=f2e30]: "Last reviewed: 2026-08-31 · Written by the Cross World operations team. Reviewed by Capt. Guillermo A. Peña, ISM internal auditor."
      - generic [ref=f2e31]:
        - heading "In short" [level=2] [ref=f2e32]
        - list [ref=f2e33]:
          - listitem [ref=f2e34]: "A transit is priced in three layers: the toll (by vessel segment and size), the fixed and ancillary charges (fixed tariff, security, inspection, pilotage, tugs, linehandlers) and the scheduling layer (reservation fee, or an auction premium for last-minute slots)."
          - listitem [ref=f2e35]: Booking periods and fees are set by the Panama Canal Authority's OP Notice to Shipping in force (N-7-2026 at the time of writing). Funds are required 48 hours before transit.
          - listitem [ref=f2e36]: Your agent files the pre-arrival package through the ACP electronic system at least 96 hours ahead, turns the estimate into a PDA and reconciles the FDA line by line.
      - paragraph [ref=f2e37]: "Figures on this page are referential and must be verified against the ACP Maritime Tariff and OP Notices in force at the time of your transit. Verification against the ACP tariff by Capt. Guillermo A. Peña: pending."
      - link "Request a transit PDA" [ref=f2e39] [cursor=pointer]:
        - /url: /en/request-port-call
    - generic [ref=f2e45]:
      - article [ref=f2e46]:
        - generic [ref=f2e47]:
          - 'heading "1. What a transit costs: the components" [level=2] [ref=f2e48]'
          - list [ref=f2e49]:
            - listitem [ref=f2e50]: "Toll: set by the ACP per vessel segment. Containerships pay for capacity (TTA) plus loaded TEU (TTL) and empty TEU (TTE); dry bulk pays per DWT; tankers, vehicle carriers and general cargo per PC/UMS ton; LNG and LPG carriers per cubic metre in tiers. Regular, Super and Neopanamax vessels have different rates."
            - listitem [ref=f2e51]: "Fixed tariff per transit: a lump sum by vessel category, from small regular vessels up to Neopanamax containerships."
            - listitem [ref=f2e52]: "Fixed and ancillary charges: security charge, inspection, pilotage (transit and port), tugs (complete or partial transit, Panamax or Neopanamax packages) and linehandlers."
            - listitem [ref=f2e53]: "Scheduling layer: a reservation fee if you book a slot (Regular, Super or Neopanamax rates; higher for last-minute reservations), or an auction premium if you bid for an unreserved slot. Daylight transit reservations carry their own fee."
            - listitem [ref=f2e54]: "Agency: our fee, stated as one line, plus launches, transport, communications and any husbandry you request."
        - generic [ref=f2e55]:
          - heading "2. Booking periods, reservation and auction" [level=2] [ref=f2e56]
          - list [ref=f2e57]:
            - listitem [ref=f2e58]: "First period: from 90 to 15 days before the transit date for the Panamax locks; from 90 to 31 days for Neopanamax. Period 1.a: 30 to 15 days (Neopanamax only). Second period: 14 to 8 days. Third period: 7 to 2 days before, closing at 15:00 Panama time (OP Notice N-7-2026)."
            - listitem [ref=f2e59]: "LoTSA: long-term slot allocation for Neopanamax vessels through sealed-bid auction packages; slots not allocated roll to the second period."
            - listitem [ref=f2e60]: "Just-in-time transits: a limited number of JIT slots per day, subject to arrival and readiness conditions."
            - listitem [ref=f2e61]: "Required arrival for booked Neopanamax and Panamax Plus vessels: 22:00 the day before the booked date (02:00 on the booked date for Neopanamax LNG carriers), per N-7-2026; confirm with the notice in force."
            - listitem [ref=f2e62]: "Cancellation charges scale with the notice given. Late nominations cost more: nominate as soon as the voyage is fixed."
        - generic [ref=f2e63]:
          - heading "3. Requirements and documents" [level=2] [ref=f2e64]
          - list [ref=f2e65]:
            - listitem [ref=f2e66]: "Pre-arrival package through the ACP electronic pre-arrival system (EDCS) at least 96 hours before arrival: vessel particulars, certificates, crew list, dangerous cargo declaration where applicable."
            - listitem [ref=f2e67]: "PCSOPEP: vessels carrying 400 tonnes or more of oil as cargo or fuel need a Panama Canal Shipboard Oil Pollution Emergency Plan with a Panama-resident authorized person. No PCSOPEP, no transit."
            - listitem [ref=f2e68]: Admeasurement and PC/UMS certificate for first-time transits; inspection on arrival.
            - listitem [ref=f2e69]: "Funds: the ACP requires payment 48 hours before transit. We call funds 72 hours ahead to leave margin for bank delays."
        - generic [ref=f2e70]:
          - heading "4. Draft, lock limits and water levels" [level=2] [ref=f2e71]
          - list [ref=f2e72]:
            - listitem [ref=f2e73]: "Panamax locks (sample, verify with the ACP): beam 32.31 m (106 ft), length 294.13 m (965 ft), draft 12.04 m (39.5 ft) in tropical fresh water."
            - listitem [ref=f2e74]: "Neopanamax locks (sample, verify): beam 51.25 m, length 366 m, draft 15.24 m (50 ft)."
            - listitem [ref=f2e75]: Vessels over 32.61 m (107 ft) beam or over 294.4 m (966 ft) in length use the Neopanamax locks.
            - listitem [ref=f2e76]: The maximum authorized draft changes with Gatún Lake levels; the ACP publishes advisories. We state the draft in force in every PDA with its date.
        - generic [ref=f2e77]:
          - heading "5. What your agent does and what a PDA includes" [level=2] [ref=f2e78]
          - list [ref=f2e79]:
            - listitem [ref=f2e80]: "Nomination: vessel particulars, IMO, ETA, direction and services; you receive a request number."
            - listitem [ref=f2e81]: "PDA: tolls, reservation fee or auction premium, fixed tariff, security, inspection, pilotage, tugs, linehandlers, launches, agency fee (one line), bank charges and a contingency, each with its basis."
            - listitem [ref=f2e82]: Booking, pre-arrival filing, boarding at the anchorage, coordination of pilots, tugs and linehandlers, crew and supplies.
            - listitem [ref=f2e83]: "FDA: reconciled line by line against the PDA, every third-party charge with its voucher, variances explained."
            - listitem [ref=f2e84]: A sample PDA for a Panamax bulk carrier and a product tanker will be published here once approved.
          - generic [ref=f2e87]:
            - generic [ref=f2e88]:
              - generic [ref=f2e89]:
                - heading "Anatomy of a PDA" [level=3] [ref=f2e90]
                - paragraph [ref=f2e91]: Every line of a proforma disbursement account, and what it means. Touch a line.
              - generic [ref=f2e92]:
                - generic [ref=f2e93]: "Paid to:"
                - generic [ref=f2e94]: Panama Canal Authority
                - generic [ref=f2e96]: Third party
                - generic [ref=f2e98]: Cross World
            - generic [ref=f2e100]:
              - tablist "Anatomy of a PDA" [ref=f2e101]:
                - generic [ref=f2e102]:
                  - generic [ref=f2e103]: PROFORMA DISBURSEMENT ACCOUNT · SAMPLE STRUCTURE
                  - generic [ref=f2e104]: MV (vessel) · IMO (number) · Panamax bulk carrier · southbound transit
                - list [ref=f2e105]:
                  - listitem [ref=f2e106]:
                    - tab "01 Canal toll ····" [selected] [ref=f2e107]:
                      - generic [ref=f2e109]: 01 Canal toll
                      - generic [ref=f2e110]: ····
                  - listitem [ref=f2e111]:
                    - tab "02 Fixed tariff per transit ····" [ref=f2e112]:
                      - generic [ref=f2e114]: 02 Fixed tariff per transit
                      - generic [ref=f2e115]: ····
                  - listitem [ref=f2e116]:
                    - tab "03 Reservation fee or auction premium ····" [ref=f2e117]:
                      - generic [ref=f2e119]: 03 Reservation fee or auction premium
                      - generic [ref=f2e120]: ····
                  - listitem [ref=f2e121]:
                    - tab "04 Security charge ····" [ref=f2e122]:
                      - generic [ref=f2e124]: 04 Security charge
                      - generic [ref=f2e125]: ····
                  - listitem [ref=f2e126]:
                    - tab "05 Inspection and admeasurement ····" [ref=f2e127]:
                      - generic [ref=f2e129]: 05 Inspection and admeasurement
                      - generic [ref=f2e130]: ····
                  - listitem [ref=f2e131]:
                    - tab "06 Pilotage ····" [ref=f2e132]:
                      - generic [ref=f2e134]: 06 Pilotage
                      - generic [ref=f2e135]: ····
                  - listitem [ref=f2e136]:
                    - tab "07 Tugs ····" [ref=f2e137]:
                      - generic [ref=f2e139]: 07 Tugs
                      - generic [ref=f2e140]: ····
                  - listitem [ref=f2e141]:
                    - tab "08 Linehandlers ····" [ref=f2e142]:
                      - generic [ref=f2e144]: 08 Linehandlers
                      - generic [ref=f2e145]: ····
                  - listitem [ref=f2e146]:
                    - tab "09 Launch and boarding ····" [ref=f2e147]:
                      - generic [ref=f2e149]: 09 Launch and boarding
                      - generic [ref=f2e150]: ····
                  - listitem [ref=f2e151]:
                    - tab "10 Husbandry (if requested) ····" [ref=f2e152]:
                      - generic [ref=f2e154]: 10 Husbandry (if requested)
                      - generic [ref=f2e155]: ····
                  - listitem [ref=f2e156]:
                    - tab "11 Agency fee ····" [ref=f2e157]:
                      - generic [ref=f2e159]: 11 Agency fee
                      - generic [ref=f2e160]: ····
                  - listitem [ref=f2e161]:
                    - tab "12 Bank charges ····" [ref=f2e162]:
                      - generic [ref=f2e164]: 12 Bank charges
                      - generic [ref=f2e165]: ····
                  - listitem [ref=f2e166]:
                    - tab "13 Contingency ····" [ref=f2e167]:
                      - generic [ref=f2e169]: 13 Contingency
                      - generic [ref=f2e170]: ····
                - generic [ref=f2e171]: "Figures are not shown: tolls and fees come from the ACP tariff in force on your transit date and from third-party rates. Your PDA states each amount with its basis."
              - tabpanel [ref=f2e172]:
                - generic [ref=f2e173]: 01 · Panama Canal Authority
                - heading "Canal toll" [level=4] [ref=f2e174]
                - generic [ref=f2e175]:
                  - term [ref=f2e176]: Basis
                  - definition [ref=f2e177]: By segment and size (TEU, DWT, PC/UMS or m³)
                  - term [ref=f2e178]: Paid to
                  - definition [ref=f2e179]: Panama Canal Authority
                  - term [ref=f2e180]: Known
                  - definition [ref=f2e181]: At PDA, from the tariff in force
                - paragraph [ref=f2e182]: The largest line. Containerships pay capacity plus loaded and empty TEU; bulk carriers per DWT; tankers, car carriers and general cargo per PC/UMS ton; gas carriers per cubic metre in tiers. We state the basis we used so you can check it.
        - generic [ref=f2e183]:
          - heading "6. Common mistakes" [level=2] [ref=f2e184]
          - list [ref=f2e185]:
            - listitem [ref=f2e186]: Nominating late and paying a last-minute reservation or an auction premium.
            - listitem [ref=f2e187]: Estimating the toll with the wrong measurement basis (PC/UMS versus DWT versus TEU).
            - listitem [ref=f2e188]: Arriving without a PCSOPEP authorized person.
            - listitem [ref=f2e189]: Calling funds after the ACP deadline.
            - listitem [ref=f2e190]: Planning a crew change without immigration lead time.
        - generic [ref=f2e191]:
          - heading "Frequently asked questions" [level=2] [ref=f2e192]
          - generic [ref=f2e193]:
            - group [ref=f2e194]:
              - generic "How much does it cost to transit the Panama Canal?" [ref=f2e195] [cursor=pointer]
            - group [ref=f2e196]:
              - generic "How do I book a Panama Canal slot?" [ref=f2e197] [cursor=pointer]
            - group [ref=f2e198]:
              - generic "What happens if I miss my booking?" [ref=f2e199] [cursor=pointer]
            - group [ref=f2e200]:
              - generic "What is a JIT transit?" [ref=f2e201] [cursor=pointer]
            - group [ref=f2e202]:
              - generic "How long does a transit take?" [ref=f2e203] [cursor=pointer]
            - group [ref=f2e204]:
              - generic "What draft is allowed today?" [ref=f2e205] [cursor=pointer]
            - group [ref=f2e206]:
              - generic "Do I need an agent?" [ref=f2e207] [cursor=pointer]
            - group [ref=f2e208]:
              - generic "What is a PDA?" [ref=f2e209] [cursor=pointer]
            - group [ref=f2e210]:
              - generic "Can I pay tolls directly?" [ref=f2e211] [cursor=pointer]
            - group [ref=f2e212]:
              - generic "When are funds due?" [ref=f2e213] [cursor=pointer]
        - generic [ref=f2e214]:
          - heading "Sources" [level=2] [ref=f2e215]
          - list [ref=f2e216]:
            - listitem [ref=f2e217]:
              - link "Panama Canal Authority, Maritime Tariff" [ref=f2e218] [cursor=pointer]:
                - /url: https://pancanal.com/en/maritime-services/maritime-tariff/
            - listitem [ref=f2e219]:
              - link "Panama Canal Authority, OP Notice to Shipping N-7-2026, Transit Reservation System" [ref=f2e220] [cursor=pointer]:
                - /url: https://pancanal.com/
      - complementary [ref=f2e221]:
        - generic [ref=f2e222]:
          - heading "Contents" [level=2] [ref=f2e223]
          - list [ref=f2e224]:
            - listitem [ref=f2e225]:
              - 'link "1. What a transit costs: the components" [ref=f2e226] [cursor=pointer]':
                - /url: "#components"
            - listitem [ref=f2e227]:
              - link "2. Booking periods, reservation and auction" [ref=f2e228] [cursor=pointer]:
                - /url: "#booking"
            - listitem [ref=f2e229]:
              - link "3. Requirements and documents" [ref=f2e230] [cursor=pointer]:
                - /url: "#requirements"
            - listitem [ref=f2e231]:
              - link "4. Draft, lock limits and water levels" [ref=f2e232] [cursor=pointer]:
                - /url: "#draft"
            - listitem [ref=f2e233]:
              - link "5. What your agent does and what a PDA includes" [ref=f2e234] [cursor=pointer]:
                - /url: "#agent"
            - listitem [ref=f2e235]:
              - link "6. Common mistakes" [ref=f2e236] [cursor=pointer]:
                - /url: "#mistakes"
            - listitem [ref=f2e237]:
              - link "Frequently asked questions" [ref=f2e238] [cursor=pointer]:
                - /url: "#faq"
        - generic [ref=f2e239]:
          - paragraph [ref=f2e240]: Send the vessel particulars and receive an itemized PDA with a request number.
          - link "Request a transit PDA" [ref=f2e242] [cursor=pointer]:
            - /url: /en/request-port-call
  - contentinfo [ref=f2e247]:
    - img:
      - generic: CROSS WORLD
    - generic [ref=f2e248]:
      - generic [ref=f2e249]:
        - generic [ref=f2e250]: CROSS WORLD AGENCY
        - paragraph [ref=f2e259]: Ship agency, marine surveys, bunker and claims support at the Panama Canal. Licensed by the AMP and authorized by the Panama Canal Authority since 2010.
        - figure "CROSS WORLD in international signal flags" [ref=f2e260]:
          - img "CROSS WORLD spelled in international maritime signal flags" [ref=f2e261]:
            - generic "C" [ref=f2e262]
            - generic "R" [ref=f2e270]
            - generic "O" [ref=f2e277]
            - generic "S" [ref=f2e283]
            - generic "S" [ref=f2e289]
            - generic "W" [ref=f2e295]
            - generic "O" [ref=f2e302]
            - generic "R" [ref=f2e308]
            - generic "L" [ref=f2e315]
            - generic "D" [ref=f2e322]
        - paragraph [ref=f2e329]:
          - text: Cross World Agencies, S.A. · RUC 1675308-1-680680 DV 34IMO company number 5785507RBS Tower, 9th floor, office 902 · Calle Ramón H. Jurado, PaitillaPanama City, Panama
          - link "+507 6266-4242" [ref=f2e330] [cursor=pointer]:
            - /url: tel:+50762664242
          - text: ·
          - link "+507 383-0128" [ref=f2e331] [cursor=pointer]:
            - /url: tel:+5073830128
          - text: All times in Panama time (UTC-5, no daylight saving).
      - generic [ref=f2e332]:
        - heading "Services" [level=4] [ref=f2e333]
        - list [ref=f2e334]:
          - listitem [ref=f2e335]:
            - link "Ship agency & Canal transit" [ref=f2e336] [cursor=pointer]:
              - /url: /en/services/ship-agency-panama-canal-transit
          - listitem [ref=f2e337]:
            - link "Marine surveys" [ref=f2e338] [cursor=pointer]:
              - /url: /en/services/marine-surveys
          - listitem [ref=f2e339]:
            - link "Bunker surveys & claims support" [ref=f2e340] [cursor=pointer]:
              - /url: /en/services/bunker-surveys-and-claims-support
          - listitem [ref=f2e341]:
            - link "Marine fuel supply" [ref=f2e342] [cursor=pointer]:
              - /url: /en/services/marine-fuel-supply
          - listitem [ref=f2e343]:
            - link "Ship-to-ship & offshore" [ref=f2e344] [cursor=pointer]:
              - /url: /en/services/ship-to-ship-and-offshore
          - listitem [ref=f2e345]:
            - link "Marine claims support" [ref=f2e346] [cursor=pointer]:
              - /url: /en/services/marine-claims-support
          - listitem [ref=f2e347]:
            - link "Consulting & audits" [ref=f2e348] [cursor=pointer]:
              - /url: /en/services/maritime-consulting-and-audits
      - generic [ref=f2e349]:
        - heading "Company" [level=4] [ref=f2e350]
        - list [ref=f2e351]:
          - listitem [ref=f2e352]:
            - link "About" [ref=f2e353] [cursor=pointer]:
              - /url: /en/about
          - listitem [ref=f2e354]:
            - link "Certifications" [ref=f2e355] [cursor=pointer]:
              - /url: /en/certifications
          - listitem [ref=f2e356]:
            - link "Compliance & KYC pack" [ref=f2e357] [cursor=pointer]:
              - /url: /en/compliance
          - listitem [ref=f2e358]:
            - link "Ports" [ref=f2e359] [cursor=pointer]:
              - /url: /en/ports
          - listitem [ref=f2e360]:
            - link "Panama Canal guide" [ref=f2e361] [cursor=pointer]:
              - /url: /en/panama-canal-transit-guide
          - listitem [ref=f2e362]:
            - link "Contact" [ref=f2e363] [cursor=pointer]:
              - /url: /en/contact
      - generic [ref=f2e364]:
        - heading "Nominate" [level=4] [ref=f2e365]
        - list [ref=f2e366]:
          - listitem [ref=f2e367]:
            - link "Request a port call" [ref=f2e368] [cursor=pointer]:
              - /url: /en/request-port-call
          - listitem [ref=f2e369]:
            - link "WhatsApp duty officer (to confirm)" [ref=f2e370] [cursor=pointer]:
              - /url: "#contact"
          - listitem [ref=f2e371]:
            - link "Ethics channel" [ref=f2e372] [cursor=pointer]:
              - /url: /en/compliance
    - generic [ref=f2e373]:
      - generic [ref=f2e374]: © 2026 Cross World Agencies, S.A.. All rights reserved.
      - link "Privacy" [ref=f2e375] [cursor=pointer]:
        - /url: /en/privacy
      - link "Standard Trading Conditions" [ref=f2e376] [cursor=pointer]:
        - /url: /en/terms
      - generic [ref=f2e377]: Canal figures are referential and sourced from the Panama Canal Authority.
  - button "Back to top"
  - alert [ref=f2e378]
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
     |                                                                ^ Error: /en/panama-canal-transit-guide: aria-required-children, aria-required-parent
  68 |   }
  69 | });
  70 | 
```