# 📋 Delta Spec: RuleSync Drift & Multi-Harness Sync Engine

* **Capability**: `rulesync-drift`
* **Parent Change**: `du-second-brain-integration`

---

## 1. Requirements

### 1.1 Visual Rule Diffing
* The system MUST compare canonical source rules in `.rulesync/` against derived agent files (`AGENTS.md`, `CLAUDE.md`, `.cursorrules`).
* Discrepancies MUST be presented in the `CodeDiffViewer` with line-by-line syntax-highlighted additions and deletions.
* If a derived file has been manually edited rather than generated via `rulesync generate`, the system MUST flag an invariant violation (`DU-007`).

### 1.2 Multi-Harness Sync Status
* The UI MUST show sync status for all configured agent harnesses:
  * Antigravity / Gemini
  * Claude Code
  * OpenCode
  * Cursor
* Status badges MUST show `In Sync` (green), `Drift Detected` (amber), or `Missing` (red).

### 1.3 1-Click Remediation
* When drift is detected, the UI MUST provide a 1-click button or terminal command in `RemediationTerminalCard` to run `rulesync generate` and restore canonical derivation integrity.
