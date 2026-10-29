# SSE Telemetry Recipe Checklist

- [ ] Passo 1: Incluir o script `sse-client.js` no final do `<body>` do seu template HTML:
  ```html
  <script src="../recipes/sse-telemetry/sse-client.js" defer></script>
  ```
- [ ] Passo 2: Inicializar o cliente com o endpoint de telemetria local:
  ```javascript
  const telemetry = new DuTelemetryClient('http://127.0.0.1:4100/events');
  telemetry.connect();
  ```
- [ ] Passo 3: Adicionar data-attributes aos elementos a atualizar:
  - Gauges radiais: `<div class="du-radial-gauge" data-du-telemetry="cpu">...</div>`
  - Badges de estado: `<span class="ui-badge" data-du-status-key="server">...</span>`
- [ ] Passo 4: Testar reconexão automática e visualização de estado online/offline no indicador de telemetria.
