"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Check, X, Eye } from "@phosphor-icons/react";

export interface HumanReviewBannerProps {
  title: string;
  description: string;
  onApprove: () => void;
  onReject: () => void;
  onInspect?: () => void;
  className?: string;
}

export function HumanReviewBanner({
  title,
  description,
  onApprove,
  onReject,
  onInspect,
  className,
}: HumanReviewBannerProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-primary/30 bg-primary/5 p-4 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0 shadow-xs">
          <ShieldCheck className="size-5" />
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground font-heading">{title}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {onInspect && (
          <Button variant="outline" size="sm" onClick={onInspect} className="text-xs flex items-center gap-1">
            <Eye className="size-3.5" />
            <span>Inspect Diff</span>
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={onReject} className="text-xs flex items-center gap-1 text-destructive hover:bg-destructive/10">
          <X className="size-3.5" />
          <span>Reject</span>
        </Button>
        <Button size="sm" onClick={onApprove} className="text-xs flex items-center gap-1">
          <Check className="size-3.5" />
          <span>Approve Action</span>
        </Button>
      </div>
    </div>
  );
}
