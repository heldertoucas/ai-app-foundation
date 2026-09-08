# Handoff: Transição para a Lean App Foundation (Auto-Desempacotável)

> **Data**: 2026-09-09  
> **Objetivo**: Documento orientador para agentes de IA e engenheiros sobre a decisão arquitetural de resetar o repositório, purgando o bloat do `next-forge` e transformando a fundação num molde inteligente ("self-unpacking template").

---

## 1. Contexto e Motivação

### O Problema do `next-forge` (Legado)
O repositório foi inicialmente baseado em `vercel/next-forge`. Embora oferecesse boas práticas visuais, trouxe consigo uma hiper-fragmentação insustentável:
- **27 pacotes** no monorepo e **7 aplicações paralelas** (`docs`, `email`, `storybook`, `studio`, `api`, etc.).
- Acoplamento forçado a serviços SaaS comerciais (Clerk, Sentry, Knock, BetterStack, Liveblocks, BaseHub, Svix).
- Builds e typechecks lentos (> 2 minutos) e frequentes colisões de dependências (`NextRequest`).
- Inércia e atrito para iniciar novos projetos simples e locais.

### A Nova Visão
Transformar `ai-app-foundation` numa **fundação maleável, autónoma e livre de bloat**, desenhada para:
1. Servir de base local-first rápida (<1s de arranque).
2. Ser clonada para projetos futuros no Development Universe (como `rulesync-explorer` para dashboards internos e `futuro-digital-react` para websites de conteúdo).
3. **Auto-desempacotar-se** via script (`pnpm init-app`) ou via instruções claras para Agentes de IA (`AGENTS.md`).

---

## 2. Decisão Arquitetural Principal

| Dimensão | Antes (next-forge) | Depois (Lean Foundation) |
| :--- | :--- | :--- |
| **Estrutura** | Monorepo Turborepo (27 pacotes, 7 apps) | **Single-app Next.js 16 limpa** |
| **Frontend** | React 19 + Tailwind CSS v4 + shadcn/ui | **React 19 + Tailwind CSS v4 + shadcn/ui canónico** |
| **Design Assistance** | Storybook isolado e pesado | **shadcn MCP nativo** integrado no agente |
| **Persistência** | Neon Postgres serverless cloud | **Prisma com SQLite local default (`file:./dev.db`)**, com switch opcional para Postgres |
| **Observabilidade** | Sentry / BetterStack SaaS | **Pino** (logs estruturados JSON / legíveis locais) |
| **Templates** | Dispersos por apps secundárias | **2 Blueprints no App Router**: `(dashboard)` e `(site)` |
| **Reutilização** | Cópia manual de código complexo | **Motor de desempacotamento**: `pnpm init-app` + `AGENTS.md` |

---

## 3. Como Funciona o Motor de Auto-Desempacotamento ("Self-Unpacker")

Quando esta fundação for clonada para um novo repositório (ex: `futuro-digital-react` ou `rulesync-explorer`), o agente ou utilizador pode adaptá-la em segundos:

### Modo A: Interativo (Humano)
```bash
pnpm init-app
```
O script pergunta:
1. Nome da aplicação.
2. Perfil pretendido: `[1] Dashboard Interno`, `[2] Website de Conteúdo`, ou `[3] Ambos`.
3. Necessidade de Base de Dados: ativa ou remove o Prisma SQLite.
O script remove os ficheiros que não pertencem ao perfil escolhido e deixa a aplicação pronta.

### Modo B: Guiado por Agente de IA (Autónomo)
O ficheiro `AGENTS.md` contém receitas exatas:
- **Para Dashboard**: Manter a rota `(dashboard)`, ligar a navegação lateral e cartões KPI, ligar o modelo Prisma pretendido.
- **Para Website**: Manter a rota `(site)`, remover componentes de administração, ajustar a paleta de cores e tipografia acessível.

---

## 4. Salvaguarda do Código Anterior
Antes de qualquer alteração destrutiva na branch `main`:
- O código atual com todo o histórico do `next-forge`, as provas de conceito de workshops e a documentação upstream foi preservado na branch:
  `archive/next-forge-v2`
- Isto permite consultar ou resgatar qualquer componente visual a qualquer momento.

---

## 5. Rastreio e Especificação OpenSpec

Todas as tarefas e requisitos formais estão rastreados no OpenSpec:
- **Change**: `lean-app-foundation`
- **Diretório**: `C:\Users\helder.toucas\Dev\openspec\changes\lean-app-foundation\`
- **Capacidades cobertas**:
  1. `foundation-core` (Next.js 16 + Tailwind v4 + shadcn/ui)
  2. `local-persistence` (Prisma SQLite / Postgres)
  3. `app-blueprints` (`(dashboard)` e `(site)`)
  4. `open-telemetry-logging` (Pino)
  5. `self-unpacker` (`pnpm init-app` e protocolo em `AGENTS.md`)

Para avançar com a execução ordenada das tarefas, o agente deve seguir o workflow do OpenSpec (`/opsx-apply`).
