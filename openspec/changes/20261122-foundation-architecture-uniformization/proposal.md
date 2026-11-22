---
title: "Uniformização da arquitetura Foundation e entrada do Sentinel Web na família HTML"
type: proposal
status: proposed
project: PRJ-0024
created: "2026-11-22"
relevant_decisions: ["DEC-0027", "DEC-0069"]
relevant_constraints: ["CON-0020", "CON-0038"]
related_patterns: ["PAT-0104", "PAT-0105", "PAT-0174"]
related_projects: ["PRJ-0030"]
artifacts: ["foundation-map.md"]
decisions_status: open
---

# Uniformização da arquitetura Foundation

## 1. Problem & Context

**Facto central:** a Foundation tem dois kits (React e HTML) sem vocabulário, contrato de template nem verificação comuns.

- **Relatório completo:** [`foundation-map.md`](./foundation-map.md) documenta hierarquia, inventário, relações e 13 incoerências.
- **Base canónica:** DEC-0027 define Core, Blueprints, Recipes e Agent Layer. PAT-0104 e PAT-0105 definem o HTML Kit.
- **Origem do HTML Kit:** a mudança `du-html-foundation-kit` já nomeia o Sentinel como consumidor previsto.
- **Adoção real:** o Sentinel Web ainda não usa o HTML Kit.
- **Saúde atual:** `pnpm foundation:check` passa nas 13 verificações, mas não deteta a maioria destas incoerências.
- **Histórico no Vault:** a pesquisa semântica não devolveu notas relevantes. O contexto vem das decisões e padrões acima, lidos diretamente.

| Grupo | Incoerências | Consequência |
|---|---|---|
| **Vocabulário** | 1 | "Blueprint" tem 4 sentidos |
| **Documentação e skills** | 2, 3, 4, 8 | Agentes recebem instruções erradas |
| **Qualidade dos templates** | 5, 6, 10, 11 | Templates oficiais violam regras do kit ou ficam invisíveis |
| **Verificação** | 7 | Divergência de tokens pode passar despercebida |
| **Recipes** | 9 | A recipe `auth` não é operável |
| **Higiene do repositório** | 12, 13 | O estado do OpenSpec e do Git engana |

## 2. Proposed Solution

### 2.1 Vocabulário único

| Termo | Definição | Exemplo |
|---|---|---|
| **Kit** | Stack técnica completa | React Kit, HTML Kit |
| **Component** | Peça visual reutilizável | `Button`, `.ui-btn` |
| **Blueprint** | Estrutura reutilizável de um tipo de aplicação | `(dashboard)`, `(site)` |
| **Template** | Ficheiro pronto a copiar que concretiza um blueprint | `starter-cockpit.html` |
| **Recipe** | Capacidade opcional com contrato próprio | `sse-telemetry` |
| **Vertical** | Solução de domínio, presente em um ou nos dois kits | Avaliação |
| **Theme** | Conjunto de valores de tokens | Futuro Digital, Sentinel |

**Regra de dependência:** cada nível usa apenas os níveis acima, conforme a secção 2 do relatório.

### 2.2 Contrato de template HTML

Cada template oficial da família HTML cumpre:

- **Sem compilação:** sem npm, Node, CDN ou Tailwind.
- **Compatível com CSP rigorosa:** sem `onclick` nem atributos `style`.
- **Tokens apenas:** cores definidas só em ficheiros de tema.
- **Ícones:** SVG outline, sem emojis.
- **Portas:** nenhuma porta inventada. Valores vêm de KNW-0025.
- **Descoberta:** listado no catálogo `public/html-kit/index.html`.
- **Verificação:** coberto por `foundation-check`.

### 2.3 Sentinel Web na família HTML

**Proposta em aberto:** acrescentar o Sentinel Web à família HTML como primeira aplicação de um modelo reutilizável.

**Nome e estrutura provisórios:** "Mission Cockpit Blueprint" e a árvore abaixo são ilustrativos até à decisão D1.

```text
public/html-kit/blueprints/mission-cockpit/
├── blueprint.json     versão e lista de ficheiros
├── theme.css          tema Sentinel com valores atuais
├── components.css     hero, bandas, medidores, atalhos
├── runtime.js         API, atualização, pesquisa, avisos
├── modules/guard/     robô guarda, opcional
├── server/            servidor Python seguro (PAT-0174), opcional
└── starter/           aplicação mínima pronta a copiar
```

- **Design:** o requisito de partida é manter o aspeto atual, validado pixel a pixel. Qualquer exceção depende de D2.
- **Fronteira:** tarefas, notas, Atlas e `menu.md` ficam no Sentinel.
- **Distribuição:** o Sentinel guarda uma cópia versionada. Um script Python compara-a com `blueprint.json`.
- **Primeiro passo:** comparar com `starter-cockpit.html` e `du-dashboard.html` para reutilizar antes de criar.
- **Prova de template:** uma segunda aplicação pequena tem de nascer do `starter/` sem editar o blueprint.

**Riscos conhecidos na migração:**

| Risco | Tratamento |
|---|---|
| `--muted` é texto no Sentinel e fundo no kit | Migrar as 51 utilizações para `--muted-foreground` antes de carregar o kit |
| `du-runtime.js` também captura `Cmd+K` | Reutilizar `du-command-dialog` e remover o atalho duplicado |
| O runtime tem 2 temas e o Sentinel tem 3 | Decisão D2 |
| `var(--ok)` não está definido no Sentinel | Registar, sem corrigir durante a migração visual |
| O leitor de notas usa `innerHTML`, contra PAT-0174 | Revisão de segurança separada |

### 2.4 Fases

**Sequência provisória:** a divisão e a ordem das fases dependem de D3. Nenhuma fase depois de W0 começa sem as decisões tomadas.

| Fase | Entrega | Critério de conclusão |
|---|---|---|
| **W0** | Decisões D1 a D3 e registo com `/ai-decide` | Decisão aprovada por humano |
| **W1** | Vocabulário, documentação e skills | Incoerências 1, 2, 3, 4, 8 fechadas |
| **W2** | Contrato aplicado aos 7 templates | Incoerências 5, 6, 10, 11 fechadas |
| **W3** | `foundation-check` alargado | Todos os tokens comuns e o contrato verificados |
| **W4** | Recipes e higiene | Incoerências 9, 12, 13 fechadas |
| **W5** | Sentinel migrado para o HTML Kit | Resultado visual conforme D2, testes verdes |
| **W6** | Mission Cockpit extraído e segunda app | App nova criada sem editar o blueprint |

### 2.5 Decisões em aberto

**Estado:** D1, D2 e D3 ficam por decidir na próxima sessão. As opções estão por ordem neutra e nenhuma é recomendada. As recomendações apresentadas em 2026-11-22 não foram aceites.

#### D1. Nome e natureza do novo membro da família HTML

| Opção | O que significa | Vantagem | Custo |
|---|---|---|---|
| **A. Mission Cockpit Blueprint** | Modelo de aplicação dentro do HTML Kit | Encaixa no termo "Blueprint" da DEC-0027 | Alarga esse termo, hoje aplicado a layouts React |
| **B. Mission Kit** | Kit próprio, construído sobre o HTML Kit | Nome curto e fácil de comunicar | Pode sugerir um terceiro kit ao lado de React e HTML |
| **C. Template HTML** | Mais um template em `templates/` | Não cria nenhuma categoria nova | Um ficheiro único acomoda mal módulos e servidor |
| **D. Outro** | Nome ou natureza a definir | Liberdade total | Exige definir o seu lugar na hierarquia |

#### D2. Regras do HTML Kit que alteram o design do Sentinel

**Regras em causa:** tema de 2 estados (o Sentinel tem também "sistema"), atalho `/`, etiquetas sem borda e alternador Bento/Master-Detail.

| Opção | Tema | Atalho `/` | Borda | Alternador | Consequência |
|---|---|---|---|---|---|
| **A. Design intacto** | 3 estados | Desligado | Mantida | Não entra | Zero mudanças visíveis, 4 exceções registadas |
| **B. Microajustes** | 2 estados | Ativo | Removida | Não entra | Pequenas mudanças, 1 exceção registada |
| **C. Cumprimento literal** | 2 estados | Ativo | Removida | Entra | Zero exceções, com controlo e vista novos na página |
| **D. Outro** | A definir | A definir | A definir | A definir | Decisão regra a regra |

#### D3. Âmbito e sequência desta mudança

| Opção | O que inclui | Vantagem | Custo |
|---|---|---|---|
| **A. Fases independentes** | Arquitetura primeiro, Sentinel depois, com entregas separadas | Um problema numa parte não bloqueia a outra | Mais coordenação entre dois repositórios |
| **B. Só arquitetura** | W1 a W4. O Sentinel passa para outra mudança | Mudança mais pequena | O contrato não é testado numa app real nesta mudança |
| **C. Sentinel primeiro** | Migrar o Sentinel e só depois uniformizar | Valida as regras num caso real | Pode migrar para regras que ainda vão mudar |
| **D. Entrega única** | Todas as fases numa só entrega | Um único ciclo de revisão | Maior risco e revisão mais pesada |
| **E. Outro** | A definir | Liberdade total | Exige redefinir as fases |

## 3. Impacted Files & Repositories

**`ai-app-foundation` (REP-0023):**

- `docs/html-foundation.md`, `docs/README.md`, `FOUNDATION.md`, `AGENTS.md`
- `public/html-kit/index.html`, `public/html-kit/templates/*.html`
- `public/html-kit/blueprints/mission-cockpit/**` (novo)
- `scripts/foundation-check.js`
- `recipes/auth/**`
- `openspec/changes/20261013-foundation-symmetry.lite.md`

**`sentinel` (REP-0029), só em W5 e W6:**

- `index.html`, `app.css`, `app.js`, `web_server.py`

**Skills globais, via fonte RuleSync:**

- `ai-html-foundation`, `ai-ui-foundation`

## 4. Non-Goals & Alternatives

**Non-Goals:**

- Mudar o design do Sentinel, salvo o que for expressamente escolhido em D2.
- Introduzir Tailwind, npm ou compilação na família HTML.
- Partilhar componentes entre React e HTML.
- Migrar o Sentinel para React ou Next.js.
- Restaurar ou apagar os ficheiros pendentes em `.agents/` sem revisão humana.
- Alterar memória canónica sem o ciclo de revisão.

**Outras abordagens avaliadas (fora de D1 a D3):**

| Abordagem | Limitação identificada |
|---|---|
| Tailwind só em desenvolvimento | Viola o invariante zero-build e exige exceção |
| React + Vite | Reescreve 1173 linhas e dificulta a igualdade visual |
| Next.js | Exige Node em execução e choca com a CSP do Sentinel |
| Terceiro design system | Duplica tokens e componentes |
| Sentinel lê a pasta da Foundation | Deixa de arrancar se a pasta faltar |

## 5. Verification

- **Foundation:** `pnpm foundation:check`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
- **Sentinel:** `python3 -m unittest discover -s tests` (63 testes verdes em 2026-11-22).
- **Visual:** comparação Playwright em claro/escuro, desktop/telemóvel, diálogos e estados do robô. Critério: zero diferenças, exceto as escolhidas em D2.
- **Segurança:** zero erros de CSP na consola.
- **Windows:** teste no PC institucional sem Node instalado.
