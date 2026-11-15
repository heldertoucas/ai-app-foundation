# Proposal: Canonical Foundation Hardening & Template Replicability

## Why

Following an independent triangulated critical review by Antigravity, Claude Code (Sonnet 4.6), and OpenAI Codex (GPT-6 Luna), the `ai-app-foundation` repository exhibits a fundamental tension: while presentation components (`components/web/*`, `components/ui/*`) demonstrate excellent modularity and styling, the repository suffers from critical architectural discrepancies, broken invariants, and tight domain coupling:

1. **False Invariant Claims**:
   - SQLite WAL mode is claimed in documentation and landing pages, but binary inspection of `prisma/dev.db` reveals `01 01` (rollback journal mode), because `PRAGMA journal_mode=WAL` is never executed during database connection or setup.
   - `FOUNDATION.md` declares "10 Invariants" in its header but lists 12 items.
   - `docs/GOLDEN-PATH.md` contains corrupted/control characters, absolute Windows paths, and directs developers to `localhost:3000`.
2. **Canonical Port Violation (CON-0020)**:
   - Root `package.json` scripts (`dev`, `start`) default to port 3000 (open user testing block), `playwright.config.ts` targets `localhost:3000`, and `README.md` instructs running on 3000. `CON-0020` strictly assigns port 4300 to `ai-app-foundation` (REP-0023 / PRJ-0024).
3. **Security Vulnerabilities & Fragilities in Zero-Build HTML Kit**:
   - `public/html-kit/recipes/datatable-fetch/datatable-fetch.js` injects raw unescaped remote payloads into `element.innerHTML` (XSS vulnerability).
   - `du-dashboard.html` and `du-html-app-template.html` duplicate ~1700 lines of code with only 39 differing lines, each reimplementing inline CSS and runtime scripts rather than leveraging `du-runtime.js` and `tokens.css`.
   - 133 interactive `<button>` tags across HTML templates lack basic accessibility attributes (`aria-label`, `aria-expanded`).
4. **Broken Recipes & Incoherent Technical Docs**:
   - `recipes/postgres/recipe.json` contains corrupted binary data (`data` file type instead of valid JSON).
   - `docs/` contains 68 orphan MDX files cloned directly from `next-forge` (referencing monorepos, Clerk, Supabase, Stripe) that fail compilation and conflict with single-workspace and single-icon invariants.
5. **Data Layer Fragility & Leaked Vault State**:
   - `atlas-actions.ts` lacks validation schemas, using raw type assertions (`as string`, unchecked `parseInt`) vulnerable to `NaN` crashes.
   - `prisma/schema.prisma` hardcodes personal author identity (`owner @default("Helder T.")`).
   - Dynamic DU inspection routes (`/dashboard/inspection`, `/matrix`, `/workflow`, `/metrics`) are pre-rendered statically (`○`), freezing private local Vault state into the build artifact.

## What Changes

1. **Activate Real SQLite WAL Mode**:
   - Execute `PRAGMA journal_mode = WAL;` and `PRAGMA synchronous = NORMAL;` on database initialization in `lib/db.ts` and during `pnpm setup`.
   - Update `scripts/foundation-check.js` to query SQLite directly or inspect header bytes `02 02` to deterministically verify WAL mode.
2. **Enforce Canonical Port 4300 (CON-0020)**:
   - Explicitly configure `-p 4300` in `package.json` (`dev`, `start`).
   - Update `playwright.config.ts`, `README.md`, and documentation to port 4300.
3. **Sanitize HTML Kit & Patch XSS**:
   - Refactor `datatable-fetch.js` to escape text nodes and prevent HTML injection into DOM.
   - Refactor `du-dashboard.html` and `du-html-app-template.html` to import `du-runtime.js` and `tokens.css`, eliminating 1600+ duplicated lines.
   - Add baseline `aria-label` and `aria-expanded` attributes across HTML templates.
4. **Repair Recipes & Reconcile Invariants**:
   - Restore `recipes/postgres/recipe.json` as valid JSON schema matching the canonical recipe contract.
   - Fix invariant header in `FOUNDATION.md` to reflect all 12 non-negotiable invariants.
   - Clean up control characters and outdated port references in `docs/GOLDEN-PATH.md`.
5. **Harden Server Actions & Normalize Prisma Schema**:
   - Add input validation schema to `atlas-actions.ts` to guard numeric parsing, string length, and required fields.
   - Change `owner @default("Helder T.")` to `owner @default("Developer")` in `prisma/schema.prisma` and synchronize schema.
6. **Force Dynamic Rendering for Vault-Dependent Routes**:
   - Add `export const dynamic = 'force-dynamic'` to routes reading DU adapters (`inspection`, `matrix`, `workflow`, `metrics`) to prevent baking private local file states into production build artifacts.
7. **Clean Orphan Next-Forge Docs**:
   - Sanitize `docs/` by removing broken third-party next-forge files and aligning documentation with the lean single-app foundation architecture.

## Capabilities

### New Capabilities
- `canonical-foundation-hardening`: End-to-end alignment with Development Universe invariants, real SQLite WAL persistence, deterministic port binding (4300), XSS-free zero-build HTML kit, and validated server actions.

## Impact
- Files changed:
  - `package.json`
  - `playwright.config.ts`
  - `lib/db.ts`
  - `scripts/foundation-check.js`
  - `FOUNDATION.md`
  - `README.md`
  - `prisma/schema.prisma`
  - `app/(dashboard)/dashboard/atlas-actions.ts`
  - `app/(dashboard)/dashboard/inspection/page.tsx`
  - `app/(dashboard)/dashboard/matrix/page.tsx`
  - `app/(dashboard)/dashboard/workflow/page.tsx`
  - `app/(dashboard)/dashboard/metrics/page.tsx`
  - `public/html-kit/recipes/datatable-fetch/datatable-fetch.js`
  - `public/html-kit/templates/du-dashboard.html`
  - `public/html-kit/templates/du-html-app-template.html`
  - `recipes/postgres/recipe.json`
  - `docs/`
- Zero new runtime packages added.
- Full compatibility with existing unit test suite and Next.js 16 build.
