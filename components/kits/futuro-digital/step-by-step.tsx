import React from "react";
import { cn } from "@/lib/utils";

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-6 mb-8 relative last:mb-0 group">
      {/* Linha vertical conectora */}
      <div className="absolute left-[20px] top-[40px] bottom-[-32px] w-[2px] bg-border group-last:hidden" />

      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg z-10 shadow-sm">
        {number}
      </div>
      <div className="pt-1">
        <h4 className="text-xl font-bold text-foreground mb-2">{title}</h4>
        <div className="text-muted-foreground leading-relaxed text-sm md:text-base">{children}</div>
      </div>
    </div>
  );
}

export function StepByStep({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("my-8 max-w-3xl mx-auto", className)}>{children}</div>;
}
