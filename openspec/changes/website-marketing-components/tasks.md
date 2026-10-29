# Tasks: Website & Marketing Component System

- [x] 1. Core Web Components (`components/web/`) <!-- id: 1-core-web-components -->
  - [x] 1.1 Implement compound `components/web/hero.tsx` (`Hero`, `HeroContent`, `HeroActions`, `HeroVisual`) with `split`, `centered`, and `minimal` variants <!-- id: 1.1-hero -->
    - *Executed 2026-09-11*: Built compound Hero with fluid typography and headingLevel polymorphism.
  - [x] 1.2 Implement `components/web/feature-grid.tsx` with `2`, `3`, `4`, and `"bento"` grid column density and `FeatureCard` <!-- id: 1.2-feature-grid -->
    - *Executed 2026-09-11*: Created responsive grid supporting symmetric and bento asymmetric layouts with hover transitions.
  - [x] 1.3 Implement `components/web/split-section.tsx` with alternating media layout and reserved aspect ratios <!-- id: 1.3-split-section -->
    - *Executed 2026-09-11*: Implemented 50/50 split section with mediaPosition left/right and CLS-safe aspect ratio.
  - [x] 1.4 Implement accessible `components/web/process-steps.tsx` (`<ol>` / `<li>`, `aria-current="step"`) <!-- id: 1.4-process-steps -->
    - *Executed 2026-09-11*: Implemented accessible stepper with orientation support and status badges.
  - [x] 1.5 Implement `components/web/showcase-card.tsx` and `ShowcaseCardSkeleton` with generic metadata tuples and reserved media slot <!-- id: 1.5-showcase-card -->
    - *Executed 2026-09-11*: Built generic showcase card decoupled from specific domains, with skeleton state.
  - [x] 1.6 Implement CVA-driven `components/web/callout.tsx` (`tip`, `info`, `warning`, `accent`) and `components/web/cta-banner.tsx` <!-- id: 1.6-callout-and-cta -->
    - *Executed 2026-09-11*: Implemented WCAG AA compliant callouts and high-contrast conversion CTA banner.
  - [x] 1.7 Implement `components/web/testimonial-card.tsx` and `TestimonialCardSkeleton` with accessible star ratings and fallback avatar <!-- id: 1.7-testimonial-card -->
    - *Executed 2026-09-11*: Implemented social proof cards with star accessibility and initials avatar fallback.
  - [x] 1.8 Create barrel file `components/web/index.ts` exporting all components <!-- id: 1.8-barrel-export -->
    - *Executed 2026-09-11*: Created unified export index for clean external consumption.

- [x] 2. Component Library Integration (`/dashboard/library`) <!-- id: 2-library-integration -->
  - [x] 2.1 Add `"Web & Marketing"` category entries to `lib/library/component-registry.ts` <!-- id: 2.1-registry-update -->
    - *Executed 2026-09-11*: Registered all 7 new components with complete prop definitions and copyable snippets.
  - [x] 2.2 Wire lazy mock previews into `components/dashboard/library/preview-renderer.tsx` <!-- id: 2.2-preview-renderer -->
    - *Executed 2026-09-11*: Connected live interactive previews for all web components in the library viewer.

- [x] 3. Quality Gates & Verification <!-- id: 3-verification -->
  - [x] 3.1 Run `pnpm typecheck` to verify zero TypeScript errors <!-- id: 3.1-typecheck -->
    - *Executed 2026-09-11*: Exited 0 with zero TypeScript errors.
  - [x] 3.2 Run `pnpm test` to verify existing and new test suites <!-- id: 3.2-test -->
    - *Executed 2026-09-11*: 10/10 test files passed (33 tests total).
  - [x] 3.3 Run `pnpm build` to ensure static production builds succeed cleanly <!-- id: 3.3-build -->
    - *Executed 2026-09-11*: Next.js 16 build succeeded with 13/13 static routes generated.
