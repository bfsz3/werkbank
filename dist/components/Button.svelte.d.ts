import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
type Props = Omit<HTMLButtonAttributes, 'children'> & Pick<HTMLAnchorAttributes, 'target' | 'rel' | 'download' | 'hreflang'> & {
    /** Mit href wird der Knopf zu einem Link (<a>). */
    href?: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    /** Zeigt einen Ladeindikator und sperrt den Knopf. */
    loading?: boolean;
    /** Volle Breite des Containers. */
    block?: boolean;
    icon?: Snippet;
    children?: Snippet;
};
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
