# Werkbank (`@werkbank/ui`)

Svelte-5-Komponenten für alle eigenen Projekte. Die Komponenten sind in jedem Projekt gleich; wie sie aussehen, bestimmen **Design-Tokens** (CSS-Variablen `--wb-*`) aus einem **Theme**:

| Theme | Wofür | Charakter |
|---|---|---|
| `neutral` | Werkzeuge, Fachanwendungen (z. B. splattform) | ruhig, kleine Rundungen, weiche Schatten, Inter |
| `arcade` | Spielportal | warmes Papier bzw. Nachthimmel, dicke Tinten-Konturen, harte Versatzschatten, federnde Bewegung, Bricolage Grotesque für Überschriften |

Beide Themes können hell und dunkel. Standard ist das System (`prefers-color-scheme`), `data-mode="light"` oder `data-mode="dark"` erzwingt einen Modus. Schriften liefert die Bibliothek selbst aus (Fontsource), es gehen keine Anfragen an Google Fonts.

## Komponenten

Nur was gebraucht wird:

- `Button`: Varianten `primary`, `secondary`, `ghost`, `danger`; Größen `sm`/`md`/`lg`; mit `href` wird er zum Link; `loading`, `block`, `icon`-Snippet
- `Card`: Fläche mit Rahmen und Schatten (`as`, `padding`, `flat`)
- `MediaTile`: Kachel mit Bild, Titel, Text, Badge (z. B. Spielkachel); ohne `href` eine gestrichelte „Bald“-Kachel
- `Field` + `Input`: Formularfeld mit Label, Hinweis und Fehlermeldung; `Field` reicht `id`, `aria-describedby` und `invalid` an die Eingabe weiter
- `Dialog`: natives `<dialog>` (Fokusfalle, Esc), `bind:open`, `actions`-Snippet
- `AppHeader`: klebende Kopfzeile mit Marke, Navigation (`aria-current`) und Aktionen
- `Avatar`: Initialen mit stabiler Farbe je Name, oder ein Bild
- `Badge`: kleine Statusmarke in sechs Tönen
- `Toaster` + `toast()`: kurze Meldungen

## In ein anderes Projekt einbinden

Werkbank wird nicht in eine Registry veröffentlicht. Projekte binden einen **Release-Tag** aus diesem (privaten) Repo ein. Jeder Tag `v<version>` enthält das fertig gebaute `dist/` und kein `prepare`-Skript; bei der Installation läuft also kein Build.

```jsonc
// package.json des Projekts
"dependencies": {
	"@werkbank/ui": "git+https://github.com/bfsz3/werkbank.git#v0.1.0"
}
```

Zugriff: Lokal reicht die normale GitHub-Anmeldung von git. In CI braucht das Projekt Lesezugriff auf dieses Repo (z. B. Deploy-Key oder fein granularer Token mit `contents: read`); siehe die Doku des jeweiligen Projekts.

Aktualisieren: Tag in der `package.json` des Projekts anheben, `pnpm install`, CHANGELOG lesen.

### Gleichzeitig an Bibliothek und Projekt arbeiten

Statt eines Tags vorübergehend lokal verlinken (nicht committen):

```bash
pnpm add @werkbank/ui@link:../werkbank   # Pfad relativ zur package.json des Projekts
pnpm --dir ../werkbank exec svelte-package --watch
```

Weil die Bibliothek dann außerhalb des Projekts liegt, muss Vite ihre Dateien (u. a. die Schriften) ausliefern dürfen. In `vite.config.ts`:

```ts
import { fileURLToPath } from 'node:url';
import { searchForWorkspaceRoot } from 'vite';

export default defineConfig({
	// …
	server: {
		fs: { allow: [searchForWorkspaceRoot(process.cwd()), fileURLToPath(new URL('../werkbank', import.meta.url))] }
	}
});
```

### Release erstellen

1. Abschnitt `## [x.y.z]` in `CHANGELOG.md` ergänzen und auf `main` committen.
2. `scripts/release.sh x.y.z` – setzt die Version, prüft, baut und taggt einen Release-Commit mit `dist/`.
3. `git push origin main vx.y.z`

### Theme wählen

1. Styles im obersten Layout importieren (z. B. `src/routes/+layout.svelte`):

   ```svelte
   <script lang="ts">
   	import '@werkbank/ui/base.css';
   	import '@werkbank/ui/themes/neutral.css'; // oder arcade.css
   	let { children } = $props();
   </script>

   {@render children()}
   ```

2. Das Theme am `<html>` setzen (`src/app.html`):

   ```html
   <html lang="de" data-theme="neutral">
   ```

   Hell/Dunkel folgt dem System. Fest einstellen mit `data-mode="dark"` bzw. `"light"`, oder zur Laufzeit:

   ```ts
   import { applyTheme } from '@werkbank/ui';
   applyTheme('neutral', 'dark'); // 'light' | 'dark' | 'system'
   ```

   Ein Theme gilt auch für einen Teilbereich (`<section data-theme="arcade">`); die Showcase-Seite zeigt so beide nebeneinander.

3. Komponenten benutzen:

   ```svelte
   <script lang="ts">
   	import { Button, Field, Input, Toaster, toast } from '@werkbank/ui';
   	let email = $state('');
   </script>

   <Field label="E-Mail" hint="Für die Anmeldung">
   	{#snippet children(attrs)}
   		<Input {...attrs} type="email" bind:value={email} />
   	{/snippet}
   </Field>
   <Button onclick={() => toast('Gespeichert', { tone: 'success' })}>Speichern</Button>

   <Toaster />
   ```

Eigene Styles im Projekt nutzen dieselben Tokens, z. B. `background: var(--wb-surface); border-radius: var(--wb-radius-lg);`. Abstände (`--wb-space-1` bis `-8`) und Schriftgrößen (`--wb-text-xs` bis `-3xl`) kommen aus `base.css` und sind in allen Themes gleich.

## Ein neues Theme anlegen

`src/lib/styles/themes/neutral.css` kopieren, Selektor und Werte ändern, den Namen in `THEMES` (`src/lib/theme.ts`) und als Export in `package.json` eintragen. Der Test `src/tests/themes.spec.ts` prüft, dass jedes Theme dieselben Tokens setzt und Text, Akzent und Hervorhebung hell wie dunkel genug Kontrast haben (WCAG).

## Entwickeln

```bash
pnpm install
pnpm dev      # Showcase mit beiden Themes nebeneinander
pnpm check    # svelte-check
pnpm test     # Vitest: Tokens, Kontraste, Server-Rendering der Komponenten
pnpm build    # Paket nach dist/
```
