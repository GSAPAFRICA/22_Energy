type Variant = "residential" | "commercial" | "battery" | "panelfield";

const gradients: Record<Variant, [string, string]> = {
  residential: ["#16233a", "#0a1628"],
  commercial: ["#1c2d47", "#0a1628"],
  battery: ["#0f2038", "#0a1628"],
  panelfield: ["#122238", "#0a1628"],
};

export function ProjectArt({ variant, className = "" }: { variant: Variant; className?: string }) {
  const [from, to] = gradients[variant];
  const gid = `proj-${variant}`;

  return (
    <svg viewBox="0 0 480 340" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="480" height="340" fill={`url(#${gid})`} />

      {variant === "residential" && (
        <g>
          <polygon points="120,220 240,220 240,140 180,100 120,140" fill="#1c2d47" />
          <rect x="140" y="220" width="80" height="60" fill="#16233a" />
          <g transform="translate(150 128)">
            {[0, 1, 2].map((i) => (
              <rect key={i} x={i * 18} y="0" width="14" height="10" fill="#0e7c3a" opacity="0.6" />
            ))}
          </g>
          <circle cx="360" cy="70" r="26" fill="#f0ab1f" opacity="0.8" />
        </g>
      )}

      {variant === "commercial" && (
        <g>
          <rect x="90" y="140" width="300" height="120" fill="#16233a" />
          <g transform="translate(90 100)">
            {Array.from({ length: 5 }).map((_, i) => (
              <rect key={i} x={i * 58} y="0" width="50" height="36" fill="#0e7c3a" opacity="0.4" />
            ))}
          </g>
          {Array.from({ length: 5 }).map((_, i) => (
            <rect key={i} x={110 + i * 50} y="180" width="30" height="40" fill="#0a1628" />
          ))}
        </g>
      )}

      {variant === "battery" && (
        <g>
          <rect x="200" y="120" width="80" height="140" rx="6" fill="#16233a" stroke="#2a3a56" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="212" y={140 + i * 28} width="56" height="18" fill="#0e7c3a" opacity={0.25 + i * 0.15} />
          ))}
          <path d="M230 150 L244 150 L234 176 L248 176 L222 214 L228 182 L216 182 Z" fill="#f0ab1f" />
        </g>
      )}

      {variant === "panelfield" && (
        <g>
          {Array.from({ length: 3 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={60 + col * 60}
                y={140 + row * 46}
                width="50"
                height="34"
                fill="#1c2d47"
                stroke="#0e7c3a"
                strokeOpacity="0.35"
              />
            ))
          )}
          <circle cx="400" cy="70" r="24" fill="#f0ab1f" opacity="0.8" />
        </g>
      )}
    </svg>
  );
}
