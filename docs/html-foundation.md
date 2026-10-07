# 🌐 DU HTML Foundation Kit — Guia de Arquitetura & Uso

Este documento formaliza a variante **HTML-first / Zero-Build** do Development Universe (DU), baseada nos princípios do **`codylindley/shadcn-html`** e empacotada localmente em `public/html-kit/`.

---

## 🎯 Missão e Casos de Uso

A aplicação principal `ai-app-foundation` (PRJ-0024) utiliza Next.js 16, Tailwind v4 e Radix UI. 
Contudo, ferramentas periféricas do DU exigem:
1. **Zero build step**: Ficheiros executáveis sem necessitar de `pnpm dev`, `node` ou transpilador.
2. **Latência sub-2ms**: Renderização instantânea em webviews de desktop (Electron, Tauri, Sentinel Cockpit).
3. **Acesso ao catálogo integral do shadcn/ui**: Poder desenhar qualquer elemento com garantia de acessibilidade e semântica HTML.
4. **Offline soberano**: Sem qualquer recurso a CDNs de terceiros (`cdn.jsdelivr.net`, `cdn.tailwindcss.com`).

---

## 📁 Estrutura do Kit Bundled (`public/html-kit/`)

```
public/html-kit/
├── tokens.css               <-- Tokens canónicos (:root e .dark) em OKLCH com paridade com globals.css
├── du-components.css        <-- Componentes do DU (KPI Cards, Telemetry Badges, Bento Grids)
├── du-runtime.js            <-- Micro-script (<50 LOC) para Dark Theme e atalhos de teclado
├── vendor/
│   └── shadcn-html.all.css  <-- Bundling local de componentes nativos (Button, Card, Dialog, Tabs, etc.)
└── templates/
    └── starter-cockpit.html <-- Template funcional e testado pronto para duplicação
```

---

## 🔄 Matriz de Transição: React vs. HTML Nativo

| Componente | Versão React (`ai-app-foundation`) | Versão HTML Nativo (`html-kit`) |
| :--- | :--- | :--- |
| **Tokens & Cores** | `app/globals.css` (Tailwind `@theme`) | `public/html-kit/tokens.css` |
| **Botão** | `<Button variant="outline">` | `<button class="ui-btn ui-btn-outline">` |
| **Card** | `<Card><CardHeader>...` | `<div class="ui-card"><div class="ui-card-header">...` |
| **Badge** | `<Badge variant="secondary">` | `<span class="ui-badge ui-badge-secondary">` |
| **Modal Dialog** | Radix `@radix-ui/react-dialog` | Native `<dialog class="ui-dialog">` |
| **Accordion** | Radix Accordion | Native `<details class="ui-accordion"><summary>...` |
| **Switch** | Radix Switch | `<label class="ui-switch"><input type="checkbox">...` |
| **Tabs** | Radix Tabs | `<div class="ui-tabs">` + `duActivateTab(this, id)` |
| **Theme Toggle** | `next-themes` | `duToggleTheme()` via `du-runtime.js` |
| **KPI Stat Card** | `components/dashboard/kpi-stat-card.tsx` | `<div class="du-kpi-card">` |
| **Telemetria** | Componente de Telemetria com CSS Ping | `<div class="du-telemetry-pill du-status-live">` |

---

## 💡 Como Usar Num Novo Projeto Standalone

1. Copiar a pasta `public/html-kit/` para o repositório ou webview de destino.
2. Abrir `templates/starter-cockpit.html`.
3. Adicionar novos componentes do catálogo geral do `codylindley/shadcn-html` utilizando os mesmos seletores e tokens de cor.
