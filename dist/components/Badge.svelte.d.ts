import type { Snippet } from 'svelte';
type Props = {
    tone?: 'neutral' | 'accent' | 'highlight' | 'success' | 'warning' | 'danger';
    children: Snippet;
};
declare const Badge: import("svelte").Component<Props, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
