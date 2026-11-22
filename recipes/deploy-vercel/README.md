# Recipe: deploy-vercel

**Objetivo:** Preparar a aplicação Next.js para publicação na Vercel com build reproduzível.

## Pré-requisitos
- Conta/projeto Vercel e base de dados externa (ver `recipes/migrate-postgres`)

## Dependências exatas
- Sem dependências npm adicionais

## Variáveis de ambiente (por nome)
- `DATABASE_URL`
- Variáveis de sessão/autenticação se `add-auth` estiver ativo

## Ficheiros alterados
- `next.config.ts`
- `proxy.ts` (ajustar `ALLOWED_HOSTS` para o domínio de produção)

## Passos
1. Concluir `recipes/migrate-postgres` antes de publicar (SQLite local não persiste em serverless).
2. Configurar as variáveis de ambiente no painel Vercel.
3. Ajustar `isAllowedHost` para aceitar o domínio público de produção.

## Verificação
- `pnpm foundation:check && pnpm typecheck && pnpm build`
- Validar preview deployment na Vercel.

## Rollback
- Reverter as alterações em `proxy.ts` e `next.config.ts`.
