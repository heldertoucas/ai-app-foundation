#!/usr/bin/env node
// Moves inline <style>, <script>, style="" and on*="" out of HTML so the page works under a strict CSP.
// Usage: node externalize-html.mjs [--csp] [--add-runtime=<relative-path>] <file.html> [...]
// Writes <name>.css and <name>.js beside each page. Exits 1, changing nothing for that file, on anything it cannot convert.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const CSP = "default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; object-src 'none'";
const BLOCK = /(<script\b[^>]*>[\s\S]*?<\/script\s*>|<style\b[^>]*>[\s\S]*?<\/style\s*>|<!--[\s\S]*?-->)/gi;
const TAG = /<([a-zA-Z][\w:-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/g;
const ATTR = /([^\s=>/]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]+))?/g;
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const encode = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function splitTopLevel(src, sep) {
  const out = []; let cur = '', quote = null, depth = 0;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quote) { cur += c; if (c === '\\') { cur += src[++i] ?? ''; } else if (c === quote) quote = null; continue; }
    if (c === "'" || c === '"' || c === '`') { quote = c; cur += c; continue; }
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth--;
    if (c === sep && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  if (cur.trim()) out.push(cur);
  return out.map((x) => x.trim()).filter(Boolean);
}

function parseArg(a) {
  if (a === 'this') return { $this: true };
  if (a === 'true') return true;
  if (a === 'false') return false;
  if (a === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(a)) return Number(a);
  const m = a.match(/^(['"])([\s\S]*)\1$/);
  if (m) return m[2].replace(/\\(['"\\])/g, '$1').replace(/\\n/g, '\n');
  throw new Error(`unsupported handler argument: ${a}`);
}

function parseHandler(code) {
  return splitTopLevel(code, ';').map((stmt) => {
    let m;
    if ((m = stmt.match(/^document\.getElementById\((['"])([^'"]+)\1\)\.close\(\)$/))) return ['duCloseModal', [m[2]]];
    if ((m = stmt.match(/^document\.getElementById\((['"])([^'"]+)\1\)\.showModal\(\)$/))) return ['duOpenModal', [m[2]]];
    if ((m = stmt.match(/^this\.closest\((['"])([^'"]+)\1\)\.close\(\)$/))) return ['duCloseClosest', [{ $this: true }, m[2]]];
    if ((m = stmt.match(/^([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)?)\(([\s\S]*)\)$/))) return [m[1], splitTopLevel(m[2], ',').map(parseArg)];
    throw new Error(`unsupported handler statement: ${stmt}`);
  });
}

export function transform(source, name, opts = {}) {
  const classes = new Map(); const actions = new Set(); const css = []; const js = [];
  let sawStyle = false, sawScript = false, styleAttrs = 0, handlers = 0;

  const markup = (seg) => seg.replace(TAG, (full, tag, attrs, selfClose) => {
    if (!/\s(style|on[a-z]+)\s*=/i.test(attrs)) return full;
    const kept = []; let cls = null; const add = []; const data = {};
    for (const m of attrs.matchAll(ATTR)) {
      const k = m[1]; const raw = m[2]; const value = raw === undefined ? null : decode(raw.replace(/^["']|["']$/g, ''));
      const lower = k.toLowerCase();
      if (lower === 'class') { cls = value; continue; }
      if (lower === 'style') {
        styleAttrs++;
        const norm = value.trim().replace(/;\s*$/, '').replace(/\s*;\s*/g, '; ').replace(/\s+/g, ' ');
        if (norm) { if (!classes.has(norm)) classes.set(norm, `x-s${classes.size + 1}`); add.push(classes.get(norm)); }
        continue;
      }
      if (/^on[a-z]+$/.test(lower)) {
        const event = lower.slice(2);
        if (!['click', 'input'].includes(event)) throw new Error(`unsupported event: ${lower}`);
        handlers++;
        const steps = parseHandler(value);
        steps.forEach(([fn]) => actions.add(fn));
        data[`data-du-on-${event}`] = JSON.stringify(steps);
        continue;
      }
      kept.push(raw === undefined ? k : `${k}=${raw}`);
    }
    if (cls !== null || add.length) kept.unshift(`class="${encode([cls, ...add].filter(Boolean).join(' '))}"`);
    for (const [k, v] of Object.entries(data)) kept.push(`${k}="${encode(v)}"`);
    return `<${tag}${kept.length ? ' ' + kept.join(' ') : ''}${selfClose ? ' /' : ''}>`;
  });

  let out = source.split(BLOCK).map((seg, i) => {
    if (i % 2 === 0) return markup(seg);
    if (seg.startsWith('<!--')) return seg;
    if (/^<style/i.test(seg)) {
      css.push(seg.replace(/^<style\b[^>]*>/i, '').replace(/<\/style\s*>$/i, ''));
      if (sawStyle) return '';
      sawStyle = true; return `<link rel="stylesheet" href="${name}.css">`;
    }
    const open = seg.match(/^<script\b[^>]*>/i)[0];
    if (/\ssrc\s*=/.test(open)) return seg;
    const type = (open.match(/\stype\s*=\s*["']([^"']+)/i) || [])[1];
    if (type && !/javascript/i.test(type)) return seg;
    if (type === 'module') throw new Error('inline module scripts do not work from file://');
    if (sawScript) throw new Error('more than one inline script');
    js.push(seg.replace(/^<script\b[^>]*>/i, '').replace(/<\/script\s*>$/i, ''));
    sawScript = true; return `<script src="${name}.js"></script>`;
  }).join('');

  const builtin = new Set(['duToggleTheme', 'duOpenModal', 'duCloseModal', 'duCloseClosest', 'duSwitchView', 'duActivateTab']);
  const custom = [...actions].filter((a) => !builtin.has(a)).sort();
  if (custom.length) {
    const entries = custom.map((a) => {
      if (a === 'alert') return `  'alert': (...args) => window.alert(...args),`;
      const owner = a.split('.')[0];
      return `  ${JSON.stringify(a)}: (...args) => (typeof ${owner} !== 'undefined' ? ${a}(...args) : console.error('Missing action: ${a}')),`;
    });
    js.push(`\n/* Generated action registry: replaces inline event handlers. */\nwindow.duActions = Object.assign(window.duActions || {}, {\n${entries.join('\n')}\n});\n`);
    if (!sawScript) { out = out.replace(/<\/body>/i, `<script src="${name}.js"></script>\n</body>`); sawScript = true; }
  }
  if (classes.size) {
    const rules = [...classes].map(([decl, c]) => `.${c}.${c}.${c} { ${decl}; }`);
    css.push(`\n/* Generated from inline style attributes. Triple class keeps inline-like priority, and JS style changes still win. */\n${rules.join('\n')}\n`);
    if (!sawStyle) { out = out.replace(/<\/head>/i, `<link rel="stylesheet" href="${name}.css">\n</head>`); sawStyle = true; }
  }
  if (opts.addRuntime) out = out.replace(/<\/head>/i, `<script src="${opts.addRuntime}" defer></script>\n</head>`);
  if (opts.csp && !/Content-Security-Policy/i.test(out)) {
    const tag = `<meta http-equiv="Content-Security-Policy" content="${CSP}">`;
    if (!/<meta\s+charset=[^>]*>/i.test(out)) throw new Error('missing <meta charset>');
    out = out.replace(/(<meta\s+charset=[^>]*>)/i, `$1\n  ${tag}`);
  }
  return { html: out, css: css.join('\n'), js: js.join('\n'), stats: { styleAttrs, uniqueStyles: classes.size, handlers, actions: custom } };
}

if (process.argv[1] && import.meta.url === pathToFileURL(fs.realpathSync(process.argv[1])).href) {
  const args = process.argv.slice(2); const files = args.filter((a) => !a.startsWith('--'));
  const opts = { csp: args.includes('--csp'), addRuntime: (args.find((a) => a.startsWith('--add-runtime=')) || '').split('=')[1] };
  if (!files.length) { console.error('Usage: externalize-html.mjs [--csp] [--add-runtime=path] <file.html>...'); process.exit(2); }
  let failed = false;
  for (const f of files) {
    try {
      const name = path.basename(f, '.html'); const dir = path.dirname(f);
      for (const ext of ['css', 'js']) if (fs.existsSync(path.join(dir, `${name}.${ext}`))) throw new Error(`${name}.${ext} already exists`);
      const r = transform(fs.readFileSync(f, 'utf8'), name, opts);
      if (r.css) fs.writeFileSync(path.join(dir, `${name}.css`), r.css);
      if (r.js) fs.writeFileSync(path.join(dir, `${name}.js`), r.js);
      fs.writeFileSync(f, r.html);
      console.log(`OK ${f} ${JSON.stringify(r.stats)}`);
    } catch (e) { failed = true; console.error(`FAIL ${f}: ${e.message}`); }
  }
  process.exit(failed ? 1 : 0);
}
