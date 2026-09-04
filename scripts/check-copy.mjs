// Compliance guard: fails the build if any forbidden phrase appears in copy.
// Run with `npm run check:copy`. Extend the lists, never shorten them.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const FORBIDDEN = [
  /\bguaranteed\b/i,
  /\brisk[- ]free\b/i,
  /\bpassive income\b/i,
  /\bfinancial freedom\b/i,
  /\bprofit (daily|weekly|monthly)\b/i,
  // Bahasa Melayu equivalents
  /\bdijamin\b/i,
  /\btanpa risiko\b/i,
  /\bpendapatan pasif\b/i,
  /\bkebebasan kewangan\b/i,
  /\buntung (setiap hari|harian|mingguan|bulanan)\b/i,
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(json|tsx?|html)$/.test(name)) out.push(p);
  }
  return out;
}

let failures = 0;
for (const file of [...walk("src"), "index.html"]) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const re of FORBIDDEN) {
      if (re.test(line)) {
        failures++;
        console.error(`${file}:${i + 1}: forbidden phrase ${re}: ${line.trim()}`);
      }
    }
  });
}

if (failures) {
  console.error(`\n${failures} forbidden phrase(s) found.`);
  process.exit(1);
}
console.log("Copy check passed: no forbidden phrases.");
