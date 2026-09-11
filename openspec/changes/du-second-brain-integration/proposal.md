# 📜 OpenSpec Proposal: Development Universe Second Brain Living Dashboard Integration

* **Change ID**: `du-second-brain-integration`
* **Type**: `proposal`
* **Status**: `proposed`
* **Project**: `DEV-001`
* **Created**: `2026-09-11`
* **Relevant Decisions**: `DEC-0015` (Secure Session Cookie Requirement)
* **Relevant Constraints**: 
  - `CON-0012` (Continuous Dogfooding & Operational Feedback Policy)
  - `CON-0015` (Repository-Scoped Graphify Boundary)
  - `CON-0016` (DU Context Pre-Flight for Spec-Driven Planning)

---

## 🎯 Executive Summary
Transform the existing 7-domain universal dashboard library in `ai-app-foundation` from static mock showcases into a living, local-first intelligence console wired directly into the Development Universe (DU) Second Brain and runtime engine. 

This change brings 6 core DU engine capabilities into interactive Next.js 16 Server Components:
1. **Invariant Compliance Matrix & Audit Inspector**: Visualizes the 14 DU Architectural Invariants (`DU-001` through `DU-014`) across all active projects with root-delegated hovercards and direct audit log inspection.
2. **Memory Candidate Governance Pipeline & AI Council Stream**: Visualizes `05-candidates/` (`MEM-*`) lifecycle through a Kanban board paired with simulated multi-agent architectural debates and 1-click human promotion actions.
3. **Context Capsule & Token Budget Inspector**: Plots real-time ephemeral context assembly dimensions (relevance, recency, graph proximity) and token budget headroom on analytical radar and gauge charts.
4. **RuleSync Drift & Multi-Harness Sync Engine**: Detects and displays visual diffs between canonical vault rules and derived workspace files (`AGENTS.md`, `CLAUDE.md`, `.cursorrules`) with 1-click remediation.
5. **Graphify God-Node & Architecture Radar**: Visualizes codebase coupling, circular dependency risks, and God-node concentration from `graphify-out/`.
6. **Interactive DU Command Center**: Powers the `⌘K` Command Palette and Remediation Terminal with executable DU engine commands (`dev doctor`, `ai-remember`, `ai-council`, `ai-close`).

---

## 🛑 Problem Statement
Currently, `ai-app-foundation` provides an authentic, high-quality shadcn/ui dashboard component library across 7 domains (`metrics`, `charts`, `matrix`, `workflow`, `inspection`, `agents`, `actions`), but the showcase routes render static mock datasets. 

Meanwhile, the Development Universe possesses extensive, high-value local state and runtime telemetry:
- Invariant audit logs (`audit_summary`, `audit_session`)
- Staged memory candidates in `05-candidates/`
- Ephemeral context assembly telemetry from `get_context`
- RuleSync configuration drift across multi-agent harnesses
- Graphify AST code intelligence in `graphify-out/`

Currently, inspecting this ecosystem requires running manual CLI commands or grepping markdown files in Obsidian. Operators lack a consolidated, visual, local-first dashboard to monitor ecosystem compliance, review agent debates, inspect rule drift, and trigger engine commands safely.

---

## 💡 Proposed Solution
Introduce a decoupled, server-only data adapter layer (`lib/du/`) that safely ingests local DU telemetry and feeds real data into the 7 dashboard routes via Next.js Server Components and Server Actions:

1. **Local-First / Free-First Invariant**:
   - Zero paid cloud APIs or mandatory external SaaS.
   - All adapters read directly from local files (Obsidian Vault `home/`, repo `graphify-out/`, `.rulesync/`, and local MCP endpoints) with graceful fallback to cached snapshots.
2. **Strict Read-Only & Safe Execution Boundaries**:
   - The dashboard reads canonical vault state safely without ungrounded direct file writes (`CON-0012`).
   - Mutations (e.g., promoting a candidate or triggering `rulesync generate`) route through approved DU CLI dispatchers (`python -m dev.cli` or MCP `propose_memory`).
3. **Component Contract Preservation**:
   - Existing component interfaces (`CapabilityMatrixHeatmap`, `OpenSpecKanbanBoard`, `AgentRuntimeCardGrid`, `EvaluationRadarChart`, `CodeDiffViewer`, `GlobalCommandPalette`) remain backward-compatible; data adapters simply shape real DU state to match component prop contracts.

---

## 📦 Impacted Files & Repositories
* **`lib/du/` (New Adapter Layer)**:
  * `lib/du/types.ts`: TypeScript contracts for DU entities, invariants, audit events, and telemetry.
  * `lib/du/vault-client.ts`: Safe server-only file reader for Obsidian vault entities.
  * `lib/du/compliance-adapter.ts`: Aggregates invariant status from `audit_session` / `audit_summary`.
  * `lib/du/memory-adapter.ts`: Reads `05-candidates/` and formats for Kanban cards.
  * `lib/du/context-adapter.ts`: Parses context capsule telemetry for radar and budget charts.
  * `lib/du/rulesync-adapter.ts`: Compares `.rulesync/` source against `AGENTS.md` to compute drift.
  * `lib/du/graphify-adapter.ts`: Reads `graphify-out/` complexity and god-node distributions.
  * `lib/du/actions.ts`: Server actions for promoting candidates and dispatching DU commands.
* **Showcase Pages**:
  * `app/(dashboard)/dashboard/matrix/page.tsx`: Invariant Compliance Heatmap.
  * `app/(dashboard)/dashboard/workflow/page.tsx`: Memory Candidate Governance Kanban.
  * `app/(dashboard)/dashboard/charts/page.tsx`: Context Radar & Graphify Complexity.
  * `app/(dashboard)/dashboard/metrics/page.tsx`: Token Budget & Compliance Gauges.
  * `app/(dashboard)/dashboard/inspection/page.tsx`: RuleSync Drift Diff & Audit Reader.
  * `app/(dashboard)/dashboard/agents/page.tsx`: Multi-Agent Council Debate Stream & Harness Grid.
  * `app/(dashboard)/dashboard/actions/page.tsx`: Interactive DU Command Palette & Terminal.
* **Test Suites**:
  * `tests/du-adapters.test.ts`: Unit tests verifying data adapters and fallback resilience.

---

## 🚫 Non-Goals & Scope Limits
- **No Direct Vault Modification**: The dashboard will not directly write or overwrite canonical markdown files in `00`–`04` without human confirmation through the DU CLI.
- **No Heavy Background Daemons**: The dashboard will not run long-polling background daemons; data is fetched on-demand per request in React Server Components with stale-while-revalidate caching.
- **No Monorepo Refactoring**: Remains strictly within the single Next.js 16 application workspace in accordance with `AGENTS.md`.
