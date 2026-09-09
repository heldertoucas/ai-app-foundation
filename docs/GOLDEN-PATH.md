# GOLDEN PATH — Agent Onboarding & Standard Workflow

This document provides the universal 10-step Golden Path for any AI agent or software engineer joining i-app-foundation.

---

## The 10-Step Universal Workflow

### 1. Clone & Setup Repository
`ash
git clone <repo-url>
cd ai-app-foundation
pnpm setup
`
pnpm setup automatically copies .env.example to .env, runs prisma db push, generates the Prisma client, and verifies TypeScript definitions.

### 2. Inspect Invariants & Constitution
Inspect the core architectural governance documents before writing code:
- [AGENTS.md](file:///C:/Users/helder.toucas/Dev/ai-app-foundation/AGENTS.md) — Tool-to-purpose matrix & non-negotiable constraints.
- [FOUNDATION.md](file:///C:/Users/helder.toucas/Dev/ai-app-foundation/FOUNDATION.md) — 10 architectural invariants.

### 3. Verify System Health
Run the automated health checker:
`ash
pnpm foundation:check
`

### 4. Start Local Server
`ash
pnpm dev
`
Explore the running application at [http://localhost:3000](http://localhost:3000).

### 5. Inspect Installed Tooling & UI Capabilities
- Discover existing shadcn/ui components using .agents/skills/shadcn.
- Do NOT introduce third-party UI libraries (e.g. Radix primitives outside shadcn, MUI, Chakra, Ant).

### 6. Implement Feature Slice
- Keep logic inside Next.js 16 App Router (pp/).
- Use Server Actions (ctions.ts) for data mutations.
- Target local SQLite persistence via Prisma (lib/db.ts).
- Wrap UI with proper loading (loading.tsx), empty, and error (rror.tsx) boundaries.

### 7. Run Mandatory Quality Gates
Before submitting changes or committing, execute all quality gates in sequence:
`ash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
`

### 8. Run Browser E2E Tests (Optional / Milestone Validation)
`ash
pnpm test:e2e
`

### 9. Consult Operable Expansion Recipes
If requested to add Auth, PostgreSQL, AI SDK, or Vercel deployment, follow the self-contained operational guides in ecipes/:
- ecipes/auth/README.md
- ecipes/postgres/README.md
- ecipes/ai/README.md
- ecipes/vercel/README.md

### 10. Commit & Record Provenance
Commit changes with clean Conventional Commit messages.
