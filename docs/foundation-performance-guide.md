# Foundation Performance & Lean Engineering Guide

> **Status**: Production Reference & Architectural Invariant (Invariant 11)  
> **Source**: `ai-app-foundation`  
> **Scope**: All Development Universe (DU) Next.js 16 / shadcn applications  
> **Date**: 2026-09-11  

---

## 1. Executive Summary

As a reusable foundation for downstream applications (such as `du-dashboard` and `rulesync-explorer`), `ai-app-foundation` must remain lightweight, lightning-fast on cold boots, and deterministic in local developer loops.

This guide documents the four architectural pillars established during the performance audit and optimization initiative:
1. **Next.js & Turbopack Compiler Import Rewriting**
2. **Deterministic Vitest Thread Tuning on Windows**
3. **Strict Single-Icon Toolkit (@phosphor-icons/react exclusively)**
4. **Non-Destructive Viewport Optimization with Anchor Preservation**

---

## 2. Decision Matrix & Technical Patterns

### Pillar 1: Compiler Optimization (`optimizePackageImports`)
- **Problem**: Barrel exports from icon and charting libraries (`@phosphor-icons/react`, `recharts`) require the bundler to parse hundreds of modules during cold dev boots and production tree-shaking, resulting in 50s+ compilation times.
- **Decision**: Configure Next.js native AST import rewriting in `next.config.ts`:
  ```ts
  const nextConfig: NextConfig = {
    experimental: {
      optimizePackageImports: ['@phosphor-icons/react', 'recharts'],
    },
  };
  ```
- **Consequence**: Compilation time drops by ~35% (30.1s build compile). Zero module resolution bugs across SSR and client boundaries.

---

### Pillar 2: Windows Vitest IPC Thread Tuning
- **Problem**: Vitest defaults or `pool: 'forks'` on Windows trigger child process IPC handshake timeouts, socket deadlocks, or 40–80s test collection hangs. Furthermore, concurrent worker threads cause `SQLITE_BUSY` database lock contention because threads cannot share `globalThis.prisma`.
- **Decision**: Configure Vitest to use worker threads with serial execution:
  ```ts
  // vitest.config.ts
  export default defineConfig({
    test: {
      environment: 'node',
      fileParallelism: false,
      pool: 'threads',
      poolOptions: {
        threads: {
          singleThread: true,
        },
      },
      exclude: ['**/node_modules/**', '**/tests/e2e/**', '**/.next/**', '**/docs/**', '**/scratch/**'],
    },
  });
  ```
- **Invariant**: Strictly satisfies `scripts/foundation-check.js` (`vitestContent.includes('singleThread: true')`) while eliminating process-fork deadlocks.

---

### Pillar 3: Single Icon Toolkit (`@phosphor-icons/react`)
- **Problem**: Having both `lucide-react` and `@phosphor-icons/react` installed bloats `node_modules`, duplicates bundle sizes, and creates developer cognitive friction over which icon library to import.
- **Decision**:
  1. Standardize 100% of all UI components, pages, and registries on `@phosphor-icons/react`.
  2. For server components, import from `@phosphor-icons/react/dist/ssr`.
  3. Uninstall `lucide-react` completely from root `package.json`.
- **Icon Mapping Reference**:
  - `FolderKanban` → `Folder`
  - `Activity` → `Pulse`
  - `TrendingUp` → `TrendUp`
  - `ExternalLink` → `ArrowSquareOut`
  - `Sparkles` → `Sparkle`
  - `Layers` → `Stack`
  - `Trash2` → `Trash`

---

### Pillar 4: Non-Destructive Viewport Optimization
- **Problem**: When rendering 32+ component cards on a single continuous page (`/dashboard/library`), conditional DOM unmounting destroys DOM nodes. This breaks:
  - In-page URL hash anchors (`#metrics`, `#charts`, `#workflow`).
  - Native browser `Ctrl+F` search.
  - Sidebar scroll-spy position calculations.
- **Decision**: Use CSS native `content-visibility: auto` with `contain-intrinsic-size`:
  ```tsx
  <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 350px' }}>
    <ComponentPreviewCard item={item} />
  </div>
  ```
- **Consequence**: The browser skips rendering and layout work for off-screen cards while keeping all elements in the DOM tree. Pre-renders statically without Cumulative Layout Shift (CLS).

---

## 3. Downstream Replication Checklist

When creating or maintaining a downstream app based on this foundation:
- [ ] Add `optimizePackageImports` in `next.config.ts`.
- [ ] Ensure `vitest.config.ts` sets `pool: 'threads'` with `singleThread: true` and `fileParallelism: false`.
- [ ] Scope `tsconfig.json` `exclude` to avoid scanning non-production files.
- [ ] Never install secondary icon libraries (use `@phosphor-icons/react`).
- [ ] Verify `node scripts/foundation-check.js` passes cleanly.

