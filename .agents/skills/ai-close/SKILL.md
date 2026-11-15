---
name: ai-close
description: >-
  Concludes a Development Universe session, captures Next Steps handoff, and
  triggers memory governance.
---
# Session Close (ai-close)

Use this skill when concluding work in a Development Universe (DU) repository.
Target efficiency: **1 atomic tool turn** (or max 2 if staging memories) + **compact statusline** (≤8 lines, ~150 tokens).

1. **Review Open Steps & Next Steps (DEC-0047, Lean Inquiry)**:
   - **Session ID**: Use the ID from the runtime context banner (`Session SES-... active`). If absent or ambiguous, omit `--session` to allow the engine to resolve safely via binding. Do not run `dev session status`.
   - **Step Lookup**: If the completed step ID (`S-xxxxxx`) is known from session work, pass it directly to `--done`. Only run `dev steps list --query "<keyword>"` if searching for an unknown ID. Do not dump the full step list.
   - For each completed step, prepare `--done <ID>="<evidence observed>"` (evidence is mandatory: test output, commit). For obsolete ones: `--discard <ID>="<reason>"`. Invalid IDs abort close with nothing written.
   - Inspect recent user intent and formulate 1-3 concise, actionable `-n "<item>"` entries.
   - Do NOT edit `current-state.md` directly: pass `-n` to `dev session close`.

2. **Memory Governance, Transfers & Orchestration (Before Close, DEC-0046)**:
   - **Memory**: Propose durable candidates (`dev memory propose`) *before* closing. Later writes are discarded (`du: owned.record descartado`). `dev session commit` does not close the session.
   - **Transfers**: Register non-git settings via `dev transfers add/refresh` (never place secret values, passwords, hostnames, or IPs in the transfer book).
   - **Orchestration (DEC-0043)**: If active manifests exist in `$(git rev-parse --git-common-dir)/orchestrate/*.jsonl`, summarize outcomes under `## Orchestration Run` in the session log and remove operational manifests.

3. **Close & Synchronize Atomically (`--sync`)**:
   Execute session closure and multi-station synchronization in a **single atomic command** via `--sync`:
   ```bash
   dev session close --project <project-id> --session <session-id> --agent <agent-name> --summary "<Executive Summary>" [--done S-xxxxxx="<evidence>"]... [--discard S-xxxxxx="<reason>"]... -n "<Next Step 1>" -n "<Next Step 2>" --sync
   ```
   *(The MCP `close_session` tool does not take `--done`/`--discard`/`--sync`: use the CLI).*
   *(Fallback if `--sync` is unmounted: chain `dev session close ... && dev sync all`).*

   Commits session-owned changes under `du-sync.lock` (C-7), closes the session, and triggers object-based sync (`dev sync all`).
   `--project` is mandatory (C-2 [v4]). Passing `--session` and `--agent` ensures harness session binding parity (F-4).

4. **Emit Compact Closing Statusline (Anti-Slop Standard)**:
   Do NOT output verbose retrospective essays, multi-section summaries, diff tables, or file lists in conversational text. The canonical record is already persisted in `06-sessions/`. Emit strictly a compact statusline (≤8 lines, ~150 tokens) reflecting observable facts:
   ```markdown
   🏁 **Sessão Encerrada**: `<session-id>` (`<project-id>`)
   📝 **Nota Canónica**: [`<session-id>.md`](file:///absolute/path/to/session.md)
   ✅ **Passos Concluídos**: `S-xxxxxx` (Evidência verificada)
   ⏭️ **Próximos Passos**: `N` registados (Total pendente: `M`)
   🔄 **Sincronização**: `dev sync all` concluído (`Exit 0` ou `Offline tolerado Exit 13`)
   ```
   *(If sync returned non-zero error, replace the 🔄 line with: `🚨 Sync falhou (Exit N) → <next_command>`)*.

### `dev sync` Exit Codes & Recovery (D6)

| Code | Meaning | Repository State | Recovery Action (`next_command`) |
|---|---|---|---|
| 0 | Success | Integrated & published | — |
| 10 | Local uncommitted changes overlap with remote changes | **Unchanged** | Commit owning session: `dev session commit --session <owner>` and retry |
| 11 | Auto-merge conflict in log classes or ff-only mode | Unchanged | Check logs or update git: `dev sync repair --dry-run` |
| 12 | Human note or code conflict | Unchanged | Resolve conflicting file manually with clean tree |
| 13 | Network unreachable | Unchanged | Non-blocking offline mode: local session safely recorded |
| 14 | Lock busy (`du-sync.lock`) | Unchanged | Wait for active process to finish (inspect `.git/du-sync.owner.json`) |
| 16 | Wrong branch | Unchanged | Switch to canonical branch: `git switch <default_branch>` |
| 17 | Interrupted state detected | Known | Run safe idempotent repair: `dev sync repair` |

> [!CAUTION]
> Never use forbidden workarounds: staging all files (`add -A`), committing all (`-a`), `stash`, `--force`, `--no-verify`.
