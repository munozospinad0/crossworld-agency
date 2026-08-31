/** "CROSS WORLD" escrito con banderas del Código Internacional de Señales. Vector propio, con el texto accesible. */

const W = 30;
const H = 22;

function flag(letter: string, key: string) {
  switch (letter) {
    case 'C': // cinco franjas: azul, blanco, rojo, blanco, azul
      return (
        <g key={key}>
          <rect width={W} height={H} fill="#0B2E8A" />
          <rect y={H * 0.2} width={W} height={H * 0.2} fill="#fff" />
          <rect y={H * 0.4} width={W} height={H * 0.2} fill="#E30613" />
          <rect y={H * 0.6} width={W} height={H * 0.2} fill="#fff" />
        </g>
      );
    case 'R': // rojo con cruz amarilla
      return (
        <g key={key}>
          <rect width={W} height={H} fill="#E30613" />
          <rect x={W / 2 - 2.5} width={5} height={H} fill="#F7C600" />
          <rect y={H / 2 - 2.5} width={W} height={5} fill="#F7C600" />
        </g>
      );
    case 'O': // diagonal: rojo arriba, amarillo abajo
      return (
        <g key={key}>
          <rect width={W} height={H} fill="#F7C600" />
          <path d={`M0 0 H${W} V${H} Z`} fill="#E30613" />
        </g>
      );
    case 'S': // blanco con rectángulo azul al centro
      return (
        <g key={key}>
          <rect width={W} height={H} fill="#fff" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
          <rect x={W / 3} y={H / 3} width={W / 3} height={H / 3} fill="#0B2E8A" />
        </g>
      );
    case 'W': // azul, blanco, rojo anidados
      return (
        <g key={key}>
          <rect width={W} height={H} fill="#0B2E8A" />
          <rect x={W / 6} y={H / 6} width={(W * 2) / 3} height={(H * 2) / 3} fill="#fff" />
          <rect x={W / 3} y={H / 3} width={W / 3} height={H / 3} fill="#E30613" />
        </g>
      );
    case 'L': // cuartelada amarillo y negro
      return (
        <g key={key}>
          <rect width={W} height={H} fill="#F7C600" />
          <rect x={W / 2} width={W / 2} height={H / 2} fill="#101418" />
          <rect y={H / 2} width={W / 2} height={H / 2} fill="#101418" />
        </g>
      );
    case 'D': // amarillo, franja azul ancha, amarillo
      return (
        <g key={key}>
          <rect width={W} height={H} fill="#F7C600" />
          <rect y={H * 0.25} width={W} height={H * 0.5} fill="#0B2E8A" />
        </g>
      );
    default:
      return null;
  }
}

export function FlagWordmark({className = ''}: {className?: string}) {
  const words: string[][] = [['C', 'R', 'O', 'S', 'S'], ['W', 'O', 'R', 'L', 'D']];
  const gap = 6;
  const wordGap = 18;
  const total = words.flat().length * (W + gap) - gap + wordGap;
  let x = 0;
  const nodes: React.ReactNode[] = [];
  words.forEach((word, wi) => {
    word.forEach((letter, li) => {
      nodes.push(
        <g key={`${wi}-${li}`} transform={`translate(${x} 0)`}>
          <title>{letter}</title>
          {flag(letter, `${wi}-${li}-f`)}
          <rect width={W} height={H} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" />
          <text x={W / 2} y={H + 11} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1" fill="rgba(169,182,195,0.7)">{letter}</text>
        </g>,
      );
      x += W + gap;
    });
    if (wi === 0) x += wordGap;
  });
  return (
    <figure className={`m-0 ${className}`}>
      <svg viewBox={`0 0 ${total} ${H + 15}`} className="h-auto w-full max-w-[420px]" role="img" aria-label="CROSS WORLD spelled in international maritime signal flags">
        {nodes}
      </svg>
      <figcaption className="sr-only">CROSS WORLD in international signal flags</figcaption>
    </figure>
  );
}
