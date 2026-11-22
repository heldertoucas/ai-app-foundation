# Recipe: add-auth

**Objetivo:** Adicionar autenticação de sessão server-side às rotas protegidas da aplicação React.

## Pré-requisitos
- Decisão humana sobre o fornecedor de identidade (ex.: OIDC institucional ou Auth.js)

## Dependências exatas
- `next-auth@5` (ou SDK do fornecedor aprovado)

## Variáveis de ambiente (por nome)
- `AUTH_SECRET`
- Variáveis específicas do fornecedor OIDC escolhido

## Ficheiros alterados
- `package.json`, `pnpm-lock.yaml`
- `auth.ts` (novo), `app/api/auth/[...nextauth]/route.ts` (novo)
- `proxy.ts`

## Passos
1. Confirmar com o utilizador o fornecedor de identidade antes de instalar.
2. Instalar o pacote aprovado e definir `AUTH_SECRET` em `.env.local`.
3. Ligar proteção de sessão em `proxy.ts` e nas Server Actions.

## Verificação
- `pnpm typecheck && pnpm test && pnpm build`
- Confirmar redirecionamento `401`/`302` sem sessão ativa.

## Rollback
- Reverter `proxy.ts`, remover `auth.ts` e desinstalar o pacote de autenticação.
