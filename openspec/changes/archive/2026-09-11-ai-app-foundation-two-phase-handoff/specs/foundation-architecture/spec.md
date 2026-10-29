# foundation-architecture Specification

## Purpose
Establishes the behavioral invariants and technical boundaries for \i-app-foundation\ across two phases (Audit and Foundation Delivery).

## Invariants & Requirements

### 1. Zero Docker & Zero Mandatory Cloud
- Under no circumstances shall local development require Docker daemon, Docker Compose, or mandatory cloud subscriptions.
- Local startup (\pnpm install && pnpm dev\) must succeed out of the box with zero external tokens.

### 2. Upstream Audit Verification (Phase 1)
- The audit must systematically document and answer all 11 evaluation dimensions in \docs/NEXT-FORGE-ASSESSMENT.md\:
  - Structure (core vs optional)
  - Database (SQLite / Postgres feasibility under Prisma without hacks)
  - Auth (graceful removal / local bypass)
  - AI (modular local vs cloud)
  - UI (shadcn integration & token model)
  - Apps (evaluation of app, web, api, docs, email, storybook, studio)
  - Packages (retention vs isolation)
  - Tooling (pnpm, Turborepo, Biome/Ultracite, Vitest)
  - Vercel (minimal deployment pathway)
  - Agent readiness (AGENTS.md rules & skills)
  - Upstream maintenance (patching & keeping close to upstream next-forge)

### 3. Database Layer Flexibility
- The database abstraction in \@repo/database\ must allow local development without cloud connection errors.
- Support native local PostgreSQL or SQLite cleanly. When Neon connection string is passed, activate Neon serverless adapter; otherwise, run standard direct PrismaClient.

### 4. Quality Gates
- \pnpm check\ (linter/formatter) must pass with 0 errors.
- \pnpm typecheck\ must pass across all monorepo workspaces.
- \pnpm test\ must pass Vitest suites.
- \pnpm build\ must succeed with Turborepo.

### 5. Agent-Driven Development Benchmark
- To prove agent readiness, an AI agent must successfully build an internal workshop management slice (dashboard, search, filter, CRUD, responsive UI) solely using existing shadcn components and database primitives without manual architectural intervention.
