# AGENTS.md — Development Invariants & AI Agent Protocol

## 1. Project Mission & Identity
`ai-app-foundation` is a reusable, local-first, free-first, Vercel-ready foundation for Next.js applications developed by AI agents.
It builds on top of **`next-forge`** (architecture & monorepo) and **`shadcn/ui`** (visual baseline), providing sensible defaults for offline development without mandatory paid cloud subscriptions.

---

## 2. Core Operational Protocol for AI Agents
1. **Understand & Inspect First**: Never generate parallel primitives or install new packages without verifying if `@repo/design-system`, `@repo/database`, or `@repo/ai` already provides the necessary building block.
2. **Local-First / Free-First Default**:
   - Authentication is optional (`AUTH=OFF` / local fallback).
   - Database works out-of-the-box via local connection strings or SQLite/Postgres.
   - External SaaS observability (Sentry, PostHog, BetterStack) runs in mock/no-op mode when tokens are absent.
   - AI endpoints default to local runtimes (Ollama via `OLLAMA_BASE_URL`) or cloud models when keys are supplied.
3. **Deterministic Quality Gates**:
   Before submitting changes, agents MUST execute:
   - `pnpm typecheck`
   - `pnpm test`
   - `pnpm build`
4. **UI & Design Invariant**:
   - Reuse existing `shadcn/ui` primitives in `packages/design-system/components/ui/`.
   - Never inject arbitrary raw colors or unconstrained spacing.
   - Always implement loading, empty, and error states.

---

## 3. Directory & Workspace Structure
```text
ai-app-foundation/
├── apps/
│   ├── app/                # Main application (Next.js 16 + Turbopack)
│   ├── web/                # Marketing / Public site
│   └── api/                # API service & webhook ingestion
├── packages/
│   ├── ai/                 # Vercel AI SDK integration (local/cloud modular)
│   ├── auth/               # Auth layer with graceful local fallback
│   ├── database/           # Prisma client and dual-mode connection
│   ├── design-system/      # shadcn/ui components, themes, styling
│   ├── next-config/        # Shared Next.js configuration & environment validation
│   ├── security/           # Arcjet & Nosecone security headers
│   └── ...
├── docs/                   # Architecture, assessment, deployment guides
└── AGENTS.md               # This file
```

---

## 4. Key Developer Commands
- `pnpm dev`: Starts the monorepo dev servers.
- `pnpm build`: Production build via Turborepo.
- `pnpm typecheck`: Full monorepo TypeScript verification.
- `pnpm test`: Runs Vitest test suites.
