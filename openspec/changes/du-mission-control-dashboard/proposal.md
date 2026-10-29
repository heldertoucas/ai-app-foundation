## Why

The Development Universe (DU) ecosystem encompasses over 18 active initiatives, services, and municipal applications across `Dev/`, along with canonical memory governance in the Obsidian Second Brain vault (`Dev/home`). Currently, there is no dedicated dashboard app to monitor these initiatives and inspect running services.

Instead of entangling the Mission Control dashboard inside `ai-app-foundation` (which is a reusable template/scaffold for AI apps), we will **create a new standalone DU Project and Repository (`du-dashboard`)**. 
The new project will **source and bootstrap from this `ai-app-foundation` codebase** (Next.js 16 + shadcn/ui + SQLite WAL) and be implemented as an independent repository inside the DU workspace (`C:\Users\helder.toucas\Dev\du-dashboard`).

To prevent cognitive overload, the new app will implement a clean, multi-page architecture matching `ai-app-foundation`'s tree-view sidebar (`components/app-sidebar.tsx`):
- High-level, summarized overview on the primary landing page (`/dashboard/du`).
- Dedicated sub-pages for in-depth exploration: Projects Directory (`/dashboard/du/projects`), Services & Ports Fleet (`/dashboard/du/services`), and Second Brain Memory Governance (`/dashboard/du/memory`).

## What Changes

- **New DU Project & Repository Setup (`du-dashboard`)**:
  - Provision a new repository at `C:\Users\helder.toucas\Dev\du-dashboard` bootstrapped directly from `ai-app-foundation`.
  - Register the new project and repository in DU canonical registries:
    - Project: `PRJ-0021` (`du-dashboard` / "DU Mission Control Dashboard") in `Dev/home/08-system/registry/projects.json`.
    - Repository: `REP-0020` (`du-dashboard`) in `Dev/home/08-system/registry/repositories.json`.
    - Project dossier note: `Dev/home/02-projects/PRJ-0021-du-dashboard.md`.
- **Sidebar Integration (`components/app-sidebar.tsx`)**:
  - Adds a dedicated collapsible `Universe Platform` menu in `AppSidebar` with 4 sub-routes:
    1. `1. Overview & Digest` (`/dashboard/du`)
    2. `2. Projects Directory` (`/dashboard/du/projects`)
    3. `3. Services & Ports Fleet` (`/dashboard/du/services`)
    4. `4. Memory Governance` (`/dashboard/du/memory`)
- **Server Data Layer (`lib/du/`) in the new repo**:
  - Direct, token-free read-only inspection of `Dev/home/08-system/registry/projects.json` with fallback fixtures for isolated environments (`lib/du/env.ts`).
  - Markdown parser for project dossiers and `current-state.md` (`lib/du/dossier.ts`).
  - Safe, passive socket connectivity probe for localhost dev servers (`lib/du/ports.ts` with 150ms timeout) and 1-click sanitized terminal launch command copying (`ACT-01`), avoiding orphaned Windows background processes.
  - Read-only memory candidate and session inspector (`lib/du/memory-adapter.ts`).
- **Clean Multi-Page UI (`app/(dashboard)/dashboard/du/`) in the new repo**:
  - `page.tsx`: Executive summary dashboard with 4 KPI cards (`KpiStatCard` style), active dev servers list, memory digest snippet, and key initiatives.
  - `projects/page.tsx`: Clean tabular directory of all 18+ DU initiatives with domain badges, search, and a slide-out dossier modal dialog.
  - `services/page.tsx`: Dedicated cards for local port telemetry (`:3000`, `:5173`, `:8000`), status indicators, direct localhost links, and copyable run commands.
  - `memory/page.tsx`: Second brain governance review page displaying staged `MEM-*` candidates awaiting CLI promotion.

## Capabilities

### New Capabilities
- `du-standalone-project`: Bootstrapped new project repository `du-dashboard` sourced from `ai-app-foundation` and registered under DU governance (`PRJ-0021` / `REP-0020`).
- `du-overview-digest`: Executive summary page (`/dashboard/du`) aggregating KPIs, active servers, and memory candidate counts in a relaxed, readable layout.
- `du-projects-directory`: Full directory page (`/dashboard/du/projects`) and dossier modal for exploring canonical DU initiatives and `current-state.md`.
- `du-services-fleet`: Port telemetry page (`/dashboard/du/services`) providing passive socket connectivity probing and copyable launch commands.
- `du-memory-governance`: Memory candidate review page (`/dashboard/du/memory`) displaying staged second-brain proposals.

## Impact

- **New Workspace Location**: `C:\Users\helder.toucas\Dev\du-dashboard` (independent Git repo).
- **Canonical Vault Registries**:
  - `Dev/home/08-system/registry/projects.json` (adds `PRJ-0021`)
  - `Dev/home/08-system/registry/repositories.json` (adds `REP-0020`)
  - `Dev/home/02-projects/PRJ-0021-du-dashboard.md` (new project note)
- **Zero Invariant Violations**:
  - Zero Docker prerequisites.
  - No paid cloud SaaS or LLM token costs.
  - SQLite WAL mode preserved.
  - Pino server-only logging with secret redaction.
