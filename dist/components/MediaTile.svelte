<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description?: string;
		/** Ziel des Klicks. Fehlt es, ist die Kachel nicht anklickbar (z. B. „Bald“). */
		href?: string;
		image?: string;
		imageAlt?: string;
		/** Seitenverhältnis des Bildes, z. B. `4 / 3` oder `16 / 9`. */
		aspect?: string;
		/** Kleiner Hinweis oben links auf dem Bild (z. B. „Neu“). */
		badge?: string;
		/** Ersatz, wenn kein Bild da ist (z. B. ein Platzhalter-Muster). */
		placeholder?: Snippet;
		/** Zusatzzeile unter der Beschreibung (z. B. Spieleranzahl). */
		meta?: Snippet;
	};

	let { title, description, href, image, imageAlt = '', aspect = '4 / 3', badge, placeholder, meta }: Props = $props();
</script>

<svelte:element this={href ? 'a' : 'div'} {href} class={['wb-tile', !href && 'wb-tile--static']}>
	<div class="wb-tile__media" style:aspect-ratio={aspect}>
		{#if image}
			<img src={image} alt={imageAlt} loading="lazy" decoding="async" />
		{:else if placeholder}
			{@render placeholder()}
		{:else}
			<div class="wb-tile__pattern" aria-hidden="true"></div>
		{/if}
		{#if badge}<span class="wb-tile__badge">{badge}</span>{/if}
	</div>
	<div class="wb-tile__body">
		<h3 class="wb-tile__title">{title}</h3>
		{#if description}<p class="wb-tile__description">{description}</p>{/if}
		{#if meta}<div class="wb-tile__meta">{@render meta()}</div>{/if}
	</div>
</svelte:element>

<style>
	.wb-tile {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background: var(--wb-surface);
		border: var(--wb-border-width) solid var(--wb-card-border);
		border-radius: var(--wb-radius-lg);
		box-shadow: var(--wb-shadow-md);
		color: var(--wb-text);
		text-decoration: none;
		transition:
			transform var(--wb-duration-base) var(--wb-ease-bounce),
			box-shadow var(--wb-duration-base) var(--wb-ease);
	}

	a.wb-tile:hover {
		transform: translateY(calc(var(--wb-lift) * 2)) rotate(var(--wb-tilt));
		box-shadow: var(--wb-shadow-lg);
	}

	a.wb-tile:hover img {
		transform: scale(1.045);
	}

	.wb-tile--static {
		box-shadow: none;
		border-style: dashed;
		border-color: var(--wb-border-strong);
		background: transparent;
	}

	.wb-tile__media {
		position: relative;
		overflow: hidden;
		background: var(--wb-bg-subtle);
		border-bottom: var(--wb-border-width) solid var(--wb-card-border);
	}

	.wb-tile--static .wb-tile__media {
		border-bottom-style: dashed;
		border-bottom-color: var(--wb-border-strong);
	}

	.wb-tile__media img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--wb-duration-base) var(--wb-ease);
	}

	.wb-tile__pattern {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(var(--wb-border-strong) 1.2px, transparent 1.4px);
		background-size: 14px 14px;
		opacity: 0.45;
	}

	.wb-tile__badge {
		position: absolute;
		top: var(--wb-space-3);
		left: var(--wb-space-3);
		padding: 0.3em 0.65em;
		border: var(--wb-border-width) solid var(--wb-button-border);
		border-radius: var(--wb-radius-pill);
		background: var(--wb-highlight);
		color: var(--wb-highlight-text);
		font-size: var(--wb-text-xs);
		font-weight: 700;
		letter-spacing: 0.02em;
		box-shadow: var(--wb-shadow-sm);
	}

	.wb-tile__body {
		display: grid;
		gap: var(--wb-space-1);
		padding: var(--wb-space-4) var(--wb-space-4) var(--wb-space-5);
	}

	.wb-tile__title {
		font-size: var(--wb-text-lg);
	}

	.wb-tile__description {
		color: var(--wb-text-muted);
		font-size: var(--wb-text-sm);
	}

	.wb-tile__meta {
		margin-top: var(--wb-space-2);
		color: var(--wb-text-faint);
		font-size: var(--wb-text-xs);
	}
</style>
