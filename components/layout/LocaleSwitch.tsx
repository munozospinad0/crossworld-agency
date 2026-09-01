'use client';

import {useLocale, useTranslations} from 'next-intl';
import {useParams} from 'next/navigation';
import {Link, usePathname} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

const NAMES = {en: 'English', es: 'Español'} as const;

export function LocaleSwitch({className = ''}: {className?: string}) {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  return (
    <div role="group" aria-label={t('language')} className={`flex items-center gap-0.5 rounded-full border border-current/25 p-0.5 font-mono text-[0.72rem] tracking-[0.08em] ${className}`}>
      {routing.locales.map((l) =>
        l === locale ? (
          <span key={l} aria-current="true" title={NAMES[l]} className="rounded-full bg-[rgba(127,140,160,0.28)] px-2 py-1 font-semibold uppercase">
            {l}
          </span>
        ) : (
          <Link
            key={l}
            // @ts-expect-error -- pathname/params son válidos para la ruta actual
            href={{pathname, params}}
            locale={l}
            hrefLang={l}
            lang={l}
            aria-label={NAMES[l]}
            title={NAMES[l]}
            className="rounded-full px-2 py-1 uppercase opacity-60 transition-opacity duration-200 hover:opacity-100"
          >
            {l}
          </Link>
        ),
      )}
    </div>
  );
}
