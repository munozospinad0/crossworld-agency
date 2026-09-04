// Datos de la empresa. Solo datos reales (perfil del cliente, certificados, material entregado
// y el documento de correcciones del 2-sep-2026).
// Lo marcado con `confirm: true` no se publica como dato: se oculta o se sustituye por el canal de operaciones.

export const site = {
  name: 'Cross World Agency',
  // Correcciones 2-sep-2026, "PARA TODA LA WEB": el nombre de empresa es Cross World Agency.
  legalName: 'Cross World Agency',
  ruc: '1675308-1-680680 DV 34',
  imoCompanyNumber: '5785507',
  foundingDate: '2010-03-04',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://crossworldagency.com',
  acpAgencyCode: {value: '', confirm: true},
  // Dirección oficial (correcciones 2-sep-2026).
  address: {
    street: 'Atrium Tower, Floor 27, Office 27',
    street2: 'Obarrio, 54 Street & Av. Samuel Lewis',
    city: 'Panama City',
    country: 'Rep. of Panama',
    countryCode: 'PA',
  },
  phones: {
    operations: {label: 'Operations 24/7', e164: '+50762664242', display: '+507 6266-4242'},
    office: {label: 'Office', e164: '+5073830128', display: '+507 383-0128'},
    atlantic: {label: 'Atlantic side', e164: '+50762664242', display: '+507 6266-4242'},
  },
  whatsapp: {e164: process.env.NEXT_PUBLIC_WHATSAPP_DUTY_E164 ?? ''},
  emails: {
    operations: {address: 'gpena@crossworldagency.com'},
  },
  timezone: 'America/Panama',
  // El emisor de las certificaciones no se publica (tachado por el cliente, 2-sep-2026).
  certifications: [
    {standard: 'ISO 9001:2015', name: 'Quality management', scope: 'Management, chartering, administration and operation of ships: general cargo ships, tankers, bulk carriers, tug vessels and barges'},
    {standard: 'ISO 14001:2015', name: 'Environmental management', scope: ''},
    {standard: 'ISO 45001:2018', name: 'Occupational health and safety', scope: ''},
    {standard: 'ISO 22000:2018', name: 'Food safety management', scope: 'Food cargo inspections of agricultural origin, bulk food cargo certifier'},
  ],
  captain: {
    name: 'Guillermo A. Peña',
    title: {en: 'Captain', es: 'Capitán'},
    experience: '40+',
    // Credenciales que el cliente autorizó publicar (correcciones 2-sep-2026).
    credentials: [
      'ISM Code Internal Auditor',
      'Seafarers Training Center',
      'NFPA',
      'Texas Engineering Extension Service',
    ],
  },
  // Marca hermana del cliente (aparece en sus propios creativos): inspecciones de yates y embarcaciones menores.
  sisterBrand: {name: 'Cross World Yacht', tagline: 'Marine Surveyors'},
  // Socios y alianzas según el cliente (correcciones 2-sep-2026). Solo se publica el rol documentado.
  partners: [
    {name: 'Global Pandi Panama', role: {en: 'P&I clubs representation alliance', es: 'Alianza para la representación de clubes P&I'}},
    {name: 'Sabatino Pizzolante', role: {en: 'P&I correspondent, Venezuela', es: 'Corresponsal P&I, Venezuela'}},
    {name: 'EcoGreen'},
    {name: 'White Glacier'},
    {name: 'Victory Oil'},
    {name: 'D&N Marine'},
  ] as ReadonlyArray<{name: string; role?: {en: string; es: string}}>,
  representation: [
    {en: 'Panama', es: 'Panamá'},
    {en: 'Venezuela', es: 'Venezuela'},
    {en: 'Brazil', es: 'Brasil'},
    {en: 'Aruba', es: 'Aruba'},
    {en: 'Greece', es: 'Grecia'},
    {en: 'Colombia', es: 'Colombia'},
    {en: 'Curaçao', es: 'Curazao'},
    {en: 'Dominican Republic', es: 'República Dominicana'},
    {en: 'Miami', es: 'Miami'},
  ] as ReadonlyArray<{en: string; es: string}>,
} as const;

/**
 * Canal directo con el oficial de guardia. Si hay número de WhatsApp configurado
 * (NEXT_PUBLIC_WHATSAPP_DUTY_E164) el botón abre WhatsApp; si no, marca el teléfono de
 * operaciones. Nunca queda un botón muerto ni un "(a confirmar)" a la vista del visitante.
 */
export function dutyChannel(): {href: string; label: 'whatsapp' | 'call'} {
  const n = site.whatsapp.e164.replace(/\D/g, '');
  return n
    ? {href: `https://wa.me/${n}`, label: 'whatsapp'}
    : {href: `tel:${site.phones.operations.e164}`, label: 'call'};
}
