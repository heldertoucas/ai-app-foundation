import React from "react";
import { cn } from "@/lib/utils";

export function ProTip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-muted border-l-4 border-primary rounded-r-lg p-5 my-6 flex gap-4 items-start text-sm leading-relaxed text-foreground shadow-sm",
        className
      )}
    >
      <span className="text-xl leading-none text-primary">💡</span>
      <div>{children}</div>
    </div>
  );
}
