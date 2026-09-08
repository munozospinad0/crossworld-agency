import type {Article} from '@/content/articles';

/**
 * Artículo pilar sobre el sistema de reserva de tránsitos.
 *
 * Por qué este tema primero: de todo el keyword research, `panama canal booking` es la única
 * consulta con competencia ALTA, es decir, la que tiene intención comercial de verdad. Y es
 * el único bloque grande que se puede escribir hoy sin inventar una sola cifra, porque el
 * aviso completo está archivado en `research/acp-n07-2026-booking.txt`.
 *
 * TODAS las cifras salen del OP Notice N-7-2026 de la ACP. No se publica ningún peaje: el
 * tarifario no está verificado y el cliente prohibió publicar uno propio.
 */
export const panamaCanalBooking: Article = {
  key: 'booking',
  slug: {en: 'panama-canal-transit-booking', es: 'reserva-de-transito-canal-de-panama'},
  title: {
    en: 'Panama Canal booking: what a slot costs, when to ask for it, and what a missed one costs',
    es: 'Reserva de tránsito por el Canal de Panamá: qué cuesta un cupo, cuándo pedirlo y qué cuesta perderlo',
  },
  metaTitle: {en: 'Panama Canal Booking: Fees and Periods', es: 'Reserva de tránsito del Canal de Panamá'},
  metaDescription: {
    en: 'What a Panama Canal booking slot costs, when to request it, and what arriving late or cancelling costs. Figures from ACP Notice N-7-2026.',
    es: 'Qué cuesta un cupo de reserva en el Canal de Panamá, cuándo pedirlo y qué cuesta llegar tarde o cancelar. Cifras del aviso N-7-2026 de la ACP.',
  },
  standfirst: {
    en: 'A Panama Canal booking slot costs USD 12,000, 50,000 or 100,000, set by the vessel’s beam and length rather than by what it carries. Requests open 90 days before transit and the last window closes two days out. Arrive more than two hours after your required time and the whole fee is charged.',
    es: 'Un cupo de reserva en el Canal de Panamá cuesta 12.000, 50.000 o 100.000 dólares, según la manga y la eslora del buque, no según lo que transporte. Las solicitudes abren 90 días antes del tránsito y la última ventana cierra dos días antes. Si el buque llega más de dos horas tarde, la tasa se cobra completa.',
  },
  published: '2026-09-08',
  updated: '2026-09-08',
  readingMinutes: 9,
  image: '/images/canal-transit.jpg',
  imageAlt: {
    en: 'Vessel entering the locks of the Panama Canal, seen from the deck',
    es: 'Buque entrando a las esclusas del Canal de Panamá, visto desde cubierta',
  },
  topic: {en: 'Canal booking', es: 'Reservas del Canal'},
  reviewedByCaptain: false,
  sources: [
    {
      label: {
        en: 'Panama Canal Authority, Advisory to Shipping N-7-2026, “Panama Canal Transit Reservation System”, in force 1 January 2026 (cancels N-7-2025).',
        es: 'Autoridad del Canal de Panamá, Aviso a la Navegación N-7-2026, «Panama Canal Transit Reservation System», vigente desde el 1 de enero de 2026 (cancela el N-7-2025).',
      },
      url: 'https://pancanal.com/en/advisories-to-shipping/',
    },
    {
      label: {
        en: 'Panama Canal Authority, vessel ETA and transit booking service (slot availability and customer ranking).',
        es: 'Autoridad del Canal de Panamá, servicio de ETA y reserva de tránsito (disponibilidad de cupos y ranking de clientes).',
      },
      url: 'https://pancanal.com/en/maritime-services/vessel-eta-and-transit-booking/',
    },
  ],
  related: [
    {
      href: '/panama-canal-transit-guide',
      label: {en: 'How a Panama Canal transit works, end to end', es: 'Cómo funciona un tránsito por el Canal de Panamá, de principio a fin'},
    },
    {
      href: {pathname: '/services/[slug]', params: {slug: 'ship-agency-panama-canal-transit'}},
      label: {en: 'Ship agency and Canal transit services', es: 'Agencia naviera y servicios de tránsito del Canal'},
    },
    {
      href: {pathname: '/ports/[slug]', params: {slug: 'balboa'}},
      label: {en: 'Port of Balboa, the Pacific end of the Canal', es: 'Puerto de Balboa, el extremo Pacífico del Canal'},
    },
    {
      href: {pathname: '/ports/[slug]', params: {slug: 'cristobal'}},
      label: {en: 'Port of Cristóbal, the Atlantic end of the Canal', es: 'Puerto de Cristóbal, el extremo Atlántico del Canal'},
    },
    {
      href: '/compare-your-fda',
      label: {en: 'Send us your last Panama FDA and we review it line by line', es: 'Envíenos su última FDA de Panamá y la revisamos línea por línea'},
    },
  ],
  body: [
    {
      t: 'p',
      text: {
        en: 'Every week we take a call that starts the same way: the charterer wants to know why the transit is going to cost more than the last one, and nobody has told them that the booking slot is a separate line with its own rules, its own clock and its own penalties. This is that line, explained end to end.',
        es: 'Cada semana recibimos una llamada que empieza igual: el fletador quiere saber por qué el tránsito va a costar más que el anterior, y nadie le ha explicado que el cupo de reserva es una línea aparte, con sus propias reglas, su propio reloj y sus propias penalidades. Esta es esa línea, explicada de principio a fin.',
      },
    },
    {
      t: 'note',
      text: {
        en: 'Every figure below comes from the Panama Canal Authority’s Advisory to Shipping N-7-2026, in force since 1 January 2026. Tolls are a different charge with a different tariff and are not covered here. Advisories change: check the current one before you commit money.',
        es: 'Todas las cifras de abajo salen del Aviso a la Navegación N-7-2026 de la Autoridad del Canal de Panamá, vigente desde el 1 de enero de 2026. Los peajes son un cargo distinto, con su propio tarifario, y no se tratan aquí. Los avisos cambian: consulte el vigente antes de comprometer dinero.',
      },
    },

    {t: 'h2', id: 'what', text: {en: 'What is the Panama Canal booking system?', es: '¿Qué es el sistema de reserva del Canal de Panamá?'}},
    {
      t: 'p',
      text: {
        en: 'The booking system is how the Canal sells a guaranteed transit date. Without a slot, a vessel arrives and waits its turn among the vessels that did not book; with one, it has a date and a required arrival time it must meet. The slot is paid on top of the toll, and the price does not depend on the cargo or on how long the vessel waits. It depends on two measurements: beam and length overall.',
        es: 'El sistema de reserva es la forma en que el Canal vende una fecha de tránsito garantizada. Sin cupo, el buque llega y espera su turno entre los que no reservaron; con cupo, tiene una fecha y una hora de arribo que debe cumplir. El cupo se paga además del peaje, y su precio no depende de la carga ni del tiempo que el buque espere. Depende de dos medidas: la manga y la eslora total.',
      },
    },
    {
      t: 'answer',
      q: {en: 'Is a booking slot the same as the toll?', es: '¿El cupo de reserva es lo mismo que el peaje?'},
      a: {
        en: 'No. The toll is charged to every vessel that transits, calculated from the vessel’s type and capacity under the Canal tariff. The booking fee buys a guaranteed date and is charged whether or not the vessel ends up using it. A vessel can transit without booking; it simply takes its chances on the queue.',
        es: 'No. El peaje se cobra a todo buque que transita y se calcula por tipo y capacidad según el tarifario del Canal. La tasa de reserva compra una fecha garantizada y se cobra use o no el buque ese cupo. Un buque puede transitar sin reservar; simplemente se arriesga a la cola.',
      },
    },

    {t: 'h2', id: 'fees', text: {en: 'How much does a booking slot cost?', es: '¿Cuánto cuesta un cupo de reserva?'}},
    {
      t: 'p',
      text: {
        en: 'Three prices, set by the locks the vessel uses and by its dimensions. The jump from one bracket to the next is large, and it is decided by centimetres of beam, so it is worth checking which side of the line your vessel falls on before quoting anything to a principal.',
        es: 'Tres precios, según las esclusas que use el buque y sus dimensiones. El salto de un tramo al siguiente es grande y lo deciden centímetros de manga, así que conviene comprobar de qué lado de la raya cae el buque antes de cotizarle nada a un principal.',
      },
    },
    {
      t: 'table',
      caption: {
        en: 'Booking fee by vessel category, ACP Notice N-7-2026.',
        es: 'Tasa de reserva por categoría de buque, aviso N-7-2026 de la ACP.',
      },
      head: {
        en: ['Category', 'Locks', 'Definition', 'Booking fee'],
        es: ['Categoría', 'Esclusas', 'Definición', 'Tasa de reserva'],
      },
      rows: {
        en: [
          ['Regulars', 'Panamax', 'Beam under 27.74 m (91 ft)', 'USD 12,000'],
          ['Supers', 'Panamax', 'Beam 27.74–32.61 m (91–107 ft), LOA up to 294.44 m (966 ft)', 'USD 50,000'],
          ['Neopanamax', 'Neopanamax', 'Beam over 32.61 m (107 ft) or LOA over 294.44 m (966 ft)', 'USD 100,000'],
        ],
        es: [
          ['Regulares', 'Panamax', 'Manga menor a 27,74 m (91 pies)', '12.000 USD'],
          ['Supers', 'Panamax', 'Manga de 27,74 a 32,61 m (91–107 pies), eslora hasta 294,44 m (966 pies)', '50.000 USD'],
          ['Neopanamax', 'Neopanamax', 'Manga mayor a 32,61 m (107 pies) o eslora mayor a 294,44 m (966 pies)', '100.000 USD'],
        ],
      },
    },
    {
      t: 'p',
      text: {
        en: 'A vessel that exceeds the Panamax limits but is approved to use the Panamax locks pays the Supers fee. Daylight transit, when it is required or requested, is a separate charge of USD 30,000.',
        es: 'Un buque que excede los límites Panamax pero que es aprobado para usar las esclusas Panamax paga la tasa de Supers. El tránsito diurno, cuando se exige o se solicita, es un cargo aparte de 30.000 USD.',
      },
    },

    {t: 'h2', id: 'periods', text: {en: 'When can a slot be requested?', es: '¿Cuándo se puede pedir un cupo?'}},
    {
      t: 'p',
      text: {
        en: 'Slots are released in periods, and each period has its own rules about who may ask and how many are available. The practical takeaway for an operator: the Neopanamax fleet has no slots at all in the first period, and everybody’s last chance is the third period, which closes at 1500 two days before the transit date.',
        es: 'Los cupos se liberan por periodos, y cada periodo tiene sus reglas sobre quién puede pedir y cuántos hay. Lo práctico para un operador: la flota Neopanamax no tiene cupos en el primer periodo, y la última oportunidad para todos es el tercer periodo, que cierra a las 1500 horas dos días antes de la fecha de tránsito.',
      },
    },
    {
      t: 'table',
      caption: {
        en: 'Booking periods and windows, ACP Notice N-7-2026.',
        es: 'Periodos y ventanas de reserva, aviso N-7-2026 de la ACP.',
      },
      head: {en: ['Period', 'Window before transit', 'Notes'], es: ['Periodo', 'Ventana antes del tránsito', 'Notas']},
      rows: {
        en: [
          ['Special (commercial passenger)', '730 to 366 days', 'Passenger vessels only'],
          ['First period, Panamax locks', '90 to 15 days', 'Regulars and Supers'],
          ['First period, Neopanamax locks', '90 to 31 days', 'No slots are offered in this period'],
          ['Period 1A, Neopanamax only', '30 to 15 days', 'Up to 3 slots per day; competition runs 0900–0930; full container vessels have priority'],
          ['Second period', '14 to 8 days', 'Neopanamax up to 2 slots, including the conditioned slot'],
          ['Third period', '7 to 2 days', 'Closes at 1500, including weekends and holidays'],
        ],
        es: [
          ['Especial (pasaje comercial)', '730 a 366 días', 'Solo buques de pasaje'],
          ['Primer periodo, esclusas Panamax', '90 a 15 días', 'Regulares y Supers'],
          ['Primer periodo, esclusas Neopanamax', '90 a 31 días', 'No se ofrecen cupos en este periodo'],
          ['Periodo 1A, solo Neopanamax', '30 a 15 días', 'Hasta 3 cupos por día; la competencia corre de 0900 a 0930; prioridad para portacontenedores llenos'],
          ['Segundo periodo', '14 a 8 días', 'Neopanamax hasta 2 cupos, incluido el cupo condicionado'],
          ['Tercer periodo', '7 a 2 días', 'Cierra a las 1500 horas, incluidos fines de semana y feriados'],
        ],
      },
    },
    {
      t: 'p',
      text: {
        en: 'Slots that go unused roll into the following period, which is why availability sometimes appears where a planner did not expect it. Swaps between vessels are allowed from 365 down to 91 days before any reserved date, even when no booking period is open.',
        es: 'Los cupos que no se usan pasan al periodo siguiente, y por eso a veces aparece disponibilidad donde un planificador no la esperaba. Los intercambios entre buques se permiten desde 365 hasta 91 días antes de cualquier fecha reservada, incluso cuando no hay ningún periodo abierto.',
      },
    },

    {t: 'h2', id: 'arrival', text: {en: 'What time does the vessel have to arrive?', es: '¿A qué hora tiene que llegar el buque?'}},
    {
      t: 'p',
      text: {
        en: 'A slot comes with a required arrival time, and this is where most of the money is lost. The time depends on the category, and for the largest vessels it falls on the evening *before* the reserved date, not on the date itself.',
        es: 'Un cupo viene con una hora de arribo exigida, y es aquí donde se pierde la mayor parte del dinero. La hora depende de la categoría y, para los buques más grandes, cae la noche *anterior* a la fecha reservada, no el día de la fecha.',
      },
    },
    {
      t: 'table',
      caption: {en: 'Required arrival times, ACP Notice N-7-2026.', es: 'Horas de arribo exigidas, aviso N-7-2026 de la ACP.'},
      head: {en: ['Vessel category', 'Required arrival'], es: ['Categoría de buque', 'Arribo exigido']},
      rows: {
        en: [
          ['Neopanamax and Panamax Plus', '2200 the day before the reserved date'],
          ['Neopanamax LNG carriers', '0200 on the reserved date'],
          ['Supers and restricted regulars', '0200 on the reserved date'],
          ['Regulars without restrictions', '1400 on the transit date'],
          ['JIT slots', 'The time confirmed by the Authority'],
          ['Commercial passenger vessels', 'Exempt if they arrive in time to keep their itinerary'],
        ],
        es: [
          ['Neopanamax y Panamax Plus', '2200 del día anterior a la fecha reservada'],
          ['Gaseros LNG Neopanamax', '0200 de la fecha reservada'],
          ['Supers y regulares con restricciones', '0200 de la fecha reservada'],
          ['Regulares sin restricciones', '1400 del día de tránsito'],
          ['Cupos JIT', 'La hora que confirme la Autoridad'],
          ['Buques de pasaje comercial', 'Exentos si llegan a tiempo para mantener su itinerario'],
        ],
      },
    },
    {
      t: 'answer',
      q: {en: 'What counts as “arrived” for the Canal?', es: '¿Qué cuenta como «arribado» para el Canal?'},
      a: {
        en: 'Radio contact with an ACP signal station plus visual sighting, or radar identification by the ACP within 8 nautical miles (13.6 km) of the sea buoy on the Pacific side or of the breakwater entrance on the Atlantic side. For southbound vessels leaving Manzanillo Bay ports, it is contact with the Cristóbal Signal Station on passing the East Breakwater entrance. Being close is not the same as having arrived.',
        es: 'Contacto por radio con una estación de señales de la ACP más avistamiento visual, o identificación por radar de la ACP dentro de 8 millas náuticas (13,6 km) de la boya de mar en el lado Pacífico o de la entrada del rompeolas en el lado Atlántico. Para buques al sur que salen de los puertos de Bahía de Manzanillo, es el contacto con la Estación de Señales de Cristóbal al pasar la entrada del East Breakwater. Estar cerca no es lo mismo que haber arribado.',
      },
    },

    {t: 'h2', id: 'late', text: {en: 'What happens if the vessel arrives late?', es: '¿Qué pasa si el buque llega tarde?'}},
    {
      t: 'p',
      text: {
        en: 'The late charge is a percentage of the booking fee, and it climbs fast. On a Neopanamax slot, two hours and one minute of delay is a USD 100,000 charge.',
        es: 'El recargo por demora es un porcentaje de la tasa de reserva y sube rápido. En un cupo Neopanamax, dos horas y un minuto de atraso son 100.000 dólares.',
      },
    },
    {
      t: 'table',
      caption: {en: 'Late arrival charges as a share of the booking fee.', es: 'Recargos por arribo tardío como porcentaje de la tasa de reserva.'},
      head: {en: ['Delay after the required time', 'Charge'], es: ['Demora sobre la hora exigida', 'Recargo']},
      rows: {
        en: [['Up to 1 hour', '25%'], ['Over 1 and up to 2 hours', '50%'], ['Over 2 hours', '100%'], ['JIT slots', '50%']],
        es: [['Hasta 1 hora', '25%'], ['Más de 1 y hasta 2 horas', '50%'], ['Más de 2 horas', '100%'], ['Cupos JIT', '50%']],
      },
    },

    {t: 'h2', id: 'cancel', text: {en: 'And if the slot has to be cancelled or moved?', es: '¿Y si hay que cancelar o mover el cupo?'}},
    {
      t: 'p',
      text: {
        en: 'Cancelling is charged on a sliding scale against the required arrival time, and substituting one vessel for another is treated more kindly than cancelling outright. Inside 96 hours the whole fee is due, and a high-demand surcharge can be added on top of the ordinary cancellation charge.',
        es: 'Cancelar se cobra en una escala móvil contra la hora de arribo exigida, y sustituir un buque por otro se trata mejor que cancelar sin más. Dentro de las 96 horas se debe la tasa completa, y puede sumarse un recargo por alta demanda además del cargo ordinario de cancelación.',
      },
    },
    {
      t: 'table',
      caption: {en: 'Cancellation and substitution charges as a share of the booking fee.', es: 'Cargos por cancelación y sustitución como porcentaje de la tasa de reserva.'},
      head: {en: ['Time before required arrival', 'Cancellation', 'Substitution'], es: ['Tiempo antes del arribo exigido', 'Cancelación', 'Sustitución']},
      rows: {
        en: [
          ['More than 90 days', '50%', 'USD 500 admin fee (over 30 days)'],
          ['21 to 90 days', '60%', '20% (14–30 days)'],
          ['7 to 21 days', '70%', '40% (7–14 days)'],
          ['4 to 7 days', '80%', '60%'],
          ['Under 4 days (96 hours)', '100%', '80%'],
        ],
        es: [
          ['Más de 90 días', '50%', '500 USD de cargo administrativo (más de 30 días)'],
          ['21 a 90 días', '60%', '20% (14–30 días)'],
          ['7 a 21 días', '70%', '40% (7–14 días)'],
          ['4 a 7 días', '80%', '60%'],
          ['Menos de 4 días (96 horas)', '100%', '80%'],
        ],
      },
    },
    {
      t: 'p',
      text: {
        en: 'Daylight transits and regular passenger vessels run on their own scale, which is tighter at the end: 40% from 21 to 60 days, 60% from 72 hours to 21 days, 80% from 36 to 72 hours, and 100% inside 36 hours.',
        es: 'Los tránsitos diurnos y los buques de pasaje regulares corren en su propia escala, más estrecha al final: 40% de 21 a 60 días, 60% de 72 horas a 21 días, 80% de 36 a 72 horas y 100% dentro de las 36 horas.',
      },
    },

    {t: 'h2', id: 'auction', text: {en: 'How does the Canal auction work?', es: '¿Cómo funciona la subasta del Canal?'}},
    {
      t: 'p',
      text: {
        en: 'Auctions are not a parallel market open all the time. Slots are auctioned only in the third period, plus the Neopanamax conditioned slot the day after the second-period tie-break. The minimum bid increment is USD 1,000, and every increment must be a multiple of USD 1,000. Slots that are not awarded can be re-offered four days ahead, and opened to other categories three days ahead.',
        es: 'Las subastas no son un mercado paralelo abierto todo el tiempo. Solo se subastan cupos en el tercer periodo, más el cupo condicionado Neopanamax el día siguiente al desempate del segundo periodo. El incremento mínimo de puja es de 1.000 dólares, y todo incremento debe ser múltiplo de 1.000. Los cupos que no se adjudican pueden reofertarse cuatro días antes, y abrirse a otras categorías tres días antes.',
      },
    },
    {
      t: 'answer',
      q: {en: 'Is bidding worth it?', es: '¿Vale la pena pujar?'},
      a: {
        en: 'It depends entirely on what a day of waiting costs the vessel, and that is a charter-party question, not a Canal one. What the notice fixes is the mechanism: third period only, USD 1,000 steps. What it does not fix is the price, which is whatever the fleet is willing to pay that week. Decide your ceiling before the window opens, not during it.',
        es: 'Depende por completo de lo que le cueste al buque un día de espera, y eso es una pregunta de póliza de fletamento, no del Canal. Lo que el aviso fija es el mecanismo: solo el tercer periodo, pasos de 1.000 dólares. Lo que no fija es el precio, que es lo que la flota esté dispuesta a pagar esa semana. Defina su techo antes de que abra la ventana, no durante.',
      },
    },

    {t: 'h2', id: 'jit', text: {en: 'What is a JIT slot, and when is it worth asking for?', es: '¿Qué es un cupo JIT y cuándo conviene pedirlo?'}},
    {
      t: 'p',
      text: {
        en: 'Just-in-Time slots let a vessel arrive at a confirmed time instead of holding at anchor. They are scarce by design: a maximum of four per day for supers, of which no more than two in the same direction; two per day for regulars without restrictions, one per direction; and one per direction in the Neopanamax locks.',
        es: 'Los cupos Just-in-Time permiten que un buque llegue a una hora confirmada en vez de esperar fondeado. Son escasos por diseño: máximo cuatro al día para supers, de los cuales no más de dos en la misma dirección; dos al día para regulares sin restricciones, uno por dirección; y uno por dirección en las esclusas Neopanamax.',
      },
    },
    {
      t: 'ul',
      items: {
        en: [
          'Requests run between 10 days and 96 hours before the reserved date for slots obtained in the first and second periods.',
          'For a slot obtained in the third period, the request must be in no later than 1400, three days before.',
          'A JIT cancelled after 1100 on the third period’s closing day is not reassigned.',
          'The Authority can reduce or suspend JIT slots.',
        ],
        es: [
          'Las solicitudes van entre 10 días y 96 horas antes de la fecha reservada para cupos obtenidos en el primer y segundo periodo.',
          'Para un cupo obtenido en el tercer periodo, la solicitud debe entrar a más tardar a las 1400 horas, tres días antes.',
          'Un JIT cancelado después de las 1100 horas del día de cierre del tercer periodo no se reasigna.',
          'La Autoridad puede reducir o suspender los cupos JIT.',
        ],
      },
    },

    {t: 'h2', id: 'netzero', text: {en: 'What is the NetZero slot?', es: '¿Qué es el cupo NetZero?'}},
    {
      t: 'p',
      text: {
        en: 'One slot a week from Period 1A is set aside for the NetZero initiative, competed for between 0800 and 0830 on the day Period 1A opens, for the following Sunday. It is the only slot in the system that carries a guaranteed transit time.',
        es: 'Un cupo por semana del Periodo 1A se reserva para la iniciativa NetZero, y se compite entre las 0800 y las 0830 del día en que abre el Periodo 1A, para el domingo siguiente. Es el único cupo del sistema que trae un tiempo de tránsito garantizado.',
      },
    },
    {
      t: 'ul',
      items: {
        en: [
          'Choice of transit date within the week offered.',
          'Guaranteed 24-hour time in transit.',
          'JIT service included.',
          'Swaps and substitutions allowed between vessels with the same characteristics.',
        ],
        es: [
          'Elección de la fecha de tránsito dentro de la semana ofrecida.',
          'Tiempo en tránsito garantizado de 24 horas.',
          'Servicio JIT incluido.',
          'Intercambios y sustituciones permitidos entre buques con las mismas características.',
        ],
      },
    },

    {t: 'h2', id: 'mistakes', text: {en: 'The mistakes we see most often', es: 'Los errores que más vemos'}},
    {
      t: 'ol',
      items: {
        en: [
          'Reading the required arrival time as a date rather than an hour. For a Neopanamax it is 2200 the night before, and a vessel that plans to arrive “on the day” is already late.',
          'Measuring beam from memory. The gap between USD 50,000 and USD 100,000 is decided at 32.61 m, and a wrong assumption changes the whole disbursement estimate.',
          'Treating the 8-mile line as a formality. Arrival is a position confirmed by the Canal, not an ETA reported by the vessel.',
          'Cancelling at 95 hours. One hour earlier is the difference between 80% and 100% of the fee, plus the possible high-demand surcharge.',
          'Leaving the ETA notification late. The Canal expects it at least 96 hours before arrival, and a customer code is required for every vessel except yachts and government vessels.',
        ],
        es: [
          'Leer la hora de arribo exigida como una fecha y no como una hora. Para un Neopanamax son las 2200 de la noche anterior, y un buque que planea llegar «el día de» ya llega tarde.',
          'Medir la manga de memoria. La diferencia entre 50.000 y 100.000 dólares se decide en 32,61 m, y un supuesto equivocado cambia toda la estimación de desembolsos.',
          'Tratar la línea de las 8 millas como una formalidad. El arribo es una posición confirmada por el Canal, no un ETA reportado por el buque.',
          'Cancelar a las 95 horas. Una hora antes es la diferencia entre el 80% y el 100% de la tasa, más el posible recargo por alta demanda.',
          'Dejar tarde la notificación de ETA. El Canal la espera al menos 96 horas antes del arribo, y se exige un código de cliente para todo buque salvo yates y buques de gobierno.',
        ],
      },
    },
    {
      t: 'p',
      text: {
        en: 'None of this is exotic. It is a calendar and a set of thresholds, and it goes wrong when nobody owns it. That is the part of the job an agent is for: the slot requested in the right period, the arrival time watched against the vessel’s real speed, and the call made early enough that a cancellation costs 60% instead of 100%.',
        es: 'Nada de esto es exótico. Es un calendario y un conjunto de umbrales, y sale mal cuando nadie se hace cargo. Esa es la parte del trabajo para la que está un agente: el cupo pedido en el periodo correcto, la hora de arribo vigilada contra la velocidad real del buque, y la decisión tomada con tiempo suficiente para que una cancelación cueste 60% y no 100%.',
      },
    },
  ],
};
