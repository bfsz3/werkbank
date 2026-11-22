<script lang="ts">
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

	let {
		open = $bindable(false),
		title,
		description,
		dismissible = true,
		size = 'sm',
		onclose,
		children,
		actions
	}: Props = $props();

	let dialog: HTMLDialogElement | undefined = $state();
	const uid = $props.id();
	const titleId = `wb-dialog-${uid}`;

	// Natives <dialog>: bringt Fokusfalle, Esc und Top-Layer mit.
	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	});

	function handleClose() {
		open = false;
		onclose?.();
	}

	function handleClick(event: MouseEvent) {
		if (dismissible && event.target === dialog) dialog?.close();
	}

	function handleCancel(event: Event) {
		if (!dismissible) event.preventDefault();
	}
</script>

<dialog
	bind:this={dialog}
	class={['wb-dialog', `wb-dialog--${size}`]}
	aria-labelledby={titleId}
	onclose={handleClose}
	oncancel={handleCancel}
	onclick={handleClick}
>
	<div class="wb-dialog__panel">
		<header class="wb-dialog__header">
			<h2 id={titleId} class="wb-dialog__title">{title}</h2>
			{#if description}<p class="wb-dialog__description">{description}</p>{/if}
		</header>
		{#if children}<div class="wb-dialog__body">{@render children()}</div>{/if}
		{#if actions}<footer class="wb-dialog__actions">{@render actions()}</footer>{/if}
	</div>
</dialog>

<style>
	.wb-dialog {
		width: min(100% - 2 * var(--wb-space-4), 26rem);
		max-height: calc(100dvh - 2 * var(--wb-space-4));
		padding: 0;
		border: var(--wb-border-width) solid var(--wb-card-border);
		border-radius: var(--wb-radius-lg);
		background: var(--wb-surface);
		color: var(--wb-text);
		box-shadow: var(--wb-shadow-lg);
		overflow: auto;
		opacity: 1;
		transform: none;
		transition:
			opacity var(--wb-duration-base) var(--wb-ease),
			transform var(--wb-duration-base) var(--wb-ease-bounce),
			overlay var(--wb-duration-base) allow-discrete,
			display var(--wb-duration-base) allow-discrete;
	}

	.wb-dialog--md {
		width: min(100% - 2 * var(--wb-space-4), 36rem);
	}

	.wb-dialog:not([open]) {
		opacity: 0;
		transform: translateY(12px) scale(0.97);
	}

	@starting-style {
		.wb-dialog[open] {
			opacity: 0;
			transform: translateY(12px) scale(0.97);
		}
	}

	.wb-dialog::backdrop {
		background: color-mix(in srgb, var(--wb-ink) 45%, transparent);
		backdrop-filter: blur(3px);
	}

	.wb-dialog__panel {
		display: grid;
		gap: var(--wb-space-4);
		padding: var(--wb-space-5);
	}

	.wb-dialog__header {
		display: grid;
		gap: var(--wb-space-2);
	}

	.wb-dialog__title {
		font-size: var(--wb-text-xl);
	}

	.wb-dialog__description {
		color: var(--wb-text-muted);
		font-size: var(--wb-text-sm);
	}

	.wb-dialog__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: var(--wb-space-2);
		padding-top: var(--wb-space-2);
	}
</style>
