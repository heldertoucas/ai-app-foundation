# Foundation Model

## ADDED Requirements

### Requirement: Shared vocabulary
The Foundation SHALL use Foundation, Stack, Component, Module, Blueprint, Kit, Starter Kit, Mockup, Recipe and Product as its only artifact terms.

#### Scenario: Retired term in active documentation
- **WHEN** active documentation describes an artifact as a Template or Vertical
- **THEN** the documentation review SHALL require the term Kit

### Requirement: Technology-neutral Blueprints
Each Blueprint SHALL define intent, layout, interactions and verifiable rules without depending on a Stack.

#### Scenario: Blueprint has too few Kits
- **WHEN** the manifest declares a Blueprint used by fewer than two Kits
- **THEN** `foundation-check` SHALL fail

### Requirement: Kit identity
Each Kit SHALL follow exactly one Blueprint and SHALL have an HTML implementation, a React implementation, or both.

#### Scenario: Kit exists in both Stacks
- **WHEN** a Kit has HTML and React implementations
- **THEN** the manifest SHALL record both under one Kit ID

#### Scenario: Kit has no implementation
- **WHEN** a Kit declares neither an HTML nor a React entry
- **THEN** `foundation-check` SHALL fail

### Requirement: Declared parity
Each Kit SHALL declare `full`, `partial`, `divergent` or `single-stack` parity.

#### Scenario: Partial parity without differences
- **WHEN** a Kit declares `partial` or `divergent` parity and lists no differences
- **THEN** `foundation-check` SHALL fail

#### Scenario: Structural parity
- **WHEN** a Kit implementation is rendered
- **THEN** it SHALL expose the `data-blueprint` value and required `data-region` markers of its Blueprint

### Requirement: Single inventory
The repository SHALL keep one `foundation.manifest.json` listing Blueprints, Kits, Modules and Recipes.

#### Scenario: Missing manifest path
- **WHEN** a manifest entry references a missing file
- **THEN** `foundation-check` SHALL fail

#### Scenario: Kit missing from catalog
- **WHEN** a manifest Kit is absent from the catalog
- **THEN** `foundation-check` SHALL fail

### Requirement: HTML Kit contract
Each HTML Kit SHALL work without a build step and SHALL comply with a strict Content Security Policy.

#### Scenario: Contract violation
- **WHEN** an HTML Kit contains an inline `style`, an inline event handler, a CDN dependency, an emoji, an unassigned port or an undefined `ui-*` or `du-*` class
- **THEN** `foundation-check` SHALL fail

#### Scenario: Offline opening
- **WHEN** an HTML Kit opens through `file://`
- **THEN** its core assets SHALL load without network access

### Requirement: Module and Recipe separation
A Module SHALL contain reusable executable behavior, and a Recipe SHALL contain instructions for changing project infrastructure.

#### Scenario: Reusable HTML behavior
- **WHEN** an HTML Kit needs a capability provided by a Module
- **THEN** the Kit SHALL use that Module or declare a `moduleExceptions` entry with the reason in the manifest

### Requirement: Backward-compatible paths
The migration SHALL preserve access to former HTML template URLs.

#### Scenario: Former URL opened
- **WHEN** a user opens a former template path over `http://` or `file://`
- **THEN** the page SHALL send the user to the new Kit location and show a visible link

#### Scenario: React route preserved
- **WHEN** React Kit files move
- **THEN** every existing public route SHALL keep its URL

### Requirement: Product boundary
A Product SHALL live outside the Foundation and SHALL keep a versioned copy of what it uses.

#### Scenario: Foundation folder unavailable
- **WHEN** a Product starts and the Foundation repository is absent
- **THEN** the Product SHALL still start

### Requirement: Canonical design rules
Every Kit SHALL comply with the MUST rules in `canon.md` for tokens, typography, accessibility, responsiveness, theme, security and offline behavior, unless the manifest declares an approved exception.

#### Scenario: Mobile page overflow
- **WHEN** a Kit page renders at a 390px viewport
- **THEN** the document SHALL have no horizontal scroll

#### Scenario: Status text contrast
- **WHEN** a status label renders in light or dark theme
- **THEN** its text SHALL meet WCAG AA contrast

#### Scenario: Single main landmark
- **WHEN** a Kit page renders
- **THEN** it SHALL contain exactly one `main` landmark

#### Scenario: Clean hydration
- **WHEN** a React route loads
- **THEN** the browser console SHALL contain no hydration error

### Requirement: Compliance register
The Foundation SHALL keep a compliance grade for each Stack, Kit, page, component, Module and Recipe using published rules.

#### Scenario: Migration phase closes
- **WHEN** a migration phase is completed
- **THEN** the affected register entries SHALL be regraded with evidence

### Requirement: Local command endpoint origin
The local command endpoint SHALL reject requests from external origins.

#### Scenario: External website sends a command
- **WHEN** a request with a non-local `Origin` reaches `/api/open-terminal`
- **THEN** the endpoint SHALL reject it without executing a command
