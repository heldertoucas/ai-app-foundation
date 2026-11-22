# Blueprint: Cockpit

## Intenção
Ver o estado operacional e agir num único ecrã focado, sem dispersão de navegação lateral.

## Usar quando
- Uma pessoa acompanha uma tarefa ou operação contínua.
- Existem até 2 vistas principais (ou gate de acesso + vista operacional).

## Não usar quando
- Existem 3 ou mais secções persistentes (usar **Dashboard**).
- O objetivo é apresentação pública institucional (usar **Website**).

## Regiões
- `topbar` (obrigatória): 3.5rem; identidade, estado global e seletor de tema.
- `summary` (obrigatória): 3 a 4 KPIs em linha (1 ou 2 colunas em telemóvel).
- `content` (obrigatória): área principal de trabalho (1 coluna em telemóvel).
- `actions` (opcional): coluna lateral de ações rápidas (em telemóvel passa para depois do conteúdo).
- `gate` (opcional): cartão centrado de acesso quando protegido (largura total em telemóvel).

## Comportamento em telemóvel
`topbar` compacta sem quebra de linha; `summary` reduz para 1 ou 2 colunas; `content` e `actions` empilham a 1 coluna sem scroll horizontal da página.

## Interações
- Ações principais visíveis sem navegar para outras páginas.
- Atualização de estado e filtros locais com feedback imediato.
- Atalhos de teclado e fecho de modais com `Esc`.

## Estados
- Estado global e por linha comunicado sempre com texto explícito além da cor (`--status-*-foreground`).
- Estados de acesso (bloqueado/desbloqueado), vazio e erro visíveis na região `content` ou `gate`.

## Regras verificáveis
- Sem `sidebar`.
- Ações principais visíveis sem navegar.
- Um `main` por página e um `h1` por vista.
- Contraste AA em claro e escuro; sem scroll horizontal a 390px.

## Kits
- `cockpit-starter` (HTML)
- `avaliacao` (HTML + React)

## Mockups
- `public/blueprints/cockpit/mockups/overview.png`
- `public/blueprints/cockpit/mockups/mission-control.html`
