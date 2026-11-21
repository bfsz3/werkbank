<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Props = Omit<HTMLButtonAttributes, 'children'> &
		Pick<HTMLAnchorAttributes, 'target' | 'rel'> & {
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

	let {
		href,
		variant = 'primary',
		size = 'md',
		loading = false,
		block = false,
		icon,
		children,
		class: className,
		type = 'button',
		disabled,
		target,
		rel,
		...rest
	}: Props = $props();

	const classes = $derived([
		'wb-button',
		`wb-button--${variant}`,
		`wb-button--${size}`,
		block && 'wb-button--block',
		loading && 'wb-button--loading',
		className
	]);
</script>

{#if href !== undefined}
	<a {...rest as HTMLAnchorAttributes} {href} {target} {rel} class={classes}>
		{#if icon}<span class="wb-button__icon" aria-hidden="true">{@render icon()}</span>{/if}
		{@render children?.()}
	</a>
{:else}
	<button {...rest} {type} disabled={disabled || loading} aria-busy={loading || undefined} class={classes}>
		{#if loading}<span class="wb-button__spinner" aria-hidden="true"></span>{:else if icon}<span class="wb-button__icon" aria-hidden="true">{@render icon()}</span>{/if}
		{@render children?.()}
	</button>
{/if}

<style>
	.wb-button {
		--_bg: var(--wb-accent);
		--_fg: var(--wb-accent-text);
		--_border: var(--wb-button-border);
		--_shadow: var(--wb-button-shadow);
		--_shadow-hover: var(--wb-button-shadow-hover);
		--_pad-x: var(--wb-space-4);
		--_height: 2.5rem;

		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--wb-space-2);
		min-height: var(--_height);
		padding: 0 var(--_pad-x);
		border: var(--wb-border-width) solid var(--_border);
		border-radius: var(--wb-radius-md);
		background: var(--_bg);
		color: var(--_fg);
		box-shadow: var(--_shadow);
		font: inherit;
		font-weight: 650;
		font-size: var(--wb-text-sm);
		line-height: 1;
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		user-select: none;
		transition:
			transform var(--wb-duration-fast) var(--wb-ease-bounce),
			box-shadow var(--wb-duration-fast) var(--wb-ease),
			background-color var(--wb-duration-fast) var(--wb-ease);
	}

	.wb-button:hover:not(:disabled) {
		transform: translateY(var(--wb-lift));
		box-shadow: var(--_shadow-hover);
	}

	.wb-button--primary:hover:not(:disabled) {
		--_bg: var(--wb-accent-hover);
	}

	.wb-button:active:not(:disabled) {
		transform: translateY(var(--wb-press));
		box-shadow: none;
		transition-duration: 40ms;
	}

	.wb-button:disabled {
		cursor: not-allowed;
		opacity: 0.55;
	}

	.wb-button--loading:disabled {
		opacity: 0.85;
		cursor: progress;
	}

	.wb-button--secondary {
		--_bg: var(--wb-surface-raised);
		--_fg: var(--wb-text);
		--_border: var(--wb-control-border);
	}

	.wb-button--secondary:hover:not(:disabled) {
		--_bg: var(--wb-bg-subtle);
	}

	.wb-button--ghost {
		--_bg: transparent;
		--_fg: var(--wb-text);
		--_border: transparent;
		--_shadow: none;
		--_shadow-hover: none;
	}

	.wb-button--ghost:hover:not(:disabled) {
		--_bg: var(--wb-bg-subtle);
		transform: none;
	}

	.wb-button--danger {
		--_bg: var(--wb-danger);
		--_fg: var(--wb-danger-text);
	}

	.wb-button--sm {
		--_height: 2rem;
		--_pad-x: var(--wb-space-3);
		font-size: var(--wb-text-xs);
		border-radius: var(--wb-radius-sm);
	}

	.wb-button--lg {
		--_height: 3.25rem;
		--_pad-x: var(--wb-space-5);
		font-size: var(--wb-text-md);
	}

	.wb-button--block {
		display: flex;
		width: 100%;
	}

	.wb-button__icon {
		display: inline-flex;
		font-size: 1.15em;
	}

	.wb-button__spinner {
		width: 1em;
		height: 1em;
		border: 2px solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		animation: wb-spin 700ms linear infinite;
	}

	@keyframes wb-spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
