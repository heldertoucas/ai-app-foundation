/**
 * DU HTML Foundation Kit — SSE Telemetry Client
 * Zero dependencies / Native browser EventSource
 * Automatically reconnects with exponential backoff and updates DU UI elements.
 */

class DuTelemetryClient {
  constructor(endpoint, options = {}) {
    this.endpoint = endpoint;
    this.reconnectDelay = options.reconnectDelay || 2000;
    this.maxReconnectDelay = options.maxReconnectDelay || 15000;
    this.currentDelay = this.reconnectDelay;
    this.eventSource = null;
    this.listeners = new Map();
  }

  connect() {
    try {
      this.eventSource = new EventSource(this.endpoint);

      this.eventSource.onopen = () => {
        this.currentDelay = this.reconnectDelay;
        this._updateConnectionPill(true);
      };

      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this._dispatch(data);
        } catch {
          // ignore malformed payloads
        }
      };

      this.eventSource.onerror = () => {
        this._updateConnectionPill(false);
        this.eventSource.close();
        setTimeout(() => this.connect(), this.currentDelay);
        this.currentDelay = Math.min(this.currentDelay * 1.5, this.maxReconnectDelay);
      };
    } catch (err) {
      this._updateConnectionPill(false);
      setTimeout(() => this.connect(), this.currentDelay);
    }
  }

  on(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key).push(callback);
  }

  _dispatch(data) {
    // 1. Executa callbacks registados
    for (const [key, val] of Object.entries(data)) {
      if (this.listeners.has(key)) {
        this.listeners.get(key).forEach((cb) => cb(val));
      }
    }

    // 2. Auto-bind em elementos com data-du-telemetry="chave"
    document.querySelectorAll('[data-du-telemetry]').forEach((el) => {
      const key = el.getAttribute('data-du-telemetry');
      if (data[key] !== undefined) {
        const valEl = el.querySelector('.du-gauge-val, .du-stat-value, span');
        if (valEl) {
          valEl.textContent = typeof data[key] === 'number' ? `${data[key]}%` : data[key];
        }
      }
    });
  }

  _updateConnectionPill(isOnline) {
    document.querySelectorAll('.du-telemetry-pill').forEach((pill) => {
      const core = pill.querySelector('.du-ping-core');
      const text = pill.querySelector('span:last-child');
      if (core) {
        core.style.backgroundColor = isOnline ? 'var(--status-live)' : 'var(--status-missing)';
      }
      if (text) {
        text.textContent = isOnline ? 'Live' : 'Offline';
      }
    });
  }
}

if (typeof window !== 'undefined') {
  window.DuTelemetryClient = DuTelemetryClient;
}
