---
name: ai-health
description: >-
  Perform comprehensive system health checks and architectural compliance
  validation
---
# 🩺 System Health & Architecture Compliance (`/ai-health`)

Use this skill when checking ecosystem integrity or verifying that no architectural invariants are violated.

## Procedure
1. Run the 31-point healthcheck sweep:
   ```bash
   dev doctor
   ```
2. Validate registry files against schema definitions:
   ```bash
   dev validate
   ```
3. Check session identity (read-only):
   ```bash
   dev session status
   dev session gc --dry-run
   ```
   `doctor --check session_identity` warns about ghost sessions, a stale `DU_SESSION_ID`, and unclosed sessions that own files.
4. To probe hooks or timing **without reserving a session**, use `dev session bootstrap --no-reserve` (or `DU_NO_RESERVE=1`). A probe with a new harness `session_id` otherwise reserves a lock (87 ghosts on 2026-11-06).
5. Report any failures immediately to the user.
