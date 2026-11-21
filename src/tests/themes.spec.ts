import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { THEMES } from '../lib/theme.js';

const themeDir = fileURLToPath(new URL('../lib/styles/themes/', import.meta.url));

function readTheme(name: string): string {
	return readFileSync(`${themeDir}${name}.css`, 'utf8');
}

/** Alle in der Haupt-Regel `[data-theme='x'] { … }` deklarierten Tokens. */
function tokens(css: string): Map<string, string> {
	const main = css.match(/\[data-theme='[a-z]+'\]\s*\{([\s\S]*?)\n\}/);
	if (!main) throw new Error('Theme-Regel nicht gefunden');
	const result = new Map<string, string>();
	for (const [, name, value] of main[1].matchAll(/(--wb-[a-z0-9-]+)\s*:\s*([^;]+);/g)) result.set(name, value.trim());
	return result;
}

function luminance(hex: string): number {
	const channels = hex
		.replace('#', '')
		.match(/../g)!
		.map((c) => parseInt(c, 16) / 255)
		.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
	return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a: string, b: string): number {
	const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (l1 + 0.05) / (l2 + 0.05);
}

/** `light-dark(#aaa, #bbb)` → ['#aaa', '#bbb'] */
function lightDark(value: string | undefined): [string, string] {
	const match = value?.match(/light-dark\((#[0-9a-f]{6}),\s*(#[0-9a-f]{6})\)/i);
	if (!match) throw new Error(`Kein light-dark-Hexwert: ${value}`);
	return [match[1], match[2]];
}

describe('Themes', () => {
	const all = THEMES.map((name) => ({ name, tokens: tokens(readTheme(name)) }));

	it('deklarieren alle dieselben Tokens, damit Komponenten in jedem Theme funktionieren', () => {
		const reference = [...all[0].tokens.keys()].sort();
		expect(reference.length).toBeGreaterThan(40);
		for (const theme of all.slice(1)) expect([...theme.tokens.keys()].sort(), theme.name).toEqual(reference);
	});

	it('kennen hellen und dunklen Modus über data-mode', () => {
		for (const name of THEMES) {
			const css = readTheme(name);
			expect(css).toContain(`[data-theme='${name}'][data-mode='dark']`);
			expect(css).toContain(`[data-theme='${name}'][data-mode='light']`);
		}
	});

	// WCAG: Fließtext ≥ 4,5:1, große Schrift und Bedienelemente ≥ 3:1.
	const pairs: [fg: string, bg: string, min: number][] = [
		['--wb-text', '--wb-bg', 7],
		['--wb-text', '--wb-surface', 7],
		['--wb-text-muted', '--wb-bg', 4.5],
		['--wb-text-muted', '--wb-surface', 4.5],
		['--wb-accent-text', '--wb-accent', 4.5],
		['--wb-danger-text', '--wb-danger', 4.5],
		['--wb-highlight-text', '--wb-highlight', 4.5],
		['--wb-danger', '--wb-surface', 3],
		['--wb-success', '--wb-surface', 3],
		['--wb-focus', '--wb-bg', 3]
	];

	for (const theme of all) {
		for (const [fg, bg, min] of pairs) {
			it(`${theme.name}: ${fg} auf ${bg} hat genug Kontrast (hell und dunkel)`, () => {
				const [fgLight, fgDark] = lightDark(theme.tokens.get(fg));
				const [bgLight, bgDark] = lightDark(theme.tokens.get(bg));
				expect(contrast(fgLight, bgLight)).toBeGreaterThanOrEqual(min);
				expect(contrast(fgDark, bgDark)).toBeGreaterThanOrEqual(min);
			});
		}
	}
});
