/** Marca: redibujo vectorial del logo real del cliente (escudo azul con ancla blanca y cabo) + wordmark en serif de caja alta. */
export function AnchorMark({size = 34, className = '', onDark = false}: {size?: number; className?: string; onDark?: boolean}) {
  const navy = onDark ? '#EEF2F6' : '#0B2E8A';
  const shield = onDark ? '#2F62C8' : '#2C63CF';
  const white = onDark ? '#FFFFFF' : '#FFFFFF';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      {/* escudo pentagonal */}
      <path d="M13 5h38v30L32 57 13 35z" fill={shield} stroke={navy} strokeWidth="1.6" strokeLinejoin="round" />
      {/* arganeo */}
      <circle cx="32" cy="12" r="4" stroke={white} strokeWidth="2.6" />
      <circle cx="32" cy="12" r="4" stroke={navy} strokeWidth="0.6" />
      {/* cepo */}
      <rect x="21" y="18.5" width="22" height="4.2" rx="2.1" fill={white} stroke={navy} strokeWidth="0.8" />
      {/* caña */}
      <rect x="30.1" y="16" width="3.8" height="40" rx="1.6" fill={white} stroke={navy} strokeWidth="0.8" />
      {/* brazos con uñas */}
      <path d="M14 38c1.6 11 8.6 17.6 18 19.4 9.4-1.8 16.4-8.4 18-19.4l-4.6 3.2c-1.6 7-6.4 11.4-13.4 12.6-7-1.2-11.8-5.6-13.4-12.6L14 38z" fill={white} stroke={navy} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M14 38l-3.4 6.2 8.2.6-1.8-5.2z" fill={white} stroke={navy} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M50 38l3.4 6.2-8.2.6 1.8-5.2z" fill={white} stroke={navy} strokeWidth="0.9" strokeLinejoin="round" />
      {/* cabo enrollado en la caña */}
      <path d="M24 27c4 3 12 3 16 0M24 33c4-3 12-3 16 0M24 33c4 3 12 3 16 0M24 39c4-3 12-3 16 0" stroke={navy} strokeWidth="1.1" strokeLinecap="round" />
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
