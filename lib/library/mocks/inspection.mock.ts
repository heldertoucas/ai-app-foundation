import type { DiffLine } from "@/components/dashboard/inspection/code-diff-viewer";
import type { FileTreeNode } from "@/components/dashboard/inspection/file-tree-navigator";
import type { DuRuleSyncData, DuInvariant } from "@/lib/du/types";

export const mockDiffLines: DiffLine[] = [
  { type: "unchanged", oldLineNumber: 1, newLineNumber: 1, content: "export interface KpiStatCardProps {" },
  { type: "unchanged", oldLineNumber: 2, newLineNumber: 2, content: "  title: string;" },
  { type: "removed", oldLineNumber: 3, content: "  value: number;" },
  { type: "added", newLineNumber: 3, content: "  value: string | number;" },
  { type: "unchanged", oldLineNumber: 4, newLineNumber: 4, content: "  description?: string;" },
  { type: "added", newLineNumber: 5, content: "  trend?: 'up' | 'down' | 'neutral';" },
  { type: "unchanged", oldLineNumber: 5, newLineNumber: 6, content: "}" },
];

export const mockMarkdownDoc = `# 🛡️ Invariant Compliance Charter

## System Invariant 1: Local-First SQLite
- [x] WAL journaling enabled
- [x] Single writer connection limit
- [x] 10,000ms busy timeout guard

## System Invariant 2: Server-Only Pino
- [x] Automatic secret redaction for auth keys
- [ ] Direct client-side logger isolation

### Next Actions
1. Review OpenSpec change proposal.
2. Run test suites before commit.
`;

export const mockMaskedSecrets = [
  { label: "PRISMA_DATABASE_URL", value: "file:./dev.db?connection_limit=1&busy_timeout=10000" },
  { label: "GITHUB_TOKEN", value: "ghp_92A8k3Jx98347fhq2974hfhq29487fhqw" },
  { label: "SESSION_SECRET", value: "d41d8cd98f00b204e9800998ecf8427e" },
];

export const mockFileTreeNodes: FileTreeNode[] = [
  {
    id: "app",
    name: "app",
    type: "directory",
    children: [
      {
        id: "dashboard",
        name: "(dashboard)",
        type: "directory",
        children: [
          { id: "lib-page", name: "library/page.tsx", type: "file" },
          { id: "dash-layout", name: "layout.tsx", type: "file" },
        ],
      },
    ],
  },
  {
    id: "components",
    name: "components",
    type: "directory",
    children: [
      { id: "sidebar", name: "app-sidebar.tsx", type: "file" },
      { id: "dash-idx", name: "dashboard/index.ts", type: "file" },
    ],
  },
  {
    id: "lib",
    name: "lib",
    type: "directory",
    children: [
      { id: "reg", name: "library/component-registry.ts", type: "file" },
      { id: "clip", name: "clipboard.ts", type: "file" },
    ],
  },
];

export const mockRuleSyncData: DuRuleSyncData = {
  harnessStatuses: [
    { name: "CLAUDE.md", status: "in-sync", lastGenerated: "2026-09-11 12:00" },
    { name: "AGENTS.md", status: "in-sync", lastGenerated: "2026-09-11 12:00" },
    { name: ".gemini/rules", status: "in-sync", lastGenerated: "2026-09-11 12:00" },
  ],
  diffPreview: {
    filename: "AGENTS.md",
    original: "# Old Agent Constitution",
    derived: "# Unified Agent Constitution",
    additions: 12,
    deletions: 3,
  },
  isClean: true,
};

export const mockSampleInvariant: DuInvariant = {
  code: "CON-0012",
  title: "Continuous Dogfooding & Operational Feedback Policy",
  category: "Governance",
  status: "live",
  severity: "HIGH",
  explanation: "Workspaces must validate against canonical second brain constraints without direct ungrounded mutations.",
  evidenceIds: ["SES-2026-08-29-030", "DEC-0012"],
};

export const mockInspectionClientViewData = {
  ruleSyncData: mockRuleSyncData,
  initialInvariant: mockSampleInvariant,
  initialSession: null,
};
