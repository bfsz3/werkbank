import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLElement> & {
    /** HTML-Element der Karte, z. B. `section` oder `article`. */
    as?: 'div' | 'section' | 'article' | 'aside';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    /** Flache Variante ohne Schatten (z. B. für Formulare in einer Karte). */
    flat?: boolean;
    children?: Snippet;
};
declare const Card: import("svelte").Component<Props, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
