import type {Locale} from '@/i18n/routing';

export type Port = {
  key: string;
  slug: Record<Locale, string>;
  name: Record<Locale, string>;
  side: Record<Locale, string>;
  sideKey: 'pacific' | 'atlantic';
  image: string;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  summary: Record<Locale, string>;
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
    metaTitle: {en: 'Port of Balboa: ship agency, surveys and bunkering on the Pacific side', es: 'Puerto de Balboa: agencia naviera, inspecciones y bunker en el Pacífico'},
    metaDescription: {en: 'Ship agency, husbandry, independent surveys and bunker attendance at the Port of Balboa and the Pacific anchorage of the Panama Canal. Duty officer 24/7.', es: 'Agencia naviera, husbandry, inspecciones independientes y atención de bunker en el Puerto de Balboa y el fondeadero del Pacífico del Canal de Panamá. Oficial de guardia 24/7.'},
    summary: {
      en: 'Balboa is the Pacific gateway of the Panama Canal: container terminal operated by Panama Ports Company, the Pacific anchorage where vessels wait for their transit, and the bunkering area served by barge. Our duty officer boards here and at the anchorage.',
      es: 'Balboa es la puerta del Pacífico del Canal de Panamá: terminal de contenedores operado por Panama Ports Company, el fondeadero del Pacífico donde los buques esperan su tránsito y la zona de bunkering atendida por barcaza. Nuestro oficial de guardia aborda aquí y en el fondeadero.',
    },
    facts: {
      en: [{k: 'Operator', v: 'Panama Ports Company (to confirm)'}, {k: 'Anchorage', v: 'Pacific anchorage'}, {k: 'Bunker', v: 'MGO, VLSFO by barge (to confirm)'}, {k: 'To the locks', v: 'Miraflores'}, {k: 'Duty officer', v: '+507 6266-4242'}],
      es: [{k: 'Operador', v: 'Panama Ports Company (a confirmar)'}, {k: 'Fondeadero', v: 'Fondeadero del Pacífico'}, {k: 'Bunker', v: 'MGO, VLSFO por barcaza (a confirmar)'}, {k: 'A las esclusas', v: 'Miraflores'}, {k: 'Oficial de guardia', v: '+507 6266-4242'}],
    },
    whatWeDo: {
      en: ['Transit agency and pre-arrival documentation for southbound and northbound vessels waiting at the Pacific anchorage', 'Husbandry: crew changes via Tocumen, cash to master, spares, provisions, medical', 'Bunker quantity surveys and sample custody during barge deliveries', 'Draft, condition and pre-purchase surveys alongside or at anchor', 'Claims attendance and evidence preservation'],
      es: ['Agencia de tránsito y documentación de prearribo para buques en el fondeadero del Pacífico', 'Husbandry: cambios de tripulación vía Tocumen, cash to master, repuestos, provisiones, atención médica', 'Inspecciones de cantidad de bunker y custodia de muestras durante entregas por barcaza', 'Inspecciones de calados, condición y precompra en muelle o al ancla', 'Atención de reclamos y preservación de evidencia'],
    },
    particulars: {
      en: ['Data below is a sample pending confirmation by operations: maximum draft, anchorage coordinates and terminal restrictions will be published once verified.', 'All times in Panama time (UTC-5, no daylight saving).'],
      es: ['Los datos son una muestra pendiente de confirmación por operaciones: calado máximo, coordenadas del fondeadero y restricciones del terminal se publicarán una vez verificados.', 'Todas las horas en hora de Panamá (UTC-5, sin horario de verano).'],
    },
    attendance: {en: 'Boarding from Panama City; duty officer 24/7.', es: 'Abordaje desde Ciudad de Panamá; oficial de guardia 24/7.'},
    faq: {
      en: [{q: 'Can you take bunkers at the Pacific anchorage while waiting for the transit?', a: 'Yes, by barge, subject to the supplier\'s schedule and the Authority\'s rules; we coordinate the stem and attend the delivery with an independent surveyor.'}, {q: 'How do crew changes work at Balboa?', a: 'Crew join or leave by launch at the anchorage or alongside, with immigration handled ahead of arrival and transfers to Tocumen airport (details and lead times to confirm).'}],
      es: [{q: '¿Se puede tomar bunker en el fondeadero del Pacífico mientras se espera el tránsito?', a: 'Sí, por barcaza, sujeto al programa del proveedor y a las reglas de la Autoridad; coordinamos la entrega y la atendemos con un surveyor independiente.'}, {q: '¿Cómo funcionan los cambios de tripulación en Balboa?', a: 'La tripulación embarca o desembarca por lancha en el fondeadero o en muelle, con migración tramitada antes del arribo y traslados al aeropuerto de Tocumen (detalles y plazos a confirmar).'}],
    },
    reviewed: '2026-08-31',
  },
  {
    key: 'cristobal',
    slug: {en: 'cristobal', es: 'cristobal'},
    name: {en: 'Port of Cristóbal', es: 'Puerto de Cristóbal'},
    side: {en: 'Atlantic side', es: 'Lado Atlántico'},
    sideKey: 'atlantic',
    image: '/images/container-terminal.jpg',
    metaTitle: {en: 'Port of Cristóbal: ship agency, surveys and bunkering on the Atlantic side', es: 'Puerto de Cristóbal: agencia naviera, inspecciones y bunker en el Atlántico'},
    metaDescription: {en: 'Ship agency, husbandry, independent surveys and bunker attendance at the Port of Cristóbal, Colón, and the Atlantic anchorage of the Panama Canal.', es: 'Agencia naviera, husbandry, inspecciones independientes y atención de bunker en el Puerto de Cristóbal, Colón, y el fondeadero del Atlántico del Canal de Panamá.'},
    summary: {
      en: 'Cristóbal, in Colón, is the Atlantic gateway of the Canal: the Cristóbal anchorage where northbound arrivals wait, the Panama Ports Company terminal, and, nearby, Manzanillo (MIT), CCT and the Bahía Las Minas hydrocarbon terminals.',
      es: 'Cristóbal, en Colón, es la puerta del Atlántico del Canal: el fondeadero de Cristóbal donde esperan los arribos del norte, el terminal de Panama Ports Company y, cerca, Manzanillo (MIT), CCT y los terminales de hidrocarburos de Bahía Las Minas.',
    },
    facts: {
      en: [{k: 'Operator', v: 'Panama Ports Company (to confirm)'}, {k: 'Anchorage', v: 'Cristóbal anchorage'}, {k: 'Bunker', v: 'MGO, VLSFO by barge (to confirm)'}, {k: 'To the locks', v: 'Gatún / Agua Clara'}, {k: 'Attendance', v: 'Boarding officer resident in Colón or boarding partner (to confirm)'}],
      es: [{k: 'Operador', v: 'Panama Ports Company (a confirmar)'}, {k: 'Fondeadero', v: 'Fondeadero de Cristóbal'}, {k: 'Bunker', v: 'MGO, VLSFO por barcaza (a confirmar)'}, {k: 'A las esclusas', v: 'Gatún / Agua Clara'}, {k: 'Atención', v: 'Oficial residente en Colón o socio de abordaje (a confirmar)'}],
    },
    whatWeDo: {
      en: ['Transit agency and pre-arrival documentation for vessels at the Cristóbal anchorage', 'Husbandry at Cristóbal, Manzanillo (MIT) and CCT', 'Bunker quantity surveys during barge deliveries', 'Petroleum surveys and STS attendance at the Bahía Las Minas terminals (to confirm)', 'Claims attendance and evidence preservation'],
      es: ['Agencia de tránsito y documentación de prearribo para buques en el fondeadero de Cristóbal', 'Husbandry en Cristóbal, Manzanillo (MIT) y CCT', 'Inspecciones de cantidad de bunker durante entregas por barcaza', 'Inspecciones de petróleo y atención de STS en los terminales de Bahía Las Minas (a confirmar)', 'Atención de reclamos y preservación de evidencia'],
    },
    particulars: {
      en: ['Data below is a sample pending confirmation by operations: maximum draft, anchorage coordinates and terminal restrictions will be published once verified.', 'Colón is about one hour by road from Panama City; attendance times at the anchorage depend on launch availability.'],
      es: ['Los datos son una muestra pendiente de confirmación por operaciones: calado máximo, coordenadas del fondeadero y restricciones del terminal se publicarán una vez verificados.', 'Colón está a cerca de una hora por carretera de Ciudad de Panamá; los tiempos de atención en el fondeadero dependen de la disponibilidad de lancha.'],
    },
    attendance: {en: 'Boarding officer resident in Colón or boarding partner (to confirm).', es: 'Oficial residente en Colón o socio de abordaje (a confirmar).'},
    faq: {
      en: [{q: 'Do you attend at Manzanillo and CCT as well?', a: 'Yes, for husbandry and surveys (ports we serve to be confirmed by operations).'}],
      es: [{q: '¿Atienden también en Manzanillo y CCT?', a: 'Sí, para husbandry e inspecciones (puertos que atendemos a confirmar por operaciones).'}],
    },
    reviewed: '2026-08-31',
  },
];

export const portBySlug = (locale: Locale, slug: string) => ports.find((p) => p.slug[locale] === slug);
