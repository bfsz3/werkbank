import { describe, expect, it } from 'vitest';
import { hueFromString, initials } from '../lib/avatar.js';

describe('initials', () => {
	it('nimmt ersten und letzten Anfangsbuchstaben', () => {
		expect(initials('Kim Berg')).toBe('KB');
		expect(initials('  anna maria  schmidt ')).toBe('AS');
	});
	it('nimmt bei einem Wort die ersten zwei Zeichen', () => {
		expect(initials('flinkerfuchs')).toBe('FL');
		expect(initials('Ö')).toBe('Ö');
	});
	it('liefert ? für leere Namen', () => {
		expect(initials('   ')).toBe('?');
	});
});

describe('hueFromString', () => {
	it('ist stabil und liegt zwischen 0 und 359', () => {
		expect(hueFromString('Gast 4821')).toBe(hueFromString('Gast 4821'));
		for (const name of ['a', 'Kim', 'Gast 1', '🙂']) {
			const hue = hueFromString(name);
			expect(hue).toBeGreaterThanOrEqual(0);
			expect(hue).toBeLessThan(360);
		}
	});
});
