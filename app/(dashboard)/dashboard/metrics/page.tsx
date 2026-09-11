"use client";

import * as React from "react";
import { KpiStatCard, KpiStatCardSkeleton, HealthGauge, StatusFilterChips, type StatusType } from "@/components/dashboard/metrics";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FolderKanban, CheckCircle2, TrendingUp, Clock, ShieldCheck, Cpu } from "lucide-react";

export default function MetricsShowcasePage() {
  const [selectedStatus, setSelectedStatus] = React.useState<StatusType | null>(null);

  const filterOptions = [
    { id: "live", label: "Live", count: 42 },
    { id: "drift", label: "Drift", count: 7 },
    { id: "missing", label: "Missing", count: 3 },
    { id: "unsupported", label: "Unsupported", count: 12 },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
            Category 1
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Metrics & KPI Components
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Standardized KPI summary cards, circular radial health gauges, and interactive filter status chips built on preset b27Gdgd6.
        </p>
      </div>

      <Separator />

      {/* 1. Status Filter Chips */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Interactive Status Filter Chips</CardTitle>
          <CardDescription>
            Multi-state tactile chips with active rings, count badges, and semantic colors (WCAG AA).
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <StatusFilterChips
            options={filterOptions}
            selected={selectedStatus}
            onSelect={setSelectedStatus}
          />
          <span className="text-xs text-muted-foreground font-mono">
            Active Filter: <strong className="text-foreground">{selectedStatus || "All (None)"}</strong>
          </span>
        </CardContent>
      </Card>

      {/* 2. KPI Stat Cards */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">KPI Stat Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiStatCard
            title="Active Workstreams"
            value="24"
            change={14.2}
            changePeriod="vs last sprint"
            icon={<FolderKanban className="size-4 text-primary" />}
          />
          <KpiStatCard
            title="Drift Rate"
            value="2.8%"
            change={-5.4}
            changePeriod="vs baseline"
            icon={<ShieldCheck className="size-4 text-emerald-500" />}
          />
          <KpiStatCard
            title="Memory Promotions"
            value="148"
            change={0}
            changePeriod="neutral"
            icon={<Cpu className="size-4 text-primary" />}
          />
          <KpiStatCard
            title="Resolution SLA"
            value="18m"
            description="Mean time to sync"
            icon={<Clock className="size-4 text-primary" />}
          />
        </div>
      </div>

      {/* 3. Circular Health Gauges */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">Health Gauges with Severity Tiers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="flex items-center justify-center p-4">
            <HealthGauge value={98} label="DU Vault Health (Optimal)" />
          </Card>
          <Card className="flex items-center justify-center p-4">
            <HealthGauge value={82} label="Target Parity (Warning)" />
          </Card>
          <Card className="flex items-center justify-center p-4">
            <HealthGauge value={54} label="Schema Sync (Critical)" />
          </Card>
        </div>
      </div>

      {/* 4. Loading State Skeletons */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-muted-foreground">Loading Skeleton Fallbacks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 opacity-75">
          <KpiStatCardSkeleton />
          <KpiStatCardSkeleton />
          <KpiStatCardSkeleton />
          <KpiStatCardSkeleton />
        </div>
      </div>
    </div>
  );
}
