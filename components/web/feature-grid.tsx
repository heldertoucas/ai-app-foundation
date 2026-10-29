import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const featureGridVariants = cva("grid gap-6 sm:gap-8 w-full", {
  variants: {
    columns: {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      bento: "grid-cols-1 md:grid-cols-3 auto-rows-fr",
    },
  },
  defaultVariants: {
    columns: 3,
  },
});

export interface FeatureGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureGridVariants> {}

export function FeatureGrid({
  className,
  columns = 3,
  children,
  ...props
}: FeatureGridProps) {
  return (
    <div
      className={cn(featureGridVariants({ columns }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface FeatureCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  span?: "normal" | "wide";
}

export function FeatureCard({
  className,
  span = "normal",
  children,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md",
        span === "wide" && "md:col-span-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function FeatureCardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-3.5", className)} {...props}>
      {children}
    </div>
  );
}

export function FeatureCardIcon({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex size-11 items-center justify-center rounded-lg bg-muted text-primary text-xl transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {children}
    </div>
  );
}

export function FeatureCardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg sm:text-xl font-bold tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function FeatureCardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm sm:text-base text-muted-foreground leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
