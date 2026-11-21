<script lang="ts">
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

	let { as = 'div', padding = 'md', flat = false, children, class: className, ...rest }: Props = $props();
</script>

<svelte:element this={as} {...rest} class={['wb-card', `wb-card--pad-${padding}`, flat && 'wb-card--flat', className]}>
	{@render children?.()}
</svelte:element>

<style>
	.wb-card {
		background: var(--wb-surface);
		border: var(--wb-border-width) solid var(--wb-card-border);
		border-radius: var(--wb-radius-lg);
		box-shadow: var(--wb-shadow-md);
		color: var(--wb-text);
	}

	.wb-card--flat {
		box-shadow: none;
		border-color: var(--wb-border);
	}

	.wb-card--pad-sm {
		padding: var(--wb-space-3);
	}
	.wb-card--pad-md {
		padding: var(--wb-space-5);
	}
	.wb-card--pad-lg {
		padding: clamp(var(--wb-space-5), 4vw, var(--wb-space-7));
	}
</style>
