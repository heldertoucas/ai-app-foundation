# Local PIN Lock Recipe Checklist

> **Aviso:** `auth-pin` é uma barreira de conveniência no browser. Não protege dados.

- [ ] Passo 1: Incluir a folha de estilos e o script no `<head>` ou início do `<body>`:
  ```html
  <link rel="stylesheet" href="../../modules/auth-pin/auth-pin.css">
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
