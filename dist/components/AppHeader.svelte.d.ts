export type NavItem = {
    href: string;
    label: string;
    active?: boolean;
};
import type { Snippet } from 'svelte';
type Props = {
    /** Logo/Name links; meist ein Link auf die Startseite. */
    brand: Snippet;
    items?: NavItem[];
    /** Bereich rechts, z. B. Konto-Knopf. */
    actions?: Snippet;
    /** Beschriftung der Navigation für Screenreader. */
    navLabel?: string;
};
declare const AppHeader: import("svelte").Component<Props, {}, "">;
type AppHeader = ReturnType<typeof AppHeader>;
export default AppHeader;
