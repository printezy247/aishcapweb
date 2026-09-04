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
