import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { seo_for, is_indexable, sitemap_entries } from '$lib/seo';

describe('new contact and docs routes', () => {
	it('gives /contact a title with the brand and a description', () => {
		const m = seo_for('/contact');
		expect(m.title).toContain('BEEE');
		expect(m.description.length).toBeGreaterThan(50);
		expect(is_indexable('/contact')).toBe(true);
	});

	it('indexes every developer doc route with the brand in the title', () => {
		for (const p of ['/docs', '/docs/api', '/docs/auth', '/docs/webhooks', '/docs/agents']) {
			const m = seo_for(p);
			expect(m.title, `title for ${p}`).toContain('BEEE');
			expect(m.description.length).toBeGreaterThan(50);
			expect(is_indexable(p)).toBe(true);
		}
	});

	it('lists the contact and docs pages in the sitemap', () => {
		const paths = sitemap_entries().map((e) => e.path);
		expect(paths).toContain('/contact');
		for (const p of ['/docs', '/docs/api', '/docs/auth', '/docs/webhooks', '/docs/agents']) {
			expect(paths).toContain(p);
		}
	});
});

describe('contact page content', () => {
	it('has more than 500 characters of visible content', () => {
		const raw = readFileSync(join(process.cwd(), 'src/routes/contact/+page.svelte'), 'utf8');
		const text = raw
			.replace(/<script[\s\S]*?<\/script>/g, '')
			.replace(/<style[\s\S]*?<\/style>/g, '')
			.replace(/<[^>]+>/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();
		expect(text.length).toBeGreaterThan(500);
	});
});
