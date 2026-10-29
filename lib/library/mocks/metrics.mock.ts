import type { StatusFilterOption } from "@/components/dashboard/metrics/status-filter-chips";
import type { DuComplianceMatrixData, DuContextTelemetry } from "@/lib/du/types";

export const mockKpiStatCards = [
  {
    title: "Total Invariants",
    value: "56",
    change: 0,
    changePeriod: "DEV-001 Foundation",
    description: "Active system constraints",
  },
  {
    title: "Ecosystem Health",
    value: "92%",
    change: 1.2,
    changePeriod: "vs last sprint",
    description: "Overall compliance score",
  },
  {
    title: "Capsule Utilization",
    value: "64%",
    description: "12,450 tok headroom",
    change: -2.5,
  },
  {
    title: "Resolution SLA",
    value: "18m",
    description: "Mean time to sync",
    change: 4.8,
  },
];

export const mockHealthGaugeData = {
  value: 92,
  label: "Invariant Compliance",
  size: 140,
  strokeWidth: 12,
};

export const mockHealthGaugeTiers = [
  { value: 95, label: "Compliant (High)" },
  { value: 78, label: "Warning (Drift)" },
  { value: 45, label: "Critical (Violations)" },
];

export const mockStatusFilterOptions: StatusFilterOption[] = [
  { id: "live", label: "Compliant", count: 51 },
  { id: "drift", label: "Drift / Warning", count: 5 },
  { id: "missing", label: "Violations", count: 0 },
  { id: "unsupported", label: "Unsupported", count: 0 },
];

export const mockComplianceData: DuComplianceMatrixData = {
  targets: [
    { id: "DEV-001", label: "Dev Ecosystem" },
    { id: "ai-app-foundation", label: "ai-app-foundation" },
    { id: "PRJ-0001", label: "Agent Engine" },
    { id: "PRJ-0017", label: "RuleSync Core" },
  ],
  overallHealth: 92,
  passCount: 51,
  totalInvariants: 56,
  rows: [
    {
      id: "DU-001",
      category: "Lifecycle",
      capability: "DU-001: Repo Resolution",
      description: "Canonical repo and project identity resolved during bootstrap",
      cells: {
        "DEV-001": { targetId: "DEV-001", status: "live", detail: "Resolved to REP-0001" },
        "ai-app-foundation": { targetId: "ai-app-foundation", status: "live", detail: "Direct workspace path resolved" },
        "PRJ-0001": { targetId: "PRJ-0001", status: "live", detail: "Workspace identity confirmed" },
        "PRJ-0017": { targetId: "PRJ-0017", status: "live", detail: "Verified upstream git remote" },
      },
    },
    {
      id: "DU-002",
      category: "Lifecycle",
      capability: "DU-002: Session Context",
      description: "Explicit session start logged before substantial work",
      cells: {
        "DEV-001": { targetId: "DEV-001", status: "live", detail: "Active session logged" },
        "ai-app-foundation": { targetId: "ai-app-foundation", status: "live", detail: "Context initialized" },
        "PRJ-0001": { targetId: "PRJ-0001", status: "drift", detail: "Session start recorded with 2m delay" },
        "PRJ-0017": { targetId: "PRJ-0017", status: "live", detail: "Session start observed" },
      },
    },
  ],
};

export const mockContextTelemetry: DuContextTelemetry = {
  radarDimensions: [
    { subject: "Decisions (ADR)", value: 92, fullMark: 100 },
    { subject: "Constraints", value: 85, fullMark: 100 },
    { subject: "Patterns", value: 78, fullMark: 100 },
    { subject: "Problems", value: 90, fullMark: 100 },
    { subject: "Graphify Bounds", value: 95, fullMark: 100 },
    { subject: "RuleSync Parity", value: 88, fullMark: 100 },
  ],
  tokenBudget: {
    system: 4500,
    memory: 8200,
    workspace: 15400,
    headroom: 12450,
    totalBudget: 40550,
    usedPercent: 64,
  },
  activeEntities: [
    { id: "PRJ-0001", title: "DU Engine", type: "project", score: 0.95 },
    { id: "CON-0012", title: "Dogfooding Policy", type: "constraint", score: 0.88 },
  ],
};
