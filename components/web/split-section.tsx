import * as React from "react";
import { cn } from "@/lib/utils";

export interface SplitSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  mediaPosition?: "left" | "right";
}

export function SplitSection({
  className,
  mediaPosition = "right",
  children,
  ...props
}: SplitSectionProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
          mediaPosition === "left" && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function SplitSectionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-5 max-w-xl", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SplitSectionMedia({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative w-full aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted/40 shadow-md flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
