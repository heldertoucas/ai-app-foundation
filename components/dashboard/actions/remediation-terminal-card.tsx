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
    <div className={cn("flex flex-col rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-md font-mono text-xs", className)}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/80 bg-neutral-900/90 px-3 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-emerald-400" />
          <span className="font-semibold text-neutral-200">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {commands.bash && (
            <button
              type="button"
              onClick={() => setShell("bash")}
              className={cn(
                "rounded px-2 py-0.5 text-[11px] transition-colors cursor-pointer",
                shell === "bash" ? "bg-neutral-800 text-neutral-100 font-semibold" : "text-neutral-400 hover:text-neutral-200"
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
                "rounded px-2 py-0.5 text-[11px] transition-colors cursor-pointer",
                shell === "powershell" ? "bg-neutral-800 text-neutral-100 font-semibold" : "text-neutral-400 hover:text-neutral-200"
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
            className="h-6 gap-1 px-2 text-[11px] text-neutral-300 hover:bg-neutral-800 hover:text-white"
          >
            {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </Button>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="p-3 bg-black/40 leading-relaxed overflow-x-auto select-all text-neutral-200">
        <span className="text-emerald-400 select-none">$ </span>
        {activeCommand}
      </div>

      {description && (
        <div className="px-3 py-1.5 border-t border-neutral-900 bg-neutral-950/60 text-[11px] text-neutral-400">
          {description}
        </div>
      )}
    </div>
  );
}
