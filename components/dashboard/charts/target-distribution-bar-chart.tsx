"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface TargetDistributionItem {
  target: string;
  live: number;
  drift: number;
  missing: number;
}

export interface TargetDistributionBarChartProps extends React.ComponentProps<typeof Card> {
  title?: string;
  description?: string;
  data: TargetDistributionItem[];
  layout?: "horizontal" | "vertical";
}

const chartConfig = {
  live: {
    label: "Live",
    color: "var(--status-live, oklch(0.72 0.17 150))",
  },
  drift: {
    label: "Drift",
    color: "var(--status-drift, oklch(0.78 0.16 75))",
  },
  missing: {
    label: "Missing",
    color: "var(--status-missing, oklch(0.65 0.22 25))",
  },
} satisfies ChartConfig;

export function TargetDistributionBarChart({
  title = "Target Capability Distribution",
  description = "Breakdown of live, drifted, and missing rules across AI agent targets",
  data,
  layout = "vertical",
  className,
  ...props
}: TargetDistributionBarChartProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[260px] w-full">
          <BarChart data={data} layout={layout === "horizontal" ? "vertical" : "horizontal"}>
            <CartesianGrid vertical={layout === "horizontal"} horizontal={layout !== "horizontal"} strokeDasharray="3 3" />
            {layout === "horizontal" ? (
              <>
                <YAxis dataKey="target" type="category" tickLine={false} axisLine={false} width={80} />
                <XAxis type="number" tickLine={false} axisLine={false} />
              </>
            ) : (
              <>
                <XAxis dataKey="target" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
              </>
            )}
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="live" stackId="a" fill="var(--color-live)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="drift" stackId="a" fill="var(--color-drift)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="missing" stackId="a" fill="var(--color-missing)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-72" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[260px] w-full rounded-xl" />
      </CardContent>
    </Card>
  );
}
