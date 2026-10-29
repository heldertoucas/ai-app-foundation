# Proposal: Unified Component & Design System Library Section

## Why

As the ai-app-foundation evolves into a template and starter framework for new AI agent applications (such as rulesync-explorer and project-specific cockpits), developers need a centralized, interactive **Component Library** section. Currently, our reusable cards, gauges, charts, matrix heatmaps, Kanban boards, code diff viewers, and agent cards are distributed across separate dashboard sub-routes without an aggregated catalog, code snippets, or exportable blueprints.

Creating a dedicated **Library** section (`/dashboard/library`) provides:
1. **Master Catalog Hub**: A single-pane showcase replacing the current fragmented Component Library sub-links in the sidebar, with category filtering, search, and cross-component navigation.
2. **Copyable Snippets & Usage Blueprints**: Each component card lists required shadcn CLI commands, peer dependency installs, the full import statement, and a copyable JSX snippet — giving developers everything needed to scaffold the component into a new application.
3. **Card & Design Element Archetypes**: Clear visual reference for all card designs (KpiStatCard, HealthGauge, RemediationTerminalCard, AgentRuntimeCard, CodeDiffViewer, MaskedSecretViewer, etc.) with isolated mock data, error boundaries, and lazy-loaded previews.
4. **Strict Foundation Invariants**: Zero monorepo overhead, 100% shadcn/ui primitives, server-side static mock data, no paid cloud SaaS dependencies.

## What Changes

- **Navigation & IA**: Promotes `/dashboard/library` as the **master catalog index** in `components/app-sidebar.tsx`. Individual category sub-routes (`/dashboard/metrics`, etc.) are retained as deep-links within the Library hub and kept as secondary sidebar items.
- **Dedicated Route**: Implements `app/(dashboard)/dashboard/library/page.tsx` with category filter chips, text search, and responsive grid.
- **Component Showcase & Archetypes** (all previews isolated with per-card ErrorBoundary and lazy-loaded via `React.lazy` or `next/dynamic`):
  - **Metrics & KPIs**: `KpiStatCard`, `HealthGauge`, `StatusFilterChips`
  - **Analytical Charts**: `TimelineActivityAreaChart`, `TargetDistributionBarChart`, `EvaluationRadarChart`
  - **Matrix & Heatmaps**: `CapabilityMatrixHeatmap`, `DataTable`, `MatrixViewModeToggle`
  - **Workflow & Lifecycle**: `OpenspecKanbanBoard`, `ActivityTimelineFeed`, `PhaseStepper`
  - **Inspection & Code**: `CodeDiffViewer`, `FileTreeNavigator`, `MaskedSecretViewer`, `MarkdownReader`
  - **Agent Pipelines**: `AgentRuntimeCardGrid`, `MultiAgentChatStream`, `HumanReviewBanner`
  - **Developer Actions**: `RemediationTerminalCard`, `GlobalCommandPalette`, `QuickFilterToolbar`
- **Interactive Component Viewer** per card:
  - Tabbed interface (`Preview` | `Code` | `Props & Types`).
  - **Requirements block**: shadcn CLI commands, peer dependency installs, and full import statement.
  - Copy-to-clipboard button with toast feedback.
  - Adaptive preview height per component category (charts: 240px min, KPI cards: 100px min).
  - Mobile-responsive: Preview tab hidden on viewports < 640px; Code and Props tabs always available.

## Capabilities

### New Capabilities
- `component-library`: Interactive component catalog, design archetype showcase, and copyable implementation blueprints with dependency documentation for building new dashboard applications.

### Modified Capabilities
*(None)*

## Impact

- **Affected Code**: Adds `app/(dashboard)/dashboard/library/`, `components/dashboard/library/`, `lib/library/`, and updates `components/app-sidebar.tsx`.
- **Dependencies**: Uses existing `shadcn/ui`, `@phosphor-icons/react`, and Tailwind CSS v4. Chart previews use `next/dynamic` with `{ ssr: false }`. No new runtime dependencies.
- **Verification**: Registry unit tests + per-card error boundary coverage + `pnpm typecheck && pnpm test && pnpm build`.
