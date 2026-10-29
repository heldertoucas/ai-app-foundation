import * as mocks from "./mocks";

export type LibraryCategory =
  | "metrics"
  | "charts"
  | "matrix"
  | "workflow"
  | "inspection"
  | "agents"
  | "actions"
  | "web";

export interface ComponentPropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface ComponentRequirements {
  shadcnCommand: string;
  peerDependencies: string[];
  importPath: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  exportName: string;
  category: LibraryCategory;
  categoryLabel: string;
  description: string;
  minHeight?: number;
  isLazy?: boolean;
  requirements: ComponentRequirements;
  props: ComponentPropDoc[];
  snippet: string;
  mockData: any;
}

export const LIBRARY_CATEGORIES: { id: LibraryCategory; label: string; description: string }[] = [
  {
    id: "metrics",
    label: "Metrics & KPIs",
    description: "Standardized KPI summary cards, circular radial health gauges, and interactive filter status chips.",
  },
  {
    id: "charts",
    label: "Analytical Charts",
    description: "Recharts-based area, bar, and radar visualizations with dark mode and responsive containers.",
  },
  {
    id: "matrix",
    label: "Matrix & Heatmaps",
    description: "Multi-target compliance heatmaps, paginated data tables, and view mode switchers.",
  },
  {
    id: "workflow",
    label: "Workflow & Lifecycle",
    description: "OpenSpec kanban board, multi-phase linear steppers, and connected activity timeline feeds.",
  },
  {
    id: "inspection",
    label: "Inspection & Code",
    description: "Side-by-side/unified diff viewers, recursive file trees, masked secrets, and markdown viewers.",
  },
  {
    id: "agents",
    label: "Agent Pipelines",
    description: "Multi-agent runtime status grids, expandable thinking chat streams, and human-in-the-loop review banners.",
  },
  {
    id: "actions",
    label: "Developer Actions",
    description: "Dual-shell remediation terminals, Cmd+K global command palettes, and fast filter toolbars.",
  },
  {
    id: "web",
    label: "Web & Marketing",
    description: "Responsive hero banners, multi-column feature and bento grids, process steppers, showcase cards, and callouts.",
  },
];

export const COMPONENT_REGISTRY: ComponentItem[] = [
  // ==========================================
  // Category 1: Metrics & KPIs
  // ==========================================
  {
    id: "kpi-stat-card",
    name: "KpiStatCard",
    exportName: "KpiStatCard",
    category: "metrics",
    categoryLabel: "Metrics & KPIs",
    description: "High-visibility metric card with trend pill badge, tabular numerals, and optional icon badge.",
    minHeight: 120,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card badge",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { KpiStatCard } from "@/components/dashboard/metrics";',
    },
    props: [
      { name: "title", type: "string", description: "Card title in uppercase label styling", required: true },
      { name: "value", type: "string | number", description: "Primary metric value displayed in tabular mono numerals", required: true },
      { name: "description", type: "string", description: "Secondary explanation text beneath value" },
      { name: "change", type: "number", description: "Percentage delta value formatted into trend pill" },
      { name: "changePeriod", type: "string", description: "Timeframe reference label (e.g. 'vs last sprint')" },
      { name: "icon", type: "React.ReactNode", description: "Decorative header icon node" },
      { name: "trend", type: "'up' | 'down' | 'neutral'", description: "Explicit trend override" },
    ],
    snippet: `import { KpiStatCard } from "@/components/dashboard/metrics";
import { ShieldCheck } from "@phosphor-icons/react";

export function Example() {
  return (
    <KpiStatCard
      title="Ecosystem Health"
      value="92%"
      change={1.2}
      changePeriod="vs last sprint"
      icon={<ShieldCheck className="size-4 text-emerald-500" />}
    />
  );
}`,
    mockData: mocks.mockKpiStatCards[1],
  },
  {
    id: "kpi-stat-card-skeleton",
    name: "KpiStatCardSkeleton",
    exportName: "KpiStatCardSkeleton",
    category: "metrics",
    categoryLabel: "Metrics & KPIs",
    description: "Shimmer skeleton fallback matching exact KpiStatCard dimensions.",
    minHeight: 120,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card skeleton",
      peerDependencies: ["clsx", "tailwind-merge"],
      importPath: 'import { KpiStatCardSkeleton } from "@/components/dashboard/metrics";',
    },
    props: [
      { name: "className", type: "string", description: "Custom container styling classes" },
    ],
    snippet: `import { KpiStatCardSkeleton } from "@/components/dashboard/metrics";

export function Example() {
  return <KpiStatCardSkeleton className="w-full" />;
}`,
    mockData: {},
  },
  {
    id: "health-gauge",
    name: "HealthGauge",
    exportName: "HealthGauge",
    category: "metrics",
    categoryLabel: "Metrics & KPIs",
    description: "Circular SVG radial health gauge with smooth dashoffset transitions and 3 severity tiers.",
    minHeight: 180,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card",
      peerDependencies: ["clsx", "tailwind-merge"],
      importPath: 'import { HealthGauge } from "@/components/dashboard/metrics";',
    },
    props: [
      { name: "value", type: "number", description: "Score from 0 to 100", required: true },
      { name: "label", type: "string", default: "System Health", description: "Sub-label rendered beneath score" },
      { name: "size", type: "number", default: "140", description: "SVG diameter in pixels" },
      { name: "strokeWidth", type: "number", default: "12", description: "Width of radial ring stroke" },
    ],
    snippet: `import { HealthGauge } from "@/components/dashboard/metrics";

export function Example() {
  return <HealthGauge value={92} label="Invariant Compliance" size={140} />;
}`,
    mockData: mocks.mockHealthGaugeData,
  },
  {
    id: "status-filter-chips",
    name: "StatusFilterChips",
    exportName: "StatusFilterChips",
    category: "metrics",
    categoryLabel: "Metrics & KPIs",
    description: "Accessible multi-state tactile filter chips with count pills and semantic status border accents.",
    minHeight: 90,
    requirements: {
      shadcnCommand: "npx shadcn@latest add badge",
      peerDependencies: ["clsx", "tailwind-merge"],
      importPath: 'import { StatusFilterChips } from "@/components/dashboard/metrics";',
    },
    props: [
      { name: "options", type: "StatusFilterOption[]", description: "Array of filter items with id, label, count", required: true },
      { name: "selected", type: "StatusType | null", description: "Currently active status filter ID" },
      { name: "onSelect", type: "(id: StatusType | null) => void", description: "Selection callback handler", required: true },
    ],
    snippet: `import * as React from "react";
import { StatusFilterChips } from "@/components/dashboard/metrics";

export function Example() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const options = [
    { id: "live", label: "Compliant", count: 51 },
    { id: "drift", label: "Drift", count: 5 },
    { id: "missing", label: "Violations", count: 0 },
  ];
  return <StatusFilterChips options={options} selected={selected} onSelect={setSelected} />;
}`,
    mockData: { options: mocks.mockStatusFilterOptions, selected: "live" },
  },
  {
    id: "metrics-client-view",
    name: "MetricsClientView",
    exportName: "MetricsClientView",
    category: "metrics",
    categoryLabel: "Metrics & KPIs",
    description: "Full metrics composite dashboard screen coordinating KPI grids, health gauges, and interactive filters.",
    minHeight: 280,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card badge separator skeleton",
      peerDependencies: ["@phosphor-icons/react"],
      importPath: 'import { MetricsClientView } from "@/components/dashboard/metrics";',
    },
    props: [
      { name: "complianceData", type: "DuComplianceMatrixData", description: "Compliance data with invariant totals and health", required: true },
      { name: "contextTelemetry", type: "DuContextTelemetry", description: "Telemetry token budget and radar dimensions", required: true },
    ],
    snippet: `import { MetricsClientView } from "@/components/dashboard/metrics";

export function Example({ complianceData, contextTelemetry }: any) {
  return <MetricsClientView complianceData={complianceData} contextTelemetry={contextTelemetry} />;
}`,
    mockData: { complianceData: mocks.mockComplianceData, contextTelemetry: mocks.mockContextTelemetry },
  },

  // ==========================================
  // Category 2: Analytical Charts
  // ==========================================
  {
    id: "target-distribution-bar-chart",
    name: "TargetDistributionBarChart",
    exportName: "TargetDistributionBarChart",
    category: "charts",
    categoryLabel: "Analytical Charts",
    description: "Stacked horizontal bar chart visualizing live, drifted, and missing rule distributions across targets.",
    minHeight: 260,
    isLazy: true,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card chart",
      peerDependencies: ["recharts", "clsx", "tailwind-merge"],
      importPath: 'import { TargetDistributionBarChart } from "@/components/dashboard/charts";',
    },
    props: [
      { name: "data", type: "TargetDistributionItem[]", description: "Target breakdown array (target, live, drift, missing)", required: true },
      { name: "title", type: "string", default: "Target Capability Distribution", description: "Chart title header" },
      { name: "description", type: "string", description: "Subtitle description" },
      { name: "layout", type: "'horizontal' | 'vertical'", default: "'vertical'", description: "Bar orientation" },
    ],
    snippet: `import { TargetDistributionBarChart } from "@/components/dashboard/charts";

export function Example() {
  const data = [
    { target: "DEV-001", live: 28, drift: 3, missing: 1 },
    { target: "ai-app-foundation", live: 24, drift: 2, missing: 0 },
  ];
  return <TargetDistributionBarChart data={data} />;
}`,
    mockData: { data: mocks.mockTargetDistribution },
  },
  {
    id: "chart-skeleton",
    name: "ChartSkeleton",
    exportName: "ChartSkeleton",
    category: "charts",
    categoryLabel: "Analytical Charts",
    description: "Skeleton loader placeholder for Recharts asynchronous components.",
    minHeight: 240,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card skeleton",
      peerDependencies: ["clsx", "tailwind-merge"],
      importPath: 'import { ChartSkeleton } from "@/components/dashboard/charts";',
    },
    props: [],
    snippet: `import { ChartSkeleton } from "@/components/dashboard/charts";

export function Example() {
  return <ChartSkeleton />;
}`,
    mockData: {},
  },
  {
    id: "evaluation-radar-chart",
    name: "EvaluationRadarChart",
    exportName: "EvaluationRadarChart",
    category: "charts",
    categoryLabel: "Analytical Charts",
    description: "Polar multi-axial radar chart comparing candidate evaluation rubrics against baseline standards.",
    minHeight: 260,
    isLazy: true,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card chart",
      peerDependencies: ["recharts", "clsx", "tailwind-merge"],
      importPath: 'import { EvaluationRadarChart } from "@/components/dashboard/charts";',
    },
    props: [
      { name: "data", type: "EvaluationDimensionItem[]", description: "Dimensions array (dimension, candidate, baseline)", required: true },
      { name: "title", type: "string", default: "SkillScore Evaluation Radar", description: "Card header title" },
      { name: "candidateLabel", type: "string", default: "Candidate", description: "Legend label for primary polygon" },
      { name: "baselineLabel", type: "string", default: "Baseline", description: "Legend label for reference polygon" },
    ],
    snippet: `import { EvaluationRadarChart } from "@/components/dashboard/charts";

export function Example() {
  const data = [
    { dimension: "Decisions", candidate: 92, baseline: 80 },
    { dimension: "Constraints", candidate: 85, baseline: 75 },
  ];
  return <EvaluationRadarChart data={data} />;
}`,
    mockData: { data: mocks.mockEvaluationRadar },
  },
  {
    id: "timeline-activity-area-chart",
    name: "TimelineActivityAreaChart",
    exportName: "TimelineActivityAreaChart",
    category: "charts",
    categoryLabel: "Analytical Charts",
    description: "Gradient area chart plotting operational velocities, work sessions, and durable memory promotions over time.",
    minHeight: 260,
    isLazy: true,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card chart",
      peerDependencies: ["recharts", "clsx", "tailwind-merge"],
      importPath: 'import { TimelineActivityAreaChart } from "@/components/dashboard/charts";',
    },
    props: [
      { name: "data", type: "ActivityTimePoint[]", description: "Temporal data points (date, sessions, promotions)", required: true },
      { name: "title", type: "string", default: "Operational Velocity", description: "Card title" },
      { name: "description", type: "string", description: "Card description" },
    ],
    snippet: `import { TimelineActivityAreaChart } from "@/components/dashboard/charts";

export function Example() {
  const data = [
    { date: "09-01", sessions: 8, promotions: 2 },
    { date: "09-02", sessions: 11, promotions: 4 },
  ];
  return <TimelineActivityAreaChart data={data} />;
}`,
    mockData: { data: mocks.mockTimelineActivity },
  },
  {
    id: "charts-client-view",
    name: "ChartsClientView",
    exportName: "ChartsClientView",
    category: "charts",
    categoryLabel: "Analytical Charts",
    description: "Composite analytical screen combining distribution bars, radar rubrics, and velocity timelines.",
    minHeight: 300,
    isLazy: true,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card chart separator badge",
      peerDependencies: ["recharts", "clsx", "tailwind-merge"],
      importPath: 'import { ChartsClientView } from "@/components/dashboard/charts";',
    },
    props: [
      { name: "contextTelemetry", type: "DuContextTelemetry", description: "Telemetry dimensions and budget", required: true },
      { name: "graphifyData", type: "DuGraphifyData", description: "Graph coupling metrics and distributions", required: true },
    ],
    snippet: `import { ChartsClientView } from "@/components/dashboard/charts";

export function Example({ contextTelemetry, graphifyData }: any) {
  return <ChartsClientView contextTelemetry={contextTelemetry} graphifyData={graphifyData} />;
}`,
    mockData: mocks.mockChartsClientViewData,
  },

  // ==========================================
  // Category 3: Matrix & Heatmaps
  // ==========================================
  {
    id: "capability-matrix-heatmap",
    name: "CapabilityMatrixHeatmap",
    exportName: "CapabilityMatrixHeatmap",
    category: "matrix",
    categoryLabel: "Matrix & Heatmaps",
    description: "High-density matrix table grid with live status indicators, hover popovers, and target filtering.",
    minHeight: 260,
    requirements: {
      shadcnCommand: "npx shadcn@latest add badge input",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { CapabilityMatrixHeatmap } from "@/components/dashboard/matrix";',
    },
    props: [
      { name: "targets", type: "{ id: string; label: string }[]", description: "List of targets across table columns", required: true },
      { name: "rows", type: "MatrixRow[]", description: "Matrix rows with capabilities and cell status records", required: true },
    ],
    snippet: `import { CapabilityMatrixHeatmap } from "@/components/dashboard/matrix";

export function Example() {
  return <CapabilityMatrixHeatmap targets={targets} rows={rows} />;
}`,
    mockData: { targets: mocks.mockMatrixTargets, rows: mocks.mockMatrixRows },
  },
  {
    id: "data-table",
    name: "DataTable",
    exportName: "DataTable",
    category: "matrix",
    categoryLabel: "Matrix & Heatmaps",
    description: "Generic sortable and paginated data table with real-time text search and page navigation.",
    minHeight: 240,
    requirements: {
      shadcnCommand: "npx shadcn@latest add table button input",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { DataTable } from "@/components/dashboard/matrix";',
    },
    props: [
      { name: "data", type: "T[]", description: "Array of tabular row objects", required: true },
      { name: "columns", type: "DataTableColumn<T>[]", description: "Column definitions with headers and renderers", required: true },
      { name: "searchKey", type: "keyof T", description: "Object key used for instant text search filter" },
      { name: "pageSize", type: "number", default: "10", description: "Rows per pagination page" },
    ],
    snippet: `import { DataTable } from "@/components/dashboard/matrix";

export function Example() {
  return <DataTable data={auditData} columns={auditColumns} searchKey="rule" pageSize={5} />;
}`,
    mockData: { data: mocks.mockAuditData, columns: mocks.mockAuditColumns, searchKey: "rule" },
  },
  {
    id: "matrix-view-mode-toggle",
    name: "MatrixViewModeToggle",
    exportName: "MatrixViewModeToggle",
    category: "matrix",
    categoryLabel: "Matrix & Heatmaps",
    description: "Segmented switch button toggling between Capability Heatmap and Detailed Audit views.",
    minHeight: 80,
    requirements: {
      shadcnCommand: "npx shadcn@latest add button",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { MatrixViewModeToggle } from "@/components/dashboard/matrix";',
    },
    props: [
      { name: "mode", type: "'summary' | 'audit'", description: "Current view mode", required: true },
      { name: "onChange", type: "(mode: MatrixViewMode) => void", description: "Mode switch callback", required: true },
    ],
    snippet: `import * as React from "react";
import { MatrixViewModeToggle } from "@/components/dashboard/matrix";

export function Example() {
  const [mode, setMode] = React.useState<"summary" | "audit">("summary");
  return <MatrixViewModeToggle mode={mode} onChange={setMode} />;
}`,
    mockData: { mode: "summary" },
  },
  {
    id: "matrix-client-view",
    name: "MatrixClientView",
    exportName: "MatrixClientView",
    category: "matrix",
    categoryLabel: "Matrix & Heatmaps",
    description: "Composite matrix screen integrating mode toggles, capability heatmaps, and audit data tables.",
    minHeight: 280,
    requirements: {
      shadcnCommand: "npx shadcn@latest add table card badge input",
      peerDependencies: ["@phosphor-icons/react"],
      importPath: 'import { MatrixClientView } from "@/components/dashboard/matrix";',
    },
    props: [
      { name: "initialData", type: "DuComplianceMatrixData", description: "Initial compliance targets and rows", required: true },
    ],
    snippet: `import { MatrixClientView } from "@/components/dashboard/matrix";

export function Example({ initialData }: any) {
  return <MatrixClientView initialData={initialData} />;
}`,
    mockData: mocks.mockMatrixClientViewData,
  },

  // ==========================================
  // Category 4: Workflow & Lifecycle
  // ==========================================
  {
    id: "openspec-kanban-board",
    name: "OpenSpecKanbanBoard",
    exportName: "OpenSpecKanbanBoard",
    category: "workflow",
    categoryLabel: "Workflow & Lifecycle",
    description: "Horizontal 5-stage OpenSpec kanban board tracking proposed, specified, implementing, verified, and archived changes.",
    minHeight: 260,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card badge progress",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { OpenSpecKanbanBoard } from "@/components/dashboard/workflow";',
    },
    props: [
      { name: "changes", type: "KanbanChangeItem[]", description: "Array of change items with stage and task counters", required: true },
      { name: "onMoveStage", type: "(changeId: string, nextStage: OpenSpecStage) => void", description: "Optional card advance handler" },
    ],
    snippet: `import { OpenSpecKanbanBoard } from "@/components/dashboard/workflow";

export function Example() {
  return <OpenSpecKanbanBoard changes={changes} />;
}`,
    mockData: { changes: mocks.mockKanbanChanges },
  },
  {
    id: "phase-stepper",
    name: "PhaseStepper",
    exportName: "PhaseStepper",
    category: "workflow",
    categoryLabel: "Workflow & Lifecycle",
    description: "Multi-stage horizontal or vertical progress indicator connecting milestones with status checkmarks.",
    minHeight: 90,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { PhaseStepper } from "@/components/dashboard/workflow";',
    },
    props: [
      { name: "steps", type: "PhaseStep[]", description: "Array of step labels and descriptions", required: true },
      { name: "currentStepIndex", type: "number", description: "0-indexed active step", required: true },
      { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Layout orientation" },
    ],
    snippet: `import { PhaseStepper } from "@/components/dashboard/workflow";

export function Example() {
  const steps = [
    { id: "1", label: "Propose" },
    { id: "2", label: "Specify" },
    { id: "3", label: "Apply" },
  ];
  return <PhaseStepper steps={steps} currentStepIndex={2} />;
}`,
    mockData: { steps: mocks.mockPhaseSteps, currentStepIndex: 2 },
  },
  {
    id: "activity-timeline-feed",
    name: "ActivityTimelineFeed",
    exportName: "ActivityTimelineFeed",
    category: "workflow",
    categoryLabel: "Workflow & Lifecycle",
    description: "Vertical event stream with continuous connecting rail, icon milestones, and formatted timestamps.",
    minHeight: 220,
    requirements: {
      shadcnCommand: "npx shadcn@latest add badge",
      peerDependencies: ["clsx", "tailwind-merge"],
      importPath: 'import { ActivityTimelineFeed } from "@/components/dashboard/workflow";',
    },
    props: [
      { name: "events", type: "TimelineEventItem[]", description: "List of timestamped events with titles and tags", required: true },
    ],
    snippet: `import { ActivityTimelineFeed } from "@/components/dashboard/workflow";

export function Example() {
  return <ActivityTimelineFeed events={events} />;
}`,
    mockData: { events: mocks.mockTimelineEvents },
  },
  {
    id: "workflow-client-view",
    name: "WorkflowClientView",
    exportName: "WorkflowClientView",
    category: "workflow",
    categoryLabel: "Workflow & Lifecycle",
    description: "Composite lifecycle dashboard displaying OpenSpec board, phase stepper, and activity feeds.",
    minHeight: 300,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card badge progress separator",
      peerDependencies: ["@phosphor-icons/react"],
      importPath: 'import { WorkflowClientView } from "@/components/dashboard/workflow";',
    },
    props: [
      { name: "initialCandidates", type: "DuMemoryCandidate[]", description: "Memory candidates mapped to kanban items", required: true },
    ],
    snippet: `import { WorkflowClientView } from "@/components/dashboard/workflow";

export function Example({ initialCandidates }: any) {
  return <WorkflowClientView initialCandidates={initialCandidates} />;
}`,
    mockData: mocks.mockWorkflowClientViewData,
  },

  // ==========================================
  // Category 5: Inspection & Code
  // ==========================================
  {
    id: "code-diff-viewer",
    name: "CodeDiffViewer",
    exportName: "CodeDiffViewer",
    category: "inspection",
    categoryLabel: "Inspection & Code",
    description: "Syntax-colored diff inspector with unified/split mode toggle and added/removed line badges.",
    minHeight: 220,
    requirements: {
      shadcnCommand: "npx shadcn@latest add badge",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { CodeDiffViewer } from "@/components/dashboard/inspection";',
    },
    props: [
      { name: "diffLines", type: "DiffLine[]", description: "Array of diff line objects with type and content", required: true },
      { name: "title", type: "string", default: "File Difference", description: "Diff header title" },
      { name: "oldFilename", type: "string", default: "a/original.ts", description: "Original file path" },
      { name: "newFilename", type: "string", default: "b/modified.ts", description: "Modified file path" },
    ],
    snippet: `import { CodeDiffViewer } from "@/components/dashboard/inspection";

export function Example() {
  return <CodeDiffViewer diffLines={diffLines} title="AGENTS.md Diff" />;
}`,
    mockData: { diffLines: mocks.mockDiffLines },
  },
  {
    id: "markdown-reader",
    name: "MarkdownReader",
    exportName: "MarkdownReader",
    category: "inspection",
    categoryLabel: "Inspection & Code",
    description: "Lightweight, zero-XSS sanitized markdown renderer with checkbox support and clean typography.",
    minHeight: 180,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card",
      peerDependencies: ["clsx", "tailwind-merge"],
      importPath: 'import { MarkdownReader } from "@/components/dashboard/inspection";',
    },
    props: [
      { name: "content", type: "string", description: "Markdown text content", required: true },
      { name: "className", type: "string", description: "Optional container styles" },
    ],
    snippet: `import { MarkdownReader } from "@/components/dashboard/inspection";

export function Example() {
  return <MarkdownReader content="# Hello World\\n- [x] Task 1" />;
}`,
    mockData: { content: mocks.mockMarkdownDoc },
  },
  {
    id: "masked-secret-viewer",
    name: "MaskedSecretViewer",
    exportName: "MaskedSecretViewer",
    category: "inspection",
    categoryLabel: "Inspection & Code",
    description: "Secure credential inspection component with click-to-reveal toggle and clipboard copy button.",
    minHeight: 100,
    requirements: {
      shadcnCommand: "npx shadcn@latest add button",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { MaskedSecretViewer } from "@/components/dashboard/inspection";',
    },
    props: [
      { name: "label", type: "string", description: "Identifier label for the secret", required: true },
      { name: "value", type: "string", description: "Underlying plaintext value", required: true },
    ],
    snippet: `import { MaskedSecretViewer } from "@/components/dashboard/inspection";

export function Example() {
  return <MaskedSecretViewer label="DATABASE_URL" value="file:./dev.db" />;
}`,
    mockData: mocks.mockMaskedSecrets[0],
  },
  {
    id: "file-tree-navigator",
    name: "FileTreeNavigator",
    exportName: "FileTreeNavigator",
    category: "inspection",
    categoryLabel: "Inspection & Code",
    description: "Interactive collapsible file and directory tree with folder toggles and selection callbacks.",
    minHeight: 220,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { FileTreeNavigator } from "@/components/dashboard/inspection";',
    },
    props: [
      { name: "nodes", type: "FileTreeNode[]", description: "Recursive node tree data", required: true },
      { name: "selectedId", type: "string", description: "ID of currently active selected node" },
      { name: "onSelectNode", type: "(node: FileTreeNode) => void", description: "Selection handler", required: true },
    ],
    snippet: `import { FileTreeNavigator } from "@/components/dashboard/inspection";

export function Example() {
  return <FileTreeNavigator nodes={fileNodes} onSelectNode={console.log} />;
}`,
    mockData: { nodes: mocks.mockFileTreeNodes },
  },
  {
    id: "inspection-client-view",
    name: "InspectionClientView",
    exportName: "InspectionClientView",
    category: "inspection",
    categoryLabel: "Inspection & Code",
    description: "Composite inspector combining file navigator, diff previewer, and secret revealer.",
    minHeight: 280,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card badge button separator",
      peerDependencies: ["@phosphor-icons/react"],
      importPath: 'import { InspectionClientView } from "@/components/dashboard/inspection";',
    },
    props: [
      { name: "ruleSyncData", type: "DuRuleSyncData", description: "RuleSync drift and diff preview", required: true },
      { name: "initialInvariant", type: "DuInvariant | null", description: "Optional initial invariant details" },
    ],
    snippet: `import { InspectionClientView } from "@/components/dashboard/inspection";

export function Example({ ruleSyncData }: any) {
  return <InspectionClientView ruleSyncData={ruleSyncData} />;
}`,
    mockData: mocks.mockInspectionClientViewData,
  },

  // ==========================================
  // Category 6: Agent Pipelines
  // ==========================================
  {
    id: "agent-runtime-card-grid",
    name: "AgentRuntimeCardGrid",
    exportName: "AgentRuntimeCardGrid",
    category: "agents",
    categoryLabel: "Agent Pipelines",
    description: "Grid of active AI agent cards displaying model tier, runtime status badge, and capabilities count.",
    minHeight: 180,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card badge",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { AgentRuntimeCardGrid } from "@/components/dashboard/agents";',
    },
    props: [
      { name: "agents", type: "AgentRuntimeItem[]", description: "Array of agent status records", required: true },
    ],
    snippet: `import { AgentRuntimeCardGrid } from "@/components/dashboard/agents";

export function Example() {
  return <AgentRuntimeCardGrid agents={agents} />;
}`,
    mockData: { agents: mocks.mockAgents },
  },
  {
    id: "agent-card-skeleton",
    name: "AgentCardSkeleton",
    exportName: "AgentCardSkeleton",
    category: "agents",
    categoryLabel: "Agent Pipelines",
    description: "Shimmer skeleton fallback for agent runtime grid cards during background polling.",
    minHeight: 160,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card skeleton",
      peerDependencies: ["clsx", "tailwind-merge"],
      importPath: 'import { AgentCardSkeleton } from "@/components/dashboard/agents";',
    },
    props: [],
    snippet: `import { AgentCardSkeleton } from "@/components/dashboard/agents";

export function Example() {
  return <AgentCardSkeleton />;
}`,
    mockData: {},
  },
  {
    id: "multi-agent-chat-stream",
    name: "MultiAgentChatStream",
    exportName: "MultiAgentChatStream",
    category: "agents",
    categoryLabel: "Agent Pipelines",
    description: "Transcript stream displaying multi-agent dialogue with collapsible thinking accordion blocks.",
    minHeight: 240,
    requirements: {
      shadcnCommand: "npx shadcn@latest add badge",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { MultiAgentChatStream } from "@/components/dashboard/agents";',
    },
    props: [
      { name: "messages", type: "AgentChatMessage[]", description: "Message items with agent name, thinking, and content", required: true },
    ],
    snippet: `import { MultiAgentChatStream } from "@/components/dashboard/agents";

export function Example() {
  return <MultiAgentChatStream messages={chatMessages} />;
}`,
    mockData: { messages: mocks.mockChatMessages },
  },
  {
    id: "human-review-banner",
    name: "HumanReviewBanner",
    exportName: "HumanReviewBanner",
    category: "agents",
    categoryLabel: "Agent Pipelines",
    description: "Prominent banner alerting developers to pending memory promotions or gated approvals.",
    minHeight: 110,
    requirements: {
      shadcnCommand: "npx shadcn@latest add button",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { HumanReviewBanner } from "@/components/dashboard/agents";',
    },
    props: [
      { name: "title", type: "string", description: "Review request title", required: true },
      { name: "description", type: "string", description: "Detailed justification for review", required: true },
      { name: "onApprove", type: "() => void", description: "Approve callback action", required: true },
      { name: "onReject", type: "() => void", description: "Reject callback action", required: true },
      { name: "onInspect", type: "() => void", description: "Optional inspect callback" },
    ],
    snippet: `import { HumanReviewBanner } from "@/components/dashboard/agents";

export function Example() {
  return (
    <HumanReviewBanner
      title="Approve Memory Promotion"
      description="Agent proposes promoting candidate MEM-0279 to canonical notes."
      onApprove={() => alert("Approved")}
      onReject={() => alert("Rejected")}
    />
  );
}`,
    mockData: mocks.mockHumanReview,
  },
  {
    id: "agents-client-view",
    name: "AgentsClientView",
    exportName: "AgentsClientView",
    category: "agents",
    categoryLabel: "Agent Pipelines",
    description: "Full agent cockpit view orchestrating agent runtime cards, thinking streams, and approval banners.",
    minHeight: 280,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card badge button separator skeleton",
      peerDependencies: ["@phosphor-icons/react"],
      importPath: 'import { AgentsClientView } from "@/components/dashboard/agents";',
    },
    props: [],
    snippet: `import { AgentsClientView } from "@/components/dashboard/agents";

export function Example() {
  return <AgentsClientView />;
}`,
    mockData: mocks.mockAgentsClientViewData,
  },

  // ==========================================
  // Category 7: Developer Actions
  // ==========================================
  {
    id: "remediation-terminal-card",
    name: "RemediationTerminalCard",
    exportName: "RemediationTerminalCard",
    category: "actions",
    categoryLabel: "Developer Actions",
    description: "Dark-themed simulated terminal card with Bash/PowerShell tab toggle and one-click copy button.",
    minHeight: 150,
    requirements: {
      shadcnCommand: "npx shadcn@latest add button",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { RemediationTerminalCard } from "@/components/dashboard/actions";',
    },
    props: [
      { name: "commands", type: "{ bash?: string; powershell?: string }", description: "Shell command variations", required: true },
      { name: "title", type: "string", default: "Remediation Command", description: "Terminal card header title" },
      { name: "description", type: "string", description: "Contextual explanation beneath header" },
    ],
    snippet: `import { RemediationTerminalCard } from "@/components/dashboard/actions";

export function Example() {
  return (
    <RemediationTerminalCard
      title="RuleSync Fix"
      commands={{
        bash: "rulesync generate && pnpm test",
        powershell: "powershell -File ./scripts/rulesync-generate.ps1 ; pnpm test",
      }}
    />
  );
}`,
    mockData: { commands: mocks.mockRemediationCommands },
  },
  {
    id: "quick-filter-toolbar",
    name: "QuickFilterToolbar",
    exportName: "QuickFilterToolbar",
    category: "actions",
    categoryLabel: "Developer Actions",
    description: "Toolbar uniting search input, status filter chips, and custom action slots into a cohesive bar.",
    minHeight: 90,
    requirements: {
      shadcnCommand: "npx shadcn@latest add input badge",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { QuickFilterToolbar } from "@/components/dashboard/actions";',
    },
    props: [
      { name: "search", type: "string", description: "Current search input query", required: true },
      { name: "onSearchChange", type: "(val: string) => void", description: "Search query update handler", required: true },
      { name: "statusOptions", type: "StatusFilterOption[]", description: "Status filter pills", required: true },
      { name: "selectedStatus", type: "StatusType | null", description: "Currently active status pill" },
      { name: "onStatusSelect", type: "(status: StatusType | null) => void", description: "Status select handler", required: true },
    ],
    snippet: `import { QuickFilterToolbar } from "@/components/dashboard/actions";

export function Example() {
  return (
    <QuickFilterToolbar
      search=""
      onSearchChange={console.log}
      statusOptions={options}
      selectedStatus={null}
      onStatusSelect={console.log}
    />
  );
}`,
    mockData: mocks.mockQuickFilterData,
  },
  {
    id: "global-command-palette",
    name: "GlobalCommandPalette",
    exportName: "GlobalCommandPalette",
    category: "actions",
    categoryLabel: "Developer Actions",
    description: "Keyboard-driven Cmd+K / Ctrl+K modal palette with category grouping and instant route navigation.",
    minHeight: 120,
    requirements: {
      shadcnCommand: "npx shadcn@latest add dialog input",
      peerDependencies: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
      importPath: 'import { GlobalCommandPalette } from "@/components/dashboard/actions";',
    },
    props: [
      { name: "items", type: "CommandItem[]", description: "List of command palette navigation targets", required: true },
    ],
    snippet: `import { GlobalCommandPalette } from "@/components/dashboard/actions";

export function Example() {
  const items = [
    { id: "1", title: "Run Quality Gates", category: "Verification" },
    { id: "2", title: "Open Library Hub", category: "Navigation", href: "/dashboard/library" },
  ];
  return <GlobalCommandPalette items={items} />;
}`,
    mockData: { items: mocks.mockCommandPaletteItems },
  },
  {
    id: "actions-client-view",
    name: "ActionsClientView",
    exportName: "ActionsClientView",
    category: "actions",
    categoryLabel: "Developer Actions",
    description: "Composite developer actions hub coordinating remediation commands, palette shortcuts, and toolbars.",
    minHeight: 280,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card button input separator",
      peerDependencies: ["@phosphor-icons/react"],
      importPath: 'import { ActionsClientView } from "@/components/dashboard/actions";',
    },
    props: [
      { name: "actionCommands", type: "DuActionCommand[]", description: "Array of available developer actions", required: true },
    ],
    snippet: `import { ActionsClientView } from "@/components/dashboard/actions";

export function Example({ actionCommands }: any) {
  return <ActionsClientView actionCommands={actionCommands} />;
}`,
    mockData: mocks.mockActionsClientViewData,
  },

  // ==========================================
  // Category 8: Web & Marketing
  // ==========================================
  {
    id: "marketing-hero",
    name: "Hero",
    exportName: "Hero",
    category: "web",
    categoryLabel: "Web & Marketing",
    description: "Composable hero layout supporting split, centered, and minimal variants with fluid typography.",
    minHeight: 220,
    requirements: {
      shadcnCommand: "npx shadcn@latest add button badge",
      peerDependencies: ["@phosphor-icons/react", "class-variance-authority"],
      importPath: 'import { Hero, HeroContent, HeroTitle, HeroDescription, HeroActions } from "@/components/web";',
    },
    props: [
      { name: "variant", type: '"centered" | "split" | "minimal"', default: '"centered"', description: "Layout positioning mode" },
      { name: "as", type: "React.ElementType", default: '"section"', description: "HTML container element" },
    ],
    snippet: `import { Hero, HeroContent, HeroTitle, HeroDescription, HeroActions } from "@/components/web";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <Hero variant="centered">
      <HeroContent align="center">
        <HeroTitle>Build Multi-App Foundations</HeroTitle>
        <HeroDescription>Modular, accessible UI primitives for modern web portals and SaaS.</HeroDescription>
        <HeroActions>
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">Explore Docs</Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  );
}`,
    mockData: {},
  },
  {
    id: "feature-grid",
    name: "FeatureGrid",
    exportName: "FeatureGrid",
    category: "web",
    categoryLabel: "Web & Marketing",
    description: "Responsive multi-column feature and bento grid layout with icon badges and hover elevations.",
    minHeight: 200,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card",
      peerDependencies: ["@phosphor-icons/react", "class-variance-authority"],
      importPath: 'import { FeatureGrid, FeatureCard, FeatureCardHeader, FeatureCardIcon, FeatureCardTitle, FeatureCardDescription } from "@/components/web";',
    },
    props: [
      { name: "columns", type: '2 | 3 | 4 | "bento"', default: "3", description: "Grid column density mode" },
    ],
    snippet: `import { FeatureGrid, FeatureCard, FeatureCardHeader, FeatureCardIcon, FeatureCardTitle, FeatureCardDescription } from "@/components/web";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";

export function Example() {
  return (
    <FeatureGrid columns={3}>
      <FeatureCard>
        <FeatureCardHeader>
          <FeatureCardIcon><Sparkle /></FeatureCardIcon>
          <FeatureCardTitle>High Performance</FeatureCardTitle>
          <FeatureCardDescription>Pure RSC components with zero unnecessary client bundle overhead.</FeatureCardDescription>
        </FeatureCardHeader>
      </FeatureCard>
    </FeatureGrid>
  );
}`,
    mockData: {},
  },
  {
    id: "showcase-card",
    name: "ShowcaseCard",
    exportName: "ShowcaseCard",
    category: "web",
    categoryLabel: "Web & Marketing",
    description: "Polymorphic catalog card for courses, tools, or apps with metadata tuples and reserved media slot.",
    minHeight: 200,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card badge skeleton",
      peerDependencies: ["@phosphor-icons/react"],
      importPath: 'import { ShowcaseCard, ShowcaseCardSkeleton } from "@/components/web";',
    },
    props: [
      { name: "title", type: "string", description: "Card title heading", required: true },
      { name: "description", type: "string", description: "Card summary text", required: true },
      { name: "badge", type: "string", description: "Optional category tag or status label" },
      { name: "metadata", type: "ShowcaseMetadata[]", description: "Array of label, value, icon tuples" },
    ],
    snippet: `import { ShowcaseCard } from "@/components/web";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <ShowcaseCard
      badge="Formação"
      title="Inteligência Artificial Aplicada"
      description="Capacitação prática em ferramentas modernas de produtividade e IA."
      metadata={[
        { label: "Duração", value: "24h" },
        { label: "Nível", value: "Intermédio" }
      ]}
      actionSlot={<Button className="w-full">Inscrever</Button>}
    />
  );
}`,
    mockData: {},
  },
  {
    id: "process-steps",
    name: "ProcessSteps",
    exportName: "ProcessSteps",
    category: "web",
    categoryLabel: "Web & Marketing",
    description: "Accessible sequential workflow stepper with screen-reader status and status rings.",
    minHeight: 180,
    requirements: {
      shadcnCommand: "npx shadcn@latest add badge",
      peerDependencies: ["class-variance-authority"],
      importPath: 'import { ProcessSteps, StepItem, StepTitle, StepDescription } from "@/components/web";',
    },
    props: [
      { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Layout direction" },
    ],
    snippet: `import { ProcessSteps, StepItem, StepTitle, StepDescription } from "@/components/web";

export function Example() {
  return (
    <ProcessSteps orientation="vertical">
      <StepItem stepNumber={1} status="completed">
        <StepTitle>Diagnóstico Inicial</StepTitle>
        <StepDescription>Avaliação de competências digitais.</StepDescription>
      </StepItem>
      <StepItem stepNumber={2} status="active">
        <StepTitle>Capacitação</StepTitle>
        <StepDescription>Sessões práticas e projetos em equipa.</StepDescription>
      </StepItem>
    </ProcessSteps>
  );
}`,
    mockData: {},
  },
  {
    id: "callout",
    name: "Callout",
    exportName: "Callout",
    category: "web",
    categoryLabel: "Web & Marketing",
    description: "CVA-driven semantic callout box for tips, warnings, notes, and accents.",
    minHeight: 100,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card",
      peerDependencies: ["class-variance-authority"],
      importPath: 'import { Callout } from "@/components/web";',
    },
    props: [
      { name: "variant", type: '"tip" | "info" | "warning" | "accent"', default: '"tip"', description: "Semantic appearance" },
      { name: "title", type: "string", description: "Optional bold header" },
      { name: "icon", type: "React.ReactNode", description: "Leading icon element" },
    ],
    snippet: `import { Callout } from "@/components/web";
import { Lightbulb } from "@phosphor-icons/react/dist/ssr";

export function Example() {
  return (
    <Callout variant="tip" icon={<Lightbulb />} title="Dica Prática">
      Utilize o atalho Ctrl+K para abrir o comando de navegação rápida em qualquer ecrã.
    </Callout>
  );
}`,
    mockData: {},
  },
  {
    id: "testimonial-card",
    name: "TestimonialCard",
    exportName: "TestimonialCard",
    category: "web",
    categoryLabel: "Web & Marketing",
    description: "Social proof feedback card with accessible star rating, avatar fallback, and quote.",
    minHeight: 180,
    requirements: {
      shadcnCommand: "npx shadcn@latest add card avatar skeleton",
      peerDependencies: ["@phosphor-icons/react"],
      importPath: 'import { TestimonialCard, TestimonialCardSkeleton } from "@/components/web";',
    },
    props: [
      { name: "authorName", type: "string", description: "Full name of user/student", required: true },
      { name: "authorRole", type: "string", description: "Role, title, or company" },
      { name: "quote", type: "string", description: "Testimonial review text", required: true },
      { name: "rating", type: "number", default: "5", description: "Star count (1-5)" },
    ],
    snippet: `import { TestimonialCard } from "@/components/web";

export function Example() {
  return (
    <TestimonialCard
      authorName="Ana Silva"
      authorRole="Formanda de IA Aplicada"
      quote="O curso transformou a forma como a nossa equipa gere a documentação e processos diários."
      rating={5}
    />
  );
}`,
    mockData: {},
  },
  {
    id: "cta-banner",
    name: "CtaBanner",
    exportName: "CtaBanner",
    category: "web",
    categoryLabel: "Web & Marketing",
    description: "Full-width conversion banner with high-contrast background and action slots.",
    minHeight: 160,
    requirements: {
      shadcnCommand: "npx shadcn@latest add button",
      peerDependencies: [],
      importPath: 'import { CtaBanner, CtaBannerTitle, CtaBannerDescription, CtaBannerActions } from "@/components/web";',
    },
    props: [
      { name: "variant", type: '"solid" | "bordered"', default: '"solid"', description: "Color theme style" },
    ],
    snippet: `import { CtaBanner, CtaBannerTitle, CtaBannerDescription, CtaBannerActions } from "@/components/web";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <CtaBanner variant="solid">
      <CtaBannerTitle>Pronto para Começar?</CtaBannerTitle>
      <CtaBannerDescription>Junte-se a centenas de participantes e acelere a sua evolução digital.</CtaBannerDescription>
      <CtaBannerActions>
        <Button variant="secondary" size="lg">Inscrever Agora</Button>
      </CtaBannerActions>
    </CtaBanner>
  );
}`,
    mockData: {},
  },
];
