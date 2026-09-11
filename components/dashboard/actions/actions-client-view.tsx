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
import { DuActionCommand } from "@/lib/du/types";

interface ActionsClientViewProps {
  actionCommands: DuActionCommand[];
}

export function ActionsClientView({ actionCommands }: ActionsClientViewProps) {
  const [search, setSearch] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);

  const statusOptions = [
    { id: "Session", label: "Session", count: actionCommands.filter((a) => a.category === "Session").length },
    { id: "Governance", label: "Governance", count: actionCommands.filter((a) => a.category === "Governance").length },
    { id: "Quality", label: "Quality", count: actionCommands.filter((a) => a.category === "Quality").length },
    { id: "RuleSync", label: "RuleSync", count: actionCommands.filter((a) => a.category === "RuleSync").length },
  ];

  // Navigation and CLI palette items
  const paletteItems: CommandItem[] = React.useMemo(() => {
    const navCommands: CommandItem[] = [
      { id: "nav-1", title: "Metrics & KPIs Showcase", category: "Navigation", href: "/dashboard/metrics" },
      { id: "nav-2", title: "Analytical Charts Showcase", category: "Navigation", href: "/dashboard/charts" },
      { id: "nav-3", title: "2D Matrix Heatmap Showcase", category: "Navigation", href: "/dashboard/matrix" },
      { id: "nav-4", title: "Workflow & Kanban Showcase", category: "Navigation", href: "/dashboard/workflow" },
      { id: "nav-5", title: "Code & Diffs Showcase", category: "Navigation", href: "/dashboard/inspection" },
      { id: "nav-6", title: "Agent Pipelines Showcase", category: "Navigation", href: "/dashboard/agents" },
      { id: "nav-7", title: "Developer Actions Showcase", category: "Navigation", href: "/dashboard/actions" },
    ];

    const cliCommands: CommandItem[] = actionCommands.map((cmd) => ({
      id: cmd.id,
      title: `${cmd.title} — ${cmd.description}`,
      category: cmd.category,
      onSelect: () => {
        navigator.clipboard.writeText(cmd.cliCommand);
      },
    }));

    return [...navCommands, ...cliCommands];
  }, [actionCommands]);

  // Filter commands
  const filteredCommands = React.useMemo(() => {
    return actionCommands.filter((cmd) => {
      const matchesSearch =
        cmd.title.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description.toLowerCase().includes(search.toLowerCase()) ||
        cmd.cliCommand.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !selectedStatus || cmd.category === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [actionCommands, search, selectedStatus]);

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
        <GlobalCommandPalette items={paletteItems} />
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
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const blob = new Blob([JSON.stringify(actionCommands, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "du-actions-manifest.json";
                a.click();
              }}
            >
              Export JSON
            </Button>
          }
        />
      </div>

      {/* 2. Remediation Terminal Cards */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">Remediation Terminal Cards</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCommands.map((cmd) => (
            <RemediationTerminalCard
              key={cmd.id}
              title={cmd.title}
              description={cmd.description}
              commands={{
                bash: cmd.cliCommand,
                powershell: cmd.cliCommand.startsWith("python")
                  ? cmd.cliCommand.replace("python -m dev.cli", "powershell -File ./scripts/dev.ps1")
                  : `powershell -Command "${cmd.cliCommand}"`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
