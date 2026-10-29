import type { TargetDistributionItem } from "@/components/dashboard/charts/target-distribution-bar-chart";
import type { EvaluationDimensionItem } from "@/components/dashboard/charts/evaluation-radar-chart";
import type { ActivityTimePoint } from "@/components/dashboard/charts/timeline-activity-area-chart";
import type { DuGraphifyData } from "@/lib/du/types";
import { mockContextTelemetry } from "./metrics.mock";

export const mockTargetDistribution: TargetDistributionItem[] = [
  { target: "DEV-001 (Ecosystem)", live: 28, drift: 3, missing: 1 },
  { target: "ai-app-foundation", live: 24, drift: 2, missing: 0 },
  { target: "PRJ-0001 (Engine)", live: 19, drift: 4, missing: 2 },
  { target: "PRJ-0017 (RuleSync)", live: 16, drift: 1, missing: 0 },
  { target: "PRJ-0010 (Caveman)", live: 14, drift: 0, missing: 1 },
];

export const mockEvaluationRadar: EvaluationDimensionItem[] = [
  { dimension: "Decisions (ADR)", candidate: 92, baseline: 80 },
  { dimension: "Constraints", candidate: 85, baseline: 75 },
  { dimension: "Patterns", candidate: 78, baseline: 82 },
  { dimension: "Problems", candidate: 90, baseline: 70 },
  { dimension: "Graphify Bounds", candidate: 95, baseline: 85 },
  { dimension: "RuleSync Parity", candidate: 88, baseline: 80 },
];

export const mockTimelineActivity: ActivityTimePoint[] = [
  { date: "09-01", sessions: 8, promotions: 2 },
  { date: "09-02", sessions: 11, promotions: 4 },
  { date: "09-03", sessions: 14, promotions: 5 },
  { date: "09-04", sessions: 9, promotions: 3 },
  { date: "09-05", sessions: 16, promotions: 7 },
  { date: "09-06", sessions: 12, promotions: 4 },
  { date: "09-07", sessions: 18, promotions: 9 },
  { date: "09-08", sessions: 15, promotions: 6 },
  { date: "09-09", sessions: 21, promotions: 11 },
  { date: "09-10", sessions: 19, promotions: 8 },
];

export const mockGraphifyData: DuGraphifyData = {
  godNodes: [
    { file: "lib/du/context-adapter.ts", inDegree: 14, outDegree: 8, totalCoupling: 22, riskLevel: "high" },
    { file: "lib/du/compliance-adapter.ts", inDegree: 9, outDegree: 5, totalCoupling: 14, riskLevel: "medium" },
    { file: "components/app-sidebar.tsx", inDegree: 7, outDegree: 3, totalCoupling: 10, riskLevel: "low" },
  ],
  categoryDistributions: [
    { category: "Core Adapters", count: 24 },
    { category: "Dashboard UI", count: 32 },
    { category: "System Governance", count: 18 },
    { category: "Test Harness", count: 12 },
  ],
  boundaryViolations: [
    { source: "components/dashboard/metrics", target: "lib/du/fixtures", rule: "Server-only fixture leakage" },
  ],
};

export const mockChartsClientViewData = {
  contextTelemetry: mockContextTelemetry,
  graphifyData: mockGraphifyData,
};
