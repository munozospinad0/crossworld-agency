import type {Locale} from '@/i18n/routing';

export type ServiceCta = 'portcall' | 'surveyor' | 'fuel' | 'attendance';

export type Service = {
  key: string;
  slug: Record<Locale, string>;
  cta: ServiceCta;
  image: string;
  imageAlt: Record<Locale, string>;
  title: Record<Locale, string>;
  oneLiner: Record<Locale, string>;
  h1: Record<Locale, string>;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  summary: Record<Locale, string>;
  includes: Record<Locale, string[]>;
  deliverables: Record<Locale, {name: string; timing: string}[]>;
  ports: Record<Locale, string>;
  steps: Record<Locale, string[]>;
  why: Record<Locale, string[]>;
  independence?: Record<Locale, string>;
  faq: Record<Locale, {q: string; a: string}[]>;
  related: string[];
};

export const services: Service[] = [
  {
    key: 'agency',
    slug: {en: 'ship-agency-panama-canal-transit', es: 'agencia-naviera-transito-canal-de-panama'},
    cta: 'portcall',
    image: '/images/canal-transit.jpg',
    imageAlt: {en: 'Vessel entering the locks of the Panama Canal, seen from the deck', es: 'Buque entrando a las esclusas del Canal de Panamá, visto desde cubierta'},
    title: {en: 'Ship agency & Canal transit', es: 'Agencia naviera y tránsito del Canal'},
    oneLiner: {en: 'Nomination to FDA, both sides of the Canal.', es: 'De la nominación a la FDA, en ambos lados del Canal.'},
    h1: {en: 'Panama Canal transit agent and husbandry services', es: 'Agente de tránsito del Canal de Panamá y servicios de husbandry'},
    metaTitle: {en: 'Panama Canal Transit Agent & Husbandry | Cross World Agency', es: 'Agente de tránsito del Canal de Panamá y husbandry | Cross World Agency'},
    metaDescription: {en: 'AMP-licensed ship agency authorized by the Panama Canal Authority since 2010. Transits, husbandry, crew changes and PDA/FDA at Balboa and Cristóbal. 24/7.', es: 'Agencia naviera con licencia AMP y autorización de la ACP desde 2010. Tránsitos, husbandry, cambios de tripulación y PDA/FDA en Balboa y Cristóbal. 24/7.'},
    summary: {
      en: 'We are an AMP-licensed ship agency authorized by the Panama Canal Authority, handling transits, port calls and husbandry at Balboa, Cristóbal and the Panamanian ports we serve since 2010. One officer, one thread, from nomination to FDA.',
      es: 'Somos una agencia naviera con licencia de la Autoridad Marítima de Panamá y autorización de la Autoridad del Canal. Atendemos tránsitos, escalas y husbandry en Balboa, Cristóbal y los puertos panameños que servimos desde 2010. Un oficial, un hilo, de la nominación a la FDA.',
    },
    includes: {
      en: ['Transit booking and slot strategy: booking periods, LoTSA, auctions and just-in-time', 'Pre-arrival documentation through the ACP electronic system at least 96 hours before arrival', 'PCSOPEP coordination and Panama-resident authorized person (to confirm)', 'PDA, funds call and FDA reconciled line by line', 'Boarding at anchorage, pilot and tug coordination', 'Crew changes, immigration and transport', 'Cash to master, spares and courier, provisions, fresh water, medical', 'Protecting agency when the charterer nominates another agent', "Owners' matters at both terminals"],
      es: ['Reserva de tránsito y estrategia de slots: periodos de booking, LoTSA, subastas y just-in-time', 'Documentación de prearribo en el sistema electrónico de la ACP al menos 96 horas antes', 'Coordinación PCSOPEP y persona autorizada residente en Panamá (a confirmar)', 'PDA, llamado de fondos y FDA conciliada línea por línea', 'Abordaje en el fondeadero, coordinación de prácticos y remolcadores', 'Cambios de tripulación, migración y transporte', 'Cash to master, repuestos y courier, provisiones, agua, atención médica', 'Agencia protectora cuando el fletador nombra otro agente', 'Asuntos del armador en ambos terminales'],
    },
    deliverables: {
      en: [{name: 'Request acknowledgement with number', timing: 'Immediately'}, {name: 'Proforma disbursement account', timing: 'Same working day for standard transits, within 24 h otherwise (to confirm)'}, {name: 'Daily update while in Canal waters', timing: 'Every day'}, {name: 'FDA reconciled against the PDA, with vouchers', timing: 'Within 30 days of sailing (to confirm)'}],
      es: [{name: 'Acuse de recibo con número de solicitud', timing: 'Inmediato'}, {name: 'Cuenta proforma (PDA)', timing: 'El mismo día hábil para tránsitos estándar, en menos de 24 h en los demás (a confirmar)'}, {name: 'Reporte diario en aguas del Canal', timing: 'Cada día'}, {name: 'FDA conciliada contra la PDA, con comprobantes', timing: 'Dentro de 30 días de la salida (a confirmar)'}],
    },
    ports: {en: 'Balboa (Pacific), Cristóbal (Atlantic) and the Panamanian ports we serve (list to confirm).', es: 'Balboa (Pacífico), Cristóbal (Atlántico) y los puertos panameños que atendemos (lista a confirmar).'},
    steps: {
      en: ['Send vessel name, IMO, ETA, direction and the services you need.', 'Receive the PDA and confirm the nomination.', 'We take it from there and keep you updated in one thread.'],
      es: ['Envíe nombre del buque, IMO, ETA, dirección y los servicios que necesita.', 'Reciba la PDA y confirme la nominación.', 'Nosotros seguimos desde ahí y le mantenemos informado en un solo hilo.'],
    },
    why: {
      en: ['A captain reviews every transit plan.', 'Independent surveyors in house: a bunker or draft survey during the call is one call, not two vendors.', 'ISO 9001 certified processes.'],
      es: ['Un capitán revisa cada plan de tránsito.', 'Surveyors independientes en casa: una inspección de bunker o de calados durante la escala es una sola llamada, no dos proveedores.', 'Procesos certificados ISO 9001.'],
    },
    faq: {
      en: [
        {q: 'What does a Panama Canal agent actually do?', a: 'Books the transit, files the pre-arrival package with the Authority, calls and guarantees the funds for tolls and fees, coordinates pilots, tugs and linehandlers, boards the vessel, handles crew and supplies, and closes the call with a reconciled FDA.'},
        {q: 'How early should I nominate?', a: 'As soon as the voyage is fixed. Booking periods open 90 days before the transit for the Panamax locks and 90 days before for Neopanamax (ACP OP Notice N-7-2026); late nominations cost more.'},
        {q: 'What is the difference between an owner\'s nominated, a charterer\'s nominated and a protecting agent?', a: 'The nominated agent handles the call for the party that appoints it. A protecting agent looks after the owner\'s interests when the charterer has appointed the operating agent.'},
        {q: 'When are funds due?', a: 'The ACP requires funds 48 hours before transit. We call them 72 hours ahead so there is margin for bank delays.'},
      ],
      es: [
        {q: '¿Qué hace realmente un agente del Canal de Panamá?', a: 'Reserva el tránsito, presenta la documentación de prearribo ante la Autoridad, llama y garantiza los fondos de peajes y tasas, coordina prácticos, remolcadores y pasacables, aborda el buque, atiende tripulación y suministros y cierra la escala con una FDA conciliada.'},
        {q: '¿Con cuánta anticipación debo nominar?', a: 'En cuanto el viaje esté fijado. Los periodos de reserva abren 90 días antes del tránsito (OP Notice N-7-2026 de la ACP); nominar tarde cuesta más.'},
        {q: '¿Cuál es la diferencia entre agente nominado por el armador, por el fletador y agente protector?', a: 'El agente nominado atiende la escala para quien lo nombra. El agente protector cuida los intereses del armador cuando el fletador nombró al agente operativo.'},
        {q: '¿Cuándo se pagan los fondos?', a: 'La ACP exige los fondos 48 horas antes del tránsito. Nosotros los llamamos 72 horas antes para tener margen bancario.'},
      ],
    },
    related: ['surveys', 'bunker'],
  },
  {
    key: 'surveys',
    slug: {en: 'marine-surveys', es: 'inspecciones-maritimas'},
    cta: 'surveyor',
    image: '/images/port-cranes.jpg',
    imageAlt: {en: 'Container terminal cranes at a Panamanian port', es: 'Grúas de un terminal de contenedores en un puerto panameño'},
    title: {en: 'Marine surveys', es: 'Inspecciones marítimas'},
    oneLiner: {en: 'Independent surveys, reported in the format underwriters and P&I clubs expect.', es: 'Inspecciones independientes, en el formato que esperan aseguradores y clubes P&I.'},
    h1: {en: 'Marine surveys and inspections in Panama', es: 'Inspecciones marítimas en Panamá'},
    metaTitle: {en: 'Marine Surveys in Panama: Draft, Condition, Pre-purchase | Cross World Agency', es: 'Inspecciones marítimas en Panamá: calados, condición, precompra | Cross World Agency'},
    metaDescription: {en: 'Independent marine surveys at both ends of the Panama Canal: draft, petroleum, condition, pre-purchase, hatch cover and ISM audits. Reviewed by a captain with ISM auditor credentials.', es: 'Inspecciones marítimas independientes en ambos lados del Canal de Panamá: calados, petróleo, condición, precompra, escotillas y auditorías ISM. Revisadas por un capitán auditor ISM.'},
    summary: {
      en: 'Independent marine surveys at both ends of the Panama Canal, attended by our surveyors and reviewed by a captain with ISM internal auditor credentials. Reports in the format owners, charterers, underwriters and P&I clubs expect.',
      es: 'Inspecciones marítimas independientes en ambos lados del Canal de Panamá, atendidas por nuestros surveyors y revisadas por un capitán con credencial de auditor interno ISM. Informes en el formato que esperan armadores, fletadores, aseguradores y clubes P&I.',
    },
    includes: {
      en: ['Draft surveys (initial, intermediate, final) and cargo quantity determination', 'Petroleum surveys, crude and products, with ROB and ullage reports', 'Pre-purchase and condition surveys', 'P&I vessel condition surveys', 'Hatch cover integrity, ultrasonic tested', 'Load, stow and securing (lashing) surveys', 'Tank condition and corrosion assessment', 'ISM internal audits', 'Loss control attendance and marine expediting', 'Project cargo warranty surveys and risk management', 'On-hire and off-hire surveys (bunker and condition)'],
      es: ['Draft surveys (inicial, intermedio, final) y determinación de cantidad de carga', 'Inspecciones de petróleo, crudo y productos, con ROB y ullages', 'Inspecciones de precompra y de condición', 'Inspecciones de condición para P&I', 'Integridad de tapas de escotilla con prueba ultrasónica', 'Inspecciones de carga, estiba y trincado', 'Evaluación de tanques y corrosión', 'Auditorías internas ISM', 'Loss control y expediting marítimo', 'Warranty surveys de carga de proyecto y gestión de riesgo', 'Inspecciones on-hire y off-hire (bunker y condición)'],
    },
    deliverables: {
      en: [{name: 'Preliminary findings by WhatsApp', timing: 'Same day'}, {name: 'Full report with photos, calculations and recommendations', timing: 'Within 48 hours (to confirm)'}, {name: 'Certificates where applicable', timing: 'With the report'}, {name: 'Rate card (hourly, minimum, travel, report)', timing: 'On request'}],
      es: [{name: 'Hallazgos preliminares por WhatsApp', timing: 'El mismo día'}, {name: 'Informe completo con fotos, cálculos y recomendaciones', timing: 'Dentro de 48 horas (a confirmar)'}, {name: 'Certificados cuando aplica', timing: 'Con el informe'}, {name: 'Tarifa (hora, mínimo, viáticos, informe)', timing: 'A solicitud'}],
    },
    ports: {en: 'Balboa, Cristóbal and the anchorages and terminals we serve.', es: 'Balboa, Cristóbal y los fondeaderos y terminales que atendemos.'},
    steps: {
      en: ['Send survey type, port, date, vessel name and your instructions.', 'We confirm availability and the surveyor assigned.', 'You receive preliminary findings the same day and the report within 48 hours (to confirm).'],
      es: ['Envíe tipo de inspección, puerto, fecha, nombre del buque e instrucciones.', 'Confirmamos disponibilidad y el surveyor asignado.', 'Recibe hallazgos preliminares el mismo día y el informe en 48 horas (a confirmar).'],
    },
    why: {
      en: ['The person who reviews the report has commanded ships.', 'Surveyors and agency under one roof: attendance at Balboa or Cristóbal is one call.', '24/7.'],
      es: ['Quien revisa el informe ha comandado buques.', 'Surveyors y agencia bajo un mismo techo: la atención en Balboa o Cristóbal es una sola llamada.', '24/7.'],
    },
    independence: {
      en: 'We survey under the instructions of the party that appoints us and never attend deliveries or cargoes that Cross World or its affiliates market.',
      es: 'Inspeccionamos bajo las instrucciones de quien nos nombra y nunca atendemos entregas ni cargas que Cross World o sus afiliadas comercialicen.',
    },
    faq: {
      en: [
        {q: 'How accurate is a draft survey?', a: 'Under normal conditions a draft survey determines cargo quantity within about 0.5% of the true figure. Sea state, trim, density sampling and the accuracy of the vessel\'s tables move that margin.'},
        {q: 'Can you attend on short notice?', a: 'Yes. We attend 24/7 at Balboa and Cristóbal; confirm the assignment with the duty officer.'},
        {q: 'Which formats do you deliver?', a: 'PDF report with photos and calculations, plus raw data on request.'},
      ],
      es: [
        {q: '¿Qué precisión tiene un draft survey?', a: 'En condiciones normales determina la cantidad de carga con un margen cercano al 0,5%. El estado del mar, el asiento, el muestreo de densidad y la precisión de las tablas del buque mueven ese margen.'},
        {q: '¿Pueden atender con poco aviso?', a: 'Sí. Atendemos 24/7 en Balboa y Cristóbal; confirme la asignación con el oficial de guardia.'},
        {q: '¿En qué formatos entregan?', a: 'Informe en PDF con fotos y cálculos, más datos crudos a solicitud.'},
      ],
    },
    related: ['bunker', 'claims'],
  },
  {
    key: 'bunker',
    slug: {en: 'bunker-surveys-and-claims-support', es: 'inspecciones-de-bunker-y-soporte-a-reclamos'},
    cta: 'surveyor',
    image: '/images/oil-terminal.jpg',
    imageAlt: {en: 'Oil terminal at dusk', es: 'Terminal petrolero al atardecer'},
    title: {en: 'Bunker surveys & claims support', es: 'Inspecciones de bunker y soporte a reclamos'},
    oneLiner: {en: 'We measure, sample and document so the claim stands on evidence.', es: 'Medimos, muestreamos y documentamos para que el reclamo se sostenga en evidencia.'},
    h1: {en: 'Bunker surveys and bunker claims support in Panama', es: 'Inspecciones de bunker y soporte a reclamos en Panamá'},
    metaTitle: {en: 'Bunker Surveys & Bunker Claims Support in Panama | Cross World Agency', es: 'Inspecciones de bunker y reclamos en Panamá | Cross World Agency'},
    metaDescription: {en: 'Bunker quantity surveys, BSIS, on/off hire surveys and claim files at Balboa and Cristóbal. Sampling per ISO 13739 and MARPOL Annex VI; letter of protest before the barge disconnects.', es: 'Inspecciones de cantidad de bunker, BSIS, on/off hire y expedientes de reclamo en Balboa y Cristóbal. Muestreo según ISO 13739 y MARPOL Anexo VI; carta de protesta antes de que la barcaza desconecte.'},
    summary: {
      en: 'Panama sold 427,985 tonnes of bunkers in July 2026 (Manifold Times, AMP data). Every delivery is a potential quantity or quality dispute. We attend the stem, witness sampling and soundings, and document everything so that, if there is a shortfall or off-spec fuel, the claim stands on evidence. You get a claim file your club, your lawyer or the supplier can act on.',
      es: 'Panamá vendió 427.985 toneladas de bunker en julio de 2026 (Manifold Times, datos de la AMP). Cada entrega es una posible disputa de cantidad o calidad. Atendemos la entrega, presenciamos el muestreo y los sondeos y documentamos todo para que, si hay faltante o combustible fuera de especificación, el reclamo se sostenga en evidencia. Usted recibe un expediente listo para su club, su abogado o el proveedor.',
    },
    includes: {
      en: ['Bunker quantity surveys (delivery and redelivery)', 'Bunker stem investigative surveys (BSIS)', 'On-hire and off-hire bunker surveys', 'Protective surveyor and superintendent during bunkering', 'MARPOL and commercial sample custody', 'Sludge and slop disposal supervision', 'Overconsumption and voyage underperformance investigations', 'Claim file preparation and time-bar tracking'],
      es: ['Inspecciones de cantidad de bunker (entrega y reentrega)', 'Inspecciones investigativas de entrega (BSIS)', 'Inspecciones de bunker on-hire y off-hire', 'Surveyor protector y superintendente durante el bunkering', 'Custodia de muestras MARPOL y comerciales', 'Supervisión de descarga de lodos y slops', 'Investigación de sobreconsumo y bajo rendimiento de viaje', 'Preparación del expediente de reclamo y control de plazos'],
    },
    deliverables: {
      en: [{name: 'Survey report: BDN vs. soundings, volume correction per ASTM D1250 / API MPMS Ch. 11.1, sampling per ISO 13739 and MARPOL Annex VI Reg. 18, quality against ISO 8217, sample seals and photos', timing: 'Within 48 hours (to confirm)'}, {name: 'Letter of protest prepared for the Master\'s signature', timing: 'Before the barge disconnects (to confirm)'}, {name: 'Claim file for the P&I club, the lawyer or the supplier', timing: 'With the report'}],
      es: [{name: 'Informe: BDN vs. sondeos, corrección de volumen según ASTM D1250 / API MPMS Cap. 11.1, muestreo según ISO 13739 y MARPOL Anexo VI Reg. 18, calidad contra ISO 8217, sellos de muestras y fotos', timing: 'Dentro de 48 horas (a confirmar)'}, {name: 'Carta de protesta preparada para la firma del capitán', timing: 'Antes de que la barcaza desconecte (a confirmar)'}, {name: 'Expediente de reclamo para el club P&I, el abogado o el proveedor', timing: 'Con el informe'}],
    },
    ports: {en: 'Balboa and Cristóbal anchorages and the terminals we serve.', es: 'Fondeaderos de Balboa y Cristóbal y los terminales que atendemos.'},
    steps: {
      en: ['Send the stem details: vessel, supplier, barge, product, quantity, ETA.', 'Our surveyor boards before the barge connects.', 'You receive the report and, if needed, the letter of protest and the claim file.'],
      es: ['Envíe los datos de la entrega: buque, proveedor, barcaza, producto, cantidad, ETA.', 'Nuestro surveyor aborda antes de que la barcaza conecte.', 'Recibe el informe y, si hace falta, la carta de protesta y el expediente.'],
    },
    why: {
      en: ['Measurement, sampling and documentation follow the standards suppliers and clubs recognise.', 'Time bars are tracked from the moment of delivery.', 'Independent: we never attend supplies that Cross World or its affiliates market.'],
      es: ['Medición, muestreo y documentación siguen las normas que reconocen proveedores y clubes.', 'Los plazos se controlan desde el momento de la entrega.', 'Independientes: nunca atendemos entregas que Cross World o sus afiliadas comercialicen.'],
    },
    independence: {
      en: 'Survey and fuel marketing are separate businesses. Deliveries marketed by Cross World or its affiliates are always attended by an independent surveyor.',
      es: 'Inspección y comercialización de combustible son negocios separados. Las entregas que Cross World o sus afiliadas comercializan siempre las atiende un surveyor independiente.',
    },
    faq: {
      en: [
        {q: 'What should the chief engineer do if the BDN does not match the soundings?', a: 'Do not sign the BDN without remarks, keep the sealed samples, note the discrepancy and call the surveyor before the barge disconnects. A letter of protest issued afterwards is much weaker.'},
        {q: 'Who keeps the MARPOL sample?', a: 'The vessel keeps the MARPOL sample sealed on board for at least 12 months; the commercial samples are split between vessel, supplier and surveyor.'},
        {q: 'How long do I have to claim?', a: 'Time bars follow the supplier\'s terms, often 7 days for quantity and 15 to 30 days for quality, so sampling and protest must happen before the barge disconnects.'},
      ],
      es: [
        {q: '¿Qué debe hacer el jefe de máquinas si el BDN no coincide con los sondeos?', a: 'No firmar el BDN sin observaciones, conservar las muestras selladas, anotar la discrepancia y llamar al surveyor antes de que la barcaza desconecte. Una carta de protesta emitida después vale mucho menos.'},
        {q: '¿Quién conserva la muestra MARPOL?', a: 'El buque la conserva sellada a bordo al menos 12 meses; las muestras comerciales se reparten entre buque, proveedor y surveyor.'},
        {q: '¿Cuánto plazo tengo para reclamar?', a: 'Los plazos siguen las condiciones del proveedor, a menudo 7 días para cantidad y 15 a 30 días para calidad, así que el muestreo y la protesta deben ocurrir antes de que la barcaza desconecte.'},
      ],
    },
    related: ['surveys', 'fuel'],
  },
  {
    key: 'fuel',
    slug: {en: 'marine-fuel-supply', es: 'suministro-de-combustible-marino'},
    cta: 'fuel',
    image: '/images/oil-terminal.jpg',
    imageAlt: {en: 'Oil terminal at dusk', es: 'Terminal petrolero al atardecer'},
    title: {en: 'Marine fuel supply', es: 'Suministro de combustible marino'},
    oneLiner: {en: 'MGO and ULSD arranged in Panama, CIF or FOB, quantity verified by an independent surveyor.', es: 'MGO y ULSD en Panamá, CIF o FOB, con cantidad verificada por un surveyor independiente.'},
    h1: {en: 'Marine fuel supply in Panama', es: 'Suministro de combustible marino en Panamá'},
    metaTitle: {en: 'Marine Fuel Supply in Panama: MGO and ULSD | Cross World Agency', es: 'Suministro de combustible marino en Panamá: MGO y ULSD | Cross World Agency'},
    metaDescription: {en: 'MGO and ULSD arranged in Panama through licensed physical suppliers, CIF or FOB, for operators in Central America, the Caribbean and South America and for fishing fleets. Independent quantity verification.', es: 'MGO y ULSD en Panamá a través de proveedores físicos licenciados, CIF o FOB, para operadores de Centroamérica, el Caribe y Suramérica y para flotas pesqueras. Verificación independiente de cantidad.'},
    summary: {
      en: 'Through SOS Resilience Holding (presentation to confirm), Cross World arranges MGO and ULSD in Panama through licensed physical suppliers, under CIF and FOB contracts, for operators in Central America, the Caribbean and South America and for fishing fleets calling at Panamanian ports. Every delivery we market is quantity-surveyed by an independent third-party surveyor.',
      es: 'A través de SOS Resilience Holding (presentación a confirmar), Cross World gestiona MGO y ULSD en Panamá mediante proveedores físicos licenciados, bajo contratos CIF y FOB, para operadores de Centroamérica, el Caribe y Suramérica y para flotas pesqueras que recalan en puertos panameños. Cada entrega que comercializamos la verifica un surveyor independiente.',
    },
    includes: {
      en: ['MGO 0.10% S and ULSD (products, terminal and delivery ports to confirm)', 'Term and spot contracts, CIF or FOB', 'Supply coordination with the agency: one call for the port call and the fuel', 'Independent third-party quantity and quality verification', 'Documentation: BDN, samples, certificates', 'Credit terms for fishing fleets (to confirm)'],
      es: ['MGO 0,10% S y ULSD (productos, terminal y puertos de entrega a confirmar)', 'Contratos a término y spot, CIF o FOB', 'Coordinación con la agencia: una sola llamada para la escala y el combustible', 'Verificación independiente de cantidad y calidad', 'Documentación: BDN, muestras, certificados', 'Condiciones de crédito para flotas pesqueras (a confirmar)'],
    },
    deliverables: {
      en: [{name: 'Quote with product, quantity, port, window and terms', timing: 'Same working day (to confirm)'}, {name: 'Delivery with BDN, sealed samples and independent survey report', timing: 'At delivery'}],
      es: [{name: 'Cotización con producto, cantidad, puerto, ventana y condiciones', timing: 'El mismo día hábil (a confirmar)'}, {name: 'Entrega con BDN, muestras selladas e informe de surveyor independiente', timing: 'En la entrega'}],
    },
    ports: {en: 'Balboa and Cristóbal (to confirm).', es: 'Balboa y Cristóbal (a confirmar).'},
    steps: {
      en: ['Send product, quantity in tonnes, port and delivery window.', 'Receive the quote and confirm.', 'Delivery is attended by an independent surveyor; you receive BDN, samples and report.'],
      es: ['Envíe producto, cantidad en toneladas, puerto y ventana de entrega.', 'Reciba la cotización y confirme.', 'La entrega la atiende un surveyor independiente; recibe BDN, muestras e informe.'],
    },
    why: {
      en: ['One call for the port call and the fuel.', 'Independent verification on every delivery we market.', 'Spanish-speaking desk for regional operators and fishing fleets.'],
      es: ['Una sola llamada para la escala y el combustible.', 'Verificación independiente en cada entrega que comercializamos.', 'Atención en español para operadores regionales y flotas pesqueras.'],
    },
    independence: {
      en: 'Survey and fuel marketing are separate businesses. Deliveries marketed by Cross World or its affiliates are always attended by an independent surveyor appointed by the buyer or, at the buyer\'s choice, by us.',
      es: 'Inspección y comercialización de combustible son negocios separados. Las entregas que comercializamos siempre las atiende un surveyor independiente nombrado por el comprador o, a elección del comprador, por nosotros.',
    },
    faq: {
      en: [
        {q: 'Which grades are available?', a: 'MGO 0.10% S and ULSD (to confirm with the desk); other grades on request.'},
        {q: 'Who surveys the delivery?', a: 'An independent third-party surveyor, never our own team.'},
        {q: 'What are the payment terms?', a: 'Prepayment for spot supplies; credit terms for fishing fleets and term contracts on request (to confirm).'},
      ],
      es: [
        {q: '¿Qué grados hay disponibles?', a: 'MGO 0,10% S y ULSD (a confirmar); otros grados a solicitud.'},
        {q: '¿Quién inspecciona la entrega?', a: 'Un surveyor independiente, nunca nuestro propio equipo.'},
        {q: '¿Cuáles son las condiciones de pago?', a: 'Prepago para suministros spot; crédito para flotas pesqueras y contratos a término a solicitud (a confirmar).'},
      ],
    },
    related: ['bunker', 'agency'],
  },
  {
    key: 'sts',
    slug: {en: 'ship-to-ship-and-offshore', es: 'ship-to-ship-y-offshore'},
    cta: 'portcall',
    image: '/images/container-terminal.jpg',
    imageAlt: {en: 'Container ship alongside a terminal', es: 'Portacontenedores atracado en un terminal'},
    title: {en: 'Ship-to-ship & offshore', es: 'Ship-to-ship y offshore'},
    oneLiner: {en: 'STS and terminal operations planned, attended and documented.', es: 'Operaciones ship-to-ship y de terminal planificadas, atendidas y documentadas.'},
    h1: {en: 'Ship-to-ship transfers and offshore support in Panama', es: 'Transferencias ship-to-ship y soporte offshore en Panamá'},
    metaTitle: {en: 'Ship-to-Ship Transfers & Offshore Support in Panama | Cross World Agency', es: 'Transferencias ship-to-ship y offshore en Panamá | Cross World Agency'},
    metaDescription: {en: 'STS operations at Panama anchorages and terminals: permits, mooring master coordination, pre- and post-transfer surveys, offshore platform and oil terminal support.', es: 'Operaciones STS en fondeaderos y terminales de Panamá: permisos, coordinación de mooring master, inspecciones antes y después de la transferencia, soporte a plataformas y terminales petroleros.'},
    summary: {
      en: 'STS operations at Panama anchorages and terminals, planned, attended and documented: permits with the Authority, mooring master and equipment coordination, surveys before and after transfer, and the agency work around it.',
      es: 'Operaciones STS en fondeaderos y terminales de Panamá, planificadas, atendidas y documentadas: permisos ante la Autoridad, coordinación de mooring master y equipos, inspecciones antes y después de la transferencia, y el trabajo de agencia alrededor.',
    },
    includes: {
      en: ['STS planning and permits with the Authority', 'Mooring master, fenders and hoses coordination (providers to confirm)', 'Pre- and post-transfer quantity surveys', 'Offshore platform and oil terminal support', 'Petcoke and bulk transfer attendance', 'Incident documentation'],
      es: ['Planificación STS y permisos ante la Autoridad', 'Coordinación de mooring master, defensas y mangueras (proveedores a confirmar)', 'Inspecciones de cantidad antes y después de la transferencia', 'Soporte a plataformas offshore y terminales petroleros', 'Atención de transferencias de petcoke y graneles', 'Documentación de incidentes'],
    },
    deliverables: {
      en: [{name: 'Operation plan and permits', timing: 'Before the operation'}, {name: 'Quantity survey reports, before and after', timing: 'Within 48 hours (to confirm)'}],
      es: [{name: 'Plan de operación y permisos', timing: 'Antes de la operación'}, {name: 'Informes de cantidad antes y después', timing: 'Dentro de 48 horas (a confirmar)'}],
    },
    ports: {en: 'Panama anchorages and the terminals we serve (to confirm).', es: 'Fondeaderos de Panamá y los terminales que atendemos (a confirmar).'},
    steps: {
      en: ['Send both vessels\' particulars, product, quantity and window.', 'We plan the operation, secure permits and equipment.', 'Attendance, surveys and documentation.'],
      es: ['Envíe los datos de ambos buques, producto, cantidad y ventana.', 'Planificamos la operación, permisos y equipos.', 'Atención, inspecciones y documentación.'],
    },
    why: {
      en: ['Agency, surveys and documentation from one team.', 'Experience with tankers, barges, offshore platforms and petcoke vessels.', '24/7.'],
      es: ['Agencia, inspecciones y documentación de un solo equipo.', 'Experiencia con tanqueros, barcazas, plataformas offshore y buques de petcoke.', '24/7.'],
    },
    faq: {
      en: [
        {q: 'Where are STS operations done in Panama?', a: 'At designated anchorages on both sides of the Canal and at terminals, subject to the Authority\'s permits (details to confirm).'},
        {q: 'How long does an STS take?', a: 'It depends on product, quantity and pumping rates; the plan states the expected window.'},
      ],
      es: [
        {q: '¿Dónde se hacen las operaciones STS en Panamá?', a: 'En fondeaderos designados a ambos lados del Canal y en terminales, sujeto a los permisos de la Autoridad (detalles a confirmar).'},
        {q: '¿Cuánto dura una STS?', a: 'Depende del producto, la cantidad y el régimen de bombeo; el plan indica la ventana esperada.'},
      ],
    },
    related: ['bunker', 'agency'],
  },
  {
    key: 'claims',
    slug: {en: 'marine-claims-support', es: 'soporte-a-reclamos-maritimos'},
    cta: 'attendance',
    image: '/images/container-terminal.jpg',
    imageAlt: {en: 'Container ship alongside a terminal', es: 'Portacontenedores atracado en un terminal'},
    title: {en: 'Marine claims support', es: 'Soporte a reclamos marítimos'},
    oneLiner: {en: 'Attendance and evidence preserved in the first 24 hours, under your club\'s instructions.', es: 'Atención y evidencia preservada en las primeras 24 horas, bajo instrucciones de su club.'},
    h1: {en: 'Marine claims support in Panama for clubs, insurers and lawyers', es: 'Soporte a reclamos marítimos en Panamá para clubes, aseguradores y abogados'},
    metaTitle: {en: 'Marine Claims Support in Panama | Cross World Agency', es: 'Soporte a reclamos marítimos en Panamá | Cross World Agency'},
    metaDescription: {en: 'Casualty and cargo claims attendance in Panama under the instructions of P&I correspondents, insurers and lawyers: evidence preservation, surveys and claim files. 24/7.', es: 'Atención de siniestros y reclamos de carga en Panamá bajo instrucciones de corresponsales P&I, aseguradores y abogados: preservación de evidencia, inspecciones y expedientes. 24/7.'},
    summary: {
      en: 'When something goes wrong in Panama, evidence disappears fast. We attend on short notice, 24/7, under the instructions of your club, your correspondent, your underwriter or your lawyers: we preserve evidence, appoint or provide surveyors and build the file. Security is issued by the club; we coordinate arrest response with local counsel.',
      es: 'Cuando algo sale mal en Panamá, la evidencia desaparece rápido. Atendemos con poco aviso, 24/7, bajo las instrucciones de su club, su corresponsal, su asegurador o sus abogados: preservamos evidencia, nombramos o aportamos surveyors y armamos el expediente. La garantía la emite el club; nosotros coordinamos la respuesta a un embargo con abogados locales.',
    },
    includes: {
      en: ['Cargo claims attendance: dry, reefer, steel out-turn, container damage', 'Charterers\' liability and bunker claims', 'Ports and terminals claims', 'Crew personal injury attendance for P&I', 'Casualty attendance and evidence preservation', 'Inland transit damage (on request)'],
      es: ['Atención de reclamos de carga: seca, reefer, acero, daños a contenedores', 'Reclamos de responsabilidad del fletador y de bunker', 'Reclamos de puertos y terminales', 'Atención de lesiones de tripulantes para P&I', 'Atención de siniestros y preservación de evidencia', 'Daños en tránsito terrestre (a solicitud)'],
    },
    deliverables: {
      en: [{name: 'Attendance report with photos, statements and documents secured', timing: 'Within 48 hours (to confirm)'}, {name: 'Survey reports as instructed', timing: 'Per instruction'}, {name: 'Rate card', timing: 'On request'}],
      es: [{name: 'Informe de atención con fotos, declaraciones y documentos asegurados', timing: 'Dentro de 48 horas (a confirmar)'}, {name: 'Informes de inspección según instrucciones', timing: 'Según instrucción'}, {name: 'Tarifa', timing: 'A solicitud'}],
    },
    ports: {en: 'Balboa, Cristóbal and the Panamanian ports we serve.', es: 'Balboa, Cristóbal y los puertos panameños que atendemos.'},
    steps: {
      en: ['Call the duty officer or send the instruction with vessel, port and incident.', 'We attend, preserve evidence and report the same day.', 'The file goes to your club, correspondent or lawyer.'],
      es: ['Llame al oficial de guardia o envíe la instrucción con buque, puerto e incidente.', 'Atendemos, preservamos evidencia y reportamos el mismo día.', 'El expediente va a su club, corresponsal o abogado.'],
    },
    why: {
      en: ['We serve the P&I correspondents established in Panama, fixed-premium insurers, hull and cargo underwriters, recovery agents and maritime law firms.', 'Surveyors in house.', 'A captain reviews every attendance report.'],
      es: ['Servimos a los corresponsales P&I establecidos en Panamá, aseguradores de prima fija, aseguradores de casco y carga, agentes de recobro y firmas de abogados marítimos.', 'Surveyors en casa.', 'Un capitán revisa cada informe de atención.'],
    },
    faq: {
      en: [
        {q: 'What should the master do in the first hour?', a: 'Secure the scene, photograph everything, keep logs and documents, take statements while memories are fresh, and call the club or its correspondent. We can be on board within hours.'},
        {q: 'How is security handled?', a: 'Security is issued by the club. We coordinate arrest response with local counsel.'},
      ],
      es: [
        {q: '¿Qué debe hacer el capitán en la primera hora?', a: 'Asegurar la escena, fotografiar todo, conservar bitácoras y documentos, tomar declaraciones y llamar al club o a su corresponsal. Podemos estar a bordo en horas.'},
        {q: '¿Cómo se maneja la garantía?', a: 'La garantía la emite el club. Nosotros coordinamos la respuesta a un embargo con abogados locales.'},
      ],
    },
    related: ['surveys', 'bunker'],
  },
  {
    key: 'consulting',
    slug: {en: 'maritime-consulting-and-audits', es: 'consultoria-maritima-y-auditorias'},
    cta: 'portcall',
    image: '/images/captain.jpg',
    imageAlt: {en: 'Captain Guillermo A. Peña at the Cross World office', es: 'Capitán Guillermo A. Peña en la oficina de Cross World'},
    title: {en: 'Consulting & audits', es: 'Consultoría y auditorías'},
    oneLiner: {en: 'ISM preparation, projects and advice from a working captain.', es: 'Preparación ISM, proyectos y asesoría de un capitán en activo.'},
    h1: {en: 'Maritime consulting, ISM audits and project support', es: 'Consultoría marítima, auditorías ISM y soporte a proyectos'},
    metaTitle: {en: 'Maritime Consulting and ISM Audits in Panama | Cross World Agency', es: 'Consultoría marítima y auditorías ISM en Panamá | Cross World Agency'},
    metaDescription: {en: 'ISM preparation and internal audits, technical reports for owners and financiers, and project development from a working captain, with representation in Venezuela, Brazil, Aruba and Greece.', es: 'Preparación y auditorías internas ISM, informes técnicos para armadores y financiadores, y desarrollo de proyectos de un capitán en activo, con representación en Venezuela, Brasil, Aruba y Grecia.'},
    summary: {
      en: 'ISM preparation and internal audits, technical reports and project development from a working captain and his team, with representation in Venezuela, Brazil, Aruba and Greece (firms to confirm).',
      es: 'Preparación y auditorías internas ISM, informes técnicos y desarrollo de proyectos de un capitán en activo y su equipo, con representación en Venezuela, Brasil, Aruba y Grecia (firmas a confirmar).',
    },
    includes: {
      en: ['ISM preparation and internal audits', 'Management, operation and maintenance manuals', 'Technical reports for owners and financiers', 'Feasibility and project development for industrial and maritime projects', 'Chartering support on request'],
      es: ['Preparación y auditorías internas ISM', 'Manuales de gestión, operación y mantenimiento', 'Informes técnicos para armadores y financiadores', 'Factibilidad y desarrollo de proyectos industriales y marítimos', 'Soporte de fletamento a solicitud'],
    },
    deliverables: {
      en: [{name: 'Audit report with findings and corrective actions', timing: 'Within 5 working days (to confirm)'}, {name: 'Technical report', timing: 'As agreed'}],
      es: [{name: 'Informe de auditoría con hallazgos y acciones correctivas', timing: 'Dentro de 5 días hábiles (a confirmar)'}, {name: 'Informe técnico', timing: 'Según acuerdo'}],
    },
    ports: {en: 'Panama and, through our representation, Venezuela, Brazil, Aruba and Greece.', es: 'Panamá y, a través de nuestra representación, Venezuela, Brasil, Aruba y Grecia.'},
    steps: {
      en: ['Tell us what you need audited, documented or assessed.', 'We agree scope, dates and deliverables.', 'Report reviewed by the captain.'],
      es: ['Cuéntenos qué necesita auditar, documentar o evaluar.', 'Acordamos alcance, fechas y entregables.', 'Informe revisado por el capitán.'],
    },
    why: {
      en: ['ISM Code Internal Auditor credential.', 'Working knowledge of Panamanian ports and the Canal.', 'Reports written for owners and financiers, not for the shelf.'],
      es: ['Credencial de auditor interno del Código ISM.', 'Conocimiento práctico de los puertos panameños y del Canal.', 'Informes escritos para armadores y financiadores, no para el archivo.'],
    },
    faq: {
      en: [{q: 'Do you perform ISPS and MLC audits?', a: 'ISM internal audits are our core credential; ISPS and MLC on request (credentials to confirm).'}],
      es: [{q: '¿Hacen auditorías ISPS y MLC?', a: 'Las auditorías internas ISM son nuestra credencial principal; ISPS y MLC a solicitud (credenciales a confirmar).'}],
    },
    related: ['agency', 'surveys'],
  },
];

export const serviceByKey = (key: string) => services.find((s) => s.key === key);
export const serviceBySlug = (locale: Locale, slug: string) => services.find((s) => s.slug[locale] === slug);
