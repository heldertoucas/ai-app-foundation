"use client";

import * as React from "react";
import {
  AgentRuntimeCardGrid,
  MultiAgentChatStream,
  HumanReviewBanner,
  type AgentRuntimeItem,
  type AgentChatMessage,
} from "@/components/dashboard/agents";
import { promoteCandidateAction } from "@/lib/du/actions";
import { copyTerminalCommand } from "@/lib/clipboard";
import { Separator } from "@/components/ui/separator";

const mockAgents: AgentRuntimeItem[] = [
  {
    id: "a1",
    name: "Antigravity (Gemini)",
    role: "Architect & Orchestrator",
    modelTier: "pro",
    status: "active",
    configPath: "~/.gemini/antigravity-cli",
    lastActive: "Active now",
    capabilitiesCount: 52,
  },
  {
    id: "a2",
    name: "Claude Code",
    role: "Terminal Agent & Refactorer",
    modelTier: "pro",
    status: "active",
    configPath: "~/.claude/CLAUDE.md",
    lastActive: "2m ago",
    capabilitiesCount: 48,
  },
  {
    id: "a3",
    name: "OpenCode",
    role: "Background Subagent Runner",
    modelTier: "inherit",
    status: "active",
    configPath: "opencode.json",
    lastActive: "5m ago",
    capabilitiesCount: 44,
  },
  {
    id: "a4",
    name: "Cursor",
    role: "In-Editor Code Companion",
    modelTier: "flash",
    status: "idle",
    configPath: ".cursorrules",
    lastActive: "1h ago",
    capabilitiesCount: 39,
  },
];

const mockChat: AgentChatMessage[] = [
  {
    id: "m1",
    agentName: "Software Architect",
    agentRole: "AI Council",
    timestamp: "14:32",
    thinking: "Analyzing bundle boundaries for Next.js 16. Mandating React Server Components for data fetching to prevent node:fs leaking into browser chunks.",
    content: "Architectural review passed with mandate to enforce server-only boundaries and isolate presentation components.",
  },
  {
    id: "m2",
    agentName: "Red Teamer",
    agentRole: "Adversarial Critic",
    timestamp: "14:33",
    thinking: "Auditing vault file reader and Server Actions for path traversal and command injection. Found unescaped CRLF pastejacking hazard.",
    content: "Blocked raw shell invocation. Mandated execFile with strict MEM-XXXX regex whitelist and newline-stripped clipboard copy.",
  },
  {
    id: "m3",
    agentName: "Resilience Engineer",
    agentRole: "Operations & Reliability",
    timestamp: "14:34",
    thinking: "Probed headless CI and Vercel preview environments lacking DEV_UNIVERSE_HOME. Verified that in-memory fixtures prevent build crashes.",
    content: "Approved capability probe pattern (lib/du/env.ts) and verified high-fidelity fallback fixtures for 100% CI determinism.",
  },
  {
    id: "m4",
    agentName: "UI/UX Specialist",
    agentRole: "Design & Accessibility",
    timestamp: "14:35",
    thinking: "Evaluated keyboard navigation on 508-cell heatmap. Replaced pointer-events-none hovercard with accessible popover bridge and tabindex=0.",
    content: "Upgraded heatmap with WCAG AA focus rings, click-through audit links, and responsive horizontal swipe rail on laptops.",
  },
];

export function AgentsClientView() {
  const [feedback, setFeedback] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleApprovePromotion = async () => {
    setIsSubmitting(true);
    try {
      const res = await promoteCandidateAction("MEM-0279", "pattern");
      if (res.mode === "clipboard_fallback" && res.command) {
        await copyTerminalCommand(res.command);
        setFeedback(res.message);
      } else {
        setFeedback(res.message);
      }
    } catch (err: any) {
      setFeedback(`Error: ${err?.message || "Failed to promote"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
            Category 6
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Multi-Agent Council & Governance
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Agent runtime ecosystem, simulated AI Council deliberation streams, and human promotion checkpoints.
        </p>
      </div>

      <Separator />

      {/* 1. Human Review Banner */}
      {!feedback ? (
        <HumanReviewBanner
          title="Candidate Memory Promotion Checkpoint"
          description="Promote MEM-0279 (Root-Delegated Hovercard Pattern) to canonical Second Brain patterns (03-patterns/)."
          onApprove={handleApprovePromotion}
          onReject={() => setFeedback("Promotion deferred by operator")}
          onInspect={() => window.open("/dashboard/matrix", "_blank")}
        />
      ) : (
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-3.5 text-xs text-foreground font-mono flex items-center justify-between">
          <span>✓ {feedback}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-muted-foreground hover:text-foreground text-[11px] underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Agent Runtime Card Grid */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">Active Agent Ecosystem</h2>
        <AgentRuntimeCardGrid agents={mockAgents} />
      </div>

      {/* 3. Multi-Agent Pipeline Chat Stream */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">AI Council Deliberation Stream</h2>
        <MultiAgentChatStream messages={mockChat} />
      </div>
    </div>
  );
}
