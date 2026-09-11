"use client";

import * as React from "react";
import {
  RemediationTerminalCard,
  QuickFilterToolbar,
  GlobalCommandPalette,
  type CommandItem,
} from "@/components/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mockCommands: CommandItem[] = [
  { id: "1", title: "Metrics & KPIs Showcase", category: "Navigation", href: "/dashboard/metrics" },
  { id: "2", title: "Analytical Charts Showcase", category: "Navigation", href: "/dashboard/charts" },
  { id: "3", title: "2D Matrix Heatmap Showcase", category: "Navigation", href: "/dashboard/matrix" },
  { id: "4", title: "Workflow & Kanban Showcase", category: "Navigation", href: "/dashboard/workflow" },
  { id: "5", title: "Code & Diffs Showcase", category: "Navigation", href: "/dashboard/inspection" },
  { id: "6", title: "Agent Pipelines Showcase", category: "Navigation", href: "/dashboard/agents" },
  { id: "7", title: "Developer Actions Showcase", category: "Navigation", href: "/dashboard/actions" },
  { id: "8", title: "Run SQLite WAL Checkpoint", category: "Maintenance", onSelect: () => alert("Checkpoint triggered") },
  { id: "9", title: "Generate Rulesync Manifests", category: "CLI", onSelect: () => alert("rulesync generate started") },
];

export default function ActionsShowcasePage() {
  const [search, setSearch] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);

  const statusOptions = [
    { id: "live", label: "Live", count: 42 },
    { id: "drift", label: "Drift", count: 7 },
    { id: "missing", label: "Missing", count: 3 },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
              Category 7
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
              High-Velocity Developer Actions
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Copyable remediation terminal cards with dual shell tabs, unified filter toolbars, and global keyboard palette.
          </p>
        </div>
        <GlobalCommandPalette items={mockCommands} />
      </div>

      <Separator />

      {/* 1. Quick Filter Toolbar */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">Unified Quick Filter Toolbar</h2>
        <QuickFilterToolbar
          search={search}
          onSearchChange={setSearch}
          statusOptions={statusOptions}
          selectedStatus={selectedStatus}
          onStatusSelect={setSelectedStatus}
          placeholder="Filter actions and scripts..."
          actionsSlot={
            <Button size="sm" variant="outline" onClick={() => alert("Action triggered")}>
              Export JSON
            </Button>
          }
        />
      </div>

      {/* 2. Remediation Terminal Cards */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">Remediation Terminal Cards</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RemediationTerminalCard
            title="Drift Synchronization"
            description="Regenerate all target agent instructions and tool definitions from canonical memory."
            commands={{
              bash: "rulesync generate --target claude,gemini,cursor,copilot",
              powershell: "powershell -File ./scripts/dev.ps1 rulesync generate --target all",
            }}
          />
          <RemediationTerminalCard
            title="SQLite WAL Checkpoint"
            description="Force an immediate WAL passive checkpoint to compact dev.db file."
            commands={{
              bash: "pnpm prisma db execute --stdin",
              powershell: "pnpm prisma db execute --file scripts/checkpoint.sql",
            }}
          />
        </div>
      </div>
    </div>
  );
}
