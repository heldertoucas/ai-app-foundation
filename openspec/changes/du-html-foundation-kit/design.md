## Context

A `ai-app-foundation` fornece o design system canónico para o Development Universe. Para suportar ferramentas locais sem Node.js runtime (ex: Electron/Tauri, Sentinel Cockpit, documentação offline), precisamos de uma variante Native-First baseada em `shadcn-html`.

## Goals / Non-Goals

**Goals:**
- **Zero-Build & Zero-Latency**: Interface completa executável via duplo clique no ficheiro `.html` ou via webview leve.
- **Offline Bundling (Opção B)**: Vendorizar localmente os ficheiros essenciais do `codylindley/shadcn-html` em `public/html-kit/` para total independência de CDN.
- **Tokens 1:1**: Mesmas variáveis CSS OKLCH e classes utilitárias que a aplicação React principal.
- **Acesso ao Catálogo Completo**: Garantir que qualquer componente do shadcn/ui pode ser utilizado através dos padrões do `shadcn-html`.
- **Componentes Especializados DU**: KPI Cards tabulares, Telemetry Pills, Bento Grids para serviços/portas.
- **Duas Novas Skills Canónicas**:
  - `ai-ui-foundation`: Instruções e regras de UX/UI para criação em React + shadcn/ui.
  - `ai-html-foundation`: Instruções, catálogo de componentes e regras para criação em HTML nativo com `shadcn-html`.

**Non-Goals:**
- Substituir o Next.js 16 na aplicação principal `ai-app-foundation`.
- Criar runtime customizado ou framework JS intermediário.
- Depender de CDNs externas em produção local.

## Decisions

1. **Abordagem de Bundling Local (Opção B)**:
   - Em vez de depender de `cdn.jsdelivr.net`, disponibilizamos em `public/html-kit/` os tokens (`tokens.css`), o bundle CSS/JS dos componentes `shadcn-html`, e os componentes próprios do DU.
2. **Tokens Canónicos Partilhados**:
   - `public/html-kit/tokens.css` reflete fielmente as variáveis de `app/globals.css`, suportando `:root` e `.dark`.
3. **Vanilla JS Minimalista & Native APIs**:
   - `<dialog>` para modais nativos.
   - Popover API (`popovertarget`) para menus e dropdowns.
   - `<details>/<summary>` para accordions.
   - Script vanilla central < 50 linhas para Dark Mode toggle e atalhos de teclado.
4. **Skills para Multi-Agent Governance**:
   - Definir duas skills no padrão Rulesync/DU (`.agents/skills/ai-ui-foundation` e `.agents/skills/ai-html-foundation`) para garantir que os agentes geram código conforme as convenções do DU.

## Architecture & Data Flow

```
ai-app-foundation/
├── app/globals.css               <-- Fonte de tokens no Next.js
├── public/html-kit/              <-- Bundled Kit Estático
│   ├── tokens.css                <-- Tokens CSS agnósticos (OKLCH)
│   ├── vendor/                   <-- codylindley/shadcn-html bundled CSS/JS
│   │   ├── button.css
│   │   ├── dialog.css
│   │   ├── accordion.css
│   │   ├── tabs.css / tabs.js
│   │   └── ...
│   ├── du-components.css         <-- Componentes específicos DU (KPI, Bento, Telemetry)
│   ├── du-runtime.js             <-- Micro-script (<50 LOC) para Dark Theme & Shortcuts
│   └── templates/
│       └── starter-cockpit.html  <-- Template executável independente
├── .agents/skills/
│   ├── ai-ui-foundation/         <-- Skill React + shadcn/ui
│   └── ai-html-foundation/       <-- Skill Native HTML + shadcn-html
└── docs/html-foundation.md       <-- Documentação de referência
```
