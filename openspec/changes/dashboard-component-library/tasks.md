## 1. Mock Data & Component Registry

- [x] 1.1 Create `lib/library/mocks/` directory with typed static mock datasets for every component category (metrics, charts, matrix, workflow, inspection, agents, actions) — no live DB calls
  - *Executed 2026-09-11*: Implemented typed, isolated mock datasets across 7 category modules in `lib/library/mocks/` with barrel export. Zero database dependencies.
- [x] 1.2 Create `lib/library/component-registry.ts` defining `ComponentItem` and `LibraryCategory` types, registering all 30 components with metadata, mock data references, Requirements block (shadcn CLI command, peer installs, import path), and snippet file references
  - *Executed 2026-09-11*: Defined `ComponentItem`, `LibraryCategory`, and registered 32 components across all 7 categories with shadcn CLI requirements, peer dependencies, prop documentation, and copyable snippets.
- [x] 1.3 Write unit tests in `lib/library/__tests__/component-registry.test.ts` verifying every registry entry has a valid mock dataset and matches an existing export in `components/dashboard/`
  - *Executed 2026-09-11*: Created Vitest suite testing all registry items, categories, and verifying 1:1 parity with named exports in `@/components/dashboard`. 5 tests passed.

## 2. Library UI Components

- [x] 2.1 Implement `components/dashboard/library/component-preview-card.tsx` with: per-card React ErrorBoundary with safe fallback, lazy preview via `next/dynamic({ ssr: false })` for chart-heavy components, adaptive min-height contract (charts: 240px, metric cards: 100px), Preview/Code/Props tabs, Requirements block, and clipboard copy button
  - *Executed 2026-09-11*: Created `ComponentPreviewCard` and `CardErrorBoundary` with adaptive min-height, dynamic lazy previews for Recharts and heavy matrix views, three-state tabbed interface, and clipboard actions.
- [x] 2.2 Implement `components/dashboard/library/library-toolbar.tsx` with real-time search input, category filter chips, and view density toggle (grid / list)
  - *Executed 2026-09-11*: Built `LibraryToolbar` with instant text search, 7 category filter chips with badge counts, and grid/list density toggle.
- [x] 2.3 Implement `components/dashboard/library/library-client-view.tsx` composing toolbar, filtered/searched component grid, responsive layout (3-col desktop, 2-col tablet, 1-col mobile), and empty search state
  - *Executed 2026-09-11*: Implemented `LibraryClientView` composing the header banner, toolbar, responsive 3-column grid, and zero-match empty state with filter reset.

## 3. Route & Navigation Integration

- [x] 3.1 Create route page `app/(dashboard)/dashboard/library/page.tsx` rendering `LibraryClientView` with static metadata and no database queries
  - *Executed 2026-09-11*: Created Next.js route page with static metadata and client view orchestration, prerendered cleanly at build time.
- [x] 3.2 Update `components/app-sidebar.tsx` to promote `/dashboard/library` as the master catalog entry, retaining numbered category sub-links as deep-links within the Library group
  - *Executed 2026-09-11*: Updated application sidebar promoting `/dashboard/library` as the primary navigation group target and adding Master Catalog as top link.
- [x] 3.3 Update `app/(dashboard)/layout.tsx` breadcrumb resolution to recognize the Library route and its category deep-links
  - *Executed 2026-09-11*: Created `DashboardBreadcrumb` client component dynamically resolving group and page labels for `/dashboard/library` and category routes.

## 4. Verification & Quality Gates

- [x] 4.1 Write unit test `components/dashboard/library/__tests__/component-preview-card.test.tsx` verifying ErrorBoundary fallback renders on component throw and clipboard copy triggers correctly
  - *Executed 2026-09-11*: Authored Vitest unit tests verifying `CardErrorBoundary` error containment, state reset, HTML output, and clipboard copy triggers. 5 tests passed.
- [x] 4.2 Run deterministic quality gates: `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm foundation:check` with 0 errors
  - *Executed 2026-09-11*: Verified all 4 quality gates: `tsc --noEmit` (0 errors), `vitest run` (9 files, 30 tests passed), `node scripts/foundation-check.js` (all invariants passed), and `next build` (compiled successfully with `/dashboard/library` static route).
