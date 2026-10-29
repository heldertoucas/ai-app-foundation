import type { MatrixRow } from "@/components/dashboard/matrix/capability-matrix-heatmap";
import type { DataTableColumn } from "@/components/dashboard/matrix/data-table";
import { mockComplianceData } from "./metrics.mock";

export const mockMatrixTargets = [
  { id: "DEV-001", label: "Dev Ecosystem" },
  { id: "ai-app-foundation", label: "ai-app-foundation" },
  { id: "PRJ-0001", label: "Agent Engine" },
  { id: "PRJ-0017", label: "RuleSync Core" },
];

export const mockMatrixRows: MatrixRow[] = [
  {
    id: "DU-001",
    category: "Lifecycle",
    capability: "DU-001: Workspace Resolution",
    description: "Resolves project root and vault URI cleanly",
    cells: {
      "DEV-001": { targetId: "DEV-001", status: "live", detail: "Resolved to REP-0001 via MCP" },
      "ai-app-foundation": { targetId: "ai-app-foundation", status: "live", detail: "Direct workspace path resolved" },
      "PRJ-0001": { targetId: "PRJ-0001", status: "live", detail: "Workspace identity confirmed" },
      "PRJ-0017": { targetId: "PRJ-0017", status: "live", detail: "Upstream git remote validated" },
    },
  },
  {
    id: "DU-002",
    category: "Lifecycle",
    capability: "DU-002: Session Context Grounding",
    description: "Session initialization logs active constraints before modifications",
    cells: {
      "DEV-001": { targetId: "DEV-001", status: "live", detail: "Active session logged" },
      "ai-app-foundation": { targetId: "ai-app-foundation", status: "live", detail: "Context initialized via ai-start" },
      "PRJ-0001": { targetId: "PRJ-0001", status: "drift", detail: "Session start recorded with 2m delay" },
      "PRJ-0017": { targetId: "PRJ-0017", status: "live", detail: "Observed at t=0" },
    },
  },
  {
    id: "DU-003",
    category: "Context",
    capability: "DU-003: Context Engine Pre-Flight",
    description: "Context capsule requested prior to any code edits",
    cells: {
      "DEV-001": { targetId: "DEV-001", status: "live", detail: "dev_context capsule assembled" },
      "ai-app-foundation": { targetId: "ai-app-foundation", status: "live", detail: "get_context grounded retrieval" },
      "PRJ-0001": { targetId: "PRJ-0001", status: "live", detail: "Capsule loaded in-memory" },
      "PRJ-0017": { targetId: "PRJ-0017", status: "live", detail: "RuleSync context retrieved" },
    },
  },
  {
    id: "DU-004",
    category: "Governance",
    capability: "DU-004: Memory Staging & Governance",
    description: "Proposes MEM-* candidates rather than ungrounded vault writes",
    cells: {
      "DEV-001": { targetId: "DEV-001", status: "live", detail: "9 candidates pending digest" },
      "ai-app-foundation": { targetId: "ai-app-foundation", status: "live", detail: "Safe proposal via CLI" },
      "PRJ-0001": { targetId: "PRJ-0001", status: "live", detail: "Autonomous promotion gated" },
      "PRJ-0017": { targetId: "PRJ-0017", status: "missing", detail: "Missing promotion hook" },
    },
  },
];

export interface MockAuditItem {
  id: string;
  rule: string;
  target: string;
  status: string;
  lastChecked: string;
}

export const mockAuditData: MockAuditItem[] = [
  { id: "AUD-101", rule: "CON-0012: Dogfooding", target: "DEV-001", status: "Compliant", lastChecked: "10m ago" },
  { id: "AUD-102", rule: "CON-0015: Graphify Boundary", target: "ai-app-foundation", status: "Compliant", lastChecked: "12m ago" },
  { id: "AUD-103", rule: "DEC-0024: Local SQLite WAL", target: "ai-app-foundation", status: "Compliant", lastChecked: "15m ago" },
  { id: "AUD-104", rule: "CON-0008: Server-Only Pino", target: "ai-app-foundation", status: "Compliant", lastChecked: "20m ago" },
  { id: "AUD-105", rule: "DU-0002: Session Pre-Flight", target: "PRJ-0001", status: "Drift", lastChecked: "25m ago" },
];

export const mockAuditColumns: DataTableColumn<MockAuditItem>[] = [
  { key: "id", header: "Audit ID", sortable: true },
  { key: "rule", header: "Invariant / Rule", sortable: true },
  { key: "target", header: "Target Scope", sortable: true },
  { key: "status", header: "Compliance Status", sortable: true },
  { key: "lastChecked", header: "Last Checked" },
];

export const mockMatrixClientViewData = {
  initialData: mockComplianceData,
};
