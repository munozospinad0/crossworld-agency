import type {ComponentProps, ReactNode} from 'react';
import {Link} from '@/i18n/navigation';

type Variant = 'primary' | 'ghost' | 'light' | 'ghostDark';

const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[1rem] font-medium leading-tight min-h-11 whitespace-nowrap transition-[transform,background-color] duration-150 active:scale-[0.98] border';
const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white border-transparent hover:bg-accent-ink',
  ghost: 'bg-transparent text-accent-ink border-line-strong hover:bg-accent-soft',
  light: 'bg-on-dark text-ink border-transparent hover:bg-white',
  ghostDark: 'bg-white/5 text-on-dark border-white/15 hover:bg-white/10 backdrop-blur',
};

export function cls(variant: Variant = 'primary', extra = '') {
  return `${base} ${variants[variant]} ${extra}`;
}

type LinkHref = ComponentProps<typeof Link>['href'];

export function ButtonLink({href, variant = 'primary', className = '', children, ...rest}: {href: LinkHref; variant?: Variant; className?: string; children: ReactNode} & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>) {
  return (
    <Link href={href} className={cls(variant, className)} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonA({href, variant = 'primary', className = '', children, ...rest}: {href: string; variant?: Variant; className?: string; children: ReactNode} & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>) {
  return (
    <a href={href} className={cls(variant, className)} {...rest}>
      {children}
    </a>
  );
}

export function Button({variant = 'primary', className = '', children, ...rest}: {variant?: Variant; className?: string; children: ReactNode} & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button className={cls(variant, className)} {...rest}>
      {children}
    </button>
  );
}
