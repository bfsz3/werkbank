/** Bis zu zwei Initialen aus einem Namen, z. B. „Kim Berg“ → „KB“, „flinkerfuchs“ → „FL“. */
export function initials(name: string): string {
	const words = name.trim().split(/\s+/).filter(Boolean);
	if (words.length === 0) return '?';
	if (words.length === 1) return Array.from(words[0]).slice(0, 2).join('').toUpperCase();
	return (Array.from(words[0])[0] + Array.from(words[words.length - 1])[0]).toUpperCase();
}

/** Stabiler Farbton (0–359) aus einem Text, damit derselbe Name immer dieselbe Farbe bekommt. */
export function hueFromString(text: string): number {
	let hash = 0;
	for (const char of text) hash = (hash * 31 + char.codePointAt(0)!) >>> 0;
	return hash % 360;
}
