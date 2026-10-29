# Proposal: AI App Foundation (Two-Phase Upstream Audit & Lean Delivery)

## Why
Rather than building another bespoke web framework or blindly inheriting cloud vendor lock-ins from upstream templates, we need a small, robust, sustainable foundation for AI-agent-built applications.
Starting from a clean slate on each new application forces agents to repeatedly reconstruct authentication, project structure, UI conventions, database abstractions, testing, and Vercel deployment.
By grounding our foundation in two battle-tested upstream pillars—\ercel/next-forge\ for technical architecture and \shadcn/ui\ for visual UI—we can provide a lean layer of local-first, free-first defaults.

Crucially, we must not assume how \
ext-forge\ operates. We must first execute **Phase 1 (Upstream Audit)** to discover the exact upstream structure, evaluate database flexibility (SQLite vs local Postgres without hacks), check auth removability, and audit dependencies before modifying code in **Phase 2 (Foundation Delivery)**.

## What Changes
- **Phase 1 — Upstream \
ext-forge\ Audit**:
  - Perform an evidence-based audit of upstream \ercel/next-forge\ (v6.0.2) and \shadcn/ui\ across 11 key dimensions: Structure, Database, Auth, AI, UI, Apps, Packages, Tooling, Vercel deployment, Agent readiness, and Upstream maintenance.
  - Formulate concrete answers documented in \docs/NEXT-FORGE-ASSESSMENT.md\.
  - Evaluate the SQLite vs PostgreSQL dual-mode feasibility under Prisma without introducing fragile hacks or breaking upstream Vercel deployment.
- **Phase 2 — Foundation Creation & Hardening**:
  - Establish \i-app-foundation\ as a local-first, free-first template repository.
  - **Zero Docker Rule**: Enforce **NO DOCKER** as an absolute requirement. Local development must run directly on native Node/pnpm environments (SQLite \ile:./local.db\ or native local PostgreSQL).
  - **SaaS Decoupling**: Disable by default Clerk, Stripe, Resend, Sentry, BetterStack, PostHog, BaseHub, Liveblocks, and Flags SDK.
  - **Visual Foundation**: Retain \shadcn/ui\ + Tailwind CSS v4 design tokens and enforce strict component reuse over ad-hoc styling.
  - **Quality Gates**: Ensure \pnpm check\ (Ultracite/Biome), \pnpm typecheck\, \pnpm test\ (Vitest), and \pnpm build\ (Turborepo) pass cleanly with zero cloud API keys.
  - **Agent Benchmark Proof**: Validate the foundation with an end-to-end simulated agent task (internal workshop management dashboard with CRUD, search, responsive layout, and zero new dependencies).

## Capabilities

### New Capabilities
- \
ext-forge-upstream-audit\: Structured 11-dimension architectural audit protocol verifying upstream invariants before code mutations.
- \local-first-database-layer\: Zero-Docker, zero-cloud Prisma configuration supporting SQLite and local PostgreSQL dynamically without breaking Vercel deployment.
- \gentic-benchmark-validation\: Deterministic proving test where an AI agent builds a complete functional slice (workshop management CRUD/KPI) using only foundation primitives.

### Modified Capabilities
- \oundation-auth-layer\: Transition from mandatory Clerk SaaS to optional auth (\AUTH=OFF\ / local mock session fallback, prepared for Better Auth).

## Impact
- **Repositories**: \Dev/ai-app-foundation\ (canonical implementation), \Dev/home\ (OpenSpec governance & audit tracking).
- **Tooling & Runtimes**: Node.js >= 18, pnpm 11, Turborepo 2, Prisma 7, Biome/Ultracite 7, Vitest 4, Next.js 16 (Turbopack), React 19.
- **Invariants**: Strictly NO Docker; zero required paid SaaS subscriptions for local dev.
