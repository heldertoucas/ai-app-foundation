# 📋 Delta Spec: Invariant Compliance Matrix & Audit Inspector

* **Capability**: `compliance-matrix`
* **Parent Change**: `du-second-brain-integration`

---

## 1. Requirements

### 1.1 Invariant Heatmap Data Requirements
* The system MUST map the 14 DU Architectural Invariants (`DU-001` through `DU-014`) as columns across all tracked repositories and projects.
* Cell values MUST reflect discrete verification states:
  * `live`: Invariant passing with verified evidence.
  * `drift`: Invariant warning or minor non-compliance.
  * `missing`: Invariant failing or violation detected.
  * `unsupported`: Invariant not observable or not applicable.
* Each cell MUST carry metadata:
  * `severity`: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`
  * `explanation`: Human-readable violation reason or pass description.
  * `evidenceIds`: Array of session IDs or event IDs supporting the finding.

### 1.2 Interactive Delegated Hovercard Requirements
* The UI MUST use the root-delegated hovercard pattern in `CapabilityMatrixHeatmap` to display cell metadata without instantiating individual tooltip portals.
* The hovercard MUST display:
  * Invariant Title & Code (e.g. `DU-005: Prohibited Runtime State Files`)
  * Target project name
  * Current status badge with semantic color styling
  * Detailed audit explanation

### 1.3 Audit Log Navigation Requirements
* Clicking an interactive cell or selecting an initiative MUST provide a direct link to `/dashboard/inspection?session=<id>` or `/dashboard/inspection?invariant=<code>` to review raw evidence in the Markdown Reader.
