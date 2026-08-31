/** Marca: ancla del logo original (azul cielo con contorno azul marino) + wordmark en serif de caja alta. */
export function AnchorMark({size = 34, className = '', onDark = false}: {size?: number; className?: string; onDark?: boolean}) {
  const navy = onDark ? '#EEF2F6' : '#0B2E8A';
  const sky = onDark ? '#7FB0FF' : '#4C8DF0';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      {/* corona */}
      <circle cx="32" cy="9" r="5" stroke={navy} strokeWidth="3" />
      {/* cepo */}
      <rect x="17" y="17" width="30" height="5" rx="2.5" fill={sky} stroke={navy} strokeWidth="1.5" />
      {/* caña */}
      <rect x="29.5" y="14" width="5" height="40" rx="2" fill={sky} stroke={navy} strokeWidth="1.5" />
      {/* brazos con uñas */}
      <path d="M12 34c1.5 12 9 18 20 19 11-1 18.5-7 20-19l-5 3.5c-1.5 8-7 12.5-15 13.5-8-1-13.5-5.5-15-13.5L12 34z" fill={sky} stroke={navy} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 34l-3 6 8 1-2-5.5" fill={navy} />
      <path d="M52 34l3 6-8 1 2-5.5" fill={navy} />
    </svg>
  );
}

export function SignalFlags({className = ''}: {className?: string}) {
  // Franja de banderas de señales del logo original: azul/rojo/azul · cuadro rojo en blanco sobre azul · gallardete azul con corte.
  return (
    <svg viewBox="0 0 220 32" width="220" height="32" aria-hidden="true" className={className}>
      <rect x="0" y="0" width="70" height="32" fill="#0B2E8A" />
      <rect x="0" y="12" width="70" height="8" fill="#E30613" />
      <rect x="0" y="9" width="70" height="3" fill="#FFFFFF" />
      <rect x="0" y="20" width="70" height="3" fill="#FFFFFF" />
      <rect x="76" y="0" width="70" height="32" fill="#0B2E8A" />
      <rect x="93" y="7" width="36" height="18" fill="#FFFFFF" />
      <rect x="98" y="11" width="26" height="10" fill="#E30613" />
      <path d="M152 0h68l-14 16 14 16h-68z" fill="#0B2E8A" />
    </svg>
  );
}

export function Wordmark({onDark = false, className = ''}: {onDark?: boolean; className?: string}) {
  return (
    <span className={`font-brand text-[0.98rem] font-semibold tracking-[0.12em] ${onDark ? 'text-white' : 'text-brand-navy'} ${className}`}>
      CROSS WORLD AGENCY
    </span>
  );
}

export function Logo({onDark = false, size = 34, className = ''}: {onDark?: boolean; size?: number; className?: string}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <AnchorMark size={size} onDark={onDark} />
      <Wordmark onDark={onDark} />
    </span>
  );
}
