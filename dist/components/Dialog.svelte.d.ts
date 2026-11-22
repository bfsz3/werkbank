import type { Snippet } from 'svelte';
type Props = {
    /** Offen oder zu; mit `bind:open` steuerbar. */
    open?: boolean;
    title: string;
    description?: string;
    /** Klick auf den abgedunkelten Hintergrund schließt (Standard: ja). */
    dismissible?: boolean;
    size?: 'sm' | 'md';
    onclose?: () => void;
    children?: Snippet;
    /** Knopfleiste unten rechts. */
    actions?: Snippet;
};
declare const Dialog: import("svelte").Component<Props, {}, "open">;
type Dialog = ReturnType<typeof Dialog>;
export default Dialog;
