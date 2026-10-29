# Foundation Navigation Architecture & Implementation Guide

> **Status**: Production Reference & Architectural Invariant  
> **Source**: `ai-app-foundation`  
> **Scope**: All Development Universe (DU) Next.js 16 / shadcn frontend applications  
> **Date**: 2026-09-11

---

## 1. Executive Overview

The Foundation Navigation architecture replaces rigid, hardcoded sidebar navigation structures with a **declarative, type-safe, configuration-driven system**.

### Key Architectural Benefits
- **Zero Component Mutation for New Pages**: Adding routes or reorganizing hierarchy is done exclusively in `config/navigation.config.tsx` without touching UI components.
- **Path-Aware Dynamic Highlighting**: Active menu items, parents, and sub-items are automatically highlighted based on Next.js 16 App Router `usePathname()`.
- **Synchronized Breadcrumbs**: `<DashboardBreadcrumb />` reads the exact same navigation configuration to dynamically construct breadcrumbs without repetitive layout code.
- **Modular Single-Operator Dock**: Replace generic SaaS user menus with a contextual footer dock (local database health, port telemetry, versioning, theme toggle).

---

## 2. Core Architecture Topology

```text
┌─────────────────────────────────────────────────────────────┐
│                 config/navigation.config.tsx                │
│  - AppNavigationConfig (Brand, Sections, Groups, Footer)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
  ┌─────────────────────────┐     ┌──────────────────────────┐
  │ components/             │     │ components/              │
  │ app-sidebar.tsx         │     │ dashboard-breadcrumb.tsx │
  │ - Brand Header          │     │ - Dynamic Path Matching  │
  │ - <NavMain sections>    │     │ - Hierarchical Crumb     │
  │ - <SidebarFooterRenderer│     └──────────────────────────┘
  └────────────┬────────────┘
               │
      ┌────────┴────────┐
      ▼                 ▼
┌──────────────┐  ┌────────────────────────┐
│ components/  │  │ components/            │
│ nav-main.tsx │  │ sidebar-footer-renderer│
│ - Collapsible│  │ - "system" (WAL/Port)  │
│ - Phosphor   │  │ - "user" (Operator)    │
│ - Code / Badg│  │ - "actions" / "none"   │
└──────────────┘  └────────────────────────┘
```

---

## 3. Data Contracts (`config/navigation.config.tsx`)

### Leaf Item (`NavLeafItem`)
Represents an actionable child link inside a collapsible group:
```typescript
export interface NavLeafItem {
  title: string;
  url: string;
  code?: string;          // e.g. "01", "02" numeric ordering prefix
  badge?: string | number;// Notification count or state badge
  exact?: boolean;        // Exact match required for active state
}
```

### Group Item (`NavGroupItem`)
Represents a collapsible parent category:
```typescript
export interface NavGroupItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
  isActive?: boolean;     // Default open state
  items?: NavLeafItem[];  // Sub-items
}
```

### Section (`NavSection`)
Represents a labeled top-level partition in the sidebar:
```typescript
export interface NavSection {
  id: string;
  label?: string;         // e.g. "UNIVERSE PLATFORM", "LIBRARY"
  items: NavGroupItem[];
}
```

### Footer Dock Configuration (`SidebarFooterConfig`)
Discriminated union supporting four operational modes:
```typescript
export type SidebarFooterConfig =
  | {
      type: "system";
      version?: string;
      statusText?: string;
      modeText?: string;
      showThemeToggle?: boolean;
      docsUrl?: string;
    }
  | {
      type: "user";
      user: OperatorProfileConfig;
    }
  | {
      type: "actions";
      showThemeToggle?: boolean;
      customNode?: React.ReactNode;
    }
  | {
      type: "none";
    };
```

---

## 4. Implementation Steps for Applications

When adapting this foundation navigation to any application workspace (such as `du-dashboard` or `rulesync-explorer`):

1. **Scaffold `config/navigation.config.tsx`**:
   - Define application-specific branding (`brand.name`, `brand.subtitle`, `brand.href`).
   - Construct domain sections and collapsible groups with Phosphor icons (`@phosphor-icons/react`).
   - Configure the footer dock mode (`system` with local port & database status).
2. **Add `components/sidebar-footer-renderer.tsx`**:
   - Renders SQLite status, version pill, theme toggle, and docs links.
3. **Add `components/dashboard-breadcrumb.tsx`**:
   - Matches `usePathname()` against the navigation tree for instant, zero-maintenance breadcrumbs.
4. **Update `components/nav-main.tsx`**:
   - Render sections dynamically, handle sub-item badges and numeric codes, and use `usePathname()` for active state.
5. **Update `components/app-sidebar.tsx`**:
   - Clean container accepting `config?: AppNavigationConfig`.
6. **Update `app/(dashboard)/layout.tsx`**:
   - Place `<DashboardBreadcrumb />` inside the header.

---

## 5. Quality Checklist
- [x] Strict TypeScript compliance (`pnpm typecheck` with zero errors).
- [x] Responsive layout collapses cleanly on mobile viewports.
- [x] Phosphor v2 imports without deprecated `*Icon` suffix.
- [x] Client components marked with `"use client"` only where state or hooks (`usePathname`) are used.
