# Blueprint: Dashboard

## Intenção
Operar e explorar uma área com várias secções persistentes, mantendo navegação lateral contínua e contexto de vista.

## Usar quando
- Existem pelo menos 3 secções persistentes.
- O utilizador alterna frequentemente entre vistas de catálogo, métricas, ações ou inspeção.

## Não usar quando
- É uma tarefa única num só ecrã (usar **Cockpit**).
- O público chega sem sessão iniciada para conhecer um produto (usar **Website**).

## Regiões
- `sidebar` (obrigatória): 16rem fixa em desktop; navegação persistente.
- `topbar` (obrigatória): 3.5rem; breadcrumb, pesquisa rápida, seletor de tema.
- `page-header` (obrigatória): título, descrição curta e ações primárias.
- `content` (obrigatória): grelha fluida (1 coluna em telemóvel).

## Comportamento em telemóvel
Abaixo de 768px, a `sidebar` colapsa num Drawer de 18rem acionado por botão na `topbar`; `page-header` empilha ações; `content` passa a 1 coluna sem scroll horizontal da página.

## Interações
- Deep link para cada secção e estado ativo visível na `sidebar`.
- Pesquisa rápida (`Ctrl+K` / `/`) e alternância de tema claro/escuro sincronizada.
- Ecrãs complexos abrem em sub-rotas ou painéis dedicados.

## Estados
- `live`, `drift`, `missing`, `unsupported` comunicados com par `--status-*` e `--status-*-foreground` + texto explícito (nunca só cor).
- Loading, vazio e erro tratados na região `content` sem quebrar a shell.

## Regras verificáveis
- Um `main` por página e um `h1` por vista.
- Deep link para cada secção e `sidebar` ativa visível.
- Sem scroll horizontal a 390px; tabelas e código fazem scroll no próprio contentor.
- Contraste AA em claro e escuro; alvo mínimo de 24×24px.

## Kits
- `dashboard-starter` (HTML)
- `mission-control` (HTML + React)

## Mockups
- `public/blueprints/dashboard/mockups/clean.html`
- `public/blueprints/dashboard/mockups/mission-control.html`
