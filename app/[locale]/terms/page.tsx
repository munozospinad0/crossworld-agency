import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {pages} from '@/content/pages';
import {pageMetadata} from '@/lib/seo';
import {StaticPage} from '@/components/layout/StaticPage';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const p = pages.terms[locale as Locale];
  return pageMetadata({locale: locale as Locale, title: p.metaTitle, description: p.metaDescription, href: '/terms'});
}

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <StaticPage page={pages.terms[locale as Locale]} />;
}
