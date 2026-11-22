---
title: "Cânone da AI App Foundation"
type: reference
status: proposed
project: PRJ-0024
created: "2026-11-22"
change: 20261122-foundation-architecture-uniformization
relevant_decisions: ["DEC-0027", "DEC-0069"]
relevant_constraints: ["CON-0020"]
related_patterns: ["PAT-0098", "PAT-0099", "PAT-0104", "PAT-0105", "PAT-0174"]
---

# Cânone da AI App Foundation

**Estado:** proposta. Só passa a canónico depois de revisão humana e `/ai-decide`.
**Conformidade atual:** ver [`compliance-register.md`](./compliance-register.md).

## 1. Filosofia

**Promessa:** o utilizador tem a mesma experiência em qualquer tecnologia, e quem desenvolve usa a mesma linguagem em todas.

| # | Princípio | Regra prática |
|---|---|---|
| **P1** | Mesma experiência | Mesmo aspeto, layout e interação onde as duas Stacks oferecem a mesma função |
| **P2** | Diferenças declaradas | Toda a diferença entre Stacks fica escrita no manifesto |
| **P3** | Linguagem única | Um conceito tem um nome em todas as Stacks |
| **P4** | Uma fonte de verdade | Cada peça tem uma origem; as cópias são verificáveis |
| **P5** | Local e livre primeiro | Funciona sem SaaS, Docker ou rede obrigatórios |
| **P6** | Acessível por omissão | WCAG 2.2 AA em claro, escuro, desktop e telemóvel |
| **P7** | Simples e previsível | Só existe uma abstração quando é usada pelo menos duas vezes |
| **P8** | Verificável | Uma regra importante tem uma verificação automática |

## 2. Taxonomia canónica

```text
FOUNDATION
├── DESIGN LANGUAGE    tokens, temas, tipografia, ícones, regras
├── BLUEPRINTS         Dashboard · Cockpit · Website
│   └── MOCKUPS        imagem de referência do blueprint
├── STACKS             HTML · React
│   ├── CORE           tecnologia base da Stack
│   ├── PRIMITIVES     controlos básicos
│   ├── COMPONENTS     peças visuais compostas
│   ├── MODULES        funcionalidades com comportamento
│   └── KITS           construção pronta a copiar de um blueprint
├── RECIPES            guias para alterar infraestrutura
└── PRODUCTS           aplicações reais, fora da Foundation
```

| Termo | É | Não é | Teste rápido |
|---|---|---|---|
| **Foundation** | O sistema completo | Uma app | Contém tudo o resto? |
| **Design Language** | Decisões visuais partilhadas | CSS de uma página | Aplica-se às duas Stacks? |
| **Blueprint** | Plano de um tipo de experiência | Código ou layout React | Faz sentido sem nomear tecnologia? |
| **Mockup** | Imagem de referência de um blueprint | Ponto de partida | Serve só para ver? |
| **Stack** | Tecnologia de construção | Produto | Responde a "construído com quê?" |
| **Core** | Base técnica da Stack | Funcionalidade | Sem isto a Stack não arranca? |
| **Primitive** | Controlo básico sem domínio | Peça composta | Botão, input, tabela? |
| **Component** | Peça visual composta e reutilizável | Funcionalidade completa | Só mostra e recebe dados? |
| **Module** | Funcionalidade com comportamento próprio | Só visual | Tem lógica, estado ou ligação a dados? |
| **Kit** | Construção completa de um blueprint | Aplicação de produção | Copia-se para começar uma app? |
| **Starter Kit** | Kit sem domínio nem dados reais | Demonstração | Está pronto para receber domínio? |
| **Recipe** | Guia para alterar infraestrutura | Código importável | Muda dependências, ambiente ou deploy? |
| **Product** | Aplicação real derivada de um Kit | Parte da Foundation | Tem utilizadores próprios? |

### Regras estruturais

1. **Dependência:** Design Language → Primitive → Component → Module → Kit → Product. Nunca ao contrário.
2. **Blueprint:** não depende de nenhuma Stack.
3. **Kit:** segue exatamente um Blueprint.
4. **Implementação:** um Kit tem uma identidade e uma ou duas implementações.
5. **Blueprint válido:** tem pelo menos dois Kits.
6. **Component de domínio:** pertence a um Kit até ser usado por um segundo Kit.
7. **Promoção:** ao passar a partilhado, perde o vocabulário de domínio (PAT-0099).

### Paridade

| Valor | Significado |
|---|---|
| `full` | Mesma experiência nas duas Stacks |
| `partial` | Mesma experiência, com diferenças declaradas |
| `divergent` | Mesmo Blueprint, conteúdo ou estrutura diferentes. Estado temporário |
| `single-stack` | Existe só numa Stack, por decisão |

## 3. Nomes canónicos

### Convenções

| Artefacto | Formato | Exemplo |
|---|---|---|
| **Blueprint** | substantivo em inglês | `dashboard` |
| **Kit de domínio** | nome do domínio | `avaliacao` |
| **Starter Kit** | `<blueprint>-starter` | `cockpit-starter` |
| **Module** | `<capacidade>-<objeto>` | `auth-pin` |
| **Recipe** | `<verbo>-<alvo>` | `migrate-postgres` |
| **Mockup** | `<blueprint>/mockups/<variante>` | `dashboard/mockups/clean` |
| **Tema** | `data-theme="<id>"` | `futuro-digital` |
| **Ficheiro React** | kebab-case | `kpi-card.tsx` |
| **Componente React** | PascalCase | `KpiCard` |
| **Classe primitive HTML** | `ui-<nome>` | `ui-btn` |
| **Classe component HTML** | `du-<nome>` | `du-kpi-card` |
| **Classe de Kit HTML** | `<prefixo do kit>-<nome>` | `fd-hero` |
| **Marcadores** | `data-blueprint`, `data-kit`, `data-region` | `data-region="topbar"` |

**Idioma:** identificadores técnicos em inglês. Nomes próprios de domínio mantêm-se em português sem acentos.

### Nomes dos Kits

| ID | Nome visível | Blueprint | Nome HTML atual | Rota React |
|---|---|---|---|---|
| `dashboard-starter` | Dashboard Starter | Dashboard | `template-app-shell.html` | não existe |
| `mission-control` | Mission Control | Dashboard | `du-dashboard.html` | `/dashboard` |
| `cockpit-starter` | Cockpit Starter | Cockpit | `starter-cockpit.html` | não existe |
| `avaliacao` | Avaliação | Cockpit | `du-avaliacao-dashboard.html` | `/avaliacao-dashboard` |
| `website-starter` | Website Starter | Website | não existe | `/` |
| `futuro-digital` | Futuro Digital | Website | `du-futuro-digital*.html` | `/futuro-digital` |

### Nomes dos Modules e Recipes

| ID canónico | Tipo | Nome atual | React | HTML |
|---|---|---|---|---|
| `auth-pin` | Module | `auth-pin-lock` | `auth-guard`, `auth-pin-pad`, `auth-store` | sim |
| `data-table` | Module | `datatable-fetch` | `matrix/data-table` | sim |
| `state-sync` | Module | `localstorage-state` | `safe-storage` | sim |
| `live-telemetry` | Module | `sse-telemetry` | parcial em `telemetry-sync-card` | sim |
| `du-connector` | Module | `lib/du` | sim | não |
| `add-ai` | Recipe | `ai` | sim | não aplicável |
| `add-auth` | Recipe | `auth` | sim | não aplicável |
| `migrate-postgres` | Recipe | `postgres` | sim | não aplicável |
| `deploy-vercel` | Recipe | `vercel` | sim | não aplicável |

### Dicionário de Primitives e Components

| Conceito canónico | React | HTML | Estado |
|---|---|---|---|
| **Accordion** | `Accordion` | `ui-accordion` | par |
| **Badge** | `Badge` | `ui-badge` | par |
| **Button** | `Button` | `ui-btn` | par; corrigir `ui-button` |
| **Card** | `Card` | `ui-card` | par |
| **Input** | `Input` | `ui-input` | par |
| **Table** | `Table` | `ui-table` | par |
| **Dialog** | em falta | `ui-dialog` | falta em React |
| **Switch** | em falta | `ui-switch` | falta em React |
| **Tabs** | em falta | `ui-tabs` | falta em React |
| **Avatar** | `Avatar` | em falta | falta em HTML |
| **Dropdown Menu** | `DropdownMenu` | em falta | falta em HTML |
| **Separator** | `Separator` | em falta | falta em HTML |
| **Skeleton** | `Skeleton` | em falta | falta em HTML |
| **Tooltip** | `Tooltip` | em falta | falta em HTML |
| **Breadcrumb** | `Breadcrumb` | `du-breadcrumb` | par com prefixo diferente |
| **Collapsible** | `Collapsible` | `<details>` nativo | par por plataforma |
| **Drawer** | `Sheet` | `du-drawer` | unificar nome em **Drawer** |
| **Sidebar** | `Sidebar` | `du-sidebar` | par; HTML sem versão móvel |
| **Progress** | `Progress` | `du-linear-*` | unificar nome em **Progress** |
| **KPI Card** | `KpiStatCard` | `du-kpi-card`, `du-stat-card` | unificar em **KpiCard** |
| **Health Gauge** | `HealthGauge` | `du-gauge`, `du-radial-gauge` | unificar em **HealthGauge** |
| **Status Pill** | `Badge` + tokens | `du-telemetry-pill` | definir uma API |
| **Command Palette** | `GlobalCommandPalette` | `du-command-*` | par |

**Critério:** um primitive em falta só se cria quando um Kit precisa dele (P7).

### Termos retirados

| Retirar | Usar |
|---|---|
| Template, Vertical, Modelo | **Kit** |
| HTML Kit, React Kit, Core React | **HTML Stack**, **React Stack** |
| Scaffold | **Starter Kit** |
| Example | **Mockup** |
| Recipe HTML, Receita HTML | **Module** |
| `(dashboard)`, `(site)` como blueprints | **Layouts React** dos Blueprints |
| Mission Cockpit Blueprint | **Blueprint Cockpit** e um Kit, conforme D1 |

## 4. Blueprints canónicos

### 4.1 Dashboard

**Intenção:** operar e explorar uma área com várias secções.
**Usar quando:** existem pelo menos 3 secções persistentes.
**Kits:** `dashboard-starter`, `mission-control`.

```text
┌─────────┬──────────────────────────────┐
│         │ topbar                       │
│ sidebar ├──────────────────────────────┤
│         │ page-header                  │
│         │ content                      │
└─────────┴──────────────────────────────┘
```

| Região | Obrigatória | Desktop | Telemóvel |
|---|---|---|---|
| `sidebar` | sim | 16rem fixa | Drawer de 18rem |
| `topbar` | sim | 3.5rem; breadcrumb, pesquisa, tema | Botão de menu, título, tema |
| `page-header` | sim | Título, descrição, ações | Empilhado |
| `content` | sim | Grelha fluida | 1 coluna |

**Regras:** deep link para cada secção, sidebar ativa visível, ecrãs complexos em sub-rotas e sem scroll horizontal da página.

### 4.2 Cockpit

**Intenção:** ver o estado e agir num único ecrã.
**Usar quando:** uma pessoa acompanha uma tarefa ou operação e tem até 2 vistas.
**Kits:** `cockpit-starter`, `avaliacao`.
**Product previsto:** Sentinel.

```text
┌────────────────────────────────────────┐
│ topbar                                 │
├────────────────────────────────────────┤
│ summary   KPI · KPI · KPI              │
├──────────────────────────┬─────────────┤
│ content                  │ actions     │
└──────────────────────────┴─────────────┘
```

| Região | Obrigatória | Desktop | Telemóvel |
|---|---|---|---|
| `topbar` | sim | Identidade, estado, tema | Compacta, sem quebra |
| `summary` | sim | 3 a 4 KPIs | 1 ou 2 colunas |
| `content` | sim | Área principal | 1 coluna |
| `actions` | não | Coluna lateral | Depois do conteúdo |
| `gate` | não | Cartão centrado de acesso | Largura total |

**Regras:** sem sidebar, ações principais visíveis sem navegar e estado sempre com texto além da cor.

### 4.3 Website

**Intenção:** apresentar, explicar e levar a uma ação.
**Usar quando:** o público chega sem sessão iniciada.
**Kits:** `website-starter`, `futuro-digital`.

```text
┌────────────────────────────────────────┐
│ header                                 │
├────────────────────────────────────────┤
│ hero                                   │
├────────────────────────────────────────┤
│ sections                               │
├────────────────────────────────────────┤
│ footer                                 │
└────────────────────────────────────────┘
```

| Região | Obrigatória | Desktop | Telemóvel |
|---|---|---|---|
| `header` | sim | Marca, navegação, CTA | Marca e menu |
| `hero` | sim | 2 colunas | 1 coluna |
| `sections` | sim | Largura máxima de 72rem | 1 coluna |
| `footer` | sim | Links e identidade | Empilhado |

**Regras:** um único `header`, uma CTA principal por ecrã, `h1` único e imagens com `alt`, dimensões e versão local.

### 4.4 Escolher um Blueprint

1. O público chega sem sessão e o objetivo é informar? **Website**.
2. Tem 3 ou mais secções persistentes? **Dashboard**.
3. É uma tarefa num único ecrã? **Cockpit**.

## 5. Layouts canónicos

**Hierarquia:** Blueprint → Shell → Page Layout → Section Pattern → Component.

| Nível | Nome | Usado em |
|---|---|---|
| **Shell** | `shell-sidebar` | Dashboard |
| **Shell** | `shell-topbar` | Cockpit |
| **Shell** | `shell-site` | Website |
| **Page Layout** | `page-overview` | Dashboard, Cockpit |
| **Page Layout** | `page-list` | Dashboard, Cockpit |
| **Page Layout** | `page-detail` | Dashboard |
| **Page Layout** | `page-master-detail` | Dashboard, Cockpit |
| **Page Layout** | `page-form` | Todos |
| **Page Layout** | `page-gate` | Cockpit, Dashboard |
| **Page Layout** | `page-landing` | Website |
| **Page Layout** | `page-catalog` | Website, Dashboard |
| **Section Pattern** | `section-kpis`, `section-bento`, `section-table`, `section-timeline` | Dashboard, Cockpit |
| **Section Pattern** | `section-hero`, `section-features`, `section-steps`, `section-cta`, `section-testimonials` | Website |

### Medidas

| Medida | Canónico | React hoje | HTML hoje |
|---|---|---|---|
| **Sidebar** | 16rem | 16rem | 16rem |
| **Sidebar móvel** | 18rem em Drawer | 18rem | não colapsa |
| **Topbar** | 3.5rem | 4rem | 3.5rem |
| **Padding do conteúdo** | 1rem, 1.5rem, 2rem | 1rem, 1.5rem, 2rem | 1.5rem |
| **Largura de Website** | 72rem | varia | varia |
| **Gap de grelha** | 1rem | varia | 1rem |
| **Breakpoints** | 640, 768, 1024, 1280 | 640, 768, 1024, 1280 | 768, 900, 1024 |
| **Mudança para móvel** | abaixo de 768px | 768px | sem comportamento na shell |

## 6. Regras de design

Nível **MUST** bloqueia a conformidade. Nível **SHOULD** exige justificação.

### Cor e tokens

- **MUST:** usar apenas tokens semânticos.
- **MUST:** não usar cores literais nem a paleta Tailwind em Components e Kits.
- **MUST:** cada estado ter um par `--status-*` e `--status-*-foreground` com contraste AA.
- **MUST:** temas de marca alterarem valores de tokens, sem CSS paralelo.
- **SHOULD:** usar fundos com tint para estados, sem borda.

### Tipografia

- **MUST:** usar uma família sans e uma mono, servidas localmente (D6).
- **MUST:** tamanho mínimo de 12px.
- **MUST:** usar a escala 12, 14, 16, 18, 20, 24, 30, 36, 48. Títulos display de 48px ou mais podem usar outros valores ou `clamp()`.
- **MUST:** usar mono só em métricas, IDs, portas, código e telemetria.
- **SHOULD:** usar números tabulares em métricas.

### Espaçamento, forma e elevação

- **MUST:** espaçamento em múltiplos de 4px.
- **MUST:** raios derivados de `--radius`.
- **SHOULD:** usar borda fina em cartões e reservar sombra para overlays.

### Ícones

- **MUST:** React usa só Phosphor; HTML usa SVG outline inline.
- **MUST:** não usar emojis em interface.
- **MUST:** botão só com ícone ter nome acessível.

### Acessibilidade

- **MUST:** contraste AA em claro e escuro.
- **MUST:** um `main` por página e um `h1` por vista.
- **MUST:** todo o controlo ter nome e todo o input ter label.
- **MUST:** alvo mínimo de 24×24px.
- **MUST:** foco visível e navegação completa por teclado.
- **MUST:** estado nunca comunicado só por cor.
- **MUST:** respeitar `prefers-reduced-motion`.

### Responsividade

- **MUST:** não haver scroll horizontal da página a 390px.
- **MUST:** tabelas e código fazerem scroll no próprio contentor.
- **MUST:** não esconder overflow para mascarar problemas de layout.
- **MUST:** badges e pills não quebrarem linha.

### Estados

- **MUST:** cada vista de dados ter estados de carregamento, vazio e erro.
- **MUST:** ações destrutivas pedirem confirmação.
- **MUST:** dados fictícios estarem identificados como demonstração.

### Tema

- **MUST:** claro e escuro funcionarem em cada Kit, salvo exceção declarada.
- **MUST:** ambas as Stacks usarem a mesma chave de preferência.
- **MUST:** não haver erro de hidratação ao carregar.

### Segurança e offline

- **MUST:** Kits HTML funcionarem sob CSP sem inline.
- **MUST:** Kits HTML não dependerem de CDN, fontes ou imagens remotas.
- **MUST:** não usar `innerHTML` com dados externos.
- **MUST:** endpoints locais validarem `Origin` e `Host` (PAT-0174).
- **MUST:** usar apenas portas de KNW-0025.

### Conteúdo

- **MUST:** interface em português de Portugal, com `lang="pt-PT"`, salvo decisão D7.
- **MUST:** não mostrar afirmações técnicas sem evidência.
- **SHOULD:** usar nomes de ações com verbo.

## 7. Decisões necessárias

| ID | Pergunta | Opções | Recomendação |
|---|---|---|---|
| **D6** | Tipografia canónica | Geist local; Inter local; fonte do sistema; outro | **Geist local**, já definida nas regras e no HTML |
| **D7** | Idioma das interfaces | pt-PT; inglês; por Kit; outro | **pt-PT**, porque a app declara português |
| **D8** | Futuro Digital offline e tema | Recursos locais e escuro real; só claro; exceção online; outro | **Recursos locais e só claro**, até existir escuro de marca |
| **D9** | Experiência de referência de Mission Control | React; HTML; nova especificação; outro | **Nova especificação**, porque hoje são produtos diferentes |
