// Logodaki dişliden türetilmiş, merkezi (0,0) olan dişli SVG yolu.
// innerR verilirse ortası delinir (fillRule="evenodd" ile kullanılmalı).
export function gearPath({
  teeth = 12,
  rRoot,
  rTip,
  innerR,
}: {
  teeth?: number;
  rRoot: number;
  rTip: number;
  innerR?: number;
}): string {
  const step = (Math.PI * 2) / teeth;
  const rootHalf = step * 0.27;
  const tipHalf = step * 0.17;
  const pt = (r: number, a: number) => `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    d += `${i === 0 ? "M" : "L"}${pt(rRoot, a - rootHalf)} L${pt(rTip, a - tipHalf)} A${rTip} ${rTip} 0 0 1 ${pt(rTip, a + tipHalf)} L${pt(rRoot, a + rootHalf)} A${rRoot} ${rRoot} 0 0 1 ${pt(rRoot, a + step - rootHalf)} `;
  }
  d += "Z";
  if (innerR) d += ` M${innerR} 0 A${innerR} ${innerR} 0 1 0 ${-innerR} 0 A${innerR} ${innerR} 0 1 0 ${innerR} 0 Z`;
  return d;
}
