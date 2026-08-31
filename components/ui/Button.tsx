import type {ComponentProps, ReactNode} from 'react';
import {Link} from '@/i18n/navigation';

type Variant = 'primary' | 'ghost' | 'light' | 'ghostDark';

const base = 'group inline-flex items-center justify-center gap-2.5 rounded-full pl-6 pr-2 py-2 text-[1rem] font-medium leading-tight min-h-12 whitespace-nowrap border transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]';
const plain = 'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[1rem] font-medium leading-tight min-h-12 whitespace-nowrap border transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]';
const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white border-transparent hover:bg-accent-ink hover:shadow-lift',
  ghost: 'bg-transparent text-accent-ink border-line-strong hover:bg-accent-soft',
  light: 'bg-white text-ink border-transparent hover:bg-on-dark hover:shadow-lift',
  ghostDark: 'bg-white/6 text-on-dark border-white/15 hover:bg-white/12 backdrop-blur',
};
const dots: Record<Variant, string> = {
  primary: 'bg-white/15 text-white',
  ghost: 'bg-accent/10 text-accent-ink',
  light: 'bg-ink/8 text-ink',
  ghostDark: 'bg-white/12 text-white',
};

function Arrow({variant}: {variant: Variant}) {
  return (
    <span aria-hidden="true" className={`grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 ${dots[variant]}`}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

export function cls(variant: Variant = 'primary', extra = '', arrow = true) {
  return `${arrow ? base : plain} ${variants[variant]} ${extra}`;
}

type LinkHref = ComponentProps<typeof Link>['href'];
type Common = {variant?: Variant; className?: string; children: ReactNode; arrow?: boolean};

export function ButtonLink({href, variant = 'primary', className = '', children, arrow = true, ...rest}: {href: LinkHref} & Common & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>) {
  return (
    <Link href={href} className={cls(variant, className, arrow)} {...rest}>
      <span>{children}</span>{arrow && <Arrow variant={variant} />}
    </Link>
  );
}

export function ButtonA({href, variant = 'primary', className = '', children, arrow = false, ...rest}: {href: string} & Common & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>) {
  return (
    <a href={href} className={cls(variant, className, arrow)} {...rest}>
      <span>{children}</span>{arrow && <Arrow variant={variant} />}
    </a>
  );
}

export function Button({variant = 'primary', className = '', children, arrow = false, ...rest}: Common & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button className={cls(variant, className, arrow)} {...rest}>
      <span>{children}</span>{arrow && <Arrow variant={variant} />}
    </button>
  );
}
