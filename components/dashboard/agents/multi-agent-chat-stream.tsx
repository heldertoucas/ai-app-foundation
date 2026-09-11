"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Robot, CaretDown, CaretUp } from "@phosphor-icons/react";

export interface AgentChatMessage {
  id: string;
  agentName: string;
  agentRole: string;
  avatarColor?: string;
  thinking?: string;
  content: string;
  timestamp: string;
}

export interface MultiAgentChatStreamProps {
  messages: AgentChatMessage[];
  className?: string;
}

export function MultiAgentChatStream({ messages, className }: MultiAgentChatStreamProps) {
  const [openThinking, setOpenThinking] = React.useState<Record<string, boolean>>({});

  const toggleThinking = (id: string) => {
    setOpenThinking((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={cn("flex flex-col gap-4 max-h-[600px] overflow-y-auto p-1", className)}>
      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-col gap-2 rounded-xl border border-border/70 bg-card p-4 shadow-xs">
          {/* Agent Identity Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-muted border border-border text-foreground">
                <Robot className="size-4" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">{msg.agentName}</span>
                <Badge variant="secondary" className="font-mono text-[10px] px-1.5 py-0">
                  {msg.agentRole}
                </Badge>
              </div>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">{msg.timestamp}</span>
          </div>

          {/* Collapsible Thinking Block */}
          {msg.thinking && (
            <div className="flex flex-col rounded-lg border border-border/60 bg-muted/30 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleThinking(msg.id)}
                className="flex items-center justify-between px-3 py-1.5 text-[11px] font-mono text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <span>Agent Reasoning / Deliberation</span>
                {openThinking[msg.id] ? <CaretUp className="size-3" /> : <CaretDown className="size-3" />}
              </button>
              {openThinking[msg.id] && (
                <div className="px-3 py-2 text-xs font-mono text-muted-foreground/90 border-t border-border/40 whitespace-pre-wrap leading-relaxed">
                  {msg.thinking}
                </div>
              )}
            </div>
          )}

          {/* Final Content Output */}
          <div className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}
