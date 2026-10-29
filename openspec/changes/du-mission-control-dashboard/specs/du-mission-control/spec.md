## Purpose

Establishes a new dedicated Development Universe project and repository (`du-dashboard` / `PRJ-0021` / `REP-0020`), bootstrapped from `ai-app-foundation`, providing a clean, calm multi-page DU platform integrated into the tree-view sidebar.

## ADDED Requirements

### Requirement: Standalone Project & Repository Bootstrap
The system SHALL bootstrap a new independent repository at `C:\Users\helder.toucas\Dev\du-dashboard` sourced from `ai-app-foundation` and register it under canonical DU governance (`PRJ-0021` and `REP-0020`).

#### Scenario: Registering project in canonical registries
- **WHEN** the setup step executes
- **THEN** system registers `PRJ-0021` in `Dev/home/08-system/registry/projects.json`, `REP-0020` in `repositories.json`, and creates `Dev/home/02-projects/PRJ-0021-du-dashboard.md`.

#### Scenario: Bootstrapping new codebase
- **WHEN** initializing `C:\Users\helder.toucas\Dev\du-dashboard`
- **THEN** system copies the Next.js 16 + shadcn/ui + SQLite WAL base, initializes a fresh git repository, and runs `pnpm install`.

### Requirement: Sidebar Tree Integration
The system SHALL integrate a collapsible "Universe Platform" group in `components/app-sidebar.tsx` navigating to 4 discrete sub-routes: Overview & Digest (`/dashboard/du`), Projects Directory (`/dashboard/du/projects`), Services & Ports (`/dashboard/du/services`), and Memory Governance (`/dashboard/du/memory`).

#### Scenario: Navigating via sidebar
- **WHEN** user expands "Universe Platform" in `app-sidebar`
- **THEN** system displays the 4 sub-routes with appropriate icons and direct navigation links.

### Requirement: Executive Overview & Digest Page
The system SHALL render a calm, high-level summary at `/dashboard/du` displaying 4 KPI stat cards (Active Projects, Memory Candidates, Active Session, Canonical Sync), an active dev services summary, and a memory digest preview.

#### Scenario: Viewing the executive overview
- **WHEN** user visits `/dashboard/du`
- **THEN** system renders the high-level executive cards without nested complex drawers or information overload.

### Requirement: Projects Directory & Dossier Modal
The system SHALL display all canonical DU projects in a clean tabular view at `/dashboard/du/projects` with search and a dedicated Dossier modal.

#### Scenario: Viewing projects directory
- **WHEN** user visits `/dashboard/du/projects`
- **THEN** system renders a table of registered initiatives with ID, Name, Domain badge (System, Formação, Personal), Status, and a "View Dossier" trigger.

#### Scenario: Opening project dossier
- **WHEN** user clicks "View Dossier"
- **THEN** system opens a modal dialog rendering the project's mission, current objectives, and priorities parsed from markdown.

### Requirement: Passive Services & Ports Telemetry
The system SHALL probe local dev server ports passively using `net.Socket` at `/dashboard/du/services` and provide 1-click sanitized terminal launch commands (`ACT-01`).

#### Scenario: Probing port availability
- **WHEN** user loads `/dashboard/du/services`
- **THEN** system checks configured local ports (e.g. 3000, 5173, 8000, 3100) with a 150ms timeout and displays Online/Standby status tags with direct localhost links for online services.

#### Scenario: Copying launch command
- **WHEN** user clicks the copy button on a service card
- **THEN** system copies the approved run command (`pnpm dev`, `npm run dev`) to clipboard for safe terminal execution.

### Requirement: Second Brain Memory Governance Review
The system SHALL display pending `MEM-*` memory candidates read-only at `/dashboard/du/memory` to assist in memory review before promotion.

#### Scenario: Reviewing memory candidates
- **WHEN** user visits `/dashboard/du/memory`
- **THEN** system displays staged memory candidates from `08-system/governance/candidates/` with classification tags, summary titles, and CLI promotion instructions.

### Requirement: Standalone Build & CI Isolation
The system SHALL gracefully degrade to bundled static fixtures if `Dev/home` is unmounted or absent.

#### Scenario: Building in standalone environment
- **WHEN** `pnpm build` executes in an environment where `Dev/home` does not exist
- **THEN** system uses `FALLBACK_PROJECTS` and builds successfully without errors.