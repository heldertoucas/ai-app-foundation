"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Robot, CheckCircle, Warning, XCircle } from "@phosphor-icons/react";

export type AgentStatus = "active" | "idle" | "error";

export interface AgentRuntimeItem {
  id: string;
  name: string;
  role: string;
  modelTier: "flash" | "pro" | "inherit";
  status: AgentStatus;
  configPath: string;
  lastActive: string;
  capabilitiesCount: number;
}

export interface AgentRuntimeCardGridProps {
  agents: AgentRuntimeItem[];
  className?: string;
}

export function AgentRuntimeCardGrid({ agents, className }: AgentRuntimeCardGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {agents.map((agent) => (
        <Card
          key={agent.id}
          className="shadow-xs hover:border-foreground/20 transition-all duration-150 relative overflow-hidden"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Robot className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">{agent.name}</CardTitle>
                  <CardDescription className="text-xs">{agent.role}</CardDescription>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "gap-1 text-[10px] font-mono capitalize",
                  agent.status === "active" && "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
                  agent.status === "idle" && "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10",
                  agent.status === "error" && "border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10"
                )}
              >
                {agent.status === "active" && <CheckCircle className="size-3" />}
                {agent.status === "idle" && <Warning className="size-3" />}
                {agent.status === "error" && <XCircle className="size-3" />}
                {agent.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-0 text-xs">
            <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground border-t border-border/40 pt-2">
              <span>Model Tier</span>
              <Badge variant="secondary" className="font-mono text-[10px] px-1.5 py-0 uppercase">
                {agent.modelTier}
              </Badge>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>Config Path</span>
              <span className="truncate max-w-[160px] text-foreground">{agent.configPath}</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>Capabilities</span>
              <span className="font-semibold text-foreground">{agent.capabilitiesCount} rules synced</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AgentCardSkeleton() {
  return (
    <Card className="shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-lg" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 border-t border-border/40 pt-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </CardContent>
    </Card>
  );
}
