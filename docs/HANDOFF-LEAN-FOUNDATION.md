# Handoff: Lean App Foundation (Core + Blueprints + Recipes + Agent Development Layer)

> **Data**: 2026-09-09  
> **Objetivo**: Documento orientador final para agentes de IA e engenheiros. Define a constituição, a arquitetura e os princípios de execução para transformar este repositório numa fundação "boring, predictable and extremely easy to understand and extend".

---

## 1. A Decisão Estratégica Fundamental

> **Deixar de tratar o `next-forge` como produto-base a preservar integralmente e passar a tratá-lo como fonte de padrões que serviu para chegar a uma foundation própria, lean e single-app.**

O objetivo é otimizar para **fricção mínima na criação das próximas 10 aplicações reais** no Development Universe (como `rulesync-explorer` e `futuro-digital-react`), evitando monorepos corporativos com 27 pacotes e serviços SaaS desnecessários.

---

## 2. A Arquitetura Final

```text
                         LEAN APP FOUNDATION
                                  │
       ┌──────────────────────────┼──────────────────────────┐
       │                          │                          │
      CORE                    BLUEPRINTS                   RECIPES
       │                          │                          │
  Next.js 16 (App Router)     Dashboard ((dashboard))    Auth
  React 19                    Site ((site))              Postgres
  TypeScript                                             AI
  Tailwind CSS v4                                        Vercel
  shadcn/ui
  next-themes
  Prisma (SQLite local)
  Pino (Server-only)
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

### O Core (Enxuto e Previsível)
- **Framework**: Next.js 16 (App Router, Turbopack, React 19, TypeScript).
- **Estilo & UI**: Tailwind CSS v4 + primitivas canónicas `shadcn/ui` + `next-themes` (Dark/Light).
- **Persistência Local**: Prisma ORM com SQLite zero-config (`file:./dev.db`).
- **Logging**: Pino (server-side apenas; com redação estrita de dados sensíveis; nunca importado em Client Components; **nunca logar passwords, tokens, cookies, auth headers ou API keys**).
- **Testes & Qualidade**: Vitest, Playwright, Biome.

### UX Blueprints (Padrões Composicionais no App Router)
- **`(dashboard)`**: Sidebar recolhível, cartões KPI, tabelas filtráveis, diálogos de criação e Server Actions (ideal para ferramentas como `rulesync-explorer`).
- **`(site)`**: Cabeçalho de navegação, hero, grelha de cartões informativos e rodapé acessível (ideal para projetos como `futuro-digital-react`).
- **Regra**: São composicionais (`Blueprint + Recipe = Application`). Podem coexistir ou ser usados isoladamente. **Sem scripts destrutivos de auto-mutilação**.

### Recipes (`recipes/` — Extensões Operáveis para Agentes e Humanos)
Cada receita é uma **unidade operacional**, executável por um agente e compreensível por um humano (`README.md`, `checklist.md`):
- `recipes/auth/`: Receita de autenticação simples e modular.
- `recipes/postgres/`: Receita documentada de persistência em produção (*"Deployments requiring durable/shared production persistence must use the documented production database recipe"*).
- `recipes/ai/`: Integração modular com Vercel AI SDK ou modelos locais/cloud.
- `recipes/vercel/`: Configurações de caching, headers e variáveis de ambiente na Vercel.

### Agent Development Layer (Dev Tooling Estritamente Separado do Runtime)
- **`shadcn Skills`** (`pnpm dlx skills add shadcn/ui`): Conhecimento e workflows de componentes para o agente.
- **`shadcn MCP`**: Ferramenta MCP para procurar, inspecionar e adicionar componentes/blocos do registry canónico.
- **`next-devtools-mcp`**: Ferramenta estritamente de desenvolvimento local (`npx -y next-devtools-mcp@latest`) para o agente inspecionar rotas, erros e estado real do dev server. **Zero pegada no bundle de produção**.
- **Next.js Bundled Docs & Skills**: Conhecimento do framework versionado no pacote `next`.
- **`AGENTS.md`**: Constituição concisa (<150 linhas) focada em regras do projeto, com uma matriz `Tool -> Purpose`.
- **Future Capability (Out of Scope v0.1)**: Eventual publicação de registry GitHub próprio (`registry.json`) é explicitamente para v0.2/v0.3.

---

## 3. Matriz de Decisão: "Que Ferramenta Usar para Quê"

| Ferramenta | Quando e Como Usar |
| :--- | :--- |
| **`AGENTS.md`** | Constituição e regras específicas deste projeto (*"How WE work"*). |
| **OpenSpec** | Gestão de mudanças, planeamento e especificação de requisitos formais. |
| **shadcn Skills** | Conhecimento de padrões, boas práticas e workflows de UI. |
| **shadcn MCP** | Procurar, inspecionar e instalar componentes e blocos concretos. |
| **next-devtools-mcp** | Inspecionar a aplicação em execução local para diagnosticar erros e estado. |
| **Playwright** | Testes de fumo e navegação real no browser. |
| **Next.js docs/skills**| Conhecimento técnico e APIs versionadas do framework (*"How NEXT works"*). |

---

## 4. A Constituição no `AGENTS.md` (Mandamentos para o Agente)

1. **Boring & Predictable**:
   > *"Your job is not to make this repository feature-rich. Your job is to make it boring, predictable and extremely easy for another AI agent to understand and extend."*
2. **Construtivo, Nunca Destrutivo**:
   > *"Never delete foundation files during project customization unless explicitly required by the selected blueprint. Prefer disabling, isolating, or generating the target project from a blueprint."*
   > *"Never assume that unused code should be removed merely because it is unused."*
3. **Simplicidade sobre Abstração**:
   > *"When choosing between a clever abstraction and a simple implementation, choose the simple implementation. When choosing between deleting complexity and isolating complexity, prefer isolation."*
4. **Foco Pragmático**:
   > *"Never optimize the foundation for hypothetical future requirements. Optimize it for the next ten real applications we expect to build."*
5. **Separação de Contextos & Segurança de Logs**:
   - `file:./dev.db` é para desenvolvimento local. Persistência partilhada/produção exige a receita `recipes/postgres`.
   - Pino é estritamente **server-side**. Nunca importar em Client Components. Nunca logar passwords, tokens, cookies, auth headers ou chaves.
6. **Invariantes do Projeto vs Framework**:
   - O `AGENTS.md` contém as **nossas regras**, não duplicados da documentação do Next.js.

---

## 5. Preservação do Código Anterior
Antes de iniciar a nova estrutura:
- O código monorepo atual (`next-forge` v2) é preservado na branch:
  `archive/next-forge-v2`

---

## 6. Validação Empírica para Agentes (Acceptance Criteria)

Após a limpeza e montagem da fundação, executamos os testes empíricos de validação:
- **Teste A (UI)**: Criação de um dashboard polido com KPIs, filtros e tabela responsiva.
- **Teste B (Dados)**: Operação CRUD funcional com Prisma + SQLite local.
- **Teste C (Refactor)**: Modificação do dashboard sem adicionar nenhuma nova biblioteca visual.
- **Teste D1 (UI Intelligence)**: O agente pesquisa e adiciona componentes canónicos via `shadcn MCP`.
- **Teste D2 (Runtime Awareness)**: O agente inspeciona o servidor em execução via `next-devtools-mcp`, diagnostica o estado real e valida o comportamento.

---

## 7. Estado do OpenSpec
- **Change**: `lean-app-foundation`
- **Diretório**: `C:\Users\helder.toucas\Dev\openspec\changes\lean-app-foundation\`
- **Estado**: Validado e aprovado (`Progress: 4/4 artifacts complete`).

Para executar: `/opsx-apply` ou dizer **"aplica o openspec"**.
