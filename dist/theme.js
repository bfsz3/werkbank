export const THEMES = ['neutral', 'arcade'];
/**
 * Setzt Theme und Hell/Dunkel auf einem Element (Standard: <html>).
 * `system` entfernt data-mode, dann gilt prefers-color-scheme.
 */
export function applyTheme(theme, mode = 'system', element = document.documentElement) {
    element.dataset.theme = theme;
    if (mode === 'system')
        delete element.dataset.mode;
    else
        element.dataset.mode = mode;
}
