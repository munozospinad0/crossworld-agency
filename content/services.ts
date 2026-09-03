import type {Locale} from '@/i18n/routing';

export type ServiceCta = 'portcall' | 'surveyor' | 'fuel' | 'attendance';

/**
 * Siete servicios. Textos según el documento de correcciones del cliente (2-sep-2026):
 * cada página muestra el título, la descripción y, solo en inspecciones, la lista "Especialistas en".
 * Las secciones "Qué incluye / Qué recibe / Cómo empezar / Por qué / FAQ" fueron retiradas a pedido del cliente.
 */
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
  /** Párrafos de la descripción (uno o más). */
  summary: Record<Locale, string[]>;
  /** Lista "Especialistas en" (solo inspecciones marítimas). */
  specialties?: Record<Locale, string[]>;
};

export const services: Service[] = [
  {
    key: 'agency',
    slug: {en: 'ship-agency-panama-canal-transit', es: 'agencia-naviera-transito-canal-de-panama'},
    cta: 'portcall',
    image: '/images/canal-transit.jpg',
    imageAlt: {en: 'Vessel entering the locks of the Panama Canal, seen from the deck', es: 'Buque entrando a las esclusas del Canal de Panamá, visto desde cubierta'},
    title: {en: 'Ship agency & Canal transit', es: 'Agencia naviera y tránsito del Canal'},
    oneLiner: {en: 'Canal transits, port calls and husbandry at Balboa and Cristóbal.', es: 'Tránsitos del Canal, escalas y avituallamiento en Balboa y Cristóbal.'},
    h1: {en: 'Panama Canal transit agent and husbandry services', es: 'Agente de tránsito del Canal de Panamá y servicios de avituallamiento'},
    metaTitle: {en: 'Panama Canal Transit Agent & Husbandry | Cross World Agency', es: 'Agente de tránsito del Canal de Panamá y avituallamiento | Cross World Agency'},
    metaDescription: {en: 'AMP-licensed ship agency authorized by the Panama Canal Authority since 2010. Transits, husbandry, crew changes and PDA/FDA at Balboa and Cristóbal. 24/7.', es: 'Agencia naviera con licencia AMP y autorización de la ACP desde 2010. Tránsitos, avituallamiento, cambios de tripulación y PDA/FDA en Balboa y Cristóbal. 24/7.'},
    summary: {
      en: ['We are an AMP-licensed ship agency authorized by the Panama Canal Authority, handling transits, port calls and husbandry at Balboa, Cristóbal and the Panamanian ports we have served since 2010.'],
      es: ['Somos una agencia naviera con licencia de la Autoridad Marítima de Panamá y autorización de la Autoridad del Canal. Atendemos tránsitos, escalas y avituallamiento en Balboa, Cristóbal y los puertos panameños que servimos desde 2010.'],
    },
  },
  {
    key: 'surveys',
    slug: {en: 'marine-surveys', es: 'inspecciones-maritimas'},
    cta: 'surveyor',
    image: '/images/port-cranes.jpg',
    imageAlt: {en: 'Container terminal cranes at a Panamanian port', es: 'Grúas de un terminal de contenedores en un puerto panameño'},
    title: {en: 'Marine surveys', es: 'Inspecciones marítimas'},
    oneLiner: {en: 'Professional surveys, reported in the format underwriters and P&I clubs expect.', es: 'Inspecciones profesionales, en el formato que esperan aseguradores y clubes P&I.'},
    h1: {en: 'Marine surveys and inspections in Panama', es: 'Inspecciones marítimas en Panamá'},
    metaTitle: {en: 'Marine Surveys in Panama: Draft, Condition, Pre-purchase | Cross World Agency', es: 'Inspecciones marítimas en Panamá: calados, condición, precompra | Cross World Agency'},
    metaDescription: {en: 'Marine surveys at both ends of the Panama Canal, to quality standards and international rules, endorsed by the P&I Club: draft, petroleum, condition, pre-purchase, hatch cover and ISM audits.', es: 'Inspecciones marítimas en ambos lados del Canal de Panamá bajo estándares de calidad y normas internacionales, con el aval del P&I Club: calados, petróleo, condición, precompra, escotillas y auditorías ISM.'},
    summary: {
      en: ['Marine surveys carried out to quality standards and in accordance with the applicable international rules, endorsed by the P&I Club.'],
      es: ['Inspecciones marítimas bajo estándares de calidad y acorde a las normas internacionales respectivas, con el aval del P&I Club.'],
    },
    specialties: {
      en: ['Draft surveys (initial, intermediate, final) and cargo quantity determination', 'Petroleum surveys, crude and products, with ROB and ullage reports', 'Pre-purchase and condition surveys', 'P&I vessel condition surveys', 'Hatch cover integrity, ultrasonic tested', 'Load, stow and securing (lashing) surveys', 'Tank condition and corrosion assessment', 'ISM internal audits', 'Loss control attendance and marine expediting', 'Project cargo warranty surveys and risk management', 'On-hire and off-hire surveys (bunker and condition)'],
      es: ['Draft surveys (inicial, intermedio, final) y determinación de cantidad de carga', 'Inspecciones de petróleo, crudo y productos, con ROB y ullages', 'Inspecciones de precompra y de condición', 'Inspecciones de condición para P&I', 'Integridad de tapas de escotilla con prueba ultrasónica', 'Inspecciones de carga, estiba y trincado', 'Evaluación de tanques y corrosión', 'Auditorías internas ISM', 'Loss control y expediting marítimo', 'Warranty surveys de carga de proyecto y gestión de riesgo', 'Inspecciones on-hire y off-hire (bunker y condición)'],
    },
  },
  {
    key: 'bunker',
    slug: {en: 'tank-gauging-sampling-and-bunker-operations', es: 'medicion-y-muestreo-de-tanques-y-operaciones-de-bunker'},
    cta: 'surveyor',
    image: '/images/oil-terminal.jpg',
    imageAlt: {en: 'Oil terminal at dusk', es: 'Terminal petrolero al atardecer'},
    title: {en: 'Tank gauging, sampling & bunker operations', es: 'Medición y muestreo de tanques y operaciones de bunker'},
    oneLiner: {en: 'Sample logistics, custody and dispatch to specialised laboratories.', es: 'Logística de toma de muestras, custodia y envío a laboratorios especializados.'},
    h1: {en: 'Tank gauging and sampling, bunker operations, sample logistics and laboratories', es: 'Medición y muestreo de tanques y operaciones de bunkers, logística de toma de muestra y laboratorios'},
    metaTitle: {en: 'Tank Gauging, Sampling & Bunker Operations in Panama | Cross World Agency', es: 'Medición y muestreo de tanques y operaciones de bunker en Panamá | Cross World Agency'},
    metaDescription: {en: 'Tank gauging and sampling, bunkering supervision and logistics for the collection, custody and dispatch of samples to specialised laboratories at Balboa and Cristóbal, with traceability throughout.', es: 'Medición y muestreo de tanques, supervisión de operaciones de bunkering y logística de toma, custodia y envío de muestras a laboratorios especializados en Balboa y Cristóbal, con trazabilidad en todo el proceso.'},
    summary: {
      en: ['We carry out tank gauging and sampling, supervise bunkering operations and coordinate the logistics for the collection, custody and dispatch of samples to specialised laboratories, ensuring traceability and reliability throughout the process.'],
      es: ['Realizamos medición y muestreo de tanques, supervisión de operaciones de bunkering y coordinación logística para la toma, custodia y envío de muestras a laboratorios especializados, garantizando trazabilidad y confiabilidad durante todo el proceso.'],
    },
  },
  {
    key: 'fuel',
    slug: {en: 'marine-fuel-supply', es: 'suministro-de-combustible-marino'},
    cta: 'fuel',
    image: '/images/oil-terminal.jpg',
    imageAlt: {en: 'Oil terminal at dusk', es: 'Terminal petrolero al atardecer'},
    title: {en: 'Marine fuel supply', es: 'Suministro de combustible marino'},
    oneLiner: {en: 'MGO and ULSD arranged in Panama, CIF or FOB.', es: 'MGO y ULSD en Panamá, CIF o FOB.'},
    h1: {en: 'Marine fuel supply in Panama', es: 'Suministro de combustible marino en Panamá'},
    metaTitle: {en: 'Marine Fuel Supply in Panama: MGO and ULSD | Cross World Agency', es: 'Suministro de combustible marino en Panamá: MGO y ULSD | Cross World Agency'},
    metaDescription: {en: 'Fuel supply and delivery to vessels in Panama, by ship-to-ship (STS) operations or directly in port. MGO and ULSD, CIF or FOB.', es: 'Suministro y entrega de combustible a embarcaciones en Panamá, por operaciones ship-to-ship (STS) o directamente en puerto. MGO y ULSD, CIF o FOB.'},
    summary: {
      en: ['Logistics coordination for the supply and delivery of fuel to vessels, both through ship-to-ship (STS) operations and directly in port, ensuring an efficient and organised execution of every operation.'],
      es: ['Coordinación logística para el suministro y entrega de combustible a embarcaciones, tanto mediante operaciones Ship-to-Ship (STS) como directamente en puerto, asegurando una ejecución eficiente y organizada de cada operación.'],
    },
  },
  {
    key: 'sts',
    slug: {en: 'ship-to-ship-and-offshore', es: 'ship-to-ship-y-offshore'},
    cta: 'portcall',
    image: '/images/ship-bow.jpg',
    imageAlt: {en: 'Vessel alongside a pier', es: 'Buque atracado en un muelle'},
    title: {en: 'Ship-to-ship & offshore', es: 'Ship-to-ship y offshore'},
    oneLiner: {en: 'STS and terminal operations planned, attended and documented.', es: 'Operaciones ship-to-ship y de terminal planificadas, atendidas y documentadas.'},
    h1: {en: 'Ship-to-ship transfers and offshore support in Panama', es: 'Transferencias ship-to-ship y soporte offshore en Panamá'},
    metaTitle: {en: 'Ship-to-Ship Transfers & Offshore Support in Panama | Cross World Agency', es: 'Transferencias ship-to-ship y offshore en Panamá | Cross World Agency'},
    metaDescription: {en: 'STS operations at Panama anchorages and terminals: permits, mooring master coordination, surveys before and after transfer, offshore platform and oil terminal support.', es: 'Operaciones STS en fondeaderos y terminales de Panamá: permisos, coordinación de mooring master, inspecciones antes y después de la transferencia, soporte a plataformas y terminales petroleros.'},
    summary: {
      en: ['STS operations at Panama anchorages and terminals, planned, attended and documented: permits with the Authority, mooring master and equipment coordination, surveys before and after transfer, and the agency work around it.'],
      es: ['Operaciones STS en fondeaderos y terminales de Panamá, planificadas, atendidas y documentadas: permisos ante la Autoridad, coordinación de mooring master y equipos, inspecciones antes y después de la transferencia, y el trabajo de agencia alrededor.'],
    },
  },
  {
    // La clave `claims` se conserva por compatibilidad con el formulario y el scoring de leads.
    key: 'claims',
    slug: {en: 'marine-accident-investigation', es: 'investigacion-de-accidentes-maritimos'},
    cta: 'attendance',
    image: '/images/hull-lines.jpg',
    imageAlt: {en: 'Hull and mooring lines of a vessel alongside', es: 'Casco y amarras de un buque atracado'},
    title: {en: 'Marine accident investigation', es: 'Investigación de accidentes marítimos'},
    oneLiner: {en: 'Technical investigation of marine accidents and incidents: causes, damage and specialised reports.', es: 'Investigación técnica de accidentes e incidentes marítimos: causas, daños y reportes especializados.'},
    h1: {en: 'Marine accident investigation', es: 'Investigación de accidentes marítimos'},
    metaTitle: {en: 'Marine Accident Investigation in Panama | Cross World Agency', es: 'Investigación de accidentes marítimos en Panamá | Cross World Agency'},
    metaDescription: {en: 'Technical investigation of marine accidents and incidents in Panama: on-site inspection, evidence collection, technical analysis and specialised reports for shipowners, insurers and other parties involved.', es: 'Investigación técnica de accidentes e incidentes marítimos en Panamá: inspección en sitio, recopilación de evidencias, análisis técnico y reportes especializados para armadores, aseguradoras y otras partes involucradas.'},
    summary: {
      en: ['We conduct technical investigations of marine accidents and incidents to determine their causes, assess damage, identify operational factors and document the facts objectively. Our service includes on-site inspection, evidence collection, technical analysis and the preparation of specialised reports for shipowners, insurers and other parties involved.'],
      es: ['Realizamos investigaciones técnicas de accidentes e incidentes marítimos para determinar sus causas, evaluar daños, identificar factores operativos y documentar los hechos de manera objetiva. Nuestro servicio incluye inspección en sitio, recopilación de evidencias, análisis técnico y elaboración de reportes especializados para armadores, aseguradoras y otras partes involucradas.'],
    },
  },
  {
    key: 'consulting',
    slug: {en: 'maritime-consulting-and-audits', es: 'consultoria-maritima-y-auditorias'},
    cta: 'portcall',
    image: '/images/crane.jpg',
    imageAlt: {en: 'Port crane at a container terminal', es: 'Grúa portuaria en un terminal de contenedores'},
    title: {en: 'Consulting & audits', es: 'Consultoría y auditorías'},
    oneLiner: {en: 'ISM and ISPS preparation, vetting inspections and maritime projects.', es: 'Preparación ISM, ISPS, Vetting Inspections y proyectos marítimos.'},
    h1: {en: 'Consulting and audits', es: 'Consultoría y auditorías'},
    metaTitle: {en: 'Maritime Consulting and Audits in Panama: ISM, ISPS, Vetting | Cross World Agency', es: 'Consultoría y auditorías marítimas en Panamá: ISM, ISPS, Vetting | Cross World Agency'},
    metaDescription: {en: 'Advice and technical preparation for ISM and ISPS audits and vetting inspections, plus support for maritime projects: planning, technical support and follow-up.', es: 'Asesoría y preparación técnica para auditorías ISM, ISPS y Vetting Inspections, y acompañamiento de proyectos marítimos: planificación, soporte técnico y seguimiento.'},
    summary: {
      en: [
        'We provide advice and technical preparation for ISM and ISPS audits and vetting inspections, supporting shipowners and operators in reviewing procedures and documentation, meeting requirements and preparing the vessel before each inspection.',
        'We also develop and accompany maritime projects, providing technical support, planning and follow-up to ensure an organised, safe execution aligned with industry standards.',
      ],
      es: [
        'Brindamos asesoría y preparación técnica para auditorías ISM, ISPS y Vetting Inspections, apoyando a armadores y operadores en la revisión de procedimientos, documentación, cumplimiento de requisitos y preparación de la embarcación antes de cada inspección.',
        'También desarrollamos y acompañamos proyectos marítimos, aportando soporte técnico, planificación y seguimiento para asegurar una ejecución organizada, segura y alineada con los estándares de la industria.',
      ],
    },
  },
];

export const serviceByKey = (key: string) => services.find((s) => s.key === key);
export const serviceBySlug = (locale: Locale, slug: string) => services.find((s) => s.slug[locale] === slug);
