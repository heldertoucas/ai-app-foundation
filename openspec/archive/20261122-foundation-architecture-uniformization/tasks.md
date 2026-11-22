# Tasks: migração Foundation

**Execução detalhada:** use os pacotes `WP-*` em [`execution/README.md`](./execution/README.md). Esta lista acompanha o progresso global. A ordem e o âmbito de `execution/` prevalecem sobre esta lista.

**Regra de execução:** cada fase termina com `foundation:check`, `typecheck`, `test` e `build` verdes. Nenhuma fase começa com a anterior por fechar.

## 1. M0: Pré-condições e decisões

- [x] 1.1 Rever e resolver as 45 eliminações pendentes em `main` (decisão humana)
- [x] 1.2 Rever e gravar ou descartar a alteração local de `public/html-kit/index.html`
- [x] 1.3 Classificar `keys.manifest.json` (não rastreado)
- [x] 1.4 Restringir a origem de `app/api/open-terminal/route.ts`, retirando `Access-Control-Allow-Origin: *`
- [x] 1.5 Adicionar teste que rejeita pedidos de origem externa à rota
- [x] 1.6 Registar D1, D3 e D5 com `/ai-decide`
- [x] 1.7 Decidir D4
- [x] 1.8 Capturar baseline visual dos 7 templates e das rotas React em claro/escuro, desktop/telemóvel
- [x] 1.9 Rever e aprovar `canon.md`
- [x] 1.10 Decidir D6, D7, D8 e D9
- [x] 1.11 Reescrever `ci.yml` para a aplicação única e rever `release.yml`
- [x] 1.12 Manter um único lockfile (pnpm)

## 2. M1: Manifesto e verificação

- [x] 2.1 Criar `foundation.manifest.json` com os caminhos atuais
- [x] 2.2 Validar referências do manifesto em `foundation-check`
- [x] 2.3 Validar a regra de pelo menos dois Kits por Blueprint
- [x] 2.4 Comparar todos os tokens comuns entre `globals.css` e `tokens.css`
- [x] 2.5 Detetar classes `ui-*` e `du-*` sem definição
- [x] 2.6 Detetar `style`, `onclick`, emojis, CDN e portas não atribuídas, em modo de aviso
- [x] 2.7 Tornar `foundation-check` reprodutível em checkout limpo, sem exigir `.env` nem `.mcp.json` ignorados
- [x] 2.8 Criar pares `--status-*-foreground` com contraste AA nas duas Stacks
- [x] 2.9 Unificar a chave de preferência de tema
- [x] 2.10 Automatizar a auditoria de renderização e guardar o resultado por fase

## 3. M2: Reparar os Kits HTML nos caminhos atuais

- [x] 3.1 Corrigir as 28 classes sem definição
- [x] 3.2 Remover emojis dos 7 templates
- [x] 3.3 Substituir portas não atribuídas em `du-dashboard.html`
- [x] 3.4 Migrar `onclick` para listeners, um Kit por commit
- [x] 3.5 Migrar `style` para classes, um Kit por commit
- [x] 3.6 Aplicar D4 a `du-dashboard.html`
- [x] 3.7 Passar as regras de 2.6 de aviso para erro
- [x] 3.8 Comparar com a baseline e aprovar as diferenças
- [x] 3.9 Criar versão móvel com Drawer na shell HTML
- [x] 3.10 Corrigir `main` duplicado no layout React Dashboard e em `/futuro-digital/galeria`
- [x] 3.11 Corrigir erros de hidratação em charts, library, metrics e workflow
- [x] 3.12 Corrigir overflow móvel nas 5 rotas React e 3 páginas HTML
- [x] 3.13 Remover o cabeçalho `(site)` dos Kits Avaliação e Futuro Digital
- [x] 3.14 Aplicar D6 (fontes locais) e D7 (idioma)
- [x] 3.15 Aplicar D8 aos recursos e tema do Futuro Digital
- [x] 3.16 Eliminar `text-[10px]` e cores fora de tokens nos componentes C e D
- [x] 3.17 Remover `innerHTML` de `auth-pin-lock` e rever `datatable-fetch`

## 4. M3: Mover a HTML Stack

- [x] 4.1 Mover core, modules, kits e catálogo com `git mv`, sem alterar conteúdo
- [x] 4.2 Atualizar caminhos relativos dos Kits para `../../core/`
- [x] 4.3 Atualizar allowlist de `open-terminal` no mesmo commit
- [x] 4.4 Atualizar `session-header.tsx`, `capture-all-screenshots.js` e `foundation-check.js`
- [x] 4.5 Criar páginas de redirecionamento nos URLs antigos
- [x] 4.6 Substituir o symlink `public/templates-index.html`
- [x] 4.7 Testar cada Kit em `http://` e `file://`

## 5. M4: Organizar a React Stack

- [x] 5.1 Mover `components/avaliacao-dashboard` para `components/kits/avaliacao`
- [x] 5.2 Mover `components/futuro-digital` para `components/kits/futuro-digital`
- [x] 5.3 Mover `lib/avaliacao` para `lib/kits/avaliacao`
- [x] 5.4 Atualizar imports e confirmar que nenhuma rota mudou

## 6. M5: Blueprints e Modules

- [x] 6.1 Escrever as especificações Dashboard, Cockpit e Website
- [x] 6.2 Mover os mockups e criar capturas PNG offline
- [x] 6.3 Criar mockup do Blueprint Cockpit a partir de `cockpit-starter`
- [x] 6.4 Criar mockup do Blueprint Website a partir da landing React
- [x] 6.5 Adicionar `data-blueprint` e `data-region` aos Kits HTML e React
- [x] 6.6 Adicionar teste Playwright de paridade estrutural
- [x] 6.7 Converter `recipe.json` em `module.json` nos 4 Modules HTML
- [x] 6.8 Avaliação HTML passa a usar `auth-pin-lock` e `datatable-fetch`

## 7. M6: Catálogo

- [x] 7.1 Reorganizar o catálogo por Blueprint, com filtro de Stack separado
- [x] 7.2 Listar todos os Kits, incluindo os 2 ficheiros Futuro Digital
- [x] 7.3 Mostrar paridade e diferenças de cada Kit
- [x] 7.4 Validar acessibilidade, tema e telemóvel

## 8. M7: Documentação e governação

- [x] 8.1 Atualizar `README.md`, `FOUNDATION.md`, `AGENTS.md`, `docs/README.md` e `docs/html-foundation.md`
- [x] 8.2 Corrigir a referência a Lucide em `AGENTS.md`
- [x] 8.3 Tornar as 4 Recipes operáveis e renomeá-las conforme `canon.md`
- [x] 8.4 Fechar o estado de `20261013-foundation-symmetry`
- [x] 8.5 Propor atualização das skills na fonte RuleSync (pendente regeneração externa das skills `ai-html-foundation` e `ai-ui-foundation` no repositório/fonte RuleSync)
- [x] 8.6 Propor emendas a DEC-0027, PAT-0104 e PAT-0105 pelo ciclo de memória (`DEC-0081` promovida)

## 9. M8: Sentinel como Product (Diferido até decisão humana D2)

- [ ] 9.1 Decidir D2
- [ ] 9.2 Comparar Sentinel com `cockpit-starter` e `avaliacao`
- [ ] 9.3 Migrar as 51 utilizações de `--muted` antes de carregar o core
- [ ] 9.4 Reutilizar `du-command-dialog` e remover o atalho duplicado
- [ ] 9.5 Guardar cópia versionada e script Python de verificação
- [ ] 9.6 Comparação visual conforme D2 e zero erros de CSP
- [ ] 9.7 Executar `python3 -m unittest discover -s tests`
- [ ] 9.8 Testar no PC Windows institucional sem Node

## 10. Fecho

- [x] 10.1 Criar uma app pequena a partir de `cockpit-starter` sem editar o Kit
- [x] 10.2 Reclassificar `compliance-register.md` e confirmar nota mínima B em todos os Kits
- [x] 10.3 Executar `/opsx-verify`
- [x] 10.4 Arquivar com `/opsx-archive`
