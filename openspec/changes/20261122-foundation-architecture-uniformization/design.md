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

## 10. AI Council Verdict

**Data:** 2026-11-22. **Modo:** 3, com 5 revisores cegos e só de leitura.
**Veredito:** **BLOQUEADO. Não executar os pacotes até fechar B1 a B17.**
**Fase 0:** `openspec validate --strict` e `node --check` das 4 ferramentas passam.
**Fase 2:** os bloqueadores abaixo foram confirmados no código ou nos pacotes. B1 e B2 foram confirmados por leitura, sem exploração.

| Dimensão | Resultado | Motivo |
|---|---|---|
| **Architecture** | Blocker | Ordem de fases e contrato incoerentes |
| **Security** | Blocker | App exposta na rede local e ações sem proteção |
| **Resilience** | Blocker | Comandos e gates falham quando seguidos à letra |
| **UX/Scope** | Blocker | Shell móvel, landmarks e assets ficam incorretos |

| ID | Pacote | Problema verificado | Correção |
|---|---|---|---|
| **B1** | WP-01 | `next dev` escuta em `*:4300` e os cabeçalhos podem ser forjados na rede local | Ligar `dev` e `start` a `127.0.0.1` |
| **B2** | novo | Server actions mutáveis não têm guarda; sem `Origin`, o Next só avisa | Novo pacote M0 com guarda de Host em todas as ações |
| **B3** | WP-35, 37, 50, 60 | O modo estrito exige specs e `data-kit` criados depois, e bloqueia M3 | Mover WP-50 para antes e dividir o modo estrito por fase |
| **B4** | Gate | `foundation:check` falha em worktree limpa sem ficheiros ignorados | Definir um gate local e de CI sem esses ficheiros |
| **B5** | WP-40, 41 | Edição antes de exigir árvore limpa; move e referências não são atómicos | `fonts` no tool e um único pacote atómico |
| **B6** | WP-42 | Compara com a baseline anterior às alterações de M2 | Criar baseline imediatamente antes do move |
| **B7** | WP-36, 91 | A ferramenta de auditoria não está no change | Adicionar auditoria e limiares às ferramentas |
| **B8** | Vários | `$CH` e `$BASE` nunca são definidos em shell | Preâmbulo copiável em cada bloco |
| **B9** | WP-24, 27 | Avisos vão para stderr e o `grep` lê só stdout | Usar `2>&1` |
| **B10** | WP-54 | `git mv` sem caminho e check ainda exige `recipe.json` | 4 caminhos exatos e check atualizado |
| **B11** | WP-01 | Teste em worktree descartável não contém os ficheiros novos | Reordenar com WP-02 e dar comandos exatos |
| **B12** | WP-31, 40 | Caminho das imagens fica um nível errado depois do move | Reescrever para `../../../assets/` e validar |
| **B13** | WP-31 | Layout Cockpit cria `main` duplicado em admin e formador | Layout com `div` e um `main` por vista |
| **B14** | WP-25 | Mission Control não carrega o core; `reference` usa `.du-topbar` | Pacote D4 antes de WP-25 e excluir `reference` |
| **B15** | WP-23 | `ui-btn-primary` não existe | Mapear para `ui-btn` e confirmar visualmente |
| **B16** | WP-27 | Contrato rejeita portas válidas de KNW-0025 | Uma única lista de portas aprovada |
| **B17** | WP-05, 12 | Listas de ficheiros incompletas forçam `BLOCKED` | Enumerar ficheiros e seletores exatos |

**Concerns:** os relatórios trouxeram 39 preocupações, algumas repetidas. As mais importantes são foco do drawer, contraste do `--ring`, clickjacking, ações privilegiadas no registo, downloads sem hash, `run-dev.command`, documentação com caminhos antigos, recuperação após falha e compatibilidade fora do Chromium.

### Ronda 2 (estado atual)

**Veredito atual:** **BLOQUEADO. Não executar os pacotes até fechar R1 a R9.**
**Fechados segundo os revisores:** B1 a B5, B7 a B14 e B16. **Corrigidos depois da ronda 2:** B6 (`public/assets` na baseline), B15 (regex) e B17 (`.gitignore`).
**Limite:** os achados R1 a R9 vêm dos revisores e ainda não foram verificados de forma independente.

| ID | Pacote | Problema | Correção proposta |
|---|---|---|---|
| **R1** | WP-07 | Testar criar e apagar escreve em `prisma/dev.db` rastreado e suja a árvore | Usar cópia descartável com `DATABASE_URL` absoluto |
| **R2** | M2, WP-53 | `starter-cockpit`, Avaliação e Futuro Digital HTML não têm `main` | Novo passo M2 com o elemento exato por página |
| **R3** | WP-24, 25 | `.du-icon` não existe no core | Adicionar regra dimensionada a `du-components.css` |
| **R4** | WP-25 | `.ui-btn` vence `.du-sidebar-toggle` e mostra o menu em desktop | Regra base `.du-top-bar .du-sidebar-toggle { display: none; }` |
| **R5** | WP-31, 36 | Aliases em `:root` não veem o tema definido em `body` | Pôr `data-theme` em `<html>` ou remover aliases |
| **R6** | WP-12 | `--sidebar-ring` claro fica abaixo de 3:1 | `oklch(0.556 0 0)` |
| **R7** | Auditoria | `static-audit.mjs` ignora CSS/JS externos e usa portas fixas | Ler ficheiros irmãos e `assignedPorts` |
| **R8** | WP-32 | O `grep` final apanha os mockups | Excluir `public/html-kit/examples` |
| **R9** | WP-36 | Sem lista de ficheiros | Definir globs ou a lista da auditoria |

**Concerns da ronda 2:** ver a revisão de proteção por Host, recuperação de WP-40, baselines idempotentes, foco do drawer, topbar móvel, handlers duplicados em Mission Control, escala tipográfica e alinhamento de `design.md` e `tasks.md` com os pacotes.
