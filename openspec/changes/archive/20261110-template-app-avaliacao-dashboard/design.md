# Design: Template Canónico App Avaliação Dashboard

## 🏛️ AI Council Review & Hardening Synthesis

| Dimension | Initial Rating | Hardened Status | Remediation Summary |
| :--- | :--- | :--- | :--- |
| **Security & Adversarial** | **Blocker** | **Passed (Hardened)** | Added Layout Guard for route protection; persistent lockout with exponential backoff & 400ms throttle; deferred DOM mounting `<template>` in zero-build HTML; strict CSV formula injection sanitizer; XSS prevention via `escapeHtml` and event delegation. |
| **Software Architecture** | **Concern** | **Passed (Hardened)** | Dedicated `layout.tsx` for `avaliacao-dashboard` isolating marketing chrome; `useSyncExternalStore` SSR boundary in `auth-store.ts`; decoupled presentational components from data repository (`AvaliacaoRepository`); clarified offline SHA-256 barrier semantics. |
| **Resilience & Storage** | **Concern** | **Passed (Hardened)** | Implemented `SafeStorage` wrapper handling kiosk quotas; pagination (25 items) and 150ms search debounce; `isSyncing` mutex preventing double-trigger races. |
| **UI/UX & Tokens** | **Pass** | **Passed** | 100% parity with DU tokens (`--status-live`, `--status-drift`, `--primary`), Phosphor Icons (`@phosphor-icons/react`), and inline SVG twins. |

---

## Architecture & Topology

```
app/(site)/avaliacao-dashboard/
├── layout.tsx                # Layout isolado: strip chrome de marketing, AuthGuard & session header estável
├── page.tsx                  # Ecrã de Login (Formador PIN / Admin Password)
├── admin/
│   └── page.tsx              # Cockpit Administrativo de Telemetria e Sincronização
└── trainer/
    └── page.tsx              # Mesa de Trabalho do Formador e Monitorização de Formandos

components/avaliacao-dashboard/
├── auth-guard.tsx            # Client wrapper que valida sessão hidratada antes de renderizar subrotas
├── auth-pin-pad.tsx          # Keypad numérico tátil com throttle e feedback de lockout
├── telemetry-sync-card.tsx   # Card de status de sincronização (Google Sheets, Neon, Quotas) com mutex
├── trainee-monitor-table.tsx # Tabela interativa com pesquisa debounced, paginação e badges DU
└── session-header.tsx        # Topo de sessão partilhado (ID da turma, relógio, botão de logout)

lib/avaliacao/
├── types.ts                  # Interfaces: Trainee, SessionUser, SyncHealth, AuditEvent, CsvExportOptions
├── safe-storage.ts           # Storage resiliente com fallback em memória para kiosks/privacidade restrita
├── auth-store.ts             # useSyncExternalStore SSR-safe, lockout exponencial e verificação com delay
├── mock-data.ts              # Dados isolados de alta fidelidade para desenvolvimento local
├── repository.ts             # AvaliacaoRepository desacoplado com métodos de sync, reabertura e exportação
└── csv-sanitizer.ts          # Sanitizador RFC 4180 com mitigação de injeção de fórmulas

public/html-kit/templates/
└── du-avaliacao-dashboard.html # Réplica 1:1 Zero-Build: deferred DOM template, SHA-256 barrier, vanilla JS
```

---

## Security & Resilience Invariants

### 1. Route Guarding & Hydration Safety
- **SSR Boundary**: `auth-store.ts` expõe um `subscribe` e `getSnapshot` com fallback determinístico de servidor (`{ isAuthenticated: false, isHydrated: false }`), prevenindo `ReferenceError: sessionStorage is not defined` no Next.js 16 App Router.
- **AuthGuard**: O layout de subrotas verifica se o utilizador possui o perfil correspondente (`trainer` para `/trainer`, `admin` para `/admin`); caso contrário, redireciona via `router.replace('/avaliacao-dashboard')` sem vazamento de dados.

### 2. Lockout & Brute-Force Defense
- As tentativas falhadas são persistidas no `localStorage` sob a chave `du_avaliacao_lockout`.
- Um atraso artificial de 400ms (`await new Promise(r => setTimeout(r, 400))`) desacelera tentativas programáticas.
- Atingindo 5 tentativas, o sistema aplica um cooldown de 60s; após 10 tentativas, o cooldown estende-se para 900s (15m).

### 3. Zero-Build Deferred DOM Pattern
- No ficheiro `du-avaliacao-dashboard.html`, todo o HTML confidencial (tabela de formandos, notas, cartões de administração) reside dentro de `<template id="dashboard-view">`.
- Inspecionar o DOM ou remover overlays antes da validação da credencial revela apenas o card de autenticação.
- O DOM real só é clonado e injetado via `template.content.cloneNode(true)` após o hash SHA-256 da credencial bater certo.

### 4. CSV Formula Injection Defense
- Qualquer campo exportado com prefixos perigosos (`=`, `+`, `-`, `@`, `\t`, `\r`) recebe um apóstrofo prefixado (`'`).
- Todos os campos são delimitados por aspas duplas de acordo com o RFC 4180.

### 5. Design System Tokens & Parity
- **Status Live**: `var(--status-live)` / `.du-status-live` para sincronizações ativas e testes em progresso.
- **Status Drift**: `var(--status-drift)` / `.du-status-drift` para sincronizações atrasadas e testes pendentes.
- **Ícones**: Phosphor Icons no React (`@phosphor-icons/react`: `ChalkboardTeacher`, `ShieldCheck`, `LockKey`, `ArrowClockwise`, `Users`, `CheckCircle`, `Warning`, `DownloadSimple`) e SVGs inline equivalentes no template Zero-Build.
