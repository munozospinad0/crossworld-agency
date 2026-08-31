'use client';

import {useLocale, useTranslations} from 'next-intl';
import {useParams} from 'next/navigation';
import {Link, usePathname} from '@/i18n/navigation';

export function LocaleSwitch({className = ''}: {className?: string}) {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const other = locale === 'en' ? 'es' : 'en';
  return (
    <Link
      // @ts-expect-error -- pathname/params son válidos para la ruta actual
      href={{pathname, params}}
      locale={other}
      hrefLang={other}
      lang={other}
      className={`rounded-full border border-current px-3 py-1.5 font-mono text-[0.8rem] hover:bg-[rgba(127,140,160,0.18)] ${className}`}
    >
      {t('switchTo')}
    </Link>
  );
}
