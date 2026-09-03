/**
 * Glifo del istmo de Panamá (geometría simplificada de la carta de CanalJourney):
 * dos masas de tierra, la ruta del Canal y un punto pulsante en la boca que toque —
 * Pacífico (Balboa) o Atlántico (Cristóbal). Tierra y ruta en currentColor; el
 * contenedor decide el tono (p. ej. text-white/25 sobre tinta).
 */
export function IsthmusGlyph({mouth, className = ''}: {mouth: 'pacific' | 'atlantic'; className?: string}) {
  const dot = mouth === 'pacific' ? {cx: 9, cy: 50} : {cx: 87, cy: 21};
  return (
    <svg viewBox="0 0 96 64" fill="none" aria-hidden="true" className={className}>
      <path d="M0 64 L0 53 C 10 53.5 17 51 25 47 C 32 43.5 33 39.5 37.5 38 C 35.5 43.5 28 51 20.5 55.5 C 14 59.5 6.5 63.5 0 64 Z" fill="currentColor" opacity="0.55" />
      <path d="M96 0 L96 36 C 90.5 32.5 86 28 79.5 24 C 74 20.5 68.5 19 60 19.5 C 68.5 12.5 81 4.5 96 0 Z" fill="currentColor" opacity="0.55" />
      <path d="M9 50 C 17.5 49 23 45.5 28 42 C 32.5 39 33.5 34.5 38 33 C 42 31.5 45 33 49 31 C 55.5 28 57.5 24 65.5 23 C 72.5 22 77 24 82 27" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1 3" strokeLinecap="round" />
      <circle cx={dot.cx} cy={dot.cy} r="2.6" className="fill-brand-sky" />
      <circle cx={dot.cx} cy={dot.cy} r="5.5" className="fill-none stroke-brand-sky/50 motion-safe:animate-ping motion-reduce:hidden" strokeWidth="1" style={{transformOrigin: `${dot.cx}px ${dot.cy}px`, animationDuration: '2.6s'}} />
    </svg>
  );
}
