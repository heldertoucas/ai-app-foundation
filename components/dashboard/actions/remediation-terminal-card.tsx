"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/clipboard";
import { Terminal, Copy, Check } from "@phosphor-icons/react";

export interface RemediationTerminalCardProps {
  title?: string;
  description?: string;
  commands: {
    bash?: string;
    powershell?: string;
  };
  className?: string;
}

export function RemediationTerminalCard({
  title = "Remediation Command",
  description = "Run this command to synchronize drifted rules or schemas",
  commands,
  className,
}: RemediationTerminalCardProps) {
  const [shell, setShell] = React.useState<"bash" | "powershell">(
    commands.bash ? "bash" : "powershell"
  );
  const [copied, setCopied] = React.useState(false);

  const activeCommand = (shell === "bash" ? commands.bash : commands.powershell) || "";

  const handleCopy = async () => {
    const res = await copyToClipboard(activeCommand);
    if (res.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn("flex flex-col rounded-xl border border-border bg-card text-muted-foreground overflow-hidden shadow-md font-mono text-xs", className)}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted px-3 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-status-live-foreground" />
          <span className="font-semibold text-muted-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {commands.bash && (
            <button
              type="button"
              onClick={() => setShell("bash")}
              className={cn(
                "rounded px-2 py-0.5 text-xs transition-colors cursor-pointer",
                shell === "bash" ? "bg-muted text-muted-foreground font-semibold" : "text-muted-foreground hover:text-muted-foreground"
              )}
            >
              bash
            </button>
          )}
          {commands.powershell && (
            <button
              type="button"
              onClick={() => setShell("powershell")}
              className={cn(
                "rounded px-2 py-0.5 text-xs transition-colors cursor-pointer",
                shell === "powershell" ? "bg-muted text-muted-foreground font-semibold" : "text-muted-foreground hover:text-muted-foreground"
              )}
            >
              pwsh
            </button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={handleCopy}
            className="h-6 gap-1 px-2 text-xs text-muted-foreground hover:bg-muted hover:text-primary-foreground"
          >
            {copied ? <Check className="size-3 text-status-live-foreground" /> : <Copy className="size-3" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </Button>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="p-3 bg-muted leading-relaxed overflow-x-auto select-all text-foreground">
        <span className="text-status-live-foreground select-none">$ </span>
        {activeCommand}
      </div>

      {description && (
        <div className="px-3 py-1.5 border-t border-border bg-card/60 text-xs text-muted-foreground">
          {description}
        </div>
      )}
    </div>
  );
}
