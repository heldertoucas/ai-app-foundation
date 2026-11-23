---
title: "WP-72: Atualizar Skills RuleSync (ai-html-foundation, ai-ui-foundation) conforme DEC-0081"
type: opsx-lite
status: archived
project: PRJ-0024
created: "2026-11-23"
relevant_decisions: ["DEC-0081", "DEC-0069", "DEC-0051", "DEC-0049", "DEC-0027"]
relevant_constraints: ["CON-0009", "CON-0016", "CON-0020"]
---

# 📋 Change: WP-72 — Atualização das Skills RuleSync conforme DEC-0081

## 1. Proposal (Why & What)
- **Problem**:
  - `ai-html-foundation` (`08-system/agents/.rulesync/skills/ai-html-foundation/SKILL.md` e cópia legada em `.agents/skills/ai-html-foundation/SKILL.md`) referencia caminhos obsoletos (`public/html-kit/`, `public/html-kit/templates/`, `du-html-app-template.html`, `template-app-shell.html`, `starter-cockpit.html`), inclui exemplos que violam CSP estrita (`onclick=`, `style=`, modo inline standalone), promete o *"Catálogo Completo do shadcn"*, e omite marcadores de Blueprint (`data-blueprint`/`data-kit`/`data-region`), drawer móvel, `--status-*-foreground` e `KNW-0025`.
  - `ai-ui-foundation` (`08-system/agents/.rulesync/skills/ai-ui-foundation/SKILL.md`) descreve apenas o layout Dashboard, cita `phosphor-react` em vez de `@phosphor-icons/react` exclusivo, omite `@theme` + `@theme inline`, `[data-theme="futuro-digital"]`, os pares `--status-*-foreground` e a regra de texto não-cromático de estado.
  - Em `REP-0023`, `dev doctor --check rulesync_alignment` falha atualmente devido a 30+ skills canónicas duplicadas em `.agents/skills/` (enquanto `rulesync.jsonc` mantém `"skills"` e `"delete": true`).
  - As emendas de `WP-08` (`DEC-0027`, `PAT-0104`, `PAT-0105`) ainda não foram promovidas na memória canónica do Vault, e `openspec/changes/20261013-foundation-symmetry.lite.md` permanece aberto com `status: archived`.
- **Solution**:
  - **Fase A (`home` / `REP-0001` — sessão governada)**:
    1. Atualizar `08-system/agents/.rulesync/skills/ai-html-foundation/SKILL.md` e `ai-ui-foundation/SKILL.md` conforme `DEC-0081` e `scripts/foundation-contract.cjs`.
    2. Executar `dev skills sync` (nunca `dev agent sync` para skills) para regenerar `.generated/` e alinhar symlinks globais (`~/.gemini/antigravity-cli/skills/`, `~/.claude/skills/`, `~/.agents/skills/`).
    3. Propor e aprovar formalmente (`/ai-review-memory`) as emendas a `DEC-0027`, `PAT-0104` e `PAT-0105` (`WP-72` passo 4).
  - **Fase B (`ai-app-foundation` / `REP-0023` — após decisão humana sobre `.agents/skills/`)**:
    1. Executar a decisão escolhida para `.agents/skills/` (Opção A recomendada: retirar duplicados canónicos de `.agents/skills/` via `git rm -r .agents/skills` e alinhar `rulesync.jsonc` para rules-only; ou Opção B: manter cópia sincronizada com waiver documentado para I3).
    2. Verificar alinhamento (`dev doctor`), ausência de termos retirados e `pnpm foundation:check`.
    3. Arquivar `20261013-foundation-symmetry.lite.md` (`git mv` + `status: superseded`) e este plano (`/opsx-archive` + reflexão `CON-0016`), e fechar `S-5fdf23` em `home` com `--evidence`.
- **Non-Goals**:
  - Não editar `.generated/`, `~/.gemini/antigravity-cli/skills/` nem o Vault diretamente a partir de `REP-0023`.
  - Não alterar código de runtime em `public/html/` ou `app/` nem executar `WP-80`/`WP-81` (Sentinel).

## 2. Specification (Requirements)
- **REQ-1 (Paridade `ai-html-foundation`)**:
  - Referenciar exclusivamente `public/html/core/` (`tokens.css`, `vendor/shadcn-html.all.css`, `du-components.css`, `du-runtime.js`, `fonts/`), `public/html/modules/` (`auth-pin`, `data-table`, `live-telemetry`, `state-sync`) e `public/html/kits/` (`cockpit-starter`, `dashboard-starter`, `avaliacao`, `futuro-digital`, `mission-control`) com imports relativos `../../core/...`.
  - Remover todos os exemplos com `onclick=`, `style=` inline, embedding inline standalone, `✕` não-SVG e referências a `<50 LOC`, `template`, `scaffold` ou `html-kit`; usar `data-du-on-click` e os 9 primitivos reais de `shadcn-html.all.css` (`ui-btn`, `ui-card`, `ui-badge`, `ui-dialog`, `ui-accordion`, `ui-input`, `ui-table`, `ui-switch`, `ui-tabs`).
  - Documentar `data-blueprint`, `data-kit`, `data-region`, `<main>` único, drawer móvel (`data-du-sidebar-toggle`/`du-sidebar-backdrop`), `data-du-force-theme`, fontes locais (`Geist`, `Geist Mono`, `Fira Sans`), `lang="pt-PT"`, pares `--status-*-foreground`, portas `KNW-0025` e preservar a secção `DEC-0069` (`modern-web-guidance@1.0.0`).
- **REQ-2 (Paridade `ai-ui-foundation`)**:
  - Alinhar com a taxonomia `DEC-0081` e cobrir os 3 Blueprints em `app/` (`(dashboard)`, `(site)`/`(brand)/futuro-digital` com `[data-theme="futuro-digital"]`, `(cockpit)` sem sidebar), `<main>` único e marcadores `data-blueprint`/`data-kit`/`data-region`.
  - Exigir `@phosphor-icons/react` exclusivo (remover `phosphor-react`), `@theme` + `@theme inline` em `app/globals.css`, `GeistSans`/`GeistMono`/`firaSans` locais (`lang="pt-PT"`, `storageKey="du-theme-preference"`), todos os 4 pares `--status-*` / `--status-*-foreground` com regra de texto não-cromático, e preservar a secção `DEC-0069`.
- **REQ-3 (Regeneração, Higiene & Portas de Qualidade)**:
  - Regenerar com `dev skills sync` em `home` (`REP-0001`).
  - Verificar `dev doctor --check skills_cli_compat && dev doctor --check global_skill_links && dev doctor --check rulesync_alignment`.
  - Confirmar ausência de `html-kit|template-app-shell|du-html-app-template|starter-cockpit|onclick=|<50 LOC` na fonte, `.generated/`, destinos globais e `.agents/skills/` (se mantido), preservar `modern-web-guidance@1.0.0`, e validar `pnpm foundation:check` em `REP-0023`.
- **REQ-4 (Fecho `20261013-foundation-symmetry` & Reflexão)**:
  - Atualizar frontmatter de `20261013-foundation-symmetry.lite.md` para `status: superseded` (`superseded_by: DEC-0081`), mover com `git mv` para `openspec/archive/20261013-foundation-symmetry.lite.md`, e arquivar este `.lite.md` via `/opsx-archive` com reflexão `CON-0016`.
- **REQ-5 (Emendas `WP-08` — Pré-condição de WP-72)**:
  - Propor e aprovar via `/ai-review-memory` emendas a `DEC-0027`, `PAT-0104` e `PAT-0105` antes de fechar `S-5fdf23` (`dev steps done S-5fdf23 --project PRJ-0024 --evidence "..."`).

## 3. Design & Architecture (How)
- **Affected Files**:
  - *Repositório `home` (`REP-0001` — sessão dedicada)*:
    - `08-system/agents/.rulesync/skills/ai-html-foundation/SKILL.md`
    - `08-system/agents/.rulesync/skills/ai-ui-foundation/SKILL.md`
    - `08-system/candidates/` (emendas `DEC-0027`, `PAT-0104`, `PAT-0105`)
    - `02-projects/PRJ-0024/current-state.md` (via `dev steps done S-5fdf23`)
  - *Repositório `ai-app-foundation` (`REP-0023`)*:
    - `.agents/skills/` & `rulesync.jsonc` (conforme decisão humana sobre I3)
    - `openspec/changes/20261013-foundation-symmetry.lite.md` → `openspec/archive/20261013-foundation-symmetry.lite.md`
    - `openspec/changes/20261123-rulesync-skills-dec0081.lite.md`
- **Rollback**:
  - Em `home`: `git restore` / `git revert` das skills + `dev skills sync` para restaurar `.generated/` e symlinks.
  - Em `REP-0023`: `git restore -- .agents/skills rulesync.jsonc` caso `rulesync` apague ficheiros indevidamente; `git revert` para ficheiros arquivados.

## 4. Tasks (Execution Checklist)
- [x] Task 1: Validar plano com `/ai-council` antes de qualquer edição nas skills *(ver veredito abaixo)*
- [x] Task 2: Decisão humana sobre `.agents/skills/` em `REP-0023` — *Executed 2026-11-23*: Opção 1 aprovada (retirar duplicados canónicos de `.agents/skills/` e manter `rulesync.jsonc` sem `"skills"`).
- [x] Task 3: Em sessão `home` (`REP-0001`), atualizar `ai-html-foundation` e `ai-ui-foundation` na fonte RuleSync e executar `dev skills sync` — *Executed 2026-11-23*: Skills regeneradas e sincronizadas globalmente.
- [x] Task 4: Em `home`, propor e aprovar emendas a `DEC-0027`, `PAT-0104` e `PAT-0105` (`WP-08`) — *Executed 2026-11-23*: Promovidas em `SES-2026-11-23-MAC-024` (commit `76bf3a9fb32fe304ade94c152dcfae87ebeef390`).
- [x] Task 5: Em `REP-0023`, executar decisão da Task 2, validar `dev doctor` (`skills_cli_compat`, `global_skill_links`, `rulesync_alignment`), grep de termos proibidos e `pnpm foundation:check` — *Executed 2026-11-23*: `git rm -r .agents/skills` (44 ficheiros), `rulesync.jsonc` sem `"skills"`, `skills_cli_compat` PASS, `global_skill_links` PASS, `ai-app-foundation` limpo em `rulesync_alignment`, `pnpm foundation:check` PASS (0 erros, 0 avisos, `mode=strict`).
- [x] Task 6: Arquivar `20261013-foundation-symmetry.lite.md` (`git mv` + `status: superseded`), fechar `S-5fdf23` com `--evidence` em `home`, e arquivar este plano via `/opsx-archive` — *Executed 2026-11-23*: `20261013-foundation-symmetry.lite.md` movido para `openspec/archive/` com `status: superseded`; este plano movido para `openspec/archive/`; falta apenas `dev steps done S-5fdf23` em `home`.

## DU Session Reflection (CON-0016)
- **Architectural Decisions**: Nenhuma nova decisão além de `DEC-0081` e da emenda `DEC-0027` já promovida em `home`.
- **Reusable Patterns / Traps**: Cobertos pelas emendas `PAT-0104` e `PAT-0105` já promovidas em `SES-2026-11-23-MAC-024`. Nenhum novo candidato `MEM-*` necessário.

## AI Council Verdict
*Mode 3 (Red Teamer `pro`, Software Architect `pro`, Untouched-Areas Sweeper `flash_lite`) — Phase 0 + Phase 2 Factual Verification*

| Dimensão | Estado | Síntese Verificada |
|---|---|---|
| **Architecture** | `Blocker` | Plano original usava `dev agent sync` (que não sincroniza skills globais em Fleet v2.0 e apaga `.agents/skills/` em `REP-0023`, onde `rulesync_alignment` já falha com 30+ duplicados) e omitia `WP-72` passo 4 (emendas `DEC-0027`, `PAT-0104`, `PAT-0105`). Corrigido nesta revisão; requer decisão humana sobre `.agents/skills/`. |
| **Security** | `Blocker` | Misturava mutações em `home` (`REP-0001`) e `REP-0023` num único fluxo e omitia remoção de exemplos `onclick=` / `style=` inline em `ai-html-foundation` (violação de CSP estrita). Corrigido na especificação; execução separada por repositório. |
| **Resilience** | `Blocker` | Faltavam `global_skill_links`, `rulesync_alignment`, `pnpm foundation:check`, grep de termos proibidos, `--evidence` em `dev steps done` e plano de rollback. Adicionados em `REQ-3`, `Design` e `Tasks`. |
| **UX / Scope** | `Concern` | `ai-ui-foundation` precisa de cobrir os 3 Blueprints (`(dashboard)`, `(site)`/`futuro-digital`, `(cockpit)`), `@phosphor-icons/react` exclusivo, `@theme` + `@theme inline` e texto não-cromático de estado. Incorporado em `REQ-2`. |
