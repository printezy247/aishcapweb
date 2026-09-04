// One-off: turn public/images/aish-portrait.jpg into the two head-and-shoulders
// crops the site uses. Run: node scripts/crop-portrait.mjs [--top 0.05 --height 0.48 --cx 0.5]
//
// The crop is a square taken from the upper part of the frame (where the head
// and shoulders are), centred horizontally on --cx. Adjust the flags if the
// face sits elsewhere. The original is not deployed.
import sharp from "sharp";
import { existsSync } from "node:fs";

const SRC = "public/images/aish-portrait.jpg";
if (!existsSync(SRC)) {
  console.error(`Missing ${SRC}. Upload the original photo there first.`);
  process.exit(1);
}

const arg = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? Number(process.argv[i + 1]) : dflt;
};
const top = arg("top", 0.05); // fraction of height where the crop starts
const height = arg("height", 0.48); // fraction of height the crop covers
const cx = arg("cx", 0.5); // horizontal centre as fraction of width

const meta = await sharp(SRC).rotate().metadata();
const side = Math.round(Math.min(meta.height * height, meta.width));
const left = Math.max(0, Math.min(meta.width - side, Math.round(meta.width * cx - side / 2)));
const y = Math.max(0, Math.min(meta.height - side, Math.round(meta.height * top)));

for (const size of [800, 400]) {
  await sharp(SRC)
    .rotate()
    .extract({ left, top: y, width: side, height: side })
    .resize(size, size)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`public/images/aish-portrait-${size}.jpg`);
  console.log(`wrote public/images/aish-portrait-${size}.jpg`);
}
