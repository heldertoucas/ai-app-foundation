## Why

The Development Universe (DU) ecosystem contains over 18 active projects, services, CLI tools, and municipal web applications spread across Dev/, alongside canonical memory governance in the Obsidian Second Brain vault (Dev/home). Currently, there is no centralized, visual cockpit to inspect active projects, monitor running local development servers, view pending memory candidates (MEM-*), inspect vault link health, or examine project dossiers and current states.

A unified "Mission Control Dashboard" built directly into ai-app-foundation (leveraging Next.js 16, SQLite WAL, and shadcn/ui) bridges this gap, providing both the operator and AI agents with complete visibility and operational control over the DU ecosystem.

## What Changes

- **DU Project Registry Integration**: Server-side engine and API routes to read canonical project dossiers and metadata from Dev/home/08-system/registry/projects.json, repositories.json, and project folders (02-projects/).
- **Interactive Projects Dashboard UI**:
  - Grid/Card view displaying active DU projects, areas (system, professional, personal), repositories, tags, and status.
  - Quick action triggers: direct workspace path inspection, dossier viewer drawer, OpenSpec change status, and local repo launch triggers.
- **Live Local Process & Port Telemetry**:
  - Background/on-demand port listener checking running local servers across known DU ports (e.g. 3000, 3001, 3002, 3003, 8000).
  - Status indicators (Active/Offline) per project.
- **Second Brain & Memory Telemetry Widget**:
  - Live count and listing of pending memory candidates (08-system/candidates/MEM-*.md).
  - Active session tracker and link health/audit overview.
- **Project Detail & Current State Drawer**:
  - Interactive sheet/drawer to view markdown content of current-state.md, objectives, recent achievements, and immediate priorities directly without opening Obsidian.
- **Global Search & Filter Palette**:
  - Instant filtering by area, technology stack, and keyword, complemented by a Cmd+K / Ctrl+K command bar.

## Capabilities

### New Capabilities
- du-mission-control: Dashboard interface and server APIs for exploring active DU projects, reading project dossiers/current states, monitoring local dev server ports, and displaying Obsidian Second Brain memory telemetry.

### Modified Capabilities

## Impact

- **Affected Systems**: ai-app-foundation web UI and server endpoints (src/app/, src/components/, src/lib/).
- **External File System Access**: Read-only access to Dev/home (canonical vault metadata) and local socket/port inspection for local dev servers.
- **Dependencies**: Uses shadcn/ui components (Card, Badge, Sheet, Tabs, Command, ScrollArea), React Lucide icons, and server actions/route handlers. Zero paid cloud dependencies or external SaaS required.
