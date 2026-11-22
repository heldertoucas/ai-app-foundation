# Kit: Mission Control

**Blueprint:** Dashboard (`public/blueprints/dashboard/README.md`)  
**Paridade:** `partial` (após alinhamento WP-35)

## 1. Nome da primeira vista
- **Título único (`<h1>`):** `Visão Geral do Sistema` (substitui `Project Atlas` em React e `System Overview` em HTML).

## 2. Navegação (ordem das secções)
1. **Visão Geral** (`/dashboard` | `view-overview`)
2. **Projetos & Portas** (CRUD Prisma em React; diretório/master-detail em HTML)
3. **Métricas & Telemetria** (`/dashboard/metrics`, `/dashboard/charts` | `view-telemetry`)
4. **Matriz & Conformidade** (`/dashboard/matrix` | `view-matrix`)
5. **Agentes & Workflows** (`/dashboard/agents`, `/dashboard/workflow` | `view-agents`, `view-workflow`)
6. **Inspeção & Ações** (`/dashboard/inspection`, `/dashboard/actions` | `view-inspection`, `view-actions`)
7. **Biblioteca & Workshops** (`/dashboard/library`, `/dashboard/workshops` | `view-library`, `view-workshops`)

## 3. KPIs (4 métricas)
1. **Projetos Ativos** — React: `db.project.count()` + `getComplianceMatrixData()`; HTML: fixture identificada (`PRJ-*`).
2. **Saúde do Ecossistema** — React: `getComplianceMatrixData().overallHealth`; HTML: fixture identificada (`94%`).
3. **Sessões / Telemetria** — React: `getContextTelemetry().tokenBudget.usedPercent`; HTML: fixture identificada (`4 Online`).
4. **Candidatos Pendentes** — React: `getMemoryCandidates().length`; HTML: fixture identificada (`MEM-*`).

## 4. Blocos da overview (ordem e conteúdo)
1. **Cabeçalho da vista (`page-header`)**: Título `Visão Geral do Sistema`, subtítulo operacional, ação primária.
2. **Grelha de 4 KPIs**: Cartões de métrica com valores tabulares e estado explícito.
3. **Estado do Ecossistema & Projetos**: Em React, cartões de resumo DU + tabela/CRUD de projetos Prisma (`/dashboard`); em HTML, grelha Bento / Master-Detail com alternância de modo.
4. **Telemetria & Ações Rápidas**: Atalhos para inspeção, pesquisa (`Ctrl+K`) e gaveta de telemetria.

## 5. Dados
- **React (`/dashboard`):** lê os adaptadores canónicos em `lib/du/*` (`getComplianceMatrixData`, `getContextTelemetry`, `getMemoryCandidates`), **mantendo ativo** o CRUD Prisma de projetos (`createAtlasProject`, `deleteAtlasProject` com `assertLocalAction`).
- **HTML (`du-dashboard.html`):** usa fixtures estáticas identificadas (`data-fixture="true"`).

## 6. Estados
- **Carregamento:** skeletons explícitos em React (`KpiStatCardSkeleton`); HTML estático pronto no carregamento.
- **Vazio:** mensagem clara em pt-PT com ação de criação/recarregamento.
- **Erro:** alerta acessível (`role="alert"`) com fallback seguro sem exposição de segredos.

## 7. Exclusões
- **Só em React:** CRUD persistente em SQLite via Prisma (`createAtlasProject`, `deleteAtlasProject`), ações de servidor (`promoteCandidateAction`), e sub-rotas `/dashboard/*` independentes.
- **Só em HTML:** vistas client-side numa única página (`du-view`), alternância Bento / Master-Detail inline, e gaveta lateral de telemetria estática (`info-drawer`).
