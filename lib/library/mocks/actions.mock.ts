import type { CommandItem } from "@/components/dashboard/actions/global-command-palette";
import type { DuActionCommand } from "@/lib/du/types";
import { mockStatusFilterOptions } from "./metrics.mock";

export const mockRemediationCommands = {
  bash: "pnpm rulesync generate && pnpm typecheck && pnpm test",
  powershell: "powershell -File ./scripts/rulesync-generate.ps1 ; pnpm typecheck ; pnpm test",
};

export const mockCommandPaletteItems: CommandItem[] = [
  { id: "CMD-1", title: "Run Quality Gates (Typecheck + Test)", category: "Verification" },
  { id: "CMD-2", title: "OpenSpec Apply Current Change", category: "OpenSpec", href: "/dashboard/library" },
  { id: "CMD-3", title: "RuleSync Generate Harness Files", category: "Governance" },
  { id: "CMD-4", title: "Inspect Local SQLite DB (Prisma Studio)", category: "Database" },
  { id: "CMD-5", title: "Promote Staged Memory Candidates", category: "Memory" },
];

export const mockActionCommands: DuActionCommand[] = [
  {
    id: "ACT-001",
    title: "Verify Quality Gates",
    description: "Execute typecheck, vitest test suites, and foundation rule validations.",
    cliCommand: "pnpm typecheck && pnpm test && node scripts/foundation-check.js",
    category: "Quality",
    requiresConfirmation: false,
  },
  {
    id: "ACT-002",
    title: "Re-generate RuleSync Harnesses",
    description: "Compile canonical agent rule templates into CLAUDE.md and AGENTS.md.",
    cliCommand: "rulesync generate",
    category: "RuleSync",
    requiresConfirmation: true,
  },
  {
    id: "ACT-003",
    title: "Propose Architectural Decision",
    description: "Stage a new ADR candidate into the canonical Development Universe memory index.",
    cliCommand: 'python -m dev.cli memory propose "New Decision" --type decision',
    category: "Governance",
    requiresConfirmation: false,
  },
  {
    id: "ACT-004",
    title: "Graphify Local Boundary Check",
    description: "Inspect cross-module couplings and flag server-only boundary leaks.",
    cliCommand: "node scripts/check-graphify-boundaries.js",
    category: "Graphify",
    requiresConfirmation: false,
  },
];

export const mockQuickFilterData = {
  search: "",
  statusOptions: mockStatusFilterOptions,
  selectedStatus: null,
};

export const mockActionsClientViewData = {
  actionCommands: mockActionCommands,
};
