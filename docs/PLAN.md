# Cross World Agency · Plan maestro del sitio web

**Cliente:** Cross World Agency, S.A. (Panamá) · Capitán Guillermo A. Peña G. · contacto vía Irene (ECUS)
**Fecha:** 28 de agosto de 2026 · **Versión:** 1.2 · **Responsable:** ECUS Agency (Daniel Muñoz)
**Documentos hermanos:** [Especificación técnica](ESPECIFICACION-TECNICA.md) (stack, rutas, modelo de contenido, formularios, tabla de leads, webhook al CRM, analítica, SEO técnico, seguridad, CI, pruebas, migración) · [Contenido v0](CONTENIDO-v0.md) (borradores de home, 7 servicios, about, guía del Canal con cifras oficiales de la ACP, correos, anexo de Google Ads, outreach, LinkedIn) · [Sistema de diseño v0](design-system.html) (tokens, tipografía, componentes con estados, mock del hero, wireframe de la home) · [Competidores](competidores.md)
**Repositorio:** `munozospinad0/crossworld-agency` · **Página de avances:** GitHub Pages (`/docs`) · **Producción:** Vercel Pro

> Este documento es la fuente de verdad del proyecto: qué vamos a construir, por qué, para quién, con qué stack, cómo se mide y en qué orden. Todo lo que no esté aquí no existe. Se actualiza en cada fase.

**Índice:** 0 Resumen ejecutivo · 1 Diagnóstico del sitio actual · 2 El negocio · 3 Mercado y competencia · 4 Keyword research · 5 Estrategia SEO + GEO · 6 Arquitectura · 7 Personas e historias de usuario · 8 Dirección de diseño · 9 Stack técnico · 10 Blog · 11 Medición · 12 Roadmap por fases · 13 Insumos del cliente · 14 Decisiones y supuestos · **15 Especificación página por página · 16 Copy deck v0 · 17 Plan de adquisición (cómo traemos gente) · 18 Embudo y automatización · 19 Marca y materiales · 20 Operación y gobernanza · 21 Presupuesto · 22 Listas de seguimiento (keywords, prompts de IA, directorios, eventos) · 23 Roadmap semana a semana · 24 Checklist de lanzamiento · 25 Preguntas para la reunión de arranque**

---

## 0. Resumen ejecutivo

Cross World Agency es una **agencia naviera panameña fundada el 4 de marzo de 2010**, con licencia de la Autoridad Marítima de Panamá (AMP) y de la Autoridad del Canal de Panamá (ACP) para ejecutar tránsitos, número IMO 5785507, certificada **ISO 9001:2015, 14001:2015, 45001:2018 y 22000:2018**, dirigida por un capitán de marina mercante con credenciales de auditor interno ISM. Ofrece agenciamiento y tránsitos por el Canal, inspecciones marítimas (bunker, draft, precompra, P&I, escotillas), reclamos marítimos, operaciones ship-to-ship y offshore, comercialización de combustibles marinos (MGO/ULSD) y consultoría/brokerage marítimo. Tiene representación directa en Brasil, Aruba, Grecia y Venezuela.

**El sitio actual (WordPress) es un daño reputacional activo:** es una plantilla de "industrial manufacturing" sin editar. Habla de "Roller Chain Drives, Gear Couplings, Marine Bearings", promete "25 years of experience and 10+ awards" desde 1995, tiene contadores en 0 ("Products: 0, Years of Experience: 0"), no hay teléfono ni email ni dirección, no hay español, y el banner de cabecera dice "we are currently undergoing scheduled maintenance". Un armador griego u operador de P&I que llegue a esta página no llama.

**Qué vamos a construir:** un sitio bilingüe (EN principal, ES) en Next.js 16 sobre Vercel, con diseño premium de nivel Apple/editorial, arquitectura de servicios pensada para armadores, charterers, aseguradores y compradores de bunker, un centro de contenidos que capture el clúster de búsqueda del Canal de Panamá, optimizado para SEO clásico y para motores generativos (GEO), con medición completa de extremo a extremo (cada solicitud de port call, cotización o inspección trazada hasta su origen) y un CMS visual (Keystatic) para que la familia pueda publicar sin tocar código.

**Los tres números que definen la estrategia (Keyword Planner, agosto 2026):**

| Hallazgo | Dato | Implicación |
|---|---|---|
| El nicho transaccional es minúsculo en Google | "panama canal transit agent" 20/mes · "ship agency panama" 10-30 · "marine surveyor panama" 10 · "bunkering panama" 20 · todas con competencia **LOW** | Ser #1 es alcanzable en semanas, no años. Pero el sitio no puede depender solo de eso: los clientes llegan por referidos, directorios, LinkedIn y cada vez más por IA. |
| El clúster informativo del Canal sí tiene volumen | "panama canal fee/price/rates/cost" 880 · "how much does it cost to transit the panama canal" 480 · "panama canal toll" 320 · "panama canal schedule" 260 · "panama ship registry" 480 · "port of balboa" 1.900 · "port of cristobal" 1.600 · "manzanillo panama" 3.600 · ES: "puerto de balboa" 2.900, "cómo funciona el canal de panamá" 880-1.600, "autoridad marítima de panamá" 1.000 | Un blog/guía de autoridad sobre el Canal atrae a quien está planificando un tránsito. Es el imán de tráfico y la base para que la IA nos cite. |
| La marca ya existe pero es débil | "crossworld maritime agency" 30/mes · "cross world agency" 10 · vs "gac panama" 1.300, "norton lilly panama" 480, "cb fenton" 260, "inchcape panama" 210 | Hay que construir entidad: NAP consistente, schema Organization, perfiles y directorios, y contenido firmado por el capitán (E-E-A-T real). |

---

## 1. Diagnóstico del sitio actual (crossworldagency.com)

Auditoría hecha el 27-ago-2026 sobre la home y `/about/`.

| Área | Estado | Gravedad |
|---|---|---|
| Contenido | Plantilla "industrial manufacturing" sin editar: productos de engranajes y cadenas, "Since 1995", "10+ awards", contadores en 0. Cero mención de agencia naviera, Canal, inspecciones o bunker. | **Crítica** (reputación) |
| Datos de contacto | No hay teléfono, email ni dirección visibles. El banner dice "scheduled maintenance". | **Crítica** (conversión) |
| Idiomas | Solo inglés, sin hreflang. Sus mercados ES (Venezuela, Colombia, flotas atuneras) no tienen versión. | Alta |
| SEO on-page | Título "About - Cross world agency"; sin meta descriptions reales; sin schema; sin sitemap curado; fotos de stock genéricas. | Alta |
| Confianza | No muestra ISO, licencias AMP/ACP, IMO, capitán, socios, ni clientes. Todo eso existe en el company profile y no está en la web. | Alta |
| Tecnología | WordPress con tema comercial; `/wp-content/uploads/`; CTA "Take Action" duplicado; copyright 2026. | Media |
| Diseño | Genérico, sin identidad, no comunica operación marítima. | Media |

**Decisión:** rehacer desde cero (modo *overhaul*), conservando el dominio y redirigiendo (301) las URLs viejas (`/`, `/about/`, `/products/`, `/projects/`, `/contact/`) a las nuevas para no perder lo poco que haya indexado.

---

## 2. El negocio, en la voz del cliente (fuente: Company Profile 2025)

- **Razón social:** Cross World Agencies, S.A. · RUC 1675308-1-680680 DV 34 · IMO Nº 5785507.
- **Fundación:** 4 de marzo de 2010, bajo licencia de agencia marítima de la AMP y licencia de la ACP para ejecutar tránsitos por el Canal.
- **Qué hace:** agencia naviera (shipping agency), proyectos de carga, brokers y consultores marítimos, inspecciones navales, desarrollo de proyectos industriales, asesoría marítima. Accionista principal de **SOS Resilience Holding** (comercializadora de combustibles).
- **Experiencia declarada:** manejo de carga contenerizada, líquida y a granel; desarrollo de proyectos; operación de plataformas offshore; maniobras ship-to-ship; terminales petroleros. Asistencia a cruceros comerciales, tanqueros, remolcadores, barcazas, plataformas y buques de petcoke.
- **Cobertura:** sin restricciones en puertos panameños; representación directa en **Brasil, Aruba, Grecia y Venezuela**; relación cercana con terminales y autoridades locales.
- **Operaciones petroleras:** venta de productos refinados almacenados en Panamá bajo contratos CIF y FOB para clientes de Centroamérica, el Caribe y Suramérica; suministro a flotas atuneras; meta de operar 2 a 5 embarques mensuales de MGO/ULSD.
- **Catálogo de inspecciones (página 7 del profile):**
  - *Bulk cargo quantity measurement:* draft surveys, petroleum surveys (crude / products).
  - *Bunker surveys:* BSIS (bunker stem investigative), on/off hire, investigative, protective surveyor / superintendent during bunkering, sludge disposal / discharge, "bad" bunker dispute claims.
  - *Bunker claims:* overconsumption, voyage underperformance, post-bunker dispute.
  - *Marine claims:* dry cargo container, reefer container, steel out-turn, railroad/trucking, P&I crew personal injury, ports & terminals, charterers' liability, PE & HHG.
  - *Technical surveys:* pre-purchase inspections, tank corrosion assessment, P&I vessel condition, hatch cover integrity (ultrasonic), load/stow/securing, ISM audits, pollution & safety advisory, marine expeditors & loss control, project cargo warranty & risk management.
- **Certificaciones:** ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, ISO 22000:2018 (emitidas por IAS / IAF). Capitán Guillermo Peña: ISM Code Internal Auditor (ABSG Consulting Venezuela), Seafarers Training Center, NFPA / Texas Engineering Extension Service, Maersk Training Centre.
- **Socios y clientes mostrados:** Andrew Moore & Associates S.A., Victoria Corporation, Sabatino Pizzolante (servicios marítimos y comerciales), EcoGreen, White Glacier.
- **Visión:** ser reconocidos por clientes y armadores nacionales e internacionales como la agencia naviera más confiable del Caribe.
- **Contacto:** RBS Tower, piso 9, oficina 902, Paitilla, Panamá · +507 6266-4242 · +507 383-0128 · +507 6842-8902 · gpena@crossworldagency.com · agencycrossworld@gmail.com.

**Lo que hay que confirmar con Irene/Guillermo antes de escribir contenido final:** ver sección 13 (checklist de insumos).

---

## 3. Mercado y competencia

### 3.1 Contexto del mercado (2026)
- El Canal operó **6.288 tránsitos entre octubre 2025 y marzo 2026** (+224 interanual), 34-37 tránsitos diarios y picos de 40+, con calado pleno de 50 pies para Neopanamax tras recuperarse los niveles de agua. Ingresos del año fiscal en el orden de USD 5.700 millones.
- **Ventas de bunker en Panamá: 427.985 t en julio 2026 (+10,5% interanual)**, con Balboa y Cristóbal concentrando más del 90% del tráfico regional de abastecimiento. El mercado de bunker survey y de disputas de calidad/cantidad crece con él.
- La crisis de Ormuz de 2026 disparó exportaciones energéticas de EE.UU. por el Canal (LNG, LPG, productos): más tanqueros = más demanda de agentes, STS y surveys de petróleo. Justo el perfil de Cross World.

### 3.2 Quién compite por los mismos clientes
| Competidor | Tipo | Qué hace bien en web | Búsquedas de marca/mes |
|---|---|---|---|
| **GAC Panama** | Global (GAC Group) | Páginas de servicio por puerto, formulario de port call, red mundial, contenido corporativo sólido. | 1.300 |
| **Norton Lilly Panama** | Regional (EE.UU./LatAm) | Marca fuerte, 24/7, integración con Canal. | 390-480 |
| **C.B. Fenton & Co.** | Local histórico (desde 1900s) | Reconocimiento local, autoridad. | 210-260 |
| **Inchcape Shipping Services** | Global | Plataforma digital, contenido de puertos. | 210 |
| **Wilhelmsen Ships Service** | Global | Portal de port call, contenido técnico. | 70-90 |
| **Adimar Shipping** | Local mediano | **La máquina de contenido**: 1.179 posts en el sitemap, un post por día en agosto 2026 escrito por un redactor (no marino), todos "2026 guide". Tiene 8 de los primeros resultados para "Panama Canal transit quote / PDA" y domina "husbandry services Panama". Hub del Canal con FAQ, webcams, clima y proyecciones diarias de espera con suscripción. | 90 |
| **Panama Ship Service** | Sitio hermano de Adimar (surveys y reparaciones) | 1.054 posts con la misma cadencia. Su página de Surveys es lo más cercano a educación de bunker survey en el mercado (tolerancias, ROB, muestreo), pero vendido como línea de taller, no como protección del reclamo. "Bunker Detective" como nombre memorable. | 20-30 |
| **Boyd Steamship** | Local histórico (1909) | El kit de autoservicio más completo: 11 calculadoras de tránsito por tipo de carga, reporte diario de tráfico, portal de estados de cuenta, "respuesta en 2 horas 24/7", tarifa "all inclusive", cobertura P&I de ITIC como señal de confianza. Presentación débil. | 50 |
| **Leth Agencies** | Regional (canales: Suez, Panamá, Turquía) | "Panama Analytics": estadísticas diarias de la subasta de slots por segmento, buscador de próximo slot, calado vigente. 15 PDFs sin formulario. BIMCO y MACN. Inchcape es accionista mayoritario desde 2024. | 140 |
| **Orca Ships Agents** | Local | Lidera con la licencia: H1 "Panama Canal Authorized Agent", "Authorized by Panama Maritime Authority". Directorio de terminales petroleros. WhatsApp y VHF 12/16. | 30-40 |
| **24 Marine** | Surveyor independiente (Panamá, EE.UU., Canadá, Venezuela) | El mejor modelo para nuestras páginas de survey y claims: "Why it matters / Scope / Who it's for (owners, insurers, charterers, P&I) / Deliverables / FAQ". Único con schema `Service`/`Offer`, 37 logos de clientes, testimonios y video real. | n/d |

**Lo que todos muestran (table stakes):** año de fundación en el hero; contactos separados de Balboa (Pacífico) y Cristóbal (Atlántico); 24/7 con un canal concreto (WhatsApp, celular de guardia, VHF); taxonomía canónica (Canal Transit / Husbandry / Protecting agency / Port calls / Bunkering / Surveys); CTA de cotización o PDA en cada página; hub de recursos del Canal (avisos ACP, booking, webcams, calado); lenguaje de licencia ("Panama Canal authorized agent"); ISO 9001 y canal de ética para compradores corporativos. **Ninguno** tiene español ni hreflang (Fenton y Boyd incluso declaran `lang="es"` con contenido en inglés), casi ninguno tiene schema, y solo 24Marine muestra logos y testimonios.

**Alerta de marca:** las búsquedas de "Cross World" hoy devuelven a **Cross Roads Agencies S.A.** (crossroadspanama.com), un competidor con nombre confundible. Google Business Profile, schema `Organization` y contenido firmado son la forma de separar la entidad.

(Informe completo con perfil de cada competidor, taxonomía, CTAs, contenidos y ficha técnica: `docs/competidores.md`.)

### 3.3 Lo que nadie hace bien (nuestras oportunidades)
1. **Nadie combina agencia + surveys + bunker + claims bajo un solo capitán.** Los globales son agencias; los surveyors son surveyors. Cross World puede vender "un solo responsable para todo el port call", con la credibilidad de un capitán que audita ISM.
2. **Español casi inexistente.** Ninguno de los locales tiene sitio bilingüe serio. Los mercados de Venezuela, Colombia, Ecuador (atuneros) y Centroamérica buscan en español ("agencia naviera panamá", "agente naviero", "trasiego de combustible", "puerto de balboa" 2.900/mes).
3. **Transparencia de proceso.** Nadie explica qué pasa desde que mandas el ETA hasta que el buque sale: PDA, booking, documentación ACP, inspecciones, FDA. Una guía paso a paso con tiempos es contenido que Google y la IA premian.
4. **Educación de bunker survey y disputas.** Con las ventas de bunker creciendo 10%, "cómo evitar una disputa de bunker en Panamá" no tiene un dueño en la SERP.
5. **GEO.** Ninguno tiene `llms.txt`, schema completo ni contenido con respuestas directas. Quien lo haga primero se convierte en "la fuente" que ChatGPT/Perplexity citan cuando alguien pregunta "who is a reliable ship agent in Panama".
6. **Reclamos marítimos y trabajo de corresponsal P&I.** Ninguna agencia panameña tiene página de claims (GAC solo a nivel grupo). Aseguradores, clubes y abogados buscan un corresponsal local con surveyors propios: pilar sin competencia.
7. **Ship-to-ship y comercialización de combustible.** Leth lo menciona en una línea; nadie tiene página. Cross World lo presenta como líneas propias, con lenguaje claro de independencia (survey y comercialización en equipos separados) para evitar conflicto de interés percibido.
8. **Solicitud estructurada + proceso visible.** Todos usan formularios genéricos. Un formulario de port call con datos del buque (IMO, LOA, manga, calado, carga, ETA, servicios, tipo de principal) y una línea de tiempo pública (nominación → PDA en 24 h → documentos de pre-arribo → abordaje → tránsito → FDA en X días) con un PDA de muestra es único en el mercado.
9. **Credenciales que nadie iguala.** Cuatro ISO (los demás muestran solo 9001 o ninguna), IMO 5785507, licencia AMP, código de agencia ACP y un capitán auditor ISM firmando las guías. Es el bloque de confianza del sitio.
10. **Herramientas ligeras.** Leth (analítica de subasta), Boyd (calculadoras), Wilhelmsen (calculadora de peajes) y Adimar (proyección de espera) tienen una cada uno. Un widget bilingüe "Estado del Canal hoy" (espera por segmento, calado vigente, próximo slot, con fuente ACP) y un glosario compiten sin una gran construcción. Fase 2.

### 3.4 Posicionamiento propuesto
**Ángulo:** la única agencia del Canal de Panamá que combina agencia de tránsito y husbandry licenciada con surveyors certificados y manejo de reclamos en casa, bajo un solo equipo responsable con cuatro ISO, en inglés y español, para Latinoamérica y el Mediterráneo. No competimos por antigüedad (1909, 1916, 1925 ya están tomados) ni por escala (GAC, Wilhelmsen): competimos por credenciales, integración, atención senior (contesta un capitán) y velocidad.

**Líneas de trabajo (a refinar con Irene):**
- EN: *Licensed at the Canal. Certified on board. Accountable for the claim.*
- EN: *Agency, surveys and claims at both ends of the Panama Canal. One team, one number, 24/7.*
- ES: *Agencia, inspecciones y reclamos en el Canal de Panamá. Un solo equipo, una sola llamada, 24/7.*
- ES: *Agencia naviera, inspecciones y bunker en el Canal de Panamá, bajo el mando de un capitán.*

**Jerarquía de CTAs en la home:** primario "Request a PDA in 24 hours" (formulario estructurado), secundario "WhatsApp duty officer", terciario "Nominate Cross World" (bloque copiable con datos de la agencia y código ACP).

Pilares de mensaje: (1) licencia AMP + ACP y 15 años de tránsitos; (2) un capitán al frente, auditor ISM, con 4 ISO; (3) cobertura total del port call: agencia, surveys, claims, combustible; (4) red propia en Brasil, Aruba, Grecia y Venezuela; (5) 24/7 con respuesta de PDA en menos de 24 horas (SLA a confirmar con Guillermo).

Lo que NO vamos a decir: nada que no controlemos (ver regla de anuncios de Daniel): no prometemos tiempos de tránsito ni precios del Canal, solo los comunicamos con fuente.

---

## 4. Keyword research (Google Ads Keyword Planner, 27-ago-2026)

**Método:** 3 pasadas con `KeywordPlanIdeaService.generateKeywordIdeas` (token de Merge, cuenta hija del planner), 23 meses de histórico (sep-2024 a jul-2026) con CPC promedio: **inglés mundial** (2.685 keywords), **inglés Panamá+EE.UU.** (2.541) y **español Panamá+Colombia+Venezuela+México** (343). Semillas propias por segmento + semillas de URL de 6 competidores. Deduplicación por concepto (Google reporta el mismo volumen para variantes cercanas; sumar la lista cruda infla el mercado ~25%). Filtro de exclusión de ruido (turismo, "marketing agency", "survey world", envíos de paquetes, empleo, historia). Datos completos en `research/keyword-research-crossworld.csv` (5.569 filas clasificadas).

### 4.1 Mapa de keywords objetivo por página

Volúmenes = búsquedas/mes, pasada indicada. CPC en USD (convertido de COP a ~4.100).

**A. Páginas de servicio (intención comercial, geo Panamá)**

| Página | Keyword principal | Vol. | Comp. | Secundarias |
|---|---|---|---|---|
| Ship agency & Canal transit | panama canal transit agent | 20 (+83% yoy) | LOW | panama canal agent 30-40 (+18/79%) · panama shipping agency 10-30 · panama shipping agency and services 20 · ship agent panama · panama canal booking 260-320 (HIGH, dominada por ACP; se ataca con contenido) · panama canal pre booking 10 · crew change panama 10 |
| Marine surveys | marine surveyor panama | 10 | LOW | marine survey 2.900-8.100 (global) · draft survey 1.600 · condition surveys 320 (+488%) · petroleum inspection 210 · marine inspection 140 · underwater inspection of ships 140 · survey vessel 1.600 |
| Bunker surveys & claims | bunker survey (dentro de "ship & bunker" 4.400) | | LOW | bunker cost 480-720 · bunker rates 260-2.900 · bunker pricing 210-2.400 · bunker quality dispute · on hire / off hire bunker survey |
| Bunkering & oil operations | bunkering panama | 10-20 | LOW | marine fuel panama 10 · bunker fuel panama 10 · mgo panama 10 · marine fuels 880-2.400 · fuel for ship 390-2.900 (+55%) · ES: combustible de barco 170 (+137%), combustible para barcos 110 (+98%), trasiego de combustible 210 |
| Ship-to-ship & offshore | sts panama | 40 | LOW | ship to ship transfer 140-1.900 · ship to ship transfer guide 210 · offshore services 140-1.300 · maritime offshore 260 (+48%) · ES: plataformas offshore 210 |
| Marine claims | cargo claims | 260 | LOW | marine claims · container damage claims · charterers liability claims · p&i claims handling |
| Consulting & brokerage | maritime consulting | 90-590 | LOW | ship broker 720-3.600 · chartering broker 880-1.600 · chartering services 590-1.600 · maritime services panama 10-20 · ship management panama 10 · ES: contratos de fletamento 140, agente naviero 210, agencia naviera 170 |
| Home / marca | panama shipping company | 210-320 | LOW | shipping agency panama · agencias navieras en panamá 30 · navieras en panamá 20 · agencias marítimas en panamá 10 · crossworld maritime agency 30 · cross world agency 10 |

**B. Guías y blog (intención informativa, imán de tráfico y de citas de IA)**

| Pieza (pilar) | Keywords que agrupa | Vol. agregado |
|---|---|---|
| **Panama Canal transit cost & tolls 2026** | panama canal fee/price/rates/cost 880 (PA+US 390) · how much does it cost to transit/pass/go through the panama canal 480+ · panama canal toll 320 · cost to go through panama canal 320 · panama canal transit fee 170 · crossing fee 170 · cost per ship 90 · transit cost 40 | ~2.900 |
| **How to book a Panama Canal transit (booking, slots, PDA)** | panama canal booking 320 · booking system 10 · pre booking 10 · panama canal schedule 260 · ship schedule 170 · transit schedule 140 (+15%) · schedule today 50 · vessel schedule 40 | ~1.000 |
| **Panama Canal requirements, draft & transit time** | panama canal draft restrictions 50 (+19-122%) · panama canal transit time 90 · panama canal water levels 260 · neopanamax | ~450 |
| **Port of Balboa guide** | port of balboa 1.900 · balboa port panama 1.900 · balboa port terminal 880 · ES: puerto de balboa 2.900, puerto balboa 1.300 | ~5.000 (EN+ES) |
| **Port of Cristóbal & Colón guide** | port of cristobal 1.600 · cristobal panama 1.300 · ES: puerto de colón 170, navieras en colon 20 | ~3.000 |
| **Port of Manzanillo (MIT) guide** | manzanillo panama 3.600 · manzanillo panama port 590 | ~4.000 |
| **Panama Maritime Authority & Panama ship registry explained** | panama maritime authority 1.000 · panama ship registry 480 · panama canal authority 1.600 · ES: autoridad marítima de panamá 1.000 (+98%) | ~4.000 |
| **Bunker prices in Panama: what drives them** | bunker rates 2.900 · bunker cost 720 · bunker pricing 2.400 · ES: gasoil marino precio | ~6.000 (global) |
| **Bunker survey & bunker disputes guide** | bunker survey · bunker quality dispute · bunker delivery note · on/off hire bunker survey | long tail |
| **Draft survey explained** | draft survey 1.600 (ES 90) | ~1.700 |
| **Pre-purchase inspection checklist** | pre purchase survey vessel · condition surveys 320 (+488%) | ~500 |
| **Ship-to-ship transfer guide** | ship to ship transfer guide 210 · sts panama 40 | ~2.000 |
| **Crew change in Panama: rules & logistics** | crew change panama 10 · crew change regulations panama | long tail, alto valor |
| **Cómo funciona el Canal de Panamá (para armadores y operadores)** ES | canal de panamá cómo funciona 880+720 · esclusas del canal 210-880 · esclusas de gatún 480 · cuánto cuesta cruzar el canal 50-70 · reserva de tránsito · calado | ~3.000 |

**C. Conquest (competidores):** no se compra en Google (regla: no pagar marcas ajenas sin retorno), pero sí se publica una **comparativa honesta "Ship agents in Panama: how to choose (2026)"** que capture "gac panama" 1.300, "norton lilly panama" 480, "cb fenton" 260, "inchcape panama" 210, "adimar shipping" 90 y explique qué preguntar a un agente. Es la pieza tipo "best-of" que los LLM citan.

### 4.2 Estacionalidad
En la pasada Panamá+EE.UU. la demanda de servicios marítimos tiene **picos en diciembre (2,08x) y enero (1,85x)** y un valle profundo en **agosto (0,39x)**. En español el patrón es más plano, con picos en septiembre-octubre (1,22x) y marzo-mayo. Implicación: lanzar el sitio y el contenido pilar **antes de noviembre** para llegar al pico con autoridad acumulada.

### 4.3 Lo que se descartó a propósito
Volumen alto que no es nuestro mercado: "panama canal" genérico (368.000, turismo/historia), "agency marketing" (135.000), "freight forwarding agency" (74.000), "vehicle shipping agent" (8.100), "survey world" (49.500), cruceros, tours, empleos, Miraflores Visitor Center. Meterlas al sitio traería tráfico basura y bajaría la tasa de conversión.

---

## 5. Estrategia SEO + GEO

### 5.1 SEO técnico (checklist de salida)
- Next.js con **render en servidor** para todo el contenido (la IA y Google no esperan JS).
- `robots.txt` que **permita explícitamente** GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Bingbot, meta-externalagent. `sitemap.xml` generado desde el contenido (sin `priority`/`changefreq`, con `lastmod` real).
- **hreflang** `en` / `es` + `x-default=en`, URLs `/en/...` y `/es/...`, recíprocos y autorreferenciados.
- **Schema.org JSON-LD:** `Organization` (con `sameAs` a LinkedIn, GBP, directorios; `iso6523Code`/RUC; `foundingDate` 2010-03-04), `ProfessionalService` (NAP, geo, horario 24/7, `areaServed` Panamá + Caribe), `Service` por página de servicio (con `serviceType`, `provider`, `areaServed`), `Person` (Capitán Guillermo Peña, `hasCredential`, `jobTitle`), `Article` + `author` en el blog, `BreadcrumbList`. FAQ como contenido visible (no como rich result, que Google ya no muestra fuera de gobierno/salud).
- Core Web Vitals objetivo: **LCP < 2,0 s, INP < 150 ms, CLS < 0,05**, Lighthouse ≥ 95 en móvil en todas las plantillas. Imágenes AVIF/WebP vía `next/image`, fuentes con `next/font` (sin FOIT), `priority` en la imagen del hero.
- Cabeceras de seguridad (HSTS, CSP con nonce, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) vía `next.config`/middleware.
- Redirecciones 301 desde las URLs viejas de WordPress; canonical en todas las páginas; sin parámetros indexables; 404 útil.
- `llms.txt` y `llms-full.txt` en la raíz con el índice curado de servicios y guías.
- OG images dinámicas (`next/og`) por página y por post.
- Google Search Console + Bing Webmaster Tools + IndexNow desde el día 1.

### 5.2 Contenido y E-E-A-T
- Cada página de servicio: **respuesta directa en las primeras 2 líneas**, qué incluye, qué entregamos (PDA, FDA, informe de survey con fotos, etc.), en qué puertos, tiempos, qué necesitamos del cliente, CTA. Mínimo 600 palabras únicas; nada de plantilla repetida entre servicios.
- Cada guía: quién la firma (Capitán Guillermo Peña, con bio y credenciales), fecha de publicación **y de última revisión**, cifras con fuente (ACP, AMP, S&P Global/Manifold Times para bunker), pasajes citables de 130-200 palabras, tabla o lista donde aplique, bloque de preguntas frecuentes visible.
- Página "About" con historia real (2010, licencias, ISO con fechas), equipo con fotos reales, red de representación, socios (con permiso).
- Casos: 3 a 5 "port call stories" anonimizadas (tipo de buque, puerto, problema, solución, tiempo). Son el contenido que más confianza genera en B2B marítimo.

### 5.3 GEO (Generative Engine Optimization)
Objetivo: cuando alguien pregunte a ChatGPT, Perplexity, Gemini o Copilot *"ship agent in Panama"*, *"who can do a bunker survey in Balboa"* o *"agencia naviera confiable en Panamá"*, que Cross World aparezca citado.
1. **Accesibilidad para IA:** robots abiertos a los bots, SSR, sin contenido tras interacción.
2. **Claridad de entidad:** mismo nombre, dirección, teléfono y descripción en el sitio, LinkedIn, Google Business Profile, Cámara Marítima de Panamá, directorios de agentes (FONASBA/ASBA si aplica, ShipServ, Lloyd's List Intelligence, Panama Maritime Directory), y en `Organization` schema con `sameAs`.
3. **Contenido citable:** respuestas directas, datos con fuente, listas y tablas, definiciones ("A protecting agent is..."), y la comparativa "how to choose a ship agent in Panama".
4. **Frescura:** las guías del Canal se revisan cada trimestre (peajes, calado, slots cambian) con fecha visible.
5. **Presencia fuera del sitio:** notas en medios marítimos (Mundo Marítimo, Panamá América, Ship & Bunker si hay dato), LinkedIn del capitán con artículos, respuestas en foros del sector. La IA cita lo que ve repetido en fuentes que ya confía.
6. **Medición:** sondeo mensual de 12 preguntas en 4 motores (ChatGPT, Perplexity, Gemini, Claude) registrando si citan `crossworldagency.com`. Meta: 0 → 4 de 12 en 6 meses.

### 5.4 Local SEO
- Google Business Profile como "Shipping agency" en RBS Tower, Paitilla, con fotos reales, horario 24/7, servicios cargados, y flujo de reseñas de clientes y socios.
- Página de contacto con mapa, NAP idéntico al schema, WhatsApp Business.
- Perfiles en Bing Places y Apple Business Connect (mismo NAP).

---

## 6. Arquitectura del sitio

Idiomas: `/en` (principal, x-default) y `/es`. Navegación de una sola línea, máximo 6 ítems + CTA.

```
/                                  → redirige por idioma del navegador a /en o /es
/en
├── /services                      Hub de servicios (6 bloques)
│   ├── /ship-agency-panama-canal-transit   Agencia, tránsitos, husbandry, crew change, booking/PDA, protecting agent
│   ├── /marine-surveys                     Draft, petroleum, precompra, condición P&I, escotillas ultrasonido, ISM, loss control
│   ├── /bunker-surveys-and-claims          BSIS, on/off hire, cantidad/calidad, disputas, sobreconsumo
│   ├── /bunkering-and-oil-operations       MGO/ULSD, suministro a flotas, CIF/FOB, SOS Resilience
│   ├── /ship-to-ship-and-offshore          STS, terminales, plataformas, petcoke
│   ├── /marine-claims                      Carga, contenedores, reefer, acero, P&I, charterers
│   └── /maritime-consulting-and-brokerage  Chartering, proyectos, asesoría
├── /who-we-serve                   4 páginas por tipo de cliente (cómo compran, qué necesitan, qué entregamos)
│   ├── /shipowners-and-managers · /charterers-and-traders · /pandi-clubs-and-insurers · /fishing-fleets-and-regional-operators
├── /panama-canal-transit-guide     Pilar: costo/peajes, booking, requisitos, calado, tiempos, rol del agente
├── /resources                      Hub: avisos ACP, calado vigente, checklists, PDA de muestra, glosario EN/ES, "Estado del Canal hoy" (fase 2)
├── /ports                          Hub de puertos
│   ├── /balboa · /cristobal · /colon · /manzanillo · /psa-panama · /rodman   (solo los que atienden)
├── /about                          Historia, capitán, equipo, red (BR/AW/GR/VE), socios, canal de ética
├── /certifications                 ISO 9001/14001/45001/22000, licencias AMP/ACP, IMO, credenciales del capitán
├── /insights                       Blog (categorías: Panama Canal · Surveys · Bunker · Claims · Company)
│   └── /insights/[slug]
├── /contact                        Formulario "Request a port call / quote" + WhatsApp + teléfonos 24/7 + mapa
├── /request-port-call              Formulario largo (buque, IMO, ETA, puertos, servicios) → PDA
├── /privacy · /terms
/es  (espejo con slugs en español: /servicios, /agencia-naviera-transito-canal-de-panama, /inspecciones-maritimas, /guia-transito-canal-de-panama, /puertos, /nosotros, /certificaciones, /blog, /contacto, /solicitar-port-call)
/llms.txt · /llms-full.txt · /sitemap.xml · /robots.txt · /rss.xml
```

Reglas: cada página de servicio tiene su propio H1, resumen de 2 líneas, secciones "Qué incluye / Qué entregamos / Puertos / Cómo empezar", FAQ y CTA. Sin páginas de puerto "de relleno": solo las que realmente atienden y cada una con contenido único (terminal, operador, restricciones, bunker disponible, distancia al Canal).

---

## 7. Personas e historias de usuario

### 7.1 Personas
| Persona | Quién es | Qué busca | Qué le preocupa |
|---|---|---|---|
| **Nikos**, Operations Manager, ship manager en Atenas | Planea 3-4 tránsitos al año por Panamá | Agente confiable, PDA rápido, booking del Canal, crew change | Sorpresas en la FDA, demoras, agente que no contesta a las 3 a.m. |
| **Lauren**, Claims Handler en un P&I Club (Londres) | Necesita un surveyor en Balboa mañana | Credenciales, cobertura de puertos, informe con fotos en 48 h | Independencia del surveyor, calidad del informe |
| **Rafael**, trader de combustibles (Houston/Panamá) | Compra/vende MGO y necesita surveys de cantidad y STS | Bunker quantity survey, STS con mooring master, disponibilidad 24/7 | Disputas de cantidad, pérdidas, cumplimiento |
| **Don Aurelio**, armador de flota atunera (Ecuador/Panamá) | Abastece combustible y usa agencia en español | Precio, confianza, trato directo, WhatsApp | Que no le hablen en inglés técnico; que le cobren de más |
| **Guillermo**, el capitán (dueño) | Quiere que la web venda por él y publicar sin depender de nadie | Recibir solicitudes ordenadas, editar textos y subir un post | Que se vea serio; no perder tiempo con tecnología |
| **Irene / ECUS** | Gestiona el proyecto y la pauta | Ver avances, leads y métricas; no depender de un desarrollador para cada cambio | Que los leads se pierdan; que no se pueda medir |

### 7.2 Historias de usuario (formato: como / quiero / para; criterios de aceptación; prioridad MoSCoW)

**Épica A · Convertir visitantes en solicitudes**
- **A1 (Must)** Como Nikos, quiero enviar una solicitud de port call con nombre del buque, IMO, ETA, puerto(s) y servicios, para recibir una PDA sin intercambiar 10 correos. *Criterios:* formulario de 2 pasos con validación inline; autocompletado de buque por IMO (fase 2); confirmación inmediata por email al cliente y notificación a Cross World (email + WhatsApp); registro del origen (página, campaña, idioma); tiempo de llenado < 3 min en móvil.
- **A2 (Must)** Como Lauren, quiero pedir un surveyor indicando tipo de survey, puerto y fecha, para que me confirmen disponibilidad el mismo día. *Criterios:* formulario corto específico de surveys; menú con los tipos reales del catálogo; adjuntar instrucciones (PDF); SLA visible ("respondemos en menos de 4 horas, 24/7").
- **A3 (Must)** Como cualquier visitante, quiero un botón de WhatsApp y el teléfono 24/7 siempre visibles, para hablar con alguien ahora. *Criterios:* botón flotante discreto en móvil; clic medido como evento; mensaje prellenado con la página de origen.
- **A4 (Should)** Como Rafael, quiero pedir una cotización de MGO/ULSD con cantidad, puerto y fecha, para comparar rápido. *Criterios:* formulario de cotización de combustible; campos en toneladas; aviso legal de sujeto a disponibilidad.
- **A5 (Could)** Como Nikos, quiero descargar el company profile en PDF, para adjuntarlo a mi aprobación interna. *Criterios:* PDF rediseñado, descarga medida, sin formulario obligatorio.

**Épica B · Confianza y prueba**
- **B1 (Must)** Como Lauren, quiero ver las credenciales del capitán, las ISO con fechas y las licencias AMP/ACP, para justificar el nombramiento ante mi club. *Criterios:* página de certificaciones con imágenes legibles y vigencias; schema `Person` con `hasCredential`.
- **B2 (Must)** Como Nikos, quiero ver qué puertos atienden y con qué terminales trabajan, para saber si me sirven. *Criterios:* páginas de puerto únicas; mapa; datos actualizados con fecha.
- **B3 (Should)** Como cualquier visitante, quiero leer casos reales (anonimizados) de port calls y surveys, para entender cómo trabajan. *Criterios:* 3-5 casos con problema/solución/tiempo; sin nombres de clientes sin permiso.
- **B4 (Should)** Como visitante, quiero ver socios y clientes con logo, para reconocer nombres. *Criterios:* solo logos con permiso escrito; sin etiquetas debajo.

**Épica C · Encontrar respuestas (SEO/GEO)**
- **C1 (Must)** Como Nikos, quiero saber cuánto cuesta y cómo se reserva un tránsito por el Canal, para presupuestar. *Criterios:* guía pilar con tablas de peajes por tipo de buque con fuente ACP y fecha, explicación de slots y booking, rol del agente, FAQ; respuesta directa arriba; fecha de última revisión.
- **C2 (Must)** Como armador hispanohablante, quiero leer todo en español, para decidir sin traducir. *Criterios:* 100% del sitio traducido por humano (no automático), hreflang correcto, switch de idioma que mantiene la página.
- **C3 (Should)** Como Lauren, quiero entender qué es un bunker survey y cómo se evita una disputa, para instruir bien al surveyor. *Criterios:* guía con checklist descargable.
- **C4 (Should)** Como visitante desde ChatGPT/Perplexity, quiero llegar a una página que responda exactamente lo que pregunté, para no rebotar. *Criterios:* cada guía tiene TL;DR, definiciones y pasajes citables; `llms.txt` publicado.

**Épica D · Operación del sitio (Guillermo, Irene, ECUS)**
- **D1 (Must)** Como Guillermo, quiero editar textos y publicar un post desde una pantalla sencilla, para no depender de nadie. *Criterios:* Keystatic en `/keystatic` con login por GitHub; campos con ayudas; vista previa; publicación = commit + deploy automático en < 3 min.
- **D2 (Must)** Como Irene, quiero ver de dónde vienen las solicitudes (página, idioma, campaña) y cuántas hay por semana, para decidir la pauta. *Criterios:* GA4 con eventos por tipo de formulario; panel semanal (Looker Studio o el pipeline de reportes ECUS); cada lead con `utm_*`, `gclid`, `fbclid` y página de origen guardados.
- **D3 (Must)** Como ECUS, quiero previews por cada cambio y rollback en un clic, para no romper producción. *Criterios:* Vercel preview por PR; producción solo desde `main`; checks (build, lint, Lighthouse CI, Playwright) obligatorios.
- **D4 (Should)** Como Irene, quiero que cada lead entre también al CRM/WhatsApp del sistema de ventas ECUS, para darle seguimiento. *Criterios:* webhook con payload documentado; reintentos; sin duplicados.
- **D5 (Should)** Como Guillermo, quiero recibir un resumen mensual de visitas, posiciones y solicitudes, para saber si funciona. *Criterios:* reporte mensual (mismo pipeline de reportes ECUS), en español, con 5 métricas y 3 acciones.
- **D6 (Could)** Como ECUS, quiero un sondeo mensual automático de citas en IA, para medir GEO. *Criterios:* script que pregunta 12 prompts a 4 motores y guarda si citan el dominio.

**Épica E · Accesibilidad, rendimiento y cumplimiento**
- **E1 (Must)** WCAG 2.2 AA: contraste, foco visible, navegación por teclado, formularios etiquetados, `prefers-reduced-motion` respetado.
- **E2 (Must)** Lighthouse ≥ 95 móvil en home, servicio, guía y post; presupuesto de JS < 150 KB en la home.
- **E3 (Must)** Aviso de privacidad y consentimiento de cookies acorde a Panamá (Ley 81 de 2019) y GDPR para visitantes europeos (Grecia es mercado).

---

## 8. Dirección de diseño

**Lectura del brief:** rediseño total de un sitio B2B de servicios marítimos para gerentes de operaciones, aseguradores y traders; lenguaje "trust-first premium" con carácter náutico-editorial; base Next.js + Tailwind v4 + Motion. **Diales:** variancia 6 · movimiento 5 · densidad 4.

### 8.1 Principios (de la skill de Apple + design taste)
- **Propósito y restricción:** cada sección tiene un trabajo; nada decorativo sin función. Menos secciones, mejor hechas.
- **Respuesta inmediata:** feedback en `pointerdown`, transiciones con springs críticamente amortiguados (sin rebote salvo gestos con impulso), todo interrumpible.
- **Materiales y profundidad:** barra de navegación translúcida (`backdrop-filter`) con el contenido pasando por debajo; jerarquía por peso del material, no por sombras negras.
- **Tipografía con tamaño óptico:** titulares grandes con tracking negativo y leading apretado; cuerpo cómodo a 65 caracteres; datos operativos (IMO, coordenadas, toneladas) en monoespaciada.
- **Craft:** ningún valor de espaciado, tiempo o alineación es aleatorio. Una escala de radios, una paleta, una familia de iconos (Phosphor), cero emojis.
- **Prohibido (AI tells):** héroes centrados sobre gradiente morado, tres tarjetas iguales, "eyebrows" en cada sección, guiones largos, dots decorativos, marquesinas múltiples, capturas falsas hechas con divs, fotos de stock genéricas de "handshake".

### 8.2 Sistema visual
- **Paleta:** base de neutros fríos (grafito profundo `#0E1620` para superficies oscuras, papel `#F5F7F9` para claras, gris humo para texto secundario) y **un solo acento: cobalto `#1F4FD8`** (heredado del ancla azul del logo), reservado para CTAs, enlaces y marcas de estado. Modo claro por defecto para las páginas de contenido, hero y pie oscuros; **un solo tema por página**, sin alternar bloques claro/oscuro.
- **Tipografía:** **Geist** (display y cuerpo, vía `next/font`, pesos 400/500/600) + **Geist Mono** para datos. Escala: display `clamp(2.25rem, 4.5vw, 4rem)` con `letter-spacing -0.02em`, `line-height 1.05`; cuerpo 1.0625rem / 1.6.
- **Fotografía:** imágenes reales de operación (tránsito visto desde el buque, esclusas, bunkering, capitán en puente, oficina en RBS Tower). Mientras llegan: placeholders con seeds descriptivos, nunca ilustraciones inventadas. Lista de tomas necesarias en sección 13.
- **Layout:** hero asimétrico (texto izquierda, imagen a sangre derecha), secciones alternando familias distintas (split, bento con imágenes reales, lista de proceso en sticky-stack, tabla de puertos, testimonio a ancho completo, franja de logos única). Contenedor `max-w-[1320px]`, `min-h-[100dvh]` en el hero.
- **Movimiento (motivado):** aparición escalonada de secciones al entrar en viewport (jerarquía), proceso del port call en pila pegajosa de 4 pasos (narrativa), agua del hero con desplazamiento sutil y parallax de 8-12 px (atmósfera; se apaga con `prefers-reduced-motion`), hover en tarjetas con elevación de 1 px y sombra teñida. Nada infinito salvo la franja de logos.
- **Componentes clave:** barra translúcida con CTA "Request port call"; tarjeta de servicio con imagen; "ficha de puerto" con datos en mono; formulario de port call en 2 pasos con estados de carga/error/éxito reales; bloque de credencial (ISO/licencia) con imagen y vigencia; bio del capitán; tarjeta de post con autor y fecha de revisión; switch de idioma.

### 8.3 Voz y copy
Directa, técnica sin jerga innecesaria, en primera persona del plural. Español neutro (sin voseo). Sin superlativos vacíos ("elevate", "seamless", "world-class"). Cada titular ≤ 8 palabras; cada subtítulo ≤ 25. Un solo CTA por intención en toda la página ("Request a port call" / "Solicitar port call").

---

## 9. Stack técnico

| Capa | Elección | Por qué |
|---|---|---|
| Framework | **Next.js 16** (App Router, React Server Components, TypeScript estricto) | SSR/SSG para SEO y GEO, `next/image`, `next/font`, `next/og`, rutas i18n, ecosistema Vercel. |
| Estilos | **Tailwind CSS v4** (config CSS-first con `@theme`) | Tokens en CSS, CSS final < 12 KB, modo oscuro por atributo. |
| Movimiento | **Motion** (`motion/react`) con springs; sin GSAP salvo que haga falta un pin | Interrumpible, `useReducedMotion`, aislado en client leaves. |
| Iconos | **Phosphor Icons** (`@phosphor-icons/react`), `weight="regular"`, una sola familia | Consistencia; nada dibujado a mano. |
| i18n | **next-intl** con rutas `/en` y `/es`, mensajes en JSON y contenido MDX por idioma | hreflang y switch sin recargar. |
| Contenido / CMS | **Keystatic** (modo GitHub) + MDX: colecciones `services`, `ports`, `posts`, `cases`, `team`, `certifications`; singletons `site`, `contact` | Editor visual en `/keystatic`, guarda en el repo (sin base de datos ni costo), historial en git, deploy automático. Guillermo/Irene publican; nosotros revisamos por PR si queremos. |
| Formularios | Server Actions + **Zod** + **Resend** (email transaccional) + **Cloudflare Turnstile** (anti-spam) + webhook a WhatsApp/CRM ECUS | Sin backend aparte; validación en servidor; leads guardados también en Vercel Postgres/Neon (tabla `leads`) para no perder ninguno si falla el email. |
| Analítica | **GA4 + GTM** (eventos: `port_call_request`, `survey_request`, `fuel_quote`, `whatsapp_click`, `phone_click`, `email_click`, `profile_download`, `language_switch`, `guide_read_75`) + **Vercel Web Analytics** + **Speed Insights** + **Search Console** + **Bing Webmaster** | Medible de extremo a extremo con atribución (utm, gclid, fbclid, referrer) guardada en cada lead. |
| SEO | `app/sitemap.ts`, `app/robots.ts`, `metadata` API, JSON-LD por plantilla, `llms.txt`, RSS, redirects 301 en `next.config.ts`, IndexNow | Todo generado desde el contenido, sin plugins. |
| Calidad | ESLint + Prettier + TypeScript strict · **Playwright** (smoke de formularios, i18n, 404) · **Lighthouse CI** con presupuesto (perf ≥ 95, a11y ≥ 95) · `axe` en CI | Bloquea merge si baja la calidad. |
| Hosting | **Vercel Pro** (team `munozospinad0s-projects`): producción desde `main`, previews por PR, dominio `crossworldagency.com` + `www`, Edge Network, imagen optimizada, protección de deploy | Ya pagado; sin cron sub-diario (rompe el deploy en Hobby, en Pro no, pero no hace falta). |
| Repositorio | **GitHub `munozospinad0/crossworld-agency`** (público, requisito de Pages en plan free) · Pages sirve `/docs` (esta planeación y el tablero de avances) | Compartir avances con Irene con un link; sin secretos en el repo (variables en Vercel). |
| Dominio / correo | DNS a Vercel (A/CNAME), mantener MX del correo actual; SPF/DKIM/DMARC para Resend con subdominio `mail.crossworldagency.com` | No romper el correo de gpena@. |

**Estructura del repo (propuesta):**
```
app/[locale]/(site)/...          rutas
components/{ui,sections,forms}   UI (Server Components por defecto; motion en leaves 'use client')
content/{en,es}/{services,ports,posts,cases}/*.mdx   contenido gestionado por Keystatic
keystatic.config.ts              esquema del CMS
lib/{seo,schema,analytics,i18n,leads}.ts
messages/{en,es}.json            textos de interfaz
public/{images,llms.txt}
docs/                            planeación + tablero de avances (GitHub Pages)
research/                        keyword research (scripts, CSV, resúmenes)
tests/                           Playwright
```

---

## 10. Blog / centro de contenidos ("Insights")

**Objetivo:** ser la referencia práctica sobre operar un buque en Panamá, firmada por un capitán. **Cadencia:** 2 piezas/mes en inglés + su versión en español (traducción humana, no literal), revisión trimestral de las guías pilar. **Autor principal:** Capitán Guillermo Peña (bio con credenciales, foto real, LinkedIn). **Formato estándar:** TL;DR de 3 líneas → respuesta directa → desarrollo con subtítulos H2 por pregunta → tabla/lista → FAQ visible → "Cómo podemos ayudar" (CTA único) → fecha de publicación y de última revisión → fuentes.

### Calendario editorial · primeros 6 meses (24 piezas, EN+ES)
| Mes | Pieza pilar / post | Cluster de keywords | Tipo |
|---|---|---|---|
| Sep (pre-lanzamiento) | Panama Canal transit cost and tolls 2026: what shipowners actually pay | fee/price/rates/cost 880 · how much... 480 · toll 320 | Pilar |
| Sep | How to choose a ship agent in Panama (and the 12 questions to ask) | conquest 2.500 · panama shipping agency | Comparativa |
| Oct | Booking a Panama Canal transit: slots, pre-booking, PDA and what your agent does | booking 320 · schedule 260 · pre booking | Pilar |
| Oct | Port of Balboa: terminal, anchorage, bunkering and services (2026) | port of balboa 1.900 · ES 2.900 | Guía de puerto |
| Nov | Port of Cristóbal and Colón: what to expect on the Atlantic side | cristobal 1.600 · colón | Guía de puerto |
| Nov | Bunker survey in Panama: how to avoid a quantity or quality dispute | bunker survey · dispute · BDN | Guía técnica |
| Dic | Draft survey explained: method, tolerances and the report you should receive | draft survey 1.600 | Guía técnica |
| Dic | Bunker prices in Panama: what moves them (monthly data with source) | bunker rates 2.900 · cost 720 | Dato + fuente |
| Ene | Panama Canal draft restrictions, water levels and transit time in 2027 | draft restrictions · water levels 260 · transit time 90 | Actualización |
| Ene | Crew change in Panama: rules, ports, visas and timing | crew change panama | Guía operativa |
| Feb | Pre-purchase inspection checklist for bulk carriers and tankers | condition surveys 320 (+488%) · pre purchase | Checklist |
| Feb | Ship-to-ship transfers in Panama: procedure, mooring master, surveys | sts panama 40 · STS guide 210 | Guía técnica |
| + ES | Cómo funciona el Canal de Panamá para armadores y operadores · Puerto de Balboa · Autoridad Marítima de Panamá: qué hace y cómo tramitar · Cuánto cuesta cruzar el Canal · Agencia naviera en Panamá: qué debe incluir el servicio · Trasiego y suministro de combustible marino en Panamá | 880 · 2.900 · 1.000 · 50-70 · 30 · 210 | Versiones ES |

Piezas evergreen de respaldo: "Panama ship registry: why so many vessels fly the Panamanian flag" (480), "Port of Manzanillo (MIT) guide" (3.600), "What a protecting agent does (and when you need one)", "ISM internal audit: what we check", "Cargo claims in Panama: first 24 hours".

Reglas: nunca publicar sin fuente en cifras; nunca prometer tiempos del Canal; cada pieza enlaza a 2 servicios y a 2 guías; imágenes propias o con licencia; sin em-dashes.

---

## 11. Medición: qué se mide, cómo y qué es "bien"

**Norte:** solicitudes cualificadas por mes (port call, survey, cotización de combustible) y su costo de adquisición.

| Métrica | Herramienta | Línea base | Meta 3 meses | Meta 6 meses |
|---|---|---|---|---|
| Solicitudes cualificadas / mes | Formularios → GA4 + tabla `leads` | 0 (el sitio no tiene formulario) | 6 | 15 |
| Tasa de conversión (solicitud / sesión) | GA4 | n/d | 1,5% | 2,5% |
| Clics orgánicos / mes | Search Console | ~0 | 300 | 1.200 |
| Keywords objetivo en top 3 (de 25) | Search Console + sondeo manual | 0 | 8 | 18 |
| Citas en motores de IA (12 prompts × 4 motores) | Script mensual | 0/48 | 6/48 | 16/48 |
| Core Web Vitals (móvil, p75) | Speed Insights + PSI | n/d | LCP < 2,0 s · INP < 150 ms · CLS < 0,05 | igual |
| Lighthouse móvil (perf/a11y/SEO) | Lighthouse CI en cada PR | n/d | ≥ 95 / 95 / 100 | igual |
| Tiempo de respuesta a solicitudes | Marca de tiempo en `leads` | n/d | < 4 h (24/7) | < 2 h |
| Posts publicados / mes | Keystatic | 0 | 2 + 2 ES | 2 + 2 ES |
| Reseñas en Google Business Profile | GBP | 0 | 5 | 12 |

**Eventos GA4 (nombres fijos, no se cambian nunca):** `port_call_request`, `survey_request`, `fuel_quote_request`, `contact_submit`, `whatsapp_click`, `phone_click`, `email_click`, `profile_download`, `language_switch`, `guide_read_75`, `cta_click` (con `cta_id`), `form_error` (con `field`). Todos con `page_path`, `locale`, `utm_*`, `gclid`, `fbclid`, `referrer` como parámetros.

**Cada lead guarda:** timestamp, tipo, campos del formulario, página, idioma, `utm_*`, `gclid`, `fbclid`, referrer, user agent, estado de envío del email/webhook, tiempo hasta primera respuesta (lo marca quien responde desde el CRM).

**Reporte mensual:** mismo pipeline de reportes de ECUS (diseño de junio), 1 página: solicitudes, orgánico, posiciones, IA, CWV, 3 acciones del mes siguiente.

---

## 12. Roadmap y fases

| Fase | Semanas | Entregables | Criterio de "hecho" |
|---|---|---|---|
| **0 · Planeación** | 27-29 ago | Este plan, keyword research, competidores, repo + GitHub Page de avances | Irene aprueba el plan y el posicionamiento |
| **1 · Fundaciones** | 1-2 sep → 12 sep | Repo Next.js 16 + Tailwind v4 + Motion + next-intl + Keystatic; sistema de diseño (tokens, tipografía, componentes); home, hub de servicios, contacto y formulario de port call funcionando con emails y leads guardados; deploy en Vercel (preview) | Home con Lighthouse ≥ 95, formulario probado de punta a punta, preview compartida |
| **2 · Contenido y confianza** | 15-26 sep | 7 páginas de servicio (EN), about, certificaciones, 4-6 puertos, casos; traducción ES completa; schema y hreflang; imágenes reales (o placeholders marcados) | Todas las páginas con contenido real revisado por Guillermo; ES revisado |
| **3 · Contenidos y SEO/GEO** | 29 sep → 10 oct | Blog con Keystatic, 4 primeras piezas (2 pilares EN + ES), `llms.txt`, sitemap, robots, OG, RSS; Playwright + Lighthouse CI; auditoría de accesibilidad; GA4/GTM/Search Console/Bing configurados | Checklist SEO técnico 100%; eventos verificados en GA4 DebugView |
| **4 · Migración y lanzamiento** | 13-17 oct | Mapa de 301, DNS a Vercel, `www`, HSTS; GBP, Bing Places, directorios; envío de sitemap; monitoreo 72 h | Producción en crossworldagency.com sin errores 4xx/5xx; GSC sin problemas de cobertura |
| **5 · Crecimiento** | desde oct, mensual | 2+2 piezas/mes, revisión trimestral de guías, sondeo de IA, reporte mensual, pauta (Google Search de marca + LinkedIn si Irene lo decide) | KPIs de la sección 11 |

Riesgos y mitigación: (1) insumos del cliente tardan → arrancamos con contenido derivado del profile y placeholders marcados, nada bloquea el build; (2) acceso al dominio/DNS → pedirlo en la semana 1; (3) fotos → shot list clara y una sesión de 2 horas; (4) el permiso de git push puede bloquearse en algunas sesiones → alternativa: Daniel corre el push o ajusta permisos.

---

## 13. Insumos que necesitamos de Irene y Guillermo

**Bloquean el lanzamiento:**
1. Acceso al registrador del dominio (DNS) y al hosting actual del WordPress (para apagarlo y redirigir).
2. Logo en vector (AI/SVG/PDF) del ancla y del wordmark; si no existe, se redibuja.
3. Lista definitiva de servicios y **puertos que sí atienden**; SLA real de respuesta (¿PDA en < 24 h? ¿surveyor en < 4 h?).
4. Números oficiales para la web: WhatsApp Business, teléfono 24/7, email de solicitudes.
5. Permiso escrito para mostrar logos de socios/clientes (Andrew Moore, Sabatino Pizzolante, Victoria Corp., EcoGreen, White Glacier) y para publicar los certificados ISO con su vigencia.

**Mejoran mucho el resultado:**
6. **Sesión de fotos (shot list):** capitán en el puente y en muelle; equipo en la oficina (RBS Tower); tránsito visto desde cubierta; esclusas; una operación de bunkering/survey (con EPP); fachada/vista de Paitilla; certificados enmarcados. Formato horizontal 3:2 y vertical 4:5, mínimo 3.000 px.
7. 3-5 historias reales de port calls o surveys (tipo de buque, puerto, qué pasó, cómo se resolvió, tiempo).
8. Testimonios de 2-3 clientes o socios (2 líneas, nombre y cargo).
9. Cuenta de Google (para GBP, GA4, Search Console) y LinkedIn de la empresa y del capitán.
10. Datos de SOS Resilience Holding: ¿se muestra como marca aparte o como línea de negocio?

---

## 14. Decisiones tomadas y supuestos
- Repo público (plan free de GitHub exige público para Pages). Ningún secreto vive en el repo; el PDF del company profile no se sube.
- Inglés es el idioma principal (x-default) porque los compradores de mayor ticket están fuera de LatAm; español completo desde el lanzamiento.
- No se usan páginas de puerto "programáticas": máximo 6, con contenido único.
- No se compra pauta de marcas de competidores. La pauta inicial (si la hay) es Search de marca + términos "panama + servicio" de competencia LOW.
- Mientras no haya fotos reales, las imágenes son placeholders marcados en el código con `TODO:` y en la lista de tomas.
- Toda cifra del Canal o de bunker se publica con fuente y fecha; se revisa trimestralmente.

---

## 15. Especificación página por página

Convenciones: **H1** único por página · **Resumen** de 2 líneas bajo el H1 (es lo que citan Google y la IA) · un solo **CTA primario** por página ("Request a port call" o el específico del servicio) · **schema** indicado · **imágenes** con su toma requerida · todas las páginas tienen migas, switch de idioma, WhatsApp y teléfono 24/7 en la barra, pie con NAP y enlaces legales. Nada de "eyebrows" en cada sección; máximo 1 cada 3 secciones.

### 15.1 Home (`/en`, `/es`)
- **Objetivo:** que un ops manager, un claims handler o un trader entienda en 5 segundos qué hacemos, dónde y por qué confiar, y pida un port call.
- **Keyword:** panama shipping company · panama shipping agency · ES agencia naviera panamá.
- **H1:** *Ship agency, marine surveys and bunkering at the Panama Canal.* (ES: *Agencia naviera, inspecciones y bunker en el Canal de Panamá.*)
- **Secciones (en orden):**
  1. **Hero asimétrico:** H1 + subtítulo de 20 palabras ("Licensed by the AMP and the Panama Canal Authority since 2010. One team for the transit, the survey and the claim, 24/7.") + CTA primario "Request a port call" + secundario "WhatsApp duty officer" + imagen a sangre (tránsito visto desde cubierta).
  2. **Franja de credenciales (única marquesina):** AMP · ACP authorized agent · IMO 5785507 · ISO 9001 · 14001 · 45001 · 22000 · Since 2010.
  3. **Servicios (bento 7 celdas con imagen real en 3 de ellas):** título, 1 línea, enlace. Orden: Ship agency & Canal transit · Marine surveys · Bunker surveys & claims · Bunkering & oil operations · STS & offshore · Marine claims · Consulting & brokerage.
  4. **Cómo funciona un port call (pila pegajosa de 4 pasos):** Nomination → PDA within 24 h → Boarding & transit → FDA. Cada paso con qué recibe el cliente y en cuánto tiempo (SLA a confirmar).
  5. **Ambos lados del Canal (ficha de puertos en mono):** Balboa (Pacífico) y Cristóbal (Atlántico) con teléfono de guardia de cada lado, más Manzanillo, Colón, PSA, Rodman.
  6. **El capitán (split):** foto real, 3 líneas de bio, credenciales ISM/ABSG/Maersk Training, enlace a About. Es la sección E-E-A-T.
  7. **A quién servimos (4 tarjetas con foto):** Shipowners & managers · Charterers & traders · P&I clubs & insurers · Fishing fleets & regional operators.
  8. **Prueba (testimonio a ancho completo + logos de socios).** Solo con permiso.
  9. **Insights (3 últimos posts).**
  10. **CTA final:** "Request a port call" + "Nominate Cross World" (bloque copiable: razón social, RUC, IMO, emails, teléfonos, código ACP).
- **Schema:** Organization + ProfessionalService + WebSite (SearchAction no) + BreadcrumbList.
- **Imágenes:** hero (tránsito), 3 de servicios (survey, bunkering, esclusas), capitán, 4 de audiencias.

### 15.2 Hub de servicios (`/services`)
- **Objetivo:** ruteo rápido por necesidad. **H1:** *Services at both ends of the Panama Canal.*
- **Secciones:** intro de 2 líneas · lista de 7 servicios en formato "ficha" (título, 2 líneas, 4 bullets de qué incluye, enlace) · bloque "No sabes cuál necesitas: describe tu caso" (formulario corto de 3 campos) · CTA.
- **Schema:** ItemList de Service + BreadcrumbList.

### 15.3 Plantilla de página de servicio (7 páginas)
Cada una con el mismo esqueleto, contenido 100% propio (mínimo 600 palabras EN, 600 ES):
1. **H1 + resumen de 2 líneas** (respuesta directa: qué es, para quién, dónde).
2. **Qué incluye** (lista de 6 a 10 ítems reales del catálogo del profile).
3. **Qué entregamos** (documentos: PDA/FDA, informe de survey con fotos y cálculos, carta de protesta, informe de claims, certificado de cantidad, etc.) y **en cuánto tiempo**.
4. **Puertos y terminales** donde se presta (chips enlazados a las páginas de puerto).
5. **Cómo empezar** (3 pasos + qué necesitamos del cliente: IMO, ETA, instrucciones, contactos).
6. **Por qué Cross World** (3 razones específicas del servicio, no genéricas: p. ej. en bunker surveys, "el mismo equipo que hace el survey maneja la disputa").
7. **Caso breve** (anonimizado; opcional hasta tener 3).
8. **FAQ** (5 a 7 preguntas reales, visibles).
9. **Servicios relacionados** (2) y **CTA específico** ("Request a bunker survey", "Request a fuel quote", etc.).
- **Schema:** Service (serviceType, provider → Organization, areaServed, availableChannel) + BreadcrumbList.
- **Keywords y H1 por página:**

| Página | H1 (EN) | Keyword principal | CTA |
|---|---|---|---|
| ship-agency-panama-canal-transit | Panama Canal transit agent and husbandry services | panama canal transit agent · panama canal agent | Request a port call |
| marine-surveys | Marine surveys and inspections in Panama | marine surveyor panama · draft survey · condition survey | Request a surveyor |
| bunker-surveys-and-claims | Bunker surveys and bunker dispute handling | bunker survey · bunker quality dispute · on/off hire | Request a bunker surveyor |
| bunkering-and-oil-operations | Marine fuel supply and oil operations in Panama | bunkering panama · marine fuel panama · MGO | Request a fuel quote |
| ship-to-ship-and-offshore | Ship-to-ship transfers and offshore support | sts panama · ship to ship transfer | Plan an STS operation |
| marine-claims | Marine claims handling and P&I correspondent support | cargo claims · marine claims · P&I | Report a claim |
| maritime-consulting-and-brokerage | Maritime consulting, chartering and brokerage | maritime consulting · ship broker · chartering | Talk to the captain |

### 15.4 Who we serve (4 páginas)
- **Objetivo:** hablarle a cada comprador en su idioma. **Estructura:** H1 ("For shipowners and managers") · qué les preocupa (3 puntos) · qué hacemos por ellos (mapa a servicios) · cómo trabajamos con ellos (comunicación, reportes, facturación, moneda, horarios) · documentos que reciben · casos · CTA propio. **Schema:** WebPage + BreadcrumbList.

### 15.5 Guía pilar del Canal (`/panama-canal-transit-guide`)
- **Objetivo:** capturar el clúster de ~4.000 búsquedas y ser la fuente citable. **H1:** *Panama Canal transit guide for shipowners and operators (2026).*
- **Estructura:** TL;DR de 5 líneas con fecha de última revisión · índice pegajoso · 1) Cómo se calcula el peaje (tabla por tipo de buque con fuente ACP y enlace) · 2) Booking: slots, subasta, pre-booking, just-in-time, garantías · 3) Requisitos y documentos (pre-arribo 96 h, PCSOPEP, inspección) · 4) Calado, restricciones y niveles de agua (dato vigente con fecha) · 5) Tiempo de tránsito y espera · 6) Qué hace el agente y qué incluye una PDA (PDA de muestra redactada) · 7) Errores comunes · 8) FAQ (10) · 9) CTA "Request a transit PDA" · fuentes. Bloques de definición ("A protecting agent is...") en cajas citables.
- **Schema:** Article (author Person, dateModified) + BreadcrumbList. **Mantenimiento:** revisión trimestral obligatoria (calendario).

### 15.6 Resources (`/resources`)
- Enlaces oficiales ACP (booking, avisos, advisories), calado vigente (dato + fecha), checklists descargables (pre-arribo, bunker survey, crew change), PDA de muestra, glosario EN/ES (60 términos), "Estado del Canal hoy" (fase 2, con fuente). Cada descarga = evento `resource_download`.

### 15.7 Puertos (`/ports` + 4 a 6 páginas)
- **Por puerto:** H1 ("Port of Balboa: ship agency, surveys and bunkering") · ficha en mono (operador, terminales, lado del Canal, coordenadas, fondeaderos, calado, bunker disponible, distancia a las esclusas) · qué hacemos ahí · particularidades (restricciones, horarios, autoridad) · contacto de guardia de ese lado · FAQ · CTA. **Schema:** Place + Service. Contenido único por puerto; datos con fecha.

### 15.8 About (`/about`)
- Historia con línea de tiempo (2010 licencia, hitos, ISO por año) · el capitán (bio larga, credenciales con imágenes, LinkedIn) · equipo (con permiso) · red de representación (mapa: Panamá, Venezuela, Brasil, Aruba, Grecia) · socios · valores y canal de ética · CTA. **Schema:** AboutPage + Person.

### 15.9 Certifications (`/certifications`)
- Cada certificado como tarjeta: imagen legible, número, ente emisor, alcance, vigencia; licencias AMP/ACP; IMO; credenciales personales. Descarga PDF de cada uno. **Schema:** Organization con `hasCredential`.

### 15.10 Insights (`/insights`, `/insights/[slug]`)
- Lista con filtros por categoría, tarjeta con autor, fecha, tiempo de lectura. Post: TL;DR, cuerpo, FAQ, autor con bio, "última revisión", relacionados, CTA. RSS. **Schema:** Blog / BlogPosting con author Person.

### 15.11 Contact (`/contact`) y Request port call (`/request-port-call`)
- **Contact:** teléfonos por lado del Canal, WhatsApp, emails por área (operations, surveys, claims, fuel), dirección con mapa, horario 24/7, formulario corto (nombre, empresa, email, mensaje). **Schema:** ContactPage + ContactPoint por área.
- **Request port call (formulario de 2 pasos):**
  - Paso 1, buque: nombre, IMO (7 dígitos, validación), tipo de buque (lista), bandera, LOA, manga, calado, GT, carga, ETA (fecha/hora + zona), puerto(s) (multi), tránsito (sí/no, dirección), tipo de principal (owner / charterer / manager / trader / P&I / otro).
  - Paso 2, servicios y contacto: servicios (multi con los 7), notas, adjunto (PDF/JPG hasta 10 MB), nombre, empresa, cargo, email (validación MX), teléfono con código de país, idioma preferido, consentimiento de privacidad.
  - Comportamiento: guardado de borrador en el navegador; validación inline; Turnstile invisible; envío por Server Action; respuesta en pantalla con número de solicitud (`CW-YYYYMMDD-XXX`) y SLA; email de confirmación al cliente (EN/ES) y aviso a Cross World (email + WhatsApp); guardado en tabla `leads`; webhook al CRM ECUS; evento GA4 `port_call_request` con `principal_type`, `services`, `locale`.
  - Estados: cargando (botón con spinner y texto), error de campo, error de red (reintento sin perder datos), éxito.
- **Variantes cortas** dentro de cada servicio: "Request a surveyor" (tipo, puerto, fecha, contacto) y "Request a fuel quote" (producto, toneladas, puerto, fecha, contacto).

### 15.12 Legales, 404 y utilidades
- Privacy (Ley 81 de 2019 de Panamá + GDPR para visitantes europeos), Terms, Cookie notice (solo si se usan cookies no esenciales; GA4 con consentimiento), Disclaimer de tarifas ("las cifras del Canal son referenciales y de fuente ACP").
- 404 útil: buscador, enlaces a servicios, WhatsApp.
- `llms.txt` (índice curado con 1 línea por página), `llms-full.txt`, `sitemap.xml`, `robots.txt`, `rss.xml`, `/humans.txt` (opcional).

---

## 16. Copy deck v0 (para revisión de Irene y Guillermo)

**Tono:** directo, técnico sin jerga innecesaria, primera persona del plural, español neutro sin voseo. Sin superlativos vacíos ("world-class", "seamless", "elevate"), sin promesas que no controlamos (tiempos del Canal, precios), sin guiones largos.

**Hero (EN):**
- A. *Ship agency, marine surveys and bunkering at the Panama Canal.* / Licensed by the AMP and the Panama Canal Authority since 2010. One team for the transit, the survey and the claim. 24/7.
- B. *Licensed at the Canal. Certified on board. Accountable for the claim.* / Panama Canal transit agency, marine surveys, bunkering and claims handling under one ISO-certified team led by a captain.
- C. *Your vessel, handled by a captain.* / Transit agency, husbandry, surveys and bunker at both ends of the Panama Canal.

**Hero (ES):**
- A. *Agencia naviera, inspecciones y bunker en el Canal de Panamá.* / Licencia de la AMP y de la Autoridad del Canal desde 2010. Un solo equipo para el tránsito, la inspección y el reclamo. 24/7.
- B. *Agencia, inspecciones y reclamos en el Canal de Panamá. Un solo equipo, una sola llamada, 24/7.*

**Una línea por servicio (EN / ES):**
- Ship agency & Canal transit: *Nomination to FDA, both sides of the Canal.* / *De la nominación a la FDA, en ambos lados del Canal.*
- Marine surveys: *Independent surveys with reports your underwriter will accept.* / *Inspecciones independientes con informes que su asegurador acepta.*
- Bunker surveys & claims: *The surveyor who measured the fuel handles the dispute.* / *El mismo surveyor que midió el combustible maneja la disputa.*
- Bunkering & oil operations: *MGO and ULSD in Panama, CIF or FOB, with quantity verified.* / *MGO y ULSD en Panamá, CIF o FOB, con cantidad verificada.*
- STS & offshore: *Ship-to-ship and terminal operations planned, attended and documented.* / *Operaciones ship-to-ship y de terminal planificadas, atendidas y documentadas.*
- Marine claims: *Evidence preserved in the first 24 hours.* / *Evidencia preservada en las primeras 24 horas.*
- Consulting & brokerage: *Chartering, projects and advice from a working captain.* / *Fletamento, proyectos y asesoría de un capitán en activo.*

**CTAs (una etiqueta por intención, en todo el sitio):** Request a port call / Solicitar port call · WhatsApp duty officer / WhatsApp de guardia · Request a surveyor / Solicitar surveyor · Request a fuel quote / Cotizar combustible · Report a claim / Reportar un reclamo · Nominate Cross World / Nominar a Cross World.

**Microcopy del formulario:** "We reply 24/7. You will receive a request number and a confirmation email." · Éxito: "Request CW-20260915-014 received. The duty officer has it. If it is urgent, call +507 6266-4242." · Error de red: "Your data is safe on this screen. Check your connection and send again."

**Bloque "Nominate Cross World" (copiable):** Cross World Agencies, S.A. · RUC 1675308-1-680680 DV 34 · IMO 5785507 · Panama Canal Authority authorized agent · RBS Tower, 9th floor, office 902, Paitilla, Panama City · operations@ (a confirmar) · +507 6266-4242 · +507 383-0128.

**Palabras prohibidas:** world-class, seamless, elevate, unleash, next-gen, revolutionize, "since 1995", "10+ awards", cualquier promesa de tiempos del Canal o de precios de peaje.

---

## 17. Plan de adquisición: cómo traemos gente

El sitio es el destino; estos son los caminos. Cada canal tiene objetivo, táctica, KPI, presupuesto sugerido y cuándo arranca. Todo llega a la misma página de destino con `utm_source/medium/campaign` y todo lead queda atribuido.

| # | Canal | Objetivo | Tácticas concretas | KPI | Presupuesto / mes | Arranca |
|---|---|---|---|---|---|---|
| 1 | **SEO (sección 5)** | Ser #1 en "Panamá + servicio" y capturar el clúster del Canal | Páginas de servicio, guía pilar, puertos, blog 2+2/mes, enlaces internos, Search Console | Clics orgánicos, top 3 de 25 kw | Tiempo ECUS | Fase 1 |
| 2 | **GEO / IA** | Ser citados por ChatGPT, Perplexity, Gemini, Copilot | llms.txt, schema, respuestas directas, comparativa "how to choose a ship agent in Panama", entidad consistente, menciones en medios | Citas en 12 prompts × 4 motores | 0 | Fase 3 |
| 3 | **Google Ads Search** | Capturar intención comercial inmediata EN/ES | Campaña 1 "Marca" (cross world agency, crossworld panama; defensa contra Cross Roads) · Campaña 2 "Panamá + servicio EN" (transit agent, ship agency panama, marine surveyor panama, bunkering panama, sts panama; exacta y frase) · Campaña 3 "ES" (agencia naviera panamá, agente naviero, inspección de bunker) · negativos: cruise, tour, jobs, salary, wikipedia, history, visitor center, yacht charter · geo: Panamá + países de armadores (GR, SG, GB, NO, DE, TR, US, CO, VE, EC, MX) · Enhanced Conversions + importación de conversiones offline (PDA enviada, nominación) como en el setup de Sandra | CPL, solicitudes cualificadas, cuota de impresión de marca ≥ 90% | USD 300 a 600 | Fase 4 (lanzamiento) |
| 4 | **LinkedIn orgánico** | Autoridad del capitán y de la empresa donde están los compradores | Página de empresa completa (NAP, servicios, banner con credenciales) · perfil del capitán optimizado · 2 posts/semana (avisos ACP comentados, casos, fotos de operación, cada guía nueva) · comentar en posts de P&I clubs y bunker traders · newsletter de LinkedIn mensual "Panama Canal Brief" | Seguidores, visitas al sitio desde LinkedIn, mensajes InMail recibidos | Tiempo | Fase 2 |
| 5 | **LinkedIn Ads (ABM)** | Llegar a 200 empresas objetivo | Lista de cuentas (ship managers en Atenas, Hamburgo, Singapur, Estambul, Oslo; traders en Houston y Ginebra; P&I clubs y corresponsales; flotas atuneras en Ecuador y Panamá) · cargos: Operations Manager, Port Captain, Marine Superintendent, Claims Handler, Bunker Trader, Fleet Manager · anuncios de documento (guía del Canal) y de conversación · retargeting a visitantes del sitio | Visitas de cuentas objetivo, solicitudes | USD 300 a 500 (opcional) | Fase 5 |
| 6 | **Directorios y listados** | Estar donde los agentes se buscan y donde la IA aprende | Lista completa en sección 22.3: ACP (verificar datos), Cámara Marítima de Panamá, BIMCO, ShipServ, Findaport, Lloyd's List Intelligence, IBIA, IIMS, Google Business Profile, Bing Places, Apple Business Connect, Kompass, Páginas Amarillas Panamá | Listados activos con NAP idéntico, reseñas | Mayoría gratis; membresías a cotizar | Fase 2 a 4 |
| 7 | **Corresponsalía P&I** | Trabajo recurrente de clubes y aseguradores | Solicitar inclusión como corresponsal/surveyor recomendado en Panamá en los clubes del International Group (Gard, Skuld, UK P&I, NorthStandard, Steamship Mutual, West, Britannia, London P&I, Swedish Club, Japan P&I, American Club, Shipowners' Club) y en aseguradores H&M regionales · dossier de credenciales (ISO, ISM, casos) · seguimiento trimestral | Clubes que nos listan, nombramientos | Tiempo | Fase 4 |
| 8 | **Outreach directo (email + WhatsApp)** | Abrir conversaciones con decisores | Secuencia de 3 correos + 1 WhatsApp (permiso previo) a 20 cuentas/semana desde el CRM · ángulo: "próximo tránsito por Panamá" · adjunto: guía del Canal y PDA de muestra · tono de capitán a capitán | Tasa de respuesta ≥ 8%, reuniones | Tiempo | Fase 4 |
| 9 | **Alianzas y red** | Referidos cruzados | Acuerdos con Sabatino Pizzolante (VE), Andrew Moore & Associates, Victoria Corporation, EcoGreen, White Glacier: enlaces cruzados, co-contenido, referidos con comisión clara · representación en Grecia como puerta al mercado griego | Leads referidos | Tiempo | Fase 2 |
| 10 | **PR y medios marítimos** | Menciones que la IA y Google usan como confianza | Notas a Mundo Marítimo, Panamá América, La Prensa (economía), Ship & Bunker, Manifold Times, Splash247 con datos propios (p. ej. tiempos de espera observados, disputas de bunker evitadas) · entrevistas del capitán · comunicado de lanzamiento del sitio | Menciones/enlaces obtenidos | 0 | Fase 4 |
| 11 | **Newsletter "Panama Canal Brief"** | Mantener a la lista tibia y volver a traer tráfico | Mensual, EN/ES, 5 ítems: avisos ACP, calado, bunker, un consejo del capitán, un caso · captura en guías y recursos (sin gate en PDFs) | Suscriptores, apertura ≥ 40% | Resend (0 a 20) | Fase 5 |
| 12 | **Video corto** | Prueba visual de operación | 1 video/mes de 30 a 60 s: tránsito, survey, esclusas, "qué es una PDA" · LinkedIn + YouTube + página de servicio | Vistas, tiempo en página | Teléfono + tiempo | Fase 5 |
| 13 | **WhatsApp Business** | Conversión inmediata 24/7 | Perfil completo (catálogo de servicios, horario 24/7, dirección), respuestas rápidas EN/ES, etiquetas por etapa, mensaje de bienvenida sin promesas de tiempos · número de guardia único en todo el sitio | Conversaciones iniciadas, tiempo de primera respuesta | 0 | Fase 1 |
| 14 | **Eventos** | Relación directa con decisores | Panama Maritime Conference & Exhibition (Cámara Marítima, verificar fecha), SMM Hamburgo (sept 2026), IBIA convention, Posidonia 2028; landing por evento con QR al formulario | Contactos calificados por evento | Viáticos (a decidir) | Fase 5 |
| 15 | **Meta (Facebook/Instagram)** | Solo marca local y reclutamiento | No es canal de captación B2B marítima; se usa para presencia local en Panamá y retargeting de visitantes del sitio con bajo presupuesto. El paquete CAPI de ECUS se activa solo si Irene decide pautar ahí. | Alcance local | 0 a 100 | Opcional |

**Regla de oro (de Daniel):** no prometer lo que no controlamos en ningún anuncio, formulario o mensaje. Variaciones de copy dentro del mismo anuncio, nunca un anuncio por variación.

---

## 18. Embudo comercial y automatización (integrado al sistema de ventas ECUS)

**Etapas del embudo y quién las mueve:**

| Etapa | Definición | Dónde se registra | Automatización |
|---|---|---|---|
| Visita | Sesión en el sitio | GA4 / Vercel Analytics | Atribución utm/gclid/fbclid guardada en cookie de primera parte |
| Lead | Formulario, WhatsApp o llamada | Tabla `leads` + CRM ECUS (hoja + Apps Script) | Email de confirmación al cliente, aviso a Cross World (email + WhatsApp), asignación por tipo de servicio, número de solicitud |
| Contactado | Primera respuesta humana | CRM (campo `primera_respuesta`) | Recordatorio si pasan 2 h sin respuesta; escalamiento al capitán a las 4 h |
| Calificado | Buque real, fecha real, principal identificado | CRM (etapa) | Evento GA4 `lead_qualified` (importación offline a Google Ads) |
| PDA enviada | Proforma emitida | CRM | Plantilla de PDA con marca; recordatorio de seguimiento a las 48 h |
| Nominado | Cliente nos nombra agente/surveyor | CRM | Conversión offline `nomination` a Google Ads (valor estimado); ficha de port call |
| Servicio prestado | Port call / survey / entrega hecha | CRM | Encuesta de 3 preguntas + solicitud de reseña en Google |
| FDA / factura | Cierre económico | CRM | Registro de monto (para CAC y retorno por canal) |
| Recurrente | Segundo servicio | CRM | Etiqueta "cliente"; newsletter; revisión anual |

**Integración concreta con el paquete ECUS (6 capas):** Captación (sitio + formularios + WhatsApp) → CRM (hoja "Leads Cross World" + Apps Script con la misma estructura de dash-ecus: alias de campos, número de solicitud, etapa, asesor, nota, venta) → Dashboard (clon de dash-ecus adaptado: embudo, origen, servicios, tiempos de respuesta, puertos; sin las vistas de Meta si no hay pauta ahí) → Señal (Google Ads Enhanced Conversions + importación offline de `qualified`/`nomination`; CAPI de Meta solo si se pauta) → Contacto (WhatsApp de guardia; plantillas EN/ES; reparto por tipo) → Medición (reporte mensual). El core y el mecanismo anti-deriva del paquete se reutilizan tal cual.

**Lead scoring simple (0 a 100):** IMO válido +25 · ETA en menos de 30 días +20 · principal owner/charterer/P&I +20 · email corporativo +15 · servicios de alto valor (STS, claims, bunker survey) +10 · país de armadores +10. ≥ 60 = prioridad alta (aviso al capitán).

**Secuencias de seguimiento (sin promesas):** lead sin respuesta nuestra a 2 h → alerta interna · lead que no contesta → recordatorio a 48 h y a 7 días, luego se archiva · PDA enviada sin decisión → seguimiento a 48 h y a 5 días · post-servicio → encuesta y reseña a los 3 días.

**SLA propuestos (a confirmar con Guillermo):** primera respuesta < 2 h (24/7) · PDA < 24 h · confirmación de surveyor < 4 h · informe de survey < 48 h tras la inspección · FDA < 15 días tras la salida.

---

## 19. Marca y materiales

- **Logo:** el ancla azul con "CROSS WORLD AGENCY" del profile. Se pide el vector; si no existe, se redibuja en SVG (ancla + wordmark) respetando la forma actual, con versiones horizontal, apilada, monocromo y para fondo oscuro. Área de protección y tamaños mínimos documentados en `brand/`.
- **Kit de marca (1 página):** paleta (grafito, papel, humo, cobalto), tipografía (Geist / Geist Mono), iconos (Phosphor), fotografía (operación real, luz natural, sin filtros pesados), voz (sección 16), usos incorrectos.
- **Materiales derivados del sitio (mismos tokens):** plantilla de PDA y FDA (PDF con marca, tabla de rubros, condiciones), firma de correo (nombre, cargo, teléfonos por lado del Canal, IMO, ISO), banner y avatar de LinkedIn (empresa y capitán), perfil de WhatsApp Business, tarjeta de presentación, **company profile v2** (PDF de 8 páginas rediseñado a partir del sitio; reemplaza al de 2025), plantilla de informe de survey (portada, datos del buque, hallazgos, fotos, cálculos, firma), plantilla de propuesta de servicios.
- **Sesión de fotos (shot list detallada):** 1) capitán en puente de mando con uniforme (horizontal y vertical) · 2) capitán en muelle con buque de fondo · 3) equipo en la oficina, RBS Tower (planos abiertos y detalle) · 4) fachada / vista de Paitilla · 5) tránsito por las esclusas visto desde cubierta (Miraflores o Gatún) · 6) operación de bunkering: manguera, medición de tanques, muestras selladas (con EPP) · 7) draft survey: lectura de calados · 8) inspección de escotillas · 9) certificados enmarcados · 10) detalle de manos con tablet/documentos a bordo · 11) puerto de Balboa y de Cristóbal (grúas, remolcadores) · 12) noche: luces del Canal. Formatos 3:2 y 4:5, mínimo 3.000 px, RAW + JPG.

---

## 20. Operación, gobernanza y mantenimiento

**Roles:** Guillermo (aprueba posicionamiento y contenidos técnicos, firma guías, responde solicitudes de alto valor) · Irene (comercial: seguimiento de leads en el CRM, reseñas, socios, pauta) · ECUS/Daniel (build, SEO/GEO, pauta, medición, reporte, mantenimiento) · Redacción (ECUS con revisión técnica del capitán).

**Rituales:** semanal 20 min (leads de la semana, respuestas pendientes, un post) · mensual 45 min (reporte, pauta, siguiente mes de contenidos) · trimestral (revisión de guías del Canal, certificados por vencer, keywords, directorios).

**Seguridad y continuidad:** 2FA en GitHub, Vercel, Google, LinkedIn, WhatsApp · secretos solo en variables de Vercel · dependencias actualizadas mensualmente (Dependabot) · backups: el contenido vive en git (historial completo) y los leads en Neon (backups diarios) + copia en la hoja del CRM · monitoreo de uptime (Vercel + checks externos) y alertas de errores · runbook de incidentes (sitio caído, formulario no envía, dominio, correo).

**Legal y cumplimiento:** política de privacidad (Ley 81 de 2019 Panamá; GDPR para UE), consentimiento de cookies solo si hay no esenciales, términos, disclaimer de tarifas y tiempos del Canal, derechos de imagen de fotos, permisos de logos, canal de ética (correo dedicado).

**Accesibilidad:** WCAG 2.2 AA (contraste, foco, teclado, etiquetas, reduced motion, tamaños táctiles ≥ 44 px, textos alternativos con sentido).

**Mantenimiento de contenido:** cada dato del Canal con fecha y responsable de revisión; certificados con alerta 60 días antes del vencimiento; puertos revisados semestralmente.

---

## 21. Presupuesto (estimado, USD)

| Concepto | Único | Mensual | Nota |
|---|---|---|---|
| Vercel Pro | 0 | ya pagado | Cuenta de ECUS |
| Dominio crossworldagency.com (renovación) | 0 | ~1,5 (15/año) | Verificar registrador y vencimiento |
| Resend (email transaccional) | 0 | 0 a 20 | Gratis hasta 3.000 correos/mes |
| Cloudflare Turnstile, Keystatic, GA4, Search Console, Bing | 0 | 0 | |
| Neon (base de leads) | 0 | 0 a 19 | Gratis en el arranque |
| Google Ads | 0 | 300 a 600 | Arranque con 300; escalar por CPL |
| LinkedIn Ads (opcional, fase 5) | 0 | 300 a 500 | Solo con lista ABM lista |
| Sesión de fotos | 150 a 400 | 0 | O hecha por Irene con la shot list |
| Membresías (Cámara Marítima de Panamá, BIMCO, IIMS) | a cotizar | a cotizar | Alta visibilidad; decidir en la reunión |
| Directorio Lloyd's List Intelligence (opcional) | a cotizar | | |
| Rank tracking (opcional) | 0 | 0 a 30 | Search Console alcanza al inicio |
| Honorarios ECUS (diseño, build, contenido, SEO, pauta, reporte) | según propuesta | según propuesta | Los define Daniel |

---

## 22. Listas de seguimiento

### 22.1 Las 25 keywords que rastreamos (mensual, posición y clics en Search Console)
EN: panama canal transit agent · panama canal agent · ship agency panama · panama shipping agency · panama shipping company · husbandry services panama · crew change panama · marine surveyor panama · bunker survey panama · bunkering panama · marine fuel panama · sts panama · ship to ship transfer panama · cargo claims panama · marine claims panama · panama canal transit cost · panama canal tolls · panama canal booking · port of balboa · port of cristobal · manzanillo panama port. ES: agencia naviera panamá · agente naviero panamá · inspección de bunker panamá · cuánto cuesta cruzar el canal de panamá.

### 22.2 Los 12 prompts de IA que sondeamos cada mes (ChatGPT, Perplexity, Gemini, Claude)
1. Who is a reliable ship agent for a Panama Canal transit? · 2. Recommend a marine surveyor in Balboa, Panama for a bunker survey · 3. Which companies handle P&I correspondent work in Panama? · 4. How much does it cost to transit the Panama Canal with a Panamax bulk carrier? · 5. What does a ship agent do during a Panama Canal transit? · 6. Best shipping agencies in Panama · 7. Who can arrange a ship-to-ship transfer in Panama? · 8. Bunker suppliers and bunker surveyors in Panama · 9. ¿Qué agencia naviera recomiendas en Panamá para un tránsito por el Canal? · 10. ¿Quién hace inspecciones de bunker en Balboa o Cristóbal? · 11. ¿Cuánto cuesta cruzar el Canal de Panamá con un buque tanque? · 12. Agencias marítimas certificadas ISO en Panamá.

### 22.3 Directorios y listados (checklist)
ACP: lista de agencias navieras autorizadas (verificar datos y contacto) · Cámara Marítima de Panamá (membresía + directorio) · BIMCO (membresía de agente) · ShipServ (perfil de agente/proveedor) · Findaport / port directories (agente por puerto Balboa, Cristóbal, Manzanillo) · Lloyd's List Intelligence directory (opcional, pago) · IBIA (bunker) · IIMS o similar (surveyors) · ITIC (indemnidad profesional, si se contrata) · Google Business Profile · Bing Places · Apple Business Connect · LinkedIn Company Page · Kompass Panamá · Páginas Amarillas Panamá · Listas de corresponsales de los clubes P&I (sección 17, canal 7). Regla: mismo nombre, dirección, teléfono, descripción y URL en todos.

### 22.4 Eventos 2026 a 2028 (verificar fechas)
SMM Hamburgo (septiembre 2026) · IBIA Annual Convention (Q4 2026) · Panama Maritime Conference & Exhibition (Cámara Marítima de Panamá; próxima edición a confirmar) · CMA Shipping (Stamford, marzo 2027) · Posidonia (Atenas, junio 2028).

---

## 23. Roadmap semana a semana

| Semana | ECUS (Daniel) | Cliente (Irene / Guillermo) | Entregable visible |
|---|---|---|---|
| **S0 · 27 a 29 ago** | Plan, research, competidores, repo, página de avances | Leer el plan; agendar reunión | Esta página |
| **S1 · 1 a 5 sep** | Scaffold Next.js 16, tokens y componentes base, layout, i18n, home v1, hub de servicios v1 | Reunión de arranque: aprobar posicionamiento, tagline, lista de servicios/puertos, SLA, números; entregar DNS/hosting y logo | Preview en Vercel de home + servicios |
| **S2 · 8 a 12 sep** | Formulario de port call completo (Server Action, Resend, Turnstile, tabla leads, webhook CRM), contacto, about, certificaciones; GA4/GTM; Lighthouse CI | Sesión de fotos; permisos de logos; certificados PDF | Formulario funcionando de punta a punta |
| **S3 · 15 a 19 sep** | 7 páginas de servicio (EN) + who we serve + puertos; schema por plantilla | Revisión técnica de textos de servicios | Sitio EN completo en preview |
| **S4 · 22 a 26 sep** | Traducción ES completa, hreflang, guía pilar del Canal, resources, casos | Revisión del ES y de la guía; 3 casos reales; testimonios | Sitio bilingüe completo |
| **S5 · 29 sep a 3 oct** | Keystatic, blog, 4 primeras piezas, llms.txt, sitemap, robots, OG, RSS, Playwright, a11y | Guillermo firma las guías; foto y bio | Blog vivo; checklist técnico 100% |
| **S6 · 6 a 10 oct** | QA final, rendimiento, mapa de 301, plan de DNS, GBP y directorios preparados, CRM y dashboard listos | Cuenta de Google y LinkedIn; WhatsApp Business configurado | Candidato a lanzamiento |
| **S7 · 13 a 17 oct** | DNS a Vercel, HSTS, envío de sitemaps, GBP publicado, campañas de Google Ads en pausa listas, monitoreo 72 h, comunicado | Anuncio en LinkedIn; pedir 5 reseñas | **Lanzamiento** |
| **Mensual desde oct** | 2+2 piezas, reporte, pauta, sondeo de IA, outreach, directorios | Seguimiento de leads, reseñas, socios | Reporte mensual |

---

## 24. Checklist de lanzamiento (Definition of Done)

**Contenido:** todas las páginas EN y ES con texto final aprobado · sin Lorem Ipsum ni placeholders de texto · imágenes reales o placeholders aprobados y marcados · certificados con vigencia · NAP idéntico en sitio, GBP, LinkedIn y schema · datos del Canal con fuente y fecha · copy sin promesas no controladas ni guiones largos.
**SEO/GEO:** títulos y meta descriptions únicos · H1 único · canonical · hreflang recíproco + x-default · sitemap enviado a Google y Bing · robots permite bots de IA · JSON-LD válido en cada plantilla (validado con Rich Results y Schema.org validator) · llms.txt y llms-full.txt · OG por página · 301 de todas las URLs viejas · 404 personalizada · RSS.
**Rendimiento y calidad:** Lighthouse móvil ≥ 95 perf / 95 a11y / 100 SEO en home, servicio, guía, post, contacto · LCP < 2,0 s, INP < 150 ms, CLS < 0,05 en Speed Insights · JS de la home < 150 KB · fuentes con next/font · imágenes AVIF/WebP con tamaños · sin errores de consola · Playwright verde (formularios, i18n, 404, enlaces) · axe sin violaciones críticas.
**Conversión y medición:** formulario de port call probado en EN y ES con email real, aviso a WhatsApp, fila en `leads` y en el CRM · número de solicitud generado · Turnstile activo · eventos GA4 verificados en DebugView · Enhanced Conversions configuradas · atribución guardada · WhatsApp y teléfonos correctos en todas las páginas · GBP publicado con fotos y servicios.
**Seguridad y legal:** HSTS, CSP, headers · 2FA en todas las cuentas · secretos solo en Vercel · privacidad, términos y disclaimer publicados · consentimiento si aplica.
**Operación:** Keystatic funcionando con acceso de Guillermo e Irene · guía de 1 página "cómo publicar un post" · runbook de incidentes · reporte mensual programado · calendario de revisiones trimestrales.

---

## 25. Preguntas para la reunión de arranque con Irene y Guillermo

1. ¿Tagline A, B o C (sección 16)? ¿"Cross World Agency" o "Cross World Agencies" como marca visible?
2. ¿Qué puertos atienden de verdad hoy y con qué frecuencia? (Balboa, Cristóbal, Manzanillo, Colón, PSA, Rodman, otros)
3. ¿SLA reales que podemos publicar? (primera respuesta, PDA, surveyor, informe, FDA)
4. ¿Número de WhatsApp de guardia y emails por área? ¿Quién contesta de noche?
5. ¿SOS Resilience Holding se muestra como marca aparte o como línea "Bunkering & oil operations"? ¿Cómo separamos survey y comercialización para evitar conflicto de interés percibido?
6. ¿Qué socios y clientes autorizan logo y testimonio? ¿Tenemos 3 casos reales para contar?
7. ¿Acceso al dominio (registrador) y al hosting actual? ¿Quién administra el correo gpena@?
8. ¿Cuenta de Google, LinkedIn de la empresa y del capitán? ¿Existe Google Business Profile?
9. ¿Presupuesto inicial de pauta (Google Ads) y si LinkedIn Ads entra en fase 5?
10. ¿Membresías: Cámara Marítima de Panamá, BIMCO, IIMS? ¿Cobertura ITIC?
11. ¿Los certificados ISO están vigentes y podemos publicar número y fecha?
12. ¿Quién del equipo va a publicar en Keystatic y en LinkedIn? ¿Quién revisa técnicamente los textos?

---

## 26. Registro de riesgos

| Riesgo | Prob. | Impacto | Mitigación | Dueño |
|---|---|---|---|---|
| Insumos del cliente tardan (fotos, SLA, puertos, permisos) | Alta | Medio | Construir con el company profile y placeholders marcados; nada bloquea el build; reunión de arranque en S1 | ECUS + Irene |
| No hay acceso al dominio o al hosting | Media | Alto | Pedirlo en S1; identificar registrador por WHOIS; plan B: subdominio temporal en Vercel para previews | Irene |
| Cifras del Canal desactualizadas al publicar | Media | Alto (credibilidad) | Toda cifra con fuente y fecha; revisión trimestral en calendario; disclaimer | ECUS + Guillermo |
| Conflicto de interés percibido (survey + venta de combustible) | Media | Medio | Nota de independencia en la página; surveyor tercero a pedido; SOS Resilience como línea separada | Guillermo |
| Confusión de marca con Cross Roads Agencies | Alta | Medio | GBP, schema, campaña de marca, contenido firmado, PR | ECUS |
| Spam en formularios | Alta | Bajo | Turnstile, rate limit, honeypot, validación de IMO | ECUS |
| Leads sin respuesta a tiempo | Media | Alto | Alertas a 2 h y 4 h, WhatsApp de guardia, SLA visible solo si se cumple | Irene + Guillermo |
| Push de GitHub bloqueado por permisos en alguna sesión | Media | Bajo | Daniel corre el push o ajusta permisos; scripts listos | Daniel |
| Adimar/PSS copian el ángulo bilingüe | Baja | Medio | Ventaja de credenciales y autor real; velocidad de lanzamiento | ECUS |
| Certificados ISO vencidos o no publicables | Baja | Alto | Confirmar vigencia en S1; alerta 60 días antes; mostrar solo lo vigente | Guillermo |

## 27. Bitácora de versiones del plan
- **v1.0 · 27-ago-2026:** plan inicial (secciones 0 a 14), keyword research, competidores, repo y página de avances.
- **v1.1 · 28-ago-2026:** secciones 15 a 25 (página por página, copy deck, adquisición, embudo, marca, operación, presupuesto, listas, roadmap semanal, checklist, preguntas).
- **v1.2 · 28-ago-2026:** especificación técnica, contenido v0 con cifras oficiales de la ACP (tarifas y OP Notice N-7-2026), sistema de diseño v0 con mock del hero, mapa de 301 real (7 URLs del sitio viejo), registro de riesgos.
