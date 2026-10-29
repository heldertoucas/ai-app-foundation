# delta-spec: Website & Marketing Component System

## ADDED Requirements

### Requirement: Composable Hero Component
The system MUST provide a compound `Hero` component suite in `components/web/hero.tsx` supporting:
- Compound sub-parts: `Hero`, `HeroContent`, `HeroActions`, `HeroVisual`
- Layout variants: `"split"` (50/50 SaaS/product), `"centered"` (editorial/institutional), and `"minimal"` (developer docs)
- Heading polymorphism: Customizable `headingLevel` (`"h1"` | `"h2"`) ensuring unbroken document hierarchy
- Fluid typography tokens using Tailwind CSS v4 and OKLCH semantic variables
- React Server Component (RSC) compatible

### Requirement: Adaptive Feature & Bento Grid
The system MUST provide a `FeatureGrid` component in `components/web/feature-grid.tsx` supporting:
- Column layouts: `2`, `3`, `4`, or `"bento"` (asymmetric showcase)
- Subcomponent `FeatureCard` with `icon`, `title`, `description`, and open `children` slot for optional badges or links
- Pure CSS hover transitions without client runtime dependencies

### Requirement: Generic Showcase / Entity Card
The system MUST provide a polymorphic `ShowcaseCard` in `components/web/showcase-card.tsx` supporting:
- Generic metadata tuple array (`{ label: string; value: React.ReactNode; icon?: React.ReactNode }[]`)
- Optional visual media slot with reserved `aspect-video` container to eliminate Cumulative Layout Shift (CLS)
- Badge indicator, title, description, and footer action slot
- Companion skeleton component `ShowcaseCardSkeleton` for streaming / async loading states

### Requirement: Accessible Process Stepper
The system MUST provide a `ProcessSteps` component in `components/web/process-steps.tsx` supporting:
- Semantic `<ol>` / `<li>` markup with accessible screen-reader step announcements (`aria-current="step"`)
- Sequential numbered milestones with status variants (`completed`, `active`, `upcoming`)
- Flexible children slot for arbitrary step content, descriptions, and code snippets

### Requirement: Semantic Callout Component
The system MUST provide a `Callout` component in `components/web/callout.tsx` supporting:
- CVA-driven semantic variants: `"tip"`, `"info"`, `"warning"`, and `"accent"`
- WCAG 2.1 AA compliant color contrast across light and dark themes
- Icon slot with `@phosphor-icons/react` compatibility

### Requirement: Component Library Showcase Registration
The system MUST register the web components in `lib/library/component-registry.ts` under category `"Web & Marketing"` with:
- Isolated runnable preview in `components/dashboard/library/preview-renderer.tsx`
- Complete copyable JSX snippet and import statements
