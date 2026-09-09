# AGENTS.md —  I0P ai-app-foundation

## Non-Negotiable Constraints
- No Docker prerequisites.
- Single Next.js 16 application workspace (zero monorepo infrastructure).
- "shadcn/ui" is the exclusive UI component system.
- SQLite is the default local database in WAL mode.
- Pino logger is strictly server-only with automatic secret redaction.
- No unnecessary or mandatory paid Cloud SaaS dependencies.
- No destructive project cleanup or self-mutilation of files.
- "pnpm setup", "pnpm typecheck", "pnpm test", and "pnpm build" are mandatory quality gates.

## 1. Project Mission & Identity
ai-app-foundation is a reusable, local-first, free-first Next.js 16 foundation for AI agents. It provides sensible defaults without mandatory paid cloud subscriptions.

## 2. Core Operational Protocol for AI Agents
1. Local-First / Free-First Default:
   - Database: SQLite via Prisma (local `dev.db`) in WAL mode with "connection_limit=1&busy_timeout=10000".
   - Logging: Pino server-only logger with automatic secret redaction.
2. Deterministic Quality Gates:
   Before committing, the agent MUST run:
   - `pnpm typecheck`
   - `pnpm test`
   - `pnpm build`

## 3. Tool -> Purpose Dispatch Matrix
| Ferramenta | Quando e Como Usar |
| :--- | :--- |
| **AGENTS.md** | Constituição e regras específicas deste projeto. |
| **FOUNDATION.md** | 10 invariantes arquiteturais inegociáveis. |
| **OpenSpec** | Gestão de mudanças e especificação de requisitos. |
| **shadcn MCP / Skills** | Inspecionar, procurar e adicionar componentes ui. |
| **next-devtools-mcp** | Inspecionar a aplicação em execução local para diagnóstico. |
