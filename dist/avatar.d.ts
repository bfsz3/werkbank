/** Bis zu zwei Initialen aus einem Namen, z. B. „Kim Berg“ → „KB“, „flinkerfuchs“ → „FL“. */
export declare function initials(name: string): string;
/** Stabiler Farbton (0–359) aus einem Text, damit derselbe Name immer dieselbe Farbe bekommt. */
export declare function hueFromString(text: string): number;
