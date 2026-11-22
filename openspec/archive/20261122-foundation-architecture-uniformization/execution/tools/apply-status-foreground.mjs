#!/usr/bin/env node
// Moves status TEXT to --status-*-foreground. Backgrounds, strokes and fills are left alone.
// Usage: node apply-status-foreground.mjs <file> [...]
import fs from 'node:fs';

const CHIPS = { live: '0.72 0.17 150', drift: '0.78 0.16 75', missing: '0.65 0.22 25' };
let failed = false;
for (const file of process.argv.slice(2)) {
  if (!fs.existsSync(file)) { console.error(`FAIL missing ${file}`); failed = true; continue; }
  const before = fs.readFileSync(file, 'utf8');
  let count = 0;
  let after = before.replace(/(?<![-\w])color:\s*var\(--status-(live|drift|missing|unsupported)\)/g, (_, s) => { count++; return `color: var(--status-${s}-foreground)`; });
  for (const [status, value] of Object.entries(CHIPS)) {
    const literal = new RegExp(`(\\.du-status-chip-${status}\\.active\\s*\\{)[^}]*oklch\\(${value.replaceAll('.', '\\.')}[^}]*\\}`);
    after = after.replace(literal, (_, open) => {
      count++;
      return `${open}\n  background-color: color-mix(in oklch, var(--status-${status}) 18%, transparent);\n  color: var(--status-${status}-foreground);\n  border-color: color-mix(in oklch, var(--status-${status}) 40%, transparent);\n}`;
    });
  }
  if (after !== before) fs.writeFileSync(file, after);
  console.log(`OK ${file} replacements=${count}`);
}
process.exit(failed ? 1 : 0);
