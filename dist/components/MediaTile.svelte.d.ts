import type { Snippet } from 'svelte';
type Props = {
    title: string;
    description?: string;
    /** Ziel des Klicks. Fehlt es, ist die Kachel nicht anklickbar (z. B. „Bald“). */
    href?: string;
    image?: string;
    imageAlt?: string;
    /** Seitenverhältnis des Bildes, z. B. `4 / 3` oder `16 / 9`. */
    aspect?: string;
    /** Kleiner Hinweis oben links auf dem Bild (z. B. „Neu“). */
    badge?: string;
    /** Ersatz, wenn kein Bild da ist (z. B. ein Platzhalter-Muster). */
    placeholder?: Snippet;
    /** Zusatzzeile unter der Beschreibung (z. B. Spieleranzahl). */
    meta?: Snippet;
};
declare const MediaTile: import("svelte").Component<Props, {}, "">;
type MediaTile = ReturnType<typeof MediaTile>;
export default MediaTile;
