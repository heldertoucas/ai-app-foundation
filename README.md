# AI App Foundation

A small, opinionated, local-first Next.js foundation based on **next-forge** and **shadcn/ui**, optimized for rapid development with AI coding agents and optional deployment to Vercel.

---

## 1. What is this?
A clean, production-ready full-stack Next.js monorepo engineered specifically as a launchpad for applications built by AI coding agents. It removes setup friction, eliminates mandatory cloud paywalls during development, and enforces deterministic architectural quality gates.

## 2. Why does it exist?
Starting a new AI-assisted project usually wastes hours configuring Next.js, databases, auth, design tokens, and environment variables. `ai-app-foundation` provides:
- **Zero Docker**: Runs natively on your OS with Node.js, pnpm, and local persistence.
- **Local-First & Free-First**: Zero required paid cloud subscriptions.
- **Small Custom Layer**: Minimal deviation from upstream `vercel/next-forge` to keep updates effortless.
- **Agent-Ready**: Preconfigured `AGENTS.md` guiding agents to inspect before modifying and reuse canonical components.

---

## 3. Stack
- **Framework**: Next.js 16 (App Router, Turbopack, Server Actions)
- **Monorepo**: Turborepo + pnpm (v11)
- **Visuals**: `shadcn/ui` + Tailwind CSS v4 + Lucide Icons + `next-themes`
- **Database**: Prisma 7 (Dual-mode: Local Postgres / Neon + SQLite zero-dep)
- **AI**: Vercel AI SDK (`ai` v6 + `@ai-sdk/react`) with Ollama / Cloud support
- **Auth**: Off by default (mock local developer session), Clerk / Better Auth optional
- **Tooling**: Biome, Vitest, TypeScript 5.9
- **Deployment**: Vercel-ready with zero runtime vendor lock-in

---

## 4. How to Install & Run Locally

```bash
# 1. Clone repository
git clone https://github.com/heldertoucas/ai-app-foundation.git
cd ai-app-foundation

# 2. Install dependencies
pnpm install

# 3. Start local development
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Database Setup (NO DOCKER)
By default, the application runs locally without requiring a database container:
- **Local Native PostgreSQL**: Point `DATABASE_URL` in `.env` to your local PostgreSQL instance:
  ```env
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_foundation"
  ```
- **Neon Cloud (Optional)**: Provide a Neon connection string:
  ```env
  DATABASE_URL="postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require"
  ```
- **Generate Client**:
  ```bash
  pnpm --filter @repo/database build
  ```

---

## 6. Optional Services (Off by Default)

All external SaaS services run in graceful no-op mode when keys are omitted:
- **Authentication**: Set `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to activate Clerk. When unset, a mock developer session (`user_local_dev`) is automatically provided.
- **AI**: Set `OPENAI_API_KEY` or configure `OLLAMA_BASE_URL=http://localhost:11434` for local models.
- **Observability**: Set `SENTRY_DSN` or `BETTERSTACK_API_KEY` only when production monitoring is needed.
- **Email**: Set `RESEND_API_KEY` for cloud delivery; otherwise, dev/console transport is used.

---

## 7. How to Run Quality Gates
Before committing code or submitting pull requests, run:
```bash
# Verify TypeScript across all workspace apps and packages
pnpm typecheck

# Run unit and integration tests
pnpm test

# Verify production Turborepo build
pnpm build
```

---

## 8. Deployment to Vercel
1. Import repository on [Vercel](https://vercel.com).
2. Set **Root Directory** to `apps/app`.
3. Set build command to Turborepo default (`pnpm build`).
4. Supply your production `DATABASE_URL` (Neon or any Postgres provider).

---

## 9. How Agents Should Work with This Repository
Read [`AGENTS.md`](./AGENTS.md) before writing code:
1. **Inspect First**: Check `@repo/design-system` for existing UI primitives before installing new ones.
2. **Deterministic Quality Gates**: Always run `pnpm typecheck` and `pnpm test` after implementing features.
3. **No Docker**: Never generate Dockerfiles or docker-compose scripts.
