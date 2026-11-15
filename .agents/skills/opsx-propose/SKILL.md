---
name: opsx-propose
description: >-
  Propose DU context-grounded changes with Second Brain RAG and dense
  retrieval-first writing rules.
---
# 📝 OpenSpec: DU-Grounded Proposal (`/opsx-propose`)

Use this skill when drafting a new change proposal in a repository managed by the Development Universe.

## 1. Pre-Flight Grounding (CON-0016)
1. Query active DU memory, constraints, and decisions:
   ```bash
   dev context --intent "$CHANGE_INTENT"
   ```
2. Query Second Brain semantic memory across the entire vault using `obsidian_rag_query` (MCP `ai-obsidian`):
   - Search for related prior projects, trap notes (`PRB-*`), or architectural decisions (`DEC-*`).
   - Ground the "Problem & Context" section directly in verified vault history.

## 2. Style & Writing Standards (Dense & Anti-Slop)
- **Retrieval Surface, Not an Essay**: Open every section with the concrete fact or decision. Zero preamble, narrative filler, or marketing adjectives (*robusto*, *inovador*).
- **Simple Sentences, Smart Structure**: Format as `[Actor] [Verb] [Object] [Literal Event]`. If an idea fits in one line, keep it in one line.
- **Scan Anchors**: Every load-bearing technical fact must sit on a scan anchor (bold lead-in, file path first, fenced code block, or comparison table). Never bury critical parameters mid-paragraph.

## 3. Proposal Artifact Generation
Write to `openspec/proposals/YYYYMMDD-<change-title>.md`:
```yaml
---
title: "<Proposal Title>"
type: proposal
status: proposed
project: <PRJ-ID>
created: "YYYY-MM-DD"
relevant_decisions: ["DEC-XXXX"]
relevant_constraints: ["CON-XXXX"]
---
```
Sections:
- **Problem & Context**: Grounded in project state and Second Brain RAG findings.
- **Proposed Solution**: Architectural components and boundary definitions.
- **Impacted Files & Repositories**: Concrete relative paths.
- **Non-Goals & Alternatives**: Strict boundaries preventing scope creep.

Present the proposal for human confirmation before proceeding to specification.
