# Lean App Foundation Architectural Invariants

These are the 10 inegociáveis arquitectural invariants for ai-app-foundation.

1. Single Next.js application workspace (zero monorepo infrastructure).
2. Local-First & Free-First defaults (SQLite + Prisma in WAL mode).
3. No mandatory Docker or cloud SaaS prerequisites for development.
4. Single UI System: shadcn/ui primitives. No secondary UI libraries.
5. Pino logger strictly server-only with automatic secret redaction.
6. Non-interactive CLI operations only (--yes --overwrite --accept-data-loss).
7. Route group layout isolation: only app/layout.tsx defines <html> and <body>.
8. SQLite Windows file-lock resilience: singleton globalThis.prisma + connection timeout.
9. Deterministic Quality Gates: typecheck + test + build before any commit.
10. Vercel readiness: recipes handle production transitions (e.g. Postgres, Auth).
