"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type StatusType = "live" | "drift" | "missing" | "unsupported" | string;

export interface StatusFilterOption {
  id: StatusType;
  label: string;
  count?: number;
}

export interface StatusFilterChipsProps {
  options: StatusFilterOption[];
  selected?: StatusType | null;
  onSelect: (id: StatusType | null) => void;
  className?: string;
}

export function StatusFilterChips({
  options,
  selected,
  onSelect,
  className,
}: StatusFilterChipsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 cursor-pointer",
          selected === null || selected === undefined
            ? "bg-primary text-primary-foreground shadow-xs ring-2 ring-primary/20"
            : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <span>All</span>
      </button>

      {options.map((opt) => {
        const isSelected = selected === opt.id;

        // Semantic styling matching preset b27Gdgd6
        const badgeColors =
          opt.id === "live"
            ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
            : opt.id === "drift"
            ? "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10"
            : opt.id === "missing"
            ? "border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10"
            : "border-border text-muted-foreground bg-muted/40";

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(isSelected ? null : opt.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 border cursor-pointer",
              badgeColors,
              isSelected && "ring-2 ring-foreground/20 font-semibold shadow-xs"
            )}
          >
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span className="font-mono text-[11px] opacity-80 tabular-nums">
                ({opt.count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
