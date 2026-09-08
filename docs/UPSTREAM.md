# Upstream Maintenance & Tracking Guide

## 1. Upstream Origin

- **Upstream Repository**: [`vercel/next-forge`](https://github.com/vercel/next-forge)
- **Baseline Version**: `v6.0.2`
- **Baseline Commit**: Initial clone on March 2025

## 2. Core Customizations & Deltas

To minimize divergence and maintain easy upgradability from upstream:

1. **Package Manager (`package.json`, `pnpm-lock.yaml`)**:
   - Replaced Bun lockfile (`bun.lock`) with `pnpm` (v11 / Node.js standard).
   - Removed `bun --bun` invocation flags from scripts in `package.json`.

2. **Database Layer (`packages/database`)**:
   - Upstream uses `@prisma/adapter-neon` with Neon serverless PostgreSQL only.
   - Foundation provides dual-mode driver adapter:
     - Detects Neon endpoints and uses `PrismaNeon`.
     - Detects standard local PostgreSQL (`localhost:5432`) and uses `PrismaPg` with `pg.Pool`.
     - Ready for SQLite driver adapter without rewriting schema models.

3. **Authentication Layer (`packages/auth`)**:
   - Upstream blocks requests without `CLERK_SECRET_KEY`.
   - Foundation intercepts when `CLERK_SECRET_KEY` is undefined, returning a mock local developer session (`user_local_dev`) and skipping blocking middleware redirects.

4. **Third-Party SaaS Observability**:
   - Upstream enforces Sentry, PostHog, BetterStack, and BaseHub env variables during build.
   - Foundation treats all SaaS services as graceful no-ops when environment variables are missing.

## 3. How to Compare & Pull Upstream Updates

To sync upstream updates (e.g. new shadcn components, security headers):

```bash
# Add upstream remote if not already added
git remote add upstream https://github.com/vercel/next-forge.git

# Fetch latest upstream changes
git fetch upstream

# Compare changes against a specific package or file
git diff main upstream/main -- packages/design-system
git diff main upstream/main -- packages/security
```

## 4. Upstream Review Checklist for Future Updates

When syncing from upstream:
- [ ] Ensure `pnpm` remains the primary package manager.
- [ ] Verify `packages/database/keys.ts` does not re-introduce mandatory Neon tokens.
- [ ] Verify `packages/auth/server.ts` preserves the offline developer fallback.
- [ ] Verify `packages/cms` and observability packages do not break offline Turborepo builds.
- [ ] Run full quality gates: `pnpm typecheck && pnpm test && pnpm build`.
