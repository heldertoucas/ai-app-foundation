# 📋 OpenSpec Tasks: Development Universe Second Brain Living Dashboard

* **Change ID**: `du-second-brain-integration`
* **Type**: `tasks`
* **Status**: `completed (verified)`
* **Parent Proposal**: `openspec/changes/du-second-brain-integration/proposal.md`

---

## 1. Phase 1: Security Core & Server-Only Adapter Engine (`lib/du/`)

- [x] 1.1 Security Primitives & Path Jailing
  - *Executed 2026-09-11*: Implemented `resolveSafeVaultPath` in `lib/du/core/path-jail.ts` with `fs.realpathSync` and boundary checks (`SEC-01`).
  - *Executed 2026-09-11*: Hardened `lib/clipboard.ts` stripping all `\r` and `\n` characters for terminal commands (`SEC-03`).
  - *Executed 2026-09-11*: Added security unit tests in `tests/du-security.test.ts` (5 tests passing).

- [x] 1.2 Environment Capability Probe & In-Memory Fixtures
  - *Executed 2026-09-11*: Implemented `lib/du/env.ts` detecting `DEV_UNIVERSE_HOME` and returning `'live' | 'fallback_fixture'`.
  - *Executed 2026-09-11*: Created pre-compiled fallback fixtures in `lib/du/fixtures/index.ts` reflecting DEV-001 foundation state.

- [x] 1.3 Implement Domain Adapters with Two-Tier Caching
  - *Executed 2026-09-11*: `lib/du/compliance-adapter.ts` (14 Invariant matrix and health scores wrapped in React `cache()`).
  - *Executed 2026-09-11*: `lib/du/memory-adapter.ts` (Candidate governance pipeline with shallow frontmatter parser and 512KB quota).
  - *Executed 2026-09-11*: `lib/du/context-adapter.ts` (Radar dimensions and token budget headroom).
  - *Executed 2026-09-11*: `lib/du/rulesync-adapter.ts` (RuleSync diff and multi-harness status).
  - *Executed 2026-09-11*: `lib/du/graphify-adapter.ts` (God-node distribution and coupling risk).
  - *Executed 2026-09-11*: `lib/du/actions.ts` (Server Actions using `execFile`, strict regex, 5000ms timeout, and clipboard fallback).

- [x] 1.4 Adapter Integration & Resilience Tests
  - *Executed 2026-09-11*: `tests/du-adapters.test.ts` (8 tests passing verifying live vault reading and fallback fixture execution).

---

## 2. Phase 2: Showcase Route & UI/UX Hardening

- [x] 2.1 Refactor Showcase Routes to React Server Components
  - *Executed 2026-09-11*: Converted all `app/(dashboard)/dashboard/*/page.tsx` into Server Components with clean client boundary views.
  - *Executed 2026-09-11*: Preserved existing component prop interfaces (`CapabilityMatrixHeatmap`, `OpenSpecKanbanBoard`, etc.).

- [x] 2.2 Wire & Harden `/dashboard/matrix` (Compliance Heatmap)
  - *Executed 2026-09-11*: Replaced mock data with live DU project and invariant data via `getComplianceMatrixData()`.
  - *Executed 2026-09-11*: Added `tabIndex={0}`, keyboard focus rings, accessible popover, and inspection links.

- [x] 2.3 Wire `/dashboard/workflow` & `/dashboard/agents` (Memory Pipeline & AI Council)
  - *Executed 2026-09-11*: Populated Kanban with real `MEM-*` candidates with responsive horizontal swipe rail on `<1280px`.
  - *Executed 2026-09-11*: Streamed multi-agent council debate for staged candidates (`MEM-0279`, `MEM-0280`).
  - *Executed 2026-09-11*: Connected `promoteCandidateAction` Server Action with hybrid clipboard fallback banner.

- [x] 2.4 Wire `/dashboard/charts` & `/dashboard/metrics` (Context Capsule & Graphify)
  - *Executed 2026-09-11*: Rendered live Context Capsule dimensions on `EvaluationRadarChart` and token budget breakdown.
  - *Executed 2026-09-11*: Wired God-Node and module coupling distribution to `TargetDistributionBarChart`.
  - *Executed 2026-09-11*: Displayed live invariant compliance scores on `HealthGauge` and `KpiStatCard`.

- [x] 2.5 Wire & Harden `/dashboard/inspection` & `/dashboard/actions` (RuleSync & Command Center)
  - *Executed 2026-09-11*: Rendered RuleSync diff preview in `CodeDiffViewer` with `?invariant=` and `?session=` query param support.
  - *Executed 2026-09-11*: Upgraded `GlobalCommandPalette` with `useRouter().push()` client navigation and dual command sets.
  - *Executed 2026-09-11*: Connected `RemediationTerminalCard` to live action catalog with dual bash/powershell script targets.

---

## 3. Phase 3: Quality Gates & Verification

- [x] 3.1 Deterministic Quality Gate Runs:
  - *Executed 2026-09-11*: `pnpm typecheck` passed with 0 errors.
  - *Executed 2026-09-11*: `pnpm test` passed 19/19 tests across 6 test suites.
  - *Executed 2026-09-11*: `pnpm build` passed compiling all 7 dashboard showcase routes with full static and dynamic separation.

- [x] 3.2 Verification Proof & Execution Provenance:
  - *Executed 2026-09-11*: Execution logs recorded for all tasks in OpenSpec change `du-second-brain-integration`.
  - *Executed 2026-09-11*: Validated on local development server `http://localhost:3000`.

