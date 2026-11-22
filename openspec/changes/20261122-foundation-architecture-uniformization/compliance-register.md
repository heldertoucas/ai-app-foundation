---
title: "Registo de conformidade da AI App Foundation"
type: report
status: proposed
project: PRJ-0024
created: "2026-11-22"
change: 20261122-foundation-architecture-uniformization
base_commit: c514252
---

# Registo de conformidade

**Base:** commit `c514252` mais as alterações locais de `main`, incluindo o catálogo por gravar.
**Referência:** regras de [`canon.md`](./canon.md) e invariantes de `FOUNDATION.md`.

## 1. Resultado

| Grupo | Peças | A | B | C | D | Referência |
|---|---:|---:|---:|---:|---:|---:|
| **Páginas HTML** | 10 | 0 | 0 | 5 | 3 | 2 mockups |
| **Rotas React** | 16 | 0 | 1 | 14 | 1 | 0 |
| **Componentes React** | 77 | 35 | 25 | 11 | 6 | 0 |
| **Modules HTML** | 4 | 0 | 0 | 4 | 0 | 0 |
| **Recipes React** | 4 | 0 | 0 | 0 | 4 | 0 |

**Leitura:** as peças pequenas estão razoáveis. A maior falha está nas páginas, onde as peças se juntam.

| Nota | Significado | Ação |
|---|---|---|
| **A** | Cumpre todas as regras medidas | Manter |
| **B** | Só tem avisos | Ajustar |
| **C** | Tem falhas limitadas | Reparar |
| **D** | Tem falhas em muitas regras | Reparar profundamente ou reconstruir |
| **REF** | Mockup, fora do contrato de Kit | Usar só como referência |

## 2. Método

- **Análise estática:** todos os ficheiros rastreados de `app`, `components`, `lib`, `recipes` e `public/html-kit`.
- **Renderização:** 26 páginas em 1440px e 390px, em claro e escuro, com rede externa bloqueada.
- **Revisão visual:** capturas lado a lado das implementações HTML e React.
- **Limiares:** cores até 10 em HTML e até 5 em React são aviso. Contraste até 10 falhas é aviso.
- **Notas de páginas:** 0 falhas com avisos = B; 1 a 4 falhas = C; 5 ou mais = D.
- **Notas de componentes:** 1 falha = C; 2 ou mais = D.

## 3. Stacks

| Área | HTML Stack | React Stack |
|---|---|---|
| **Tokens partilhados** | **A:** 29 claros e 28 escuros, zero diferenças | **A:** idem |
| **Core** | **B:** runtime sem `innerHTML`; 125 classes | **A:** tipos e 37 testes passam |
| **Offline** | **C:** Futuro Digital depende de rede | **B:** fonte vem de `next/font/google` |
| **Segurança** | **D:** todos os Kits violam CSP | **D:** `open-terminal` aceita qualquer origem |
| **Acessibilidade** | **C:** contraste e nomes em falta | **C:** `main` duplicado no Dashboard, contraste |
| **Responsividade** | **D:** a shell não colapsa em telemóvel | **C:** 5 rotas com scroll horizontal |
| **Tema** | **C:** chave `du-theme-preference` | **C:** chave por omissão diferente |
| **Tipografia** | **C:** Geist declarada, sem ficheiro de fonte | **C:** usa Inter, as regras dizem Geist |
| **Primitives** | **C:** 9, faltam 5 usados em React | **B:** 17, faltam Dialog, Switch e Tabs |
| **Global** | **C** | **C** |

### Invariantes da Foundation

| # | Invariante | Estado | Evidência | Correção |
|---|---|---|---|---|
| 1 | Aplicação única | **Parcial** | `docs/package.json` e CI com filtros de monorepo | Limpar restos do upstream |
| 2 | SQLite WAL | **Cumpre** | `foundation-check` passa | Manter |
| 3 | Sem Docker nem SaaS obrigatório | **Cumpre** | Sem ficheiros nem dependências proibidas | Manter |
| 4 | Um único sistema de UI | **Cumpre** | Só Radix e shadcn | Manter |
| 5 | Pino só no servidor | **Cumpre** | `server-only` e redação ativos | Manter |
| 6 | CLI não interativa | **Não verificado** | Scripts não exercitados | Testar em M1 |
| 7 | Só um `<html>` e `<body>` | **Cumpre** | Apenas `app/layout.tsx` | Manter |
| 8 | Prisma singleton | **Cumpre** | `globalThis` em `lib/db.ts` | Manter |
| 9 | Gates determinísticos | **Falha** | `ci.yml` filtra pacotes inexistentes; 2 lockfiles | Reescrever CI |
| 10 | Recipes para produção | **Falha** | As 4 Recipes são boilerplate | Tornar operáveis |
| 11 | Performance e ícone único | **Parcial** | Phosphor cumpre; `content-visibility` não está em `globals.css` | Aplicar ou retirar a regra |
| 12 | Porta determinística | **Parcial** | App em 4300; Kits mostram portas não atribuídas | Corrigir Kits |

## 4. Kits

| Kit | Blueprint | HTML | React | Paridade real | Requer |
|---|---|---|---|---|---|
| `dashboard-starter` | Dashboard | **C** | não existe | single-stack | Shell móvel, classes, ícones, inline |
| `mission-control` | Dashboard | **D** | **C** (rota mais fraca: **D**) | **divergent** | Decidir D9, reconstruir shell HTML |
| `cockpit-starter` | Cockpit | **C** | não existe | single-stack | Overflow, ícones, inline, portas visíveis |
| `avaliacao` | Cockpit | **C** | **B/C** | **partial, a mais próxima** | Botões HTML, emoji, inline, módulos |
| `website-starter` | Website | não existe | **C** | single-stack | Tokens, contraste |
| `futuro-digital` | Website | **D** | **C** | partial | Imagens e fontes locais, tema, tokens, header duplo |

**Achados de experiência:**

- **Mission Control:** HTML mostra "System Overview". React mostra "Project Atlas". Partilham o Blueprint, mas não o conteúdo.
- **Avaliação:** quase igual nas duas Stacks. Os botões HTML perdem o estilo por usarem `ui-button`.
- **Avaliação React:** só o ecrã de acesso foi auditado. As vistas protegidas exigem interação.
- **Futuro Digital:** a versão HTML perde logótipo e imagem sem rede.
- **Layout `(site)`:** o cabeçalho "Lean App Foundation" aparece por cima dos Kits Avaliação e Futuro Digital em React.
- **Futuro Digital escuro:** há texto com contraste 1.01, praticamente invisível.

## 5. Páginas HTML

| Página | Nota | Falhas | Requer |
|---|---|---:|---|
| `index.html` | **C** | 2 | Tokens, CSP |
| `du-avaliacao-dashboard.html` | **C** | 4 | Tokens, CSP, classes, ícones |
| `du-dashboard.html` | **D** | 7 | Core, tokens, CSP, classes, portas, contraste, responsivo |
| `du-futuro-digital-galeria.html` | **D** | 6 | Offline, tokens, CSP, ícones, contraste, responsivo |
| `du-futuro-digital.html` | **D** | 5 | Offline, tokens, CSP, contraste, responsivo |
| `du-html-app-template.html` | **C** | 4 | CSP, classes, ícones, responsivo |
| `starter-cockpit.html` | **C** | 3 | CSP, ícones, responsivo |
| `template-app-shell.html` | **C** | 4 | CSP, classes, ícones, responsivo |
| `du-clean-dashboard-mockup.html` | **REF** | n/a | Captura offline |
| `du-cockpit-mockup.html` | **REF** | n/a | Captura offline, reclassificar em Dashboard |

## 6. Modules e Recipes

| Peça | Nota | Evidência | Requer |
|---|---|---|---|
| `auth-pin-lock` | **C** | 90 linhas, sem consumidores, usa `innerHTML` | Remover `innerHTML`, adotar na Avaliação |
| `datatable-fetch` | **C** | 97 linhas, sem consumidores, 4 usos de `innerHTML` | Rever escape de dados, adotar |
| `localstorage-state` | **C** | 81 linhas, sem consumidores | Adotar num Kit |
| `sse-telemetry` | **C** | 91 linhas, sem consumidores | Adotar num Kit |
| Recipe `ai` | **D** | README e checklist genéricos | Escrever passos e verificação |
| Recipe `auth` | **D** | Sem dependências nem passos | Escolher abordagem e escrever |
| Recipe `postgres` | **D** | Dependências declaradas, passos genéricos | Escrever migração e rollback |
| Recipe `vercel` | **D** | Sem configuração nem passos | Escrever deploy e verificação |

## 7. Documentação e governação

| Peça | Nota | Problema | Requer |
|---|---|---|---|
| **DEC-0027** | **B** | Define Blueprint como layouts React | Emenda |
| **PAT-0104 / PAT-0105** | **B** | Usam "Kit" para a Stack e "<50 LOC" | Emenda; runtime tem 205 linhas |
| **`ai-html-foundation`** | **C** | Promete catálogo completo e caminhos antigos | Atualizar na fonte RuleSync |
| **`ai-ui-foundation`** | **C** | Diz Geist, a app usa Inter | Atualizar após D6 |
| **`AGENTS.md`** | **C** | Refere Lucide | Corrigir |
| **`docs/html-foundation.md`** | **D** | Estrutura e números desatualizados | Reescrever |
| **`.github/workflows/ci.yml`** | **D** | Usa `@repo/database` e `--filter app` | Reescrever |
| **`.github/workflows/release.yml`** | **D** | Usa Bun e tsup do upstream | Remover ou reescrever |
| **Lockfiles** | **C** | `pnpm-lock.yaml` e `bun.lock` coexistem | Manter só pnpm |

## 8. Prioridades

| Ordem | Problema | Impacto | Fase |
|---:|---|---|---|
| 1 | `open-terminal` aceita qualquer origem | Segurança | M0 |
| 2 | CI inválida | Nenhum gate fiável | M0 |
| 3 | Pares de contraste dos estados | Corrige muitas páginas de uma vez | M1 |
| 4 | `main` duplicado no layout Dashboard | 10 rotas | M2 |
| 5 | Shell HTML sem versão móvel | 3 páginas e todos os futuros Kits Dashboard | M2 |
| 6 | Erros de hidratação | 4 rotas | M2 |
| 7 | Overflow móvel | 5 rotas React e 3 páginas HTML | M2 |
| 8 | Classes inexistentes, emojis, portas | Kits HTML | M2 |
| 9 | CSP nos Kits HTML | Segurança e contrato | M2 |
| 10 | Recursos remotos do Futuro Digital | Offline | M2 |
| 11 | Divergência de Mission Control | Promessa central | D9 |
| 12 | Recipes não operáveis | Invariante 10 | M7 |

## 9. Limites

- A auditoria usa heurísticas próprias, sem axe-core. Não substitui revisão WCAG manual.
- O contraste ignora texto sobre gradientes e imagens.
- Foco, teclado, leitores de ecrã e estados pós-login não foram testados.
- O tema foi alternado pela classe `.dark`, sem usar os botões da interface.
- Os erros de hidratação têm causa provável em `toLocaleString()`, ainda não confirmada.
- A nota mede regras, não qualidade de produto nem esforço de correção.

## Anexo A. Rotas React

**Legenda:** negrito = falha; texto normal = aviso.

| Rota | Nota | Requer |
|---|---|---|
| `/` | **C** | **tokens**, tipografia, contraste |
| `/dashboard` | **C** | tokens, **tipografia**, **main duplicado**, **contraste**, **nomes** |
| `/dashboard/actions` | **C** | **main duplicado**, **contraste**, nomes |
| `/dashboard/agents` | **C** | **main duplicado**, **contraste**, **responsivo** |
| `/dashboard/charts` | **C** | **main duplicado**, **contraste**, **hidratação** |
| `/dashboard/inspection` | **C** | **main duplicado**, **contraste**, **nomes**, **responsivo** |
| `/dashboard/library` | **D** | **main duplicado**, **contraste**, **nomes**, **responsivo**, **hidratação** |
| `/dashboard/matrix` | **C** | **main duplicado**, contraste, nomes, **responsivo** |
| `/dashboard/metrics` | **C** | **main duplicado**, **contraste**, **hidratação** |
| `/dashboard/workflow` | **C** | **main duplicado**, **contraste**, **responsivo**, **hidratação** |
| `/dashboard/workshops` | **C** | tokens, **main duplicado**, contraste, nomes |
| `/avaliacao-dashboard` | **B** | tipografia, nomes |
| `/avaliacao-dashboard/admin` | **C** | tokens, **tipografia**, nomes |
| `/avaliacao-dashboard/trainer` | **C** | **tokens**, nomes |
| `/futuro-digital` | **C** | **tokens**, **tipografia**, **contraste** |
| `/futuro-digital/galeria` | **C** | **tokens**, **tipografia**, **main duplicado**, **contraste** |

## Anexo B. Componentes React

### Primitives (17)

| Ficheiro | Nota | Requer |
|---|---|---|
| `ui/sidebar.tsx` | **C** | **inline** |
| `ui/chart.tsx` | **B** | tokens, inline, HTML perigoso |
| `ui/progress.tsx` | **B** | inline |
| `ui/sheet.tsx` | **B** | tokens |
| `ui/accordion.tsx` | **A** | — |
| `ui/avatar.tsx` | **A** | — |
| `ui/badge.tsx` | **A** | — |
| `ui/breadcrumb.tsx` | **A** | — |
| `ui/button.tsx` | **A** | — |
| `ui/card.tsx` | **A** | — |
| `ui/collapsible.tsx` | **A** | — |
| `ui/dropdown-menu.tsx` | **A** | — |
| `ui/input.tsx` | **A** | — |
| `ui/separator.tsx` | **A** | — |
| `ui/skeleton.tsx` | **A** | — |
| `ui/table.tsx` | **A** | — |
| `ui/tooltip.tsx` | **A** | — |

### Components Web (8)

| Ficheiro | Nota | Requer |
|---|---|---|
| `web/callout.tsx` | **B** | tokens |
| `web/testimonial-card.tsx` | **B** | tokens |
| `web/cta-banner.tsx` | **A** | — |
| `web/feature-grid.tsx` | **A** | — |
| `web/hero.tsx` | **A** | — |
| `web/process-steps.tsx` | **A** | — |
| `web/showcase-card.tsx` | **A** | — |
| `web/split-section.tsx` | **A** | — |

### Shell (9)

| Ficheiro | Nota | Requer |
|---|---|---|
| `nav-main.tsx` | **B** | tipografia |
| `sidebar-footer-renderer.tsx` | **B** | tokens, tipografia |
| `theme-toggle.tsx` | **B** | controlos crus |
| `app-sidebar.tsx` | **A** | — |
| `dashboard-breadcrumb.tsx` | **A** | — |
| `nav-projects.tsx` | **A** | — |
| `nav-secondary.tsx` | **A** | — |
| `nav-user.tsx` | **A** | — |
| `theme-provider.tsx` | **A** | — |

### Components Dashboard (29)

| Ficheiro | Nota | Requer |
|---|---|---|
| `dashboard/actions/remediation-terminal-card.tsx` | **D** | **tokens**, **tipografia**, controlos crus |
| `dashboard/agents/agent-runtime-card-grid.tsx` | **D** | **tokens**, **tipografia** |
| `dashboard/inspection/code-diff-viewer.tsx` | **D** | **tokens**, **tipografia**, controlos crus |
| `dashboard/matrix/capability-matrix-heatmap.tsx` | **D** | **tokens**, **tipografia**, **controlos crus**, inline |
| `dashboard/workflow/openspec-kanban-board.tsx` | **D** | **tokens**, **tipografia**, controlos crus |
| `dashboard/actions/global-command-palette.tsx` | **C** | tipografia, **controlos crus** |
| `dashboard/matrix/matrix-client-view.tsx` | **C** | **tokens**, tipografia |
| `dashboard/metrics/health-gauge.tsx` | **C** | **tokens**, tipografia, inline |
| `dashboard/metrics/kpi-stat-card.tsx` | **C** | **tokens**, tipografia |
| `dashboard/metrics/status-filter-chips.tsx` | **C** | **tokens**, tipografia, controlos crus |
| `dashboard/agents/agents-client-view.tsx` | **B** | tipografia, controlos crus |
| `dashboard/agents/multi-agent-chat-stream.tsx` | **B** | tipografia, controlos crus |
| `dashboard/charts/charts-client-view.tsx` | **B** | tokens |
| `dashboard/charts/evaluation-radar-chart.tsx` | **B** | tokens |
| `dashboard/charts/target-distribution-bar-chart.tsx` | **B** | tokens |
| `dashboard/charts/timeline-activity-area-chart.tsx` | **B** | tokens |
| `dashboard/inspection/file-tree-navigator.tsx` | **B** | controlos crus, inline |
| `dashboard/inspection/inspection-client-view.tsx` | **B** | tipografia |
| `dashboard/inspection/markdown-reader.tsx` | **B** | tipografia |
| `dashboard/inspection/masked-secret-viewer.tsx` | **B** | tokens, tipografia |
| `dashboard/matrix/matrix-view-mode-toggle.tsx` | **B** | controlos crus |
| `dashboard/metrics/metrics-client-view.tsx` | **B** | tokens |
| `dashboard/workflow/activity-timeline-feed.tsx` | **B** | tipografia |
| `dashboard/workflow/phase-stepper.tsx` | **B** | tipografia |
| `dashboard/actions/actions-client-view.tsx` | **A** | — |
| `dashboard/actions/quick-filter-toolbar.tsx` | **A** | — |
| `dashboard/agents/human-review-banner.tsx` | **A** | — |
| `dashboard/matrix/data-table.tsx` | **A** | — |
| `dashboard/workflow/workflow-client-view.tsx` | **A** | — |

### Catálogo (4)

| Ficheiro | Nota | Requer |
|---|---|---|
| `dashboard/library/component-preview-card.tsx` | **D** | **tokens**, **tipografia**, **controlos crus**, inline |
| `dashboard/library/library-client-view.tsx` | **C** | tipografia, **controlos crus**, inline |
| `dashboard/library/library-toolbar.tsx` | **C** | tipografia, **controlos crus** |
| `dashboard/library/preview-renderer.tsx` | **B** | tokens, tipografia |

### Kit Avaliação (5)

| Ficheiro | Nota | Requer |
|---|---|---|
| `avaliacao-dashboard/telemetry-sync-card.tsx` | **C** | **tokens**, tipografia |
| `avaliacao-dashboard/trainee-monitor-table.tsx` | **C** | **tokens**, controlos crus |
| `avaliacao-dashboard/auth-pin-pad.tsx` | **B** | tokens, tipografia, controlos crus |
| `avaliacao-dashboard/auth-guard.tsx` | **A** | — |
| `avaliacao-dashboard/session-header.tsx` | **A** | — |

### Kit Futuro Digital (5)

| Ficheiro | Nota | Requer |
|---|---|---|
| `futuro-digital/atividade-card.tsx` | **C** | **tokens**, inline |
| `futuro-digital/protip.tsx` | **B** | inline |
| `futuro-digital/course-intro.tsx` | **A** | — |
| `futuro-digital/feature-slide.tsx` | **A** | — |
| `futuro-digital/step-by-step.tsx` | **A** | — |

