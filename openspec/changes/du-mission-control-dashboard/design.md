## Context

See proposal.md - Why.
The Development Universe consists of canonical persistent memory located at `Dev/home` (Obsidian Second Brain) and execution repositories in `Dev/`. In accordance with `AGENTS.md` and DU invariants, this feature resides cleanly within `ai-app-foundation` (Next.js 16, App Router, SQLite WAL, shadcn/ui) without requiring any paid cloud dependencies or external background daemons.

## Goals / Non-Goals

**Goals:**
- Provide a responsive, high-performance UI cockpit for browsing and inspecting all DU projects.
- Implement server-side reading of canonical registry files (`Dev/home/08-ystem/registry/projects.json` & `repositories.json`) and project folders (`02-projects/`).
- Provide port connectivity probing (HTTP HEAD / TCP connect) to detect running local dev servers without hanging.
- Provide a slide-out drawer displaying markdown formatted `current-state.md` and project details.
- Provide a Second Brain health widget tracking pending `MEM-*` candidates and session telemetry.

**Non-Goals:**
- Mutating canonical vault memory directly from the dashboard (mutations adhere to DU Memory Governance via CLI/MCP).
- Managing remote Git operations or pushing branches.
- Introducing external microservices, Docker, or Redis.

## Decisions

1. **Local Vault Data Access Layer**:
   - *Decision*: Read canonical metadata directly from `Dev/home/08-ystem/registry/projects.json` using Node.js filesystem APIs in Next.js Server Components / Route Handlers, caching in memory with a short revalidation interval (SWR / React Cache).
   - *Alternative Considered*: Querying via Python DU Engine MCP API. Rejected as primary dependency so the dashboard runs independently even if Python engine daemon is stopped.

2. **Local Dev Server Port Detection**:
   - *Decision*: Node.js `net.Socket` quick probe (with 250ms timeout) for known local ports (3000, 3001, 3002, 3003, 3004, 5173, 8000).
   - *Alternative Considered*: Client-side `fetch()` polling. Rejected due to CORS restrictions and browser console spam when ports are closed.

3. **UI Composition & Component System**:
   - *Decision*: Use shadcn/ui `Card`, `Badge`, `Sheet`, `Tabs`, `Command` dialog, and Lucide React icons.
   - *Alternative Considered*: Heavy third-party admin dashboard template. Rejected to keep the bundle lean and compliant with `ai-app-foundation` standards.

## Risks / Trade-offs

- [Risk: Vault path resolution across machines] -> *Mitigation*: Resolve vault path dynamically from environment variable `DEV_HOME_PATH` or default relative path `../home`.
- [Risk: Port scanning blocking server thread] -> *Mitigation*: Run socket probes asynchronously in parallel with strict 250ms timeouts.
- [Risk: Large markdown current-state files slowing drawer] -> *Mitigation*: Fetch `current-state.md` lazily on demand when the drawer is triggered for a specific project.