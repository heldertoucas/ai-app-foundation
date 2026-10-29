## Context

ai-app-foundation provides 7 distinct categories of dashboard components in `components/dashboard/`. While individual showcase routes exist, there is no unified design system explorer that serves as a master index and developer reference. The AI Council review identified four critical gaps: lazy loading for bundle control, per-card error boundaries for resilience, isolated mock data for DX, and sidebar IA consolidation.

## Goals / Non-Goals

**Goals:**
- Promote `/dashboard/library` as the master catalog index, resolving the current sidebar nav fragmentation.
- Provide interactive live previews using static isolated mock data from `lib/library/mocks/`.
- Offer copyable JSX/TypeScript snippets with dependency documentation (shadcn CLI commands, peer packages, import statements).
- Wrap every preview in a per-card `ErrorBoundary` to prevent cascading failures.
- Lazy-load chart-heavy and DOM-intensive components via `next/dynamic({ ssr: false })` to prevent SSR hydration mismatches and bundle bloat.
- Maintain responsive layout: 3-column desktop, 2-column tablet, 1-column mobile; hide live Preview tab on viewports < 640px.
- Follow FOUNDATION.md invariants: zero monorepo overhead, single UI system (shadcn/ui), strict typecheck.

**Non-Goals:**
- External npm package publishing (components remain local templates to copy).
- Dynamic runtime code transpilation or in-browser component execution.
- Live database data in previews (all previews use static mocks).

## Decisions

### Decision 1: /dashboard/library as Master Catalog Hub
- **Choice**: Promote `/dashboard/library` as the primary entry point for all component navigation. Individual routes (`/dashboard/metrics`, etc.) are kept as deep-links but no longer the primary sidebar navigation targets.
- **Rationale**: Eliminates conflicting navigation hierarchies identified by the AI Council UI/UX persona. Developers get one place to discover all archetypes.

### Decision 2: Static Component Registry with Colocated Snippets
- **Choice**: Define `lib/library/component-registry.ts` with entries holding metadata, mock data references, and snippet imports. Snippets are maintained as separate `*.snippet.ts` files colocated with each component.
- **Rationale**: Colocated snippets are independently updatable and can be linted/type-checked, preventing the drift problem identified by the Architect persona.

### Decision 3: Per-Card ErrorBoundary + next/dynamic Lazy Loading
- **Choice**: Every `ComponentPreviewCard` wraps its preview in a React `ErrorBoundary`. Chart-heavy components use `next/dynamic(() => import(...), { ssr: false })`.
- **Rationale**: Prevents SSR hydration mismatches (Recharts, matrix heatmap) and stops a single crashed preview from white-screening the entire Library page.

### Decision 4: Isolated Mock Data in lib/library/mocks/
- **Choice**: All component preview mock data lives in `lib/library/mocks/` as typed constant exports. The registry references these — zero live DB calls on the Library page.
- **Rationale**: The Library must work on a fresh checkout without database seeding. Required by FOUNDATION.md local-first principle.

### Decision 5: Requirements Block per Component Card
- **Choice**: Each `ComponentPreviewCard` renders a "Requirements" section showing: shadcn CLI command, pnpm peer installs, and the full import path.
- **Rationale**: Core DX gap identified by the Product & Resilience Engineer. Without this, developers copy JSX but silently fail because `shadcn add card` was never run.

### Decision 6: Adaptive Preview Height & Mobile Responsiveness
- **Choice**: Chart components render in a 240px min-height preview container; KPI/metric cards use 100px min-height. Preview tab is hidden on viewports < 640px.
- **Rationale**: Prevents broken chart renders on mobile where ResizeObserver and SVG viewports behave differently.

## Risks / Trade-offs

- **[Risk]** Registry snippets drift from actual component prop signatures over time.
  → *Mitigation*: Vitest snapshot test comparing snippet type-checks via `ts-morph` or at minimum comparing expected prop names between registry and component exports.
- **[Risk]** Large number of categories makes page feel overwhelming.
  → *Mitigation*: Category filter chips provide instant one-click scoping; search narrows within current category.

## Migration Plan

1. Create `lib/library/mocks/` with typed mock datasets for all 7 component categories.
2. Create `lib/library/component-registry.ts` wiring metadata, mocks, and snippet imports.
3. Build library UI primitives (`ComponentPreviewCard` with ErrorBoundary, `LibraryToolbar`, `LibraryClientView`).
4. Create route `app/(dashboard)/dashboard/library/page.tsx`.
5. Update `components/app-sidebar.tsx` to consolidate navigation under Library hub.
6. Run quality gates: `pnpm typecheck && pnpm test && pnpm build && pnpm foundation:check`.
