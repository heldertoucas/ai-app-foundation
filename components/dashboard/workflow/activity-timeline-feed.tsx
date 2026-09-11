"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface TimelineEventItem {
  id: string;
  title: string;
  timestamp: string; // ISO date string
  description?: string;
  tag?: string;
  icon?: React.ReactNode;
}

export interface ActivityTimelineFeedProps {
  events: TimelineEventItem[];
  className?: string;
}

export function ActivityTimelineFeed({
  events,
  className,
}: ActivityTimelineFeedProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={cn("relative flex flex-col gap-6 pl-4", className)}>
      {/* Connected Hairline Rail */}
      <div className="absolute left-6 top-2 bottom-2 w-px bg-border/80" />

      {events.map((event) => (
        <div key={event.id} className="relative flex items-start gap-4">
          {/* Node Icon */}
          <div className="relative z-10 flex size-5 items-center justify-center rounded-full bg-background ring-4 ring-background border border-primary text-primary">
            {event.icon ? event.icon : <div className="size-1.5 rounded-full bg-primary" />}
          </div>

          {/* Event Content */}
          <div className="flex flex-1 flex-col gap-1 rounded-xl border border-border/60 bg-card p-3 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-foreground">{event.title}</span>
              <div className="flex items-center gap-1.5">
                {event.tag && (
                  <Badge variant="outline" className="text-[10px] font-mono py-0">
                    {event.tag}
                  </Badge>
                )}
                <time
                  dateTime={event.timestamp}
                  className="font-mono text-[11px] text-muted-foreground"
                >
                  {mounted ? new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : event.timestamp.slice(11, 16)}
                </time>
              </div>
            </div>
            {event.description && (
              <p className="text-xs text-muted-foreground">{event.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
