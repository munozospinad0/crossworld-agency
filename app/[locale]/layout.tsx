import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {GeistSans} from 'geist/font/sans';
import {GeistMono} from 'geist/font/mono';
import {Cinzel} from 'next/font/google';

const brandFont = Cinzel({subsets: ['latin'], weight: ['600'], variable: '--font-brand', display: 'swap'});
import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {routing, type Locale} from '@/i18n/routing';
import {Nav} from '@/components/layout/Nav';
import {Footer} from '@/components/layout/Footer';
import {WhatsAppButton} from '@/components/layout/WhatsAppButton';
import {AnalyticsTags} from '@/components/layout/AnalyticsTags';
import {HelmProgress} from '@/components/motion/HelmProgress';
import {organizationJsonLd} from '@/lib/schema';
import {site} from '@/content/site';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Home'});
  return {
    metadataBase: new URL(site.url),
    title: {default: `${site.name} · ${locale === 'es' ? 'Agencia naviera en el Canal de Panamá' : 'Ship agency at the Panama Canal'}`, template: `%s | ${site.name}`},
    description: t('metaDescription'),
    openGraph: {siteName: site.name, type: 'website', locale: locale === 'es' ? 'es_PA' : 'en_US'},
    robots: {index: true, follow: true},
  };
}

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({locale, namespace: 'Nav'});

  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable} ${brandFont.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        <NextIntlClientProvider messages={messages}>
          <a className="skip" href="#content">{t('skip')}</a>
          <Nav />
          <main id="content" className="pt-[92px]">{children}</main>
          <Footer />
          <WhatsAppButton />
          <HelmProgress />
        </NextIntlClientProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organizationJsonLd(locale as Locale))}} />
        <AnalyticsTags />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
