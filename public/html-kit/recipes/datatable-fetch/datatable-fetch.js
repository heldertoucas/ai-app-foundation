/**
 * DU HTML Foundation Kit — Dynamic DataTable Fetch
 * Zero dependencies / Clean native fetch wrapper
 * Renders JSON feeds into shadcn .ui-table structures with loading skeletons and error handling.
 */

class DuDataTable {
  constructor(selector, options = {}) {
    this.table = typeof selector === 'string' ? document.querySelector(selector) : selector;
    this.tbody = this.table ? this.table.querySelector('tbody') : null;
    this.source = options.source || (this.table ? this.table.getAttribute('data-du-table-source') : '');
    this.fields = options.fields || this._extractFields();
    this.renderers = options.renderers || {};
  }

  _extractFields() {
    if (!this.table) return [];
    return Array.from(this.table.querySelectorAll('thead th')).map((th) => ({
      key: th.getAttribute('data-field') || th.textContent.trim().toLowerCase(),
      label: th.textContent.trim()
    }));
  }

  async load(overrideUrl) {
    if (!this.tbody) return;
    const url = overrideUrl || this.source;
    if (!url) return;

    this._renderSkeleton();

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const rows = Array.isArray(data) ? data : data.items || [];
      this.renderRows(rows);
    } catch (err) {
      this._renderError(err.message);
    }
  }

  _renderSkeleton() {
    const colCount = this.fields.length || 3;
    let html = '';
    for (let i = 0; i < 4; i++) {
      html += '<tr>';
      for (let j = 0; j < colCount; j++) {
        html += '<td><div class="du-skeleton" style="height: 1rem; width: 80%; background: var(--muted); border-radius: 4px; animation: pulse 1.5s infinite;"></div></td>';
      }
      html += '</tr>';
    }
    this.tbody.innerHTML = html;
  }

  _renderError(msg) {
    const colCount = this.fields.length || 3;
    this.tbody.innerHTML = `<tr><td colspan="${colCount}" style="text-align: center; color: var(--destructive); padding: 1.5rem;">Failed to load data: ${msg}</td></tr>`;
  }

  renderRows(rows) {
    if (!rows.length) {
      const colCount = this.fields.length || 3;
      this.tbody.innerHTML = `<tr><td colspan="${colCount}" style="text-align: center; color: var(--muted-foreground); padding: 1.5rem;">No records found.</td></tr>`;
      return;
    }

    this.tbody.innerHTML = rows
      .map((row) => {
        const cells = this.fields
          .map((f) => {
            const val = row[f.key] !== undefined ? row[f.key] : '';
            const custom = this.renderers[f.key] ? this.renderers[f.key](val, row) : val;
            return `<td>${custom}</td>`;
          })
          .join('');
        return `<tr>${cells}</tr>`;
      })
      .join('');
  }
}

if (typeof window !== 'undefined') {
  window.DuDataTable = DuDataTable;
}
