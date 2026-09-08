# Handoff: Lean App Foundation (Core + Blueprints + Recipes + Agent Layer)

> **Data**: 2026-09-09  
> **Revisão**: AI Council (Red Teamer, Software Architect, Product & Resilience Engineer)  
> **Objetivo**: Guia à prova de falhas para qualquer agente de IA (incluindo modelos menores/flash-lite) executar a transição determinística para a Lean Foundation sem alucinações, sem prompts interativos e sem bloqueios de sistema operativo.

---

## 1. A Decisão Estratégica Fundamental

> **Deixar de tratar o `next-forge` como produto-base a preservar integralmente e passar a tratá-lo como fonte de padrões que serviu para chegar a uma foundation própria, lean e single-app.**

O objetivo é otimizar para **fricção mínima na criação das próximas 10 aplicações reais** no Development Universe (como `rulesync-explorer` e `futuro-digital-react`), evitando monorepos corporativos com 27 pacotes e serviços SaaS desnecessários.

---

## 2. A Arquitetura Final Auditada pelo AI Council

```text
                         LEAN APP FOUNDATION
                                  │
       ┌──────────────────────────┼──────────────────────────┐
       │                          │                          │
      CORE                    BLUEPRINTS                   RECIPES
       │                          │                          │
  Next.js 16 (App Router)     Dashboard ((dashboard))    Auth (recipe.json + template)
  React 19                    Site ((site))              Postgres (recipe.json + template)
  TypeScript                                             AI (recipe.json + template)
  Tailwind CSS v4                                        Vercel (recipe.json + template)
  shadcn/ui (components.json)
  next-themes
  Prisma (SQLite WAL + Singleton)
  Pino (Server-only sentinel)
  Vitest + Playwright
  Biome
       │
       ▼
                    AGENT DEVELOPMENT LAYER
                              │
        ┌─────────────────────┼──────────────────────┐
        │                     │                      │
    AGENTS.md            shadcn Skills          OpenSpec
        │                     │
        │                shadcn MCP
        │
        └───────────── next-devtools-mcp
                              │
                              ▼
                         AI AGENT
                              │
                              ▼
                     Application changes
                              │
                   ┌──────────┴──────────┐
                   │                     │
                 LOCAL               PRODUCTION
                   │                     │
                SQLite            Postgres / Recipe
```

---

## 3. Diretrizes Críticas de Execução para Modelos de Menor Capacidade (Low-Cognitive Safe)

Se fores um modelo menor a executar este plano, deves seguir estas **regras invioláveis**:

1. **Nunca correr comandos interativos que fiquem à espera de resposta (`stdin`)**:
   - Para instalar componentes do shadcn, o ficheiro `components.json` já deve estar criado com antecedência.
   - Usa sempre a flag não-interativa: `pnpm dlx shadcn@latest add ... --yes --overwrite`.
2. **Resiliência do SQLite no Windows (Bloqueios `EBUSY`)**:
   - Nunca instancies `new PrismaClient()` solto em Server Actions. Usa o ficheiro `lib/db.ts` com o singleton `globalThis.prisma`.
   - O SQLite deve correr em modo WAL: `DATABASE_URL="file:./dev.db"`.
3. **Pino estritamente Server-Only**:
   - A primeira linha de `lib/logger.server.ts` tem de ser: `import 'server-only';`.
   - Nunca importes o logger em ficheiros com `'use client'`.
   - Declara `serverExternalPackages: ['pino']` em `next.config.ts`.
   - Nunca logues passwords, tokens, cookies, authorization headers ou chaves.
4. **Hierarquia de Rotas e Layouts (Evitar conflito de tags `<html>`)**:
   - Apenas `app/layout.tsx` define `<html>`, `<body>` e o `ThemeProvider`.
   - `app/(site)/layout.tsx` define apenas o cabeçalho público e o rodapé. O ficheiro `app/(site)/page.tsx` é o dono da raiz `/`.
   - `app/(dashboard)/layout.tsx` define a barra lateral de gestão. As páginas de dashboard ficam sob `app/(dashboard)/dashboard/page.tsx`.
5. **Cold-Start Num Único Comando**:
   - `pnpm setup`: copia `.env.example` -> `.env`, corre `prisma db push`, gera o cliente Prisma e valida a tipagem sem qualquer intervenção manual.

---

## 4. Matriz de Decisão: "Que Ferramenta Usar para Quê"

| Ferramenta | Quando e Como Usar |
| :--- | :--- |
| **`AGENTS.md`** | Constituição e regras específicas deste projeto (*"How WE work"*). |
| **OpenSpec** | Gestão de mudanças, planeamento e especificação de requisitos formais. |
| **shadcn Skills** | Conhecimento de padrões, boas práticas e workflows de UI. |
| **shadcn MCP** | Procurar, inspecionar e instalar componentes e blocos concretos. |
| **next-devtools-mcp** | Inspecionar a aplicação em execução local para diagnosticar erros e estado (dev-only). |
| **Playwright** | Testes de fumo e navegação real no browser. |
| **Next.js docs/skills**| Conhecimento técnico e APIs versionadas do framework (*"How NEXT works"*). |

---

## 5. Rastreio e Ordem de Tarefas no OpenSpec

As tarefas detalhadas em `C:\Users\helder.toucas\Dev\openspec\changes\lean-app-foundation\tasks.md` seguem 7 fases ordenadas:

- **Fase 1**: Arquivo seguro da branch `archive/next-forge-v2` e limpeza do monorepo antigo.
- **Fase 2**: Scaffolding do Next.js 16 + React 19 + Tailwind v4 + shadcn + Pino server-only.
- **Fase 3**: Persistência Prisma SQLite com singleton e WAL mode.
- **Fase 4**: Blueprints composicionais `(site)` e `(dashboard)`.
- **Fase 5**: Recipes operáveis com `recipe.json`, `checklist.md` e pasta `template/`.
- **Fase 6**: Agent Layer (`shadcn MCP`, `next-devtools-mcp`, `AGENTS.md` <150 linhas).
- **Fase 7**: Quality gates (`pnpm setup`, `typecheck`, `test`, `build`) e Testes Empíricos (A, B, C, D1, D2).

---

## 6. Como Iniciar a Execução
Para qualquer agente iniciar a execução ordenada:
👉 Executar o workflow `/opsx-apply` ou seguir o checklist em `tasks.md`.
