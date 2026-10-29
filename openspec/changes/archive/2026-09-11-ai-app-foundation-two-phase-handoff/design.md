# Design: AI App Foundation Architecture & Audit Strategy

## Architectural Strategy
The design establishes a high-cohesion, low-friction template layer on top of \ercel/next-forge\ and \shadcn/ui\ governed by two execution phases.

\\\	ext
                  AI APP FOUNDATION
                         │
              ┌──────────┴──────────┐
              │                     │
         NEXT-FORGE              SHADCN
      engenharia/base          visual/UI
              │                     │
              └──────────┬──────────┘
                         │
                  LOCAL-FIRST
                         │
              ┌──────────┼──────────┐
              │          │          │
            SQLite     local AI   optional
            Prisma     / Ollama    cloud
              │
              ▼
          Next.js app
              │
        ┌─────┴─────┐
        │           │
      LOCAL       VERCEL
\\\

## Decision Analysis: Phase 1 Upstream Audit Dimensions

1. **Estrutura & Core vs Opcional**:
   - Upstream \pps/\: \pp\ (Next.js dashboard), \web\ (marketing), \pi\ (Hono webhook ingestion), \docs\ (documentation), \mail\ (React Email preview), \storybook\, \studio\ (Prisma Studio).
   - Core packages: \@repo/design-system\, \@repo/database\, \@repo/next-config\, \@repo/security\, \@repo/typescript-config\.
   - Optional packages: \uth\, \i\, \nalytics\, \observability\, \payments\, \collaboration\, \eature-flags\, \cms\, \
otifications\, \storage\, \ate-limit\.

2. **Database & Zero-Docker Local Invariant**:
   - **Constraint**: Strict **NO DOCKER**. Developers or agents must never be forced to start Docker daemon or cloud Neon instances to run locally.
   - **Prisma Investigation**:
     - Prisma 7 schema datasource supports a single provider per schema (e.g. \provider = "postgresql"\ or \provider = "sqlite"\).
     - Upstream uses \@prisma/adapter-neon\ when Neon connection string is passed.
     - **Recommendation**: Support dual-mode through connection URL detection or schema generation. For zero-setup local dev without Docker, provide SQLite mode (\ile:./local.db\) or local native PostgreSQL (\localhost:5432\).

3. **Authentication Decoupling**:
   - Upstream hard-wires \@clerk/nextjs\.
   - Foundation provides non-blocking local session when \CLERK_SECRET_KEY\ is empty: mock user session returned in \uth()\ and \currentUser()\, preventing redirection loops in \(authenticated)\ routes. Ready for Better Auth when requested.

4. **UI & Design Foundation**:
   - Fully utilizes \shadcn/ui\ with Tailwind CSS v4 design tokens.
   - Enforces design invariants: reuse existing primitives in \packages/design-system\, never inject arbitrary colors/spacings, and always include loading, error, and empty states.

5. **AI Modular Layer**:
   - Uses Vercel AI SDK (\i\).
   - Defaults to local OpenAI-compatible runtimes (e.g. Ollama at \http://localhost:11434/v1\) or mock endpoints when cloud keys are absent.

## Quality Gates & Agent Benchmark
Before marking the change complete, the agent must pass the benchmark test:
- Build a complete internal workshop management dashboard page with KPIs, search, filters, CRUD, and responsive layout using solely existing foundation primitives.
