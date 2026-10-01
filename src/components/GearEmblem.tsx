import { useId } from "react";
import { gearPath } from "@/lib/gear";

// Logodaki amblem: birbirine geçen iki dişli + bakır alev.
// Dişli geometrisi AlevsanLogo.jpeg üzerinden ölçüldü: 12 diş, diş dibi r≈103.5,
// diş ucu r≈128, merkezler arası 245 birim. Sağ dişli yarım diş (15°) kaydırılarak kavrar.
const R_TIP = 128;
const R_BAND = 82;
const GEAR = gearPath({ rRoot: 103.5, rTip: R_TIP, innerR: R_BAND });
const LEFT = { x: 140, y: 380 };
const RIGHT = { x: 385, y: 380 };
const MESH = { x: (LEFT.x + RIGHT.x) / 2, y: LEFT.y };
const SPARKS = [
  { dx: -70, dy: 95, d: 0 },
  { dx: -30, dy: 120, d: 0.25 },
  { dx: 20, dy: 110, d: 0.5 },
  { dx: 65, dy: 90, d: 0.15 },
  { dx: -50, dy: 70, d: 0.65 },
  { dx: 45, dy: 130, d: 0.85 },
  { dx: 5, dy: 140, d: 0.4 },
];

/**
 * mode="loader": dişliler sürekli döner, kıvılcımlar sıçrar.
 * mode="nav":    açılışta bir kez yarım tur döner; üst öğe (.group) üzerine gelinince döner, çekilince durur.
 */
export function GearEmblem({ mode, className }: { mode: "loader" | "nav"; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const silver = `${uid}-silver`;
  const polish = `${uid}-polish`;
  const spark = `${uid}-spark`;

  const gear = (c: { x: number; y: number }, dir: "cw" | "ccw") => {
    const maskId = `${uid}-gear-${dir}`;
    return (
      <g>
        {/* Dişli şekli maske içinde döner, metal ışığı sabit kalır */}
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="525" height="520">
          <g transform={`translate(${c.x} ${c.y})`}>
            <g className={mode === "nav" ? `emblem-intro-${dir}` : undefined}>
              <path d={GEAR} fill="#fff" fillRule="evenodd" className={mode === "nav" ? `emblem-spin-${dir}` : `loader-spin-${dir}`} />
            </g>
          </g>
        </mask>
        <rect x={c.x - R_TIP} y={c.y - R_TIP} width={R_TIP * 2} height={R_TIP * 2} fill={`url(#${silver})`} mask={`url(#${maskId})`} />
        {/* Dönme simetrik iç halkalar */}
        <circle cx={c.x} cy={c.y} r={R_BAND - 2} fill="none" stroke="#141416" strokeWidth="4" />
        <circle cx={c.x} cy={c.y} r={72} fill="none" stroke={`url(#${polish})`} strokeWidth="9" />
        <circle cx={c.x} cy={c.y} r={R_BAND + 1} fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" />
      </g>
    );
  };

  return (
    <svg viewBox="0 0 525 520" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={silver} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbfbfc" />
          <stop offset="0.28" stopColor="#c4c4c9" />
          <stop offset="0.5" stopColor="#7b7b82" />
          <stop offset="0.68" stopColor="#e6e6ea" />
          <stop offset="1" stopColor="#8e8e95" />
        </linearGradient>
        <linearGradient id={polish} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#6b6b72" />
          <stop offset="0.45" stopColor="#ffffff" />
          <stop offset="1" stopColor="#8c8c93" />
        </linearGradient>
        {mode === "loader" && (
          <radialGradient id={spark}>
            <stop offset="0" stopColor="#fff4d6" />
            <stop offset="0.5" stopColor="#f0c28f" />
            <stop offset="1" stopColor="#d9a066" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>

      {gear(LEFT, "cw")}
      {gear(RIGHT, "ccw")}

      {mode === "loader" && (
        // Dişlilerin kavrama noktasından sıçrayan talaş kıvılcımları
        <g transform={`translate(${MESH.x} ${MESH.y + 20})`}>
          {SPARKS.map((s, i) => (
            <circle
              key={i}
              r="4"
              fill={`url(#${spark})`}
              className="loader-spark"
              style={{ "--dx": `${s.dx}px`, "--dy": `${s.dy}px`, animationDelay: `${s.d}s` } as React.CSSProperties}
            />
          ))}
        </g>
      )}

      {/* Logodan çıkarılan bakır alev */}
      <image
        href="/brand/alevsan-flame.png"
        x="190"
        y="23"
        width="150"
        height="291"
        className={mode === "loader" ? "loader-flame" : "emblem-flame"}
      />
    </svg>
  );
}
