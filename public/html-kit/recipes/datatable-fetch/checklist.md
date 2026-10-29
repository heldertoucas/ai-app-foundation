# Dynamic DataTable Fetch Recipe Checklist

- [ ] Passo 1: Incluir o script `datatable-fetch.js` no final do `<body>`:
  ```html
  <script src="../recipes/datatable-fetch/datatable-fetch.js" defer></script>
  ```
- [ ] Passo 2: Definir a tabela HTML com o atributo `data-du-table-source="URL_DO_JSON"`:
  ```html
  <table class="ui-table" id="users-table" data-du-table-source="/api/users.json">
    <thead>
      <tr>
        <th data-field="id">ID</th>
        <th data-field="name">Name</th>
        <th data-field="status">Status</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
  ```
- [ ] Passo 3: Inicializar ou configurar colunas customizadas (ex: badges ou formatações):
  ```javascript
  const dt = new DuDataTable('#users-table');
  dt.load();
  ```
- [ ] Passo 4: Verificar estados de loading skeleton e mensagens de erro sem dependências.
