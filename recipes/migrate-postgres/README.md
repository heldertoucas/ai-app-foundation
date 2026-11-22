# Recipe: migrate-postgres

**Objetivo:** Migrar a persistência local SQLite WAL para PostgreSQL gerido em produção.

## Pré-requisitos
- Instância PostgreSQL acessível e `prisma` 6.x

## Dependências exatas
- Sem novas dependências npm obrigatórias (`@prisma/client` já incluído)

## Variáveis de ambiente (por nome)
- `DATABASE_URL` (connection string `postgresql://...`)

## Ficheiros alterados
- `prisma/schema.prisma`
- `prisma/migrations/**`
- `scripts/foundation-check.js` (se aplicável)

## Passos
1. Alterar `provider = "sqlite"` para `provider = "postgresql"` em `prisma/schema.prisma`.
2. Definir `DATABASE_URL` no ambiente de destino.
3. Executar `pnpm exec prisma migrate dev --name init_postgres` e `pnpm exec prisma generate`.

## Verificação
- `pnpm typecheck && pnpm build`
- Confirmar leitura/escrita em `/dashboard`.

## Rollback
- Restaurar `prisma/schema.prisma` para `sqlite` e regenerar com `pnpm exec prisma generate`.
