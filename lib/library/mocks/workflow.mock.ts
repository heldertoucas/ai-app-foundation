import type { KanbanChangeItem } from "@/components/dashboard/workflow/openspec-kanban-board";
import type { PhaseStep } from "@/components/dashboard/workflow/phase-stepper";
import type { TimelineEventItem } from "@/components/dashboard/workflow/activity-timeline-feed";
import type { DuMemoryCandidate } from "@/lib/du/types";

export const mockKanbanChanges: KanbanChangeItem[] = [
  {
    id: "CHG-001",
    name: "auth-rbac-tiering",
    title: "RBAC Permission Scoping",
    stage: "proposed",
    schema: "spec-v1",
    tasksDone: 0,
    tasksTotal: 6,
    updatedAt: "2h ago",
  },
  {
    id: "CHG-002",
    name: "sqlite-wal-telemetry",
    title: "SQLite WAL Telemetry Adapter",
    stage: "specified",
    schema: "spec-v1",
    tasksDone: 2,
    tasksTotal: 8,
    updatedAt: "4h ago",
  },
  {
    id: "CHG-003",
    name: "dashboard-component-library",
    title: "Component & Design System Showcase",
    stage: "implementing",
    schema: "spec-v1",
    tasksDone: 5,
    tasksTotal: 10,
    updatedAt: "10m ago",
  },
  {
    id: "CHG-004",
    name: "next16-turbopack-tuning",
    title: "Turbopack Build Optimization",
    stage: "verified",
    schema: "spec-v1",
    tasksDone: 7,
    tasksTotal: 7,
    updatedAt: "1d ago",
  },
  {
    id: "CHG-005",
    name: "rulesync-agent-contract",
    title: "RuleSync Multi-Agent Protocol",
    stage: "archived",
    schema: "spec-v1",
    tasksDone: 9,
    tasksTotal: 9,
    updatedAt: "3d ago",
  },
];

export const mockPhaseSteps: PhaseStep[] = [
  { id: "1", label: "Propose", description: "Design & Spec" },
  { id: "2", label: "Specify", description: "Contract Review" },
  { id: "3", label: "Apply", description: "Test-Driven Impl" },
  { id: "4", label: "Verify", description: "Quality Gates" },
  { id: "5", label: "Archive", description: "Memory Reflection" },
];

export const mockTimelineEvents: TimelineEventItem[] = [
  {
    id: "EVT-1",
    title: "OpenSpec Change Verified",
    timestamp: "2026-09-11T16:20:00Z",
    description: "dashboard-component-library gates passed with 0 errors across typecheck, unit tests, and build.",
    tag: "Verification",
  },
  {
    id: "EVT-2",
    title: "Memory Candidate Staged",
    timestamp: "2026-09-11T15:45:00Z",
    description: "Proposed candidate MEM-0280 for lazy-loaded component preview pattern.",
    tag: "Governance",
  },
  {
    id: "EVT-3",
    title: "Session Initialized",
    timestamp: "2026-09-11T15:00:00Z",
    description: "SES-2026-09-11-004 started with full context capsule retrieved from dev-universe.",
    tag: "Lifecycle",
  },
];

export const mockMemoryCandidates: DuMemoryCandidate[] = [
  {
    id: "MEM-0278",
    title: "Isolated Mock Architecture for Local-First UI Showcases",
    targetType: "pattern",
    stage: "evaluated",
    confidence: "high",
    scope: "project",
    originatingSession: "SES-2026-09-11-001",
    snippet: "Colocating static typed mocks in lib/library/mocks/ eliminates DB dependencies for component testing and previews.",
    date: "2026-09-11",
  },
  {
    id: "MEM-0279",
    title: "Per-Card ErrorBoundary Containment for Dynamic Component Galleries",
    targetType: "pattern",
    stage: "staged",
    confidence: "high",
    scope: "global",
    originatingSession: "SES-2026-09-11-002",
    snippet: "Preventing page-wide crash when individual chart or preview components experience unhandled DOM errors.",
    date: "2026-09-11",
  },
  {
    id: "MEM-0280",
    title: "SQLite WAL Mode Busy Timeout Concurrency Guard",
    targetType: "decision",
    stage: "canonical",
    confidence: "high",
    scope: "project",
    originatingSession: "SES-2026-09-10-001",
    snippet: "Configuring connection_limit=1&busy_timeout=10000 ensures deterministic file locking without database locks.",
    date: "2026-09-10",
  },
];

export const mockWorkflowClientViewData = {
  initialCandidates: mockMemoryCandidates,
};
