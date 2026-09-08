# Next-Forge Assessment & Architecture Strategy (Handoff V2)

## 1. Executive Summary

This assessment analyzes upstream `vercel/next-forge` (v6.0.2) in conjunction with `shadcn/ui` to establish the foundational architecture for `ai-app-foundation`.
Our mission is to create a reusable, local-first, free-first, agent-ready Next.js foundation without Docker, minimizing deviation from upstream while guaranteeing zero cloud lock-in for offline development.

---

## 2. Current Upstream Architecture

Upstream `vercel/next-forge` is a high-performance monorepo organized via Turborepo:
- **Package Manager**: Upstream defaults to Bun (`bun.lock`, `bun@1.3.10`).
- **Core App**: `apps/app` (Next.js 16 App Router + React 19 + Turbopack).
- **Auxiliary Apps**: `apps/web` (marketing site), `apps/api` (webhook ingestion), `apps/storybook` (component workbench), `apps/email` (React Email previews).
- **Shared Design System**: `packages/design-system` embedding `shadcn/ui` primitives with Tailwind CSS v4 and CSS variables.
- **Database**: `packages/database` powered by Prisma 7 (`datasource db { provider = "postgresql" }`) with `@neondatabase/serverless` and `@prisma/adapter-neon`.
- **Authentication**: `packages/auth` tightly coupled with `@clerk/nextjs`.
- **AI**: `packages/ai` using Vercel AI SDK (`ai` v6).
- **Security**: `packages/security` with `@nosecone/next` security headers and proxy configuration.
- **Tooling**: Biome and Ultracite for zero-config linting and formatting.

---

## 3. Decision Matrix: What We Keep, Disable, Remove, and Modify

| Component / Layer | Upstream (`next-forge`) | Our Foundation (`ai-app-foundation`) | Classification | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Package Manager** | Bun (`bun.lock`) | **pnpm + Node.js** | **Modified** | Native Windows compatibility without WSL; standard on Vercel and CI. |
| **Architecture** | Turborepo (`apps/`, `packages/`) | Preserved Turborepo structure | **Keep** | Clean boundaries, shared packages (`@repo/*`), cached builds. |
| **Design System** | `shadcn/ui` + Tailwind CSS v4 | Preserved canonical `shadcn/ui` | **Keep** | Industry baseline; agent-friendly atomic primitives. |
| **Database Adapter** | Neon Serverless PostgreSQL only | **Dual-Mode Adapter (Postgres local / Neon + SQLite zero-dep)** | **Modified** | Eliminates mandatory cloud DB or Docker container for local dev. |
| **Authentication** | Mandatory Clerk | **Auth Optional (`AUTH=OFF` / mock dev session)** | **Modify / Disable by default** | Works offline without Clerk API keys; bypasses login loops. |
| **AI Integration** | Hardcoded OpenAI cloud model | **Modular AI SDK (Ollama local / Cloud keys)** | **Modify / Optional** | Free-first development; zero API key cost locally. |
| **Docker** | None (some templates use Docker Postgres) | **STRICT NO DOCKER** | **Invariant** | Everything runs natively in Node.js / SQLite / local OS. |
| **Observability** | Mandatory Sentry & BetterStack | **Disabled by default (No-op)** | **Disable** | Offline dev and builds succeed without external SaaS keys. |
| **Analytics** | PostHog & Google Analytics | **Disabled by default (No-op)** | **Disable** | Zero network noise; opt-in for production. |
| **Payments** | Stripe (`packages/payments`) | **Disabled by default** | **Optional** | Never required for foundational development. |
| **Email** | Resend (`packages/email`) | **Console / Dev Transport fallback** | **Modify / Optional** | Outgoing emails logged to console during dev. |
| **Collaboration** | Liveblocks (`packages/collaboration`) | **Disabled by default** | **Optional** | Render fallback avatar/cursor when secret is absent. |
| **CMS** | BaseHub (`packages/cms`) | **Disabled / Graceful offline build** | **Disable** | Builds complete even when `BASEHUB_TOKEN` is missing. |

---

## 4. Why Each Change is Necessary

1. **pnpm over Bun**: Guarantees seamless execution across all developer OS environments (Windows, macOS, Linux) without requiring WSL or specific Bun binaries.
2. **Local Database without Docker**: Requiring Docker adds heavy virtualization overhead, daemon prerequisites, and complexity. Enabling SQLite or native Postgres ensures `pnpm dev` works immediately after `git clone`.
3. **Optional Auth**: Greenfield applications often do not need authentication on day 1. Tying the foundation to Clerk requires signing up, creating an application, and copying API keys before running the app. Local mock sessions allow immediate feature development.
4. **No-op External SaaS**: Hard dependencies on Sentry, PostHog, or Stripe break offline development and clutter CI logs with warning/error traces.

---

## 5. Known Constraints & Trade-offs

1. **Prisma Schema Provider Constraint**: Prisma schema does not support dynamic datasource providers (e.g. `provider = env("DB_PROVIDER")`). Supporting SQLite and PostgreSQL simultaneously requires maintaining clean corresponding schema declarations or a unified SQLite fallback adapter.
2. **Clerk React Tree**: `@clerk/nextjs` hooks can throw if rendered outside `<ClerkProvider>`. Our mock auth provider safely stubs user and session context to prevent runtime crashes.
3. **Next.js 16 & React 19 Turbopack**: React 19 and Next.js 16 enforce strict ESM and package exports, requiring exact typing and dependency synchronization across workspace packages.

---

## 6. Upstream Maintenance Implications

- **Preserved Directory Structure**: We do not rename or reorganize packages arbitrarily. `packages/design-system`, `packages/database`, `packages/auth`, and `apps/app` retain their upstream locations.
- **Upstream Git Remote Tracking**: A remote tracking upstream `https://github.com/vercel/next-forge.git` can be added. Upstream updates to `shadcn/ui` components or security headers can be pulled and merged with minimal conflicts.
- **Small Delta Philosophy**: All customizations are localized to environment key validation (`keys.ts`), adapters (`packages/database/index.ts`), and providers (`packages/auth/server.ts`). Core application logic remains untouched.
