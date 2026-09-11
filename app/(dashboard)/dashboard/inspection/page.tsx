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

const sampleDiff: DiffLine[] = [
  { type: "unchanged", oldLineNumber: 1, newLineNumber: 1, content: "import { db } from '@/lib/db';" },
  { type: "removed", oldLineNumber: 2, content: "const connectionLimit = 10;" },
  { type: "added", newLineNumber: 2, content: "const connectionLimit = 1; // SQLite WAL mode single-writer guard" },
  { type: "unchanged", oldLineNumber: 3, newLineNumber: 3, content: "export async function query() {" },
  { type: "removed", oldLineNumber: 4, content: "  return db.project.findMany();" },
  { type: "added", newLineNumber: 4, content: "  return db.project.findMany({ timeout: 10000 });" },
  { type: "unchanged", oldLineNumber: 5, newLineNumber: 5, content: "}" },
];

const sampleMarkdown = `# OpenSpec Architectural Verification

This report verifies adherence to the **10 Foundation Invariants**.

## Completed Verification Items
- [x] Zero Docker prerequisites enforced
- [x] SQLite in WAL mode with connection_limit=1
- [x] Pino server-only logger with auto secret redaction
- [ ] Multi-tenant cloud SaaS authentication (Non-Goal)

### Reviewer Verdict
All constraints passed inspection with zero regressions.`;

const sampleTree: FileTreeNode[] = [
  {
    id: "d1",
    name: "components",
    type: "directory",
    children: [
      {
        id: "d2",
        name: "dashboard",
        type: "directory",
        children: [
          { id: "f1", name: "metrics.tsx", type: "file" },
          { id: "f2", name: "charts.tsx", type: "file" },
          { id: "f3", name: "matrix.tsx", type: "file" },
        ],
      },
      { id: "f4", name: "ui/chart.tsx", type: "file" },
    ],
  },
  { id: "f5", name: "FOUNDATION.md", type: "file" },
];

export default function InspectionShowcasePage() {
  const [selectedNode, setSelectedNode] = React.useState<FileTreeNode>(sampleTree[0]);

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

      {/* 1. Code Diff Viewer */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">Code Diff Viewer (Split / Unified)</h2>
        <CodeDiffViewer
          title="SQLite Config Drift"
          oldFilename="lib/db.ts (legacy)"
          newFilename="lib/db.ts (canonical)"
          diffLines={sampleDiff}
        />
      </div>

      {/* 2. Markdown Reader & Masked Secret */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold font-heading text-foreground">Sanitized Markdown Reader</h2>
          <MarkdownReader content={sampleMarkdown} />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold font-heading text-foreground">Masked Secret Viewer</h2>
          <MaskedSecretViewer label="ANTHROPIC_API_KEY" value="sk-ant-api03-live-49190184910248102948102" />
          <MaskedSecretViewer label="GEMINI_API_KEY" value="AIzaSyD-mock-secret-key-109284019284" />
          <MaskedSecretViewer label="DATABASE_URL" value="file:./dev.db?connection_limit=1&busy_timeout=10000" />
        </div>
      </div>

      {/* 3. File Tree Navigator */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">File Tree Explorer</h2>
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
