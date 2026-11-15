# Design: Canonical Foundation Hardening

## Architectural Overview

This design addresses the findings of the three-way triangulated audit (Antigravity + Claude Code + Codex) to convert `ai-app-foundation` into a hardened, trustworthy seed repository for AI agents.

```
+------------------------------------------------------------------------------------+
|                                 ai-app-foundation                                  |
|                                                                                    |
|  +---------------------------+   +-----------------------+   +------------------+  |
|  | Next.js 16 App Router     |   | Standalone HTML Kit   |   | Canonical DB     |  |
|  | - Port: 4300 (CON-0020)   |   | - Shared du-runtime   |   | - SQLite WAL     |  |
|  | - Validação Zod Actions   |   | - tokens.css          |   | - Busy Timeout   |  |
|  | - Force Dynamic on Vault  |   | - XSS Escaping        |   | - Generic Schema |  |
|  +---------------------------+   +-----------------------+   +------------------+  |
+------------------------------------------------------------------------------------+
```

## Detailed Decisions & Mitigations

### 1. SQLite WAL Mode Guarantee
- **Mechanism**: SQLite in Prisma requires explicit activation because standard driver initialization does not issue `PRAGMA journal_mode = WAL`.
- **Implementation**: 
  - Extend `lib/db.ts` to execute a one-time connection pragma check using `$executeRawUnsafe('PRAGMA journal_mode = WAL;')` and `$executeRawUnsafe('PRAGMA synchronous = NORMAL;')`.
  - In `scripts/foundation-check.js`, enhance check to open `dev.db` via native `fs` and verify header bytes 18 & 19 equal `0x02, 0x02` or query `journal_mode`.

### 2. Port Allocation Compliance (CON-0020)
- **Constraint**: `CON-0020` assigns ports `4300–4399` to Frameworks and Sidecars (`ai-app-foundation` = `4300`). Ports `3000–3099` are strictly reserved for ad-hoc user tests.
- **Implementation**:
  - `package.json`: `"dev": "next dev -p 4300"`, `"start": "next start -p 4300"`.
  - `playwright.config.ts`: baseURL `http://localhost:4300`, webServer command `pnpm dev --port 4300` on port 4300.
  - `README.md`, `FOUNDATION.md`: Replace `localhost:3000` with `localhost:4300`.

### 3. XSS Remediation in Zero-Build HTML Kit
- **Vulnerability**: `datatable-fetch.js` performed `cell.innerHTML = value` and `_renderError` used unescaped HTML interpolation.
- **Implementation**:
  - Provide safe HTML entity escaping helper:
    ```javascript
    function escapeHtml(str) {
      return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
    ```
  - Use `escapeHtml()` on all dynamic data bindings in `datatable-fetch.js`.
  - Deduplicate `du-dashboard.html` and `du-html-app-template.html` by linking to `../tokens.css` and `../du-runtime.js`.

### 4. Server Action Validation & Schema Sanitization
- **Vulnerability**: In `app/(dashboard)/dashboard/atlas-actions.ts`, form entries were cast directly (`formData.get("title") as string`), and `parseInt` was unchecked, leading to `NaN` persistence crashes.
- **Implementation**:
  - Introduce deterministic schema validation with clear bounds:
    - `title`: non-empty string, max 100 chars.
    - `description`: optional string, max 500 chars.
    - `owner`: non-empty string, default "Developer", max 50 chars.
    - `progress`: integer between 0 and 100.
    - `status`: enum ("Active", "Planning", "Completed", "Archived").
  - Update `prisma/schema.prisma` to set `owner String @default("Developer")`.

### 5. Dynamic Rendering for DU Vault Pages
- **Vulnerability**: Pages reading local Vault fixtures or live files were statically generated (`○`), baking developer local state into `.next/` and producing stale data.
- **Implementation**:
  - Add `export const dynamic = 'force-dynamic';` and `export const revalidate = 0;` to:
    - `app/(dashboard)/dashboard/inspection/page.tsx`
    - `app/(dashboard)/dashboard/matrix/page.tsx`
    - `app/(dashboard)/dashboard/workflow/page.tsx`
    - `app/(dashboard)/dashboard/metrics/page.tsx`

### 6. Repair Recipes & Clean Docs
- Restore `recipes/postgres/recipe.json` as valid JSON structure conforming to recipe specification.
- Clean up `docs/`: remove foreign next-forge MDX files that belong to another monorepo project, preserving canonical documentation in markdown.

## Risk Analysis & Reversibility
- **Blast Radius**: Isolated to configuration, runtime scripts, and specific component/action handlers. Zero architectural breaking changes to core shadcn/ui or `@phosphor-icons/react` components.
- **Reversibility**: Full git reversibility.

---

## 🏛️ AI Council Review & Hardening Synthesis (`/ai-council`)

| Council Dimension | Evaluator Persona | Rating | Council Finding & Action Item |
| :--- | :--- | :---: | :--- |
| **Security Core** | The Red Teamer | **PASS (Remediated)** | Neutralize XSS in `datatable-fetch.js` by introducing strict HTML entity escaping before injection into DOM. Require bounded validation on Server Actions to prevent `NaN` or prototype pollution. |
| **Architecture & Cohesion** | The Software Architect | **PASS (Approved)** | Deduplicate HTML Kit by replacing inline scripts with imports to `du-runtime.js` and `tokens.css`. Align invariant count in `FOUNDATION.md` to 12. Enforce `force-dynamic` on Vault-backed pages. |
| **Resilience & Storage** | The Resilience Engineer | **PASS (Approved)** | Activate WAL via `PRAGMA journal_mode=WAL;` and `PRAGMA synchronous=NORMAL;` in `lib/db.ts` and test runner setup. Update `scripts/foundation-check.js` to inspect header bytes `02 02`. Ensure `.gitignore` ignores `*.db-wal` and `*.db-shm`. |
| **Ergonomics & UX/A11y** | The UI/UX Specialist | **PASS (Approved)** | Add baseline ARIA attributes (`aria-label`, `aria-expanded`) to interactive controls across the HTML Kit. Normalize author identity in Prisma schema to generic `Developer`. |

**Council Verdict**: Unanimous **PASS**. The hardening plan is approved for autonomous execution.

