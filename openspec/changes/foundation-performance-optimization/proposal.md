## Why

The ai-app-foundation framework serves as the reusable starter template for downstream AI agent applications (such as du-dashboard and rulesync-explorer). However, empirical benchmarks on developer workstations reveal severe performance bottlenecks:
1. Dev Server & Compilation: Cold start takes 50.9 seconds, and compiling /dashboard/library on first hit times out (>30s) due to Turbopack parsing unoptimized barrel graphs across 1,500+ icons and heavy D3/Recharts modules.
2. Automated Test Hangs on Windows: pnpm test spends 40–80 seconds in process forking and IPC handshakes (pool: 'forks', singleFork: true), frequently freezing during test collection on Windows even though individual unit tests execute in ~6 seconds.
3. Dual Icon Toolkit Redundancy: The codebase imports both @phosphor-icons/react and lucide-react, inflating the node_modules footprint and duplicating AST parsing overhead during pnpm typecheck (27.7s) and next build (35.4s).
4. Client-Side Catalog Memory Pressure: The single-page /dashboard/library catalog attempts to render 32 interactive components simultaneously, causing significant DOM/SVG layout calculation overhead and high memory consumption (~916 MB per worker).

Optimizing these four areas now ensures that all downstream applications inherit a fast, lightweight, and responsive development and runtime experience.

## What Changes

- Next.js Compiler Optimization (next.config.ts):
  - Add optimizePackageImports: ['@phosphor-icons/react', 'recharts'] to enable native compiler-level direct import rewriting without manual code refactoring.
- Vitest Windows Test Runner Optimization (vitest.config.ts):
  - Decouple pure unit/component tests (lib/__tests__, components/__tests__) to run concurrently in lightweight worker threads (pool: 'threads').
  - Isolate SQLite database tests (tests/*.test.ts) into a serialized execution pattern to preserve WAL mode and prevent Windows file-lock contention while avoiding full-process fork freezing.
  - Narrow test collection globs to exclude unnecessary directory traversals.
- Icon Pack Unification (Standardize on @phosphor-icons/react):
  - Replace lingering lucide-react imports in components/theme-toggle.tsx, app/(site)/page.tsx, and app/(dashboard)/dashboard/page.tsx with equivalent @phosphor-icons/react icons.
  - Remove lucide-react from package.json dependencies, eliminating duplicate icon package weight and AST parsing passes.
- Lazy Viewport Hydration for Component Library (library-client-view.tsx):
  - Implement intersection-based lazy hydration / deferred rendering for Recharts and heavy composite client views so that off-screen components only mount when scrolled into or near the viewport.

## Capabilities

### New Capabilities
- oundation-performance: Performance optimizations across Next.js package import rewriting, decoupled Vitest thread pools for Windows, single-toolkit icon standard, and viewport-lazy catalog rendering.

### Modified Capabilities
*(None)*

## Impact

- Affected Code:
  - next.config.ts (compiler configuration)
  - vitest.config.ts (test pool configuration)
  - package.json (remove lucide-react)
  - components/theme-toggle.tsx, app/(site)/page.tsx, app/(dashboard)/dashboard/page.tsx (icon replacement)
  - components/dashboard/library/library-client-view.tsx (viewport hydration)
- Dependencies: Eliminates lucide-react dependency (-15MB). Zero new runtime packages added.
- Quality Gates: Must pass all 4 deterministic gates (pnpm typecheck, pnpm test, pnpm build, pnpm foundation:check).
