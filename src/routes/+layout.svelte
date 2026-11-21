<script lang="ts">
	import '#lib/styles/base.css';
	import '#lib/styles/themes/neutral.css';
	import '#lib/styles/themes/arcade.css';

	let { children } = $props();
</script>

<svelte:head><title>Werkbank – Komponenten</title></svelte:head>

{@render children()}
