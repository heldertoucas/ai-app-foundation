# Specification: Avaliação Dashboard Template

## Requirements & Acceptance Criteria

### REQ-1: Dual-Mode Authentication Barrier & Route Guard
- **Obrigatório**: O ecrã inicial (`/avaliacao-dashboard`) disponibiliza abas para perfil "Formador" e "Administrador".
- **Formador**:
  - Requer Código de Ação/Turma (ex.: `FD-2026-TURMA4`) e PIN numérico de 4 dígitos (ex.: `1234`).
  - Apresenta feedback visual imediato de dígitos preenchidos e teclado numérico virtual.
  - Ao validar, autentica e encaminha para `/avaliacao-dashboard/trainer`.
- **Administrador**:
  - Requer Password Mestra de Administrador (ex.: `admin123` em dev / hash SHA-256).
  - Ao validar, encaminha para `/avaliacao-dashboard/admin`.
- **Proteção contra Força Bruta (Hardened)**:
  - Persistência de tentativas em `localStorage` com chave de fingerprint de máquina.
  - Atraso artificial de verificação de 400ms (`await delay(400)`) para mitigar scripts locais automatizados.
  - Bloqueio progressivo: 5 tentativas = 60s, 10 tentativas = 15m.
- **Route Guard (Hydration & Deep-Link Safe)**:
  - As subrotas `/admin` e `/trainer` devem ser protegidas por um `AuthGuard` client wrapper dentro do `layout.tsx` dedicado.
  - Se a sessão não estiver hidratada ou autenticada, redireciona deterministicamente para `/avaliacao-dashboard` sem fugas de dados nem flash de conteúdo não autorizado.

### REQ-2: Cockpit Administrativo de Telemetria e Sincronização
- **Obrigatório**: A rota `/avaliacao-dashboard/admin` apresenta:
  - **KPIs Principais**: Total de Turmas Ativas, Total de Formandos Avaliados, Taxa Média de Sucesso (defensiva para listas vazias `length === 0 ? 0 : ...`) e Latência p95.
  - **Cartões de Estado de Serviços**:
    - *Google Sheets Sync*: Status Live/OK, última sincronização há X minutos, registos pendentes.
    - *Base de Dados Neon / SQLite*: Status Connected, pool usage, latência de query.
    - *Quota & Limites de API*: Percentagem consumida com barra de progresso em conformidade com tokens DU.
  - **Feed de Atividades / Auditoria**: Lista cronológica de eventos (início de teste, submissão em lote, pauta exportada).
  - **Ação de Sincronização Manual com Mutex**: Botão "Forçar Sincronização" com mutex `isSyncing` para prevenir race conditions e cliques repetidos.

### REQ-3: Mesa de Trabalho e Monitorização do Formador
- **Obrigatório**: A rota `/avaliacao-dashboard/trainer` apresenta:
  - **Cabeçalho de Turma**: Código de turma ativa, formador responsável, tempo de sessão decorrido e contadores de status.
  - **Tabela de Monitorização de Formandos**:
    - Colunas: Nome do Formando, NIF/ID, Início da Prova, Estado (`Em Curso`, `Concluído`, `Pendente`, `Tempo Esgotado`), Nota / Pontuação, Ações Rápidas.
    - Pesquisa com debounce de 150ms e paginação (25/50 itens) para evitar bloqueios da main thread em turmas volumosas.
    - Status badges em conformidade estrita com o padrão de cores DU (`--status-live`, `--status-drift`, etc.).
  - **Ações Rápidas & Pauta**:
    - "Concluir Turma e Gerar Pauta"
    - "Reabrir Prova" (ação idempotente)
    - "Exportar CSV de Resultados" com sanitização estrita de injeção de fórmulas (RFC 4180 + prefixo `'` em campos com `=`, `+`, `-`, `@`, `\t`).

### REQ-4: Paridade Visual Estrita Zero-Build HTML5
- **Obrigatório**: O ficheiro `public/html-kit/templates/du-avaliacao-dashboard.html` implementa paridade visual de 100%:
  - Utiliza `tokens.css`, `vendor/shadcn-html.all.css` e `du-components.css`.
  - **Deferred DOM Rendering**: O markup confidencial da tabela e do cockpit de telemetria reside dentro de `<template id="dashboard-view">` inerte; o DOM real só é montado após validação de PIN bem-sucedida, impedindo bypass via remoção de overlay no DevTools.
  - **Offline Security Barrier**: Validação de credenciais via hash SHA-256 no browser (`crypto.subtle.digest`) para evitar passwords em texto limpo no código-fonte.
  - **Sanitização XSS e Event Delegation**: Todo o texto de formandos interpolado passa por `escapeHtml()` e as ações utilizam `data-action` e delegação no elemento pai.

### REQ-5: Resiliência, Acessibilidade e Integridade Técnica
- **Acessibilidade**: Atributos `aria-label`, foco acessível no keypad numérico, suporte a teclado (Enter, Esc) e contraste WCAG AA.
- **SafeStorage Wrapper**: Todas as operações de `localStorage` / `sessionStorage` são encapsuladas para não quebrar a aplicação em ambientes restritos (Safari Private Browsing, Kiosks institucionais).
- **Sem Erros de Build**: Respeito estrito por `tsc --noEmit`, React 19 hooks seguros contra SSR (`useSyncExternalStore`), e aprovação total em `pnpm foundation:check`.
