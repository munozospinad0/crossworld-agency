'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {LocaleSwitch} from './LocaleSwitch';
import {AnchorMark, Wordmark} from '@/components/brand/Logo';

export function Nav() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : ''; return () => { document.documentElement.style.overflow = ''; }; }, [open]);

  const dark = (isHome && !scrolled) || open;
  const links = [
    {href: '/services' as const, label: t('services')},
    {href: '/panama-canal-transit-guide' as const, label: t('guide')},
    {href: '/ports' as const, label: t('ports')},
    {href: '/about' as const, label: t('about')},
    {href: '/contact' as const, label: t('contact')},
  ];
  const pill = dark
    ? 'bg-ink/70 text-on-dark border-white/10 reduced-transparency:bg-ink'
    : 'bg-white/75 text-ink border-ink/8 shadow-soft reduced-transparency:bg-white';

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4" role="banner">
        <nav aria-label="Main" className={`pointer-events-auto mx-auto flex h-[60px] max-w-[1240px] items-center gap-4 rounded-full border px-2.5 pl-4 backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${pill}`}>
          <Link href="/" className="flex items-center gap-2.5 pr-2" aria-label="Cross World Agency">
            <AnchorMark size={30} onDark={dark} />
            <Wordmark onDark={dark} className="hidden sm:inline" />
          </Link>
          <div className="ml-auto hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="relative rounded-full px-3.5 py-2 text-[0.95rem] transition-colors duration-200 hover:bg-[rgba(127,140,160,0.16)]">
                {l.label}
              </Link>
            ))}
            <LocaleSwitch className="ml-1" />
            <Link href="/request-port-call" className={`ml-2 inline-flex min-h-11 items-center gap-2 rounded-full py-2 pr-1.5 pl-4 text-[0.95rem] font-medium transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${dark ? 'bg-white text-ink hover:bg-on-dark' : 'bg-accent text-white hover:bg-accent-ink'}`}>
              {t('requestPortCall')}
              <span aria-hidden="true" className={`grid h-8 w-8 place-items-center rounded-full ${dark ? 'bg-ink/8' : 'bg-white/15'}`}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </Link>
          </div>
          <button
            type="button"
            className="relative ml-auto grid h-11 w-11 place-items-center rounded-full border border-current/30 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('close') : t('menu')}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className={`absolute h-[1.5px] w-5 rounded bg-current transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? 'rotate-45' : '-translate-y-[3.5px]'}`} />
            <span aria-hidden="true" className={`absolute h-[1.5px] w-5 rounded bg-current transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? '-rotate-45' : 'translate-y-[3.5px]'}`} />
          </button>
        </nav>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="deep fixed inset-0 z-30 flex flex-col justify-end px-6 pt-24 pb-10 text-on-dark backdrop-blur-3xl lg:hidden"
      >
        <nav aria-label="Mobile" className="grid gap-1">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="t-h2 py-2 text-white transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{transitionDelay: `${80 + i * 50}ms`, opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(24px)'}}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/request-port-call" className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 font-medium text-ink">{t('requestPortCall')}</Link>
          <LocaleSwitch />
        </div>
      </div>
    </>
  );
}
