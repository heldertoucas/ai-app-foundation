"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/clipboard";
import { Eye, EyeSlash, Copy, Check } from "@phosphor-icons/react";

export interface MaskedSecretViewerProps {
  label: string;
  value: string;
  className?: string;
}

export function MaskedSecretViewer({
  label,
  value,
  className,
}: MaskedSecretViewerProps) {
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const maskedValue = "•".repeat(Math.min(value.length, 28));

  const handleCopy = async () => {
    const res = await copyToClipboard(value);
    if (res.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5 rounded-xl border border-border/70 bg-card p-3 shadow-xs", className)}>
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono text-[10px]">{value.length} chars</span>
      </div>
      <div className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-1.5 font-mono text-xs">
        <span className="truncate select-all text-foreground">
          {revealed ? value : maskedValue}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => setRevealed(!revealed)}
            className="text-muted-foreground hover:text-foreground"
          >
            {revealed ? <EyeSlash className="size-3.5" /> : <Eye className="size-3.5" />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={handleCopy}
            className={cn(
              "text-muted-foreground hover:text-foreground transition-colors",
              copied && "text-emerald-500 font-bold"
            )}
          >
            {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
