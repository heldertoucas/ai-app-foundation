# 📋 Delta Spec: Interactive DU Command Center & Execution Terminal

* **Capability**: `command-center`
* **Parent Change**: `du-second-brain-integration`

---

## 1. Requirements

### 1.1 Global Command Palette (`⌘K`) Integration
* The `GlobalCommandPalette` MUST register direct shortcuts for all primary DU workflows and skills:
  * `/ai-start`: Initialize a DU session and assemble Project context.
  * `/ai-council`: Launch a multi-agent architectural debate.
  * `/ai-remember`: Propose a new pattern or decision memory candidate.
  * `/ai-health`: Run a full ecosystem invariant check.
  * `/ai-link-audit`: Check wikilink health and identify broken targets.
  * `/ai-close`: Reflect and conclude the active session.
  * `rulesync generate`: Recompile derived agent rule files.
* Each command MUST feature category tags, keyboard shortcut hints, and descriptive subtext.

### 1.2 Interactive Remediation Terminal
* The `RemediationTerminalCard` MUST support:
  * One-click copying of commands with CRLF sanitization via `lib/clipboard.ts`.
  * Real-time execution output feedback for client-safe operations.
  * Presets for standard diagnostic scripts (`dev doctor`, `pnpm test`, `pnpm build`).

### 1.3 Quick-Filter Toolbar Filtering
* The `QuickFilterToolbar` MUST enable instantaneous client-side filtering of session history, audit events, and memory candidates by status (`PASS`, `WARN`, `PENDING`), date range, or agent harness.
