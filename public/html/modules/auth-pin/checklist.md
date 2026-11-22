# Local PIN Lock Recipe Checklist

> **Aviso de Segurança (SEC-02)**: O `pin-lock.js` é uma barreira de conveniência no cliente para quiosques, cockpits e webviews locais offline. Não substitui autenticação criptográfica segura no servidor nem protege recursos acedidos diretamente por rede.

- [ ] Passo 1: Incluir o script `pin-lock.js` no `<head>` ou início do `<body>`:
  ```html
  <script src="../../modules/auth-pin/pin-lock.js" defer></script>
  ```
- [ ] Passo 2: Inicializar o lock indicando a hash ou PIN esperado e a duração da sessão:
  ```javascript
  duPinLock.init({
    correctPin: '2026',
    sessionMinutes: 60,
    title: 'Mission Control Access'
  });
  ```
- [ ] Passo 3: Testar tentativa com PIN errado (efeito shake e feedback visual) e desbloqueio bem-sucedido.
- [ ] Passo 4: Opcionalmente invocar `duPinLock.lockNow()` num botão de "Lock / Sair".
