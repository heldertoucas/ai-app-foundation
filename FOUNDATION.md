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
11. Lean Performance & Single Icon Toolkit: AST barrel rewrite (`optimizePackageImports`) for icon/chart packages, Vitest worker threads (`singleThread: true`) for zero Windows IPC hangs, strictly 1 icon library (`@phosphor-icons/react` exclusively with zero `lucide-react` in root app), and non-destructive CSS `content-visibility: auto` preserving in-page `#anchor` navigation.
12. Deterministic Port Assignment: Bind root applications strictly to their designated DU Registry port allocation (CON-0020). Never occupy open user test blocks (3000-3099, 8000-8099).

