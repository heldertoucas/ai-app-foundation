"use client";

import * as React from "react";
import {
  CodeDiffViewer,
  MarkdownReader,
  MaskedSecretViewer,
  FileTreeNavigator,
  type DiffLine,
  type FileTreeNode,
} from "@/components/dashboard/inspection";
import { Separator } from "@/components/ui/separator";
import { DuRuleSyncData } from "@/lib/du/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InspectionClientViewProps {
  ruleSyncData: DuRuleSyncData;
  initialInvariant?: string;
  initialSession?: string;
}

const sampleTree: FileTreeNode[] = [
  {
    id: "d1",
    name: "00-inbox",
    type: "directory",
    children: [
      { id: "f1", name: "SES-2026-09-10-002.md", type: "file" },
      { id: "f2", name: "SES-2026-09-11-001.md", type: "file" },
    ],
  },
  {
    id: "d2",
    name: "04-decisions",
    type: "directory",
    children: [
      { id: "f3", name: "DEC-0015-secure-session-cookies.md", type: "file" },
    ],
  },
  {
    id: "d3",
    name: "08-system/constraints",
    type: "directory",
    children: [
      { id: "f4", name: "CON-0012-continuous-dogfooding.md", type: "file" },
      { id: "f5", name: "CON-0015-graphify-boundary.md", type: "file" },
    ],
  },
  { id: "f6", name: "AGENTS.md", type: "file" },
  { id: "f7", name: "FOUNDATION.md", type: "file" },
];

export function InspectionClientView({
  ruleSyncData,
  initialInvariant,
  initialSession,
}: InspectionClientViewProps) {
  const [selectedNode, setSelectedNode] = React.useState<FileTreeNode>(sampleTree[0]);

  // Convert RuleSync diff preview to DiffLine format
  const diffLines: DiffLine[] = React.useMemo(() => {
    if (ruleSyncData.diffPreview) {
      const origLines = ruleSyncData.diffPreview.original.split("\n");
      const derLines = ruleSyncData.diffPreview.derived.split("\n");

      // Simple unified diff view
      return [
        ...origLines.map((content, idx) => ({
          type: "unchanged" as const,
          oldLineNumber: idx + 1,
          newLineNumber: idx + 1,
          content,
        })),
      ];
    }

    return [
      { type: "unchanged", oldLineNumber: 1, newLineNumber: 1, content: "# AGENTS.md — I0P ai-app-foundation" },
      { type: "unchanged", oldLineNumber: 2, newLineNumber: 2, content: "- No Docker prerequisites." },
      { type: "unchanged", oldLineNumber: 3, newLineNumber: 3, content: "- Single Next.js 16 application workspace." },
      { type: "added", newLineNumber: 4, content: "- Dual Shell remediation terminal support" },
    ];
  }, [ruleSyncData]);

  const sampleMarkdown = `# Second Brain Invariant Deep-Dive

${initialInvariant ? `Inspecting Invariant: **${initialInvariant}**` : "No specific invariant selected via query param."}
${initialSession ? `Context Provenance: **${initialSession}**` : ""}

## Canonical Governance Verification
- **Canonical Store**: Vault \`00\`–\`09\`
- **Boundary Guard**: No direct ungrounded file writes allowed
- **RuleSync Status**: ${ruleSyncData.isClean ? "All harnesses in full synchronization" : "Drift detected across harnesses"}

### Verified Target Harnesses
${ruleSyncData.harnessStatuses.map((h) => `- **${h.name}**: ${h.status} (Last synced ${h.lastGenerated})`).join("\n")}
`;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
            Category 5
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Inspection & Code Surfaces
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Unified/split diff viewers, GFM documentation readers, masked credentials, and nested file tree explorers.
        </p>
      </div>

      <Separator />

      {/* Target Harness Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {ruleSyncData.harnessStatuses.map((harness) => (
          <Card key={harness.name} className="p-4 flex flex-col justify-between">
            <span className="text-xs font-medium text-foreground">{harness.name}</span>
            <div className="flex items-center justify-between mt-2">
              <Badge variant={harness.status === "in-sync" ? "default" : "destructive"} className="text-[10px]">
                {harness.status}
              </Badge>
              <span className="text-[10px] text-muted-foreground font-mono">{harness.lastGenerated}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* 1. Code Diff Viewer */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">RuleSync Config Verification</h2>
        <CodeDiffViewer
          title="RuleSync Drift Inspection"
          oldFilename=".rulesync/config.yaml"
          newFilename="AGENTS.md (derived)"
          diffLines={diffLines}
        />
      </div>

      {/* 2. Markdown Reader & Masked Secret */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold font-heading text-foreground">Canonical Memory Specification</h2>
          <MarkdownReader content={sampleMarkdown} />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold font-heading text-foreground">Masked Secret Viewer (Server-Redacted)</h2>
          <MaskedSecretViewer label="ANTHROPIC_API_KEY" value="sk-ant-api03-live-49190184910248102948102" />
          <MaskedSecretViewer label="GEMINI_API_KEY" value="AIzaSyD-mock-secret-key-109284019284" />
          <MaskedSecretViewer label="DATABASE_URL" value="file:./dev.db?connection_limit=1&busy_timeout=10000" />
        </div>
      </div>

      {/* 3. File Tree Navigator */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">Obsidian Vault Structure Explorer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FileTreeNavigator
            nodes={sampleTree}
            selectedId={selectedNode.id}
            onSelectNode={setSelectedNode}
          />
          <div className="rounded-xl border border-border/70 bg-muted/20 p-4 text-xs font-mono">
            <span className="font-semibold text-foreground">Selected Node:</span>
            <div className="mt-2 text-muted-foreground">
              ID: {selectedNode.id}<br />
              Name: {selectedNode.name}<br />
              Type: {selectedNode.type}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
