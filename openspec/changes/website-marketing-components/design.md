# Design & AI Council Review: Website & Marketing Component System

**Context**: Reusable framework for heterogeneous applications (SaaS landing pages, educational portals like Futuro Digital, developer documentation, internal tool hubs, portfolios).
**Verdict**: Conditionally Approved with Structural Hardening.

---

## 🏛️ Council Synthesis & Rubric

| Dimension | Rating | Key Finding |
| :--- | :---: | :--- |
| **Architecture (Coupling & Genericity)** | **CONCERN -> RESOLVED** | Monolithic components (`MarketingHero`, `CatalogCard`) leaked domain concepts from `futuro-digital`. Resolved by pivoting to Compound Components (`Hero`, `ShowcaseCard`, `ProcessSteps`) and `asChild` (Radix Slot). |
| **UX & Design Systems** | **PASS** | Require fluid typography scales (`Display`, `Headline`, `Eyebrow`), Bento grid support, and zero runtime animation dependencies (pure CSS / Tailwind v4). |
| **Resilience & Accessibility** | **CONCERN -> RESOLVED** | Must comply with WCAG 2.1 AA (critical for municipal/CML entities), eliminate CLS with aspect-ratio reservations, enforce RSC purity (no unneeded `"use client"`), and add Skeleton states. |
| **Red Team (Adversarial Critic)** | **PASS** | Prevented "prop soup" by removing rigid array-of-object configurations and ensuring zero leaky educational abstractions in the generic foundation. |

---

## 🛠️ Architectural Refactor Decisions

1. **Compound Component Architecture**:
   - `Hero`: `<Hero>`, `<HeroContent>`, `<HeroActions>`, `<HeroVisual>` with variants (`centered`, `split`, `minimal`).
   - `ShowcaseCard`: Replaces domain-coupled `CatalogCard`. Includes metadata tuple slots, media wrapper, and polymorphic actions.
   - `ProcessSteps`: Replaces domain-coupled `StepByStep`. Uses `<ol>`/`<li>` with `aria-current="step"`.
   - `Callout`: Replaces `ProTip` with a multi-variant CVA callout (`tip`, `info`, `warning`, `accent`).
   - `FeatureGrid`: Supports column density (`2`, `3`, `4`, `"bento"`).

2. **Zero Leaky Abstractions**:
   - Removed course-specific props (`course level`, `duration`, `attendance`).
   - Replaced hardcoded brand hexes with semantic OKLCH tokens (`bg-primary`, `text-muted-foreground`, etc.).

3. **Performance & Resilience Invariants**:
   - Strictly React Server Components (RSC) by default.
   - Next.js `next/image` with reserved `aspect-ratio` to avoid CLS.
   - Companion loading skeletons (`ShowcaseCardSkeleton`, `TestimonialCardSkeleton`).
   - Zero `framer-motion` (pure Tailwind CSS v4 keyframes and transitions).
