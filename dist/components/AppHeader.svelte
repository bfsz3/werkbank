<script lang="ts" module>
	export type NavItem = { href: string; label: string; active?: boolean };
</script>

<script lang="ts">
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

	let { brand, items = [], actions, navLabel = 'Hauptnavigation' }: Props = $props();
</script>

<header class="wb-header">
	<div class="wb-header__inner">
		<div class="wb-header__brand">{@render brand()}</div>
		{#if items.length}
			<nav class="wb-header__nav" aria-label={navLabel}>
				{#each items as item (item.href + item.label)}
					<a href={item.href} class="wb-header__link" aria-current={item.active ? 'page' : undefined}>{item.label}</a>
				{/each}
			</nav>
		{/if}
		{#if actions}<div class="wb-header__actions">{@render actions()}</div>{/if}
	</div>
</header>

<style>
	.wb-header {
		position: sticky;
		top: 0;
		z-index: var(--wb-z-header);
		background: color-mix(in srgb, var(--wb-bg) 82%, transparent);
		backdrop-filter: saturate(1.4) blur(12px);
		border-bottom: var(--wb-border-width) solid var(--wb-border);
	}

	.wb-header__inner {
		display: flex;
		align-items: center;
		gap: var(--wb-space-5);
		max-width: var(--wb-content-width);
		min-height: 4rem;
		margin: 0 auto;
		padding: 0 var(--wb-space-4);
	}

	.wb-header__brand {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.wb-header__nav {
		display: flex;
		gap: var(--wb-space-1);
		overflow-x: auto;
		scrollbar-width: none;
		min-width: 0;
	}

	.wb-header__link {
		padding: var(--wb-space-2) var(--wb-space-3);
		border-radius: var(--wb-radius-pill);
		color: var(--wb-text-muted);
		font-size: var(--wb-text-sm);
		font-weight: 600;
		text-decoration: none;
		white-space: nowrap;
		transition:
			background-color var(--wb-duration-fast) var(--wb-ease),
			color var(--wb-duration-fast) var(--wb-ease);
	}

	.wb-header__link:hover {
		color: var(--wb-text);
		background: var(--wb-bg-subtle);
	}

	.wb-header__link[aria-current='page'] {
		color: var(--wb-highlight-text);
		background: var(--wb-highlight);
	}

	.wb-header__actions {
		display: flex;
		align-items: center;
		gap: var(--wb-space-2);
		margin-left: auto;
	}
</style>
