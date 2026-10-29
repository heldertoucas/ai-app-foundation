import * as React from "react";
import { cn } from "@/lib/utils";

export interface CtaBannerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "bordered";
}

export function CtaBanner({
  className,
  variant = "solid",
  children,
  ...props
}: CtaBannerProps) {
  return (
    <section
      className={cn(
        "relative w-full rounded-2xl p-8 sm:p-12 lg:p-16 overflow-hidden flex flex-col items-center text-center gap-6",
        variant === "solid" && "bg-primary text-primary-foreground shadow-xl",
        variant === "bordered" && "border-2 border-border bg-card text-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function CtaBannerTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-3xl sm:text-4xl font-extrabold tracking-tight max-w-3xl leading-[1.2]",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function CtaBannerDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-base sm:text-lg max-w-2xl opacity-90 leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function CtaBannerActions({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-4 pt-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}
