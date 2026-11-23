---
title: "Foundation Symmetry: Token Parity, HTML Recipes and Health Verification"
type: opsx-lite
status: proposed
project: PRJ-0024
created: "2026-10-13"
relevant_decisions: ["DEC-0021"]
relevant_constraints: ["CON-0009", "CON-0012", "CON-0020"]
---

# 📋 Change: Foundation Symmetry (React & HTML Kits)

## 1. Proposal (Why & What)
- **Problem**: 
  - `ai-app-foundation` tem duas vertentes de UI: `ai-react-foundation` (Next.js 16/React 19) e `ai-html-foundation` (Zero-Build native HTML kit).
  - Atualmente, o script `scripts/foundation-check.js` apenas valida a integridade do ecossistema Next.js, ignorando os invariantes do HTML Kit.
  - Os tokens semânticos e status (`--status-live`, etc.) estão definidos em `app/globals.css` e `public/html-kit/tokens.css`, sem teste automatizado que garanta paridade e previna drift.
  - O ecossistema React possui receitas modulares em `recipes/`, mas o HTML kit carece de uma pasta de receitas estruturadas para padrões plug-and-play (SSE, offline state).
  - Existem mockups soltos na raiz (`du-clean-dashboard-mockup.html`, `du-cockpit-mockup.html`) que poluem a raiz do repositório.
- **Solution**:
  - Unificar a verificação em `scripts/foundation-check.js` cobrindo ambas as fundações (presença de assets do HTML Kit, validação de tokens essenciais).
  - Estruturar a pasta `public/html-kit/recipes/` com a primeira receita modular (`sse-telemetry`).
  - Mover mockups soltos da raiz para `public/html-kit/examples/`.
  - Atualizar documentação e checklists.
- **Non-Goals**:
  - Não introduzir bundlers ou npm dependencies no HTML Kit (invariante Zero-Build e offline total mantido).
  - Não alterar a arquitetura do Next.js App Router.

## 2. Specification (Requirements)
- **REQ-1 (Health Verification Parity)**: `pnpm foundation:check` deve validar obrigatoriamente:
  - Presença dos core assets do HTML Kit (`tokens.css`, `du-components.css`, `du-runtime.js`, `vendor/shadcn-html.all.css`).
  - Presença dos templates base (`du-html-app-template.html`, `template-app-shell.html`).
  - Paridade de tokens essenciais (`--status-live`, `--status-drift`, `--status-missing`, `--status-unsupported`) entre `app/globals.css` e `public/html-kit/tokens.css`.
- **REQ-2 (Modular HTML Recipes)**: Criar `public/html-kit/recipes/sse-telemetry/` contendo:
  - `recipe.json` com metadados da receita.
  - `checklist.md` com passos de integração.
  - `sse-client.js` com o helper leve zero-dependency para alimentar gauges radiais e pills com reconexão automática.
- **REQ-3 (Root Hygiene)**: Mover ficheiros de mockup soltos da raiz (`du-clean-dashboard-mockup.html`, `du-cockpit-mockup.html`) para `public/html-kit/examples/`.

## 3. Design & Architecture (How)
- **Affected Files**:
  - `scripts/foundation-check.js` (adicionar suite de validação de paridade de fundação)
  - `public/html-kit/examples/` (nova pasta para mockups)
  - `public/html-kit/recipes/sse-telemetry/` (nova receita modular)
  - `README.md` (documentar a estrutura de ambas as fundações)
- **Technical Strategy**:
  - Usar parser regex simples no `foundation-check.js` para comparar valores de `--status-*` entre ficheiros CSS sem adicionar novas dependências ao projeto.

## 4. Tasks (Execution Checklist)
- [x] Task 1: Organizar mockups soltos para `public/html-kit/examples/`
- [x] Task 2: Criar estrutura de receitas HTML em `public/html-kit/recipes/sse-telemetry/`
- [x] Task 3: Expandir `scripts/foundation-check.js` com validações de paridade e HTML Kit
- [x] Task 4: Executar testes de qualidade (`pnpm foundation:check`, `pnpm typecheck`, `pnpm test`)
- [x] Task 5: Registar síntese do AI Council e marcar tarefas concluídas

---

## 🏛️ AI Council Review & Hardening Synthesis (Mode 1 / Rapid Reflection)
- **[Software Architect]**: A adição do validador de paridade em `scripts/foundation-check.js` elimina o risco de drift sem acoplar os build steps. O HTML Kit permanece 100% zero-build.
- **[Product & Resilience]**: A estrutura `public/html-kit/recipes/` replica fielmente a DX modular do Next.js, fornecendo `recipe.json`, `checklist.md` e cliente resiliente com reconexão automática e exponential backoff.
- **[Verdict]**: Aprovado e validado em runtime por `pnpm foundation:check` e `pnpm typecheck`.

