#!/usr/bin/env node
// Removes page-level :root and .dark token blocks so a page inherits tokens from the core.
// Usage: node strip-token-blocks.mjs <file.css>
import fs from 'node:fs';

const file = process.argv[2];
if (!file || !fs.existsSync(file)) { console.error('Usage: strip-token-blocks.mjs <file.css>'); process.exit(2); }
const before = fs.readFileSync(file, 'utf8');
let removed = 0;
const after = before.replace(/(^|\n)[ \t]*(?::root|\.dark)[ \t]*\{[^{}]*\}/g, (block, lead) => {
  if (!/--[\w-]+\s*:/.test(block)) return block;
  if (/(^|[;{\s])(?!--)[a-z-]+\s*:/.test(block.replace(/--[\w-]+\s*:[^;]*;/g, '').replace(/^[^{]*\{/, '').replace(/\}$/, ''))) {
    console.error('FAIL token block contains non-token declarations');
    process.exit(1);
  }
  removed++;
  return lead;
});
if (removed !== 2) { console.error(`FAIL expected 2 token blocks, found ${removed}`); process.exit(1); }
fs.writeFileSync(file, after);
console.log(`OK ${file} removed=${removed}`);
