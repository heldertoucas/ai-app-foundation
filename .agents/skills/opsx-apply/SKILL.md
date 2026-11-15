---
name: opsx-apply
description: >-
  Execute OpenSpec tasks with surgical minimal blast radius and AST-safe
  frontmatter preservation.
---
# ⚙️ OpenSpec: Apply Change Tasks (`/opsx-apply`)

Use this skill when implementing an approved OpenSpec specification.

## 1. Surgical Patching Standards (Zero-Scope-Creep)
When applying changes, strictly follow the 5 golden rules of minimal blast radius:
1. **Narrowest Responsible Layer**: Change strictly the mechanism that owns the incorrect behavior.
2. **Preserve Surrounding Code**: Never alter unrelated formatting, comments, or surrounding functions.
3. **Zero Aesthetic Cleanup**: Strictly forbid refactorings, renamings, or abstractions outside the explicit task scope.
4. **Focused Regression Proof**: Add only tests directly validating the implemented task.
5. **Immediate Stop Condition**: Stop making changes the second the task verification passes.

## 2. AST-Safe Specification Updates
When updating status, task checkboxes `[x]`, or appending execution notes to `.lite.md` or `tasks.md`:
- Prefer `obsidian_replace_section` via MCP `ai-obsidian` to guarantee YAML frontmatter and Johnny Decimal wikilinks remain completely intact without string-replacement corruption.

## 3. Evidence-Before-Check & Provenance (CON-0012)
1. **Mandatory Proof**: Never mark a task complete `[x]` without observable execution evidence from previous tool calls, compilations, or passing tests.
2. **Nested Execution Log**: Append an indented execution bullet directly beneath the completed task:
   `- *Executed YYYY-MM-DD*: <Brief summary of what changed and validation evidence/roadblocks>`
3. **Candidate Memory Reflection**: If reusable patterns, architectural decisions, or traps were encountered, stage them as candidates:
   ```bash
   dev memory propose "$TITLE" --type <decision|pattern|problem> --content "$CONTENT"
   ```
