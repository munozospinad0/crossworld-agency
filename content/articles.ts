import type {Locale} from '@/i18n/routing';
import {panamaCanalBooking} from '@/content/insights/panama-canal-booking';
import {authorizedShippingAgent} from '@/content/insights/authorized-shipping-agent';

/**
 * Análisis firmados por el capitán. El sitio no tiene CRM ni correo conectados: el orgánico es
 * el canal, así que estos artículos son la principal vía de captación.
 *
 * Cómo está pensado el formato (y por qué):
 * - `standfirst` responde la pregunta del título en 40-60 palabras. Es el bloque que los
 *   asistentes de IA suelen citar textualmente, y lo que Google usa para el fragmento.
 * - Los `h2` van en forma de pregunta: coinciden con cómo se busca y con cómo se pregunta a un chat.
 * - `answer` produce un bloque pregunta/respuesta autocontenido, legible fuera de contexto.
 * - `table` existe porque los datos comparables se citan mucho más que el mismo dato en prosa.
 * - `sources` obliga a que cada cifra tenga origen verificable. Regla del cliente: nada inventado.
 *
 * No se usa FAQPage en los datos estructurados: Google lo restringió a sitios de gobierno y salud.
 * El formato de preguntas sigue sirviendo para posicionar; el marcado ya no.
 */

export type Block =
  | {t: 'p'; text: Record<Locale, string>}
  | {t: 'h2'; id: string; text: Record<Locale, string>}
  | {t: 'h3'; text: Record<Locale, string>}
  | {t: 'ul'; items: Record<Locale, string[]>}
  | {t: 'ol'; items: Record<Locale, string[]>}
  | {t: 'table'; caption: Record<Locale, string>; head: Record<Locale, string[]>; rows: Record<Locale, string[][]>}
  | {t: 'answer'; q: Record<Locale, string>; a: Record<Locale, string>}
  | {t: 'note'; text: Record<Locale, string>}
  | {t: 'quote'; text: Record<Locale, string>};

export type Article = {
  key: string;
  slug: Record<Locale, string>;
  /** H1 y título de la tarjeta. */
  title: Record<Locale, string>;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  /** Respuesta directa, 40-60 palabras. Va bajo el H1 y es el pasaje más citable. */
  standfirst: Record<Locale, string>;
  /** Fechas ISO. `updated` se muestra cuando difiere de `published`. */
  published: string;
  updated: string;
  readingMinutes: number;
  image: string;
  imageAlt: Record<Locale, string>;
  topic: Record<Locale, string>;
  /**
   * Solo `true` cuando el capitán Peña haya leído y aprobado el texto. Mientras sea `false`
   * la firma es del equipo de operaciones y no se declara `reviewedBy` en los datos
   * estructurados: no se le atribuye a una persona algo que no ha visto.
   */
  reviewedByCaptain: boolean;
  /** Fuentes citadas al pie. Toda cifra del cuerpo debe poder rastrearse a una. */
  sources: {label: Record<Locale, string>; url?: string}[];
  /**
   * Enlaces a páginas del propio sitio. No es decoración: hasta ahora la guía del Canal era un
   * callejón sin salida (nadie la enlazaba y ella no enlazaba a nada), y una página sin enlaces
   * entrantes ni salientes no reparte ni recibe autoridad.
   */
  related: {href: ArticleHref; label: Record<Locale, string>}[];
  body: Block[];
};

export type ArticleHref =
  | '/panama-canal-transit-guide'
  | '/ports'
  | '/services'
  | '/insights'
  | '/compare-your-fda'
  | '/request-port-call'
  | '/compliance'
  | '/certifications'
  | '/about'
  | {pathname: '/services/[slug]'; params: {slug: string}}
  | {pathname: '/ports/[slug]'; params: {slug: string}}
  | {pathname: '/insights/[slug]'; params: {slug: string}};

// Los artículos viven uno por archivo en `content/insights/` y se registran aquí.
export const articles: Article[] = [panamaCanalBooking, authorizedShippingAgent];

export const articleBySlug = (locale: Locale, slug: string) =>
  articles.find((a) => a.slug[locale] === slug);

/** Más recientes primero: el orden del índice y del feed. */
export const articlesByDate = () =>
  [...articles].sort((a, b) => (a.published < b.published ? 1 : -1));
