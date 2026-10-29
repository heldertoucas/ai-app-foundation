import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const heroVariants = cva("relative overflow-hidden w-full", {
  variants: {
    variant: {
      centered: "py-16 sm:py-24 lg:py-32 text-center",
      split: "py-12 sm:py-20 lg:py-28 text-left",
      minimal: "py-10 sm:py-16 text-left",
    },
  },
  defaultVariants: {
    variant: "centered",
  },
});

export interface HeroProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heroVariants> {
  as?: React.ElementType;
}

export function Hero({
  className,
  variant = "centered",
  as: Component = "section",
  children,
  ...props
}: HeroProps) {
  return (
    <Component
      className={cn(heroVariants({ variant }), className)}
      {...props}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          variant === "split" &&
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        )}
      >
        {children}
      </div>
    </Component>
  );
}

export interface HeroContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export function HeroContent({
  className,
  align,
  children,
  ...props
}: HeroContentProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center mx-auto max-w-3xl",
        align === "left" && "items-start text-left max-w-2xl",
        !align && "max-w-3xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface HeroHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel?: "h1" | "h2";
}

export function HeroTitle({
  className,
  headingLevel: Tag = "h1",
  children,
  ...props
}: HeroHeadingProps) {
  return (
    <Tag
      className={cn(
        "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function HeroDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function HeroActions({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3.5 pt-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function HeroVisual({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-card shadow-xl flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
