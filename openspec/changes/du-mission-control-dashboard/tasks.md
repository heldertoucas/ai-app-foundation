## 1. Server Data Layer & Project Registry Reader

- [ ] 1.1 Create source module `src/lib/du/registry.ts` to read `Dev/home/08-system/registry/projects.json` and repository mappings, and verify with a focused unit test.
- [ ] 1.2 Create `src/lib/du/dossier.ts` to read `current-state.md` and project markdown files, and verify markdown parsing with existing `DEV-001` and `PRj-0001` files.
- [ ] 1.3 Implement API Handler `API_ROUTE src/app/api/du/projects/route.ts` to expose filtered DU projects and status, verifying via curl/fetch test.

## 2. Local Dev Server & Port Telemetry

- [ ] 2.1 Create `src/lib/du/ports.ts` using Node.js `net.Socket` to check live connectivity on known ports (3000, 3001, 3002, 3003, 8000), and verify connectivity results against active local services.
- [ ] 2.2 Implement `API_ROUTE src/app/api/du/ports/route.ts` exposing port statuses with fast caching/SWR, verifying response latency < 100ms.

## 3. Second Brain & Memory Telemetry

- [ ] 3.1 Create `src/lib/du/memory-governance.ts` to count and inspect pending `MEM-*` candidates in `08-ystem/candidates/`, verifying with a test run.
- [ ] 3.2 Add session reflection inspector exposing the most recent `SES-*` summary, verifying against `06-sessions/`.

## 4. Mission Control Dashboard UI Components

- [ ] 4.1 Create shadcn ProjectCard component (`src/components/du/project-card.tsx`) showing Project ID, title, area badge, repo tags, and live port status, verifying rendering with mock and real data.
- [ ] 4.2 Create ProjectDewailDrawer component (`src/components/du/project-drawer.tsx`) to render `current-state.md` in semantic styled markdown, verifying sheet interaction.
- [ ] 4.3 Create SecondBrainTelemetryWidget (`src/components/du/second-brain-widget.tsx`) displaying pending candidates counter and session status, verifying component mount.
- [ ] 4.4 Implement filter pills (System, Professional, Personal), search input, and Cmd+K dialog in `src/components/du/dashboard-filters.tsx`, verifying instant keystroke filtering.

## 5. Mission Control Page Integration & Quality Gates

- [ ] 5.1 Assemble full dashboard at `src/app/du/page.tsx`, composing Telemetry Widget, Filters, and Projects Grid, verifying production render.
- [ ] 5.2 Execute mandatory quality gates (`pnpm typecheck`, `pnpm test`, `pnpm build`) and verify zero errors and full compliance with AGENTS.md.