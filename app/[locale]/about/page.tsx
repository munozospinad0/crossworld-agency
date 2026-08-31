import type {Metadata} from 'next';
import Image from 'next/image';
import {setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {pages} from '@/content/pages';
import {site} from '@/content/site';
import {pageMetadata} from '@/lib/seo';
import {StaticPage} from '@/components/layout/StaticPage';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const p = pages.about[locale as Locale];
  return pageMetadata({locale: locale as Locale, title: p.metaTitle, description: p.metaDescription, href: '/about', image: '/images/captain.jpg'});
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const p = pages.about[locale as Locale];
  return (
    <StaticPage
      page={p}
      aside={
        <>
          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Image src="/images/captain.jpg" alt={`${site.captain.name}, Cross World Agency`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover object-[50%_20%]" />
          </div>
          <div className="rounded-card border border-line bg-surface p-5 font-mono text-[0.84rem] leading-relaxed">
            {site.legalName}<br />RUC {site.ruc}<br />IMO company number {site.imoCompanyNumber}<br />{site.address.street}<br />{site.address.street2}<br />{site.address.city}, {site.address.country}
          </div>
        </>
      }
    />
  );
}
