---
title: "Design da migração Foundation"
type: design
status: proposed
project: PRJ-0024
created: "2026-11-22"
change: 20261122-foundation-architecture-uniformization
---

# Design da migração

## 1. Estrutura alvo

```text
foundation.manifest.json          fonte única do inventário

public/
├── blueprints/
│   ├── dashboard/  README.md  mockups/
│   ├── cockpit/    README.md  mockups/
│   └── website/    README.md  mockups/
├── html/
│   ├── index.html                catálogo
│   ├── core/                     tokens.css, du-components.css, du-runtime.js, vendor/
│   ├── modules/                  auth-pin-lock, datatable-fetch, localstorage-state, sse-telemetry
│   └── kits/
│       ├── dashboard-starter/index.html
│       ├── mission-control/index.html
│       ├── cockpit-starter/index.html
│       ├── avaliacao/index.html
│       └── futuro-digital/index.html, galeria.html
├── html-kit/templates/*.html     páginas de redirecionamento
└── templates-index.html          página de redirecionamento

app/(dashboard)/, app/(site)/     rotas React, sem alteração de URL
components/ui/                    primitivos
components/dashboard/, web/       components reutilizáveis
components/kits/avaliacao/        antes components/avaliacao-dashboard/
components/kits/futuro-digital/   antes components/futuro-digital/
lib/kits/avaliacao/               antes lib/avaliacao/
lib/du/                           module du-connector
recipes/                          ai, auth, postgres, vercel
```

## 2. Mapa de migração

| Origem | Destino |
|---|---|
| `public/html-kit/tokens.css` | `public/html/core/tokens.css` |
| `public/html-kit/du-components.css` | `public/html/core/du-components.css` |
| `public/html-kit/du-runtime.js` | `public/html/core/du-runtime.js` |
| `public/html-kit/vendor/` | `public/html/core/vendor/` |
| `public/html-kit/recipes/*` | `public/html/modules/*` |
| `public/html-kit/index.html` | `public/html/index.html` |
| `templates/template-app-shell.html` | `kits/dashboard-starter/index.html` |
| `templates/du-dashboard.html` | `kits/mission-control/index.html` |
| `templates/starter-cockpit.html` | `kits/cockpit-starter/index.html` |
| `templates/du-avaliacao-dashboard.html` | `kits/avaliacao/index.html` |
| `templates/du-futuro-digital.html` | `kits/futuro-digital/index.html` |
| `templates/du-futuro-digital-galeria.html` | `kits/futuro-digital/galeria.html` |
| `templates/du-html-app-template.html` | `public/blueprints/dashboard/mockups/reference.html` |
| `examples/du-clean-dashboard-mockup.html` | `public/blueprints/dashboard/mockups/clean.html` |
| `examples/du-cockpit-mockup.html` | `public/blueprints/dashboard/mockups/mission-control.html` |

**Nota:** `du-cockpit-mockup.html` tem barra lateral e título Mission Control. Pertence ao Blueprint Dashboard, apesar do nome.

**Recipes:** as 4 pastas HTML passam a Modules porque têm código executável. As 4 pastas React continuam Recipes porque só têm instruções. `recipe.json` passa a `module.json` nas pastas HTML.

## 3. Manifesto

`foundation.manifest.json` é lido por `foundation-check`. O catálogo continua em HTML estático, e a verificação falha se faltar uma entrada.

```json
{
  "schemaVersion": 1,
  "blueprints": [
    { "id": "cockpit", "name": "Cockpit", "spec": "public/blueprints/cockpit/README.md" }
  ],
  "kits": [
    {
      "id": "avaliacao",
      "name": "Avaliação",
      "blueprint": "cockpit",
      "starter": false,
      "parity": "partial",
      "html": { "entry": "public/html/kits/avaliacao/index.html" },
      "react": { "route": "/avaliacao-dashboard", "entry": "app/(site)/avaliacao-dashboard/page.tsx" },
      "differences": ["React usa servidor e base de dados; HTML funciona offline"]
    }
  ],
  "modules": [
    { "id": "auth-pin-lock", "stack": "html", "path": "public/html/modules/auth-pin-lock" }
  ],
  "recipes": [
    { "id": "postgres", "path": "recipes/postgres" }
  ]
}
```

## 4. Contrato de Blueprint

Cada `README.md` tem no máximo uma página e define:

- **Intenção:** para quem é e que tarefa resolve.
- **Layout:** regiões obrigatórias e comportamento em telemóvel.
- **Interações:** tema, navegação, teclado e estados vazio, carregamento e erro.
- **Regras verificáveis:** marcadores estruturais que cada Kit tem de expor.

**Marcadores:** cada implementação expõe `data-blueprint="<id>"` e `data-region="<região>"`. `foundation-check` valida estes atributos nos Kits HTML. Um teste Playwright valida-os nas rotas React.

| Blueprint | Regiões obrigatórias |
|---|---|
| **Dashboard** | `sidebar`, `topbar`, `content` |
| **Cockpit** | `topbar`, `summary`, `content` |
| **Website** | `header`, `hero`, `sections`, `footer` |

## 5. Contrato de Kit HTML

- **Sem compilação:** sem npm, Node, CDN ou Tailwind.
- **CSP rigorosa:** sem `onclick` nem atributos `style`.
- **Tokens:** cores definidas só em ficheiros de tema.
- **Classes:** cada `ui-*` e `du-*` tem definição em `core/` ou no Kit.
- **Ícones:** SVG outline, sem emojis.
- **Portas:** só valores atribuídos em KNW-0025.
- **Descoberta:** presente no manifesto e no catálogo.

**Mockups:** ficam fora deste contrato porque não são pontos de partida. Os dois mockups atuais dependem de CDN, por isso cada um recebe uma captura PNG para consulta offline.

## 6. Compatibilidade

- **URLs antigos:** cada template antigo fica como página HTML com `<meta http-equiv="refresh">` e link visível.
- **Motivo:** funciona em `http://` e `file://`, sem configuração nem JavaScript.
- **Remoção:** fica para uma mudança posterior, conforme o invariante construtivo da DEC-0027.
- **Symlink:** `public/templates-index.html` passa a página de redirecionamento, porque o repositório também é usado em Windows.

## 7. Decisão D4: Mission Control HTML

`du-dashboard.html` tem 1675 linhas, 245 atributos `style` e uma cópia própria dos tokens. Não carrega nenhum ficheiro do core.

| Opção | Consequência |
|---|---|
| **A. Carregar `core/` (Recommended)** | Uma só fonte de tokens. Deixa de ser um ficheiro único |
| **B. Manter ficheiro único** | Continua portátil. Exige exceção ao contrato e verificação de todos os tokens copiados |
| **C. Duas versões** | Mantém os dois usos. Duplica a manutenção |
| **D. Outro** | A definir |

## 8. Riscos

| Risco | Tratamento |
|---|---|
| Alterações locais em `public/html-kit/index.html` entram em conflito | M0 resolve-as antes de qualquer movimento |
| Corrigir classes muda o aspeto dos Kits | Capturas antes e depois, com diferenças aprovadas |
| Remover `style` e `onclick` introduz regressões | Um Kit por commit, com teste Playwright |
| O allowlist de `open-terminal` fica desatualizado | Atualizado no mesmo commit do movimento |
| A skill HTML aponta para caminhos antigos | M7 altera a fonte RuleSync por governação |
| Cópias em Products ficam para trás | Fora de âmbito; o manifesto indica a versão atual |
| A paridade `partial` esconde diferenças | Campo `differences` obrigatório |

## 9. Reversão

Cada fase é um commit ou PR independente. `git revert` repõe a fase. Os movimentos usam `git mv` e ficam separados das alterações de conteúdo.
