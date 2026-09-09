# AI App Foundation

A small, opinionated, local-first Next.js 16 foundation based on **shadcn/ui**, optimized for rapid development with AI coding agents and seamless deployment to Vercel.

---

## 1. What is this?
A clean, production-ready single Next.js 16 application engineered specifically as a launchpad for applications built by AI coding agents. It removes setup friction, eliminates mandatory cloud paywalls during development, and enforces deterministic architectural quality gates.

## 2. Why does it exist?
Starting a new AI-assisted project usually wastes hours configuring Next.js, databases, auth, design tokens, and environment variables. `ai-app-foundation` provides:
- **Zero Docker**: Runs natively on your OS with Node.js, pnpm, and local persistence.
- **Local-First & Free-First**: Zero required paid cloud subscriptions. SQLite in WAL mode by default.
- **Single Next.js App**: Zero monorepo overhead or complex package linking.
- **Agent-Ready**: Preconfigured `AGENTS.md` and `FOUNDATION.md` guiding agents to inspect before modifying and reuse canonical components.

---

## 3. Stack
- **Framework**: Next.js 16 (App Router, Turbopack, Server Actions)
- **UI System**: `shadcn/ui` + Tailwind CSS v4 + `@phosphor-icons/react` + `next-themes`
- **Database**: Prisma 7 + local SQLite (`dev.db`) in WAL mode (`connection_limit=1&busy_timeout=10000`)
- **Logging**: Pino server-only logger with automatic secret redaction
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

# 3. Setup SQLite database & seed
pnpm setup

# 4. Start local development
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Quality Gates & Architectural Health
Before committing code or submitting pull requests, run:
```bash
# Verify TypeScript
pnpm typecheck

# Run unit and integration tests
pnpm test

# Verify 10 non-negotiable architectural invariants
pnpm foundation:check

# Verify Next.js production build
pnpm build
```

---

## 6. How Agents Should Work with This Repository
Read [`AGENTS.md`](./AGENTS.md) and [`FOUNDATION.md`](./FOUNDATION.md) before writing code:
1. **Inspect First**: Check `components/ui/` and `.agents/skills/shadcn/` before adding new UI components.
2. **Deterministic Quality Gates**: Always run `pnpm typecheck`, `pnpm test`, and `pnpm foundation:check`.
3. **No Docker**: Never generate Dockerfiles or docker-compose scripts.
4. **Local-First Default**: Keep SQLite WAL as default; use production recipes for external DB migrations.

