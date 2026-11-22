---
title: "Mapa da AI App Foundation"
type: report
status: proposed
project: PRJ-0024
created: "2026-11-22"
change: 20261122-foundation-architecture-uniformization
---

# Mapa da AI App Foundation: kits, blueprints, recipes e templates

**Estado analisado:** 2026-11-22, commit `c514252`, com as alterações locais então presentes. `pnpm foundation:check` passou nas 13 verificações.

## 1. Resumo

A Foundation é **um único repositório com dois kits técnicos**: o **React Kit** e o **HTML Kit**. Os dois partilham a mesma linguagem visual, mas não partilham código de componentes.

Por cima de cada kit existem quatro tipos de peça:

- **Componentes:** peças visuais reutilizáveis.
- **Blueprints:** estruturas de aplicação ou de página.
- **Recipes:** capacidades opcionais que se acrescentam.
- **Templates:** pontos de partida prontos a copiar.

O nome "React Kit" é usado aqui por clareza. Os documentos chamam-lhe Core, Foundation React ou `ai-react-foundation`.

## 2. Hierarquia

```text
N0  GOVERNANÇA
    DEC-0027 · PAT-0104 · PAT-0105 · DEC-0069
    FOUNDATION.md (12 invariantes) · foundation-check
                         │
N1  LINGUAGEM DE DESIGN
    Tokens: cores, estados, gráficos, raio, tema claro/escuro
    app/globals.css  ⇄  public/html-kit/tokens.css
                         │
          ┌──────────────┴──────────────┐
N2  REACT KIT                      HTML KIT
    Next 16, React 19, Tailwind 4   HTML, CSS e JS sem compilação
    Prisma/SQLite, Pino             du-runtime.js
          │                             │
N3  Componentes                    Componentes
    shadcn/ui + domínio             ui-* + du-*
          │                             │
N4  Blueprints                     Templates HTML
    (dashboard) · (site)            7 modelos + 2 exemplos
          │                             │
N5  Recipes React                  Recipes HTML
    ai, auth, postgres, vercel      pin, tabela, estado, SSE
          └──────────────┬──────────────┘
N6  VERTICAIS ESPELHADAS
    Mission Control · Avaliação · Futuro Digital
                         │
N7  APLICAÇÕES DERIVADAS
    Projetos que copiam e adaptam a Foundation
```

**Regra de leitura:** cada nível pode usar os níveis acima, nunca os abaixo. Em caso de conflito, prevalece o nível mais alto. Recipes são opcionais e não fazem parte do núcleo.

## 3. Governança e linguagem comum

| Peça | Função |
|---|---|
| **DEC-0027** | Define os 4 pilares: Core, Blueprints, Recipes e Agent Layer |
| **PAT-0104** | Define o HTML Kit como variante offline e as duas skills especializadas |
| **PAT-0105** | Define a adoção do HTML Kit em geradores e leitores estáticos |
| **DEC-0069** | Manda consultar a plataforma web moderna antes de criar padrões de UI |
| **FOUNDATION.md** | 12 invariantes da aplicação React |
| **`foundation-check`** | Verifica a saúde dos dois kits |
| **`ai-ui-foundation`** | Skill para trabalhar no React Kit |
| **`ai-html-foundation`** | Skill para trabalhar no HTML Kit |

**Tokens medidos:** os valores comuns são idênticos nos dois kits (29 no tema claro, 28 no escuro, zero diferenças). Só o React tem os 8 tokens de barra lateral. Só o HTML define as fontes em `:root`.

**Temas:** claro/escuro usa a classe `.dark` nos dois kits. O tema de marca **Futuro Digital** usa `data-theme="futuro-digital"`. O HTML Kit tem ainda um **modo de projeção** para sala de aula.

## 4. React Kit

**Para quê:** aplicações completas, com várias páginas, servidor e base de dados.

| Área | Escolha |
|---|---|
| Aplicação | Next.js 16 (App Router), React 19, TypeScript 5 |
| Estilo | Tailwind CSS 4, tokens OKLCH |
| Componentes | shadcn/ui sobre Radix, ícones Phosphor |
| Dados | Prisma 6, SQLite em modo WAL |
| Gráficos e logs | Recharts, Pino só no servidor |
| Qualidade | TypeScript, Vitest, Playwright |
| Ambiente | pnpm, porta 4300, sem Docker nem SaaS obrigatório |

**Componentes:**

| Grupo | Pasta | Dimensão |
|---|---|---|
| Primitivos shadcn | `components/ui` | 17 |
| Dashboard | `components/dashboard` | 35 componentes em 8 áreas |
| Web/marketing | `components/web` | 8 + índice |
| Avaliação | `components/avaliacao-dashboard` | 5 |
| Futuro Digital | `components/futuro-digital` | 5 |
| Shell e navegação | `components/*.tsx` | 9 |

O catálogo visual vive em `/dashboard/library`, alimentado por `lib/library/component-registry.ts`.

**Blueprints oficiais (DEC-0027):**

| Blueprint | Finalidade | Páginas |
|---|---|---|
| **`(dashboard)`** | Área operacional com barra lateral | 10: visão geral, actions, agents, charts, inspection, library, matrix, metrics, workflow, workshops |
| **`(site)`** | Páginas públicas com cabeçalho | 6: landing, Avaliação (3), Futuro Digital (2) |

O `lib/du/` e o `docs/DU_DASHBOARD_BLUEPRINT.md` acrescentam ao dashboard a ligação segura ao Development Universe.

**Recipes React:**

| Recipe | Acrescenta |
|---|---|
| `ai` | Integração com AI SDK |
| `auth` | Autenticação (Clerk ou Auth.js) |
| `postgres` | Migração de SQLite para PostgreSQL |
| `vercel` | Publicação e cache na Vercel |

## 5. HTML Kit

**Para quê:** ferramentas locais, leves e offline, que abrem sem Node nem compilação.

| Ficheiro | Função |
|---|---|
| `tokens.css` | Cores, tema, fontes e modo de projeção |
| `vendor/shadcn-html.all.css` | 9 componentes `ui-*`: accordion, badge, button, card, dialog, input, switch, table, tabs |
| `du-components.css` | Peças DU `du-*`: shell, KPI, gauge, sparkline, drawer, command bar, master-detail |
| `du-runtime.js` | Tema, navegação, filtros, modais, gavetas, copiar e atalhos |
| `index.html` | Catálogo visual com 20 modelos dos dois kits |

**Templates:**

| Template | Tipo | Usar quando |
|---|---|---|
| `template-app-shell.html` | Base limpa | Nova app com barra lateral |
| `du-html-app-template.html` | Referência | Ver as capacidades do kit |
| `starter-cockpit.html` | Base compacta | Cockpit de página única |
| `du-dashboard.html` | Vertical | Mission Control autónomo num só ficheiro |
| `du-avaliacao-dashboard.html` | Vertical | Avaliação com PIN e tabelas |
| `du-futuro-digital.html` | Vertical | Portal com a marca Futuro Digital |
| `du-futuro-digital-galeria.html` | Vertical | Catálogo Futuro Digital |

`examples/` guarda 2 mockups de referência (`du-clean-dashboard-mockup.html`, `du-cockpit-mockup.html`), que não são pontos de partida.

**Recipes HTML:**

| Recipe | Acrescenta |
|---|---|
| `auth-pin-lock` | Barreira local com PIN |
| `datatable-fetch` | Tabela com dados JSON, paginação e pesquisa |
| `localstorage-state` | Memória de separadores, filtros e opções |
| `sse-telemetry` | Telemetria em tempo real com reconexão |

## 6. Como se relacionam

**Equivalências entre kits:**

| Conceito | React Kit | HTML Kit |
|---|---|---|
| Tokens | `app/globals.css` | `tokens.css` |
| Botão | `<Button>` | `.ui-btn` |
| Cartão | `<Card>` | `.ui-card` |
| Diálogo | Radix Dialog | `<dialog class="ui-dialog">` |
| Tema | `next-themes` | `duToggleTheme()` |
| KPI | `KpiStatCard` | `.du-kpi-card` |
| Recipes | `recipes/` | `public/html-kit/recipes/` |

**Verticais presentes nos dois kits:**

| Vertical | React | HTML |
|---|---|---|
| **Mission Control** | `/dashboard` | `du-dashboard.html`, `starter-cockpit.html` |
| **Avaliação** | `/avaliacao-dashboard` | `du-avaliacao-dashboard.html` |
| **Futuro Digital** | `/futuro-digital` | `du-futuro-digital*.html` |

**O que passa de um kit para o outro:** nomes e valores de tokens, convenções visuais e padrões. **O que não passa:** componentes, runtime e recipes. Uma correção num kit tem de ser replicada manualmente no outro.

**Como escolher:**

1. Precisa de contas, base de dados ou muitas páginas com servidor? **React Kit**, blueprint `(dashboard)` ou `(site)`.
2. Tem de abrir offline, sem Node, ou em PCs institucionais restritos? **HTML Kit**.
3. Encaixa num domínio existente? Começar pela **vertical** respetiva.
4. Falta só uma capacidade? Acrescentar uma **recipe**.

## 7. Estado de adoção

- Fora da Foundation, a pesquisa em `~/Dev` só encontrou os nomes dos ficheiros do HTML Kit nas 3 cópias da skill `ai-html-foundation`.
- **O Sentinel ainda não usa o HTML Kit.**
- A pesquisa não deteta projetos que tenham copiado o CSS com outros nomes, nem mede a adoção do React Kit.
- O **Mission Cockpit Blueprint** é apenas uma proposta. Antes de o criar, deve ser comparado com `starter-cockpit.html` e `du-dashboard.html`, que já cobrem parte do mesmo espaço.

## 8. Incoerências encontradas

| # | Problema | Impacto |
|---|---|---|
| 1 | "Blueprint" tem 4 sentidos: layouts oficiais, um documento, templates HTML no catálogo e snippets da biblioteca | Confunde decisões e pedidos |
| 2 | `docs/html-foundation.md` não refere as recipes nem os 7 templates | O guia oficial está desatualizado |
| 3 | Documentos dizem que o runtime tem menos de 50 linhas, e tem 204 | Expectativa errada |
| 4 | A skill HTML promete o catálogo shadcn completo, e o kit traz 9 componentes | Agentes podem usar classes inexistentes |
| 5 | Os 7 templates usam estilos inline e 6 usam `onclick` | Não funcionam sob uma CSP rigorosa como a do Sentinel |
| 6 | `starter-cockpit.html` usa emojis, que o kit proíbe | Um template oficial viola a regra que ensina |
| 7 | `foundation-check` só compara 4 tokens de estado | Divergência nos restantes não seria detetada |
| 8 | `AGENTS.md` refere Lucide, mas a regra e o código usam só Phosphor (0 vs 43 ficheiros) | Instrução contraditória para agentes |
| 9 | A recipe React `auth` tem um README genérico, sem passos reais | Não é operável como prometido |
| 10 | O catálogo não lista os 2 templates HTML do Futuro Digital | Ficam difíceis de descobrir |
| 11 | `du-dashboard.html` tem links para portas 3000 e 3005, na zona reservada ao utilizador (CON-0020) | Links podem abrir a app errada |
| 12 | A mudança `foundation-symmetry` continua `proposed` com todas as tarefas concluídas | O estado do OpenSpec engana |
| 13 | O repositório tem 45 ficheiros apagados por gravar (44 em `.agents/`, mais `rulesync.jsonc`) | Rever antes de qualquer commit na Foundation |

**Limites da análise:** só li o README da recipe `auth`, por isso o ponto 9 não se estende às outras. Não abri nem testei visualmente cada template.
