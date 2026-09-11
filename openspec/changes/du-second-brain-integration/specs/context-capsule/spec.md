# 📋 Delta Spec: Context Capsule & Token Budget Inspector

* **Capability**: `context-capsule`
* **Parent Change**: `du-second-brain-integration`

---

## 1. Requirements

### 1.1 Context Dimension Radar Chart
* The system MUST render multi-axis telemetry for the active session's Context Capsule using `EvaluationRadarChart`.
* Axes MUST measure 5 core dimensions (0–100 scale):
  * `Relevance`: Semantic similarity score from vector retrieval.
  * `Temporal Recency`: Freshness score based on `valid_at` and session timestamp.
  * `Graph Adjacency`: Proportion of direct code graph neighbors included.
  * `Constraint Density`: Concentration of binding architectural constraints.
  * `Entity Coherence`: Absence of conflicting decisions or deprecated knowledge.

### 1.2 Token Budget & Health Gauges
* The system MUST calculate real-time token consumption across the agent context window.
* Breakdown categories:
  * System Invariants & Skill Instructions
  * Canonical Memory (`DEC-*`, `CON-*`, `PAT-*`)
  * Local Repository State & Diff Buffer
  * Available Headroom
* The `HealthGauge` component MUST visualize context window saturation and warn when token usage exceeds 80% of window limits.

### 1.3 Entity Provenance Inspector
* The page MUST list the exact entities injected into the active Context Capsule with clickable links to their vault sources.
