import type {Metadata} from 'next';
import {getPathname} from '@/i18n/navigation';
import {routing, type AppPathname, type Locale} from '@/i18n/routing';
import {site} from '@/content/site';

type Href = AppPathname | {pathname: AppPathname; params: Record<string, string>};

/** Construye canonical + hreflang para una ruta. Si `esHref` es null no se emite hreflang es (sin traducción). */
export function pageMetadata(opts: {
  locale: Locale;
  title: string;
  description: string;
  href: Href;
  esHref?: Href | null;
  noindex?: boolean;
  image?: string;
}): Metadata {
  const {locale, title, description, href, noindex} = opts;
  const enHref = opts.esHref === undefined ? href : href;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const path = (l: Locale, h: Href) => getPathname({locale: l, href: h as any});
  const canonical = `${site.url}${path(locale, href)}`;
  const languages: Record<string, string> = {en: `${site.url}${path('en', enHref)}`, 'x-default': `${site.url}${path('en', enHref)}`};
  if (opts.esHref !== null) languages.es = `${site.url}${path('es', opts.esHref ?? href)}`;
  return {
    title,
    description,
    alternates: {canonical, languages},
    robots: noindex ? {index: false, follow: false} : undefined,
    openGraph: {title, description, url: canonical, images: opts.image ? [{url: opts.image}] : undefined, locale: locale === 'es' ? 'es_PA' : 'en_US'},
  };
}

export const locales = routing.locales;
