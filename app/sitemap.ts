import type {MetadataRoute} from 'next';
import {getPathname} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {services} from '@/content/services';
import {site} from '@/content/site';

const staticPaths = ['/', '/services', '/panama-canal-transit-guide', '/ports', '/about', '/certifications', '/compliance', '/contact', '/request-port-call', '/privacy', '/terms'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (href: (typeof staticPaths)[number]) => {
    const urls = Object.fromEntries(routing.locales.map((l) => [l, `${site.url}${getPathname({locale: l as Locale, href})}`]));
    return {url: urls.en, lastModified: now, alternates: {languages: urls}};
  };
  return [
    ...staticPaths.map((p) => entry(p)),
    ...services.map((s) => ({
      url: `${site.url}${getPathname({locale: 'en', href: {pathname: '/services/[slug]', params: {slug: s.slug.en}}})}`,
      lastModified: now,
      alternates: {
        languages: {
          en: `${site.url}${getPathname({locale: 'en', href: {pathname: '/services/[slug]', params: {slug: s.slug.en}}})}`,
          es: `${site.url}${getPathname({locale: 'es', href: {pathname: '/services/[slug]', params: {slug: s.slug.es}}})}`,
        },
      },
    })),
  ];
}
