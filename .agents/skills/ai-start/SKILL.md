---
name: ai-start
description: >-
  Initializes a Development Universe session, presents Next Steps handoff, and
  retrieves dynamic Project context in 1 atomic turn.
---
# Session Start (ai-start)

Use this skill when initializing work in a Development Universe (DU) repository.
Target efficiency: **1 atomic tool turn** + **compact statusline** (≤8 lines, ~150 tokens).
Do NOT attempt to read `hot.md` or `.ai-session.json`.

1. **Atomic Session Start & Freshness Synchronization (DEC-0032 §1)**:
   Execute session initialization with sovereign pull synchronization in a single turn:
   ```bash
   dev session start <project-id> --sync
   ```
   *(Omitting `<project-id>` auto-resolves from the working directory).*

   #### Exit Code Guardrails:
   - **Code 0 (Success)**: Sovereign pull and session initialization completed cleanly. Proceed to Step 2.
   - **Code 13 (Offline)**: Non-blocking offline mode (`⚠️ Modo Offline`). Proceed locally over sovereign state.
   - **Code 14 (Lock busy)**: Active lock held. Inspect owner and wait; never force-delete locks.
   - **Code 10 (Overlap)**: Local dirty files overlap with remote changes. Commit owning changes with `dev session commit` before starting.
   - **Code 17 (Error)**: Network or sync error. Recover with `dev sync repair` if instructed.

2. **Inspect Context Capsule & Transfers**:
   - Inspect the returned Context Capsule (ephemeral runtime state; never persist as canonical).
   - Cross-station transfers (if pending) are already embedded in the capsule under `## 🔁 Cross-Station Transfers`.
   - Top-3 Next Steps with stable IDs (`S-xxxxxx`) and total pending count are provided in the capsule.

3. **Compact Startup Statusline**:
   Emit strictly a compact startup statusline (≤8 lines, ~150 tokens) acknowledging Project, Session, active constraints/decisions, and the top-3 steps before awaiting user instruction.
   Do NOT output verbose introductory retrospectives, multi-section rule explanations, or full step dumps.
