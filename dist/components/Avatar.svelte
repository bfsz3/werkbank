<script lang="ts">
	import { initials, hueFromString } from '../avatar.js';

	type Props = {
		name: string;
		src?: string | null;
		size?: 'sm' | 'md' | 'lg';
	};

	let { name, src, size = 'md' }: Props = $props();
	const hue = $derived(hueFromString(name));
</script>

<span class={['wb-avatar', `wb-avatar--${size}`]} style:--_hue={hue} role="img" aria-label={name}>
	{#if src}
		<img src={src} alt="" />
	{:else}
		<span aria-hidden="true">{initials(name)}</span>
	{/if}
</span>

<style>
	.wb-avatar {
		--_size: 2.25rem;
		display: inline-grid;
		place-items: center;
		flex-shrink: 0;
		width: var(--_size);
		height: var(--_size);
		overflow: hidden;
		border: var(--wb-border-width) solid var(--wb-button-border);
		border-radius: var(--wb-radius-pill);
		/* Farbton aus dem Namen: helle Pastellfläche mit dunkler Schrift, lesbar in beiden Modi. */
		background: oklch(0.8 0.11 var(--_hue));
		color: oklch(0.26 0.07 var(--_hue));
		font-weight: 750;
		font-size: calc(var(--_size) * 0.4);
		line-height: 1;
		user-select: none;
	}

	.wb-avatar--sm {
		--_size: 1.75rem;
	}
	.wb-avatar--lg {
		--_size: 4rem;
	}

	.wb-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
