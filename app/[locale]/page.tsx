import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {pageMetadata} from '@/lib/seo';
import {Hero} from '@/components/sections/Hero';
import {CredentialStrip} from '@/components/sections/CredentialStrip';
import {ServicesBento} from '@/components/sections/ServicesBento';
import {Stats} from '@/components/sections/Stats';
import {CanalCrossing} from '@/components/sections/CanalCrossing';
import {PortsCards} from '@/components/sections/PortsCards';
import {Captain} from '@/components/sections/Captain';
import {FieldReels} from '@/components/sections/FieldReels';
import {Audiences} from '@/components/sections/Audiences';
import {Proof} from '@/components/sections/Proof';
import {FinalCta} from '@/components/sections/FinalCta';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Home'});
  return pageMetadata({
    locale: locale as Locale,
    title: locale === 'es' ? 'Agencia naviera, marine surveyors y tránsito del Canal de Panamá' : 'Shipping agency, marine surveyors and Panama Canal transit agency',
    description: t('metaDescription'),
    href: '/',
    image: '/images/canal-transit.jpg',
  });
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <CredentialStrip />
      <ServicesBento />
      <Stats />
      <CanalCrossing />
      <PortsCards />
      <Captain />
      <FieldReels />
      <Audiences />
      <Proof />
      <FinalCta />
    </>
  );
}
