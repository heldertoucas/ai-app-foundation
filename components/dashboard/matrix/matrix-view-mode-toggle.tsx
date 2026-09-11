"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Table, SquaresFour } from "@phosphor-icons/react";

export type MatrixViewMode = "summary" | "audit";

export interface MatrixViewModeToggleProps {
  mode: MatrixViewMode;
  onChange: (mode: MatrixViewMode) => void;
  className?: string;
}

export function MatrixViewModeToggle({
  mode,
  onChange,
  className,
}: MatrixViewModeToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border/80 bg-muted/40 p-1 text-xs",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange("summary")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all cursor-pointer",
          mode === "summary"
            ? "bg-background text-foreground shadow-xs font-semibold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <SquaresFour className="size-3.5" />
        <span>Capabilities Heatmap</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("audit")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all cursor-pointer",
          mode === "audit"
            ? "bg-background text-foreground shadow-xs font-semibold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Table className="size-3.5" />
        <span>508-Point Full Audit Table</span>
      </button>
    </div>
  );
}
