"use client";

import * as React from "react";
import {
  TargetDistributionBarChart,
  EvaluationRadarChart,
  TimelineActivityAreaChart,
} from "@/components/dashboard/charts";
import { Separator } from "@/components/ui/separator";

const mockTargetData = [
  { target: "Claude", live: 18, drift: 2, missing: 1 },
  { target: "Gemini", live: 16, drift: 3, missing: 2 },
  { target: "Cursor", live: 14, drift: 4, missing: 3 },
  { target: "Copilot", live: 12, drift: 5, missing: 4 },
  { target: "OpenCode", live: 17, drift: 1, missing: 1 },
];

const mockRadarData = [
  { dimension: "Architecture", candidate: 94, baseline: 82 },
  { dimension: "Portability", candidate: 88, baseline: 75 },
  { dimension: "Safety", candidate: 98, baseline: 90 },
  { dimension: "Determinism", candidate: 92, baseline: 80 },
  { dimension: "Context Eff.", candidate: 85, baseline: 70 },
];

const mockActivityData = [
  { date: "09-01", sessions: 4, promotions: 1 },
  { date: "09-02", sessions: 7, promotions: 3 },
  { date: "09-03", sessions: 5, promotions: 2 },
  { date: "09-04", sessions: 9, promotions: 4 },
  { date: "09-05", sessions: 12, promotions: 6 },
  { date: "09-06", sessions: 8, promotions: 3 },
  { date: "09-07", sessions: 15, promotions: 8 },
  { date: "09-08", sessions: 11, promotions: 5 },
  { date: "09-09", sessions: 16, promotions: 7 },
  { date: "09-10", sessions: 21, promotions: 11 },
];

export default function ChartsShowcasePage() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
            Category 2
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Analytical Charts & Rubrics
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Theme-aware Recharts visualizations utilizing semantic tokens (--chart-1..5) with flawless light/dark mode parity.
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TargetDistributionBarChart data={mockTargetData} />
        <EvaluationRadarChart data={mockRadarData} candidateLabel="Candidate App" baselineLabel="Standard Template" />
      </div>

      <div>
        <TimelineActivityAreaChart data={mockActivityData} />
      </div>
    </div>
  );
}
