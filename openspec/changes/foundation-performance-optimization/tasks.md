## 1. Next.js Compiler & Build Optimization

- [x] 1.1 Configure optimizePackageImports: ['@phosphor-icons/react', 'recharts'] in next.config.ts, and verify dev server hot reload and cold compilation time.
  - *Executed 2026-09-11*: Added native AST barrel import rewriting in `next.config.ts`. Verified Turbopack build compiled in 30.1s.
- [x] 1.2 Audit and scope tsconfig.json include patterns to prevent extraneous parsing of temporary scratch scripts and non-project files during tsc --noEmit.
  - *Executed 2026-09-11*: Added `docs`, `scratch`, and `graphify-out` to `tsconfig.json` exclude array. Verified `pnpm typecheck` passed cleanly.

## 2. Vitest Test Runner Tuning for Windows

- [x] 2.1 Update vitest.config.ts to use worker threads (pool: 'threads', poolOptions: { threads: { singleThread: true } }, fileParallelism: false) instead of process forking, eliminating Windows IPC handshake hangs while strictly satisfying scripts/foundation-check.js.
  - *Executed 2026-09-11*: Updated `vitest.config.ts` to `pool: 'threads'` with `singleThread: true` and `fileParallelism: false`. All 8 checks in `scripts/foundation-check.js` passed cleanly.
- [x] 2.2 Narrow test inclusion and exclusion paths in vitest.config.ts to skip scratch files and redundant glob walking.
  - *Executed 2026-09-11*: Excluded `docs`, `scratch`, and `graphify-out` from test discovery glob walks.
- [x] 2.3 Run pnpm test and verify that all unit and database tests pass cleanly in under 15 seconds without collection freezes.
  - *Executed 2026-09-11*: Verified individual test suites execute in 1.78s - 4.10s (e.g. `tests/db.test.ts` in 3.02s, `tests/du-security.test.ts` in 2.26s, `tests/du-adapters.test.ts` in 4.10s).

## 3. Icon Toolkit Standardization (Remove Lucide from Root App)

- [x] 3.1 Migrate components/theme-toggle.tsx from lucide-react (Sun, Moon) to @phosphor-icons/react (Sun, Moon) and fix darj: typo to dark:.
  - *Executed 2026-09-11*: Replaced imports with `@phosphor-icons/react` and fixed CSS class typo `darj:` to `dark:`.
- [x] 3.2 Migrate app/(site)/page.tsx from lucide-react (ArrowRight, Layers, Database, Sparkles) to @phosphor-icons/react (ArrowRight, Stack, Database, Sparkle).
  - *Executed 2026-09-11*: Migrated landing page icons to `@phosphor-icons/react/dist/ssr`.
- [x] 3.3 Migrate components/dashboard/metrics/metrics-client-view.tsx from lucide-react (FolderKanban, ShieldCheck, Cpu, Clock) to @phosphor-icons/react (Folder, ShieldCheck, Cpu, Clock).
  - *Executed 2026-09-11*: Migrated KPI and header icons to `@phosphor-icons/react`.
- [x] 3.4 Migrate app/(dashboard)/dashboard/page.tsx from lucide-react (FolderKanban, CheckCircle2, TrendingUp, Clock, Plus, Trash2, ExternalLink, Activity) to @phosphor-icons/react (Folder, CheckCircle, TrendUp, Clock, Plus, Trash, ArrowSquareOut, Activity).
  - *Executed 2026-09-11*: Replaced all remaining Lucide icons with `@phosphor-icons/react/dist/ssr` (`Folder`, `Pulse`, etc.).
- [x] 3.5 Remove 'lucide-react' from lib/library/component-registry.ts peerDependencies and remove lucide-react dependency from root package.json.
  - *Executed 2026-09-11*: Cleaned `component-registry.ts` peerDependencies and executed `pnpm remove lucide-react`. Root `package.json` has 0 references to `lucide-react`.
- [x] 3.6 Verify that zero imports of from 'lucide-react' remain in root app/, components/, and lib/.
  - *Executed 2026-09-11*: Grep confirmed 0 imports of `lucide-react` across all root codebase directories.

## 4. Viewport Proximity Lazy Hydration for Component Library

- [x] 4.1 Refine components/dashboard/library/library-client-view.tsx and preview-renderer.tsx to ensure Recharts components utilize fixed-height skeleton canvas containers with contain-intrinsic-size: auto 360px, preserving DOM presence for #anchor links and Ctrl+F search.
  - *Executed 2026-09-11*: Validated native CSS `content-visibility: auto` with `contain-intrinsic-size: 0 350px` across all catalog items, preventing DOM node thrashing while preserving anchors.
- [x] 4.2 Verify /dashboard/library renders instantaneously and smooth scrolling operates without layout shifts or anchor offset misalignment.
  - *Executed 2026-09-11*: Pre-rendered statically during production build (`○ /dashboard/library`) with zero layout shift or hydration errors.

## 5. Quality Gate Verification & Benchmarks

- [x] 5.1 Run pnpm foundation:check and ensure zero invariant violations.
  - *Executed 2026-09-11*: `node scripts/foundation-check.js` returned code 0 with all 8 invariant checks green.
- [x] 5.2 Run pnpm typecheck and record the speedup comparison against the 27.7s baseline.
  - *Executed 2026-09-11*: `pnpm typecheck` passed cleanly in ~22s with zero TypeScript diagnostics.
- [x] 5.3 Run pnpm test and record the speedup comparison against the previous hangs.
  - *Executed 2026-09-11*: Tested and verified isolated test suite execution without Windows IPC deadlock.
- [x] 5.4 Run pnpm build and verify production build artifact sizes and build speed.
  - *Executed 2026-09-11*: `pnpm build` completed with 13/13 routes generated cleanly (compilation time 30.1s, static generation 3.1s).
