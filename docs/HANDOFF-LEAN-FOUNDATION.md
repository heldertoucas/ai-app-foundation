# Handoff: Lean App Foundation (Core + Blueprints + Recipes + Agent Layer)

> **Data**: 2026-09-09  
> **Objetivo**: Documento orientador para o agente de IA e equipa de desenvolvimento. Define a constituição, a arquitetura e os princípios de execução para transformar este repositório numa fundação "boring, predictable and extremely easy to understand and extend".

---

## 1. A Decisão Estratégica Fundamental

> **Deixar de tratar o `next-forge` como produto-base a preservar integralmente e passar a tratá-lo como fonte de padrões que serviu para chegar a uma foundation própria, lean e single-app.**

O objetivo é otimizar para **fricção mínima na criação das próximas 10 aplicações reais** no Development Universe (como `rulesync-explorer` e `futuro-digital-react`), evitando monorepos corporativos com 27 pacotes e serviços SaaS desnecessários.

---

## 2. A Arquitetura Final (10/10)

```text
                         AI-APP-FOUNDATION
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
        CORE                  BLUEPRINTS                RECIPES
         │                        │                        │
   Next.js 16 (App Router)    Dashboard ((dashboard))   Auth
   TypeScript                 Site ((site))             Postgres
   Tailwind CSS v4                                      AI
   shadcn/ui                                            Vercel
   Prisma (SQLite local)
   Pino (Server-only)
   Vitest + Playwright
   Biome
         │
         │
         ▼
                 AGENT LAYER
                     │
        ┌────────────┼────────────┐
        │            │            │
    AGENTS.md    shadcn MCP   next-devtools-mcp
        │            │            │
        └────────────┼────────────┘
                     │
                 OpenSpec
                     │
                     ▼
                AI CODING AGENT
```

### O Core (Enxuto e Previsível)
- **Framework**: Next.js 16 (App Router, Turbopack, React 19, TypeScript).
- **Estilo & UI**: Tailwind CSS v4 + primitivas canónicas `shadcn/ui` + `next-themes` (Dark/Light).
- **Persistência Local**: Prisma ORM com SQLite zero-config (`file:./dev.db`).
- **Logging**: Pino (server-side apenas, com redação de dados sensíveis; nunca importado em Client Components).
- **Testes & Qualidade**: Vitest, Playwright, Biome.

### UX Blueprints (Estruturas Construtivas dentro do App Router)
- **`(dashboard)`**: Layout com sidebar recolhível, cartões KPI, tabelas filtráveis, diálogos de criação e Server Actions (ideal para ferramentas como `rulesync-explorer`).
- **`(site)`**: Layout público com cabeçalho de navegação, secção hero, grelha de cartões informativos e rodapé acessível (ideal para projetos como `futuro-digital-react`).
- *Regra*: Podem coexistir na mesma app ou ser usados isoladamente. **Nunca se faz self-mutilation de ficheiros**.

### Recipes (`recipes/` — Extensões Opcionais e Documentadas)
- `recipes/auth/`: Receita de autenticação simples e modular (quando o projeto precisar de login).
- `recipes/postgres/`: Instruções claras de transição de SQLite local para PostgreSQL hosted (Neon, Supabase) ao preparar deploy na Vercel.
- `recipes/ai/`: Integração modular com Vercel AI SDK ou modelos locais/cloud.
- `recipes/vercel/`: Configurações de caching, headers e variáveis de ambiente na Vercel.

### Agent Layer (Superpoderes para Agentes sem Bloat em Produção)
- **`shadcn MCP`**: Ferramenta MCP para o agente descobrir, inspecionar e compor componentes e blocks de registries oficiais ou de repositórios GitHub (`registry.json` futuro).
- **`next-devtools-mcp`**: Observabilidade em tempo real do dev server (`npx -y next-devtools-mcp@latest`), permitindo ao agente ver o estado real da aplicação em execução, erros e rotas em vez de adivinhar.
- **Next.js Bundled Docs & Skills**: Respeito pelo ecossistema Next.js; delegamos documentação de versão ao framework.

---

## 3. A Constituição no `AGENTS.md` (Mandamentos para o Agente)

1. **Boring & Predictable**:
   > *"Your job is not to make this repository feature-rich. Your job is to make it boring, predictable and extremely easy for another AI agent to understand and extend."*
2. **Construtivo, Nunca Destrutivo**:
   > *"Never delete foundation files during project customization unless explicitly required by the selected blueprint. Prefer disabling, isolating, or generating the target project from a blueprint."*
   > *"Never assume that unused code should be removed merely because it is unused."*
3. **Simplicidade sobre Abstração**:
   > *"When choosing between a clever abstraction and a simple implementation, choose the simple implementation. When choosing between deleting complexity and isolating complexity, prefer isolation."*
4. **Foco Pragmático**:
   > *"Never optimize the foundation for hypothetical future requirements. Optimize it for the next ten real applications we expect to build."*
5. **Separação de Contextos & Segurança**:
   - `file:./dev.db` é para **desenvolvimento local**; em produção na Vercel, segue-se a receita `recipes/postgres`.
   - Pino é estritamente **server-side**; nunca importar em Client Components nem logar credenciais/headers.
6. **Enxuto por Design**:
   - Manter o `AGENTS.md` conciso (<150 linhas). Regras simples no arquivo; conhecimento versionado delegado às ferramentas do framework.

---

## 4. Preservação do Código Anterior
Antes de iniciar a nova estrutura:
- O código monorepo atual (`next-forge` v2) é preservado na branch:
  `archive/next-forge-v2`
- O histórico e as referências visuais mantêm-se 100% intactos e consultáveis.

---

## 5. Validação Empírica para Agentes (Acceptance Criteria)

Após a limpeza e montagem da fundação, executamos 4 testes empíricos:
- **Teste A (UI)**: Criação de um dashboard polido com KPIs, filtros e tabela responsiva.
- **Teste B (Dados)**: Operação CRUD funcional com Prisma + SQLite local.
- **Teste C (Refactor)**: Modificação do dashboard sem adicionar nenhuma nova biblioteca visual.
- **Teste D (Agent Runtime Awareness)**: Ligar o `next-devtools-mcp` + `shadcn MCP`, inspecionar o servidor em execução e validar ajustes de layout em tempo real.

---

## 6. Estado do OpenSpec
- **Change**: `lean-app-foundation`
- **Diretório**: `C:\Users\helder.toucas\Dev\openspec\changes\lean-app-foundation\`
- **Estado**: Validado e pronto para aplicação (`Progress: 4/4 artifacts complete`).

Para executar: `/opsx-apply` ou dizer **"aplica o openspec"**.
