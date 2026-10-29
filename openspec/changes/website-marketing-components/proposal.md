# Proposal: Website & Marketing Component System

## Why

The `ai-app-foundation` currently provides rich dashboard, agent inspection, telemetry, and metrics components. However, to serve as an end-to-end foundation for launching complete digital products, institutions, or educational platforms (such as `futuro-digital`), the foundation needs a first-class **Website & Marketing Component System**.

By auditing the production application `futuro-digital-react` (`apps/futuro-digital` and `packages/ui`), we identified a recurring set of high-value layout and content archetypes:
1. **Hero & Storytelling Sections**: High-impact hero banners with badge indicators, CTAs, and multimedia slots.
2. **Feature & Value Grids**: 2-column and 3-column responsive feature grids with icon highlights.
3. **Structured Content & Pedagogical Blocks**: Numbered step-by-step guides (`StepByStep`), callout tips (`ProTip`), and keyboard badge aids (`Kbd`).
4. **Catalog & Course/App Cards**: Cards with category badges, duration/level metadata, and call-to-action triggers.
5. **Social Proof & Testimonials**: Testimonial and quote carousels/cards for conversion.
6. **Conversion Banners**: Standalone full-width and sticky CTAs.

Bringing these components into `ai-app-foundation` with modern shadcn/ui primitives, Tailwind CSS v4, and React 19 ensures zero third-party lock-in and enables developers to spin up public-facing websites or course portals in minutes.

## What Changes

- **Component Architecture (`components/web/`)**:
  - `components/web/marketing-hero.tsx`: Configurable hero section with title, subtitle, primary/secondary CTAs, and visual slot (mockup/image).
  - `components/web/feature-grid.tsx`: Multi-column feature grid supporting icons, titles, and descriptions.
  - `components/web/split-content-section.tsx`: 50/50 content-media split section with checklist or highlights.
  - `components/web/step-by-step.tsx`: Step container and step cards with numbered milestones and status indicators.
  - `components/web/catalog-card.tsx`: Reusable card for courses, tools, apps, or services with tags, meta attributes, and CTA button.
  - `components/web/pro-tip-callout.tsx`: Informative callout block with icon and accent borders.
  - `components/web/testimonial-card.tsx`: Card for user/student feedback with avatar, rating, and quote.
  - `components/web/cta-banner.tsx`: High-contrast conversion banner for page bottoms or section separators.
  - `components/web/index.ts`: Public barrel exports for clean imports.

- **Component Library Showcase Integration**:
  - Register the new web components in `lib/library/component-registry.ts` under a new category: `"Web & Marketing"`.
  - Add runnable preview archetypes in `/dashboard/library` so developers can inspect and copy ready-to-use snippets.

- **Public Website Route Example (`app/(marketing)/`)**:
  - Add an example public landing page template demonstrating the composition of these components into a coherent, responsive page.

## Capabilities

### New Capabilities
- `website-components`: Modular, accessible, and theme-adaptive web and marketing component suite based on shadcn/ui and Tailwind v4 for landing pages, educational portals, and marketing sites.

### Modified Capabilities
- `component-library`: Expanded to showcase the Web & Marketing component category alongside existing dashboard widgets.

## Impact

- **Affected Code**:
  - `components/web/*` (new)
  - `lib/library/component-registry.ts` (updated)
  - `components/dashboard/library/preview-renderer.tsx` (updated with previews)
  - `app/(marketing)/` (optional reference template)
- **Dependencies**: Uses existing `@phosphor-icons/react`, `shadcn/ui` primitives (`card`, `button`, `badge`), and Tailwind CSS v4. No paid or external cloud SaaS dependencies.
- **Verification**: `pnpm typecheck && pnpm test && pnpm build`
