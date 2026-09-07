# Next-Forge Assessment & Architecture Strategy

## 1. Executive Summary

This assessment analyzes upstream `vercel/next-forge` (v6.0.2) against the requirements for our local-first, free-first, agent-ready foundation (`ai-app-foundation`).

Our goal is not to reinvent next-forge or build a proprietary framework, but to supply a lean layer of sensible defaults, decouple hard cloud vendor locks (Neon, Clerk, SaaS observability), enable SQLite/local PostgreSQL support, ensure pnpm/Node compatibility alongside Bun, and deliver an AI-ready application baseline with `shadcn/ui`.

---

## 2. Upstream vs Our Foundation: Decision Matrix

| Dimension | Upstream next-forge (v6.0.2) | Our Foundation (`ai-app-foundation`) | Rationale / Mechanism |
| :--- | :--- | :--- | :--- |
| **Package Manager / Runtime** | Bun (`bun@1.3.10`, `bun.lock`) | **pnpm + Node.js** (compatible with standard local dev and Vercel) | Eliminates Bun hard requirement on Windows; pnpm is first-class for Turborepo and Vercel. |
| **Database** | `@prisma/adapter-neon` + `@neondatabase/serverless` (PostgreSQL only) | **Prisma Dual-Mode**: SQLite (`file:./local.db`) for zero-dependency local dev OR PostgreSQL (local / Neon) | Allows running instantly with zero setup; `DATABASE_URL` switchable without code rewrite. |
| **Authentication** | Hard dependency on `@clerk/nextjs` | **Auth Optional (`AUTH=OFF` / `AUTH=OPTIONAL`)** | Foundation works out-of-the-box with mock/guest session when no keys are provided. Prepared for Better Auth or Clerk when activated. |
| **Email** | Resend required in schema | **Console / Mock Transport default** | Local dev logs emails to console or dev transport without requiring a Resend API token. |
| **Analytics & Observability** | Hard-wired Sentry, BetterStack, PostHog, Google Analytics | **Graceful no-op / disabled by default** | Environment validation skips unconfigured SaaS services; apps run clean without Sentry/PostHog tokens. |
| **Feature Flags / Collaboration** | Liveblocks, Flags SDK | **Optional / disabled when unconfigured** | UI renders cleanly when `LIVEBLOCKS_SECRET` or `FLAGS_SECRET` are not set. |
| **AI Integration** | Vercel AI SDK with hardcoded OpenAI model | **Vercel AI SDK modular provider**: Local (Ollama) or Cloud (OpenAI / Gemini / Anthropic) | Supports local development with Ollama (`http://localhost:11434/api`) or API keys when configured. |
| **UI Foundation** | `shadcn/ui` + Tailwind CSS v4 + Radix UI + Lucide | **shadcn/ui + Tailwind CSS v4** (Preserved as upstream canonical UI) | Strict design rules against arbitrary styling; consistent loading, error, empty states. |
| **Agent Readiness** | Basic Ultracite / AGENTS.md | **Comprehensive `AGENTS.md` + DU Context Invariants** | Instructions for inspection-first workflow, component reuse, and deterministic quality gates. |

---

## 3. What We Keep
- **Turborepo Monorepo Architecture**: Clean separation between `apps/` and `packages/`.
- **shadcn/ui & Tailwind CSS v4**: Upstream design system package (`@repo/design-system`) with full theme support (light/dark/system).
- **Vercel AI SDK (`ai`)**: Upstream `@repo/ai` with chat and thread primitives.
- **Security Baseline**: `@nosecone/next` security headers and proxy configuration.
- **Testing**: Vitest for unit/integration testing and Playwright for E2E testing.
- **Biome & Ultracite**: High-performance linting and formatting.

## 4. What We Change
1. **Database Adapter**: Refactor `@repo/database` to initialize standard PrismaClient when using SQLite or local PostgreSQL, and Neon adapter only when Neon connection string is detected.
2. **Auth Layer**: Make `@repo/auth` non-blocking. When `CLERK_SECRET_KEY` is not provided, mock session provider supplies a local developer user session so pages under `(authenticated)` render without redirection loops.
3. **Environment Keys (`keys.ts`)**: Relax strict requirements for third-party cloud services so `pnpm dev` and `pnpm build` succeed with only minimal/empty `.env`.
4. **Scripts**: Normalize npm scripts to run via `pnpm` and Node instead of forcing `bun --bun`.

## 5. What We Make Optional
- `packages/analytics` (PostHog / GA)
- `packages/observability` (Sentry / BetterStack)
- `packages/collaboration` (Liveblocks)
- `packages/payments` (Stripe)
- `packages/notifications` (Knock)
- `packages/feature-flags` (Vercel Flags)
