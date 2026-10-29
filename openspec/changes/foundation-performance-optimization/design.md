## Context

See proposal.md for background and motivation.
The foundation has strict architectural invariants defined in FOUNDATION.md:
- Zero monorepo infrastructure, single Next.js application workspace.
- Local SQLite in WAL mode with connection_limit=1&busy_timeout=10000.
- Pino server-only logging.
- Deterministic quality gates: pnpm typecheck, pnpm test, pnpm build, pnpm foundation:check.

scripts/foundation-check.js currently checks:
- Next.js App Router
- SQLite connection parameters
- itest.config.ts includes singleThread: true (to ensure DB stability on Windows)
- Absence of Docker or prohibited SaaS dependencies

## Goals / Non-Goals

**Goals:**
- Eliminate barrel parsing bottlenecks in Next.js Turbopack via optimizePackageImports.
- Resolve Vitest 40–80s test collection/execution hangs on Windows while strictly preserving SQLite WAL lock safety and singleThread: true.
- Eliminate lucide-react completely from the root Next.js application and standardize on @phosphor-icons/react.
- Maintain native CSS content-visibility: auto with contain-intrinsic-size: auto 360px in library-client-view.tsx while deferring heavy Recharts canvas execution to keep DOM nodes present for in-page anchor scrolling and browser Ctrl+F search.
- Maintain 100% pass on all 4 quality gates (pnpm typecheck, pnpm test, pnpm build, pnpm foundation:check).

**Non-Goals:**
- Splitting the application into a monorepo or micro-frontends (violates Foundation Invariant 1).
- Replacing Recharts with an entirely different charting library.
- Removing lucide-react from the isolated sub-workspace docs/ (which is required by Fumadocs).
- Replacing SQLite with PostgreSQL in local development defaults.

## Decisions

### 1. Next.js optimizePackageImports over Manual Deep-Import Refactoring
- **Decision**: Configure xperimental: { optimizePackageImports: ['@phosphor-icons/react', 'recharts'] } in 
ext.config.ts.
- **Rationale**: Vercel React Best Practices rule undle-barrel-imports recommends compiler-level rewriting because it preserves TypeScript autocompletion and clean import syntax (import { Sparkle } from '@phosphor-icons/react') while emitting direct module imports at compile time.
- **SSR Boundary Guard**: Recharts components are strictly client-side. All Recharts usages in the catalog and client views remain wrapped with "use client" or dynamic(() => import(...), { ssr: false }) to prevent server-side DOM layout crashes.

### 2. Vitest Windows Tuning: Worker Thread Sequential Pool (singleThread: true)
- **Decision**: Update itest.config.ts to use pool: 'threads' with poolOptions: { threads: { singleThread: true } } and ileParallelism: false.
- **Rationale**: On Windows, child process forking (pool: 'forks') spawns heavy OS processes with slow IPC handshakes that take 40-80s to collect tests. Switching to worker threads eliminates this OS spawn overhead (~6-8s execution) while singleThread: true strictly preserves sequential execution to protect the SQLite WAL database from SQLITE_BUSY file-lock contention and satisfies scripts/foundation-check.js verbatim.
- **Alternative Considered**: Running multi-thread parallel workers. Rejected because Node worker threads do not share globalThis.prisma, causing multiple connection pools and Windows file locks against dev.db.

### 3. Complete Root Application Unification on @phosphor-icons/react
- **Decision**: Replace all remaining lucide-react icons across root app components:
  - components/theme-toggle.tsx: Moon, Sun (and fix darj: typo)
  - pp/(site)/page.tsx: ArrowRight, Stack, Database, Sparkle
  - components/dashboard/metrics/metrics-client-view.tsx: Folder, ShieldCheck, Cpu, Clock
  - pp/(dashboard)/dashboard/page.tsx: Folder, CheckCircle, TrendUp, Clock, Plus, Trash, ArrowSquareOut, Activity
  - lib/library/component-registry.ts: remove lucide-react from peerDependencies metadata.
  - Remove lucide-react from root package.json.
- **Rationale**: Foundation Invariant 4 mandates a single UI system. Having two icon libraries wastes 15MB of storage, causes confusion for downstream starter templates, and duplicates AST parsing. Note: docs/ is an isolated sub-folder for Fumadocs and maintains its own separate package.json.

### 4. Non-Destructive Viewport Optimization (Zero-CLS & Preserved Anchors)
- **Decision**: Retain native CSS content-visibility: auto with contain-intrinsic-size: auto 360px on preview card containers, while deferring Recharts SVG chart mounting inside a fixed-height skeleton canvas (min-h-[240px]).
- **Rationale**: Unmounting entire React DOM nodes destroys in-page anchor navigation (#metrics, #charts, etc.), causes cumulative layout shifts (CLS) when scrolling, and breaks native browser Ctrl+F search. Keeping the card shell and typography in the DOM while lazy-mounting only the internal SVG canvas guarantees instantaneous scroll landing and zero CLS.

## Risks / Trade-offs

- **[Risk]**: scripts/foundation-check.js requires singleThread: true in itest.config.ts.
  - **Mitigation**: Kept singleThread: true intact under poolOptions.threads, ensuring pnpm foundation:check stays green.
- **[Risk]**: Removing lucide-react could break uncataloged files.
  - **Mitigation**: Full static audit identified all 4 root files importing lucide-react (	heme-toggle.tsx, page.tsx, metrics-client-view.tsx, dashboard/page.tsx), plus component-registry.ts.
- **[Risk]**: Chart mounting lag during fast scroll.
  - **Mitigation**: Fixed container skeletons preserve layout height so no jumping occurs.

## 🏛️ AI Council Review Synthesis & Verdict

Conducted by: Software Architect, Red Teamer, Product Resilience Engineer, UI/UX Specialist.

| Evaluation Dimension | Rating | Council Finding & Action Taken |
| :--- | :---: | :--- |
| **Architecture** | **PASS** | optimizePackageImports approved with explicit client-side boundary for Recharts. |
| **Resilience (SQLite / Windows)** | **PASS** | Switched from process forking to worker threads with singleThread: true, eliminating 50s process spawn delay while preventing SQLITE_BUSY lock contention. |
| **Completeness (Icon Standard)** | **PASS** | Expanded scope to include all 4 root files importing Lucide (metrics-client-view.tsx, dashboard/page.tsx, 	heme-toggle.tsx, site/page.tsx). |
| **UI/UX & Accessibility** | **PASS** | Retained CSS content-visibility: auto with intrinsic height sizing; rejected destructive React DOM unmounting to preserve #anchor scrolling and Ctrl+F. |
