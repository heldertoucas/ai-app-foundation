# 📋 Delta Spec: Memory Candidate Pipeline & AI Council Stream

* **Capability**: `memory-pipeline`
* **Parent Change**: `du-second-brain-integration`

---

## 1. Requirements

### 1.1 Memory Governance Kanban Board
* The system MUST populate the `OpenSpecKanbanBoard` with real memory candidates from `05-candidates/` and session observations.
* Columns MUST represent the 4 canonical stages of memory governance:
  1. `Discovered`: Identified in recent active session notes as `[Candidate]`.
  2. `Staged`: Stored in `05-candidates/` with status `pending`.
  3. `AI Council`: Under active review with debate commentary.
  4. `Canonical`: Promoted into `03-patterns/`, `04-decisions/`, or `00-knowledge/`.
* Each card MUST display:
  * Memory ID (e.g. `MEM-0279`, `MEM-0163`)
  * Target classification badge (`PATTERN`, `DECISION`, `KNOWLEDGE`, `CONSTRAINT`)
  * Confidence badge (`HIGH`, `MEDIUM`, `LOW`)
  * Originating session link (e.g. `SES-2026-09-10-002`)
  * Summary snippet of the observation

### 1.2 Multi-Agent Debate Simulation & Telemetry
* The `MultiAgentChatStream` component MUST display an architectural council debate stream assessing the highest-impact staged candidate.
* The stream MUST simulate perspectives from 3 canonical agent personas:
  * **Architectural Invariant Enforcer**: Assesses compliance with system boundaries and constraints.
  * **Pragmatic Builder**: Assesses implementation cost, ergonomics, and maintenance burden.
  * **Test / Security Auditor**: Scrutinizes regressions, concurrency, and edge cases.
* The `AgentRuntimeCardGrid` MUST display live event volume and session counts from `audit_summary` for active agent harnesses (`Antigravity`, `OpenCode`, `Claude Code`).

### 1.3 Human Review & Promotion Action
* The page MUST provide an interactive `HumanReviewBanner` allowing an operator to approve candidate promotion.
* Approving a candidate triggers a Server Action that invokes the DU CLI or MCP tool, moving the candidate to `promoted` status and logging the decision.
