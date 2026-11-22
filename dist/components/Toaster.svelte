<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { toasts, dismissToast } from '../toast.svelte.js';

	type Props = { closeLabel?: string };
	let { closeLabel = 'Schließen' }: Props = $props();
</script>

<!-- Einmal im Layout einbinden; Meldungen kommen über toast(). -->
<section class="wb-toaster" aria-live="polite" aria-relevant="additions">
	{#each toasts as item (item.id)}
		<div
			class={['wb-toast', `wb-toast--${item.tone}`]}
			role={item.tone === 'danger' ? 'alert' : 'status'}
			animate:flip={{ duration: 200 }}
			in:fly={{ y: 16, duration: 220 }}
			out:fly={{ y: 8, duration: 160 }}
		>
			<span class="wb-toast__dot" aria-hidden="true"></span>
			<p class="wb-toast__message">{item.message}</p>
			<button type="button" class="wb-toast__close" aria-label={closeLabel} onclick={() => dismissToast(item.id)}>×</button>
		</div>
	{/each}
</section>

<style>
	.wb-toaster {
		position: fixed;
		inset: auto 0 var(--wb-space-4) 0;
		z-index: var(--wb-z-toast);
		display: grid;
		justify-items: center;
		gap: var(--wb-space-2);
		padding: 0 var(--wb-space-4);
		pointer-events: none;
	}

	.wb-toast {
		--_tone: var(--wb-accent);
		display: flex;
		align-items: center;
		gap: var(--wb-space-3);
		width: min(100%, 26rem);
		padding: var(--wb-space-3) var(--wb-space-3) var(--wb-space-3) var(--wb-space-4);
		border: var(--wb-border-width) solid var(--wb-card-border);
		border-radius: var(--wb-radius-md);
		background: var(--wb-surface-raised);
		color: var(--wb-text);
		box-shadow: var(--wb-shadow-lg);
		pointer-events: auto;
	}

	.wb-toast--success {
		--_tone: var(--wb-success);
	}
	.wb-toast--danger {
		--_tone: var(--wb-danger);
	}

	.wb-toast__dot {
		width: 0.6rem;
		height: 0.6rem;
		flex-shrink: 0;
		border-radius: 50%;
		background: var(--_tone);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--_tone) 20%, transparent);
	}

	.wb-toast__message {
		flex: 1;
		font-size: var(--wb-text-sm);
		font-weight: 550;
	}

	.wb-toast__close {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 0;
		border-radius: var(--wb-radius-sm);
		background: transparent;
		color: var(--wb-text-muted);
		font-size: 1.25rem;
		line-height: 1;
		cursor: pointer;
	}

	.wb-toast__close:hover {
		background: var(--wb-bg-subtle);
		color: var(--wb-text);
	}
</style>
