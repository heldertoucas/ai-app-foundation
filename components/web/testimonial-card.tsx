import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "@phosphor-icons/react/dist/ssr";

export interface TestimonialCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  authorName: string;
  authorRole?: string;
  authorAvatarUrl?: string;
  quote: string;
  rating?: number;
}

export function TestimonialCard({
  className,
  authorName,
  authorRole,
  authorAvatarUrl,
  quote,
  rating = 5,
  ...props
}: TestimonialCardProps) {
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card
      className={cn(
        "flex flex-col justify-between border border-border bg-card p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
      {...props}
    >
      <CardContent className="p-0 flex flex-col justify-between h-full gap-5">
        <div className="flex flex-col gap-3">
          {rating > 0 && (
            <div
              className="flex items-center gap-1 text-amber-500"
              aria-label={`Rated ${rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  weight={i < rating ? "fill" : "regular"}
                  className={cn(
                    "size-4",
                    i >= rating && "text-muted-foreground/40"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
          )}
          <blockquote className="text-sm sm:text-base text-foreground leading-relaxed italic">
            "{quote}"
          </blockquote>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
          <Avatar className="size-10 border border-border">
            {authorAvatarUrl && (
              <AvatarImage src={authorAvatarUrl} alt={authorName} />
            )}
            <AvatarFallback className="bg-muted text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground leading-tight">
              {authorName}
            </span>
            {authorRole && (
              <span className="text-xs text-muted-foreground leading-tight mt-0.5">
                {authorRole}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("p-6 flex flex-col justify-between gap-5", className)}>
      <div className="space-y-3">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="size-4 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-border/40">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </Card>
  );
}
