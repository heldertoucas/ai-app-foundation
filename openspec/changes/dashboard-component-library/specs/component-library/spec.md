## Purpose

Provides an interactive component and design system catalog within the dashboard, allowing developers to inspect, configure, and copy pre-built dashboard primitives, cards, and UI patterns — with full dependency documentation — into new applications.

## ADDED Requirements

### Requirement: Interactive Component Catalog & Navigation as Master Hub
The system SHALL provide a dedicated `/dashboard/library` section accessible as the master catalog index via the application sidebar, displaying all dashboard framework components organized by category.

#### Scenario: User navigates to component library
- **WHEN** user clicks the Library entry in the application sidebar
- **THEN** the system loads the library overview displaying categories (Metrics, Charts, Matrix, Workflow, Inspection, Agents, Actions) with a search bar and category filter chips

#### Scenario: User filters components by search keyword
- **WHEN** user types a query (e.g. 'gauge' or 'diff') in the library search bar
- **THEN** the catalog instantly filters visible component cards matching the title, description, or tags

### Requirement: Dual-Mode Component Showcase with Requirements Block
The system SHALL provide an interactive preview tab and a syntax-highlighted code tab for every component, plus a requirements block listing shadcn CLI commands and peer dependencies.

#### Scenario: User views component requirements before copying
- **WHEN** user opens a component card
- **THEN** the system displays a Requirements section listing the shadcn CLI install command, peer npm/pnpm packages, and the full import statement needed to use the component

#### Scenario: User copies code snippet to clipboard
- **WHEN** user clicks the 'Copy Code' button on the Code tab
- **THEN** the system writes the complete import and JSX snippet to the clipboard and shows visual confirmation

### Requirement: Per-Card Error Boundary and Lazy Preview Loading
The system SHALL render each component preview inside an isolated error boundary and load chart-heavy components lazily to prevent page-wide crashes and bundle bloat.

#### Scenario: A preview component throws a runtime error
- **WHEN** a component in the catalog throws during preview render (e.g. due to mock data edge case)
- **THEN** only that card displays a safe fallback ("Preview unavailable") without affecting any other catalog entries

#### Scenario: Library page initial load
- **WHEN** user first navigates to /dashboard/library
- **THEN** chart-heavy previews (Recharts-based, matrix heatmap) are loaded asynchronously with loading placeholders, preventing a blocking 4MB bundle

### Requirement: Type Definitions & Props Inspector
The system SHALL document the TypeScript interface and prop types for each component archetype.

#### Scenario: User inspects component prop specifications
- **WHEN** user selects the 'Props' tab on a component card
- **THEN** the system renders a table listing prop names, types, default values, and behavioral descriptions

### Requirement: Isolated Mock Data per Component
The system SHALL provide fully self-contained mock data for every component preview, sourced from `lib/library/mocks/` — requiring no live database connection to render.

#### Scenario: Library page rendered on fresh checkout
- **WHEN** a developer opens /dashboard/library on a fresh clone without seeding the database
- **THEN** every component preview renders correctly using static mock data from the library mocks module
