import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface ShowcaseMetadata {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

export interface ShowcaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline";
  visualSlot?: React.ReactNode;
  metadata?: ShowcaseMetadata[];
  actionSlot?: React.ReactNode;
}

export function ShowcaseCard({
  className,
  title,
  description,
  badge,
  badgeVariant = "secondary",
  visualSlot,
  metadata = [],
  actionSlot,
  children,
  ...props
}: ShowcaseCardProps) {
  return (
    <Card
      className={cn(
        "group flex flex-col justify-between overflow-hidden border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
        className
      )}
      {...props}
    >
      <div>
        {visualSlot && (
          <div className="relative aspect-video w-full overflow-hidden bg-muted flex items-center justify-center border-b border-border/60">
            {visualSlot}
          </div>
        )}

        <CardHeader className="space-y-2.5 p-5 sm:p-6">
          {badge && (
            <Badge variant={badgeVariant} className="w-fit">
              {badge}
            </Badge>
          )}
          <CardTitle className="text-xl font-bold tracking-tight text-foreground line-clamp-2">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
      </div>

      <div>
        {metadata.length > 0 && (
          <CardContent className="px-5 sm:px-6 pt-0 pb-4">
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
              {metadata.map((item, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5">
                  {item.icon && <span aria-hidden="true">{item.icon}</span>}
                  <span>
                    <strong className="font-medium text-foreground/80">{item.label}:</strong>{" "}
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        )}

        {actionSlot && (
          <CardFooter className="p-5 sm:p-6 pt-0">
            <div className="w-full">{actionSlot}</div>
          </CardFooter>
        )}

        {children}
      </div>
    </Card>
  );
}

export function ShowcaseCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col justify-between overflow-hidden p-6 gap-5", className)}>
      <Skeleton className="aspect-video w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="pt-4 border-t border-border/40 flex justify-between items-center">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-9 w-24" />
      </div>
    </Card>
  );
}
