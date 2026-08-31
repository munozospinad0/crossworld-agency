import type {Locale} from '@/i18n/routing';

type Section = {id: string; h2: string; p?: string[]; ul?: string[]; table?: {head: string[]; rows: string[][]}};

export type Guide = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  tldr: string[];
  reviewed: string;
  verifiedNote: string;
  sections: Section[];
  faq: {q: string; a: string}[];
  sources: {label: string; url: string}[];
  cta: string;
};

export const guide: Record<Locale, Guide> = {
  en: {
    title: 'Panama Canal transit cost, tolls and booking: the guide for shipowners and operators',
    metaTitle: 'Panama Canal transit cost, tolls and booking (2026 guide)',
    metaDescription: 'What a Panama Canal transit really costs: toll by segment, fixed tariff, reservation fee or auction, ancillary charges and agency fee. Booking periods, EDCS pre-arrival, PCSOPEP, draft limits and what a PDA includes. Sources: Panama Canal Authority.',
    tldr: [
      'A transit is priced in three layers: the toll (by vessel segment and size), the fixed and ancillary charges (fixed tariff, security, inspection, pilotage, tugs, linehandlers) and the scheduling layer (reservation fee, or an auction premium for last-minute slots).',
      'Booking periods and fees are set by the Panama Canal Authority\'s OP Notice to Shipping in force (N-7-2026 at the time of writing). Funds are required 48 hours before transit.',
      'Your agent files the pre-arrival package through the ACP electronic system at least 96 hours ahead, turns the estimate into a PDA and reconciles the FDA line by line.',
    ],
    reviewed: '2026-08-31',
    verifiedNote: 'Figures on this page are referential and must be verified against the ACP Maritime Tariff and OP Notices in force at the time of your transit. Verification against the ACP tariff by Capt. Guillermo A. Peña: pending.',
    sections: [
      {id: 'components', h2: '1. What a transit costs: the components', ul: [
        'Toll: set by the ACP per vessel segment. Containerships pay for capacity (TTA) plus loaded TEU (TTL) and empty TEU (TTE); dry bulk pays per DWT; tankers, vehicle carriers and general cargo per PC/UMS ton; LNG and LPG carriers per cubic metre in tiers. Regular, Super and Neopanamax vessels have different rates.',
        'Fixed tariff per transit: a lump sum by vessel category, from small regular vessels up to Neopanamax containerships.',
        'Fixed and ancillary charges: security charge, inspection, pilotage (transit and port), tugs (complete or partial transit, Panamax or Neopanamax packages) and linehandlers.',
        'Scheduling layer: a reservation fee if you book a slot (Regular, Super or Neopanamax rates; higher for last-minute reservations), or an auction premium if you bid for an unreserved slot. Daylight transit reservations carry their own fee.',
        'Agency: our fee, stated as one line, plus launches, transport, communications and any husbandry you request.',
      ]},
      {id: 'booking', h2: '2. Booking periods, reservation and auction', ul: [
        'First period: from 90 to 15 days before the transit date for the Panamax locks; from 90 to 31 days for Neopanamax. Period 1.a: 30 to 15 days (Neopanamax only). Second period: 14 to 8 days. Third period: 7 to 2 days before, closing at 15:00 Panama time (OP Notice N-7-2026).',
        'LoTSA: long-term slot allocation for Neopanamax vessels through sealed-bid auction packages; slots not allocated roll to the second period.',
        'Just-in-time transits: a limited number of JIT slots per day, subject to arrival and readiness conditions.',
        'Required arrival for booked Neopanamax and Panamax Plus vessels: 22:00 the day before the booked date (02:00 on the booked date for Neopanamax LNG carriers), per N-7-2026; confirm with the notice in force.',
        'Cancellation charges scale with the notice given. Late nominations cost more: nominate as soon as the voyage is fixed.',
      ]},
      {id: 'requirements', h2: '3. Requirements and documents', ul: [
        'Pre-arrival package through the ACP electronic pre-arrival system (EDCS) at least 96 hours before arrival: vessel particulars, certificates, crew list, dangerous cargo declaration where applicable.',
        'PCSOPEP: vessels carrying 400 tonnes or more of oil as cargo or fuel need a Panama Canal Shipboard Oil Pollution Emergency Plan with a Panama-resident authorized person. No PCSOPEP, no transit.',
        'Admeasurement and PC/UMS certificate for first-time transits; inspection on arrival.',
        'Funds: the ACP requires payment 48 hours before transit. We call funds 72 hours ahead to leave margin for bank delays.',
      ]},
      {id: 'draft', h2: '4. Draft, lock limits and water levels', ul: [
        'Panamax locks (sample, verify with the ACP): beam 32.31 m (106 ft), length 294.13 m (965 ft), draft 12.04 m (39.5 ft) in tropical fresh water.',
        'Neopanamax locks (sample, verify): beam 51.25 m, length 366 m, draft 15.24 m (50 ft).',
        'Vessels over 32.61 m (107 ft) beam or over 294.4 m (966 ft) in length use the Neopanamax locks.',
        'The maximum authorized draft changes with Gatún Lake levels; the ACP publishes advisories. We state the draft in force in every PDA with its date.',
      ]},
      {id: 'agent', h2: '5. What your agent does and what a PDA includes', ul: [
        'Nomination: vessel particulars, IMO, ETA, direction and services; you receive a request number.',
        'PDA: tolls, reservation fee or auction premium, fixed tariff, security, inspection, pilotage, tugs, linehandlers, launches, agency fee (one line), bank charges and a contingency, each with its basis.',
        'Booking, pre-arrival filing, boarding at the anchorage, coordination of pilots, tugs and linehandlers, crew and supplies.',
        'FDA: reconciled line by line against the PDA, every third-party charge with its voucher, variances explained.',
        'A sample PDA for a Panamax bulk carrier and a product tanker will be published here once approved.',
      ]},
      {id: 'mistakes', h2: '6. Common mistakes', ul: ['Nominating late and paying a last-minute reservation or an auction premium.', 'Estimating the toll with the wrong measurement basis (PC/UMS versus DWT versus TEU).', 'Arriving without a PCSOPEP authorized person.', 'Calling funds after the ACP deadline.', 'Planning a crew change without immigration lead time.']},
    ],
    faq: [
      {q: 'How much does it cost to transit the Panama Canal?', a: 'It depends on the vessel segment, size and cargo, on whether you reserve a slot or bid for one, and on the ancillary charges of the day. For a specific vessel, send us the particulars and you receive an itemized PDA.'},
      {q: 'How do I book a Panama Canal slot?', a: 'Through your agent, in the booking periods set by the ACP (first period opens 90 days before the transit date), with the reservation fee paid at booking.'},
      {q: 'What happens if I miss my booking?', a: 'Cancellation charges apply on a scale that depends on the notice given; the vessel then transits as an unbooked vessel, in arrival order, or bids for another slot.'},
      {q: 'What is a JIT transit?', a: 'A just-in-time slot for vessels that can commit to arrive ready at a set time; the ACP offers a limited number per day.'},
      {q: 'How long does a transit take?', a: 'Typically 8 to 10 hours in Canal waters once underway; waiting time depends on booking and traffic. We do not promise transit times.'},
      {q: 'What draft is allowed today?', a: 'The ACP publishes the maximum authorized draft in its advisories; your PDA states the draft in force with its date.'},
      {q: 'Do I need an agent?', a: 'Vessels transit through an agent authorized by the ACP, who guarantees funds and handles the documentation.'},
      {q: 'What is a PDA?', a: 'A proforma disbursement account: the itemized estimate of tolls, fees, third-party charges and agency fee for the call, against which the FDA is reconciled.'},
      {q: 'Can I pay tolls directly?', a: 'Tolls are paid to the ACP under the agent\'s guarantee, in advance; ask us how funds are handled for your vessel.'},
      {q: 'When are funds due?', a: 'The ACP requires funds 48 hours before transit; we call them 72 hours ahead.'},
    ],
    sources: [
      {label: 'Panama Canal Authority, Maritime Tariff', url: 'https://pancanal.com/en/maritime-services/maritime-tariff/'},
      {label: 'Panama Canal Authority, OP Notice to Shipping N-7-2026, Transit Reservation System', url: 'https://pancanal.com/'},
    ],
    cta: 'Request a transit PDA',
  },
  es: {
    title: 'Costo de tránsito, peajes y reserva en el Canal de Panamá: la guía para armadores y operadores',
    metaTitle: 'Costo de tránsito, peajes y reserva del Canal de Panamá (guía 2026)',
    metaDescription: 'Cuánto cuesta realmente un tránsito por el Canal de Panamá: peaje por segmento, tarifa fija, tasa de reserva o subasta, cargos auxiliares y honorario de agencia. Periodos de reserva, prearribo EDCS, PCSOPEP, límites de calado y qué incluye una PDA. Fuente: Autoridad del Canal de Panamá.',
    tldr: [
      'Un tránsito se cobra en tres capas: el peaje (por segmento y tamaño del buque), los cargos fijos y auxiliares (tarifa fija, seguridad, inspección, practicaje, remolcadores, pasacables) y la capa de programación (tasa de reserva, o prima de subasta para slots de último momento).',
      'Los periodos de reserva y las tasas los fija el OP Notice to Shipping vigente de la Autoridad del Canal (N-7-2026 al momento de escribir). Los fondos se exigen 48 horas antes del tránsito.',
      'Su agente presenta el paquete de prearribo en el sistema electrónico de la ACP al menos 96 horas antes, convierte el estimado en una PDA y concilia la FDA línea por línea.',
    ],
    reviewed: '2026-08-31',
    verifiedNote: 'Las cifras de esta página son referenciales y deben verificarse contra el Maritime Tariff y los OP Notices vigentes de la ACP al momento de su tránsito. Verificación contra el tarifario de la ACP por el capitán Guillermo A. Peña: pendiente.',
    sections: [
      {id: 'components', h2: '1. Qué cuesta un tránsito: los componentes', ul: [
        'Peaje: lo fija la ACP por segmento de buque. Los portacontenedores pagan por capacidad (TTA) más TEU cargados (TTL) y vacíos (TTE); los graneleros por DWT; tanqueros, car carriers y carga general por tonelada PC/UMS; los gaseros LNG y LPG por metro cúbico en tramos. Buques Regular, Super y Neopanamax tienen tarifas distintas.',
        'Tarifa fija por tránsito: una suma por categoría de buque, desde buques regulares pequeños hasta portacontenedores Neopanamax.',
        'Cargos fijos y auxiliares: cargo de seguridad, inspección, practicaje (tránsito y puerto), remolcadores (tránsito completo o parcial, paquetes Panamax o Neopanamax) y pasacables.',
        'Capa de programación: una tasa de reserva si reserva un slot (tarifas Regular, Super o Neopanamax; más altas para reservas de último momento), o una prima de subasta si puja por un slot no reservado. Las reservas de tránsito diurno tienen su propia tasa.',
        'Agencia: nuestro honorario, en una sola línea, más lanchas, transporte, comunicaciones y el husbandry que solicite.',
      ]},
      {id: 'booking', h2: '2. Periodos de reserva, tasa y subasta', ul: [
        'Primer periodo: de 90 a 15 días antes de la fecha de tránsito para las esclusas Panamax; de 90 a 31 días para Neopanamax. Periodo 1.a: 30 a 15 días (solo Neopanamax). Segundo periodo: 14 a 8 días. Tercer periodo: 7 a 2 días antes, cierra a las 15:00 hora de Panamá (OP Notice N-7-2026).',
        'LoTSA: asignación de slots a largo plazo para Neopanamax mediante paquetes de subasta a sobre cerrado; los slots no asignados pasan al segundo periodo.',
        'Tránsitos just-in-time: un número limitado de slots JIT por día, sujeto a condiciones de arribo y alistamiento.',
        'Arribo exigido para buques Neopanamax y Panamax Plus con reserva: 22:00 del día anterior a la fecha reservada (02:00 del día reservado para LNG Neopanamax), según N-7-2026; confirmar con el aviso vigente.',
        'Los cargos de cancelación escalan según el aviso dado. Nominar tarde cuesta más: nomine en cuanto el viaje esté fijado.',
      ]},
      {id: 'requirements', h2: '3. Requisitos y documentos', ul: [
        'Paquete de prearribo en el sistema electrónico de la ACP (EDCS) al menos 96 horas antes del arribo: datos del buque, certificados, lista de tripulación, declaración de carga peligrosa cuando aplica.',
        'PCSOPEP: los buques con 400 toneladas o más de hidrocarburos como carga o combustible necesitan un plan de emergencia de contaminación del Canal con persona autorizada residente en Panamá. Sin PCSOPEP no hay tránsito.',
        'Arqueo y certificado PC/UMS para el primer tránsito; inspección al arribo.',
        'Fondos: la ACP exige el pago 48 horas antes del tránsito. Los llamamos 72 horas antes para dejar margen bancario.',
      ]},
      {id: 'draft', h2: '4. Calado, límites de esclusas y niveles de agua', ul: [
        'Esclusas Panamax (muestra, verificar con la ACP): manga 32,31 m (106 ft), eslora 294,13 m (965 ft), calado 12,04 m (39,5 ft) en agua dulce tropical.',
        'Esclusas Neopanamax (muestra, verificar): manga 51,25 m, eslora 366 m, calado 15,24 m (50 ft).',
        'Los buques de más de 32,61 m (107 ft) de manga o más de 294,4 m (966 ft) de eslora usan las esclusas Neopanamax.',
        'El calado máximo autorizado cambia con el nivel del lago Gatún; la ACP publica avisos. En cada PDA indicamos el calado vigente con su fecha.',
      ]},
      {id: 'agent', h2: '5. Qué hace su agente y qué incluye una PDA', ul: [
        'Nominación: datos del buque, IMO, ETA, dirección y servicios; recibe un número de solicitud.',
        'PDA: peajes, tasa de reserva o prima de subasta, tarifa fija, seguridad, inspección, practicaje, remolcadores, pasacables, lanchas, honorario de agencia (una línea), cargos bancarios y una contingencia, cada uno con su base.',
        'Reserva, prearribo, abordaje en el fondeadero, coordinación de prácticos, remolcadores y pasacables, tripulación y suministros.',
        'FDA: conciliada línea por línea contra la PDA, cada cargo de terceros con su comprobante, diferencias explicadas.',
        'Una PDA de muestra para un granelero Panamax y un tanquero de productos se publicará aquí cuando esté aprobada.',
      ]},
      {id: 'mistakes', h2: '6. Errores comunes', ul: ['Nominar tarde y pagar una reserva de último momento o una prima de subasta.', 'Estimar el peaje con la base de medición equivocada (PC/UMS versus DWT versus TEU).', 'Llegar sin persona autorizada PCSOPEP.', 'Llamar los fondos después del plazo de la ACP.', 'Planificar un cambio de tripulación sin plazo de migración.']},
    ],
    faq: [
      {q: '¿Cuánto cuesta cruzar el Canal de Panamá?', a: 'Depende del segmento, tamaño y carga del buque, de si reserva un slot o puja por uno, y de los cargos auxiliares del día. Para un buque concreto, envíenos los datos y recibe una PDA detallada.'},
      {q: '¿Cómo reservo un slot en el Canal de Panamá?', a: 'A través de su agente, en los periodos de reserva que fija la ACP (el primer periodo abre 90 días antes de la fecha de tránsito), con la tasa de reserva pagada al reservar.'},
      {q: '¿Qué pasa si pierdo mi reserva?', a: 'Aplican cargos de cancelación según el aviso dado; el buque transita luego sin reserva, en orden de llegada, o puja por otro slot.'},
      {q: '¿Qué es un tránsito JIT?', a: 'Un slot just-in-time para buques que pueden comprometerse a llegar listos a una hora fijada; la ACP ofrece un número limitado por día.'},
      {q: '¿Cuánto dura un tránsito?', a: 'Normalmente de 8 a 10 horas en aguas del Canal una vez iniciado; la espera depende de la reserva y del tráfico. No prometemos tiempos de tránsito.'},
      {q: '¿Qué calado se permite hoy?', a: 'La ACP publica el calado máximo autorizado en sus avisos; su PDA indica el calado vigente con su fecha.'},
      {q: '¿Necesito un agente?', a: 'Los buques transitan a través de un agente autorizado por la ACP, que garantiza los fondos y maneja la documentación.'},
      {q: '¿Qué es una PDA?', a: 'Una cuenta proforma de desembolsos: el estimado detallado de peajes, tasas, cargos de terceros y honorario de agencia para la escala, contra el cual se concilia la FDA.'},
      {q: '¿Puedo pagar los peajes directamente?', a: 'Los peajes se pagan a la ACP bajo la garantía del agente, por adelantado; consúltenos cómo se manejan los fondos para su buque.'},
      {q: '¿Cuándo se pagan los fondos?', a: 'La ACP exige los fondos 48 horas antes del tránsito; nosotros los llamamos 72 horas antes.'},
    ],
    sources: [
      {label: 'Autoridad del Canal de Panamá, Maritime Tariff', url: 'https://pancanal.com/en/maritime-services/maritime-tariff/'},
      {label: 'Autoridad del Canal de Panamá, OP Notice to Shipping N-7-2026, sistema de reservas de tránsito', url: 'https://pancanal.com/'},
    ],
    cta: 'Solicitar PDA de tránsito',
  },
};
