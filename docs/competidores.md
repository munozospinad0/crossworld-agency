# Competitive research: Panama ship agency and maritime services websites

Prepared for the Cross World Agency (crossworldagency.com) redesign. Date: 2026-08-27.
Method: homepage plus 1-3 key pages per competitor fetched and read; raw HTML pulled for title, meta description, schema, hreflang, platform; sitemaps counted for blog volume; Google results checked for the topics Cross World cares about. GAC blocks bots (HTTP 403 on every page) so its entry is built from search snippets and group pages.

Scale used for design quality: 1 = broken, 5 = clean template, 7 = professional and current, 9-10 = distinctive and best-in-class.

---

## 0. Baseline: crossworldagency.com today

- Title: "Home - Cross world agency". No meta description. `html lang="es"` while content is English.
- Hero: "WE ARE HERE TO TAKE CARE OF YOU AND YOUR CREW". Tagline: "TRUST YOUR BUSINESS WITH US".
- Nav: Home, About, Products, Projects, Contact, "Take Action". The Products section lists roller chain drives, gear couplings, conveyor belts, helical gears (industrial-manufacturing template leftovers).
- About page still contains "Click edit button to change this text", Lorem Ipsum, and "Since 1995" (company was founded 4 March 2010).
- Services actually listed: Cargo Loss Control & Expediting, Marine Advisor and Cargo Operations Management, Vessel Operations Management, Specialized Cargo Blending, Bunker Surveys, Marine Claims, Technical Surveys. Panama Canal transit agency and husbandry, the core licensed business, are not presented as services.
- No address, phone, email, WhatsApp, ISO badges, IMO number, or named people on the homepage. Partner shown: McKenzie & McKenzie (auditors).
- Yoast schema present (WebSite, Organization, Person) but wrapping wrong content. No hreflang. No analytics tag detected.
- What Google already knows: Cross World Agencies S.A. is on the ACP list of authorized shipping agencies (pancanal.com PDF), founded 4 March 2010, office at Edificio RBS, Calle Ramon H. Jurado, Piso 9, Punta Paitilla, and is "main shareholder of the company SOS Resilience holding". Brand-name searches also surface a confusable competitor, Cross Roads Agencies S.A. (crossroadspanama.com, "The Safest Way To Cross The Continents").

---

## 1. Adimar Shipping, Inc. (adimarships.com)

**Positioning / tagline (verbatim)**
- Title tag: "Panama Canal Ships Agent-Quality and Timely Service | Shipping Services"
- Hero: "We Provide High Quality, Timely Shipping Services with Integrity." Secondary: "We are experts so you don't have to be." Repeated H1 block: "Misjudge Your Timing and You Lose..." Positioning line: "Our eyes at the Panama Canal".
- Meta description: "Adimar is a representative agency in Latin America for hundreds of clients all over the world, with High Quality Shipping Services."

**Service taxonomy** (grouped by principal type, then compliance)
- Ship Agency (umbrella) > Charterer's Nominated Ships Agency, Owner's Nominated Ships Agency, Protective Ships Agency, Husbandry Ships Agency, Panama Canal SOPEP (PCSOPEP)
- Crew changes, Yacht services, Global Network (representation)

**Site structure**: Home, About, Services, Yachts, Global Network, News, Contact Us. Extra "Panama Canal" hub: FAQ, Transit Info, Locks, Live Camera, Weather, History & Facts, Important Links, Transit Waiting Time Projections. English only. WordPress + Yoast + Site Kit.

**Trust signals**: "Celebrating our 20th year in business"; "We work 24/7 - Contact us anytime"; Testimonials page made of scanned client "service evaluation forms" 2024-2025 (no names in text, no quotes). No ISO, no memberships, no client logos.

**CTAs**: "GET A QUOTE" repeated; phone (507) 265-3053; ops@adimarships.com; WhatsApp link present in code; newsletter signup for daily transit waiting-time projections. No structured port-call form.

**Content / blog strategy** (the aggressive one)
- 1,179 posts in the sitemap. Cadence: ~20/month 2021-2025, a 124-post dump in April 2026, then ~30/month, and one post per day in August 2026.
- 939 of 1,179 slugs contain "transit". Coverage of Cross World's niches is thin: bunker 10, survey 4, claim 0, P&I 0, STS 22 (mostly "costs"), oil 3.
- Recent titles: "Mastering Port Agency Services in Cristobal, Panama: A 2026 Strategic Guide" (27 Aug), "Cristobal Anchorage: Atlantic Panama Canal Transit Guide" (26 Aug), "PCSOPEP Authorized Person: Your Guide to Panama Canal Compliance in 2026" (26 Aug), "The Ultimate Panama Canal SOPEP Compliance Checklist for 2026" (25 Aug), "2026 Panama Canal Transit: Ship Agent & PDA Guide" (23 Aug), "Panama Canal Neopanamax Booking: 2026 Strategic Guide" (19 Aug).
- Post anatomy (PDA guide): ~3,600 words, H2/H3 outline, 7-question FAQ, 15+ internal links to service pages, 4 quote CTAs, byline "Ayaan Ahmed Shohan" (a content writer, not a maritime professional), category "Uncategorized". Contains concrete numbers (47.5 ft draft, USD 100,000 reservation fee, USD 4M auction premium, LoTSA 2.0) mixed with AI-pattern repetition of the target phrase.
- Google today: Adimar holds 8 of the top results for "Panama Canal ship agency transit quote PDA" and dominates "husbandry services Panama", "ship agent Balboa", "PCSOPEP".

**SEO signals**: Title and description set; schema via Yoast (WebSite, WebPage, Person, Article; BlogPosting + BreadcrumbList on posts); OG tags; GA; no hreflang; English only.

**Design quality: 5/10.** Clean blue/white WordPress template, repeated content blocks, stock imagery, "Uncategorized" and duplicate H1s show low editorial care.

**Worth learning**: The Panama Canal resource hub (FAQ, locks, webcams, weather, daily waiting-time projections with email subscription) is a genuine retention asset. The "Owner's vs Charterer's nominated agency" split maps to how principals actually buy. Scanned evaluation forms as testimonials is a novel idea done badly (unreadable, anonymous).

---

## 2. Panama Ship Service (panamashipservice.com)

Sister operation of Adimar: same "Misjudge Your Timing and You Lose..." H1, same "20th year", same WordPress/Site Kit stack, same posting cadence (1,054 posts; 107 in April 2026, ~30/month after). Founded 1999.

**Positioning (verbatim)**: "Providing Operational and Technical services to the Shipping Industry at both sides of the Panama Canal". Title: "Panama Ship Service - Ship Repairs, Surveys and Supplies". Messaging: "eliminate confusion", "constant daily communication", "rapid response".

**Service taxonomy** (grouped by technical discipline)
- Surveys: Bunker Survey, Bunker Quantity Verification, "Bunker Detective" (concealed-fuel detection), Draft Survey, Cargo Intake Maximizing Survey, Survey for Class Approval, Ship Condition Survey, Damage Survey, Vetting Survey, Pre-Purchase Condition Survey
- Underwater: Inspection, Propeller Polishing, Hull Cleaning, Cutting & Welding, Rudder & Propeller, Recovery of Lost Objects
- Repairs & Services: Mechanical, Rudder/Propeller, Sandblasting/Painting, Tank Cleaning, Compass Repairs, Steel Fabrication, A/C, Fumigation
- Disposal: Slops & Sludge, Garbage
- Pest Control: Sanitary Inspections, Fumigation, Deratting Certificate, AGM Inspection
- Supplies: Ship Chandlery

**Site structure**: HOME, SURVEYS, UNDERWATER, REPAIRS, DISPOSAL, PEST CONTROL, NEWS, CONTACT US. English only.

**Trust signals**: "Celebrating our 20th years in business"; 24/7; references IACS societies (Lloyd's, BV, ClassNK) and an "Ethical Professional Declaration" against fraudulent survey practice; no ISO, no memberships, no logos.

**CTAs**: "GET QUOTE", "Ask for Quote/PDA", "Nominate Panama Ship Services", ops@panamashipservice.com, (507) 6500-0023. WhatsApp in code.

**Content / blog**: Recent: "Marine Air Conditioning Repair in Panama: Expert HVAC Services for Canal Transit" (28 Aug), "Propeller Polishing in Panama: Maximizing Fuel Efficiency" (27 Aug), "Ship Sanitary Inspection in Panama: A 2026 Compliance Guide" (25 Aug), "Ship Waste Disposal in Panama: The 2026 Vessel Compliance & Logistics Guide" (24 Aug), "Deratting Certificate Requirements for Panama Canal Transit (2026)" (23 Aug). Deratting post: ~2,800 words, 7 FAQs, no byline, reads AI-written ("Documentation errors cost money. Timing is everything here."). Slug coverage: survey 24, bunker 9, claim 1, P&I 0. Ranks for "bunker survey Panama" and "on-hire off-hire survey Panama".

**SEO signals**: Title, description, Yoast schema, OG, GA; no hreflang.

**Design quality: 5/10.** Same template as Adimar; SVG placeholder images; text-heavy.

**Worth learning**: The Surveys page is the closest thing to bunker-survey education in the market (~1,200 words: 0.5% draft survey tolerance, ROB calculations, sampling, dispute documentation). "Bunker Detective" is memorable naming. Their weakness is Cross World's opening: they sell surveys as a repair-shop line item, not as claims protection.

---

## 3. GAC Panama (gac.com/panama) - fetched via search snippets only

**Positioning (verbatim from SERP titles)**: "Ship agency services tailored to your business needs | GAC Panama"; "Delivering expert canal & straits transit services for a seamless voyage"; "GAC Panama - coordinated and well managed husbandry services". Group line: part of "a leading provider of integrated shipping, logistics and marine services".

**Service taxonomy** (group-standard, localised): Shipping > Ship Agency, Canal & Straits Transits, Husbandry Services, Protecting Agency; Logistics > Ship Spares Logistics. Group-level P&I / H&M correspondent services page exists ("GAC has represented International Group P&I Clubs since 1973").

**Site structure**: Country micro-site inside the global GAC template; Shipping, Logistics, About GAC Panama, Contact; "Hot Port News" feed with canal notices (e.g. "Enhanced Panama Canal long-term slot allocation"). English only for Panama.

**Trust signals**: Offices at both ends of the Canal, head office Balboa, "on call 24/7", "nationwide port coverage", vetted suppliers, group ISO and compliance frameworks. No local testimonials.

**CTAs**: Contact forms, office emails, Hot Port News subscription. No public quote calculator.

**Content**: No Panama blog; group "Hot Port News" is the content engine (short regulatory alerts).

**SEO signals**: Strong title/description discipline per page; bot-blocked (403) which also blocks some crawlers; hreflang not applicable (English only).

**Design quality: 7/10 (assessed from group template)**: consistent corporate system, hero photography, clear service cards; generic and impersonal.

**Worth learning**: Service pages written to the principal's question ("hassle-free port calls or book a transit"), regulatory alert feed as lightweight content, P&I correspondent as a named service line.

---

## 4. Leth Agencies Panama (lethagencies.com/panama)

**Positioning (verbatim)**: "LETH has provided agency services in the Panama Canal since 2006, building a strong local presence and serving clients with dedication and expertise." Meta description: "Since 2006, Leth Agencies Panama provides full maritime agency services in the Panama Canal including transit handling, bunkering, crew changes, ship chandler support, outside-port limit services, and more - backed by deep local knowledge and 24/7 support."

**Service taxonomy**: Group level: Transit Handling ("Our core business area"), Port Calls, Husbandry, Suez Canal Rebates, Offshore and Towage, Voyage Agency. Panama page flat list: Transit Handling, Bunker Supply, Cash To Master, Crew Change, Deslopping, Fresh water supply, Hotel reservation and transportation, Inland Overland Transportation, Outside Port Limit Service, Protecting Agency, Ship Chandler, Repair/docking, Ship Spare & Store, STS Operations.

**Site structure**: Company, Services, Locations (Egypt, Denmark, Singapore, Spain, Gibraltar, Turkey, Panama, Malta), Resources (Suez Toll Calculator, Panama Analytics, Rebate maps, Guides & Brochures), Contact. English only. Custom lightweight build (23 KB HTML).

**Trust signals**: 1914 parent roots; BIMCO and MACN logos; Inchcape Shipping Services majority investment (Jan 2024); 24/7 with Denmark/Norway/Singapore follow-the-sun desks; "direct relationships with the Panama Canal Authority and port operators"; duty officer cell (507) 6673-8417.

**CTAs**: Contact page, 24-hour line +47 23 11 55 00, downloadable "Leth Panama Canal guide" PDF (ungated), Panama Analytics dashboard.

**Content**: No blog. Resources instead: 15 ungated PDFs; Panama Analytics = daily slot-auction results by segment (Neopanamax, Super, Regular), 30-day min/median/mean/max bid stats, 7-day trend, "slot checker" for next available slot, current draft restrictions and ACP advisories.

**SEO signals**: Good title and description; no schema; no OG; no hreflang; no WhatsApp.

**Design quality: 7/10.** Minimal, fast, teal/blue, Panama map visual; sparse on proof and imagery.

**Worth learning**: Panama Analytics is the best data product in the category. Ungated PDF guides. Honest, specific meta description.

---

## 5. Orca Ships Agents (orcashipsagents.com)

**Positioning (verbatim)**: H1 "Panama Canal Authorized Agent"; "Extensive experience in our operational, commercial, and technical team, offering a complete maritime husbandry service in Panama."; "24/7 Personalized attention 365 days a year"; "Reliability Delivering in record time". Title: "Ships Agents in Panama". Meta: "Husbandry services in Panama. Extensive operational experience as Port Agents, Ship Chandlers and Panama Canal Authorized Agents."

**Service taxonomy**
- Husbandry Services: Owners matters, Ship Chandlers in Panama, Canal Transit Coordination, Yacht Services, Crew Changes, Port Calls in Panama, Fuel Bunkering Services, Air freight and Sea freights, Ship Management in Panama, Ship Sanitation Control Exemption Certificates
- Panama Canal Transit: PC SOPEP, Panama Canal Booking Slots, ACP Toll Certificate Renewal, Panama Canal Requirements
- Notices & Regulations: Oil Terminals, Maritime Regulations, Marine Tariff, Panama Canal Notice, Vessel Requirements for transit
- Yokohama Fenders (product line)

**Site structure**: Our Team, Husbandry Services, Panama Canal transit, Notices & Regulations, Yokohama Fenders, Contact Us. English only. ProcessWire CMS.

**Trust signals**: "50 years of operational experience"; "Authorized by Panama Maritime Authority"; "Panama Canal authorized agent"; Atlantic (Cristobal) and Pacific (Balboa) contacts; VHF Ch 12/16 standby; Kochi, India office. No ISO, no memberships, no logos, no testimonials.

**CTAs**: WhatsApp button (+507 6681-4752), operations@ and boardings@ emails, emergency line, "Quote with us" under chandlery.

**Content**: No blog. Canal Transit page (~500 words) explains pre-arrival 96-hour rule, booking options (daylight, just-in-time, swaps), links OP Notice to Shipping PDF. Oil terminal directory and 6-terminal port guide.

**SEO signals**: Title/description set; no schema; OG present; GA; no hreflang.

**Design quality: 5/10.** Functional service cards, dated look, small imagery.

**Worth learning**: Leads with the licence itself ("Panama Canal Authorized Agent", "Authorized by Panama Maritime Authority") which Cross World can also claim. Oil terminal directory is a useful niche asset for tanker principals.

---

## 6. 24Marine (24marine.com)

**Positioning (verbatim)**: "Professional marine survey services, based in Panama - operating worldwide"; "Trusted maritime inspection partner". Mission: "Through expert surveys and services, we ensure every vessel performs better than yesterday." Title: "24 Marine | Expert Marine Survey Services". Meta: "24 Marine offers professional marine survey services to ensure your vessel's safety and compliance. Trusted experts for all your marine needs. Contact Us Now".

**Service taxonomy**
- Marine Surveys: Vessel Condition Survey, Damage Claim Surveys, Cargo Surveys, Yacht and Sailboat Surveys
- Compliance & Regulatory: Vessel Audits (ISM, MLC, ISPS, ISO), IHM Surveys, VGP 2013 Water Testing, BWTS IMO D-2 Testing
- Technical & Engineering: 3D Laser Scanning, Retrofit Projects, BWTS Services, Robotic Services

**Site structure**: Contact, Services, Team, About Us. English only. WordPress.

**Trust signals**: "20+ Surveyors & Engineers", "4 offices" (Panama HQ, USA, Canada, Venezuela), "10,000+ Reports Delivered", "24/7 Global Coverage", IIMS member, 12+ certification badges, 37+ client logos, testimonials, YouTube gallery, Instagram feed, partners (JAM Marine Dockyard, Panama Yacht Broker).

**CTAs**: "Request a survey Quote", WhatsApp +507 6307-4419, sales@24marine.com, contact form.

**Content**: No blog; service pages are the content (Vessel Condition Survey ~850 words with "Why it matters", scope, "Who it's for" (owners, insurers, charterers, P&I Clubs), deliverables (photos, risk ratings, corrective actions "structured to meet underwriter and P&I Club requirements"), 4-question FAQ, related services).

**SEO signals**: Best schema in the set: Service, Offer, Place, PostalAddress, ContactPoint, WebSite; OG; GA; no hreflang.

**Design quality: 7/10.** Modern, proof-heavy (stats, logos, video), strong photography of real inspections.

**Worth learning**: This is the template for Cross World's survey and claims pages: audience-first ("Who it's for"), deliverables, turnaround, FAQ, related services. Stats bar and client logos work. Venezuela office overlaps Cross World's representation footprint.

---

## 7. C.B. Fenton & Co. (cbfenton.com)

**Positioning (verbatim)**: "Local Knowledge, Global Reach". Part of Ultramar (Chile), "the largest independent shipping agency in the Americas".

**Service taxonomy** (business units): Port Calls, Husbandry Services, Liner Services, Integral Solutions; Panama Canal Transits mentioned. Service pages are single images posted in 2022, no text.

**Site structure**: Home, Our History, Our Promise & Contribution, Personnel, Port Calls, Husbandry Services, Liner Services, Integral Solutions, Contact Form, Job Application, Canal de Denuncias (ethics channel). Nominally bilingual; `html lang="es"` with English body; WooCommerce cart and my-account links left in the template.

**Trust signals**: Founded 1916 by Charles B. Fenton, "one of the oldest agencies at the Panama Canal"; Ultramar acquisition 2012 (14,000+ employees); ULOG logistics 2014; Yang Ming representation 2016; Safety Policy, Sustainable Strategy, whistleblower channel. No ISO, no memberships, no logos, no 24/7 claim.

**CTAs**: info@cbfenton.com, customersi@cbfenton.com, contact form, job application.

**Content**: None.

**SEO signals**: Title "C.B. Fenton" only; no meta description; no schema; no analytics; no hreflang.

**Design quality: 3/10.** Historic brand on a neglected WordPress site with image-only service pages.

**Worth learning**: Heritage timeline format (year-by-year milestones) is a good pattern for an About page. Otherwise a cautionary example: heritage without a maintained site.

---

## 8. Norton Lilly International (nortonlilly.com and nortonlilly.com.pa)

**Positioning (verbatim)**: Global: "Port Services & Logistics for All Vessel Types."; "the most time-tested shipping agency in the Western Hemisphere"; "Trusted veterans of the seas, we get you to port safely and take care of you upon landing." Panama: "Serving World Shipping at the Panama Canal since 1925". Panama meta: "Leading Panama Canal & Port Ship Agent, Norton Lilly Panama is one click away to be your partner of choice."

**Service taxonomy**
- Global: Port Agency (Charterers Protective, Owner/Operator Protective, Cargo Protective, Husbandry), Liner Agency (Vessel/Voyage Oversight, Import/Export Customer Service, AMS, Equipment Control, EDI, Terminal Coordination, US Customs), Documentation (ACE, AES, Bills of Lading, Canal Rebate Letters)
- Panama: Canal Transits, Port Agency, Liner Agency, Vessel Husbandry, Cruise and Yachts (separate brand panama-yachting.com)

**Site structure**: Global: Home, Why Use NLI, Services & Industries, Regions & Countries Served, About, Awards & Certifications, Sustainability, Careers, Contact. Panama: About Us, Our Services, Sustainability, The Panama Canal, Newsletter, Reports (gated portal reports.nortonlilly.com.pa), Careers, Contact Us, Meet With Us, Ethics & Compliance Channel. English only.

**Trust signals**: ISO 9001:2015; since 1925 in Panama; "over 100 years"; two offices (Balboa / Panama Pacifico and Cristobal / MIT Colon) with separate Pacific and Atlantic phones; external sources: ~15% of canal transits, 5,000+ port calls and transits per year. Ethics channel. No logos or testimonials.

**CTAs**: "Book an Appointment" / "Meet With Us!" (calendar booking), operations@nortonlilly.com.pa, "Contact our commodity team". No quote form.

**Content**: "Panama Flash" newsletter: "Additional Measures to Address Reduced Precipitation in the Canal Watershed" (21 Aug 2026), "Underway Transfers of Provisions and Crew Changes in Pacific Canal Waters" (18 Aug), "Adjustment to Maximum Allowable Draft in NEPAN" (6 Aug). "The Panama Canal" resource page consolidates ACP links, transit cost documents for Atlantic and Pacific terminals, booking guide, webcams. Canal Transits page (~600 words) lists booking periods, auction bidding, 96-hour pre-arrival, guarantees and payments, maiden transits.

**SEO signals**: Global description is a pasted paragraph with a typo ("piece-of-mind"); AIOSEO schema (Organization, Breadcrumb). Panama site: Yoast schema, decent title and description. No hreflang.

**Design quality: global 5/10, Panama 6/10.** Panama site is cleaner (service cards, newsletter, dual-office header) but visually generic.

**Worth learning**: Appointment-booking CTA is unusual and low-friction for principals. Regulatory newsletter with dated entries signals a live desk. Splitting Pacific and Atlantic contacts everywhere.

---

## 9. Wilhelmsen Port Services (wilhelmsen.com/ships-agency and Panama Canal page)

**Positioning (verbatim)**: Meta for Port Services: "Shaped by the passion and care of our people to move the industry forward, we create a new port experience that pushes the boundaries of performance and efficiency further." Panama Canal page: "Are you ready for the new Panama canal expansions? We are - and we are ready to assist you with our 16/5 Transit Desk." (dated copy: the expansion opened in 2016).

**Service taxonomy** (largest and most systematic)
- Ships Agency: Full Agency, Husbandry Services, Protective Agency, Bunker Call Agency, Canal and Straits Transits (Panama Canal, Suez Canal), Hub Solution, Dry Docking Agency, Lay-ups, Cruise Services, Offshore Projects, ICS/ENS
- Maritime Logistics: Liner Agency, NVOCC, Freight Forwarding, Break Bulk & Project Logistics, 3PL & Terminals
- Next Innovations / Data Platforms: Diize, CargoMax, Platform 13, Port Cost Financing
- Tools: Panama Toll Calculator, Suez Toll Calculator, Arrivals & Departures, ISPS, Port News newsletter

**Site structure**: About, Media centre, Contacts/Locations (Panama: Balboa, Cristobal, Colon, Gamboa, Rodman, Panama City office at Panama Pacifico Tower 3815), Careers, Investors, ESG. English only.

**Trust signals**: "5,000 marine professionals servicing 2,200 ports in 103 countries", "Offices in 75 countries", 24/7 boarding officers, "DA within 25 days", governance and whistleblowing links.

**CTAs**: Panama Toll Calculator (primary), Transit Desk phone +507 263 7755 and wps.panama.transitdesk@wilhelmsen.com, Port News subscription, customer portals.

**Content**: No Panama blog; Port News newsletter; Panama page links out to ACP booking system, notices and advisories.

**SEO signals**: Weak titles ("Port Services", "Panama Canal Transit"); Organization schema only; 1.45 MB HTML page; no hreflang.

**Design quality: 7/10.** Enterprise design system, consistent, heavy; the Panama page itself is thin and outdated.

**Worth learning**: "DA within 25 days" is a concrete service promise; toll calculator as the CTA; naming a dedicated "Transit Desk" with its own email.

---

## 10. Boyd Steamship Corporation (boydsteamship.com/web)

**Positioning (verbatim)**: "AGENTS AT THE PANAMA CANAL SINCE 1909"; "We save you money" via forecasting, communications, "all inclusive rate", "one-stop-shop"; "get an answer within 2 hours ... 24/7"; "the oldest and largest ships' agency at the Panama Canal".

**Service taxonomy**: Panama Canal Transit (crew changes, spare parts & courier, cash to master, PCSOPEP), Owner/Husbandry Service (port call assistance, cargo operations, repairs, lay berth), Port Call Service, Fuel Delivery, Ship Repairs, Booking & Auction System, PCSOPEP Preparation; plus long menus of nautical equipment services, "products required by vessels", medical & provisions.

**Site structure**: Home, About Us, Services, Contact Us, Live Chat (WhatsApp), Login (account.boyd.com.pa statements portal); tools: Traffic/Booking Slot (Daily Traffic Report PDF), Weather, Transit Calculations (11 cargo-type calculators: general cargo, grain, coal, iron ore, container, vehicle carrier, reefer, tanker, chemical, LPG, LNG), Owners Matters Calculations, Quick Reference Guide for Panamax & Neopanamax, Panama Canal Facts, Request a Quote. Claims English and Spanish; `html lang="es"` with English content.

**Trust signals**: Since 1909; ISO badge in footer; "P & I coverage through ITIC for over 30 years"; team average "25 years experience"; stats counters (values not rendered); dual-city header Panama City / Colon.

**CTAs**: Request Free Quote form with cargo-type selector; WhatsApp +507 6090-4738; operations@boydsteamship.com; client login.

**Content**: One post ("We are Boyd Steamship Corporation"); newsletter PDF from 2021.

**SEO signals**: Title "Boyd Steamship - Agents at the Panama Canal"; no meta description; no schema; no analytics; no hreflang.

**Design quality: 5/10.** Serviceable WordPress with a lot of substance behind weak presentation; "/web/" subfolder and 302 from www hurt.

**Worth learning**: The most complete self-service toolkit: per-cargo transit calculators, daily traffic PDF, client statements portal, quote form by cargo type, "answer within 2 hours" SLA, "all inclusive rate" promise, ITIC professional indemnity cover as a trust signal.

---

## Synthesis

### A. Table stakes (what every credible Panama agency site shows)

1. Years at the Canal in the hero (1909, 1916, 1925, 2006, "20th year", "50 years"). A founding year is expected; Cross World's 2010 is fine if framed as 16 years and paired with stronger credentials.
2. "Both sides of the Canal": Balboa/Pacific and Cristobal/Atlantic contacts, separate phone numbers, duty officer cell, VHF where relevant.
3. 24/7 claim plus a concrete channel: WhatsApp (Orca, Boyd, 24Marine, Adimar, PSS), duty mobile, transit-desk email.
4. Canonical service taxonomy: Panama Canal Transit (booking slots, auction, PCSOPEP, 96-hour pre-arrival, toll guarantees) / Husbandry (crew change, CTM, spares and courier, provisions, medical, launch) / Protective or Owner's-Charterer's nominated agency / Port calls / Bunkering coordination / Surveys.
5. A quote or PDA request CTA on every page; some form of "nominate us" instruction.
6. A Panama Canal resource hub linking to ACP notices, booking system, webcams, weather, draft restrictions.
7. Licence language: "Panama Canal authorized agent", "authorized by the Panama Maritime Authority".
8. ISO 9001 badge (Boyd, Norton Lilly) and an ethics/whistleblower link (Fenton, NLI, Wilhelmsen) for corporate buyers.
9. English as the working language, with meta title and description per page.

### B. Gaps and opportunities nobody covers well

1. **Spanish (and Portuguese) content.** Zero competitors publish Spanish pages; Fenton and Boyd only set `lang="es"` on English pages. No hreflang anywhere. Latin American owners, charterers, traders and lawyers (Venezuela, Colombia, Ecuador, Peru, Mexico, Chile, Brazil) search in Spanish: "agente naviero Canal de Panama", "transito Canal de Panama costos", "inspeccion de bunker Panama", "reclamos maritimos Panama". Cross World's Venezuela and Brazil representation makes an EN/ES site (PT optional) a natural moat.
2. **Bunker survey education from the claims side.** Only Panama Ship Service explains bunker surveys, and as a repair-shop line item. Nobody explains the dispute chain: BDN vs sounding, MARPOL sample custody, ISO 8217 off-spec, short-delivery letters of protest, time bars, what a charterer should do in the first 24 hours at Balboa or Cristobal. Cross World combines surveyor + claims handler + agency and can own this.
3. **Marine claims and P&I correspondent work.** No Panama agency site has a claims page; GAC only at group level. Insurers, clubs and lawyers look for a local correspondent with surveyors: a "Marine Claims & P&I support in Panama" pillar (casualty attendance, cargo damage, stevedore damage, crew injury, security and arrest support) is uncontested.
4. **Ship-to-ship operations.** Leth lists "STS Operations" as one line; nobody has a page. Tanker principals and traders doing STS at Panama anchorages have no local reference content.
5. **Oil and bunker marketing.** No agency does this; only physical suppliers (Seven Ocean, Integr8) rank. Cross World should present it as a separate line with clear independence language (surveying and marketing kept in separate teams) to avoid a perceived conflict of interest.
6. **Transparent process.** Adimar writes about PDA transparency; Boyd promises "all inclusive rate"; nobody shows a step-by-step timeline (nomination, PDA in 24h, pre-arrival docs, boarding, transit, FDA within X days), a sample redacted PDA, or a document checklist as a page.
7. **Structured request flow.** Forms are generic contact forms. Boyd's cargo-type quote form is the closest. A port-call / transit request form with vessel particulars (IMO, LOA, beam, draft, cargo, ETA, services needed, principal type) plus WhatsApp fallback would be unique.
8. **Certifications beyond ISO 9001.** Nobody shows 14001, 45001 or 22000. Cross World's four ISOs, IMO number 5785507, AMP licence and ACP agency code, ISM internal auditor on staff, are a visible credential stack no competitor matches.
9. **Named experts (E-E-A-T).** Competitor content has either no byline or a content-writer byline. A Captain with ISM auditor credentials writing or signing the guides is a real differentiator for both Google and P&I clubs.
10. **Structured data and technical SEO.** Only 24Marine ships Service/Offer schema; nobody uses FAQ schema, LocalBusiness with two locations, or hreflang. Easy technical lead.
11. **Social proof.** Only 24Marine shows client logos and testimonials. Adimar's scanned evaluation forms are anonymous and unreadable. Named references, partner logos (Andrew Moore & Associates, Sabatino Pizzolante, Victoria Corporation, EcoGreen, White Glacier) and a representation map (Panama, Venezuela, Brazil, Aruba, Greece) would stand out.
12. **Data tools.** Leth (auction analytics), Boyd (calculators, daily traffic PDF), Adimar (daily waiting-time images), Wilhelmsen (toll calculator) each have one. A light "Canal status today" widget (waiting time by segment, draft restriction, next available slot, sourced from ACP advisories) plus a bilingual glossary would compete without a big build.

### C. Content topics competitors currently rank for that Cross World can target

Owned today by Adimar / PSS (attackable with better, expert-signed, bilingual versions):
- Panama Canal transit quote / pro-forma disbursement account (PDA) / agency fees explained
- Husbandry services in Panama, Balboa, Cristobal; crew change in Panama; ship provisions
- PCSOPEP authorized person; SOPEP compliance checklist; MARPOL at the Canal
- Neopanamax booking and slot auction (LoTSA); Cristobal anchorage guide; transit waiting times
- Bunker survey Panama; on-hire / off-hire survey; ship damage survey; deratting / SSCEC
- Bunkering in Panama (suppliers, grades, Balboa vs Cristobal)

Under-served topics Cross World should create first (EN + ES):
- Bunker quantity dispute at the Panama Canal: step-by-step for charterers (letters of protest, sampling, time bars)
- Bunker quality claims: ISO 8217, MARPOL sample, lab testing, what the surveyor must witness
- Cargo loss control and draft survey for bulk cargoes at Panamanian ports
- Ship-to-ship transfer at Panama anchorages: permits, service providers, agent's role
- P&I correspondent and marine claims handling in Panama: who to call, evidence preservation, security
- Cargo blending and off-spec management for oil traders using Panama as a hub
- ISM / ISPS / MLC audit preparation before a Canal transit (Captain Peña's credential)
- Vetting and pre-purchase condition surveys in Panama
- Owner's vs charterer's nominated agent vs protective agent at the Canal (decision guide)
- Sample PDA walkthrough for a Panamax bulk carrier and a product tanker
- Spanish cornerstone set: "Agente naviero autorizado por la ACP", "Como cotizar un transito por el Canal", "Inspeccion de bunker y reclamos", "Servicios de husbandry en Balboa y Cristobal"

Cadence recommendation: do not chase Adimar's 1,000-post volume. Two pillars (Transit & Husbandry; Surveys & Claims) with 20-25 cornerstone pages, FAQ schema, named author, dated review notes, and a monthly regulatory note (ACP advisories, draft, water levels) in both languages.

### D. Recommended positioning for Cross World

**Angle**: the only Panama Canal agency that combines a licensed transit and husbandry agency with in-house certified surveyors and claims handlers, under one accountable, ISO-certified team, serving Latin America and the Mediterranean in English and Spanish.

Working lines (to be refined):
- "Licensed at the Canal. Certified on board. Accountable for the claim."
- "Agency, surveys and claims at both ends of the Panama Canal, one team, one number, 24/7."
- Spanish: "Agencia, inspecciones y reclamos en el Canal de Panama. Un solo equipo, una sola llamada, 24/7."

Why this works against the field:
- Heritage is taken (1909, 1916, 1925); do not compete on age. Compete on credentials and integration.
- Scale is taken (GAC, Wilhelmsen, NLI); compete on senior attention (a Captain answers), speed (PDA in 24h, FDA in X days) and independence.
- Content volume is taken (Adimar/PSS); compete on expert-signed depth, Spanish, and the topics they do not cover (claims, STS, bunker disputes, oil marketing).

Trust block to build (all missing from competitors except ISO 9001):
- AMP licence, ACP authorized agency code, IMO 5785507
- ISO 9001, 14001, 45001, 22000 badges with certificate numbers
- Captain Guillermo Peña, ISM internal auditor, with photo, bio and signed guides
- Representation map: Panama (RBS Tower, Paitilla), Venezuela, Brazil, Aruba, Greece
- Partner logos: Andrew Moore & Associates, Sabatino Pizzolante, Victoria Corporation, EcoGreen, White Glacier
- Memberships to display or pursue: Camara Maritima de Panama, BIMCO (low cost, high visibility), IIMS or similar for the survey team, ITIC-style professional indemnity if held

Proposed site structure (EN/ES with hreflang):
- Home
- Services: Panama Canal Transit Agency; Husbandry & Port Calls; Bunker & Marine Surveys; Marine Claims & P&I Support; Ship-to-Ship Operations; Oil & Bunker Marketing; Maritime Consulting & ISM Audits
- Who we serve: Owners & managers; Charterers & traders; P&I clubs & insurers; Oil majors & terminals
- About: story since 2010, licences & certifications, people, partners & representation, ethics channel
- Resources: Canal guide, waiting times / draft / advisories, checklists, sample PDA, glossary, blog
- Request a port call or PDA (structured form) and Contact (24/7 duty phone, WhatsApp, Balboa and Cristobal, RBS Tower address)

Homepage CTA hierarchy: primary "Request a PDA in 24 hours" (structured form), secondary "WhatsApp duty officer", tertiary "Nominate Cross World" (copyable email block with agency code and details).

Technical checklist: fix `lang`, add meta descriptions, LocalBusiness with two service areas, Service and FAQ schema, hreflang EN/ES, analytics, fast static build, strip every industrial-template remnant, redirect legacy URLs, and register the brand on Google Business Profile so "Cross World" stops surfacing Cross Roads Agencies.

---

## Appendix: technical snapshot per site (homepage unless noted)

| Site | Platform | Title tag | Meta desc | Schema | hreflang | WhatsApp | Analytics | Blog size |
|---|---|---|---|---|---|---|---|---|
| adimarships.com | WordPress + Yoast | yes | yes | WebSite/Article/Person; BlogPosting on posts | no | yes | GA | 1,179 posts |
| panamashipservice.com | WordPress + Yoast | yes | yes | same as Adimar | no | yes | GA | 1,054 posts |
| gac.com/panama | corporate CMS, bot-blocked | yes (SERP) | yes (SERP) | unknown | no | no | unknown | Hot Port News |
| lethagencies.com/panama | custom, 23 KB | yes | yes, keyword-rich | none | no | no | GA | none, PDFs + analytics |
| orcashipsagents.com | ProcessWire | yes | yes | none | no | yes | GA | none |
| 24marine.com | WordPress | yes | yes | Service/Offer/Place/ContactPoint | no | yes | GA | none |
| cbfenton.com | WordPress (+WooCommerce leftovers) | brand only | none | none | no | link only | none | none |
| nortonlilly.com / .com.pa | WordPress (AIOSEO / Yoast) | yes | yes (typo on global) | Organization/Breadcrumb; Yoast on .pa | no | no | none seen | newsletter |
| wilhelmsen.com (Panama page) | enterprise CMS, 1.45 MB | weak generic | yes, dated | Organization | no | no | GA | Port News |
| boydsteamship.com/web | WordPress | yes | none | none | no | yes | none | 1 post, 2021 PDF |
| crossworldagency.com (baseline) | WordPress + Yoast | weak | none | WebSite/Organization (wrong content) | no | no | none | none |
