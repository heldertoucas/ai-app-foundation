---
name: ai-html-foundation
description: >-
  Build zero-build, offline-first, native HTML/CSS/JS user interfaces, cockpits,
  and webviews using the DU HTML Foundation Kit and the bundled shadcn-html component catalog.
---
# ⚡ AI HTML Foundation Guide (`ai-html-foundation`)

Use this skill when building single-file HTML applications, local cockpits (Sentinel, Electron/Tauri), interactive documentation, or zero-build tools for the Development Universe.

## 🏛️ Invariantes do Kit HTML Nativo

1. **Zero-Build & Offline Soberano**:
   - Não depende de npm, Node.js, empacotador (Vite/Webpack) ou CDNs externas.
   - Todo o runtime e CSS vive localmente na pasta `public/html-kit/` da `ai-app-foundation`.

2. **Paridade 1:1 de Tokens com a Foundation**:
   - Importar sempre:
     ```html
     <link rel="stylesheet" href="tokens.css">
     <link rel="stylesheet" href="vendor/shadcn-html.all.css">
     <link rel="stylesheet" href="du-components.css">
     <script src="du-runtime.js" defer></script>
     ```
   - O tema suporta Dark/Light Mode automático com persistência em `localStorage` e atalho global via `duToggleTheme()`.

3. **Acesso ao Catálogo Completo do shadcn**:
   - Qualquer componente do **shadcn/ui** (mesmo não existente na nossa app React) pode ser instanciado em HTML através do modelo **`codylindley/shadcn-html`**:
     - **Button**: `<button class="ui-btn ui-btn-outline">`
     - **Card**: `<div class="ui-card"><div class="ui-card-header">...</div></div>`
     - **Badge**: `<span class="ui-badge ui-badge-secondary">`
     - **Modal Dialog**: `<dialog id="meu-modal" class="ui-dialog">`
     - **Accordion**: `<details class="ui-accordion"><summary>Título</summary>...</details>`
     - **Switch**: `<label class="ui-switch"><input type="checkbox"><span class="ui-switch-slider"></span></label>`
     - **Table**: `<div class="ui-table-container"><table class="ui-table">...</table></div>`
     - **Tabs**: `<div class="ui-tabs"><div class="ui-tabs-list"><button class="ui-tab-trigger" onclick="duActivateTab(this, 'tab-1')">...`

4. **Componentes Próprios de Domínio DU**:
   - **KPI Stat Card**:
     ```html
     <div class="du-kpi-card">
       <div class="du-kpi-label">
         <span>Total Notes</span>
         <span class="ui-badge ui-badge-outline">Obsidian</span>
       </div>
       <div class="du-kpi-value">
         142 <span style="font-size: 0.875rem; font-weight: 400; color: var(--muted-foreground);">notes</span>
       </div>
       <div class="du-kpi-subtext">Sincronizado há 2m</div>
     </div>
     ```
   - **Telemetry Pill com Ping Animado**:
     ```html
     <div class="du-telemetry-pill du-status-live">
       <span class="du-ping-dot">
         <span class="du-ping-circle"></span>
         <span class="du-ping-core"></span>
       </span>
       <span>Online</span>
     </div>
     ```
   - **Quick Command Palette / Barra de Pesquisa**:
     ```html
     <button class="du-command-bar" onclick="document.getElementById('du-command-dialog').showModal()">
       <span>Procurar...</span>
       <span class="du-command-shortcut">Ctrl+K</span>
     </button>
     ```

## 🚀 Como Criar uma Nova App Cockpit

1. Copiar `public/html-kit/templates/starter-cockpit.html` para a localização alvo.
2. Manter a referência relativa para `tokens.css`, `vendor/shadcn-html.all.css`, `du-components.css` e `du-runtime.js` (ou juntar tudo num ficheiro único para distribuição portátil).
3. Testar abrindo diretamente no navegador: latência instantânea e renderização nativa.
