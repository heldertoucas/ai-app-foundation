---
title: "Stress test dos pressupostos da migração"
type: report
status: proposed
project: PRJ-0024
created: "2026-11-22"
change: 20261122-foundation-architecture-uniformization
---

# Stress test dos pressupostos

**Base:** commit `1bf5838` em worktree limpa, mais leitura do estado local de `main`.

## 1. Pressupostos

| # | Pressuposto | Resultado | Evidência | Efeito no plano |
|---|---|---|---|---|
| 1 | Um Kit pode precisar de vários Blueprints | **Falso** | A galeria só tem um Kit, logo é uma página do Website | Um Kit segue um Blueprint |
| 2 | A Avaliação é um Dashboard | **Falso** | Não tem barra lateral em HTML nem em React | Passa ao Blueprint Cockpit |
| 3 | `du-cockpit-mockup.html` é do Cockpit | **Falso** | Tem barra lateral e título Mission Control | Passa ao Blueprint Dashboard |
| 4 | Cada Blueprint tem pelo menos dois Kits | **Confirmado** | Dashboard, Cockpit e Website têm 2 cada | Regra aplicável |
| 5 | Recipes HTML são Modules | **Confirmado** | As 4 têm JS; as 4 React têm 0 ficheiros de código | Separação aplicada |
| 6 | Os Modules HTML já são reutilizados | **Falso** | Só o catálogo os refere; Avaliação tem lógica própria | Tarefa 6.8 |
| 7 | Todos os templates usam o core | **Falso** | `du-dashboard.html` não carrega core | Decisão D4 |
| 8 | Os templates só usam classes existentes | **Falso** | 28 classes sem definição em 3 ficheiros, incluindo `ui-button` | Fase M2 antes de mover |
| 9 | Mockups funcionam offline | **Falso** | Os 2 usam Tailwind por CDN | Capturas PNG |
| 10 | Mover ficheiros não afeta segurança | **Falso** | `open-terminal` tem caminhos em allowlist | Atualização atómica |
| 11 | Produtos externos ligam-se aos caminhos HTML | **Não encontrado** | Pesquisa em 4 repositórios sem `src`/`href` para o kit | Risco externo baixo |
| 12 | `foundation:check` é reprodutível | **Falso** | Falha em checkout limpo: `.env` e `.mcp.json` | Tarefa 2.7 |
| 13 | Um manifesto pode alimentar o catálogo por `fetch` | **Rejeitado por desenho** | O catálogo também deve abrir em `file://` | Verificação em vez de leitura |
| 14 | Redirects Next bastam | **Rejeitado por desenho** | Não se aplicam em `file://` | Páginas de redirecionamento |
| 15 | O symlink do catálogo é seguro | **Risco** | `public/templates-index.html` é symlink e o projeto corre em Windows | Substituído em M3 |
| 16 | Componentes de domínio podem mover-se | **Confirmado** | Sem imports cruzados entre kits, `dashboard` e `web` | Fase M4 |

## 2. Achado de segurança

**`app/api/open-terminal/route.ts`** responde com `Access-Control-Allow-Origin: *` e executa `osascript`.

- **Limite atual:** só aceita comandos de uma allowlist e só corre em macOS.
- **Risco:** qualquer site aberto no browser pode pedir a execução desses comandos enquanto o servidor local está ativo.
- **Tratamento:** tarefa 1.4, antes da migração.
- **Estado:** identificado por leitura do código. Não foi explorado nem testado.

## 3. Baseline

| Verificação | Resultado |
|---|---|
| `foundation-check` em `main` | Passa |
| `foundation-check` em checkout limpo | **Falha** em 2 verificações |
| `tsc --noEmit` | Passa |
| Vitest | 37 testes, 11 ficheiros, todos passam |
| `next build` | **Não verificado.** A worktree usa `node_modules` por symlink e o Turbopack recusa-o |

## 4. Limites

- A contagem de emojis inclui símbolos Unicode e pode sobrestimar.
- A classificação estrutural usa pesquisa de texto. M0 confirma-a com capturas.
- Não foram abertos visualmente os Kits, por isso o efeito real das classes em falta está por medir.
- A pesquisa externa não deteta cópias com outros nomes.
- O comportamento de `file://` e dos redirecionamentos só será testado em M3.
