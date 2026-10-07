# Capability: DU HTML Foundation Kit & Agent Skills

## ADDED REQUIREMENTS

### REQ-01: Shared Design Tokens Agnostic Engine
The system SHALL export a standalone CSS file at `public/html-kit/tokens.css` that contains exact 1:1 color, radius, and elevation tokens matching `app/globals.css` in OKLCH for `:root` and `.dark`, including DU-specific telemetry tokens (`--status-live`, `--status-drift`, `--status-missing`, `--status-unsupported`).

### REQ-02: Offline Bundled shadcn-html Primitives
The system SHALL bundle self-contained CSS and minimal JS for core `shadcn/ui` components ported to semantic HTML from `codylindley/shadcn-html` under `public/html-kit/vendor/` to allow completely offline, buildless operation without external CDNs.

### REQ-03: DU-Specific Native Component Extensions
The system SHALL implement semantic HTML/CSS snippets for DU-specific cockpit interfaces under `public/html-kit/du-components.css` and template:
- KPI Stat Card with monospace tabular values and delta badges.
- Telemetry Pill with animated CSS ping indicators.
- Bento Grid for service ports, repository cards, and shortcuts.
- Native `<dialog>` modal with accessible focus trapping and Escape handling.
- Native Popover API dropdowns.
- Quick Filter / Command Bar.

### REQ-04: Standalone Starter Cockpit Template
The system SHALL provide a fully functional, self-contained HTML template at `public/html-kit/templates/starter-cockpit.html` showcasing dark/light theme switching, KPI statistics, Bento fleet status, and native dialogs, runnable directly from the filesystem with zero local servers or build steps.

### REQ-05: Agent Skill: `ai-ui-foundation`
The system SHALL define a canonical agent skill in `.agents/skills/ai-ui-foundation/SKILL.md` detailing:
- The design system guidelines, visual tokens, typography (Geist/Geist Mono), layout conventions, and UX/UI patterns of `ai-app-foundation`.
- Best practices for building and composing React 19 / Next.js 16 components with Tailwind v4 and shadcn/ui.
- Guidance on error boundaries, lazy loading, and server/client boundary splits.

### REQ-06: Agent Skill: `ai-html-foundation`
The system SHALL define a canonical agent skill in `.agents/skills/ai-html-foundation/SKILL.md` detailing:
- How to create zero-build, offline HTML interfaces using the bundled `shadcn-html` core and DU components.
- The 5-layer component structure (Skill, CSS, HTML, minimal JS, Tokens).
- How to access and adapt ANY component from `codylindley/shadcn-html` even if not yet implemented in the React foundation.
- Ready-to-copy HTML snippets for quick assembly of DU cockpits and webviews.

### REQ-07: Interactive Documentation & Catalog
The system SHALL provide comprehensive documentation in `docs/html-foundation.md` explaining token mapping, component conversion from React to HTML, and offline deployment instructions.
