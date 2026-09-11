# 🏗️ OpenSpec Design: Development Universe Second Brain Living Dashboard

* **Change ID**: `du-second-brain-integration`
* **Type**: `design`
* **Status**: `proposed`
* **Parent Proposal**: `openspec/changes/du-second-brain-integration/proposal.md`

---

## 1. System Architecture & Topology

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Next.js 16 Presentation Layer                      │
│                                                                             │
│  /dashboard/matrix      /dashboard/workflow        /dashboard/charts        │
│  [Compliance Heatmap]   [Memory Kanban Board]      [Context Radar & Graph]  │
│                                                                             │
│  /dashboard/inspection  /dashboard/agents          /dashboard/actions       │
│  [RuleSync Diff Viewer] [Council Stream & Grid]    [Command Palette & Term] │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Server Components / Actions)
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    `lib/du/` Server-Only Adapter Engine                     │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌──────────────────┐ │
│  │ Compliance Adapter    │  │ Memory Adapter        │  │ Context Adapter  │ │
│  │ (Audit & Invariants)  │  │ (Candidates & Stages) │  │ (Token Telemetry)│ │
│  └───────────┬───────────┘  └───────────┬───────────┘  └─────────┬────────┘ │
│  ┌───────────┴───────────┐  ┌───────────┴───────────┐  ┌─────────┴────────┐ │
│  │ RuleSync Adapter      │  │ Graphify Adapter      │  │ Command Adapter  │ │
│  │ (Diff & Multi-Harness)│  │ (God Nodes & AST)     │  │ (CLI Dispatcher) │ │
│  └───────────────────────┘  └───────────────────────┘  └──────────────────┘ │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                     Development Universe Local Storage                      │
│                                                                             │
│  • Obsidian Vault (`home/`): 00-09 Canonical Markdown Notes & Frontmatter   │
│  • Ephemeral Context: Context Capsules & LanceDB Vector Cache (`.dev-cache`)│
│  • Local Graph: `graphify-out/graph.json` AST Code Intelligence             │
│  • Agent Rules: `.rulesync/` configurations & derived `AGENTS.md`           │
│  • Audit Logs: `06-sessions/` & SQLite Event Logs                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Server-Only Data Adapter Layer (`lib/du/`)

To adhere to Next.js 16 architecture and security constraints (`server-only`), all data ingestion lives in `lib/du/` and is strictly executed on the server.

### 2.1 File Ingestion & Path Resolution
The adapter resolves the canonical Development Universe home vault path using standard environment conventions:
* `process.env.DEV_UNIVERSE_HOME || path.resolve(process.cwd(), '../home')`
* When vault paths are unreachable (e.g. CI environments or isolated test sandboxes), adapters seamlessly provide deterministic fallback fixtures, ensuring `pnpm build` and `pnpm test` never fail.

### 2.2 Domain Adapters Specification

#### A. Compliance Adapter (`lib/du/compliance-adapter.ts`)
* Reads invariant compliance records and audit history.
* Maps projects (`DEV-001`, `PRJ-0001`, `PRJ-0017`, `ai-app-foundation`) across columns `DU-001` to `DU-014`.
* Formats output into `CapabilityMatrixHeatmapProps` (`targets`, `rows`).
* Computes aggregate health score for `HealthGauge` (`PASS / TOTAL * 100`).

#### B. Memory Governance Adapter (`lib/du/memory-adapter.ts`)
* Scans `05-candidates/` (and archived candidate logs) for `MEM-*` markdown notes with YAML frontmatter.
* Categorizes candidates into Kanban columns:
  * `discovered`: Candidates noted in recent session logs.
  * `staged`: `MEM-*` files in `05-candidates/` with status `pending`.
  * `evaluated`: Candidates with AI Council debate notes.
  * `promoted`: Candidates promoted to `03-patterns/`, `04-decisions/`, or `00-knowledge/`.
* Maps to `OpenSpecKanbanBoardProps` with tags for confidence (`high`, `medium`) and scope (`project`, `global`).

#### C. Context Capsule Adapter (`lib/du/context-adapter.ts`)
* Extracts telemetry from the most recent session or Context Capsule assembly.
* Computes radar chart dimensions (0–100 scale):
  * Relevance (vector similarity score)
  * Recency (temporal freshness)
  * Adjacency (code graph neighbor count)
  * Invariant Density (number of active constraints)
  * Project Coherence
* Generates token budget consumption metrics (System Rules vs. Memory vs. Workspace vs. Headroom).

#### D. RuleSync Drift Adapter (`lib/du/rulesync-adapter.ts`)
* Reads `.rulesync/` rules and compares them against target derived files:
  * `AGENTS.md` (Next.js workspace root)
  * `CLAUDE.md` (root)
  * `.cursorrules` (if present)
* Computes line additions, deletions, and checksum drift.
* Provides inputs for `CodeDiffViewer` and status badges for `MultiHarnessGrid`.

#### E. Graphify Adapter (`lib/du/graphify-adapter.ts`)
* Reads `graphify-out/graph.json` or computes dependency coupling scores across TypeScript source files in `app/`, `components/`, and `lib/`.
* Identifies top "God Nodes" (highest in-degree and out-degree file connections).
* Formats complexity distributions for `TargetDistributionBarChart`.

#### F. Command Center & Server Actions (`lib/du/actions.ts`)
* Implements type-safe Next.js Server Actions:
  * `promoteMemoryCandidateAction(candidateId, targetType)`: Invokes DU CLI to formalize promotion.
  * `runRuleSyncGenerateAction()`: Dispatches rule regeneration with diff confirmation.
  * `runHealthAuditAction()`: Executes `dev doctor` and returns diagnostic output.

---

## 3. Interaction & Error Handling Invariants
1. **Zero Runtime Cache Pollution (`DU-005`, `DU-011`)**: The adapters never write transient cache files (`hot.md`, `.ai-session.json`) to disk.
2. **Graceful Degradation**: If an MCP server is unmounted or a file is missing, adapters log a warning via Pino and return rich structured fallback fixtures so the dashboard never renders blank or crashes.
3. **CRLF-Safe Clipboard Execution**: Terminal copy actions use `lib/clipboard.ts` to sanitize newlines before execution.

---

## 4. AI Council Review Findings & Mandatory Hardening Invariants

Convened on 2026-09-11 via Full AI Council (Mode 3).

### 4.1 Council Evaluation Rubric
| Persona | Rating | Primary Mandate |
| :--- | :---: | :--- |
| **The Red Teamer** | 🛑 **BLOCKER** | Enforce path jailing with `realpath`, eliminate shell interpolation via `execFile`, and strip all `\r`/`\n` in clipboard to prevent terminal pastejacking. |
| **The Software Architect** | ⚠️ **CONCERN** | Convert showcase routes to React Server Components (RSC) with `server-only` to prevent Node.js `fs` leakage into browser bundles. |
| **The Resilience Engineer** | ⚠️ **CONCERN** | Introduce `lib/du/env.ts` capability probe with in-memory fallback fixtures and Next.js `unstable_cache` tag-based revalidation. |
| **The UI/UX Specialist** | ⚠️ **CONCERN** | Remediate WCAG 2.1 AA keyboard navigation (focus rings, accessible hovercard bridge, shadcn `Command` palette, and OKLCH semantic status tokens). |

### 4.2 Mandatory Security Guardrails (Red Team Resolvers)
1. **Path Traversal Shield (`resolveSafeVaultPath`)**:
   Every filesystem read in `lib/du/` must validate paths against `fs.realpathSync(rootDir)` and assert `resolved.startsWith(safeRoot + path.sep)`. Reject path parameters containing unapproved characters or directory traversal dots (`..`).
2. **Safe Subprocess Execution**:
   Server Actions in `lib/du/actions.ts` must invoke `execFile` without shell interpolation (`shell: false`), enforce strict parameter regexes (e.g. `^MEM-\d{4}$`), apply a 5000ms `AbortController` timeout, and verify `Origin`/`Host` headers against localhost.
3. **Strict Pastejacking Mitigation in `lib/clipboard.ts`**:
   Terminal commands copied to clipboard must strip all CR (`\r`) and LF (`\n`) characters entirely (`text.replace(/[\r\n]+/g, ' ').trim()`) to prevent immediate execution upon paste.

### 4.3 Mandatory Architectural & Resilience Guardrails
1. **Server/Client Boundary**: `app/(dashboard)/dashboard/*/page.tsx` must be React Server Components. `import "server-only"` must be declared at the top of all `lib/du/*` modules.
2. **Environment Capability Probe**: `lib/du/env.ts` detects whether `DEV_UNIVERSE_HOME` is accessible; if missing, returns pre-compiled in-memory fallback fixtures (`lib/du/fixtures/`) without attempting disk reads or failing builds.
3. **Two-Tier Caching**: Read operations wrapped in React `cache()` for request deduplication; AST and diff computations cached with Next.js `unstable_cache`.
4. **Accessible Heatmap & Palette**: Heatmap cells must receive `tabIndex={0}`, keyboard activation, and persistent popover inspection. Command Palette refactored to use shadcn `Command` (`cmdk`).

---

## 5. Resolved Architectural Decisions from AI Grill Stress-Testing

Concluded on 2026-09-11 via `/ai-grill` structured interview.

### 5.1 Decision Log

1. **Data Ingestion Architecture**:
   - **Decision**: Hybrid Direct Read with In-Memory Fallback.
   - **Rationale**: Server Components read directly from the local Obsidian vault (`home/`), `graphify-out/`, and local MCP endpoints with path jailing (`resolveSafeVaultPath`). When unmounted (CI, cloud preview), the adapter automatically serves high-fidelity in-memory fallback fixtures without throwing errors or requiring complex sync pipelines.

2. **Mutation & Action Security**:
   - **Decision**: Hybrid Execution Mode (Default Read-Only with Opt-In Local Subprocesses).
   - **Rationale**: By default, all mutation triggers (e.g., candidate promotion, RuleSync regeneration) copy sanitized, single-line CLI commands to the operator's clipboard with on-screen visual confirmation, executing zero child processes on the server. If `ENABLE_LOCAL_MUTATIONS=true` is explicitly set in `.env.local`, guarded execution via `execFile` (strictly `shell: false`, 5s timeout, localhost origin check) is enabled.

3. **UX, Density & WCAG 2.1 AA Compliance**:
   - **Decision**: Accessible Interactive Popover + Responsive Swipe Rail.
   - **Rationale**: Heatmap cells receive `tabIndex={0}`, keyboard activation, and persistent popovers allowing users to click through to audit logs. On viewports <1280px, the Kanban board adapts into a horizontal swipe rail (`w-[280px]` per column) with independent column scrolling. Global Command Palette standardizes on shadcn `Command` (`cmdk`) with Next.js `router.push()`.

4. **Fallback Fixture Strategy**:
   - **Decision**: High-Fidelity Snapshot of DEV-001.
   - **Rationale**: Bundled fixtures in `lib/du/fixtures/` contain authentic DU records (14 real invariants from `audit_session`, real candidates like `MEM-0279` and `MEM-0163`, authentic radar coordinates), ensuring that CI builds, tests, and preview deployments are visually and functionally identical to live desktop runs.
