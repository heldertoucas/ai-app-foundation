## Context

The Development Universe (DU) consists of canonical memory located at Dev/home (Obsidian Second Brain) and execution repositories in Dev/.
Rather than inflating i-app-foundation (which is intended as a reusable template/scaffold), we will instantiate a dedicated project and repository:
- Project ID: PRJ-0021 (DU Mission Control Dashboard)
- Repository ID: REP-0020 (du-dashboard at C:\Users\helder.toucas\Dev\du-dashboard)
- Sourced from: i-app-foundation (cloned/copied baseline)

## Goals / Non-Goals

**Goals:**
- Bootstrap a standalone Next.js 16 application workspace at Dev/du-dashboard initialized from i-app-foundation.
- Register the new project and repository under canonical DU governance (Dev/home/08-system/registry/).
- Provide a clean, readable multi-page experience using standard shadcn/ui cards, tables, and dialogs.
- Provide direct, token-free server-side filesystem reading of canonical registry files (Dev/home/08-system/registry/projects.json) with graceful fallback fixtures for isolated CI/build environments (lib/du/env.ts).
- Deliver safe, passive socket connectivity probing (
et.Socket with 150ms timeout) and 1-click sanitized terminal launch command copying (ACT-01), avoiding orphaned Windows background processes.
- Provide a clear project dossier viewer showing current-state.md and priorities.
- Provide a read-only memory governance view showing pending MEM-* candidates.

**Non-Goals:**
- Convoluted single-page dashboards with nested drawers and excessive information density.
- Spawning background child processes inside Next.js that leave orphaned zombie 
ode.exe processes on Windows.
- Mutating canonical vault memory directly from the web UI (mutations adhere to DU Memory Governance via CLI mem propose / i-review-memory).

## Decisions

1. **Standalone Repository (du-dashboard) vs. Embedding into i-app-foundation**:
   - *Decision*: Instantiate du-dashboard as a distinct DU project (PRJ-0021) and repository (REP-0020) at C:\Users\helder.toucas\Dev\du-dashboard. It inherits the robust Next.js 16 + shadcn + SQLite foundation while keeping i-app-foundation pristine as a reusable starter template.

2. **Multi-Page AppSidebar Architecture vs. Monolithic Cockpit**:
   - *Decision*: Integrate a collapsible Universe Platform group directly into components/app-sidebar.tsx with 4 discrete pages. Keep the landing page (/dashboard/du) concise and executive.

3. **Process Execution Safety (Council Finding ACT-01)**:
   - *Decision*: Avoid spawning long-running dev servers inside the Next.js process on Windows. Use passive socket probing + 1-click sanitized command copy (pnpm dev, 
pm run dev) for the operator terminal.

4. **Filesystem Isolation & Fallback (RES-01)**:
   - *Decision*: Implement lib/du/env.ts with auto-detection of Dev/home. When absent (e.g. during CI or Docker-less builds), fall back gracefully to bundled static fixtures (FALLBACK_PROJECTS) so 
ext build never crashes.

5. **Component Primitives**:
   - *Decision*: Use existing shadcn UI primitives (Card, Badge, Button, Table, Dialog, Progress).

## Architecture & Data Flow

- Project du-dashboard at C:\Users\helder.toucas\Dev\du-dashboard.
- Server Data Layer reads Dev/home/08-system/registry/projects.json directly or falls back to bundled fixtures.
- Port probe performs lightweight 
et.Socket checks with 150ms timeout.
- Next.js Server Components render each of the 4 routes under pp/(dashboard)/dashboard/du/.
