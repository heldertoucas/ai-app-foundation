# LocalStorage State Recipe Checklist

- [ ] Passo 1: Incluir o script `state-sync.js` no final do `<body>` do seu template HTML:
  ```html
  <script src="../recipes/localstorage-state/state-sync.js" defer></script>
  ```
- [ ] Passo 2: Adicionar o atributo `data-du-persist="chave_unica"` aos elementos a preservar:
  - Inputs de pesquisa: `<input data-du-persist="search-query" ...>`
  - Filtros / Selects: `<select data-du-persist="status-filter" ...>`
  - Toggles e Checkboxes: `<input type="checkbox" data-du-persist="dense-mode" ...>`
- [ ] Passo 3: Opcionalmente inicializar com prefixo de namespace (ex: `duStateSync.init('meu-cockpit')`).
- [ ] Passo 4: Recarregar a página e confirmar que o estado persiste no browser.
