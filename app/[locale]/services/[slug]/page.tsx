import type {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link, getPathname} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {services, serviceBySlug} from '@/content/services';
import {site, whatsappHref} from '@/content/site';
import {pageMetadata} from '@/lib/seo';
import {breadcrumbJsonLd, serviceJsonLd} from '@/lib/schema';
import {ButtonLink, ButtonA} from '@/components/ui/Button';
import {Reveal} from '@/components/motion/Reveal';
import {serviceIcons} from '@/components/brand/Icons';
import {InstrumentChip, ChartLines} from '@/components/brand/InstrumentChip';

const ui = {
  en: {services: 'Services', specialties: 'Specialists in', more: 'Other services', contactTitle: 'Talk to the duty officer', contactText: 'Answers 24/7 in English and Spanish. For a transit or port call, use the request form and receive a request number.', operations: 'Operations 24/7', office: 'Office', email: 'Email'},
  es: {services: 'Servicios', specialties: 'Especialistas en', more: 'Otros servicios', contactTitle: 'Hable con el oficial de guardia', contactText: 'Responde 24/7 en inglés y español. Para un tránsito o una escala, use el formulario y reciba un número de solicitud.', operations: 'Operaciones 24/7', office: 'Oficina', email: 'Correo'},
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => services.map((s) => ({locale, slug: s.slug[locale]})));
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}): Promise<Metadata> {
  const {locale: l, slug} = await params;
  const locale = l as Locale;
  const s = serviceBySlug(locale, slug);
  if (!s) return {};
  return pageMetadata({
    locale,
    title: s.metaTitle[locale],
    description: s.metaDescription[locale],
    href: {pathname: '/services/[slug]', params: {slug: s.slug[locale]}},
    esHref: {pathname: '/services/[slug]', params: {slug: s.slug.es}},
    image: s.image,
  });
}

/** Marca de calado: viñeta propia de la lista "Especialistas en". */
function DraftMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="mt-[0.3em] shrink-0 text-accent">
      <path d="M6 2v14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.5 4.5h4M8.5 8h2.5M8.5 11.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 14.5c1.2-1 2.3-1 3.5 0s2.3 1 3.5 0 2.3-1 3.5 0 2.3 1 3.5 0" stroke="#4C8DF0" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default async function ServicePage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale: l, slug} = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const s = serviceBySlug(locale, slug);
  if (!s) notFound();
  const t = ui[locale];
  const cta = await getTranslations('Cta');
  const c = await getTranslations('Common');
  const url = `${site.url}${getPathname({locale, href: {pathname: '/services/[slug]', params: {slug: s.slug[locale]}}})}`;
  const requestUrl = `${site.url}${getPathname({locale, href: '/request-port-call'})}`;
  const ctaLabel = cta(s.cta);
  const index = services.findIndex((x) => x.key === s.key);
  const others = services.filter((x) => x.key !== s.key);
  const specialties = s.specialties?.[locale];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(serviceJsonLd(locale, {h1: s.h1[locale], description: s.metaDescription[locale], url, requestUrl}))}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd([{name: 'Home', url: `${site.url}/${locale}`}, {name: t.services, url: `${site.url}${getPathname({locale, href: '/services'})}`}, {name: s.title[locale], url}]))}} />

      {/* Cabecera del servicio: texto a la izquierda, foto en lámina a la derecha */}
      <section className="relative overflow-hidden border-b border-line bg-surface py-[clamp(44px,6vw,88px)]">
        <ChartLines marks={false} className="pointer-events-none absolute -top-10 right-[38%] hidden h-[260px] w-[420px] text-ink opacity-[0.045] lg:block" />
        <div className="wrap relative grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[0.74rem] tracking-[0.06em] text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/services" className="hover:text-ink">{t.services}</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">{s.title[locale]}</span>
              <span aria-hidden="true" className="ml-2 inline-flex items-center gap-2 text-accent tabular-nums">
                <span className="h-px w-6 bg-accent/40" />0{index + 1}
              </span>
            </nav>
            <h1 className="t-display max-w-[20ch]">{s.h1[locale]}</h1>
            <div className="mt-5 max-w-[60ch]">
              {s.summary[locale].map((p) => <p key={p} className="t-lead mt-3 first:mt-0 text-text">{p}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/request-port-call">{ctaLabel}</ButtonLink>
              <ButtonA href={whatsappHref()} variant="ghost" title={site.whatsapp.confirm ? c('toConfirm') : undefined}>{cta('whatsapp')}</ButtonA>
            </div>
          </div>
          <div className="shell">
            <div className="core relative aspect-[4/3] overflow-hidden bg-ink-2 md:aspect-[5/6]">
              <Image src={s.image} alt={s.imageAlt[locale]} fill priority sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[linear-gradient(0deg,rgba(11,20,32,0.7),transparent)] px-5 pt-10 pb-4 font-mono text-[0.66rem] tracking-[0.16em] text-on-dark uppercase">
                <span>{site.name}</span>
                <span className="tabular-nums">0{index + 1} / 0{services.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Especialistas en": solo inspecciones marítimas */}
      {specialties && specialties.length > 0 && (
        <section className="py-[clamp(48px,6vw,88px)]">
          <div className="wrap">
            <Reveal>
              <div className="grid gap-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
                <div>
                  <p className="mb-3 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted">0{index + 1} · {s.title[locale]}</p>
                  <h2 className="t-h2">{t.specialties}</h2>
                </div>
                <ul className="m-0 grid list-none gap-x-10 gap-y-3 p-0 sm:grid-cols-2">
                  {specialties.map((x) => (
                    <li key={x} className="flex items-start gap-3 border-b border-line pb-3 text-[0.98rem] text-text">
                      <DraftMark />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Contacto del oficial de guardia */}
      <section className="deep py-[clamp(48px,6vw,80px)] text-on-dark">
        <div className="wrap grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <Reveal>
            <h2 className="t-h2 text-white">{t.contactTitle}</h2>
            <p className="mt-3 mb-0 max-w-[52ch] text-[1.05rem] text-on-dark-muted">{t.contactText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/request-port-call" variant="light">{ctaLabel}</ButtonLink>
              <ButtonA href={whatsappHref()} variant="ghostDark" title={site.whatsapp.confirm ? c('toConfirm') : undefined}>{cta('whatsapp')}</ButtonA>
            </div>
          </Reveal>
          <Reveal delay={1} className="shell-dark">
            <dl className="core m-0 grid gap-3 bg-ink-2 p-6 font-mono text-[0.86rem] text-on-dark">
              {[
                [t.operations, <a key="op" className="text-white underline decoration-white/25 underline-offset-4" href={`tel:${site.phones.operations.e164}`}>{site.phones.operations.display}</a>],
                [t.office, <a key="of" className="text-white underline decoration-white/25 underline-offset-4" href={`tel:${site.phones.office.e164}`}>{site.phones.office.display}</a>],
                [t.email, <a key="em" className="break-all text-white underline decoration-white/25 underline-offset-4" href={`mailto:${site.emails.operations.address}`}>{site.emails.operations.address}</a>],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex items-baseline gap-3">
                  <dt className="shrink-0 text-[0.68rem] tracking-[0.14em] uppercase text-on-dark-muted">{k}</dt>
                  <span aria-hidden="true" className="min-w-4 flex-1 -translate-y-[0.28em] border-b border-dotted border-white/15" />
                  <dd className="m-0 text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Otros servicios: navegación entre las siete páginas */}
      <section className="py-[clamp(48px,6vw,88px)]">
        <div className="wrap">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="t-h2">{t.more}</h2>
            <Link href="/services" className="font-mono text-[0.8rem] font-medium text-accent-ink hover:underline">{t.services} →</Link>
          </Reveal>
          <div className="shell grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => {
              const Icon = serviceIcons[o.key as keyof typeof serviceIcons];
              const n = services.findIndex((x) => x.key === o.key) + 1;
              return (
                <Reveal key={o.key} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <Link href={{pathname: '/services/[slug]', params: {slug: o.slug[locale]}}} className="core group flex h-full items-start gap-4 bg-surface p-5 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] fine-pointer:hover:-translate-y-0.5 fine-pointer:hover:shadow-lift">
                    <InstrumentChip><Icon size={26} /></InstrumentChip>
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.68rem] tracking-[0.14em] text-muted tabular-nums">0{n}</span>
                      <span className="mt-0.5 block text-[1.02rem] leading-snug font-semibold text-ink">{o.title[locale]}</span>
                      <span className="mt-1 block text-[0.9rem] text-muted">{o.oneLiner[locale]}</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
