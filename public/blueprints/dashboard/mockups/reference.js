
/* Generated action registry: replaces inline event handlers. */
window.duActions = Object.assign(window.duActions || {}, {
  "DU.toast": (...args) => (typeof DU !== 'undefined' ? DU.toast(...args) : console.error('Missing action: DU.toast')),
});
