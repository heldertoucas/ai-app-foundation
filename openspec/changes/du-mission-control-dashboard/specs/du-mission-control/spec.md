## Purpose

Provides a centralized Mission Control cockpit and telemetry service across all active Development Universe (DU) projects, applications, dev server ports, and Obsidian Second Brain memory governance.

## ADDED Requirements

### Requirement: Active Projects Registry View
The system SHALL aggregate and display all active DU projects from the canonical project registry (`projects.json` and project directories) in responsive cards.

#### Scenario: Displaying project cards
- **WHEN** user navigates to the Mission Control dashboard
- **THEN** system renders a grid of project cards with Project ID, Name, Area (system, professional, personal), Status, and repository tags.

#### Scenario: Filtering and searching projects
- **WHEN** user enters search terms or toggles area filter pills (System, Professional, Personal)
- **THEN** system immediately filters the displayed cards to matching projects.

### Requirement: Project Dossier and Current State Drawer
The system SHALL allow users to open a slide-out drawer or sheet to inspect full project details, current state, active objectives, and immediate priorities.

#### Scenario: Inspecting project details
- **WHEN** user clicks on a project card or "View Details" trigger
- **THEN** system opens a drawer rendering the project's metadata, repositories, and markdown formatted `current-state.md`.

### Requirement: Local Dev Server Port Telemetry
The systemSHILL check connectivity and status for configured local development server ports and display live status badges.

#### Scenario: Detecting running local dev servers
- **WHEN** the dashboard loads or user clicks "Refresh Telemetry"
- **THEN** system scans local ports (e.g. 3000, 3001, 3002, 3003, 8000) and marks active services with an "Online" indicator and direct link.

### Requirement: Second Brain & Memory Telemetry Widget
The systemSHILL query and summarize pending memory candidates (`MEM-*`), active session metadata, and links health from the Obsidian Second Brain vault.

#### Scenario: Displaying memory candidates telemetry
- **WHEN** user views the Second Brain telemetry section
- **THEN** system displays the count of pending memory candidates in `08-system/candidates/`, with direct preview of candidate titles and classifications.