<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		tone?: 'neutral' | 'accent' | 'highlight' | 'success' | 'warning' | 'danger';
		children: Snippet;
	};

	let { tone = 'neutral', children }: Props = $props();
</script>

<span class={['wb-badge', `wb-badge--${tone}`]}>{@render children()}</span>

<style>
	.wb-badge {
		--_color: var(--wb-text-muted);
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		padding: 0.25em 0.65em;
		border-radius: var(--wb-radius-pill);
		border: 1px solid color-mix(in srgb, var(--_color) 35%, transparent);
		background: color-mix(in srgb, var(--_color) 12%, transparent);
		color: var(--_color);
		font-size: var(--wb-text-xs);
		font-weight: 650;
		line-height: 1.3;
		white-space: nowrap;
	}

	.wb-badge--accent {
		--_color: var(--wb-accent);
	}
	.wb-badge--success {
		--_color: var(--wb-success);
	}
	.wb-badge--warning {
		--_color: var(--wb-warning);
	}
	.wb-badge--danger {
		--_color: var(--wb-danger);
	}
	.wb-badge--highlight {
		background: var(--wb-highlight);
		border-color: transparent;
		color: var(--wb-highlight-text);
	}
</style>
