"use client";

import * as React from "react";
import {
  OpenSpecKanbanBoard,
  PhaseStepper,
  ActivityTimelineFeed,
  type KanbanChangeItem,
  type OpenSpecStage,
} from "@/components/dashboard/workflow";
import { DuMemoryCandidate } from "@/lib/du/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface WorkflowClientViewProps {
  initialCandidates: DuMemoryCandidate[];
}

const recentEvents = [
  { id: 'e1', title: 'Memory candidate MEM-0280 staged from AI Grill stress-testing', timestamp: '2026-09-11T10:00:00.000Z', description: 'Hybrid Safe Subprocess Execution with Read-Only Default.', tag: 'Decision' },
  { id: 'e2', title: 'Memory candidate MEM-0279 staged from Session SES-2026-09-10-002', timestamp: '2026-09-11T09:30:00.000Z', description: 'Root-Delegated Hovercard State for High-Density Grid Displays.', tag: 'Pattern' },
  { id: 'e3', title: 'Canonical ADR DEC-0015 verified in vault', timestamp: '2026-09-11T08:00:00.000Z', description: 'Secure Session Cookie Requirement enforced across boundaries.', tag: 'Governance' },
];

export function WorkflowClientView({ initialCandidates }: WorkflowClientViewProps) {
  const initialChanges: KanbanChangeItem[] = initialCandidates.map((c) => ({
    id: c.id,
    name: c.id,
    title: `${c.id}: ${c.title}`,
    stage:
      c.stage === "canonical"
        ? "archived"
        : c.stage === "evaluated"
        ? "implementing"
        : c.stage === "staged"
        ? "specified"
        : "proposed",
    schema: c.targetType.toUpperCase(),
    tasksDone: c.stage === "canonical" ? 1 : 0,
    tasksTotal: 1,
    updatedAt: c.date,
  }));

  const [changes, setChanges] = React.useState(initialChanges);

  const handleMoveStage = (changeId: string, nextStage: OpenSpecStage) => {
    setChanges((prev) =>
      prev.map((c) => (c.id === changeId ? { ...c, stage: nextStage } : c))
    );
  };

  const pipelineSteps = [
    { id: "1", label: "Discovery", description: "Identified in active session notes" },
    { id: "2", label: "05-Candidates", description: "Staged MEM-* note in vault" },
    { id: "3", label: "AI Council Debate", description: "Multi-agent evaluation review" },
    { id: "4", label: "Canonical Memory", description: "Promoted to 00-04 durable knowledge" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
            Category 4
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Memory Governance & Change Workflow
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Visual tracker for 05-candidates/ lifecycle, AI Council review stages, and operational activity feeds.
        </p>
      </div>

      <Separator />

      {/* 1. Phase Stepper */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">DU Memory Governance Lifecycle</CardTitle>
          <CardDescription>Canonical progression from ephemeral session observation to durable Second Brain knowledge.</CardDescription>
        </CardHeader>
        <CardContent>
          <PhaseStepper steps={pipelineSteps} currentStepIndex={1} />
        </CardContent>
      </Card>

      {/* 2. OpenSpec Kanban Board */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">
          Candidate Memory Pipeline (05-candidates/)
        </h2>
        <OpenSpecKanbanBoard changes={changes} onMoveStage={handleMoveStage} />
      </div>

      {/* 3. Activity Timeline Feed */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">Operational Audit Log</h2>
        <Card className="p-4">
          <ActivityTimelineFeed events={recentEvents} />
        </Card>
      </div>
    </div>
  );
}
