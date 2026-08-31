'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {LocaleSwitch} from './LocaleSwitch';
import {site} from '@/content/site';

export function Nav() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const dark = isHome && !scrolled && !open;
  const shell = dark
    ? 'bg-ink/60 text-on-dark border-white/10 reduced-transparency:bg-ink'
    : 'bg-paper/80 text-ink border-ink/5 reduced-transparency:bg-paper';

  const links = [
    {href: '/services' as const, label: t('services')},
    {href: '/panama-canal-transit-guide' as const, label: t('guide')},
    {href: '/ports' as const, label: t('ports')},
    {href: '/about' as const, label: t('about')},
    {href: '/contact' as const, label: t('contact')},
  ];

  return (
    <nav className={`sticky top-0 z-40 h-[68px] border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${shell}`} aria-label="Main">
      <div className="wrap flex h-[68px] items-center gap-6">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight whitespace-nowrap">
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-[9px] bg-accent font-mono text-[0.8rem] text-white">CW</span>
          {site.name}
        </Link>
        <div className="ml-auto hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-3 py-2 text-[0.95rem] opacity-90 hover:bg-[rgba(127,140,160,0.18)] hover:opacity-100">
              {l.label}
            </Link>
          ))}
          <Link href="/request-port-call" className="ml-2 inline-flex min-h-11 items-center rounded-full bg-accent px-5 py-2.5 font-medium text-white hover:bg-accent-ink">
            {t('requestPortCall')}
          </Link>
          <LocaleSwitch className="ml-3" />
        </div>
        <button
          type="button"
          className="ml-auto rounded-full border border-current px-4 py-2 text-[0.9rem] font-medium lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t('close') : t('menu')}
        </button>
      </div>
      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-paper text-ink lg:hidden">
        <div className="wrap flex flex-col gap-1 py-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-2 py-3 text-[1.05rem] hover:bg-accent-soft">
              {l.label}
            </Link>
          ))}
          <Link href="/request-port-call" className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 py-3 font-medium text-white">
            {t('requestPortCall')}
          </Link>
          <LocaleSwitch className="mt-2 self-start" />
        </div>
      </div>
    </nav>
  );
}
