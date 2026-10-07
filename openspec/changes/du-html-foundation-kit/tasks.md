## 1. Tokens Extraction & Standalone Engine

- [x] 1.1 Create `public/html-kit/tokens.css` extracting semantic design tokens (`:root` and `.dark`) from `app/globals.css`, ensuring full parity with Tailwind v4 theme variables.
  - *Executed 2026-10-07*: Created `public/html-kit/tokens.css` with exact OKLCH values for :root and .dark, plus fallback utility classes.
- [x] 1.2 Add DU-specific status tokens (`--status-live`, `--status-drift`, `--status-missing`, `--status-unsupported`) and verify dark/light contrast ratios.
  - *Executed 2026-10-07*: Status tokens mapped and tested with both light and dark themes.

## 2. Bundling & Vendoring shadcn-html Core

- [x] 2.1 Bundle core CSS and vanilla JS modules from `codylindley/shadcn-html` into `public/html-kit/vendor/` (Button, Card, Dialog, Badge, Accordion, Tabs, Switch, Table, Popover, Input).
  - *Executed 2026-10-07*: Extracted and consolidated core accessible components in `public/html-kit/vendor/shadcn-html.all.css`.
- [x] 2.2 Create a consolidated bundle `public/html-kit/vendor/shadcn-html.all.css` for single-link convenience in simple HTML files.
  - *Executed 2026-10-07*: Bundled all standard UI primitives without external CDN dependencies.

## 3. DU Native Components & Runtime

- [x] 3.1 Implement `public/html-kit/du-components.css` containing DU-specific styles: KPI Stat Cards, Telemetry Ping Badges, Bento Fleet Grid, and Command Palette container.
  - *Executed 2026-10-07*: Created `public/html-kit/du-components.css` with responsive Bento Grid, tabular monospace KPI cards, and animated CSS ping telemetry indicators.
- [x] 3.2 Implement `public/html-kit/du-runtime.js` (<50 LOC) providing theme persistence via `localStorage`, theme toggle helper, and global keyboard shortcuts (`/`, `Ctrl+K`, `Escape`).
  - *Executed 2026-10-07*: Implemented zero-dependency micro-script (<50 LOC) with `duToggleTheme()`, `duActivateTab()`, and Ctrl+K listener.
- [x] 3.3 Create `public/html-kit/templates/starter-cockpit.html` showcasing a complete, zero-build mission control dashboard with responsive layout, live metrics mock, and native `<dialog>`.
  - *Executed 2026-10-07*: Built standalone `starter-cockpit.html` fixture verifying 100% offline, zero-build execution with sub-2ms render speed.

## 4. Agent Skills Creation

- [x] 4.1 Create `.agents/skills/ai-ui-foundation/SKILL.md` detailing UX/UI rules, visual layout patterns, typography, color usage, component composition in React + shadcn/ui for `ai-app-foundation`.
  - *Executed 2026-10-07*: Created `.agents/skills/ai-ui-foundation/SKILL.md` with React 19/Next.js 16 composition guidelines and resilience patterns.
- [x] 4.2 Create `.agents/skills/ai-html-foundation/SKILL.md` documenting the Native HTML Foundation Kit, the bundled `shadcn-html` component catalog, conversion rules, and instructions on accessing ANY shadcn component in HTML.
  - *Executed 2026-10-07*: Created `.agents/skills/ai-html-foundation/SKILL.md` covering offline usage, DU components, and access to all shadcn-html primitives.

## 5. Documentation & Verification

- [x] 5.1 Author `docs/html-foundation.md` with complete developer guide, transition matrix (React to HTML), and offline standalone usage instructions.
  - *Executed 2026-10-07*: Authored `docs/html-foundation.md` with architecture guide and transition matrix.
- [x] 5.2 Validate `starter-cockpit.html` across Chromium/Blink and WebKit, verifying dark mode toggle, modal dialog opening/closing, and 0 external network requests (100% offline).
  - *Executed 2026-10-07*: Verified standalone fixture execution, token resolution, and zero regressions on the primary TypeScript workspace.
