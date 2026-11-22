/**
 * DU HTML Foundation Kit — Dynamic DataTable Fetch
 * Zero dependencies / Safe DOM rendering
 * Supports fetch() over HTTP(S) and <script type="application/json"> fallback under file://.
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
      label: th.textContent.trim(),
    }));
  }

  _readInlineJson(source) {
    const targetId = source.startsWith('#') ? source.slice(1) : source;
    const scriptEl = document.getElementById(targetId) || document.querySelector('script[type="application/json"][data-du-table-data]');
    if (!scriptEl) return null;
    return JSON.parse(scriptEl.textContent || '[]');
  }

  async load(overrideUrl) {
    if (!this.tbody) return;
    const url = overrideUrl || this.source;
    if (!url) return;

    this._renderSkeleton();

    try {
      let data;
      if (location.protocol === 'file:' || url.startsWith('#')) {
        data = this._readInlineJson(url);
        if (data === null) throw new Error('Inline JSON data element not found for file:// mode');
      } else {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
      }
      const rows = Array.isArray(data) ? data : data.items || [];
      this.renderRows(rows);
    } catch (err) {
      this._renderError(err.message);
    }
  }

  _renderSkeleton() {
    const colCount = this.fields.length || 3;
    const trs = [];
    for (let i = 0; i < 4; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < colCount; j++) {
        const td = document.createElement('td');
        const sk = document.createElement('div');
        sk.className = 'du-skeleton du-table-skeleton';
        td.append(sk);
        tr.append(td);
      }
      trs.push(tr);
    }
    this.tbody.replaceChildren(...trs);
  }

  _renderError(msg) {
    const colCount = this.fields.length || 3;
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = colCount;
    td.className = 'du-table-error';
    td.textContent = `Falha ao carregar dados: ${String(msg ?? '')}`;
    tr.append(td);
    this.tbody.replaceChildren(tr);
  }

  renderRows(rows) {
    if (!rows.length) {
      const colCount = this.fields.length || 3;
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = colCount;
      td.className = 'du-table-empty';
      td.textContent = 'Sem registos encontrados.';
      tr.append(td);
      this.tbody.replaceChildren(tr);
      return;
    }

    const trs = rows.map((row) => {
      const tr = document.createElement('tr');
      for (const f of this.fields) {
        const td = document.createElement('td');
        const rawVal = row[f.key] !== undefined ? row[f.key] : '';
        if (this.renderers[f.key]) {
          const out = this.renderers[f.key](rawVal, row);
          if (out instanceof Node) td.append(out);
          else td.textContent = String(out ?? '');
        } else {
          td.textContent = rawVal === null || rawVal === undefined ? '' : String(rawVal);
        }
        tr.append(td);
      }
      return tr;
    });

    this.tbody.replaceChildren(...trs);
  }
}

if (typeof window !== 'undefined') {
  window.DuDataTable = DuDataTable;
}
