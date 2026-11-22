# Blueprint: Website

## Intenção
Apresentar, explicar e levar o visitante a uma ação clara.

## Usar quando
- O público chega sem sessão iniciada.
- O objetivo é informar, demonstrar valor e converter para uma CTA principal.

## Não usar quando
- O utilizador opera workflows multi-secção (usar **Dashboard**) ou tarefas num ecrã operacional (usar **Cockpit**).

## Regiões
- `header` (obrigatória): marca, navegação principal e CTA.
- `hero` (obrigatória): proposta de valor e CTA principal (2 colunas em desktop, 1 em telemóvel).
- `sections` (obrigatória): blocos de conteúdo com largura máxima de 72rem.
- `footer` (obrigatória): links e identidade institucional.

## Comportamento em telemóvel
`header` reduz para marca e menu compacto; `hero`, `sections` e `footer` empilham a 1 coluna sem scroll horizontal da página a 390px.

## Interações
- Navegação por âncoras ou sub-rotas públicas (ex.: galeria).
- Uma CTA principal destacada por ecrã e navegação completa por teclado.

## Estados
- Imagens com `alt`, dimensões explícitas e versão local.
- Estados de foco visível e respeito por `prefers-reduced-motion`.

## Regras verificáveis
- Um único `header`, um `main` e um `h1` único por página.
- Uma CTA principal por ecrã.
- Imagens locais com `alt` e dimensões.
- Sem scroll horizontal a 390px e contraste AA.

## Kits
- `website-starter` (React)
- `futuro-digital` (HTML + React)

## Mockups
- `public/html/kits/futuro-digital/index.html` (após M3; legado em `public/html-kit/templates/du-futuro-digital.html`)
