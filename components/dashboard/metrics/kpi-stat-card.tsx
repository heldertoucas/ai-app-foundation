"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, ArrowDownRight, Minus } from "@phosphor-icons/react";

export interface KpiStatCardProps extends React.ComponentProps<"div"> {
  title: string;
  value: string | number;
  description?: string;
  change?: number;
  changePeriod?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

export function KpiStatCard({
  title,
  value,
  description,
  change,
  changePeriod,
  icon,
  trend,
  className,
  ...props
}: KpiStatCardProps) {
  const computedTrend = trend || (change !== undefined ? (change > 0 ? "up" : change < 0 ? "down" : "neutral") : undefined);

  return (
    <Card className={cn("relative overflow-hidden transition-all duration-150 hover:border-foreground/20", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="flex size-8 items-center justify-center rounded-lg bg-muted/60 text-foreground ring-1 ring-border/50">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-1.5">
        <div className="font-heading text-3xl font-bold font-mono tabular-nums tracking-tight text-foreground">
          {value}
        </div>
        {(change !== undefined || description) && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            {change !== undefined && (
              <Badge
                variant="secondary"
                className={cn(
                  "gap-0.5 px-1.5 py-0 font-mono text-[11px] font-medium",
                  computedTrend === "up" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                  computedTrend === "down" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
                  computedTrend === "neutral" && "bg-muted text-muted-foreground"
                )}
              >
                {computedTrend === "up" && <ArrowUpRight className="size-3" />}
                {computedTrend === "down" && <ArrowDownRight className="size-3" />}
                {computedTrend === "neutral" && <Minus className="size-3" />}
                {`${change > 0 ? "+" : ""}${change}%`}
              </Badge>
            )}
            {changePeriod && <span>{changePeriod}</span>}
            {description && !changePeriod && <span>{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function KpiStatCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="size-8 rounded-lg" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}
