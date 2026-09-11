"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "@phosphor-icons/react";

export interface PhaseStep {
  id: string;
  label: string;
  description?: string;
}

export interface PhaseStepperProps {
  steps: PhaseStep[];
  currentStepIndex: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function PhaseStepper({
  steps,
  currentStepIndex,
  orientation = "horizontal",
  className,
}: PhaseStepperProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        orientation === "horizontal" ? "items-center justify-between" : "flex-col gap-4",
        className
      )}
    >
      {steps.map((step, idx) => {
        const isDone = idx < currentStepIndex;
        const isCurrent = idx === currentStepIndex;

        return (
          <div
            key={step.id}
            className={cn(
              "flex flex-1 items-center",
              orientation === "horizontal" ? "relative" : "gap-3"
            )}
          >
            {/* Step Icon Node */}
            <div className="flex items-center gap-2 z-10">
              <div
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-xs font-semibold font-mono transition-all duration-300",
                  isDone && "bg-primary text-primary-foreground shadow-xs",
                  isCurrent && "bg-primary/20 text-primary ring-2 ring-primary ring-offset-2 ring-offset-background font-bold animate-pulse",
                  !isDone && !isCurrent && "bg-muted text-muted-foreground border border-border"
                )}
              >
                {isDone ? <Check className="size-3.5" /> : idx + 1}
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-xs font-medium",
                    isCurrent ? "text-foreground font-semibold" : isDone ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-[10px] text-muted-foreground">{step.description}</span>
                )}
              </div>
            </div>

            {/* Connecting Bar */}
            {orientation === "horizontal" && idx < steps.length - 1 && (
              <div className="flex-1 mx-3 h-0.5 bg-muted overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    idx < currentStepIndex ? "bg-primary w-full" : "w-0"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
