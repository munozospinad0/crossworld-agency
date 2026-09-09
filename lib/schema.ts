import {site} from '@/content/site';
import type {Locale} from '@/i18n/routing';

/**
 * Entidades de Wikidata verificadas contra su API (no inventadas: un identificador equivocado
 * es peor que ninguno). Sirven para que un buscador o un asistente sepa de qué habla la página
 * en lugar de deducirlo del texto: es la diferencia entre "Balboa" el puerto de Panamá y
 * cualquier otro Balboa del mundo.
 */
export const WD = {
  panamaCanal: 'https://www.wikidata.org/wiki/Q7350',
  canalAuthority: 'https://www.wikidata.org/wiki/Q2048917',
  maritimeAuthority: 'https://www.wikidata.org/wiki/Q118958482',
  balboa: 'https://www.wikidata.org/wiki/Q2078026',
  marineSurveyor: 'https://www.wikidata.org/wiki/Q4448548',
  panama: 'https://www.wikidata.org/wiki/Q804',
  panamaCity: 'https://www.wikidata.org/wiki/Q3306',
} as const;

const DESCRIPTION: Record<Locale, string> = {
  en: 'Ship agency, marine surveyors and Panama Canal transit agent based in Panama City. Licensed by the Panama Maritime Authority and authorized by the Panama Canal Authority since 2010, working both ends of the Canal at Balboa and Cristóbal.',
  es: 'Agencia naviera, marine surveyors y agente de tránsito del Canal de Panamá con sede en Ciudad de Panamá. Con licencia de la Autoridad Marítima de Panamá y autorización de la Autoridad del Canal desde 2010, trabajando ambos extremos del Canal en Balboa y Cristóbal.',
};

/** Materias sobre las que la organización tiene experiencia demostrable en el sitio. */
const KNOWS_ABOUT: Record<Locale, string[]> = {
  en: ['Panama Canal transit', 'Ship agency', 'Marine surveying', 'Draft surveys', 'Bunker surveys and tank gauging', 'Marine fuel supply', 'Ship-to-ship transfers', 'Marine accident investigation', 'ISM and ISPS audits', 'Port calls at Balboa and Cristóbal'],
  es: ['Tránsito por el Canal de Panamá', 'Agencia naviera', 'Inspecciones marítimas', 'Inspecciones de calado', 'Medición de tanques e inspecciones de bunker', 'Suministro de combustible marino', 'Transferencias ship-to-ship', 'Investigación de accidentes marítimos', 'Auditorías ISM e ISPS', 'Escalas en Balboa y Cristóbal'],
};

export function organizationJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${site.url}/#org`,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/${locale}`,
    logo: `${site.url}/images/logo.png`,
    foundingDate: site.foundingDate,
    taxID: site.ruc,
    identifier: {'@type': 'PropertyValue', propertyID: 'IMO company number', value: site.imoCompanyNumber},
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.street}, ${site.address.street2}`,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
    telephone: site.phones.operations.e164,
    email: site.emails.operations.address,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    description: DESCRIPTION[locale],
    areaServed: [
      {'@type': 'Country', name: 'Panama', sameAs: WD.panama},
      {'@type': 'Place', name: 'Panama Canal', sameAs: WD.panamaCanal},
      'Caribbean',
      'Latin America',
    ],
    knowsAbout: KNOWS_ABOUT[locale],
    knowsLanguage: ['en', 'es'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: locale === 'es' ? 'Oficial de guardia' : 'Duty officer',
        telephone: site.phones.operations.e164,
        email: site.emails.operations.address,
        availableLanguage: ['en', 'es'],
        hoursAvailable: {'@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59'},
      },
      {
        '@type': 'ContactPoint',
        contactType: locale === 'es' ? 'Oficina' : 'Office',
        telephone: site.phones.office.e164,
        availableLanguage: ['en', 'es'],
      },
    ],
    hasCertification: site.certifications.map((c) => ({
      '@type': 'Certification',
      name: c.standard,
      ...(c.scope ? {description: c.scope} : {}),
    })),
    founder: {
      '@type': 'Person',
      name: site.captain.name,
      jobTitle: 'Captain',
      knowsAbout: KNOWS_ABOUT[locale].slice(0, 5),
      hasCredential: site.captain.credentials.map((name) => ({'@type': 'EducationalOccupationalCredential', name})),
    },
  };
}

export function serviceJsonLd(locale: Locale, s: {h1: string; description: string; url: string; requestUrl: string}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.h1,
    description: s.description,
    url: s.url,
    serviceType: s.h1,
    provider: {'@id': `${site.url}/#org`},
    areaServed: ['Panama'],
    availableChannel: {'@type': 'ServiceChannel', serviceUrl: s.requestUrl, availableLanguage: ['en', 'es']},
    inLanguage: locale,
  };
}

export function breadcrumbJsonLd(items: {name: string; url: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({'@type': 'ListItem', position: i + 1, name: it.name, item: it.url})),
  };
}
