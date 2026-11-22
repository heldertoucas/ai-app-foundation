#!/usr/bin/env node
// Snaps rem font sizes to the canonical scale. Sizes of 3rem and above are display sizes and stay unchanged.
// Usage: node normalize-font-sizes.mjs <file.css> [...]
import fs from 'node:fs';

const SCALE = [0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.875, 2.25, 3];
const nearest = (value) => SCALE.reduce((best, step) => {
  const a = Math.abs(step - value); const b = Math.abs(best - value);
  return a < b || (a === b && step > best) ? step : best;
});
let failed = false;
for (const file of process.argv.slice(2)) {
  if (!fs.existsSync(file)) { console.error(`FAIL missing ${file}`); failed = true; continue; }
  const before = fs.readFileSync(file, 'utf8');
  let count = 0;
  const after = before.replace(/font-size:\s*([\d.]+)rem/g, (match, raw) => {
    const value = Number(raw);
    if (value >= 3 || SCALE.includes(value)) return match;
    count++;
    return `font-size: ${value < 0.75 ? 0.75 : nearest(value)}rem`;
  });
  if (after !== before) fs.writeFileSync(file, after);
  console.log(`OK ${file} replacements=${count}`);
}
process.exit(failed ? 1 : 0);
