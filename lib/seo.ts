import type {Metadata} from 'next';
import {getPathname} from '@/i18n/navigation';
import {routing, type AppPathname, type Locale} from '@/i18n/routing';
import {site} from '@/content/site';

type Href = AppPathname | {pathname: AppPathname; params: Record<string, string>};

/**
 * Canonical + hreflang de una ruta.
 *
 * En las rutas con slug traducido (`/services/[slug]`, `/ports/[slug]`, `/insights/[slug]`) el
 * `href` que llega trae el slug del idioma que se está renderizando. Para armar la URL del OTRO
 * idioma hace falta su slug, no vale reutilizar el mismo: por eso `enHref` y `esHref` son
 * explícitos. Hasta el 8-sep-2026 la línea que elegía `enHref` tenía las dos ramas del ternario
 * iguales, así que las nueve páginas en español declaraban `hreflang="en"` y `x-default`
 * apuntando a URLs con slug español que no existen (404). Nadie lo veía desde el navegador.
 *
 * `esHref: null` = esta ruta no tiene versión en español y no se emite su hreflang.
 */
export function pageMetadata(opts: {
  locale: Locale;
  title: string;
  description: string;
  href: Href;
  /** Href con el slug en inglés. Obligatorio en rutas con slug traducido. */
  enHref?: Href;
  esHref?: Href | null;
  noindex?: boolean;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const {locale, title, description, href, noindex} = opts;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const path = (l: Locale, h: Href) => getPathname({locale: l, href: h as any});
  const enHref = opts.enHref ?? (locale === 'en' ? href : (opts.esHref ?? href));
  const canonical = `${site.url}${path(locale, href)}`;
  const enUrl = `${site.url}${path('en', enHref)}`;
  const languages: Record<string, string> = {en: enUrl, 'x-default': enUrl};
  if (opts.esHref !== null) languages.es = `${site.url}${path('es', opts.esHref ?? href)}`;
  return {
    title,
    description,
    alternates: {canonical, languages},
    robots: noindex ? {index: false, follow: false} : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: opts.image ? [{url: `${site.url}${opts.image}`, width: 1200, height: 675, alt: opts.imageAlt ?? title}] : undefined,
      locale: locale === 'es' ? 'es_PA' : 'en_US',
    },
    twitter: {card: 'summary_large_image', title, description, images: opts.image ? [`${site.url}${opts.image}`] : undefined},
  };
}

export const locales = routing.locales;
