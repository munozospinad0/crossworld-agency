import type {Locale} from '@/i18n/routing';

type Block = {h2: string; p?: string[]; ul?: string[]};
export type StaticPage = {title: string; metaTitle: string; metaDescription: string; lead: string; blocks: Block[]};

export const pages: Record<'about' | 'certifications' | 'compliance' | 'contact' | 'privacy' | 'terms', Record<Locale, StaticPage>> = {
  about: {
    en: {
      title: 'About Cross World Agency',
      metaTitle: 'About: AMP-licensed ship agency at the Panama Canal since 2010',
      metaDescription: 'Cross World Agencies, S.A., founded on 4 March 2010, is an AMP-licensed ship agency authorized by the Panama Canal Authority, led by Captain Guillermo A. Peña, with representation in Venezuela, Brazil, Aruba and Greece.',
      lead: 'Cross World Agencies, S.A. was founded on 4 March 2010 under a ship agency licence from the Panama Maritime Authority and is authorized by the Panama Canal Authority as a shipping agency. We handle port calls, transits, independent surveys and claims support at both ends of the Canal.',
      blocks: [
        {h2: 'Timeline', ul: ['2010: AMP ship agency licence and Panama Canal Authority authorization (4 March 2010).', 'ISO 9001, 14001, 45001 and 22000 certifications (years to confirm).', 'SOS Resilience Holding, fuel marketing line (year to confirm).', 'Representation in Venezuela, Brazil, Aruba and Greece (firms and years to confirm).']},
        {h2: 'The captain', p: ['Captain Guillermo A. Peña has commanded and inspected vessels for (years to confirm). He holds the ISM Code Internal Auditor credential (ABSG Consulting), trained at the Seafarers Training Center, the Maersk Training Centre and NFPA / Texas Engineering Extension Service, and reviews every survey report and every PDA that leaves this office.']},
        {h2: 'What we believe', ul: ['One team for the port call: the officer who takes your nomination follows the vessel until the FDA.', 'Independent surveyors for the evidence: we survey under the instructions of the party that appoints us and never attend supplies that Cross World or its affiliates market.', 'Figures with sources: every Canal or bunker figure we publish cites the Panama Canal Authority or the Panama Maritime Authority and carries a review date.', 'No promises we cannot keep: we publish only service levels the duty desk can meet.']},
        {h2: 'Vision', p: ['In the words of our company profile: to be recognized by national and international renowned clients and shipowners as the most reliable shipping agency because of the excellence of our services.']},
        {h2: 'Partners and representation', p: ['Andrew Moore & Associates, Sabatino Pizzolante (P&I correspondent in Venezuela), Victoria Corporation, EcoGreen and White Glacier (logos published with written permission). Representation in Panama, Venezuela, Brazil, Aruba and Greece.']},
        {h2: 'Ethics channel', p: ['Concerns about our conduct can be reported to the ethics channel (address to confirm). Reports are handled by the managing director and, where needed, by external counsel.']},
      ],
    },
    es: {
      title: 'Sobre Cross World Agency',
      metaTitle: 'Nosotros: agencia naviera con licencia AMP en el Canal de Panamá desde 2010',
      metaDescription: 'Cross World Agencies, S.A., fundada el 4 de marzo de 2010, es una agencia naviera con licencia de la AMP y autorización de la Autoridad del Canal, dirigida por el capitán Guillermo A. Peña, con representación en Venezuela, Brasil, Aruba y Grecia.',
      lead: 'Cross World Agencies, S.A. se fundó el 4 de marzo de 2010 con licencia de agencia naviera de la Autoridad Marítima de Panamá y está autorizada por la Autoridad del Canal de Panamá como agencia naviera. Atendemos escalas, tránsitos, inspecciones independientes y soporte a reclamos en ambos lados del Canal.',
      blocks: [
        {h2: 'Línea de tiempo', ul: ['2010: licencia AMP y autorización de la Autoridad del Canal (4 de marzo de 2010).', 'Certificaciones ISO 9001, 14001, 45001 y 22000 (años a confirmar).', 'SOS Resilience Holding, línea de comercialización de combustible (año a confirmar).', 'Representación en Venezuela, Brasil, Aruba y Grecia (firmas y años a confirmar).']},
        {h2: 'El capitán', p: ['El capitán Guillermo A. Peña ha comandado e inspeccionado buques durante (años a confirmar). Es auditor interno del Código ISM (ABSG Consulting), formado en el Seafarers Training Center, el Maersk Training Centre y NFPA / Texas Engineering Extension Service, y revisa cada informe de inspección y cada PDA que sale de esta oficina.']},
        {h2: 'En qué creemos', ul: ['Un solo equipo para la escala: el oficial que recibe su nominación sigue al buque hasta la FDA.', 'Surveyors independientes para la evidencia: inspeccionamos bajo las instrucciones de quien nos nombra y nunca atendemos entregas que Cross World o sus afiliadas comercialicen.', 'Cifras con fuente: cada cifra del Canal o de bunker que publicamos cita a la Autoridad del Canal o a la Autoridad Marítima y lleva fecha de revisión.', 'Sin promesas que no podamos cumplir: publicamos solo los niveles de servicio que la guardia puede sostener.']},
        {h2: 'Visión', p: ['En palabras de nuestro perfil corporativo: ser reconocidos por clientes y armadores nacionales e internacionales como la agencia naviera más confiable por la excelencia de nuestros servicios.']},
        {h2: 'Socios y representación', p: ['Andrew Moore & Associates, Sabatino Pizzolante (corresponsal P&I en Venezuela), Victoria Corporation, EcoGreen y White Glacier (logos publicados con permiso escrito). Representación en Panamá, Venezuela, Brasil, Aruba y Grecia.']},
        {h2: 'Canal de ética', p: ['Las inquietudes sobre nuestra conducta pueden reportarse al canal de ética (dirección a confirmar). Los reportes los atiende la dirección general y, cuando hace falta, asesoría legal externa.']},
      ],
    },
  },
  certifications: {
    en: {
      title: 'Certifications and licences',
      metaTitle: 'Certifications: ISO 9001, 14001, 45001, 22000, AMP licence, ACP authorization',
      metaDescription: 'ISO 9001:2015, 14001:2015, 45001:2018 and 22000:2018 certified by AQC Middle East LLC (accredited by IAS), AMP ship agency licence, Panama Canal Authority authorization, IMO company number 5785507.',
      lead: 'Every credential below is shown with its issuer and scope. Certificate numbers and validity dates are published once confirmed; ask the duty officer for copies.',
      blocks: [
        {h2: 'Licences and registrations', ul: ['Ship agency licence, Panama Maritime Authority (AMP).', 'Shipping agency authorization, Panama Canal Authority (agency code to confirm).', 'IMO company number 5785507.', 'RUC 1675308-1-680680 DV 34, Cross World Agencies, S.A.']},
        {h2: 'ISO 9001:2015, quality management', p: ['Certified by AQC Middle East LLC, a certification body accredited by IAS (IAF member). Scope: management, chartering, administration and operation of ships: general cargo ships, tankers, bulk carriers, tug vessels and barges. Certificate number and validity: to confirm.']},
        {h2: 'ISO 14001:2015, environmental management', p: ['Certified by AQC Middle East LLC (accredited by IAS). Scope and validity: to confirm.']},
        {h2: 'ISO 45001:2018, occupational health and safety', p: ['Certified by AQC Middle East LLC (accredited by IAS). Scope and validity: to confirm.']},
        {h2: 'ISO 22000:2018, food safety management', p: ['Certified by AQC Middle East LLC (accredited by IAS). Scope: food cargo inspections of agricultural origin, bulk food cargo certifier. Validity: to confirm.']},
        {h2: 'Personal credentials, Captain Guillermo A. Peña', ul: ['ISM Code Internal Auditor, ABSG Consulting (Venezuela).', 'Seafarers Training Center.', 'Maersk Training Centre.', 'NFPA / Texas Engineering Extension Service.']},
        {h2: 'Professional indemnity', p: ['Professional indemnity cover: to confirm (details on request).']},
      ],
    },
    es: {
      title: 'Certificaciones y licencias',
      metaTitle: 'Certificaciones: ISO 9001, 14001, 45001, 22000, licencia AMP, autorización ACP',
      metaDescription: 'ISO 9001:2015, 14001:2015, 45001:2018 y 22000:2018 certificadas por AQC Middle East LLC (acreditado por IAS), licencia de agencia naviera de la AMP, autorización de la Autoridad del Canal, IMO company number 5785507.',
      lead: 'Cada credencial se muestra con su emisor y su alcance. Los números de certificado y las vigencias se publican una vez confirmados; pida copias al oficial de guardia.',
      blocks: [
        {h2: 'Licencias y registros', ul: ['Licencia de agencia naviera, Autoridad Marítima de Panamá (AMP).', 'Autorización como agencia naviera, Autoridad del Canal de Panamá (código de agencia a confirmar).', 'IMO company number 5785507.', 'RUC 1675308-1-680680 DV 34, Cross World Agencies, S.A.']},
        {h2: 'ISO 9001:2015, gestión de calidad', p: ['Certificada por AQC Middle East LLC, organismo de certificación acreditado por IAS (miembro del IAF). Alcance: gestión, fletamento, administración y operación de buques: carga general, tanqueros, graneleros, remolcadores y barcazas. Número y vigencia: a confirmar.']},
        {h2: 'ISO 14001:2015, gestión ambiental', p: ['Certificada por AQC Middle East LLC (acreditado por IAS). Alcance y vigencia: a confirmar.']},
        {h2: 'ISO 45001:2018, seguridad y salud en el trabajo', p: ['Certificada por AQC Middle East LLC (acreditado por IAS). Alcance y vigencia: a confirmar.']},
        {h2: 'ISO 22000:2018, inocuidad alimentaria', p: ['Certificada por AQC Middle East LLC (acreditado por IAS). Alcance: inspecciones de carga alimentaria de origen agrícola, certificador de carga alimentaria a granel. Vigencia: a confirmar.']},
        {h2: 'Credenciales personales, capitán Guillermo A. Peña', ul: ['Auditor interno del Código ISM, ABSG Consulting (Venezuela).', 'Seafarers Training Center.', 'Maersk Training Centre.', 'NFPA / Texas Engineering Extension Service.']},
        {h2: 'Responsabilidad profesional', p: ['Póliza de responsabilidad profesional: a confirmar (detalles a solicitud).']},
      ],
    },
  },
  compliance: {
    en: {
      title: 'Compliance, sanctions and KYC',
      metaTitle: 'Compliance: sanctions screening, KYC/AML, anti-bribery, KYC pack',
      metaDescription: 'How Cross World Agency screens vessels and counterparties against OFAC, EU, UK and UN sanctions, handles KYC and AML, prohibits facilitation payments, and what the KYC pack for supplier onboarding contains.',
      lead: 'Shipowners, managers, traders and clubs need to onboard us before they can nominate us. This page states our policies and lists the documents in our KYC pack.',
      blocks: [
        {h2: 'Sanctions screening', p: ['We screen every vessel, owner, manager, charterer and counterparty against the OFAC, EU, UK and UN sanctions lists before accepting a nomination and again before funds are called. We do not do business with sanctioned parties or with vessels engaged in sanctioned trades. Screening tool: to confirm.']},
        {h2: 'KYC and anti-money laundering', p: ['We identify the principal behind every nomination, verify the paying entity and refuse third-party payments that cannot be explained. Funds are called and received only through the bank account stated on the PDA.']},
        {h2: 'Anti-bribery and facilitation payments', p: ['We do not make or accept facilitation payments to officials, pilots, inspectors or terminal staff, and we report requests for them. Alignment with the Maritime Anti-Corruption Network (MACN): to confirm.']},
        {h2: 'Bank details', p: ['Bank details are issued only on the PDA and confirmed by phone with your duty officer. We never change bank details by email. If you receive an email asking you to pay to a different account, call us before paying.']},
        {h2: 'KYC pack (supplier onboarding)', ul: ['Public Registry certificate of Cross World Agencies, S.A.', 'AMP ship agency licence.', 'Panama Canal Authority authorization.', 'ISO 9001, 14001, 45001 and 22000 certificates with scope.', 'Professional indemnity policy (to confirm).', 'W-8BEN-E.', 'Bank reference letter.', 'Legal name, licence and ownership of SOS Resilience Holding (to confirm).']},
        {h2: 'Data protection', p: ['Personal data in requests and correspondence is processed under Panama\'s Law 81 of 2019 and, for European principals, the GDPR. See the privacy policy.']},
        {h2: 'Ethics channel', p: ['Report concerns to the ethics channel (address to confirm).']},
      ],
    },
    es: {
      title: 'Cumplimiento, sanciones y KYC',
      metaTitle: 'Cumplimiento: sanciones, KYC/AML, antisoborno, KYC pack',
      metaDescription: 'Cómo Cross World Agency verifica buques y contrapartes contra las listas de sanciones de OFAC, UE, Reino Unido y ONU, maneja KYC y AML, prohíbe pagos de facilitación y qué contiene el KYC pack para alta de proveedor.',
      lead: 'Armadores, gestores, traders y clubes necesitan darnos de alta como proveedor antes de poder nominarnos. Esta página declara nuestras políticas y lista los documentos del KYC pack.',
      blocks: [
        {h2: 'Verificación de sanciones', p: ['Verificamos cada buque, armador, gestor, fletador y contraparte contra las listas de sanciones de OFAC, UE, Reino Unido y ONU antes de aceptar una nominación y de nuevo antes de llamar los fondos. No hacemos negocios con partes sancionadas ni con buques en comercios sancionados. Herramienta de verificación: a confirmar.']},
        {h2: 'KYC y prevención de lavado de activos', p: ['Identificamos al principal detrás de cada nominación, verificamos la entidad que paga y rechazamos pagos de terceros que no puedan explicarse. Los fondos se llaman y se reciben solo en la cuenta bancaria indicada en la PDA.']},
        {h2: 'Antisoborno y pagos de facilitación', p: ['No hacemos ni aceptamos pagos de facilitación a funcionarios, prácticos, inspectores o personal de terminal, y reportamos las solicitudes. Alineación con la Maritime Anti-Corruption Network (MACN): a confirmar.']},
        {h2: 'Datos bancarios', p: ['Los datos bancarios se emiten solo en la PDA y se confirman por teléfono con su oficial de guardia. Nunca cambiamos datos bancarios por correo. Si recibe un correo pidiendo pagar a otra cuenta, llámenos antes de pagar.']},
        {h2: 'KYC pack (alta de proveedor)', ul: ['Certificado del Registro Público de Cross World Agencies, S.A.', 'Licencia de agencia naviera de la AMP.', 'Autorización de la Autoridad del Canal de Panamá.', 'Certificados ISO 9001, 14001, 45001 y 22000 con alcance.', 'Póliza de responsabilidad profesional (a confirmar).', 'W-8BEN-E.', 'Carta de referencia bancaria.', 'Nombre legal, licencia y titularidad de SOS Resilience Holding (a confirmar).']},
        {h2: 'Protección de datos', p: ['Los datos personales de solicitudes y correspondencia se tratan bajo la Ley 81 de 2019 de Panamá y, para principales europeos, el RGPD. Vea la política de privacidad.']},
        {h2: 'Canal de ética', p: ['Reporte inquietudes al canal de ética (dirección a confirmar).']},
      ],
    },
  },
  contact: {
    en: {
      title: 'Contact the duty officer',
      metaTitle: 'Contact: duty officer 24/7 at Balboa and Cristóbal',
      metaDescription: 'Cross World Agency, RBS Tower, Paitilla, Panama City. Operations 24/7 +507 6266-4242. Duty officers on the Pacific and Atlantic side of the Panama Canal.',
      lead: 'The duty officer answers 24/7. For a transit or port call, use the request form so we can issue a PDA with a request number.',
      blocks: [],
    },
    es: {
      title: 'Contacte al oficial de guardia',
      metaTitle: 'Contacto: oficial de guardia 24/7 en Balboa y Cristóbal',
      metaDescription: 'Cross World Agency, RBS Tower, Paitilla, Ciudad de Panamá. Operaciones 24/7 +507 6266-4242. Oficiales de guardia en el Pacífico y el Atlántico del Canal de Panamá.',
      lead: 'El oficial de guardia responde 24/7. Para un tránsito o una escala, use el formulario de solicitud para que emitamos una PDA con número de solicitud.',
      blocks: [],
    },
  },
  privacy: {
    en: {
      title: 'Privacy policy',
      metaTitle: 'Privacy policy',
      metaDescription: 'How Cross World Agencies, S.A. processes personal data under Panama\'s Law 81 of 2019 and the GDPR.',
      lead: 'Cross World Agencies, S.A. (RBS Tower, 9th floor, office 902, Paitilla, Panama City) is the controller of the personal data processed through this website. Last updated 31 August 2026. Draft for legal review (to confirm).',
      blocks: [
        {h2: 'What we collect', ul: ['Data you send in forms: name, company, job title, email, phone, vessel particulars and attachments.', 'Technical data: IP address, browser, pages visited (analytics, subject to consent where required).', 'Attribution data: campaign parameters of your first visit (stored only with your consent where required).']},
        {h2: 'Why', ul: ['To answer your request and issue a PDA, a survey confirmation or a quote.', 'To comply with sanctions screening, KYC and legal obligations.', 'To measure and improve the website.']},
        {h2: 'Legal basis and retention', p: ['Performance of a contract or pre-contractual steps, legal obligations and legitimate interest (Law 81 of 2019, Panama; GDPR art. 6 for European principals). Request data is kept for as long as the commercial relationship and applicable time bars require; analytics data for 26 months.']},
        {h2: 'Processors', p: ['Vercel (hosting, EU/US), Resend (email), Neon (database), Cloudflare Turnstile (anti-spam), Google (analytics, with consent). Data may be transferred outside Panama under standard safeguards.']},
        {h2: 'Your rights', p: ['Access, rectification, erasure, objection and portability. Write to the operations email or the ethics channel (addresses to confirm). European principals may lodge a complaint with their supervisory authority.']},
        {h2: 'Cookies', p: ['Strictly necessary cookies only, plus analytics cookies with your consent in the EU, UK and Switzerland and with an opt-out elsewhere.']},
      ],
    },
    es: {
      title: 'Política de privacidad',
      metaTitle: 'Política de privacidad',
      metaDescription: 'Cómo Cross World Agencies, S.A. trata los datos personales bajo la Ley 81 de 2019 de Panamá y el RGPD.',
      lead: 'Cross World Agencies, S.A. (RBS Tower, piso 9, oficina 902, Paitilla, Ciudad de Panamá) es responsable de los datos personales tratados a través de este sitio. Última actualización: 31 de agosto de 2026. Borrador para revisión legal (a confirmar).',
      blocks: [
        {h2: 'Qué recogemos', ul: ['Datos que envía en formularios: nombre, empresa, cargo, correo, teléfono, datos del buque y adjuntos.', 'Datos técnicos: dirección IP, navegador, páginas visitadas (analítica, sujeta a consentimiento donde se exige).', 'Datos de atribución: parámetros de campaña de su primera visita (solo con su consentimiento donde se exige).']},
        {h2: 'Para qué', ul: ['Responder su solicitud y emitir una PDA, una confirmación de inspección o una cotización.', 'Cumplir con verificación de sanciones, KYC y obligaciones legales.', 'Medir y mejorar el sitio.']},
        {h2: 'Base legal y conservación', p: ['Ejecución de un contrato o pasos precontractuales, obligaciones legales e interés legítimo (Ley 81 de 2019, Panamá; art. 6 del RGPD para principales europeos). Los datos de solicitudes se conservan mientras dure la relación comercial y los plazos aplicables; los de analítica, 26 meses.']},
        {h2: 'Encargados', p: ['Vercel (alojamiento, UE/EE.UU.), Resend (correo), Neon (base de datos), Cloudflare Turnstile (antispam), Google (analítica, con consentimiento). Los datos pueden transferirse fuera de Panamá con las salvaguardas estándar.']},
        {h2: 'Sus derechos', p: ['Acceso, rectificación, supresión, oposición y portabilidad. Escriba al correo de operaciones o al canal de ética (direcciones a confirmar). Los principales europeos pueden reclamar ante su autoridad de control.']},
        {h2: 'Cookies', p: ['Solo cookies estrictamente necesarias, más cookies de analítica con su consentimiento en la UE, Reino Unido y Suiza y con opción de rechazo en el resto.']},
      ],
    },
  },
  terms: {
    en: {
      title: 'Standard Trading Conditions',
      metaTitle: 'Standard Trading Conditions',
      metaDescription: 'Standard Trading Conditions of Cross World Agencies, S.A. for ship agency, survey and related services in Panama.',
      lead: 'These conditions apply to every service Cross World Agencies, S.A. provides and are referenced in every PDA, FDA and email. Draft based on the FONASBA / ITIC model for legal review under Panamanian law (to confirm).',
      blocks: [
        {h2: '1. Application', p: ['These conditions apply to all services, including ship agency, husbandry, surveys, claims support, fuel supply coordination and consulting, unless a written agreement states otherwise.']},
        {h2: '2. Agency', p: ['Cross World acts as agent only, on behalf of the principal who appoints it. Third-party charges (Authority, pilots, tugs, linehandlers, suppliers) are paid on the principal\'s behalf and account.']},
        {h2: '3. Funds', p: ['Funds are called ahead of the service as stated in the PDA. Cross World may decline to commit to third parties until funds are received.']},
        {h2: '4. Surveys', p: ['Survey reports state the surveyor\'s findings at the time and place of attendance and do not constitute a warranty of the vessel, cargo or fuel.']},
        {h2: '5. Liability', p: ['Cross World\'s liability for any claim is limited to the amount stated in the written agreement or, failing that, to the agency fee for the service concerned, except in cases of wilful misconduct. Cross World is not liable for the acts of third parties it engages on the principal\'s behalf.']},
        {h2: '6. Time bar', p: ['Claims against Cross World must be notified in writing within 9 months of the event.']},
        {h2: '7. Law and jurisdiction', p: ['Panamanian law; courts of Panama City, unless otherwise agreed.']},
      ],
    },
    es: {
      title: 'Condiciones generales de contratación',
      metaTitle: 'Condiciones generales de contratación',
      metaDescription: 'Condiciones generales de Cross World Agencies, S.A. para servicios de agencia naviera, inspección y relacionados en Panamá.',
      lead: 'Estas condiciones aplican a todo servicio que presta Cross World Agencies, S.A. y se referencian en cada PDA, FDA y correo. Borrador basado en el modelo FONASBA / ITIC para revisión legal bajo ley panameña (a confirmar).',
      blocks: [
        {h2: '1. Aplicación', p: ['Estas condiciones aplican a todos los servicios, incluidos agencia naviera, husbandry, inspecciones, soporte a reclamos, coordinación de suministro de combustible y consultoría, salvo acuerdo escrito en contrario.']},
        {h2: '2. Agencia', p: ['Cross World actúa solo como agente, por cuenta del principal que lo nombra. Los cargos de terceros (Autoridad, prácticos, remolcadores, pasacables, proveedores) se pagan por cuenta y orden del principal.']},
        {h2: '3. Fondos', p: ['Los fondos se llaman antes del servicio según la PDA. Cross World puede abstenerse de comprometerse con terceros hasta recibirlos.']},
        {h2: '4. Inspecciones', p: ['Los informes de inspección recogen los hallazgos del surveyor en el momento y lugar de la atención y no constituyen garantía del buque, la carga o el combustible.']},
        {h2: '5. Responsabilidad', p: ['La responsabilidad de Cross World por cualquier reclamo se limita al monto indicado en el acuerdo escrito o, en su defecto, al honorario de agencia del servicio, salvo dolo. Cross World no responde por los actos de terceros contratados por cuenta del principal.']},
        {h2: '6. Plazo', p: ['Los reclamos contra Cross World deben notificarse por escrito dentro de los 9 meses del hecho.']},
        {h2: '7. Ley y jurisdicción', p: ['Ley panameña; tribunales de la Ciudad de Panamá, salvo acuerdo en contrario.']},
      ],
    },
  },
};
