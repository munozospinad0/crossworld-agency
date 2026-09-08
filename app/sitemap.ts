import type {MetadataRoute} from 'next';
import {getPathname} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {services} from '@/content/services';
import {ports} from '@/content/ports';
import {articlesByDate} from '@/content/articles';
import {site} from '@/content/site';

// Toda ruta indexable va aquí. Las fichas de puerto y la comparación de FDA quedaron fuera
// hasta el 8-sep-2026 pese a existir y responder 200: eran páginas invisibles para Google.
// `/request-port-call` no va: la página se sirve con `noindex`, y pedir que la rastreen para
// después decirle a Google que no la indexe es una contradicción que gasta presupuesto de rastreo.
const staticPaths = ['/', '/services', '/panama-canal-transit-guide', '/ports', '/insights', '/compare-your-fda', '/about', '/certifications', '/compliance', '/contact', '/privacy', '/terms'] as const;

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
    ...articlesByDate().map((a) => ({
      url: `${site.url}${getPathname({locale: 'en', href: {pathname: '/insights/[slug]', params: {slug: a.slug.en}}})}`,
      // Fecha real del contenido, no la del build: un lastmod que cambia solo porque se
      // desplegó el sitio deja de ser una señal y Google aprende a ignorarlo.
      lastModified: new Date(a.updated),
      alternates: {
        languages: {
          en: `${site.url}${getPathname({locale: 'en', href: {pathname: '/insights/[slug]', params: {slug: a.slug.en}}})}`,
          es: `${site.url}${getPathname({locale: 'es', href: {pathname: '/insights/[slug]', params: {slug: a.slug.es}}})}`,
        },
      },
    })),
    ...ports.map((p) => ({
      url: `${site.url}${getPathname({locale: 'en', href: {pathname: '/ports/[slug]', params: {slug: p.slug.en}}})}`,
      lastModified: now,
      alternates: {
        languages: {
          en: `${site.url}${getPathname({locale: 'en', href: {pathname: '/ports/[slug]', params: {slug: p.slug.en}}})}`,
          es: `${site.url}${getPathname({locale: 'es', href: {pathname: '/ports/[slug]', params: {slug: p.slug.es}}})}`,
        },
      },
    })),
  ];
}
