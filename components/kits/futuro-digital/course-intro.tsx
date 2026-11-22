import React from "react";
import { cn } from "@/lib/utils";

interface CourseIntroProps {
  sessionLabel: string;
  title: string;
  className?: string;
}

export function CourseIntro({ sessionLabel, title, className }: CourseIntroProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-8 text-center my-6 shadow-sm", className)}>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
        <span className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-base font-semibold mr-3 align-middle">
          {sessionLabel}
        </span>
        {title}
      </h2>
    </div>
  );
}
