# Additional Conventions Beyond the Built-in Functions

As this project's AI coding tool, you must follow the additional conventions below, in addition to the built-in functions.

# Project Instructions: ai-app-foundation

## Product Vision
Canonical UI Foundation Kit for the Development Universe (`/ai-react-foundation` & `/ai-html-foundation`). Full-stack enterprise starter and reusable component catalog integrating Next.js 16, React 19, Tailwind CSS v4, Prisma 6, and shadcn/ui.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **UI & Runtime**: React 19, TypeScript 5
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`), Radix UI, Lucide / Phosphor Icons
- **Database & ORM**: Prisma 6 (`@prisma/client`, SQLite for dev/test)
- **Testing**: Vitest (unit/integration), Playwright (E2E)
- **Package Manager**: `pnpm`

## Architecture
- `app/`: Next.js App Router pages, layouts, and server actions.
- `components/`: Modular shadcn/ui components adhering to DU design standards.
- `prisma/`: Prisma schema and migration scripts.
- `scripts/`: Foundation compliance checkers (`foundation-check.js`).

## Build & Verification Commands
- **Environment Setup**: `pnpm setup` (copies `.env.example`, runs prisma push/generate, typechecks)
- **Dev Server**: `pnpm dev`
- **Build**: `pnpm build`
- **Type Check & Lint**: `pnpm lint` (or `pnpm typecheck`)
- **Unit Tests**: `pnpm test`
- **E2E Tests**: `pnpm test:e2e`
- **Foundation Health Check**: `pnpm foundation:check`

## Quality Gates & Invariants
- **React 19 & Tailwind v4 Compliance**: Utilize modern React 19 hooks and CSS theme variables.
- **Component Reusability**: Components must remain accessible (WCAG AA), responsive, and themeable (dark/light via `next-themes`).
