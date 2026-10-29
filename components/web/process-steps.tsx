import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface ProcessStepsProps
  extends React.OlHTMLAttributes<HTMLOListElement> {
  orientation?: "vertical" | "horizontal";
}

export function ProcessSteps({
  className,
  orientation = "vertical",
  children,
  ...props
}: ProcessStepsProps) {
  return (
    <ol
      className={cn(
        "relative flex w-full",
        orientation === "vertical" && "flex-col space-y-8 pl-4 border-l-2 border-border/70",
        orientation === "horizontal" && "flex-col md:flex-row gap-6 md:gap-8",
        className
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

const stepStatusVariants = cva(
  "flex size-9 shrink-0 items-center justify-center rounded-full font-semibold text-sm border transition-colors",
  {
    variants: {
      status: {
        completed: "border-primary bg-primary text-primary-foreground",
        active: "border-primary bg-background text-primary ring-4 ring-primary/20",
        upcoming: "border-border bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      status: "upcoming",
    },
  }
);

export interface StepItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof stepStatusVariants> {
  stepNumber: number | string;
  isLast?: boolean;
}

export function StepItem({
  className,
  stepNumber,
  status = "upcoming",
  isLast = false,
  children,
  ...props
}: StepItemProps) {
  const isCurrent = status === "active";

  return (
    <li
      className={cn("group relative flex items-start gap-4 sm:gap-5", className)}
      aria-current={isCurrent ? "step" : undefined}
      {...props}
    >
      <div
        className={cn(
          stepStatusVariants({ status }),
          "-ml-[calc(1.125rem+1px+0.5rem)] md:-ml-0"
        )}
      >
        <span className="sr-only">Step {stepNumber}: {status}</span>
        <span aria-hidden="true">{stepNumber}</span>
      </div>
      <div className="flex flex-col gap-2 pt-0.5 w-full">
        {children}
      </div>
    </li>
  );
}

export function StepTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "text-base sm:text-lg font-bold tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function StepDescription({
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
