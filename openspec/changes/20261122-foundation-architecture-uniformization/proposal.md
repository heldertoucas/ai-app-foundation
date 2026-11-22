---
title: "Migração da AI App Foundation para o modelo Foundation, Blueprints, Stacks, Kits e Products"
type: proposal
status: proposed
project: PRJ-0024
created: "2026-11-22"
updated: "2026-11-22"
relevant_decisions: ["DEC-0027", "DEC-0069"]
relevant_constraints: ["CON-0020", "CON-0038"]
related_patterns: ["PAT-0104", "PAT-0105", "PAT-0174"]
related_projects: ["PRJ-0030"]
artifacts: ["canon.md", "compliance-register.md", "design.md", "tasks.md", "stress-test.md", "foundation-map.md", "specs/foundation-model/spec.md"]
decisions_status: open
---

# Migração da AI App Foundation

## Why

**Facto central:** a Foundation promete a mesma experiência em HTML e React, mas não tem uma linguagem comum nem uma forma de provar essa paridade.

- **Vocabulário:** "Blueprint" tem 4 sentidos. "Kit" nomeia hoje a tecnologia. "Template", "Vertical" e "Recipe" sobrepõem-se.
- **Catálogo:** o filtro mistura tecnologia, domínio e tipo de artefacto.
- **Reutilização:** nenhum template HTML usa as 4 recipes HTML. A Avaliação HTML reimplementa o PIN.
- **Qualidade:** 3 templates usam 28 classes sem definição. Os 7 templates têm 462 atributos `style` e 59 `onclick`.
- **Verificação:** `foundation:check` não deteta estes problemas e falha num checkout limpo.
- **Prova:** [`stress-test.md`](./stress-test.md) regista cada pressuposto testado.
- **Conformidade:** [`compliance-register.md`](./compliance-register.md) classifica Stacks, Kits, páginas, componentes, Modules e Recipes.
- **Cânone:** [`canon.md`](./canon.md) define taxonomia, nomes, Blueprints, layouts e regras de design.

## What Changes

### Modelo aprovado em conversa

```text
FOUNDATION   filosofia, linguagem de design, vocabulário
│
├── BLUEPRINTS   o plano: UX, layout, regras (sem tecnologia)
│
├── HTML STACK ─┐
└── REACT STACK ┴─ tecnologia base → components → modules → KITS
                                                             │
                                                      PRODUCTS (fora)
```

| Termo | Significado | Exemplo |
|---|---|---|
| **Foundation** | O sistema completo e a sua promessa | AI App Foundation |
| **Stack** | A tecnologia usada para construir | HTML, React |
| **Component** | Peça visual reutilizável | Button, KPI card |
| **Module** | Funcionalidade reutilizável com comportamento | PIN lock, telemetria |
| **Blueprint** | Plano de um tipo de experiência | Dashboard, Cockpit, Website |
| **Kit** | Construção pronta a copiar de um blueprint | Avaliação |
| **Starter Kit** | Kit vazio de um blueprint | Dashboard Starter |
| **Mockup** | Imagem de referência de um blueprint | Dashboard clean |
| **Recipe** | Guia para alterar infraestrutura | Postgres, Vercel |
| **Product** | Aplicação real, fora da Foundation | Sentinel |

**Termos removidos:** Template e Vertical passam a Kit. "HTML Kit" e "React Kit" passam a HTML Stack e React Stack.

### Regras do modelo

1. **Um Kit segue exatamente um Blueprint.**
2. **Um Kit tem uma identidade e uma ou duas implementações** (HTML, React).
3. **Um Blueprint só existe com pelo menos dois Kits.**
4. **A paridade é declarada:** cada Kit indica `full`, `partial`, `divergent` ou `single-stack`.
5. **Uma fonte de verdade:** os Products copiam e verificam a cópia. Não há pacotes partilhados.

### Inventário alvo

| Blueprint | Kit | React | HTML | Paridade |
|---|---|---|---|---|
| **Dashboard** | `dashboard-starter` | não existe | `template-app-shell.html` | single-stack |
| **Dashboard** | `mission-control` | `/dashboard` | `du-dashboard.html` | divergent |
| **Cockpit** | `cockpit-starter` | não existe | `starter-cockpit.html` | single-stack |
| **Cockpit** | `avaliacao` | `/avaliacao-dashboard` | `du-avaliacao-dashboard.html` | partial |
| **Website** | `website-starter` | `/` | não existe | single-stack |
| **Website** | `futuro-digital` | `/futuro-digital` | `du-futuro-digital*.html` | partial |

### Entregas

- **Manifesto único:** `foundation.manifest.json` regista blueprints, kits, modules e recipes.
- **HTML Stack:** `public/html-kit/` passa a `public/html/`, com `core/`, `modules/` e `kits/`.
- **React Stack:** as rotas mantêm-se. Os componentes de domínio passam a `components/kits/`.
- **Blueprints:** `public/blueprints/<id>/` guarda a especificação e os mockups.
- **Catálogo:** organizado por Blueprint, com filtro separado de Stack.
- **Verificação:** `foundation:check` valida manifesto, contrato e paridade declarada.
- **Sentinel:** passa a Product do Blueprint Cockpit, depois de D2.

### Decisões

| ID | Decisão | Estado |
|---|---|---|
| **D1** | Sentinel é Product. O Mission Cockpit proposto dá origem ao Blueprint Cockpit e a um Kit | Aprovada pelo utilizador, falta `/ai-decide` |
| **D2** | Regras do HTML que alteram o design do Sentinel | **Aberta**, bloqueia M8 |
| **D3** | Migração completa em fases independentes | Aprovada pelo utilizador, falta `/ai-decide` |
| **D4** | `du-dashboard.html` carrega `core/` | Aprovada pelo utilizador, falta `/ai-decide` |
| **D5** | Emenda à DEC-0027, PAT-0104 e PAT-0105 | Aprovada pelo utilizador, a executar em WP-72 |
| **D6** | Geist local nas duas Stacks | Aprovada pelo utilizador, falta `/ai-decide` |
| **D7** | Interface em pt-PT | Aprovada pelo utilizador, falta `/ai-decide` |
| **D8** | Futuro Digital com recursos locais e só tema claro | Aprovada pelo utilizador, falta `/ai-decide` |
| **D9** | Mission Control segue uma nova especificação comum | Aprovada pelo utilizador, falta `/ai-decide` |

**Execução:** [`execution/README.md`](./execution/README.md) contém os pacotes de trabalho para agentes.

As opções de D2 mantêm-se como definidas na versão anterior desta proposta. As opções de D4 estão em [`design.md`](./design.md).

## Impact

**`ai-app-foundation` (REP-0023):**

- `foundation.manifest.json` (novo)
- `public/html-kit/**` → `public/html/**`
- `public/blueprints/**` (novo)
- `public/templates-index.html` (symlink substituído)
- `components/avaliacao-dashboard/**`, `components/futuro-digital/**` → `components/kits/**`
- `lib/avaliacao/**` → `lib/kits/avaliacao/**`
- `app/api/open-terminal/route.ts`, `scripts/foundation-check.js`, `scripts/capture-all-screenshots.js`
- `components/avaliacao-dashboard/session-header.tsx`
- `docs/html-foundation.md`, `docs/README.md`, `README.md`, `FOUNDATION.md`, `AGENTS.md`

**`sentinel` (REP-0029), só em M8:** `index.html`, `app.css`, `app.js`, `web_server.py`.

**Vault, só por governação:** DEC-0027, PAT-0104, PAT-0105 e a fonte RuleSync de `ai-html-foundation` e `ai-ui-foundation`.

## Non-Goals & Alternatives

**Non-Goals:**

- Partilhar código de componentes entre React e HTML.
- Criar os Kits em falta só para obter simetria.
- Mudar URLs das rotas React.
- Mover ou renomear `components/ui` e `components/dashboard`.
- Introduzir Tailwind, npm, CDN ou compilação na HTML Stack.
- Migrar `du-dashboard`, `social-manager` ou `academia-digital`.
- Restaurar ou apagar os ficheiros pendentes em `.agents/` sem revisão humana.
- Alterar memória canónica sem o ciclo de revisão.

**Alternativas rejeitadas:**

| Abordagem | Motivo |
|---|---|
| Pacotes partilhados | Viola o invariante 1 (aplicação única) |
| Gerar o catálogo a partir do manifesto | Acrescenta compilação à HTML Stack |
| Ler o manifesto com `fetch` no catálogo | Falha quando a página abre em `file://` |
| Redirects só em `next.config.ts` | Não funcionam em `file://` |
| Blueprint próprio para Galeria | Só tem um Kit, logo falha a regra 3 |
| Mover rotas React para `kits/` | O App Router exige as rotas em `app/` |
