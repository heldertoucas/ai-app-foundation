# AI App Foundation

A local-first, free-first, Vercel-ready Next.js Turborepo template crafted for rapid, robust application development with AI coding agents.

Built on **next-forge** (architecture) and **shadcn/ui** (visual components).

## Features
- **Local-First & Free-First**: Runs immediately offline with zero mandatory cloud subscriptions.
- **Authentication**: Optional by default (`AUTH=OFF` / local developer session). Ready for Clerk / Better Auth when enabled.
- **Database**: Prisma with dual-mode architecture (local SQLite/PostgreSQL or cloud Neon).
- **AI-Ready**: Modular Vercel AI SDK supporting local LLMs (Ollama) and cloud providers (OpenAI, Gemini, Anthropic).
- **Design System**: Full `shadcn/ui` integration with dark mode and Tailwind CSS v4.
- **Quality Gates**: Vitest, TypeScript strict, and Biome linting.
- **Vercel Deployment**: 100% compatible with Vercel deployment pipeline out of the box.

## Quick Start
```bash
git clone https://github.com/heldertoucas/ai-app-foundation.git
cd ai-app-foundation
pnpm install
pnpm dev
```

## Quality Verification
```bash
pnpm typecheck
pnpm test
pnpm build
```
