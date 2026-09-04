// One-off: build the deployed brand assets from the masters in /brand.
// Run: node scripts/prepare-brand-assets.mjs
//   brand/logo-master.png    -> public/images/logo.png (800w, alpha kept)
//   brand/source-window.jpg  -> public/images/aish-portrait-{800,400}.jpg (square, head & shoulders)
//   brand/source-laptop.jpg  -> public/images/aish-laptop-{900,450}.jpg (4:5)
// The masters and the reference photos in /brand are never deployed.
import sharp from "sharp";

const out = "public/images";

// Logo: keep transparency, trim empty edges, resize.
await sharp("brand/logo-master.png").trim().resize({ width: 800 }).png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(`${out}/logo.png`);
console.log("logo.png");

// Window portrait: square crop around head, shoulders and phone. Source 1440x2560.
{
  const src = sharp("brand/source-window.jpg").rotate();
  const { width, height } = await src.metadata();
  const side = width; // full width
  const top = Math.min(height - side, Math.round(height * 0.36));
  for (const size of [800, 400]) {
    await sharp("brand/source-window.jpg").rotate().extract({ left: 0, top, width: side, height: side })
      .resize(size, size).jpeg({ quality: 82, mozjpeg: true }).toFile(`${out}/aish-portrait-${size}.jpg`);
    console.log(`aish-portrait-${size}.jpg`);
  }
}

// Laptop on the sofa, city window: 4:5 crop keeping the towers and the laptop. Source 1440x2560.
{
  const { width, height } = await sharp("brand/source-laptop.jpg").rotate().metadata();
  const w = width, h = Math.round(width * 1.25);
  const top = Math.min(height - h, Math.round(height * 0.24));
  for (const size of [900, 450]) {
    await sharp("brand/source-laptop.jpg").rotate().extract({ left: 0, top, width: w, height: h })
      .resize(size, Math.round(size * 1.25)).jpeg({ quality: 82, mozjpeg: true }).toFile(`${out}/aish-laptop-${size}.jpg`);
    console.log(`aish-laptop-${size}.jpg`);
  }
}

// Social preview 1200×630 and PWA / iOS icons.
{
  const W = 1200, H = 630;
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0C1E42"/><stop offset="0.6" stop-color="#061229"/><stop offset="1" stop-color="#030B1C"/></linearGradient>
      <linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop offset="0.35" stop-color="#D4A017" stop-opacity="0"/><stop offset="0.5" stop-color="#F5D061" stop-opacity="0.16"/><stop offset="0.65" stop-color="#D4A017" stop-opacity="0"/></linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#8FA3C4" stroke-opacity="0.08"/></pattern>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <rect width="${W}" height="${H}" fill="url(#s)"/>
    <rect x="0" y="${H - 6}" width="${W}" height="6" fill="#D4A017"/>
    <text x="${W / 2}" y="${H - 96}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="30" fill="#E8E8E8">Copy trading, built in public. Every figure shown.</text>
    <text x="${W / 2}" y="${H - 52}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="20" fill="#8FA3C4">aishweb-ezy-ai.vercel.app</text>
  </svg>`);
  const logo = await sharp("brand/logo-master.png").trim().resize({ width: 640 }).png().toBuffer();
  const lm = await sharp(logo).metadata();
  await sharp(bg).composite([{ input: logo, left: Math.round((W - lm.width) / 2), top: Math.round((H - 120 - lm.height) / 2) }])
    .png({ compressionLevel: 9 }).toFile(`${out}/../og-image.png`);
  console.log("og-image.png");
  for (const [size, name] of [[180, "apple-touch-icon.png"], [192, "icon-192.png"], [512, "icon-512.png"]]) {
    await sharp("public/favicon.svg", { density: 384 }).resize(size, size).png().toFile(`public/${name}`);
    console.log(name);
  }
}

// AVIF + WebP variants of the photographs (served via <picture>).
for (const base of ["aish-portrait-800", "aish-portrait-400", "aish-laptop-900", "aish-laptop-450"]) {
  await sharp(`${out}/${base}.jpg`).avif({ quality: 55 }).toFile(`${out}/${base}.avif`);
  await sharp(`${out}/${base}.jpg`).webp({ quality: 80 }).toFile(`${out}/${base}.webp`);
  console.log(`${base}.avif/.webp`);
}
