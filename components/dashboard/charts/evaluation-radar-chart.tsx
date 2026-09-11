"use client";

import * as React from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface EvaluationDimensionItem {
  dimension: string;
  candidate: number;
  baseline: number;
}

export interface EvaluationRadarChartProps extends React.ComponentProps<typeof Card> {
  title?: string;
  description?: string;
  data: EvaluationDimensionItem[];
  candidateLabel?: string;
  baselineLabel?: string;
}

export function EvaluationRadarChart({
  title = "SkillScore Evaluation Radar",
  description = "Multi-axial rubric scores comparing candidate vs baseline",
  data,
  candidateLabel = "Candidate",
  baselineLabel = "Baseline",
  className,
  ...props
}: EvaluationRadarChartProps) {
  const chartConfig = {
    candidate: {
      label: candidateLabel,
      color: "var(--chart-1, oklch(0.65 0.16 240))",
    },
    baseline: {
      label: baselineLabel,
      color: "var(--chart-2, oklch(0.72 0.15 160))",
    },
  } satisfies ChartConfig;

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <RadarChart data={data}>
            <PolarGrid strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="dimension" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Radar
              name={candidateLabel}
              dataKey="candidate"
              stroke="var(--color-candidate)"
              fill="var(--color-candidate)"
              fillOpacity={0.4}
            />
            <Radar
              name={baselineLabel}
              dataKey="baseline"
              stroke="var(--color-baseline)"
              fill="var(--color-baseline)"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
