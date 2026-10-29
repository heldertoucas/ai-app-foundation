---
title: "Template Canónico App Avaliação Dashboard"
type: opsx-lite
status: proposed
project: PRJ-0024
created: "2026-10-13"
relevant_decisions: ["DEC-0021", "DEC-0022"]
relevant_constraints: ["CON-0016", "CON-0020"]
---

# 📋 Change: Template Canónico App Avaliação Dashboard

## 1. Proposal (Why & What)
- **Problem**: A aplicação de avaliação e monitorização (`app-avaliacao`) opera com padrões de UI legados (Material Symbols, estilos soltos, falta de modularidade e ausência de paridade estrita com o Zero-Build HTML Kit).
- **Solution**: Criar o template canónico `app-avaliacao-dashboard` em perfeita simetria entre o Next.js 16 (`ai-react-foundation` com shadcn/ui e Phosphor Icons) e o HTML Kit (`ai-html-foundation` zero-build com as receitas de `auth-pin-lock` e `datatable-fetch`).
- **Non-Goals**: Não refatorar a base de dados de produção do Neon/Prisma da `app-avaliacao` nesta fase nem alterar regras de negócio do motor de testes/quizzes.

## 2. Specification (Requirements)
- **REQ-1**: O template deve fornecer ecrã de autenticação com abas para Formador (código de ação + pin) e Administrador (password).
- **REQ-2**: O painel de administração deve conter o cockpit de saúde de sincronizações (Google Sheets, base de dados, quotas) e feeds de atividade recente.
- **REQ-3**: O painel do formador deve apresentar tabela interativa de monitorização de formandos e estatísticas da turma em tempo real.
- **REQ-4**: O template HTML5 zero-build (`public/html-kit/templates/du-avaliacao-dashboard.html`) deve reproduzir com fidelidade visual de 100% o cockpit e a tabela de formandos sem dependência de ferramentas de build.

## 3. Design & Architecture (How)
- **Affected Files**:
  - `app/(site)/avaliacao-dashboard/page.tsx` (Login e alternância de perfil)
  - `app/(site)/avaliacao-dashboard/admin/page.tsx` (Cockpit e KPIs globais)
  - `app/(site)/avaliacao-dashboard/trainer/page.tsx` (Monitorização de formandos)
  - `public/html-kit/templates/du-avaliacao-dashboard.html` (Template HTML offline-first)
- **Technical Strategy**:
  - Reutilização de tokens de status (`--status-live`, `--status-drift`, `--card`, `--primary`).
  - Utilização de `@phosphor-icons/react` em React e SVG inline correspondente no HTML Kit.

## 4. Tasks (Execution Checklist)
- [ ] Task 1: Criar rota Next.js de login `app/(site)/avaliacao-dashboard/page.tsx` com validação de pins.
- [ ] Task 2: Implementar o cockpit de administração `app/(site)/avaliacao-dashboard/admin/page.tsx` com cartões de telemetria e KPIs.
- [ ] Task 3: Implementar a tabela de monitorização do formador `app/(site)/avaliacao-dashboard/trainer/page.tsx`.
- [ ] Task 4: Criar o template zero-build `public/html-kit/templates/du-avaliacao-dashboard.html` com paridade visual total.
- [ ] Task 5: Validar conformidade executando `pnpm foundation:check` e `pnpm typecheck`.
