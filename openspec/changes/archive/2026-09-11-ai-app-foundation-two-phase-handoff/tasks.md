## 1. Phase 1: Upstream Audit & Assessment Documentation

- [ ] 1.1 Complete comprehensive 11-dimension upstream audit of next-forge v6.0.2 in docs/NEXT-FORGE-ASSESSMENT.md covering Structure, Database, Auth, AI, UI, Apps, Packages, Tooling, Vercel, Agents, and Maintenance.
- [ ] 1.2 Evaluate and document Prisma SQLite vs local PostgreSQL feasibility, testing if SQLite dual-mode can be achieved without fragile hacks.

## 2. Phase 2: Local-First & Zero-Docker Architecture Implementation

- [ ] 2.1 Enforce NO DOCKER invariant in database layer by implementing seamless native local connection handling and dual-mode Neon adapter detection in packages/database.
- [ ] 2.2 Verify and test AUTH=OFF non-blocking session fallback in packages/auth and middleware/proxy without redirection loops.
- [ ] 2.3 Verify and configure modular local AI runtime (Ollama/LM Studio via OLLAMA_BASE_URL) in packages/ai.
- [ ] 2.4 Author complete mandatory documentation suite: docs/ARCHITECTURE.md, docs/FREE_FIRST.md, docs/DEVELOPMENT.md, and docs/DEPLOYMENT.md.

## 3. Quality Gates & Verification

- [ ] 3.1 Verify pnpm check passes cleanly across all workspaces with zero linter errors.
- [ ] 3.2 Verify pnpm typecheck passes across all 27 monorepo packages.
- [ ] 3.3 Verify pnpm test and pnpm build pass with zero cloud environment variables set.

## 4. Agent Benchmark Proving Test

- [ ] 4.1 Implement sample workshop management dashboard page (dashboard, KPI cards, data table, search, filters, CRUD, responsive UI) solely using existing shadcn components.
- [ ] 4.2 Verify agent implementation builds, passes lint, and runs without architectural intervention.
- [ ] 4.3 Synthesize final agent report (sections A through J) per handoff specification.
