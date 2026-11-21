<script lang="ts">
	import { AppHeader, Avatar, Badge, Button, Card, Dialog, Field, Input, MediaTile, Toaster, toast, THEMES } from '#lib';
	import type { ColorMode } from '#lib';

	let mode: ColorMode = $state('system');
	let dialogOpen: Record<string, boolean> = $state({ neutral: false, arcade: false });
	let email = $state('');
	const emailError = $derived(email && !email.includes('@') ? 'Das sieht nicht nach einer E-Mail-Adresse aus.' : null);
</script>

<div class="toolbar" data-theme="neutral" data-mode={mode === 'system' ? undefined : mode}>
	<strong>Werkbank</strong>
	<span class="toolbar__hint">Gleiche Komponenten, zwei Themes</span>
	<div class="toolbar__modes" role="group" aria-label="Farbmodus">
		{#each ['system', 'light', 'dark'] as const as option (option)}
			<Button size="sm" variant={mode === option ? 'primary' : 'ghost'} onclick={() => (mode = option)}>
				{option === 'system' ? 'System' : option === 'light' ? 'Hell' : 'Dunkel'}
			</Button>
		{/each}
	</div>
</div>

<main class="grid">
	{#each THEMES as theme (theme)}
		<section class="panel" data-theme={theme} data-mode={mode === 'system' ? undefined : mode} aria-label="Theme {theme}">
			<AppHeader items={[{ href: '#spiele', label: 'Spiele', active: true }, { href: '#bestenliste', label: 'Bestenliste' }]}>
				{#snippet brand()}<span class="brand">{theme}</span>{/snippet}
				{#snippet actions()}<Avatar name="Gast 4821" size="sm" />{/snippet}
			</AppHeader>

			<div class="panel__body">
				<h1>Überschrift mit Charakter</h1>
				<p class="muted">Tokens bestimmen Farben, Rundungen, Schatten, Schrift und Bewegung.</p>

				<div class="row">
					<Button>Spielen</Button>
					<Button variant="secondary">Konto sichern</Button>
					<Button variant="ghost">Abbrechen</Button>
					<Button variant="danger" size="sm">Löschen</Button>
					<Button loading>Speichern</Button>
				</div>

				<div class="row">
					<Badge>Neutral</Badge>
					<Badge tone="accent">Akzent</Badge>
					<Badge tone="highlight">Neu</Badge>
					<Badge tone="success">Gespeichert</Badge>
					<Badge tone="warning">Gast</Badge>
					<Badge tone="danger">Fehler</Badge>
				</div>

				<div class="tiles">
					<MediaTile title="Spiel mit Bild" description="Kachel mit Link und Badge" href="#" badge="Neu" />
					<MediaTile title="Bald" description="Platzhalter ohne Link" />
				</div>

				<Card>
					<form class="form" onsubmit={(e) => e.preventDefault()}>
						<Field label="E-Mail" hint="Wir schicken keine Werbung." error={emailError} required>
							{#snippet children(attrs)}<Input {...attrs} type="email" bind:value={email} placeholder="name@beispiel.de" />{/snippet}
						</Field>
						<div class="row">
							<Button type="submit" onclick={() => toast('Gespeichert!', { tone: 'success' })}>Toast zeigen</Button>
							<Button variant="secondary" onclick={() => (dialogOpen[theme] = true)}>Dialog öffnen</Button>
						</div>
					</form>
				</Card>

				<div class="row">
					<Avatar name="Kim Berg" />
					<Avatar name="flinkerfuchs" />
					<Avatar name="Gast 4821" size="lg" />
				</div>
			</div>

			<Dialog bind:open={dialogOpen[theme]} title="Konto sichern?" description="Mit E-Mail und Passwort bleibt dein Fortschritt erhalten.">
				{#snippet actions()}
					<Button variant="ghost" onclick={() => (dialogOpen[theme] = false)}>Später</Button>
					<Button onclick={() => (dialogOpen[theme] = false)}>Sichern</Button>
				{/snippet}
			</Dialog>
		</section>
	{/each}
</main>

<div data-theme="arcade" data-mode={mode === 'system' ? undefined : mode} style="display: contents"><Toaster /></div>

<style>
	:global(body) {
		margin: 0;
	}
	.toolbar {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--wb-border);
	}
	.toolbar__hint {
		color: var(--wb-text-muted);
		font-size: var(--wb-text-sm);
	}
	.toolbar__modes {
		display: flex;
		gap: 0.25rem;
		margin-left: auto;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
	}
	.panel {
		min-height: 100dvh;
	}
	.panel__body {
		display: grid;
		gap: var(--wb-space-5);
		padding: var(--wb-space-5) var(--wb-space-4) var(--wb-space-7);
	}
	.brand {
		font-family: var(--wb-font-display);
		font-weight: var(--wb-weight-display);
		font-size: var(--wb-text-lg);
		text-transform: capitalize;
	}
	h1 {
		font-size: var(--wb-text-2xl);
	}
	.muted {
		color: var(--wb-text-muted);
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--wb-space-3);
	}
	.tiles {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--wb-space-4);
	}
	.form {
		display: grid;
		gap: var(--wb-space-4);
	}
</style>
