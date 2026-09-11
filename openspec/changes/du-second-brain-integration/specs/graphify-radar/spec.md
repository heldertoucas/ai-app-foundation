# 📋 Delta Spec: Graphify God-Node & Code Intelligence Radar

* **Capability**: `graphify-radar`
* **Parent Change**: `du-second-brain-integration`

---

## 1. Requirements

### 1.1 God-Node Complexity Distribution
* The system MUST extract graph metrics from `graphify-out/` or compute module dependency centrality for repository TypeScript files.
* The top 10 most coupled files (highest combined in-degree and out-degree) MUST be rendered in `TargetDistributionBarChart`.
* Metrics per file:
  * In-degree (how many files import this file)
  * Out-degree (how many files this file imports)
  * Transitive risk score

### 1.2 Architectural Boundary Risk Warnings
* The system MUST detect architectural boundary cross-overs:
  * Client components attempting to import server-only packages.
  * Deep circular dependencies between feature folders.
* Violations MUST be surfaced with warning badges and actionable refactoring suggestions.

### 1.3 Interactive File Tree Navigation
* The `FileTreeNavigator` component MUST annotate the file hierarchy with coupling heat indicators, allowing developers to inspect high-risk files directly.
