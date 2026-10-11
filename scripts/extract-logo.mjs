// Logo kaynağından (../AlevsanLogo.jpeg) şeffaf PNG parçalarını üretir.
import sharp from "sharp";
import letters from "../src/lib/emblem-letters.json" with { type: "json" };
const SRC = "../AlevsanLogo.jpeg";
const BG = 18;

const smooth = (lo, hi, v) => { const t = Math.min(1, Math.max(0, (v - lo) / (hi - lo))); return t * t * (3 - 2 * t); };

async function load() {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  return { data, W: info.width, H: info.height, C: info.channels };
}

// rects: alınacak bölgeler; filter: pikseli dahil etme koşulu (ör. sadece bakır)
async function extract(img, box, rects, out, { filter, lo = 48, hi = 125 } = {}) {
  const [bx, by, bw, bh] = box;
  const buf = Buffer.alloc(bw * bh * 4);
  for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
    const X = bx + x, Y = by + y;
    if (!rects.some(([rx, ry, rw, rh]) => X >= rx && X < rx + rw && Y >= ry && Y < ry + rh)) continue;
    const i = (Y * img.W + X) * img.C, r = img.data[i], g = img.data[i + 1], b = img.data[i + 2];
    let a = smooth(lo, hi, Math.max(r, g, b));
    if (filter) a *= filter(r, g, b);
    if (a <= 0.01) continue;
    const un = (c) => Math.min(255, Math.max(0, Math.round((c - (1 - a) * BG) / a)));
    const o = (y * bw + x) * 4;
    buf[o] = un(r); buf[o + 1] = un(g); buf[o + 2] = un(b); buf[o + 3] = Math.round(a * 255);
  }
  const s = sharp(buf, { raw: { width: bw, height: bh, channels: 4 } }).trim({ threshold: 1 });
  const res = await s.png().toBuffer({ resolveWithObject: true });
  await sharp(res.data).toFile(out);
  console.log(out, res.info.width + "x" + res.info.height, "offset", -res.info.trimOffsetLeft + bx, -res.info.trimOffsetTop + by);
  return res;
}

(async () => {
  const img = await load();
  const EMBLEM = [400, 130, 520, 505];
  const WORD = [160, 635, 990, 150];
  const LINE = [160, 785, 990, 20];
  const SUB = [220, 805, 880, 115];
  const SLOGAN = [300, 955, 720, 100];
  const copper = (r, g, b) => smooth(25, 60, r - b);

  await extract(img, EMBLEM, [EMBLEM], "public/brand/alevsan-emblem.png");
  await extract(img, EMBLEM, [EMBLEM], "public/brand/alevsan-flame.png", { filter: copper, lo: 40 });
  await extract(img, WORD, [WORD], "public/brand/alevsan-wordmark.png");
  const logo = await extract(img, [160, 130, 990, 925], [EMBLEM, WORD, LINE, SUB, SLOGAN], "public/brand/alevsan-logo.png");

  // Dişli ortalarına A (sol) ve C (sağ) harfleri. Merkezler ve iç boşluk (r≈79) bu PNG üzerinde ölçüldü.
  const { width: LW, height: LH } = logo.info;
  const s = 1.29; // GearEmblem'deki 1.1 ölçek × (79 / 67.5)
  const letterSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${LW}" height="${LH}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbfbfc"/><stop offset="0.28" stop-color="#c4c4c9"/><stop offset="0.5" stop-color="#7b7b82"/>
      <stop offset="0.68" stop-color="#e6e6ea"/><stop offset="1" stop-color="#8e8e95"/></linearGradient></defs>
    <path d="${letters.left}" transform="translate(367 359) scale(${s})" fill="url(#g)" stroke="#141416" stroke-width="${2 / s}"/>
    <path d="${letters.right}" transform="translate(606 359) scale(${s})" fill="url(#g)" stroke="#141416" stroke-width="${2 / s}"/>
  </svg>`;
  const withLetters = await sharp("public/brand/alevsan-logo.png").composite([{ input: Buffer.from(letterSvg) }]).png().toBuffer();
  await sharp(withLetters).toFile("public/brand/alevsan-logo.png");

  // Uygulama ikonu: amblem, koyu zemin üzerinde kare
  const emblem = await sharp("public/brand/alevsan-emblem.png").resize(420, 420, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: 512, height: 512, channels: 4, background: "#0a0a0b" } })
    .composite([{ input: emblem, gravity: "center" }]).png().toFile("src/app/icon.png");
  await sharp("src/app/icon.png").resize(180, 180).png().toFile("src/app/apple-icon.png");
})();
