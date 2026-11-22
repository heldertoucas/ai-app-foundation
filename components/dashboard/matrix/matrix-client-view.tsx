"use client";

import * as React from "react";
import {
  CapabilityMatrixHeatmap,
  MatrixViewModeToggle,
  DataTable,
  type MatrixViewMode,
} from "@/components/dashboard/matrix";
import { DuComplianceMatrixData } from "@/lib/du/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface MatrixClientViewProps {
  initialData: DuComplianceMatrixData;
}

export function MatrixClientView({ initialData }: MatrixClientViewProps) {
  const [mode, setMode] = React.useState<MatrixViewMode>("summary");

  const auditRecords = initialData.rows.flatMap((row) =>
    initialData.targets.map((t) => {
      const cell = row.cells[t.id];
      return {
        id: `${row.id}-${t.id}`,
        feature: row.capability,
        target: t.label,
        status: cell?.status || "missing",
        detail: cell?.detail || "No details logged",
      };
    })
  );

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
              Category 3
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
              14 DU Invariant Compliance Matrix
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time ecosystem compliance health ({initialData.overallHealth}% PASS) with root-delegated hovercards and direct audit log inspection.
          </p>
        </div>
        <MatrixViewModeToggle mode={mode} onChange={setMode} />
      </div>

      <Separator />

      {mode === "summary" ? (
        <CapabilityMatrixHeatmap targets={initialData.targets} rows={initialData.rows} />
      ) : (
        <DataTable
          data={auditRecords}
          searchKey="feature"
          columns={[
            { key: "id", header: "ID" },
            { key: "feature", header: "Invariant / Capability" },
            { key: "target", header: "Target Project" },
            {
              key: "status",
              header: "Audit State",
              render: (item) => (
                <Badge
                  variant="outline"
                  className={
                    item.status === "live"
                      ? "border-status-live/30 text-status-live-foreground dark:text-status-live-foreground bg-status-live/10 font-mono text-xs uppercase"
                      : item.status === "drift"
                      ? "border-status-drift/30 text-status-drift-foreground dark:text-status-drift-foreground bg-status-drift/10 font-mono text-xs uppercase"
                      : "border-status-missing/30 text-status-missing-foreground dark:text-status-missing-foreground bg-status-missing/10 font-mono text-xs uppercase"
                  }
                >
                  {item.status}
                </Badge>
              ),
            },
            { key: "detail", header: "Audit Finding" },
          ]}
        />
      )}
    </div>
  );
}
