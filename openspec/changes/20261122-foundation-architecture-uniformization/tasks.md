# Tasks: migração Foundation

**Execução detalhada:** use os pacotes `WP-*` em [`execution/README.md`](./execution/README.md). Esta lista acompanha o progresso global. A ordem e o âmbito de `execution/` prevalecem sobre esta lista.

**Regra de execução:** cada fase termina com `foundation:check`, `typecheck`, `test` e `build` verdes. Nenhuma fase começa com a anterior por fechar.

## 1. M0: Pré-condições e decisões

- [ ] 1.1 Rever e resolver as 45 eliminações pendentes em `main` (decisão humana)
- [ ] 1.2 Rever e gravar ou descartar a alteração local de `public/html-kit/index.html`
- [ ] 1.3 Classificar `keys.manifest.json` (não rastreado)
- [ ] 1.4 Restringir a origem de `app/api/open-terminal/route.ts`, retirando `Access-Control-Allow-Origin: *`
- [ ] 1.5 Adicionar teste que rejeita pedidos de origem externa à rota
- [ ] 1.6 Registar D1, D3 e D5 com `/ai-decide`
- [ ] 1.7 Decidir D4
- [ ] 1.8 Capturar baseline visual dos 7 templates e das rotas React em claro/escuro, desktop/telemóvel
- [ ] 1.9 Rever e aprovar `canon.md`
- [ ] 1.10 Decidir D6, D7, D8 e D9
- [ ] 1.11 Reescrever `ci.yml` para a aplicação única e rever `release.yml`
- [ ] 1.12 Manter um único lockfile (pnpm)

## 2. M1: Manifesto e verificação

- [ ] 2.1 Criar `foundation.manifest.json` com os caminhos atuais
- [ ] 2.2 Validar referências do manifesto em `foundation-check`
- [ ] 2.3 Validar a regra de pelo menos dois Kits por Blueprint
- [ ] 2.4 Comparar todos os tokens comuns entre `globals.css` e `tokens.css`
- [ ] 2.5 Detetar classes `ui-*` e `du-*` sem definição
- [ ] 2.6 Detetar `style`, `onclick`, emojis, CDN e portas não atribuídas, em modo de aviso
- [ ] 2.7 Tornar `foundation-check` reprodutível em checkout limpo, sem exigir `.env` nem `.mcp.json` ignorados
- [ ] 2.8 Criar pares `--status-*-foreground` com contraste AA nas duas Stacks
- [ ] 2.9 Unificar a chave de preferência de tema
- [ ] 2.10 Automatizar a auditoria de renderização e guardar o resultado por fase

## 3. M2: Reparar os Kits HTML nos caminhos atuais

- [ ] 3.1 Corrigir as 28 classes sem definição
- [ ] 3.2 Remover emojis dos 7 templates
- [ ] 3.3 Substituir portas não atribuídas em `du-dashboard.html`
- [ ] 3.4 Migrar `onclick` para listeners, um Kit por commit
- [ ] 3.5 Migrar `style` para classes, um Kit por commit
- [ ] 3.6 Aplicar D4 a `du-dashboard.html`
- [ ] 3.7 Passar as regras de 2.6 de aviso para erro
- [ ] 3.8 Comparar com a baseline e aprovar as diferenças
- [ ] 3.9 Criar versão móvel com Drawer na shell HTML
- [ ] 3.10 Corrigir `main` duplicado no layout React Dashboard e em `/futuro-digital/galeria`
- [ ] 3.11 Corrigir erros de hidratação em charts, library, metrics e workflow
- [ ] 3.12 Corrigir overflow móvel nas 5 rotas React e 3 páginas HTML
- [ ] 3.13 Remover o cabeçalho `(site)` dos Kits Avaliação e Futuro Digital
- [ ] 3.14 Aplicar D6 (fontes locais) e D7 (idioma)
- [ ] 3.15 Aplicar D8 aos recursos e tema do Futuro Digital
- [ ] 3.16 Eliminar `text-[10px]` e cores fora de tokens nos componentes C e D
- [ ] 3.17 Remover `innerHTML` de `auth-pin-lock` e rever `datatable-fetch`

## 4. M3: Mover a HTML Stack

- [ ] 4.1 Mover core, modules, kits e catálogo com `git mv`, sem alterar conteúdo
- [ ] 4.2 Atualizar caminhos relativos dos Kits para `../../core/`
- [ ] 4.3 Atualizar allowlist de `open-terminal` no mesmo commit
- [ ] 4.4 Atualizar `session-header.tsx`, `capture-all-screenshots.js` e `foundation-check.js`
- [ ] 4.5 Criar páginas de redirecionamento nos URLs antigos
- [ ] 4.6 Substituir o symlink `public/templates-index.html`
- [ ] 4.7 Testar cada Kit em `http://` e `file://`

## 5. M4: Organizar a React Stack

- [ ] 5.1 Mover `components/avaliacao-dashboard` para `components/kits/avaliacao`
- [ ] 5.2 Mover `components/futuro-digital` para `components/kits/futuro-digital`
- [ ] 5.3 Mover `lib/avaliacao` para `lib/kits/avaliacao`
- [ ] 5.4 Atualizar imports e confirmar que nenhuma rota mudou

## 6. M5: Blueprints e Modules

- [ ] 6.1 Escrever as especificações Dashboard, Cockpit e Website
- [ ] 6.2 Mover os mockups e criar capturas PNG offline
- [ ] 6.3 Criar mockup do Blueprint Cockpit a partir de `cockpit-starter`
- [ ] 6.4 Criar mockup do Blueprint Website a partir da landing React
- [ ] 6.5 Adicionar `data-blueprint` e `data-region` aos Kits HTML e React
- [ ] 6.6 Adicionar teste Playwright de paridade estrutural
- [ ] 6.7 Converter `recipe.json` em `module.json` nos 4 Modules HTML
- [ ] 6.8 Avaliação HTML passa a usar `auth-pin-lock` e `datatable-fetch`

## 7. M6: Catálogo

- [ ] 7.1 Reorganizar o catálogo por Blueprint, com filtro de Stack separado
- [ ] 7.2 Listar todos os Kits, incluindo os 2 ficheiros Futuro Digital
- [ ] 7.3 Mostrar paridade e diferenças de cada Kit
- [ ] 7.4 Validar acessibilidade, tema e telemóvel

## 8. M7: Documentação e governação

- [ ] 8.1 Atualizar `README.md`, `FOUNDATION.md`, `AGENTS.md`, `docs/README.md` e `docs/html-foundation.md`
- [ ] 8.2 Corrigir a referência a Lucide em `AGENTS.md`
- [ ] 8.3 Tornar as 4 Recipes operáveis e renomeá-las conforme `canon.md`
- [ ] 8.4 Fechar o estado de `20261013-foundation-symmetry`
- [ ] 8.5 Propor atualização das skills na fonte RuleSync
- [ ] 8.6 Propor emendas a DEC-0027, PAT-0104 e PAT-0105 pelo ciclo de memória

## 9. M8: Sentinel como Product

- [ ] 9.1 Decidir D2
- [ ] 9.2 Comparar Sentinel com `cockpit-starter` e `avaliacao`
- [ ] 9.3 Migrar as 51 utilizações de `--muted` antes de carregar o core
- [ ] 9.4 Reutilizar `du-command-dialog` e remover o atalho duplicado
- [ ] 9.5 Guardar cópia versionada e script Python de verificação
- [ ] 9.6 Comparação visual conforme D2 e zero erros de CSP
- [ ] 9.7 Executar `python3 -m unittest discover -s tests`
- [ ] 9.8 Testar no PC Windows institucional sem Node

## 10. Fecho

- [ ] 10.1 Criar uma app pequena a partir de `cockpit-starter` sem editar o Kit
- [ ] 10.2 Reclassificar `compliance-register.md` e confirmar nota mínima B em todos os Kits
- [ ] 10.3 Executar `/opsx-verify`
- [ ] 10.4 Arquivar com `/opsx-archive`
