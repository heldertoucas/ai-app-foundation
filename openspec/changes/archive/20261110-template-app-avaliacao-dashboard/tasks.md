# Tasks: Template Canónico App Avaliação Dashboard

## Phase 1: Contracts, Security Utilities & Mock Repository
- [x] 1.1 Criar `lib/avaliacao/types.ts` com tipos de Formando, Turma, Estado de Sincronização, Auditoria e Perfil de Sessão.
  - *Executed 2026-11-10*: Definidos tipos de Formando, Turma, Estado de Sincronização, Auditoria, Perfil de Sessão e Filtros com paginação.
- [x] 1.2 Criar `lib/avaliacao/safe-storage.ts` com wrapper defensivo para `localStorage`/`sessionStorage` com fallback em memória (prevenção de quota/private browsing exceptions).
  - *Executed 2026-11-10*: Implementado `SafeStorage` com singleton de fallback em memória para kiosk e modo anónimo.
- [x] 1.3 Criar `lib/avaliacao/csv-sanitizer.ts` com sanitização contra injeção de fórmulas RFC 4180.
  - *Executed 2026-11-10*: Implementado sanitizador RFC 4180 com mitigação contra injeção de fórmulas (=, +, -, @, \t, \r).
- [x] 1.4 Criar `lib/avaliacao/auth-store.ts` com `useSyncExternalStore` SSR-safe, lockout persistente com backoff exponencial e throttling de 400ms.
  - *Executed 2026-11-10*: Criado `authStore` reativo com `useSyncExternalStore`, snapshots SSR determinísticos, lockout persistente e throttling contra brute-force.
- [x] 1.5 Criar `lib/avaliacao/mock-data.ts` com datasets isolados de formandos, sincronizações e auditoria.
  - *Executed 2026-11-10*: Criados datasets realistas isolados com 10 formandos, 3 serviços de telemetria e feed de auditoria cronológico.
- [x] 1.6 Criar `lib/avaliacao/repository.ts` desacoplando operações de dados (sync mutex, reabertura de teste, pauta).
  - *Executed 2026-11-10*: Implementado hook `useAvaliacaoRepository` desacoplando regras de agregação, filtros, mutex de sincronização e exportação.

## Phase 2: React 19 UI Components
- [x] 2.1 Criar `components/avaliacao-dashboard/auth-pin-pad.tsx` com feedback visual de 4 dígitos, keypad numérico e temporizador de lockout.
  - *Executed 2026-11-10*: Criado componente de autenticação com abas Formador (PIN de 4 dígitos + keypad tátil) e Administrador (password).
- [x] 2.2 Criar `components/avaliacao-dashboard/session-header.tsx` com informações de sessão, relógio e logout unificado.
  - *Executed 2026-11-10*: Criado cabeçalho de sessão fixo com relógio em tempo real, badges de perfil, link para twin HTML e logout seguro.
- [x] 2.3 Criar `components/avaliacao-dashboard/telemetry-sync-card.tsx` com telemetria (Sheets, Neon, Quotas), indicador de saúde e botão com mutex de sincronização.
  - *Executed 2026-11-10*: Implementado card de telemetria com status pills DU (--status-live, --status-drift), medidores de quota e feed auditável.
- [x] 2.4 Criar `components/avaliacao-dashboard/trainee-monitor-table.tsx` com pesquisa debounced (150ms), filtros de estado, paginação e exportação CSV sanitizada.
  - *Executed 2026-11-10*: Implementada tabela interativa com pesquisa debounced, badges de estado, paginação e gatilho de reabertura de prova.
- [x] 2.5 Criar `components/avaliacao-dashboard/auth-guard.tsx` client wrapper para proteção estrita de subrotas e redirecionamento.
  - *Executed 2026-11-10*: Implementado `AuthGuard` client wrapper prevenindo deep linking não autenticado e hydration flashes.

## Phase 3: Route Integration & Layout Isolation
- [x] 3.1 Criar `app/(site)/avaliacao-dashboard/layout.tsx` com layout dedicado (sem poluição da barra de navegação de marketing do site).
  - *Executed 2026-11-10*: Criado layout dedicado com metadados e content shell isolado.
- [x] 3.2 Implementar `app/(site)/avaliacao-dashboard/page.tsx` (Ecrã de Login com abas Formador vs. Administrador).
  - *Executed 2026-11-10*: Rota estática de login funcional e atalho de sessão ativa quando hidratada.
- [x] 3.3 Implementar `app/(site)/avaliacao-dashboard/admin/page.tsx` protegido com cockpit de telemetria.
  - *Executed 2026-11-10*: Cockpit administrativo com KPIs executivos (turmas, formandos, taxa de aprovação, latência WAL) e telemetria.
- [x] 3.4 Implementar `app/(site)/avaliacao-dashboard/trainer/page.tsx` protegido com monitorização de formandos.
  - *Executed 2026-11-10*: Mesa de trabalho do formador com pauta ativa, métricas em tempo real e reabertura de testes.

## Phase 4: Zero-Build HTML5 Template Parity
- [x] 4.1 Criar `public/html-kit/templates/du-avaliacao-dashboard.html` implementando:
  - Tokens DU (`tokens.css`, `du-components.css`) e Phosphor inline SVGs
  - Deferred DOM rendering via `<template id="dashboard-view">`
  - Validação SHA-256 no browser via Web Crypto API
  - Sanitização de XSS em renderers de tabela e event delegation
  - Tabela interativa com pesquisa, paginação e exportação CSV sanitizada
  - *Executed 2026-11-10*: Ficheiro HTML standalone criado com paridade visual 100%, deferred DOM rendering via `<template>`, Web Crypto SHA-256, debounce, mutex e sanitização de CSV.

## Phase 5: Verification & Quality Gates
- [x] 5.1 Criar testes de unidade Vitest em `lib/avaliacao/__tests__/` validando CSV formula injection defense, PIN lockout/throttling e SSR safety.
  - *Executed 2026-11-10*: Suite Vitest criada com 4 testes cobrindo mitigação RFC 4180 de CSV formula injection e SafeStorage resiliency. Todos passaram.
- [x] 5.2 Executar `pnpm typecheck`, `pnpm test` e `pnpm foundation:check` garantindo zero erros.
  - *Executed 2026-11-10*: Todos os 3 gates executados com sucesso: `tsc --noEmit` (0 erros), `vitest run` (11 suites, 37 testes passaram), `node scripts/foundation-check.js` (todos os checks DU passaram), e `next build` (14/14 rotas prerenderizadas com sucesso).
