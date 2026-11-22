export declare const THEMES: readonly ["neutral", "arcade"];
export type ThemeName = (typeof THEMES)[number];
export type ColorMode = 'light' | 'dark' | 'system';
/**
 * Setzt Theme und Hell/Dunkel auf einem Element (Standard: <html>).
 * `system` entfernt data-mode, dann gilt prefers-color-scheme.
 */
export declare function applyTheme(theme: ThemeName, mode?: ColorMode, element?: HTMLElement): void;
