/* Runs in <head> to apply the saved theme before the first paint. */
(() => {
  const storageKey = 'researcher-site-theme';
  const modes = ['system', 'light', 'dark'];
  const english = document.documentElement.lang === 'en';
  const labels = english
    ? { system: 'System', light: 'Light', dark: 'Dark' }
    : { system: '自動', light: 'ライト', dark: 'ダーク' };
  let mode = 'system';
  try {
    const saved = localStorage.getItem(storageKey);
    if (modes.includes(saved)) mode = saved;
  } catch { /* Storage can be unavailable; system preference still works. */ }

  function apply() {
    if (mode === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = mode;
  }
  apply();

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    function updateButton() {
      const next = modes[(modes.indexOf(mode) + 1) % modes.length];
      button.textContent = english ? `Theme: ${labels[mode]}` : `表示：${labels[mode]}`;
      button.setAttribute('aria-label', english
        ? `Theme: ${labels[mode]}. Switch to ${labels[next]}`
        : `表示：${labels[mode]}。${labels[next]}に切り替える`);
    }
    button.hidden = false;
    updateButton();
    button.addEventListener('click', () => {
      mode = modes[(modes.indexOf(mode) + 1) % modes.length];
      apply();
      updateButton();
      try { localStorage.setItem(storageKey, mode); } catch { /* Optional persistence. */ }
    });
  });
})();
