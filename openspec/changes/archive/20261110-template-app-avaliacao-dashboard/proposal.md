# Proposal: Template Canónico App Avaliação Dashboard

## Why

A aplicação de avaliação e monitorização de exames (`app-avaliacao`) tem servido como ferramenta crítica na formação da CMLisboa, mas padece de três limitações estruturais:
1. **Divergência de Design e Ícones**: Mistura de ícones do Material Symbols e estilos inline ad-hoc com ausência de tokens unificados do Design System DU (`--status-live`, `--status-drift`, `--card`, `--primary`).
2. **Ausência de Simetria Zero-Build**: Formadores no terreno frequentemente enfrentam conexões fracas ou computadores institucionais restritos onde rodar stacks pesadas de Node/Next.js é inviável. É imperativo ter um cockpit HTML5 standalone (zero-build, offline-first) com paridade visual rigorosa de 100%.
3. **Falta de Blueprint Canónico no ai-app-foundation**: O repositório `ai-app-foundation` tem blueprints para dashboards e marketing, mas carece do template canónico de gestão pedagógica/avaliação que una autenticação por PIN, cockpit de telemetria e tabela de monitorização dinâmica.

## What Changes

- **Nova Rota de Aplicação Canónica**:
  - `app/(site)/avaliacao-dashboard/page.tsx`: Ecrã de entrada com alternância de perfil (Formador com Código de Turma + PIN de 4 dígitos; Administrador com Master Password).
  - `app/(site)/avaliacao-dashboard/admin/page.tsx`: Cockpit executivo e de telemetria com status de sincronização (Google Sheets, Neon DB, quotas de API), latências e log de eventos de auditoria.
  - `app/(site)/avaliacao-dashboard/trainer/page.tsx`: Mesa de trabalho do formador com tabela interativa de formandos, status de submissão, notas, percentis e controlo de ações (submeter, reabrir teste, exportar).
- **Template Zero-Build Autónomo**:
  - `public/html-kit/templates/du-avaliacao-dashboard.html`: Ficheiro HTML único integrando os tokens DU (`tokens.css`, `du-components.css`), a receita `auth-pin-lock` e a receita `datatable-fetch` para renderização imediata sem compilação.
- **Componentes e Modelos Auxiliares**:
  - `components/avaliacao-dashboard/`: Componentes reutilizáveis (PinPad, TelemetryCard, TraineeTable, SyncHealthBadge).
  - `lib/avaliacao/`: Dados mock tipados e contratos de interface para paridade de desenvolvimento.

## Capabilities

### New Capabilities
- `avaliacao-dashboard-template`: Template canónico completo com auth pin-lock, cockpit administrativo de sincronizações e monitorização de avaliações em tempo real.
- `zero-build-avaliacao-parity`: Cockpit HTML5 standalone espelhado com zero dependências de build, apto para execução em browser puro ou quiosques.

### Modified Capabilities
- *(Nenhuma alteração a rotas existentes)*

## Impact
- **Ficheiros Afetados**:
  - Criação de `app/(site)/avaliacao-dashboard/**`
  - Criação de `components/avaliacao-dashboard/**`
  - Criação de `lib/avaliacao/**`
  - Criação de `public/html-kit/templates/du-avaliacao-dashboard.html`
  - Testes em `components/avaliacao-dashboard/__tests__/**`
- **Dependências**: Reutiliza `@phosphor-icons/react`, Radix UI e Tailwind CSS v4 já instalados no projeto. Nenhuma dependência externa adicional.
- **Garantia de Qualidade**: 100% de conformidade com `pnpm foundation:check`, `pnpm typecheck` e testes Vitest.
