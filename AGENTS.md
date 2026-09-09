# AGENTS.md —  I0P ai-app-foundation

## 1. Project Mission & Identity
ai-app-foundation is a reusable, local-first, free-first Next.js 16 foundation for AI agents. It provides sensible defaults without mandatory paid cloud subscriptions.

## 2. Core Operational Protocol for AI Agents
1. Local-First / Free-First Default:
   - Database: SQLite via Prisma (local `dev.db`) in WAL mode.
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
| **OpenSpec** | Gestão de mudanças e especificação de requisitos. |
|pnchsadcn Mechanisms (shadcn MCP / Skills) | Inspecionar, procurar e adicionar componentes ui. |
| **next-devtools-mcp** | Inspecionar a aplicação em execução local para diagostico. |
