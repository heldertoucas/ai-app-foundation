# Recipe: add-ai

**Objetivo:** Adicionar capacidades de streaming de IA server-side com Vercel AI SDK.

## Pré-requisitos
- Node 22+ e `pnpm`
- Chave de fornecedor LLM autorizada

## Dependências exatas
- `ai`
- `@ai-sdk/openai` (ou fornecedor equivalente)

## Variáveis de ambiente (por nome)
- `OPENAI_API_KEY` (ou chave do fornecedor escolhido)

## Ficheiros alterados
- `package.json`, `pnpm-lock.yaml`
- `app/api/chat/route.ts` (novo)

## Passos
1. Instalar dependências: `pnpm add ai @ai-sdk/openai`.
2. Configurar `OPENAI_API_KEY` no `.env.local` (nunca versionar).
3. Criar `app/api/chat/route.ts` com `streamText` e validação de origem local se aplicável.

## Verificação
- `pnpm typecheck && pnpm build`
- Testar `POST /api/chat` com payload JSON válido.

## Rollback
- Remover `app/api/chat/route.ts` e executar `pnpm remove ai @ai-sdk/openai`.
