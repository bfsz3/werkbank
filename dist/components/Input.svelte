<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = Omit<HTMLInputAttributes, 'size'> & {
		value?: string;
		/** Markiert das Feld als fehlerhaft (setzt auch aria-invalid). */
		invalid?: boolean;
	};

	let { value = $bindable(''), invalid = false, class: className, ...rest }: Props = $props();
</script>

<input {...rest} bind:value aria-invalid={invalid || rest['aria-invalid'] || undefined} class={['wb-input', className]} />

<style>
	.wb-input {
		width: 100%;
		min-height: 2.75rem;
		padding: 0 var(--wb-space-3);
		border: var(--wb-border-width) solid var(--wb-control-border);
		border-radius: var(--wb-radius-md);
		background: var(--wb-surface-raised);
		color: var(--wb-text);
		font: inherit;
		font-size: var(--wb-text-md);
		transition:
			border-color var(--wb-duration-fast) var(--wb-ease),
			box-shadow var(--wb-duration-fast) var(--wb-ease);
	}

	.wb-input::placeholder {
		color: var(--wb-text-faint);
	}

	.wb-input:hover:not(:disabled) {
		border-color: var(--wb-text-muted);
	}

	.wb-input:focus-visible {
		outline: none;
		border-color: var(--wb-focus);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--wb-focus) 28%, transparent);
	}

	.wb-input[aria-invalid='true'] {
		border-color: var(--wb-danger);
	}

	.wb-input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
