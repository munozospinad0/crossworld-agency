import type {Article} from '@/content/articles';

/**
 * Segundo artículo: qué es un Agente Naviero Autorizado ante la ACP.
 *
 * Por qué este tema: «shipping agent» y «shipping agency» suman más de 8.000 búsquedas mensuales
 * en inglés, la ficha de servicio de agencia tiene 45 palabras, y ningún competidor explica la
 * figura. Además demuestra la credencial del cliente en vez de limitarse a afirmarla.
 *
 * Fuente única: «Parámetros y procedimientos para ser considerado Agente Naviero Autorizado»,
 * ACP, 5 de marzo de 2025, archivado en research/acp/. Ninguna cifra ni requisito sale de otro
 * lado. La lista de documentos es literal del aviso.
 */
export const authorizedShippingAgent: Article = {
  key: 'authorized-agent',
  slug: {
    en: 'authorized-shipping-agent-panama-canal',
    es: 'agente-naviero-autorizado-canal-de-panama',
  },
  title: {
    en: 'What the Panama Canal requires before it lets an agency represent your vessel',
    es: 'Qué exige el Canal de Panamá antes de dejar que una agencia represente a su buque',
  },
  metaTitle: {en: 'Authorized Shipping Agent, Panama Canal', es: 'Agente Naviero Autorizado del Canal'},
  metaDescription: {
    en: 'The eight documents the Panama Canal Authority demands to recognise a shipping agency, what the agent becomes liable for, and when the authorization is cancelled.',
    es: 'Los ocho documentos que exige la Autoridad del Canal para reconocer a una agencia naviera, de qué responde el agente y cuándo se le cancela la autorización.',
  },
  standfirst: {
    en: 'Not every company that calls itself a Panama agent can act as one before the Canal. The Authority keeps a register, demands eight documents to enter it, and can cancel the code for dishonesty, for losing the AMP licence, or simply for three years without activity.',
    es: 'No toda empresa que se presenta como agente en Panamá puede actuar como tal ante el Canal. La Autoridad lleva un registro, exige ocho documentos para entrar en él, y puede cancelar el código por deshonestidad, por perder la licencia de la AMP o simplemente por tres años sin actividad.',
  },
  published: '2026-09-09',
  updated: '2026-09-09',
  readingMinutes: 7,
  image: '/images/port-cranes.jpg',
  imageAlt: {
    en: 'Container cranes at a Panama Canal terminal',
    es: 'Grúas de contenedores en un terminal del Canal de Panamá',
  },
  topic: {en: 'Agency and compliance', es: 'Agencia y cumplimiento'},
  reviewedByCaptain: false,
  sources: [
    {
      label: {
        en: 'Panama Canal Authority, “Parámetros y procedimientos para ser considerado Agente Naviero Autorizado”, 5 March 2025.',
        es: 'Autoridad del Canal de Panamá, «Parámetros y procedimientos para ser considerado Agente Naviero Autorizado», 5 de marzo de 2025.',
      },
      url: 'https://pancanal.com/wp-content/uploads/2025/03/Parametros-y-Procedimientos-Agente-Naviero-Autorizado-5mar2025.pdf',
    },
    {
      label: {
        en: 'Panama Canal Authority, Customer Code Issuance, Consolidation and Deactivation procedure, revised September 2025.',
        es: 'Autoridad del Canal de Panamá, procedimiento de emisión, consolidación y desactivación del código de cliente, revisado en septiembre de 2025.',
      },
      url: 'https://pancanal.com/wp-content/uploads/2025/09/CUSTOMER-CODE-PROCEDURE-REV-SEP025.pdf',
    },
    {
      label: {
        en: 'Regulation on Navigation in Panama Canal Waters, article 9 (definition of shipping agent).',
        es: 'Reglamento para la Navegación en Aguas del Canal de Panamá, artículo 9 (definición de agente naviero).',
      },
    },
  ],
  related: [
    {
      href: {pathname: '/services/[slug]', params: {slug: 'ship-agency-panama-canal-transit'}},
      label: {en: 'Ship agency and Canal transit services', es: 'Agencia naviera y servicios de tránsito del Canal'},
    },
    {
      href: {pathname: '/insights/[slug]', params: {slug: 'panama-canal-transit-booking'}},
      label: {en: 'Booking a Canal slot: fees, periods and penalties', es: 'Reservar un cupo del Canal: tasas, periodos y penalidades'},
    },
    {
      href: '/panama-canal-transit-guide',
      label: {en: 'How a Panama Canal transit works, end to end', es: 'Cómo funciona un tránsito por el Canal de Panamá, de principio a fin'},
    },
    {
      href: '/compliance',
      label: {en: 'Our compliance and KYC pack', es: 'Nuestro cumplimiento y KYC pack'},
    },
  ],
  body: [
    {
      t: 'p',
      text: {
        en: 'A charterer once asked us why the quotation from another company was so much lower. It was lower because that company was not going to be the agent before the Canal: it was going to subcontract one, add a margin, and stay out of the liability. That is a legitimate way to work, but the owner should know it is happening, because the party the Authority holds responsible is not the one who sent the quote.',
        es: 'Un fletador nos preguntó una vez por qué la cotización de otra empresa era tan barata. Era barata porque esa empresa no iba a ser el agente ante el Canal: iba a subcontratar uno, añadir un margen y quedarse fuera de la responsabilidad. Es una forma legítima de trabajar, pero el armador debería saber que ocurre, porque la parte a la que la Autoridad hace responsable no es la que mandó la cotización.',
      },
    },
    {
      t: 'note',
      text: {
        en: 'Everything below comes from the ACP’s own procedure for authorized shipping agents, dated 5 March 2025, linked at the foot of this page. Requirements change: check the current version before you act on it.',
        es: 'Todo lo de abajo sale del procedimiento de la ACP para agentes navieros autorizados, del 5 de marzo de 2025, enlazado al pie de esta página. Los requisitos cambian: consulte la versión vigente antes de actuar sobre ella.',
      },
    },

    {t: 'h2', id: 'what', text: {en: 'What is a shipping agent, for the Canal?', es: '¿Qué es un agente naviero, para el Canal?'}},
    {
      t: 'p',
      text: {
        en: 'Article 9 of the Regulation on Navigation in Panama Canal Waters defines the shipping agent as the person or entity authorized by the owner or operator of the vessel, in the form prescribed by the Authority, with powers to represent it. Two things follow from that sentence, and both matter commercially.',
        es: 'El artículo 9 del Reglamento para la Navegación en Aguas del Canal de Panamá define al agente naviero como la persona o entidad autorizada por el armador u operador del buque, en la forma que prescribe la Autoridad, con facultades para representarlo. De esa frase se derivan dos cosas, y las dos importan comercialmente.',
      },
    },
    {
      t: 'ol',
      items: {
        en: [
          'The appointment comes from the owner or operator, not from the Canal. The Authority recognises agents; it does not assign them.',
          'The recognition has a form the Authority prescribes. An agency that has not gone through it cannot act as agent before the ACP, whatever its brochure says.',
        ],
        es: [
          'El nombramiento viene del armador o del operador, no del Canal. La Autoridad reconoce agentes; no los asigna.',
          'El reconocimiento tiene una forma que prescribe la Autoridad. Una agencia que no ha pasado por ella no puede actuar como agente ante la ACP, diga lo que diga su folleto.',
        ],
      },
    },
    {
      t: 'answer',
      q: {en: 'What is the authorized agent actually liable for?', es: '¿De qué responde realmente el agente autorizado?'},
      a: {
        en: 'The procedure is explicit: authorized agents are responsible for the services they request from the Canal, including their coordination and their payment. It is not a forwarding role. When the agent books a slot, orders tugs or requests an inspection, the agent answers for it before the Authority.',
        es: 'El procedimiento es explícito: los agentes autorizados son responsables de los servicios que solicitan al Canal, incluida su coordinación y su pago. No es un papel de intermediación. Cuando el agente reserva un cupo, pide remolcadores o solicita una inspección, responde por ello ante la Autoridad.',
      },
    },

    {t: 'h2', id: 'documents', text: {en: 'The eight documents the Authority demands', es: 'Los ocho documentos que exige la Autoridad'}},
    {
      t: 'p',
      text: {
        en: 'The application has to be filed complete. Three of the eight are about solvency rather than paperwork, which tells you what the Authority is really screening for.',
        es: 'La solicitud se presenta completa. Tres de los ocho son de solvencia y no de papeleo, lo que dice bastante sobre qué está filtrando de verdad la Autoridad.',
      },
    },
    {
      t: 'table',
      caption: {
        en: 'Documents required to be recognised as an Authorized Shipping Agent, ACP procedure of 5 March 2025.',
        es: 'Documentos exigidos para ser reconocido como Agente Naviero Autorizado, procedimiento de la ACP del 5 de marzo de 2025.',
      },
      head: {en: ['#', 'Document', 'What it proves'], es: ['#', 'Documento', 'Qué acredita']},
      rows: {
        en: [
          ['a', 'Application form 3676', 'The formal request itself'],
          ['b', 'Operations notice from the Ministry of Commerce and Industry', 'That the applicant may legally act as a shipping agency, and since when'],
          ['c', 'Articles of incorporation and any registered amendments', 'Corporate existence and who controls it'],
          ['d', 'Legal entity certificate from the Public Registry, under six months old', 'That the company is current, not dormant'],
          ['e', 'Operating licence or provisional permit from the Panama Maritime Authority', 'The maritime licence itself'],
          ['f', 'Bank reference letter, client for at least six months', 'A banking relationship with history'],
          ['g', 'Letter from the guarantor bank on transit guarantees', 'That transits can actually be guaranteed'],
          ['h', 'Identity document of the legal representative', 'Who signs and answers'],
        ],
        es: [
          ['a', 'Formulario de solicitud 3676', 'La solicitud formal'],
          ['b', 'Aviso de operaciones del Ministerio de Comercio e Industrias', 'Que el solicitante puede ejercer legalmente como agencia naviera, y desde cuándo'],
          ['c', 'Pacto social y las escrituras de sus cambios registrados', 'Existencia de la sociedad y quién la controla'],
          ['d', 'Certificado de persona jurídica del Registro Público, de menos de seis meses', 'Que la sociedad está vigente, no dormida'],
          ['e', 'Licencia de operaciones o permiso provisional de la Autoridad Marítima de Panamá', 'La licencia marítima'],
          ['f', 'Carta de referencia bancaria, con seis meses de relación mínima', 'Una relación bancaria con historia'],
          ['g', 'Carta del banco garante sobre las garantías de tránsito', 'Que los tránsitos se pueden garantizar de verdad'],
          ['h', 'Documento de identidad del representante legal', 'Quién firma y quién responde'],
        ],
      },
    },
    {
      t: 'p',
      text: {
        en: 'Applications are filed at the Shipping Customer Service Management office, building 729, ground floor, Balboa, Ancón. The Authority reserves the right to ask for further documentation or references.',
        es: 'Las solicitudes se entregan en la oficina de Gestión del Servicio al Cliente Naviero, edificio 729, planta baja, Balboa, Ancón. La Autoridad se reserva el derecho de pedir documentación o referencias adicionales.',
      },
    },

    {t: 'h2', id: 'refusal', text: {en: 'When the Authority says no', es: 'Cuándo la Autoridad dice que no'}},
    {
      t: 'p',
      text: {
        en: 'Only two grounds for outright refusal are listed, and the first one is about money: a record of non-payment or any outstanding obligation with the ACP. The accounts receivable section checks its own records against the applicant. The second is false information or altered documents in the application.',
        es: 'Solo se enumeran dos causales de negación directa, y la primera es de dinero: historial de no pago o cualquier obligación pendiente con la ACP. La sección de cuentas por cobrar coteja sus propios registros contra el solicitante. La segunda es información falsa o documentación alterada en la solicitud.',
      },
    },

    {t: 'h2', id: 'cancellation', text: {en: 'And when it takes the code away', es: 'Y cuándo le quita el código'}},
    {
      t: 'p',
      text: {
        en: 'Five grounds for cancellation. The one that surprises people is the fourth: an agent that goes three years without a single transaction with the ACP loses the code, no misconduct required.',
        es: 'Cinco causales de cancelación. La que sorprende es la cuarta: un agente que pasa tres años sin una sola transacción con la ACP pierde el código, sin que haya mediado falta alguna.',
      },
    },
    {
      t: 'ul',
      items: {
        en: [
          'Falsehood, deceit or improper conduct against the ACP, its workers or its customers.',
          'Cancellation of the AMP shipping agency licence, bankruptcy, or dissolution of the company.',
          'Any dishonest act in the course of acting as agent before the ACP.',
          'Three years without any activity or transaction as agent with the ACP.',
          'Any act or omission that could damage the image of the ACP or its workers.',
        ],
        es: [
          'Falsedad, engaño o conducta indebida contra la ACP, sus trabajadores o sus clientes.',
          'Cancelación de la licencia de agencia naviera de la AMP, quiebra comercial o disolución de la sociedad.',
          'Cualquier acto deshonesto en las actuaciones como agente ante la ACP.',
          'Tres años sin actividad ni transacción alguna como agente con la ACP.',
          'Cualquier acción u omisión que pudiera afectar negativamente la imagen de la ACP o de sus trabajadores.',
        ],
      },
    },
    {
      t: 'p',
      text: {
        en: 'Suspension can run up to three years, after which the agency has to apply again from scratch. A repeat offence means definitive cancellation, and none of it prevents whatever civil or criminal liability the conduct carries.',
        es: 'La suspensión puede llegar a tres años, tras los cuales la agencia debe tramitar la solicitud otra vez desde cero. La reincidencia significa cancelación definitiva, y nada de eso impide las responsabilidades civiles o penales que la conducta acarree.',
      },
    },

    {t: 'h2', id: 'customer-code', text: {en: 'The customer code, which is a different thing', es: 'El código de cliente, que es otra cosa'}},
    {
      t: 'p',
      text: {
        en: 'Owners and operators get their own customer code from the ACP, separate from the agent’s authorization. Sub-charterers have to request one of their own and report it when booking. Codes can also be consolidated when several owners in a commercial relationship ask to merge them. Getting this wrong at nomination time is a common source of delay, because the booking has to be tied to the right code.',
        es: 'Los armadores y operadores tienen su propio código de cliente ante la ACP, distinto de la autorización del agente. Los subfletadores deben solicitar uno propio y reportarlo al reservar. Los códigos también se pueden consolidar cuando varios armadores con relación comercial piden fusionarlos. Equivocarse en esto al nominar es una causa habitual de demora, porque la reserva tiene que quedar atada al código correcto.',
      },
    },

    {t: 'h2', id: 'ask', text: {en: 'What to ask before you nominate', es: 'Qué preguntar antes de nominar'}},
    {
      t: 'ol',
      items: {
        en: [
          'Are you the authorized agent before the ACP for this call, or are you subcontracting one? If the latter, who is, and who answers for the disbursements?',
          'Since when do you hold the authorization? The operations notice states the date the agency started operating.',
          'Which bank issues your transit guarantees?',
          'Is the AMP licence current? The Canal authorization falls with it.',
          'Which customer code will the booking be tied to, and does it match the party that will pay?',
        ],
        es: [
          '¿Son ustedes el agente autorizado ante la ACP para esta escala, o van a subcontratar a uno? Si es lo segundo, ¿quién es y quién responde por los desembolsos?',
          '¿Desde cuándo tienen la autorización? El aviso de operaciones indica la fecha en que la agencia empezó a operar.',
          '¿Qué banco emite sus garantías de tránsito?',
          '¿Está vigente la licencia de la AMP? La autorización del Canal cae con ella.',
          '¿A qué código de cliente quedará atada la reserva, y coincide con quien va a pagar?',
        ],
      },
    },
    {
      t: 'p',
      text: {
        en: 'Cross World Agency has held the AMP licence and the Canal authorization since 2010, and files its own guarantees. We put the questions above in writing because a principal who asks them of everyone gets better answers from everyone, us included.',
        es: 'Cross World Agency tiene la licencia de la AMP y la autorización del Canal desde 2010, y consigna sus propias garantías. Ponemos por escrito las preguntas de arriba porque un principal que se las hace a todos obtiene mejores respuestas de todos, nosotros incluidos.',
      },
    },
  ],
};
