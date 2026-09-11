"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface ActivityTimePoint {
  date: string;
  sessions: number;
  promotions: number;
}

export interface TimelineActivityAreaChartProps extends React.ComponentProps<typeof Card> {
  title?: string;
  description?: string;
  data: ActivityTimePoint[];
}

const chartConfig = {
  sessions: {
    label: "Sessions",
    color: "var(--chart-1, oklch(0.65 0.16 240))",
  },
  promotions: {
    label: "Memory Promotions",
    color: "var(--status-live, oklch(0.72 0.17 150))",
  },
} satisfies ChartConfig;

export function TimelineActivityAreaChart({
  title = "Operational Velocity",
  description = "Daily sessions and durable memory promotions over time",
  data,
  className,
  ...props
}: TimelineActivityAreaChartProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[260px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-sessions)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--color-sessions)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillPromotions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-promotions)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--color-promotions)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="sessions"
              stroke="var(--color-sessions)"
              fill="url(#fillSessions)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="promotions"
              stroke="var(--color-promotions)"
              fill="url(#fillPromotions)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
