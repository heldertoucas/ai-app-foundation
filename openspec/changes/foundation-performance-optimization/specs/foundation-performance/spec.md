## Purpose

Establishes performance, execution efficiency, and resource optimization standards across the foundation template, ensuring fast dev server boot, non-blocking test execution on Windows, unified icon asset usage, and smooth viewport hydration.

## ADDED Requirements

### Requirement: Next.js Native Package Import Rewriting
The system SHALL optimize heavy third-party barrel packages at compile time using Next.js native import rewriting to prevent full module graph traversal during development and build phases.

#### Scenario: Dev server cold start and incremental compilation
- **WHEN** the developer executes next dev or visits a dashboard route importing icons or charts
- **THEN** the compiler transforms barrel imports for @phosphor-icons/react and recharts into direct module requests, cutting cold start parsing overhead without requiring manual deep-import path changes in component code

### Requirement: Windows-Resilient Decoupled Test Runner Execution
The system SHALL execute automated unit and component tests using lightweight worker threads while strictly isolating SQLite database operations to prevent Windows child-process starvation and file-lock contention.

#### Scenario: Running full test suite on Windows
- **WHEN** developer or CI executes pnpm test
- **THEN** pure unit tests and component tests execute in parallel worker threads, completing the test collection and assertion cycle in under 15 seconds without process deadlock
- **AND** SQLite database tests run with single-fork isolation to guarantee database file consistency

### Requirement: Unified Icon Toolkit Standard
The system SHALL enforce a single icon library (@phosphor-icons/react) across all template components and documentation pages, prohibiting secondary icon dependencies.

#### Scenario: Application build and dependency verification
- **WHEN** the project runs dependency audits and production compilation (pnpm build)
- **THEN** only @phosphor-icons/react is present in production dependencies for icons, eliminating redundant Lucide packages and reducing node_modules and AST footprint

### Requirement: Viewport Lazy Hydration for Component Showcase
The system SHALL defer rendering and initialization of chart-heavy and SVG-intensive previews on the continuous component catalog until the items enter or approach the visible browser viewport.

#### Scenario: User navigates to continuous component library
- **WHEN** user loads /dashboard/library
- **THEN** off-screen Recharts visualizations, heavy tables, and complex composite client views mount lazily upon scroll proximity rather than mounting all 32 archetypes simultaneously at initial page load
