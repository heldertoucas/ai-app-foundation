import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const calloutVariants = cva(
  "relative w-full rounded-lg border p-4 sm:p-5 text-sm leading-relaxed transition-colors flex gap-3.5 items-start",
  {
    variants: {
      variant: {
        tip: "border-primary/30 bg-primary/5 text-foreground [&>svg]:text-primary",
        info: "border-border bg-muted/50 text-foreground [&>svg]:text-muted-foreground",
        warning: "border-amber-500/30 bg-amber-500/5 text-foreground [&>svg]:text-amber-500",
        accent: "border-accent/40 bg-accent/10 text-foreground [&>svg]:text-foreground",
      },
    },
    defaultVariants: {
      variant: "tip",
    },
  }
);

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  icon?: React.ReactNode;
  title?: string;
}

export function Callout({
  className,
  variant = "tip",
  icon,
  title,
  children,
  ...props
}: CalloutProps) {
  return (
    <div
      role="note"
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    >
      {icon && <div className="shrink-0 pt-0.5 text-lg" aria-hidden="true">{icon}</div>}
      <div className="flex flex-col gap-1 w-full">
        {title && <h5 className="font-semibold text-foreground tracking-tight">{title}</h5>}
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
