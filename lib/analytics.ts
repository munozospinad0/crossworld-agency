/** Lista canónica de eventos (especificación §6). No se cambian nunca. */
export const EVENTS = [
  'port_call_request', 'survey_request', 'fuel_quote_request', 'attendance_request', 'contact_submit',
  'whatsapp_click', 'phone_click', 'email_click', 'profile_download', 'resource_download',
  'language_switch', 'guide_read_75', 'cta_click', 'form_step', 'form_error', 'nominate_copy',
] as const;
export type EventName = (typeof EVENTS)[number];

declare global {
  interface Window { dataLayer?: unknown[]; }
}

export function track(event: EventName, params: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({event, page_path: window.location.pathname, locale: document.documentElement.lang, ...params});
}
