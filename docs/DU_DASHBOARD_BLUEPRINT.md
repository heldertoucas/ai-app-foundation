# Development Universe (DU) Dashboard Integration Blueprint

> **Status**: Production Reference & Architectural Guide  
> **Source Workspace**: `ai-app-foundation` (`DEV-001`)  
> **Target Audience**: Future standalone or embedded Development Universe Mission Control / DU Dashboard  
> **Date**: 2026-09-11

---

## 1. Executive Summary

This blueprint specifies the architecture, data contracts, and reusable UI components designed and proven in `ai-app-foundation` to interface directly with the **Development Universe Second Brain** (`home/`, Obsidian Vault `00`–`09`, RuleSync, Graphify, and DU CLI).

Any future DU Dashboard can adopt these abstractions verbatim or adapt them to provide a live, interactive Mission Control for all workspaces across the DU ecosystem.

---

## 2. Core Architectural Invariants

| ID | Invariant Name | Implementation Pattern in `ai-app-foundation` | Guardrail |
| :--- | :--- | :--- | :--- |
| **SEC-01** | Path Jailing | `resolveSafeVaultPath(subPath)` with `fs.realpathSync` | Strictly rejects directory traversal (`..`, absolute paths outside `DEV_UNIVERSE_HOME`). |
| **SEC-02** | Injection Guard | Strict regex whitelist on all CLI inputs (e.g. `^MEM-\d{4}$`) | Eliminates shell injection vulnerabilities in server actions. |
| **SEC-03** | Terminal Anti-Pastejacking | `copyTerminalCommand` in `lib/clipboard.ts` strips all `\r` and `\n` | Prevents clipboard command injection into operator terminals. |
| **RES-01** | Zero-Crash Dual Mode | `getDUEnvironmentMode()` (`live` vs `fallback_fixture`) | Guarantees deterministic rendering in CI, preview builds, or isolated clones without vault access. |
| **PERF-01**| Memory Quota & Lazy AST | Shallow frontmatter parsing + 512 KB per-file guard | Bounded latency during SSR; avoids full AST token blowup. |
| **ACT-01** | Hybrid Subprocess Safety | Default to Copy-to-Clipboard; execution requires explicit opt-in | Protects runtime environment while maintaining high operator velocity. |

---

## 3. Server-Only Adapter Engine (`lib/du/`)

The adapter layer is isolated via `import "server-only"` to prevent Node.js file system APIs from leaking into client browser bundles.

```
lib/du/
├── core/
│   └── path-jail.ts          # Safe vault root resolution & traversal verification (SEC-01)
├── fixtures/
│   └── index.ts              # Fallback snapshot fixtures for zero-crash isolation (RES-01)
├── env.ts                    # Environment detection & local mutation flags
├── types.ts                  # Unified domain data contracts (TypeScript interfaces)
├── compliance-adapter.ts     # 14 Invariant compliance matrix + React cache() deduplication
├── memory-adapter.ts         # Candidate governance (staged, evaluated, canonical)
├── context-adapter.ts        # Telemetry, multi-axial radar scoring, token budgets
├── rulesync-adapter.ts       # Multi-harness status and config diffs
├── graphify-adapter.ts       # Module coupling, god-node risk distribution
└── actions.ts                # Guarded Server Actions (promote, sync, checkpoint)
```

### 3.1 Data Contracts (`lib/du/types.ts`)

```typescript
// 1. Compliance Matrix
export interface DuComplianceMatrixData {
  targets: { id: string; label: string }[];
  rows: DuComplianceMatrixRow[];
  overallHealth: number;
  passCount: number;
  totalInvariants: number;
}

// 2. Memory Candidate Governance
export interface DuMemoryCandidate {
  id: string;
  title: string;
  targetType: "pattern" | "decision" | "knowledge" | "constraint";
  stage: "discovered" | "staged" | "evaluated" | "canonical";
  confidence: "low" | "medium" | "high";
  scope: "project" | "global";
  originatingSession: string;
  snippet?: string;
  date: string;
}

// 3. Context Telemetry & Radar Rubric
export interface DuContextTelemetry {
  radarDimensions: { subject: string; value: number; fullMark: number }[];
  tokenBudget: {
    system: number;
    memory: number;
    workspace: number;
    headroom: number;
    totalBudget: number;
    usedPercent: number;
  };
  activeEntities: { id: string; title: string; type: string; score: number }[];
}

// 4. RuleSync Multi-Harness Sync
export interface DuRuleSyncData {
  isClean: boolean;
  harnessStatuses: { name: string; status: "in-sync" | "drift" | "missing"; lastGenerated: string }[];
  diffPreview?: { filename: string; original: string; derived: string; additions: number; deletions: number };
}

// 5. Code Graph Coupling & God Nodes
export interface DuGraphifyData {
  godNodes: { file: string; inDegree: number; outDegree: number; totalCoupling: number; riskLevel: "low" | "medium" | "high" }[];
  categoryDistributions: { category: string; count: number }[];
  boundaryViolations: string[];
}
```

---

## 4. Reusable UI Presentation Components

All UI components adhere strictly to **shadcn/ui**, **OKLCH semantic tokens**, and **WCAG AA** accessibility standards:

### 4.1 Heatmap Matrix (`components/dashboard/matrix/`)
* **Component**: `CapabilityMatrixHeatmap`
* **Features**: Full keyboard navigation (`tabIndex={0}`), focus rings, interactive popovers (replacing hovercards to avoid screen edge clipping), direct deep links to `/dashboard/inspection?invariant=...`.
* **Scalability**: Handles 500+ cells smoothly using CSS grid layout without DOM virtualization overhead.

### 4.2 OpenSpec & Memory Kanban (`components/dashboard/workflow/`)
* **Component**: `OpenSpecKanbanBoard`
* **Features**: Responsive horizontal swipe rail on screens `<1280px` (`w-[280px]` snap columns), stage badges, confidence indicators, and origin session tagging.

### 4.3 AI Council Multi-Agent Stream (`components/dashboard/agents/`)
* **Component**: `AgentsClientView`
* **Features**: Live simulated debate stream between Software Architect, Red Teamer, Resilience Engineer, and UI/UX Specialist with explicit consensus ratings (Pass/Concern/Blocker).

### 4.4 Analytical Visualizations (`components/dashboard/charts/`)
* **Components**: `EvaluationRadarChart`, `TargetDistributionBarChart`, `TimelineActivityAreaChart`
* **Features**: Powered by Recharts and shadcn ChartConfig; automatic dark/light theme switching with semantic CSS variables (`--chart-1..5`, `--status-live`, `--status-drift`, `--status-missing`).

### 4.5 Universal Developer Actions (`components/dashboard/actions/`)
* **Components**: `RemediationTerminalCard`, `GlobalCommandPalette`, `QuickFilterToolbar`
* **Features**:
  - `RemediationTerminalCard`: Dual bash / powershell tabs with one-click copy and terminal anti-pastejacking sanitization.
  - `GlobalCommandPalette`: `Ctrl+K` modal utilizing client-side Next.js `router.push()` navigation and direct action execution.

---

## 5. How the Future DU Dashboard Should Pick Up These Functionalities

To extract or mirror this functionality into a dedicated `du-dashboard` application or central CLI companion:

1. **Copy the Adapter Layer**:
   - Lift `lib/du/` into the destination repository.
   - Set `DEV_UNIVERSE_HOME` in environment variables or configuration to point to the Obsidian Vault.
2. **Copy the Presentation Views**:
   - Grab `components/dashboard/` and the route handlers in `app/(dashboard)/dashboard/`.
3. **Mount Additional DU Endpoints**:
   - Hook `lib/du/actions.ts` into native DU CLI dispatchers (`powershell -File .../dev.ps1 <cmd>` or `python -m dev.cli <cmd>`).
   - Enable `ENABLE_LOCAL_MUTATIONS=true` if direct process execution from the web UI is desired in local development.
4. **Extend Domain Coverage**:
   - Add sessions inspector (`06-sessions/`) to browse past session transcripts.
   - Add ADR interactive proposer linking to `du-decision-propose`.
