"use client";

import * as React from "react";
import {
  CapabilityMatrixHeatmap,
  MatrixViewModeToggle,
  DataTable,
  type MatrixViewMode,
  type MatrixRow,
} from "@/components/dashboard/matrix";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const targets = [
  { id: "claude", label: "Claude Code" },
  { id: "gemini", label: "Antigravity" },
  { id: "cursor", label: "Cursor" },
  { id: "copilot", label: "Copilot" },
  { id: "opencode", label: "OpenCode" },
];

const mockRows: MatrixRow[] = [
  {
    id: "r1",
    category: "Invariants",
    capability: "Zero Docker Requirement",
    cells: {
      claude: { targetId: "claude", status: "live", detail: "Enforced in CLAUDE.md" },
      gemini: { targetId: "gemini", status: "live", detail: "Enforced in user_rules" },
      cursor: { targetId: "cursor", status: "live", detail: "Enforced in .cursorrules" },
      copilot: { targetId: "copilot", status: "live", detail: "Enforced in copilot-instructions" },
      opencode: { targetId: "opencode", status: "live", detail: "Enforced in AGENTS.md" },
    },
  },
  {
    id: "r2",
    category: "Persistence",
    capability: "SQLite WAL Mode Lock Avoidance",
    cells: {
      claude: { targetId: "claude", status: "live", detail: "connection_limit=1" },
      gemini: { targetId: "gemini", status: "live", detail: "busy_timeout=10000" },
      cursor: { targetId: "cursor", status: "drift", detail: "Timeout missing in config" },
      copilot: { targetId: "copilot", status: "missing", detail: "No WAL guard configured" },
      opencode: { targetId: "opencode", status: "live", detail: "Validated in harness" },
    },
  },
  {
    id: "r3",
    category: "Observability",
    capability: "Pino Server Secret Redaction",
    cells: {
      claude: { targetId: "claude", status: "live", detail: "server-only imported" },
      gemini: { targetId: "gemini", status: "live", detail: "redact paths active" },
      cursor: { targetId: "cursor", status: "drift", detail: "Client import detected" },
      copilot: { targetId: "copilot", status: "missing", detail: "Raw console.log used" },
      opencode: { targetId: "opencode", status: "live", detail: "Zero leak invariant" },
    },
  },
  {
    id: "r4",
    category: "UI System",
    capability: "shadcn Preset b27Gdgd6 Strictness",
    cells: {
      claude: { targetId: "claude", status: "live", detail: "radix-rhea tokens active" },
      gemini: { targetId: "gemini", status: "live", detail: "rounded-4xl curve scale" },
      cursor: { targetId: "cursor", status: "live", detail: "Phosphor icons wired" },
      copilot: { targetId: "copilot", status: "drift", detail: "Tailwind v3 classes found" },
      opencode: { targetId: "opencode", status: "live", detail: "Full b27Gdgd6 compliance" },
    },
  },
  {
    id: "r5",
    category: "Subagents",
    capability: "Multi-Agent AI Council Debate",
    cells: {
      claude: { targetId: "claude", status: "live", detail: "Subagent tool dispatch" },
      gemini: { targetId: "gemini", status: "live", detail: "invoke_subagent native" },
      cursor: { targetId: "cursor", status: "unsupported", detail: "Single agent context only" },
      copilot: { targetId: "copilot", status: "unsupported", detail: "Workspace limited" },
      opencode: { targetId: "opencode", status: "live", detail: "opencode_fire supported" },
    },
  },
];

const auditRecords = [
  { id: "AUD-001", feature: "Docker Disallowance", target: "Claude", status: "Live", latency: "12ms" },
  { id: "AUD-002", feature: "WAL Busy Timeout", target: "Cursor", status: "Drift", latency: "48ms" },
  { id: "AUD-003", feature: "Pino Secret Scrubbing", target: "Copilot", status: "Missing", latency: "--" },
  { id: "AUD-004", feature: "Chart Color Tokens", target: "Gemini", status: "Live", latency: "8ms" },
  { id: "AUD-005", feature: "Subagent Delegation", target: "OpenCode", status: "Live", latency: "140ms" },
];

export default function MatrixShowcasePage() {
  const [mode, setMode] = React.useState<MatrixViewMode>("summary");

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
              Category 3
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
              High-Density 2D Matrix & Tables
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Replaces rulesync-explorer legacy vanilla JS with sticky headers, single delegated hovercards, and full audit tables.
          </p>
        </div>
        <MatrixViewModeToggle mode={mode} onChange={setMode} />
      </div>

      <Separator />

      {mode === "summary" ? (
        <CapabilityMatrixHeatmap targets={targets} rows={mockRows} />
      ) : (
        <DataTable
          data={auditRecords}
          searchKey="feature"
          columns={[
            { key: "id", header: "ID" },
            { key: "feature", header: "Capability / Feature" },
            { key: "target", header: "Target Agent" },
            {
              key: "status",
              header: "Audit State",
              render: (item) => (
                <Badge
                  variant="outline"
                  className={
                    item.status === "Live"
                      ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-mono text-[11px]"
                      : item.status === "Drift"
                      ? "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 font-mono text-[11px]"
                      : "border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10 font-mono text-[11px]"
                  }
                >
                  {item.status}
                </Badge>
              ),
            },
            { key: "latency", header: "Audit Latency" },
          ]}
        />
      )}
    </div>
  );
}
