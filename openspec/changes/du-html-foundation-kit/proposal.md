## Why

A `ai-app-foundation` (PRJ-0024 / REP-0023) estabeleceu o standard canónico para aplicações web ricas no Development Universe (Next.js 16 + Tailwind v4 + Radix + shadcn/ui). Contudo, múltiplos ecossistemas do DU (como o Sentinel Cockpit, webviews do Electron/Tauri, documentações interativas locais, relatórios e utilitários rápidos) requerem:
1. **Zero build step e latência de arranque < 2ms** (HTML/CSS/JS nativo em ficheiro único ou estático, sem Node.js runtime).
2. **Acesso irrestrito a TODOS os componentes do ecossistema shadcn/ui** em HTML nativo (via `codylindley/shadcn-html`), mesmo aqueles que ainda não têm componente React equivalente codificado na foundation.
3. **Paridade visual e semântica 1:1** de tokens (OKLCH, tema dark/light, classes `bg-card`, `text-muted-foreground`, `border-border`).
4. **Governação assistida por IA (Agent Skills)**: Instruções canónicas distribuíveis para que agentes (Claude, Antigravity, OpenCode, Jules) saibam construir interfaces quer na stack React/Next.js (`ai-app-foundation`), quer na stack Native-HTML (`shadcn-html` bundled).

Adotamos a **Opção B (Bundling / Vendoring)**: empacotamento offline e agnóstico de dependências dentro do repositório, garantindo soberania total e operação air-gapped.

## What Changes

- **Core Tokens Agnósticos (`public/html-kit/tokens.css` ou `styles/foundation-tokens.css`)**:
  - Extração dos tokens canónicos (`:root` e `.dark`) definidos em `app/globals.css` para um ficheiro CSS puro e reutilizável pelo HTML Kit e pelo Next.js.
  - Mapeamento direto de cores (`--background`, `--foreground`, `--card`, `--muted`, etc.), raios (`--radius`), e estados de telemetria do DU (`--status-live`, `--status-drift`, `--status-missing`).
- **Vendoring & Bundling do shadcn-html Core (`public/html-kit/vendor/`)**:
  - Empacotamento das folhas de estilo e micro-scripts essenciais do `codylindley/shadcn-html` (Button, Dialog, Accordion, Popover, Tabs, Switch, Table, Card, etc.).
  - Criação de um bundle unificado (`public/html-kit/shadcn-html.all.css`) e distribuição modular por componente.
- **Componentes Nativos Próprios do DU (`public/html-kit/du-components/`)**:
  - Snippets canónicos para o ecossistema DU: KPI Stat Card com valores mono, Telemetry Ping Badges, Bento Fleet Grid, Port Status Card, Native Dialog e Quick Filter / Command Palette nativo (<50 LOC).
- **Template Standalone Cockpit (`public/html-kit/templates/starter-cockpit.html`)**:
  - Fixture executável pronta para cópia direta e teste de regressão visual.
- **Novas Agent Skills Especializadas**:
  1. `ai-ui-foundation`: Guia de arquitetura, padrões gráficos, design tokens, UX/UI e criação de interfaces React/Next.js na `ai-app-foundation` usando shadcn/ui.
  2. `ai-html-foundation`: Guia e catálogo de snippets para prototipagem rápida e cockpits zero-build em HTML/CSS/JS com `shadcn-html` bundled e componentes próprios do DU.
- **Galeria e Documentação no Dashboard (`app/(dashboard)/dashboard/library/html-kit/page.tsx` & `docs/html-foundation.md`)**:
  - Playground interativo e documentação para visualização e cópia de snippets.

## Capabilities

### New Capabilities
- `du-html-foundation-kit`: Capacidade de gerar e executar interfaces web completas, acessíveis e alinhadas visualmente com o DU sem qualquer ferramenta de compilação ou dependência de CDN externa.
- `ai-design-system-skills`: Skills de agente que orientam IAs a desenhar e programar ecrãs tanto em React como em HTML nativo com consistência rigorosa.

## Impact

- **Repositórios Impactados**: `REP-0023` (`ai-app-foundation`), e projetos downstream (`du-dashboard`, `sentinel`, ferramentas CLI/Electron).
- **Sem Breaking Changes**: A aplicação Next.js existente permanece inalterada; o HTML Kit é uma extensão aditiva estática e modular.
