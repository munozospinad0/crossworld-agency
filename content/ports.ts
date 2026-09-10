import type {Locale} from '@/i18n/routing';

export type Port = {
  key: string;
  slug: Record<Locale, string>;
  name: Record<Locale, string>;
  side: Record<Locale, string>;
  sideKey: 'pacific' | 'atlantic';
  image: string;
  /** La foto del puerto informa, no decora: lleva descripción real, no alt vacío. */
  imageAlt: Record<Locale, string>;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  summary: Record<Locale, string>;
  /**
   * Contexto operativo del puerto: dónde está, con qué esclusas trabaja, qué hay alrededor y qué
   * cambia para una escala. Las fichas tenían menos de 260 palabras y «puerto de Balboa» son
   * 2.900 búsquedas al mes solo desde Panamá: no había con qué competir.
   */
  context: Record<Locale, string[]>;
  facts: Record<Locale, {k: string; v: string}[]>;
  whatWeDo: Record<Locale, string[]>;
  particulars: Record<Locale, string[]>;
  attendance: Record<Locale, string>;
  faq: Record<Locale, {q: string; a: string}[]>;
  reviewed: string;
};

export const ports: Port[] = [
  {
    key: 'balboa',
    slug: {en: 'balboa', es: 'balboa'},
    name: {en: 'Port of Balboa', es: 'Puerto de Balboa'},
    side: {en: 'Pacific side', es: 'Lado Pacífico'},
    sideKey: 'pacific',
    image: '/images/port-cranes.jpg',
    imageAlt: {
      en: 'Container gantry cranes at the Port of Balboa, on the Pacific side of the Panama Canal',
      es: 'Grúas pórtico de contenedores en el Puerto de Balboa, en el lado Pacífico del Canal de Panamá',
    },
    metaTitle: {en: 'Port of Balboa: ship agency and surveys', es: 'Puerto de Balboa: agencia e inspecciones'},
    metaDescription: {en: 'Ship agency, husbandry, marine surveys and bunker attendance at the Port of Balboa and the Pacific anchorage of the Panama Canal. Duty officer 24/7.', es: 'Agencia naviera, avituallamiento, inspecciones y atención de bunker en el Puerto de Balboa y el fondeadero del Pacífico. Oficial de guardia 24/7.'},
    summary: {
      en: 'Balboa is the Pacific gateway of the Panama Canal: container terminal operated by Panama Ports Company, the Pacific anchorage where vessels wait for their transit, and the bunkering area served by barge. Our duty officer boards here and at the anchorage.',
      es: 'Balboa es la puerta del Pacífico del Canal de Panamá: terminal de contenedores operado por Panama Ports Company, el fondeadero del Pacífico donde los buques esperan su tránsito y la zona de bunkering atendida por barcaza. Nuestro oficial de guardia aborda aquí y en el fondeadero.',
    },
    context: {
      en: [
        'Balboa sits at the Pacific mouth of the Panama Canal, next to Panama City, and it is the first or the last thing a vessel sees depending on which way it is going. A northbound transit finishes here; a southbound one starts here. For a call that is not a transit, Balboa is a choice, and usually the practical one, because the international airport is on this side.',
        'Vessels waiting for their slot lie at the Pacific anchorage. That waiting time is when most of the work gets done: bunkers by barge, stores, a crew change by launch, a draft survey before loading. A vessel that arrives with everything arranged can turn the wait into the whole port call and leave the transit clean.',
        'The locks at this end are Miraflores. Beyond the terminal operated by Panama Ports Company, the Pacific cluster includes PSA Panama at Rodman, on the other side of the entrance.',
        'Two practical notes. Panama runs on UTC−5 all year with no daylight saving, so an ETA in local time never shifts. And Tocumen International, the airport that matters for crew, is on this side of the isthmus: from Cristóbal it is about an hour of road away.',
      ],
      es: [
        'Balboa está en la boca del Pacífico del Canal de Panamá, junto a Ciudad de Panamá, y es lo primero o lo último que ve un buque según hacia dónde vaya. Un tránsito hacia el norte termina aquí; uno hacia el sur empieza aquí. Para una escala que no es tránsito, Balboa es una elección, y normalmente la práctica, porque el aeropuerto internacional está de este lado.',
        'Los buques que esperan su cupo fondean en el fondeadero del Pacífico. Esa espera es cuando se hace casi todo el trabajo: bunker por barcaza, provisiones, un cambio de tripulación por lancha, una inspección de calados antes de cargar. Un buque que llega con todo arreglado convierte la espera en la escala completa y deja el tránsito limpio.',
        'Las esclusas de este extremo son Miraflores. Además del terminal que opera Panama Ports Company, el conglomerado del Pacífico incluye PSA Panama en Rodman, al otro lado de la entrada.',
        'Dos notas prácticas. Panamá está en UTC−5 todo el año, sin horario de verano, así que una ETA en hora local nunca se corre. Y Tocumen, el aeropuerto que importa para la tripulación, está de este lado del istmo: desde Cristóbal queda a cosa de una hora por carretera.',
      ],
    },
    facts: {
      en: [{k: 'Anchorage', v: 'Pacific anchorage'}, {k: 'To the locks', v: 'Miraflores'}, {k: 'Duty officer', v: '+507 6266-4242'}],
      es: [{k: 'Fondeadero', v: 'Fondeadero del Pacífico'}, {k: 'A las esclusas', v: 'Miraflores'}, {k: 'Oficial de guardia', v: '+507 6266-4242'}],
    },
    whatWeDo: {
      en: ['Transit agency and pre-arrival documentation for southbound and northbound vessels waiting at the Pacific anchorage', 'Husbandry: crew changes via Tocumen, cash to master, spares, provisions, medical', 'Tank gauging, sampling and sample custody during barge deliveries', 'Draft, condition and pre-purchase surveys alongside or at anchor', 'Marine accident investigation and evidence preservation'],
      es: ['Agencia de tránsito y documentación de prearribo para buques en el fondeadero del Pacífico', 'Avituallamiento: cambios de tripulación vía Tocumen, cash to master, repuestos, provisiones, atención médica', 'Medición y muestreo de tanques y custodia de muestras durante entregas por barcaza', 'Inspecciones de calados, condición y precompra en muelle o al ancla', 'Investigación de accidentes marítimos y preservación de evidencia'],
    },
    particulars: {
      en: ['All times in Panama time (UTC-5, no daylight saving).'],
      es: ['Todas las horas en hora de Panamá (UTC-5, sin horario de verano).'],
    },
    attendance: {en: 'Boarding from Panama City; duty officer 24/7.', es: 'Abordaje desde Ciudad de Panamá; oficial de guardia 24/7.'},
    faq: {
      en: [{q: 'Can you take bunkers at the Pacific anchorage while waiting for the transit?', a: 'Yes, by barge, subject to the supplier\'s schedule and the Authority\'s rules; we coordinate the stem and attend the delivery with tank gauging and sampling.'}, {q: 'How do crew changes work at Balboa?', a: 'Crew join or leave by launch at the anchorage or alongside, with immigration handled ahead of arrival and transfers to Tocumen airport.'}],
      es: [{q: '¿Se puede tomar bunker en el fondeadero del Pacífico mientras se espera el tránsito?', a: 'Sí, por barcaza, sujeto al programa del proveedor y a las reglas de la Autoridad; coordinamos la entrega y la atendemos con medición y muestreo de tanques.'}, {q: '¿Cómo funcionan los cambios de tripulación en Balboa?', a: 'La tripulación embarca o desembarca por lancha en el fondeadero o en muelle, con migración tramitada antes del arribo y traslados al aeropuerto de Tocumen.'}],
    },
    reviewed: '2026-08-31',
  },
  {
    key: 'cristobal',
    slug: {en: 'cristobal', es: 'cristobal'},
    name: {en: 'Port of Cristóbal', es: 'Puerto de Cristóbal'},
    side: {en: 'Atlantic side', es: 'Lado Atlántico'},
    sideKey: 'atlantic',
    image: '/images/atlantic-terminals.jpg',
    imageAlt: {
      en: 'Terminals on the Atlantic side of the Panama Canal, at Cristóbal in Colón',
      es: 'Terminales del lado Atlántico del Canal de Panamá, en Cristóbal, Colón',
    },
    metaTitle: {en: 'Port of Cristóbal: ship agency and surveys', es: 'Puerto de Cristóbal: agencia e inspecciones'},
    metaDescription: {en: 'Ship agency, husbandry, marine surveys and bunker attendance at the Port of Cristóbal, Colón, and the Atlantic anchorage of the Panama Canal.', es: 'Agencia naviera, avituallamiento, inspecciones y bunker en el Puerto de Cristóbal, Colón, y el fondeadero del Atlántico.'},
    summary: {
      en: 'Cristóbal, in Colón, is the Atlantic gateway of the Canal: the Cristóbal anchorage where northbound arrivals wait, the Panama Ports Company terminal, and, nearby, Manzanillo (MIT), CCT and the Bahía Las Minas hydrocarbon terminals.',
      es: 'Cristóbal, en Colón, es la puerta del Atlántico del Canal: el fondeadero de Cristóbal donde esperan los arribos del norte, el terminal de Panama Ports Company y, cerca, Manzanillo (MIT), CCT y los terminales de hidrocarburos de Bahía Las Minas.',
    },
    context: {
      en: [
        'Cristóbal is the Atlantic mouth of the Canal, in the city of Colón, and it is the busiest corner of Panama for boxes. Within a few kilometres sit the Panama Ports Company terminal, Manzanillo International Terminal, Colón Container Terminal and the hydrocarbon terminals of Bahía Las Minas. If a call involves transhipment or oil, it usually happens on this side.',
        'The locks at this end are Gatún, for the original locks, and Agua Clara, for the neopanamax ones. A southbound vessel arriving from the Caribbean reports here before entering.',
        'One detail from the Canal’s own reservation notice matters for anyone counting hours: for southbound vessels leaving the Manzanillo Bay ports, arrival is counted from contact with the Cristóbal Signal Station on passing the East Breakwater entrance. It is a position confirmed by the Canal, not an ETA reported by the vessel, and the required arrival time is measured against it.',
        'Colón is about an hour by road from Panama City. That hour is the whole planning problem of the Atlantic side: crew flying into Tocumen land on the Pacific side, and spares held by a supplier in the capital have to cross the isthmus before the vessel sails.',
      ],
      es: [
        'Cristóbal es la boca atlántica del Canal, en la ciudad de Colón, y es el rincón más movido de Panamá en contenedores. En pocos kilómetros están el terminal de Panama Ports Company, Manzanillo International Terminal, Colón Container Terminal y los terminales de hidrocarburos de Bahía Las Minas. Si una escala tiene trasbordo o hidrocarburos, suele ocurrir de este lado.',
        'Las esclusas de este extremo son Gatún, para las originales, y Agua Clara, para las neopanamax. Un buque hacia el sur que llega del Caribe se reporta aquí antes de entrar.',
        'Un detalle del propio aviso de reservas del Canal importa para quien cuente horas: para los buques hacia el sur que salen de los puertos de Bahía de Manzanillo, el arribo se cuenta desde el contacto con la Estación de Señales de Cristóbal al pasar la entrada del East Breakwater. Es una posición que confirma el Canal, no una ETA que reporta el buque, y la hora de arribo exigida se mide contra eso.',
        'Colón está a cerca de una hora por carretera de Ciudad de Panamá. Esa hora es todo el problema de planificación del lado Atlántico: la tripulación que vuela a Tocumen aterriza del lado Pacífico, y los repuestos que tiene un proveedor en la capital deben cruzar el istmo antes de que el buque zarpe.',
      ],
    },
    facts: {
      en: [{k: 'Anchorage', v: 'Cristóbal anchorage'}, {k: 'To the locks', v: 'Gatún / Agua Clara'}, {k: 'Duty officer', v: '+507 6266-4242'}],
      es: [{k: 'Fondeadero', v: 'Fondeadero de Cristóbal'}, {k: 'A las esclusas', v: 'Gatún / Agua Clara'}, {k: 'Oficial de guardia', v: '+507 6266-4242'}],
    },
    whatWeDo: {
      en: ['Transit agency and pre-arrival documentation for vessels at the Cristóbal anchorage', 'Husbandry at Cristóbal, Manzanillo (MIT) and CCT', 'Tank gauging and sampling during barge deliveries', 'Marine accident investigation and evidence preservation'],
      es: ['Agencia de tránsito y documentación de prearribo para buques en el fondeadero de Cristóbal', 'Avituallamiento en Cristóbal, Manzanillo (MIT) y CCT', 'Medición y muestreo de tanques durante entregas por barcaza', 'Investigación de accidentes marítimos y preservación de evidencia'],
    },
    particulars: {
      en: ['Colón is about one hour by road from Panama City; attendance times at the anchorage depend on launch availability.'],
      es: ['Colón está a cerca de una hora por carretera de Ciudad de Panamá; los tiempos de atención en el fondeadero dependen de la disponibilidad de lancha.'],
    },
    attendance: {en: 'Attendance coordinated by the operations desk in Panama City; duty officer 24/7.', es: 'Atención coordinada desde la mesa de operaciones en Ciudad de Panamá; oficial de guardia 24/7.'},
    faq: {
      en: [{q: 'Do you attend at Manzanillo and CCT as well?', a: 'Yes, for husbandry and surveys; send the terminal and the ETA to the duty officer.'}],
      es: [{q: '¿Atienden también en Manzanillo y CCT?', a: 'Sí, para avituallamiento e inspecciones; envíe el terminal y la ETA al oficial de guardia.'}],
    },
    reviewed: '2026-08-31',
  },
];

export const portBySlug = (locale: Locale, slug: string) => ports.find((p) => p.slug[locale] === slug);
