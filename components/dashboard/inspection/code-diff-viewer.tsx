"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Columns, Rows } from "@phosphor-icons/react";

export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

export interface CodeDiffViewerProps {
  title?: string;
  oldFilename?: string;
  newFilename?: string;
  diffLines: DiffLine[];
  maxLines?: number;
  className?: string;
}

export function CodeDiffViewer({
  title = "File Difference",
  oldFilename = "a/original.ts",
  newFilename = "b/modified.ts",
  diffLines,
  maxLines = 200,
  className,
}: CodeDiffViewerProps) {
  const [viewMode, setViewMode] = React.useState<"unified" | "split">("unified");
  const isTruncated = diffLines.length > maxLines;
  const visibleLines = isTruncated ? diffLines.slice(0, maxLines) : diffLines;

  return (
    <div className={cn("flex flex-col rounded-xl border border-border/70 bg-card overflow-hidden shadow-xs text-xs font-mono", className)}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 bg-muted/40 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{title}</span>
          <span className="text-[11px] text-muted-foreground">{oldFilename} → {newFilename}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode("unified")}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all cursor-pointer",
              viewMode === "unified" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Rows className="size-3" />
            <span>Unified</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("split")}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all cursor-pointer",
              viewMode === "split" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Columns className="size-3" />
            <span>Split</span>
          </button>
        </div>
      </div>

      {/* Diff Lines Table */}
      <div className="overflow-x-auto max-h-[480px]">
        <table className="w-full border-collapse">
          <tbody>
            {visibleLines.map((line, idx) => {
              const bgClass =
                line.type === "added"
                  ? "bg-emerald-500/10 dark:bg-emerald-500/15"
                  : line.type === "removed"
                  ? "bg-rose-500/10 dark:bg-rose-500/15"
                  : "bg-transparent";

              const textClass =
                line.type === "added"
                  ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                  : line.type === "removed"
                  ? "text-rose-700 dark:text-rose-400 line-through opacity-80"
                  : "text-foreground";

              const prefix = line.type === "added" ? "+" : line.type === "removed" ? "-" : " ";

              return (
                <tr key={idx} className={cn("leading-5 hover:bg-muted/40 transition-colors", bgClass)}>
                  <td className="w-10 select-none py-0.5 pr-2 pl-3 text-right text-[10px] text-muted-foreground/60 border-r border-border/40">
                    {line.oldLineNumber ?? ""}
                  </td>
                  <td className="w-10 select-none py-0.5 pr-2 pl-2 text-right text-[10px] text-muted-foreground/60 border-r border-border/40">
                    {line.newLineNumber ?? ""}
                  </td>
                  <td className="w-4 select-none py-0.5 text-center font-bold text-muted-foreground/80">
                    {prefix}
                  </td>
                  <td className={cn("py-0.5 pr-3 pl-1 whitespace-pre", textClass)}>
                    {line.content}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isTruncated && (
        <div className="border-t border-border/60 bg-muted/30 p-2 text-center text-xs text-muted-foreground">
          Diff truncated at {maxLines} lines ({diffLines.length - maxLines} lines hidden)
        </div>
      )}
    </div>
  );
}
