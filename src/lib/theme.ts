export const THEMES = ['neutral', 'arcade'] as const;
export type ThemeName = (typeof THEMES)[number];
export type ColorMode = 'light' | 'dark' | 'system';

/**
 * Setzt Theme und Hell/Dunkel auf einem Element (Standard: <html>).
 * `system` entfernt data-mode, dann gilt prefers-color-scheme.
 */
export function applyTheme(theme: ThemeName, mode: ColorMode = 'system', element: HTMLElement = document.documentElement): void {
	element.dataset.theme = theme;
	if (mode === 'system') delete element.dataset.mode;
	else element.dataset.mode = mode;
}
