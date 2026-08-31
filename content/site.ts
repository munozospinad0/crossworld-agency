// Datos de la empresa. Lo marcado con `confirm: true` está pendiente de confirmación del cliente
// y se renderiza con el marcador "(to confirm)" hasta que se reemplace.

export const site = {
  name: 'Cross World Agency',
  legalName: 'Cross World Agencies, S.A.',
  ruc: '1675308-1-680680 DV 34',
  imoCompanyNumber: '5785507',
  foundingDate: '2010-03-04',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://crossworldagency.com',
  acpAgencyCode: {value: '', confirm: true},
  address: {
    street: 'RBS Tower, 9th floor, office 902',
    street2: 'Calle Ramón H. Jurado, Paitilla',
    city: 'Panama City',
    country: 'Panama',
    countryCode: 'PA',
  },
  phones: {
    operations: {label: 'Operations 24/7', e164: '+50762664242', display: '+507 6266-4242'},
    office: {label: 'Office', e164: '+5073830128', display: '+507 383-0128'},
    atlantic: {label: 'Atlantic side', e164: '', display: '+507 (to confirm)', confirm: true},
  },
  whatsapp: {e164: process.env.NEXT_PUBLIC_WHATSAPP_DUTY_E164 ?? '', confirm: !process.env.NEXT_PUBLIC_WHATSAPP_DUTY_E164},
  emails: {
    operations: {address: 'gpena@crossworldagency.com', confirm: true},
  },
  timezone: 'America/Panama',
  linkedin: {company: '', captain: '', confirm: true},
  certifications: [
    {standard: 'ISO 9001:2015', name: 'Quality management', scope: 'Management, chartering, administration and operation of ships: general cargo ships, tankers, bulk carriers, tug vessels and barges', issuer: 'AQC Middle East LLC (accredited by IAS, IAF member)', hero: true},
    {standard: 'ISO 14001:2015', name: 'Environmental management', scope: 'Same scope as ISO 9001 (to confirm)', issuer: 'AQC Middle East LLC (accredited by IAS, IAF member)', hero: true},
    {standard: 'ISO 45001:2018', name: 'Occupational health and safety', scope: 'Same scope as ISO 9001 (to confirm)', issuer: 'AQC Middle East LLC (accredited by IAS, IAF member)', hero: true},
    {standard: 'ISO 22000:2018', name: 'Food safety management', scope: 'Food cargo inspections of agricultural origin, bulk food cargo certifier', issuer: 'AQC Middle East LLC (accredited by IAS, IAF member)', hero: false},
  ],
  captain: {
    name: 'Guillermo A. Peña',
    title: {en: 'Captain, Managing Director (to confirm)', es: 'Capitán, Director General (a confirmar)'},
    credentials: [
      'ISM Code Internal Auditor · ABSG Consulting',
      'Seafarers Training Center',
      'Maersk Training Centre',
      'NFPA · Texas Engineering Extension Service',
    ],
  },
  partners: ['Andrew Moore & Associates', 'Sabatino Pizzolante', 'Victoria Corporation', 'EcoGreen', 'White Glacier'],
  representation: ['Panama', 'Venezuela', 'Brazil', 'Aruba', 'Greece'],
} as const;

export function whatsappHref(text?: string) {
  const n = site.whatsapp.e164.replace(/\D/g, '');
  const base = n ? `https://wa.me/${n}` : '#contact';
  return text && n ? `${base}?text=${encodeURIComponent(text)}` : base;
}
