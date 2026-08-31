import {site} from '@/content/site';
import type {Locale} from '@/i18n/routing';

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
    areaServed: ['Panama', 'Caribbean', 'Latin America'],
    knowsLanguage: ['en', 'es'],
    hasCertification: site.certifications.map((c) => ({
      '@type': 'Certification',
      name: c.standard,
      issuedBy: {'@type': 'Organization', name: c.issuer},
    })),
    founder: {
      '@type': 'Person',
      name: site.captain.name,
      jobTitle: 'Captain',
      hasCredential: [{'@type': 'EducationalOccupationalCredential', name: 'ISM Code Internal Auditor'}],
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
