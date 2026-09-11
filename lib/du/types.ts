export type DuInvariantStatus = "live" | "drift" | "missing" | "unsupported";

export interface DuInvariant {
  code: string;
  title: string;
  category: string;
  status: DuInvariantStatus;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  explanation: string;
  evidenceIds: string[];
}

export interface DuComplianceTarget {
  id: string;
  label: string;
}

export interface DuComplianceMatrixRow {
  id: string;
  category: string;
  capability: string;
  description?: string;
  cells: Record<string, {
    targetId: string;
    status: DuInvariantStatus;
    detail?: string;
    updatedAt?: string;
  }>;
}

export interface DuComplianceMatrixData {
  targets: DuComplianceTarget[];
  rows: DuComplianceMatrixRow[];
  overallHealth: number;
  passCount: number;
  totalInvariants: number;
}

export type DuMemoryStage = "discovered" | "staged" | "evaluated" | "canonical";

export interface DuMemoryCandidate {
  id: string;
  title: string;
  targetType: "pattern" | "decision" | "knowledge" | "constraint";
  stage: DuMemoryStage;
  confidence: "high" | "medium" | "low";
  scope: "project" | "global";
  originatingSession: string;
  snippet: string;
  date: string;
  content?: string;
}

export interface DuContextRadarPoint {
  subject: string;
  value: number;
  fullMark: number;
}

export interface DuTokenBudget {
  system: number;
  memory: number;
  workspace: number;
  headroom: number;
  totalBudget: number;
  usedPercent: number;
}

export interface DuContextTelemetry {
  radarDimensions: DuContextRadarPoint[];
  tokenBudget: DuTokenBudget;
  activeEntities: {
    id: string;
    title: string;
    type: string;
    score: number;
  }[];
}

export interface DuHarnessStatus {
  name: string;
  status: "in-sync" | "drift" | "missing";
  lastGenerated?: string;
}

export interface DuRuleSyncData {
  harnessStatuses: DuHarnessStatus[];
  diffPreview: {
    filename: string;
    original: string;
    derived: string;
    additions: number;
    deletions: number;
  };
  isClean: boolean;
}

export interface DuGodNode {
  file: string;
  inDegree: number;
  outDegree: number;
  totalCoupling: number;
  riskLevel: "low" | "medium" | "high";
}

export interface DuGraphifyData {
  godNodes: DuGodNode[];
  categoryDistributions: {
    category: string;
    count: number;
  }[];
  boundaryViolations: {
    source: string;
    target: string;
    rule: string;
  }[];
}

export interface DuActionCommand {
  id: string;
  title: string;
  description: string;
  cliCommand: string;
  category: "Session" | "Governance" | "RuleSync" | "Quality" | "Graphify";
  requiresConfirmation?: boolean;
}
