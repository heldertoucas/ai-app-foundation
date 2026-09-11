"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { StatusFilterChips, type StatusType, type StatusFilterOption } from "@/components/dashboard/metrics/status-filter-chips";
import { MagnifyingGlass } from "@phosphor-icons/react";

export interface QuickFilterToolbarProps {
  search: string;
  onSearchChange: (query: string) => void;
  statusOptions: StatusFilterOption[];
  selectedStatus?: StatusType | null;
  onStatusSelect: (status: StatusType | null) => void;
  placeholder?: string;
  actionsSlot?: React.ReactNode;
  className?: string;
}

export function QuickFilterToolbar({
  search,
  onSearchChange,
  statusOptions,
  selectedStatus,
  onStatusSelect,
  placeholder = "Quick filter...",
  actionsSlot,
  className,
}: QuickFilterToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-border/70 bg-card p-3 shadow-xs",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-3 flex-1">
        <div className="relative w-full max-w-xs">
          <MagnifyingGlass className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
        <StatusFilterChips
          options={statusOptions}
          selected={selectedStatus}
          onSelect={onStatusSelect}
        />
      </div>
      {actionsSlot && <div className="flex items-center gap-2">{actionsSlot}</div>}
    </div>
  );
}
