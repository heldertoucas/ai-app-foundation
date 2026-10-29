"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LIBRARY_CATEGORIES,
  type LibraryCategory,
} from "@/lib/library/component-registry";
import {
  MagnifyingGlass,
  X,
  SquaresFour,
  ListDashes,
} from "@phosphor-icons/react";

export interface LibraryToolbarProps {
  search: string;
  onSearchChange: (search: string) => void;
  selectedCategory: LibraryCategory | null;
  onCategorySelect: (cat: LibraryCategory | null) => void;
  viewDensity: "grid" | "list";
  onViewDensityChange: (density: "grid" | "list") => void;
  totalCount: number;
  filteredCount: number;
  categoryCounts: Record<string, number>;
  className?: string;
}

export function LibraryToolbar({
  search,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  viewDensity,
  onViewDensityChange,
  totalCount,
  filteredCount,
  categoryCounts,
  className,
}: LibraryToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border/80 bg-card p-4 shadow-xs",
        className
      )}
    >
      {/* Top row: Search Bar, Density Toggle, and Count Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlass className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search 30+ components by name, description, category..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-8 h-9 text-xs"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Match Counter */}
          <div className="text-xs text-muted-foreground font-mono">
            Showing <strong className="text-foreground">{filteredCount}</strong> of{" "}
            <span>{totalCount}</span>
          </div>

          {/* View Density Switch */}
          <div className="inline-flex items-center rounded-lg border border-border/80 bg-muted/40 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => onViewDensityChange("grid")}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-all cursor-pointer",
                viewDensity === "grid"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Grid View (Expanded Cards)"
            >
              <SquaresFour className="size-3.5" />
              <span className="hidden md:inline">Grid</span>
            </button>
            <button
              type="button"
              onClick={() => onViewDensityChange("list")}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-all cursor-pointer",
                viewDensity === "list"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="List View (Compact Blueprint List)"
            >
              <ListDashes className="size-3.5" />
              <span className="hidden md:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row: Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/50">
        <button
          type="button"
          onClick={() => onCategorySelect(null)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer",
            selectedCategory === null
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <span>All Categories</span>
          <Badge
            variant="secondary"
            className={cn(
              "font-mono text-[10px] px-1 py-0",
              selectedCategory === null
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-background/80 text-muted-foreground"
            )}
          >
            {totalCount}
          </Badge>
        </button>

        {LIBRARY_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategorySelect(isSelected ? null : cat.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{cat.label}</span>
              <Badge
                variant="secondary"
                className={cn(
                  "font-mono text-[10px] px-1 py-0",
                  isSelected
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-background/80 text-muted-foreground"
                )}
              >
                {count}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}
