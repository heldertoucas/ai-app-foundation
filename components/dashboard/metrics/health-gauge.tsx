"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface HealthGaugeProps extends React.ComponentProps<"div"> {
  value: number; // 0 to 100
  label?: string;
  size?: number;
  strokeWidth?: number;
}

export function HealthGauge({
  value,
  label = "System Health",
  size = 140,
  strokeWidth = 12,
  className,
  ...props
}: HealthGaugeProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  // Severity color tiers
  const tierColor =
    clampedValue >= 90
      ? "text-emerald-500 stroke-emerald-500"
      : clampedValue >= 75
      ? "text-amber-500 stroke-amber-500"
      : "text-rose-500 stroke-rose-500";

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-2 p-4", className)}
      {...props}
    >
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={"0 0 " + size + " " + size}
          className="-rotate-90 transform"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-muted/40 fill-transparent"
          />
          {/* Active gauge fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn("fill-transparent transition-all duration-700 ease-out", tierColor)}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="font-heading text-2xl font-bold font-mono tabular-nums tracking-tight">
            {clampedValue}%
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
            {clampedValue >= 90 ? "Optimal" : clampedValue >= 75 ? "Warning" : "Critical"}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      )}
    </div>
  );
}
