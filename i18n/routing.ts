import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: false,
  alternateLinks: false,
  pathnames: {
    '/': '/',
    '/services': {en: '/services', es: '/servicios'},
    '/services/[slug]': {en: '/services/[slug]', es: '/servicios/[slug]'},
    '/panama-canal-transit-guide': {en: '/panama-canal-transit-guide', es: '/guia-transito-canal-de-panama'},
    '/ports': {en: '/ports', es: '/puertos'},
    '/ports/[slug]': {en: '/ports/[slug]', es: '/puertos/[slug]'},
    '/about': {en: '/about', es: '/nosotros'},
    '/certifications': {en: '/certifications', es: '/certificaciones'},
    '/compliance': {en: '/compliance', es: '/cumplimiento'},
    '/contact': {en: '/contact', es: '/contacto'},
    '/request-port-call': {en: '/request-port-call', es: '/solicitar-port-call'},
    '/privacy': {en: '/privacy', es: '/privacidad'},
    '/terms': {en: '/terms', es: '/terminos'},
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
