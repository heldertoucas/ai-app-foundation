import React from "react";
import { cn } from "@/lib/utils";

interface FeatureSlideProps {
  title: string;
  description: string;
  reverse?: boolean;
  children?: React.ReactNode;
  previewContent?: React.ReactNode;
  className?: string;
}

export function FeatureSlide({
  title,
  description,
  reverse = false,
  children,
  previewContent,
  className,
}: FeatureSlideProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-8 border-b border-border last:border-b-0",
        reverse && "md:[&>*:first-child]:order-2",
        className
      )}
    >
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground leading-snug">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{description}</p>
        {children}
      </div>

      <div className="bg-muted border border-border rounded-lg min-h-[220px] flex items-center justify-center p-6 text-center text-muted-foreground font-medium">
        {previewContent || "Pré-visualização do Módulo"}
      </div>
    </div>
  );
}
