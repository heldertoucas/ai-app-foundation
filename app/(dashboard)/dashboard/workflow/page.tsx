"use client";

import * as React from "react";
import {
  OpenSpecKanbanBoard,
  PhaseStepper,
  ActivityTimelineFeed,
  type KanbanChangeItem,
  type OpenSpecStage,
} from "@/components/dashboard/workflow";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const initialChanges: KanbanChangeItem[] = [
  {
    id: "c1",
    name: "universal-dashboard-component-library",
    title: "Universal Dashboard Component Library",
    stage: "implementing",
    schema: "spec-driven",
    tasksDone: 15,
    tasksTotal: 32,
    updatedAt: "10m ago",
  },
  {
    id: "c2",
    name: "sqlite-wal-hardening",
    title: "SQLite WAL Busy Timeout Hardening",
    stage: "verified",
    schema: "spec-driven",
    tasksDone: 6,
    tasksTotal: 6,
    updatedAt: "1h ago",
  },
  {
    id: "c3",
    name: "pino-secret-redaction",
    title: "Pino Server-Only Automatic Redaction",
    stage: "archived",
    schema: "spec-driven",
    tasksDone: 8,
    tasksTotal: 8,
    updatedAt: "Yesterday",
  },
  {
    id: "c4",
    name: "rulesync-matrix-v2",
    title: "508-Point Matrix Performance Optimization",
    stage: "specified",
    schema: "spec-driven",
    tasksDone: 0,
    tasksTotal: 12,
    updatedAt: "2h ago",
  },
  {
    id: "c5",
    name: "multi-agent-audit",
    title: "Autonomous Multi-Agent Debate System",
    stage: "proposed",
    schema: "spec-driven",
    tasksDone: 0,
    tasksTotal: 4,
    updatedAt: "Just now",
  },
];

const pipelineSteps = [
  { id: "1", label: "Spec Planning", description: "OpenSpec Change validated" },
  { id: "2", label: "AI Council Debate", description: "4 Subagent Personas approved" },
  { id: "3", label: "Component Scaffolding", description: "7 Domain directories active" },
  { id: "4", label: "Showcase & Quality Gates", description: "Typecheck & Vitest passing" },
];

const recentEvents = [
  {
    id: "e1",
    title: "OpenSpec Change universal-dashboard-component-library moved to Implementing",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    description: "Tasks 1.1-4.3 implemented and verified against Next.js 16 compiler.",
    tag: "OpenSpec",
  },
  {
    id: "e2",
    title: "AI Council Audit completed with conditional approval",
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    description: "UI/UX, Software Architect, Red Teamer, and Resilience Engineer reviews synthesized.",
    tag: "Council",
  },
  {
    id: "e3",
    title: "SQLite dev.db WAL mode checkpoint verified",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    description: "Busy timeout set to 10000ms with single connection pool guard.",
    tag: "Database",
  },
];

export default function WorkflowShowcasePage() {
  const [changes, setChanges] = React.useState(initialChanges);

  const handleMoveStage = (changeId: string, nextStage: OpenSpecStage) => {
    setChanges((prev) =>
      prev.map((c) => (c.id === changeId ? { ...c, stage: nextStage } : c))
    );
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
            Category 4
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Workflow & Lifecycle Tracking
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          OpenSpec change boards, pipeline progress steppers, and connected activity feeds.
        </p>
      </div>

      <Separator />

      {/* 1. Phase Stepper */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Interactive Pipeline Phase Stepper</CardTitle>
          <CardDescription>Visual tracker for multi-stage operational pipelines.</CardDescription>
        </CardHeader>
        <CardContent>
          <PhaseStepper steps={pipelineSteps} currentStepIndex={2} />
        </CardContent>
      </Card>

      {/* 2. OpenSpec Kanban Board */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">OpenSpec Change Lifecycle Board</h2>
        <OpenSpecKanbanBoard changes={changes} onMoveStage={handleMoveStage} />
      </div>

      {/* 3. Activity Timeline Feed */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">Operational Timeline Feed</h2>
        <Card className="p-4">
          <ActivityTimelineFeed events={recentEvents} />
        </Card>
      </div>
    </div>
  );
}
