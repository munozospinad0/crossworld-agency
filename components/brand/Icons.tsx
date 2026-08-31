/** Iconos náuticos propios, dibujados en vector (24x24, trazo 1.5, puntas redondeadas). Nada de librerías. */
import type {SVGProps} from 'react';

type P = SVGProps<SVGSVGElement> & {size?: number};
const base = (p: P) => ({
  width: p.size ?? 22,
  height: p.size ?? 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

/** Ancla: agencia y tránsito */
export function IconAnchor(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M12 6.5V20M8 9.5h8" />
      <path d="M4.5 13.5C5.5 17.8 8.4 20 12 20s6.5-2.2 7.5-6.5" />
      <path d="M4.5 13.5 3 16l3 .6M19.5 13.5 21 16l-3 .6" />
    </svg>
  );
}

/** Marcas de calado sobre la línea de agua: inspecciones */
export function IconDraft(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M9 3v13" />
      <path d="M9 4.5h3M9 7.5h2M9 10.5h3M9 13.5h2" />
      <path d="M15.5 3 19 16" />
      <path d="M3 18.5c1.5 1.4 3 1.4 4.5 0s3-1.4 4.5 0 3 1.4 4.5 0 3-1.4 4.5 0" />
    </svg>
  );
}

/** Gota con sello de muestra: inspecciones de bunker */
export function IconDrop(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M12 3.5c3.2 4.2 5.5 7.4 5.5 10.2a5.5 5.5 0 1 1-11 0C6.5 10.9 8.8 7.7 12 3.5Z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
      <path d="M17.5 5.5h3M19 4v3" />
    </svg>
  );
}

/** Barcaza con manguera: suministro de combustible */
export function IconBarge(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M3.5 14h17l-2.2 4.2a2 2 0 0 1-1.8 1.1H7.5a2 2 0 0 1-1.8-1.1L3.5 14Z" />
      <path d="M7 14v-3h6v3M10 11V8.5" />
      <path d="M13 8.5h4.5a2 2 0 0 1 2 2V12" />
      <circle cx="19.5" cy="13" r="0.4" fill="currentColor" />
    </svg>
  );
}

/** Dos cascos con transferencia: ship-to-ship */
export function IconSts(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M6.5 4.5c-2 4.6-2 10.4 0 15M17.5 4.5c2 4.6 2 10.4 0 15" />
      <path d="M9.5 9.5h5M12.5 7.5l2 2-2 2" />
      <path d="M14.5 14.5h-5M11.5 12.5l-2 2 2 2" />
    </svg>
  );
}

/** Balanza: reclamos */
export function IconScales(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M12 4v16M8 20h8M5.5 7h13" />
      <path d="M5.5 7 3 12.5a2.8 2.8 0 0 0 5 0L5.5 7ZM18.5 7 16 12.5a2.8 2.8 0 0 0 5 0L18.5 7Z" />
    </svg>
  );
}

/** Bitácora con verificación: consultoría y auditorías */
export function IconLog(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <path d="M6.5 4.5h11a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z" />
      <path d="M9.5 3v3M14.5 3v3" />
      <path d="M9 13l2.2 2.2L15.5 11" />
    </svg>
  );
}

/** Timón: marca de apoyo */
export function IconHelm(p: P) {
  return (
    <svg {...base(p)} {...p}>
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="1.6" />
      <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.3 5.3l2.8 2.8M15.9 15.9l2.8 2.8M18.7 5.3l-2.8 2.8M8.1 15.9l-2.8 2.8" />
    </svg>
  );
}

export const serviceIcons = {
  agency: IconAnchor,
  surveys: IconDraft,
  bunker: IconDrop,
  fuel: IconBarge,
  sts: IconSts,
  claims: IconScales,
  consulting: IconLog,
} as const;
