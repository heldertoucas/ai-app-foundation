"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check, Warning, X, Minus, MagnifyingGlass } from "@phosphor-icons/react";

export type CellStatus = "live" | "drift" | "missing" | "unsupported";

export interface MatrixCell {
  targetId: string;
  status: CellStatus;
  detail?: string;
  updatedAt?: string;
}

export interface MatrixRow {
  id: string;
  category: string;
  capability: string;
  description?: string;
  cells: Record<string, MatrixCell>;
}

export interface CapabilityMatrixHeatmapProps {
  targets: { id: string; label: string }[];
  rows: MatrixRow[];
  className?: string;
}

export function CapabilityMatrixHeatmap({
  targets,
  rows,
  className,
}: CapabilityMatrixHeatmapProps) {
  const [search, setSearch] = React.useState("");
  const [selectedTarget, setSelectedTarget] = React.useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = React.useState<{
    capability: string;
    target: string;
    status: CellStatus;
    detail?: string;
    x: number;
    y: number;
  } | null>(null);

  const filteredRows = React.useMemo(() => {
    return rows.filter((r) => {
      const matchSearch =
        r.capability.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  }, [rows, search]);

  const activeTargets = React.useMemo(() => {
    if (!selectedTarget) return targets;
    return targets.filter((t) => t.id === selectedTarget);
  }, [targets, selectedTarget]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Controls: Search & Target Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <MagnifyingGlass className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search 508 capabilities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedTarget(null)}
            className={cn(
              "px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer",
              selectedTarget === null
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            All Targets
          </button>
          {targets.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTarget(selectedTarget === t.id ? null : t.id)}
              className={cn(
                "px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer border",
                selectedTarget === t.id
                  ? "bg-primary text-primary-foreground border-primary font-semibold"
                  : "bg-card border-border/60 text-muted-foreground hover:bg-muted"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2D Matrix Table with Sticky Headers */}
      <div className="relative overflow-x-auto rounded-xl border border-border/60 bg-card shadow-xs max-h-[560px]">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="sticky top-0 z-20 bg-muted/90 backdrop-blur-md border-b border-border/80">
            <tr>
              <th className="sticky left-0 z-30 bg-muted/90 backdrop-blur-md py-2.5 px-3 font-semibold text-foreground w-[240px]">
                Capability ({filteredRows.length})
              </th>
              {activeTargets.map((target) => (
                <th
                  key={target.id}
                  className="py-2.5 px-3 font-semibold text-foreground text-center min-w-[100px]"
                >
                  {target.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {filteredRows.length === 0 ? (
              <tr>
                <td
                  colSpan={activeTargets.length + 1}
                  className="py-8 text-center text-muted-foreground"
                >
                  No capabilities matching &quot;{search}&quot;
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                  <td className="sticky left-0 z-10 bg-card/95 backdrop-blur-sm py-2 px-3 font-medium text-foreground">
                    <div className="flex flex-col">
                      <span className="font-semibold">{row.capability}</span>
                      <span className="text-[10px] text-muted-foreground font-mono uppercase">
                        {row.category}
                      </span>
                    </div>
                  </td>
                  {activeTargets.map((target) => {
                    const cell = row.cells[target.id];
                    const status = cell?.status || "missing";

                    const badgeStyle =
                      status === "live"
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : status === "drift"
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                        : status === "missing"
                        ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30"
                        : "bg-muted/60 text-muted-foreground border-border/40";

                    return (
                      <td
                        key={target.id}
                        className="py-2 px-3 text-center align-middle"
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredCell({
                            capability: row.capability,
                            target: target.label,
                            status,
                            detail: cell?.detail || "No drift logged",
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <span
                          className={cn(
                            "inline-flex size-6 items-center justify-center rounded-md border text-xs font-semibold cursor-pointer transition-transform hover:scale-110",
                            badgeStyle
                          )}
                        >
                          {status === "live" && <Check className="size-3.5" />}
                          {status === "drift" && <Warning className="size-3.5" />}
                          {status === "missing" && <X className="size-3.5" />}
                          {status === "unsupported" && <Minus className="size-3.5" />}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Single Delegated Hovercard to avoid 508 discrete popover overhead */}
      {hoveredCell && (
        <div
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 rounded-lg border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95"
          style={{ left: hoveredCell.x, top: hoveredCell.y - 8 }}
        >
          <div className="flex items-center gap-1.5 font-semibold">
            <span>{hoveredCell.capability}</span>
            <span className="text-muted-foreground">→</span>
            <span>{hoveredCell.target}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] uppercase font-bold",
                hoveredCell.status === "live" && "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
                hoveredCell.status === "drift" && "border-amber-500/30 text-amber-600 dark:text-amber-400",
                hoveredCell.status === "missing" && "border-rose-500/30 text-rose-600 dark:text-rose-400",
                hoveredCell.status === "unsupported" && "text-muted-foreground"
              )}
            >
              {hoveredCell.status}
            </Badge>
            <span className="text-[11px] text-muted-foreground">{hoveredCell.detail}</span>
          </div>
        </div>
      )}
    </div>
  );
}
