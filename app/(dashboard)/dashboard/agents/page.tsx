"use client";

import * as React from "react";
import {
  AgentRuntimeCardGrid,
  MultiAgentChatStream,
  HumanReviewBanner,
  type AgentRuntimeItem,
  type AgentChatMessage,
} from "@/components/dashboard/agents";
import { Separator } from "@/components/ui/separator";

const mockAgents: AgentRuntimeItem[] = [
  {
    id: "a1",
    name: "Claude Code",
    role: "Core Refactorer & Terminal Agent",
    modelTier: "pro",
    status: "active",
    configPath: "~/.claude/CLAUDE.md",
    lastActive: "2m ago",
    capabilitiesCount: 48,
  },
  {
    id: "a2",
    name: "Antigravity (Gemini)",
    role: "Architect & Orchestrator",
    modelTier: "pro",
    status: "active",
    configPath: "~/.gemini/antigravity-cli",
    lastActive: "Active now",
    capabilitiesCount: 52,
  },
  {
    id: "a3",
    name: "Cursor",
    role: "In-Editor Code Companion",
    modelTier: "flash",
    status: "idle",
    configPath: ".cursorrules",
    lastActive: "1h ago",
    capabilitiesCount: 39,
  },
  {
    id: "a4",
    name: "GitHub Copilot",
    role: "Workspace Autocomplete",
    modelTier: "flash",
    status: "idle",
    configPath: ".github/copilot-instructions.md",
    lastActive: "3h ago",
    capabilitiesCount: 31,
  },
  {
    id: "a5",
    name: "OpenCode",
    role: "Background Task Subagent",
    modelTier: "inherit",
    status: "active",
    configPath: "opencode.json",
    lastActive: "5m ago",
    capabilitiesCount: 44,
  },
];

const mockChat: AgentChatMessage[] = [
  {
    id: "m1",
    agentName: "Software Architect",
    agentRole: "AI Council",
    timestamp: "10:46 AM",
    thinking: "Analyzing bundle impact of Recharts under React 19. Identified need for next/dynamic client-side wrapper with skeleton fallbacks to avoid SSR layout thrashing.",
    content: "Architectural audit passed with recommendation to isolate Recharts via dynamic loading and ensure Phosphor icons use @phosphor-icons/react/ssr in server components.",
  },
  {
    id: "m2",
    agentName: "Red Teamer",
    agentRole: "Adversarial Critic",
    timestamp: "10:47 AM",
    thinking: "Probed 508-cell heatmap matrix for event listener explosion. Mounting 508 individual Popover components will trigger excessive DOM nodes and scroll jank.",
    content: "Blocked per-cell Popovers. Mandated single container-level delegated hovercard. Added CRLF sanitization to shared clipboard utility to prevent terminal command injection.",
  },
  {
    id: "m3",
    agentName: "UI/UX & Design Specialist",
    agentRole: "Design Systems",
    timestamp: "10:48 AM",
    thinking: "Inspected oklch color variables in globals.css. Monochromatic tokens made multi-layer radar charts illegible. Shifted to chromatic OKLCH palette with WCAG AA compliance.",
    content: "Tuned --chart-1..5 variables with balanced chroma and added semantic status tokens (--status-live, --status-drift, --status-missing) matching preset b27Gdgd6.",
  },
];

export default function AgentsShowcasePage() {
  const [approved, setApproved] = React.useState(false);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
            Category 6
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Multi-Agent Runtime & Observability
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Agent runtime status grid, multi-agent conversational hand-off streams, and human approval checkpoints.
        </p>
      </div>

      <Separator />

      {/* 1. Human Review Banner */}
      {!approved ? (
        <HumanReviewBanner
          title="Memory Candidate Promotion Approval"
          description="Antigravity proposed promoting MEM-0277 (Phosphor Icons SSR Invariant) to canonical vault memory."
          onApprove={() => setApproved(true)}
          onReject={() => alert("Action rejected")}
          onInspect={() => alert("Diff: Added @phosphor-icons/react/ssr rule to 08-system/constraints")}
        />
      ) : (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          ✓ Memory candidate MEM-0277 successfully approved and promoted to canonical vault storage.
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
