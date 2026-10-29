import type { AgentRuntimeItem } from "@/components/dashboard/agents/agent-runtime-card-grid";
import type { AgentChatMessage } from "@/components/dashboard/agents/multi-agent-chat-stream";

export const mockAgents: AgentRuntimeItem[] = [
  {
    id: "AGT-001",
    name: "Antigravity Prime",
    role: "Lead Architect & Planner",
    modelTier: "inherit",
    status: "active",
    configPath: ".gemini/rules/dev-universe.md",
    lastActive: "Just now",
    capabilitiesCount: 14,
  },
  {
    id: "AGT-002",
    name: "Caveman Investigator",
    role: "Codebase Exploration & Localization",
    modelTier: "flash",
    status: "idle",
    configPath: ".gemini/skills/cavecrew",
    lastActive: "12m ago",
    capabilitiesCount: 8,
  },
  {
    id: "AGT-003",
    name: "OpenSpec Auditor",
    role: "Spec Enforcement & Gatekeeper",
    modelTier: "pro",
    status: "active",
    configPath: "openspec/changes/dashboard-component-library",
    lastActive: "3m ago",
    capabilitiesCount: 6,
  },
  {
    id: "AGT-004",
    name: "Vitest Runner",
    role: "Deterministic Verification",
    modelTier: "flash",
    status: "idle",
    configPath: "vitest.config.ts",
    lastActive: "1h ago",
    capabilitiesCount: 4,
  },
];

export const mockChatMessages: AgentChatMessage[] = [
  {
    id: "MSG-001",
    agentName: "Antigravity Prime",
    agentRole: "System Architect",
    timestamp: "17:15",
    thinking: "Analyzing bundle impact of adding Recharts directly to standard library catalog route.",
    content: "We should wrap all chart-heavy previews in next/dynamic({ ssr: false }) to isolate SVG rendering and prevent hydration mismatches.",
  },
  {
    id: "MSG-002",
    agentName: "OpenSpec Auditor",
    agentRole: "Compliance Gate",
    timestamp: "17:18",
    thinking: "Checking against CON-0012 and FOUNDATION.md invariants.",
    content: "Confirmed: Isolated mocks in lib/library/mocks/ prevent direct database hits. Quality gates will pass deterministically.",
  },
  {
    id: "MSG-003",
    agentName: "Caveman Investigator",
    agentRole: "Localization",
    timestamp: "17:20",
    thinking: "All 30 components localized across 7 folders in components/dashboard/.",
    content: "All exports verified. ErrorBoundary wrapper ready for integration.",
  },
];

export const mockHumanReview = {
  title: "Memory Promotion Request: MEM-0279",
  description: "Agent Antigravity proposes promoting Per-Card ErrorBoundary pattern to global engineering notes.",
};

export const mockAgentsClientViewData = {
  agents: mockAgents,
  messages: mockChatMessages,
  review: mockHumanReview,
};
