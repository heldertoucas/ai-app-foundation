"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GitBranch, Clock, ArrowRight } from "@phosphor-icons/react";

export type OpenSpecStage = "proposed" | "specified" | "implementing" | "verified" | "archived";

export interface KanbanChangeItem {
  id: string;
  name: string;
  title: string;
  stage: OpenSpecStage;
  schema: string;
  tasksDone: number;
  tasksTotal: number;
  updatedAt: string;
}

export interface OpenSpecKanbanBoardProps {
  changes: KanbanChangeItem[];
  onMoveStage?: (changeId: string, nextStage: OpenSpecStage) => void;
  className?: string;
}

const STAGES: { id: OpenSpecStage; label: string; badgeColor: string }[] = [
  { id: "proposed", label: "1. Proposed", badgeColor: "bg-muted text-muted-foreground" },
  { id: "specified", label: "2. Specified", badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { id: "implementing", label: "3. Implementing", badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { id: "verified", label: "4. Verified", badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { id: "archived", label: "5. Archived", badgeColor: "bg-muted/40 text-muted-foreground/80" },
];

export function OpenSpecKanbanBoard({
  changes,
  onMoveStage,
  className,
}: OpenSpecKanbanBoardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4", className)}>
      {STAGES.map((stage) => {
        const stageChanges = changes.filter((c) => c.stage === stage.id);

        return (
          <div
            key={stage.id}
            className="flex flex-col gap-3 rounded-xl border border-border/60 bg-muted/20 p-3 min-h-[360px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {stage.label}
              </span>
              <Badge variant="outline" className={cn("text-[10px] font-mono px-1.5 py-0", stage.badgeColor)}>
                {stageChanges.length}
              </Badge>
            </div>

            {/* Cards Container */}
            <div className="flex flex-col gap-2.5 flex-1">
              {stageChanges.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 p-4 text-center text-xs text-muted-foreground">
                  No changes in stage
                </div>
              ) : (
                stageChanges.map((change) => {
                  const progressPct =
                    change.tasksTotal > 0
                      ? Math.round((change.tasksDone / change.tasksTotal) * 100)
                      : 0;

                  return (
                    <Card
                      key={change.id}
                      className="shadow-xs hover:border-foreground/20 transition-all duration-150"
                    >
                      <CardHeader className="p-3 pb-2 space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                          <span className="flex items-center gap-1">
                            <GitBranch className="size-3 text-primary" />
                            {change.schema}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {change.updatedAt}
                          </span>
                        </div>
                        <CardTitle className="text-xs font-semibold leading-tight text-foreground">
                          {change.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0 flex flex-col gap-2">
                        {change.tasksTotal > 0 && (
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                              <span>Tasks</span>
                              <span>
                                {change.tasksDone}/{change.tasksTotal} ({progressPct}%)
                              </span>
                            </div>
                            <Progress value={progressPct} className="h-1" />
                          </div>
                        )}
                        {onMoveStage && stage.id !== "archived" && (
                          <button
                            type="button"
                            onClick={() => {
                              const nextIdx = STAGES.findIndex((s) => s.id === stage.id) + 1;
                              if (nextIdx < STAGES.length) {
                                onMoveStage(change.id, STAGES[nextIdx].id);
                              }
                            }}
                            className="inline-flex items-center justify-center gap-1 mt-1 text-[10px] font-medium text-primary hover:underline cursor-pointer"
                          >
                            <span>Advance stage</span>
                            <ArrowRight className="size-3" />
                          </button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
