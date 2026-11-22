<script lang="ts" module>
	/** Attribute, die das Feld an sein Eingabeelement weiterreicht. */
	export type FieldControlProps = {
		id: string;
		'aria-describedby': string | undefined;
		invalid: boolean;
		required: boolean | undefined;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		label: string;
		/** Erklärung unter dem Feld. */
		hint?: string;
		/** Fehlermeldung; ersetzt den Hinweis und markiert das Feld. */
		error?: string | null;
		required?: boolean;
		id?: string;
		children: Snippet<[FieldControlProps]>;
	};

	let { label, hint, error, required, id, children }: Props = $props();

	// $props.id() ist auf Server und Client gleich, das vermeidet Hydrations-Fehler.
	const uid = $props.id();
	const fallbackId = `wb-field-${uid}`;
	const controlId = $derived(id ?? fallbackId);
	const messageId = $derived(`${controlId}-message`);
	const message = $derived(error || hint);
</script>

<div class="wb-field">
	<label class="wb-field__label" for={controlId}>
		{label}
		{#if required}<span class="wb-field__required" aria-hidden="true">*</span>{/if}
	</label>
	{@render children({ id: controlId, 'aria-describedby': message ? messageId : undefined, invalid: !!error, required })}
	{#if message}
		<p id={messageId} class={['wb-field__message', error && 'wb-field__message--error']} role={error ? 'alert' : undefined}>
			{message}
		</p>
	{/if}
</div>

<style>
	.wb-field {
		display: grid;
		gap: var(--wb-space-2);
	}

	.wb-field__label {
		font-size: var(--wb-text-sm);
		font-weight: 600;
	}

	.wb-field__required {
		color: var(--wb-danger);
		margin-left: 0.15em;
	}

	.wb-field__message {
		font-size: var(--wb-text-xs);
		color: var(--wb-text-muted);
	}

	.wb-field__message--error {
		color: var(--wb-danger);
		font-weight: 550;
	}
</style>
