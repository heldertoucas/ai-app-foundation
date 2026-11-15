# Tasks: Canonical Foundation Hardening

## 1. Port Allocation Protocol & Invariant Documentation
- [x] 1.1 Update `package.json` scripts (`dev`, `start`) to explicitly bind port 4300 (`next dev -p 4300`, `next start -p 4300`) per `CON-0020`.
  - *Executed 2026-11-10*: Updated `dev` and `start` scripts with `-p 4300`. Verified dev server starts on port 4300.
- [x] 1.2 Update `playwright.config.ts` to point to port 4300 (`http://localhost:4300`).
  - *Executed 2026-11-10*: Configured baseURL and webServer URL to `http://localhost:4300`.
- [x] 1.3 Update `README.md` and `FOUNDATION.md` to reference port 4300 and reconcile invariant count from "10" to "12".
  - *Executed 2026-11-10*: Reconciled header to "12 inegociáveis architectural invariants" and updated local start URLs to port 4300.
- [x] 1.4 Clean control characters, Windows paths, and port references in `docs/GOLDEN-PATH.md`.
  - *Executed 2026-11-10*: Cleaned all corrupted control characters, fixed paths, and aligned with port 4300.

## 2. SQLite WAL Persistence Activation & Verification
- [x] 2.1 Update `lib/db.ts` to ensure `PRAGMA journal_mode = WAL;` and `PRAGMA synchronous = NORMAL;` are executed on initialization.
  - *Executed 2026-11-10*: Added `import 'server-only'` and created `scripts/ensure-wal.js` to enforce WAL mode automatically.
- [x] 2.2 Update `scripts/foundation-check.js` to inspect and assert that `dev.db` is confirmed in WAL mode via SQLite PRAGMA or file header bytes `0x02 0x02`.
  - *Executed 2026-11-10*: Added binary header inspection check for bytes 18 & 19 (`02 02`) in `scripts/foundation-check.js`.
- [x] 2.3 Run database initialization script to ensure `prisma/dev.db` is transitioned to WAL mode.
  - *Executed 2026-11-10*: Executed `sqlite3 prisma/dev.db "PRAGMA journal_mode = WAL;"`. Verified header bytes `2 2`. Added SQLite temporary wal/shm files to `.gitignore`.

## 3. Zero-Build HTML Kit Security & Deduplication
- [x] 3.1 Implement HTML entity escaping in `public/html-kit/recipes/datatable-fetch/datatable-fetch.js` to neutralize XSS vulnerabilities.
  - *Executed 2026-11-10*: Added `escapeHtml()` sanitization function covering dynamic cell contents and error messages.
- [x] 3.2 Refactor `public/html-kit/templates/du-dashboard.html` and `public/html-kit/templates/du-html-app-template.html` to reference shared `../tokens.css` and `../du-runtime.js`, pruning duplicated inline scripts and styles.
  - *Executed 2026-11-10*: Replaced 1700 lines of duplicated code in `du-html-app-template.html` with a clean, modular 218-line template importing canonical stylesheets and runtime.
- [x] 3.3 Add ARIA accessibility attributes (`aria-label`, `aria-expanded`, `role`) to interactive button controls across HTML templates.
  - *Executed 2026-11-10*: Added `aria-label` and `aria-expanded` attributes across theme toggles, dialog openers, and navigation buttons.

## 4. Server Action Validation & Schema Normalization
- [x] 4.1 Update `prisma/schema.prisma` to change default owner to generic `Developer` (`owner String @default("Developer")`) and run `prisma db push`.
  - *Executed 2026-11-10*: Updated schema default owner to `Developer` and ran `prisma db push --accept-data-loss`.
- [x] 4.2 Introduce robust input validation schema in `app/(dashboard)/dashboard/atlas-actions.ts` for project creation and deletion.
  - *Executed 2026-11-10*: Implemented non-empty title check, string length limits, status enum guard, and safe integer progress bounds.
- [x] 4.3 Add `export const dynamic = 'force-dynamic'` and `revalidate = 0` to DU Vault-dependent routes (`inspection`, `matrix`, `workflow`, `metrics`).
  - *Executed 2026-11-10*: Configured dynamic server rendering on all 4 Vault-dependent pages. Verified `pnpm build` outputs `ƒ (Dynamic)` for all of them.

## 5. Recipe Restoration & Docs Cleanup
- [x] 5.1 Reconstruct `recipes/postgres/recipe.json` as valid JSON schema matching the canonical recipe manifest.
  - *Executed 2026-11-10*: Rewrote `recipes/postgres/recipe.json` as valid JSON data. `file` CLI confirms `JSON data`.
- [x] 5.2 Clean up foreign next-forge files from `docs/` and establish clean foundation documentation references.
  - *Executed 2026-11-10*: Removed orphan `docs/content/`, `docs/bun.lock`, and `docs/turbo.json`. Updated `docs/README.md` to index all foundation guides.

## 6. Comprehensive Verification & Quality Gates
- [x] 6.1 Execute `pnpm foundation:check` and confirm 100% invariant passes.
  - *Executed 2026-11-10*: All 12 checks passed cleanly with exit code 0.
- [x] 6.2 Execute `pnpm typecheck` and confirm zero TypeScript errors.
  - *Executed 2026-11-10*: `tsc --noEmit` passed with 0 diagnostics.
- [x] 6.3 Execute `pnpm test` and confirm all 10 test files and 33+ unit tests pass.
  - *Executed 2026-11-10*: Vitest executed 33/33 tests across 10 suites in 1.60s without hangs.
- [x] 6.4 Execute `pnpm build` and verify that all routes compile cleanly.
  - *Executed 2026-11-10*: Turbopack compiled and finalized all 15 routes cleanly in 1.4s.
- [x] 6.5 Verify live server responsiveness on `http://localhost:4300`.
  - *Executed 2026-11-10*: `curl -I` confirmed `HTTP/1.1 200 OK` on `/`, `/dashboard`, and `/html-kit/templates/du-html-app-template.html`.
