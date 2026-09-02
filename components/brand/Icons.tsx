/**
 * Iconos náuticos propios, dibujados en vector sobre retícula 48x48. Nada de librerías.
 * Dos tintas: trazo principal en currentColor y detalle en var(--ico2) (el contenedor
 * decide el acento; sin variable, cae a currentColor y el icono sigue siendo legible).
 */
import type {SVGProps} from 'react';

type P = SVGProps<SVGSVGElement> & {size?: number};
const base = (p: P) => ({
  width: p.size ?? 22,
  height: p.size ?? 22,
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});
const A = 'var(--ico2, currentColor)'; // tinta de acento
const HAIR = 1.5; // trazo fino para detalle

/** Buque dentro de la cámara de esclusas: agencia y tránsito del Canal */
export function IconLocks(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M6 42V20h7v22M42 42V20h-7v22" />
      <path d="M13 26h2.5M35 26h-2.5M13 32h2.5M35 32h-2.5" strokeWidth={HAIR} />
      <path d="M17.5 30h13l-2.2 4.6h-8.6Z" />
      <path d="M20.5 30v-3.8h5.2V30" />
      <path d="M27.6 30v-2.4M23 26.2v-3.2" strokeWidth={HAIR} />
      <circle cx="23" cy="21.4" r="0.9" fill={A} stroke="none" />
      <path d="M13 35.6c1.8-1.8 3.7-1.8 5.5 0s3.7 1.8 5.5 0 3.7-1.8 5.5 0 3.7 1.8 5.5 0" stroke={A} strokeWidth={HAIR + 0.3} />
    </svg>
  );
}

/** Marcas de calado sobre la línea de flotación: inspecciones */
export function IconDraft(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M19 5C15.8 17 15.8 31 19 43" />
      <path d="M24 9.5h5.5M24 14.5h3.5M24 19.5h5.5M24 24.5h3.5" />
      <path d="M24 33.5h5.5M24 38.5h3.5" stroke={A} strokeWidth={HAIR} />
      <path d="M5 29.5c2.5-2.2 5-2.2 7.5 0s5 2.2 7.5 0 5-2.2 7.5 0 5 2.2 7.5 0 5-2.2 7.5 0" stroke={A} strokeWidth={HAIR + 0.3} />
    </svg>
  );
}

/** Botella de muestra sellada con precinto: inspecciones de bunker */
export function IconSample(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M20.5 6.5h7M22 6.5v4.5M26 6.5v4.5" />
      <path d="M22 11c-3.6 1.9-5.5 5-5.5 9.5V32a4.5 4.5 0 0 0 4.5 4.5h6A4.5 4.5 0 0 0 31.5 32V20.5c0-4.5-1.9-7.6-5.5-9.5" />
      <path d="M17 26c2.3-1.8 4.7-1.8 7 0s4.7 1.8 7 0" stroke={A} strokeWidth={HAIR + 0.3} />
      <path d="M27.5 9.2l6.3 2.7" strokeWidth={HAIR} />
      <path d="M33.8 11.9l4.6 2-1.6 3.7-4.6-2Z" stroke={A} strokeWidth={HAIR} />
      <circle cx="34.9" cy="13.4" r="0.7" fill={A} stroke="none" />
    </svg>
  );
}

/** Barcaza de bunker con manguera al manifold: suministro de combustible */
export function IconBarge(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M4.5 31.5h31.5l-3 6.4a3 3 0 0 1-2.7 1.6H10.2a3 3 0 0 1-2.7-1.6Z" />
      <path d="M27 31.5v-6h6.5v6" />
      <circle cx="30.2" cy="28.4" r="0.9" strokeWidth={HAIR} />
      <path d="M9.5 31.5v-4.2a4.3 4.3 0 0 1 8.6 0v4.2" />
      <path d="M20 31.5v-3.4h4v3.4" strokeWidth={HAIR} />
      <path d="M22 28.1c1.5-8 8.6-10.6 13.3-7.8" stroke={A} strokeWidth={HAIR + 0.3} />
      <path d="M35.2 20.4l3.4-1.9" />
      <circle cx="40.8" cy="20.8" r="1" fill={A} stroke="none" />
      <path d="M8.5 43.2c2-1.6 4-1.6 6 0M22 43.2c2-1.6 4-1.6 6 0" stroke={A} strokeWidth={HAIR} />
    </svg>
  );
}

/** Dos cascos abarloados con defensas: ship-to-ship */
export function IconSts(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M6 10.5h24c5.5 0 9.5 2.1 11.5 5.25-2 3.15-6 5.25-11.5 5.25H6A1.5 1.5 0 0 1 4.5 19.5V12A1.5 1.5 0 0 1 6 10.5Z" />
      <path d="M6 27h24c5.5 0 9.5 2.1 11.5 5.25-2 3.15-6 5.25-11.5 5.25H6A1.5 1.5 0 0 1 4.5 36v-7.5A1.5 1.5 0 0 1 6 27Z" />
      <circle cx="14" cy="24" r="1.9" stroke={A} strokeWidth={HAIR} />
      <circle cx="22" cy="24" r="1.9" stroke={A} strokeWidth={HAIR} />
      <circle cx="30" cy="24" r="1.9" stroke={A} strokeWidth={HAIR} />
      <path d="M35.5 21v6" strokeWidth={HAIR} />
      <circle cx="12" cy="15.75" r="0.9" strokeWidth={HAIR} />
      <circle cx="12" cy="32.25" r="0.9" strokeWidth={HAIR} />
    </svg>
  );
}

/** Balanza de platos con cadenas: reclamos */
export function IconScales(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M24 9v25M17 40.5h14M20.5 37h7" />
      <circle cx="24" cy="7" r="1.8" />
      <path d="M10.5 15h27" />
      <path d="M24 13.2l1.8 1.8-1.8 1.8-1.8-1.8Z" strokeWidth={HAIR} />
      <path d="M10.5 15l-3.2 7.2M10.5 15l3.2 7.2M37.5 15l-3.2 7.2M37.5 15l3.2 7.2" strokeWidth={HAIR} />
      <path d="M4.2 22.2a6.3 6.3 0 0 0 12.6 0" stroke={A} strokeWidth={HAIR + 0.3} />
      <path d="M31.2 22.2a6.3 6.3 0 0 0 12.6 0" stroke={A} strokeWidth={HAIR + 0.3} />
      <circle cx="10.5" cy="24.6" r="1.1" fill={A} stroke="none" />
    </svg>
  );
}

/** Bitácora abierta con verificación y cinta: consultoría y auditorías */
export function IconLog(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M24 11.5c-4.2-2.8-9-3.6-14-2.9v27.2c5-.7 9.8.1 14 2.9M24 11.5c4.2-2.8 9-3.6 14-2.9v27.2c-5-.7-9.8.1-14 2.9M24 11.5v27.2" />
      <path d="M13.5 17.5c2.4-.4 4.8-.3 7 .3M13.5 22.5c2.4-.4 4.8-.3 7 .3M13.5 27.5c2.4-.4 4.8-.3 7 .3" strokeWidth={HAIR} />
      <path d="M28.5 22.5l3.4 3.4 6.1-6.6" stroke={A} strokeWidth={HAIR + 0.5} />
      <path d="M31 38.8v5.7l2.6-2.2 2.6 2.2v-7" stroke={A} strokeWidth={HAIR} />
    </svg>
  );
}

/** Timón de doble aro con cabillas: marca de apoyo */
export function IconHelm(p: P) {
  return (
    <svg {...base(p)} {...p} strokeWidth={2.6}>
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="12.4" strokeWidth={HAIR} />
      <circle cx="24" cy="24" r="4.6" />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" stroke="none" />
      <path d="M24 19.4v-7.8M24 28.6v7.8M19.4 24h-7.8M28.6 24h7.8" strokeWidth={HAIR} />
      <path d="M20.75 20.75l-5.5-5.5M27.25 20.75l5.5-5.5M20.75 27.25l-5.5 5.5M27.25 27.25l5.5 5.5" strokeWidth={HAIR} />
      <path d="M24 9V4.5M24 39v4.5M9 24H4.5M39 24h4.5M13.4 13.4l-3.2-3.2M34.6 13.4l3.2-3.2M13.4 34.6l-3.2 3.2M34.6 34.6l3.2 3.2" />
    </svg>
  );
}

export const serviceIcons = {
  agency: IconLocks,
  surveys: IconDraft,
  bunker: IconSample,
  fuel: IconBarge,
  sts: IconSts,
  claims: IconScales,
  consulting: IconLog,
} as const;
