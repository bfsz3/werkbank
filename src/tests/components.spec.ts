import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import Button from '../lib/components/Button.svelte';
import MediaTile from '../lib/components/MediaTile.svelte';
import Field from '../lib/components/Field.svelte';

const text = (value: string) => createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

describe('Button', () => {
	it('wird ohne href zu einem <button type="button">', () => {
		const { body } = render(Button, { props: { children: text('Los') } });
		expect(body).toMatch(/<button[^>]*type="button"/);
		expect(body).toContain('wb-button--primary');
	});

	it('wird mit href zu einem Link', () => {
		const { body } = render(Button, { props: { href: '/spiele', variant: 'secondary', children: text('Spiele') } });
		expect(body).toMatch(/<a[^>]*href="\/spiele"/);
		expect(body).toContain('wb-button--secondary');
		expect(body).not.toContain('<button');
	});

	it('sperrt sich beim Laden', () => {
		const { body } = render(Button, { props: { loading: true, children: text('Speichern') } });
		expect(body).toMatch(/<button[^>]*disabled/);
		expect(body).toContain('aria-busy="true"');
	});
});

describe('MediaTile', () => {
	it('ist ohne href kein Link', () => {
		const { body } = render(MediaTile, { props: { title: 'Bald' } });
		expect(body).not.toContain('<a');
		expect(body).toContain('wb-tile--static');
	});

	it('zeigt Bild, Badge und Titel', () => {
		const { body } = render(MediaTile, {
			props: { title: 'HighRiseFall', href: '/spiele/highrisefall', image: '/cover.png', badge: 'Neu' }
		});
		expect(body).toContain('href="/spiele/highrisefall"');
		expect(body).toContain('src="/cover.png"');
		expect(body).toContain('Neu');
	});
});

describe('Field', () => {
	it('verknüpft Label, Eingabe und Fehlermeldung', () => {
		const control = createRawSnippet((attrs: () => { id: string; 'aria-describedby': string | undefined }) => ({
			render: () => `<input id="${attrs().id}" aria-describedby="${attrs()['aria-describedby']}" />`
		}));
		const { body } = render(Field, { props: { label: 'E-Mail', id: 'mail', error: 'Pflichtfeld', children: control } });
		expect(body).toContain('for="mail"');
		expect(body).toContain('id="mail"');
		expect(body).toContain('aria-describedby="mail-message"');
		expect(body).toMatch(/id="mail-message"[^>]*role="alert"/);
	});
});
