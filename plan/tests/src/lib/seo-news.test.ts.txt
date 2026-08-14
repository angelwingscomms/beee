import { describe, expect, it } from 'vitest';
import { seo_for, is_indexable, sitemap_entries } from '$lib/seo';
import { NEWS } from '$lib/data/news';

describe('news seo wiring', () => {
	it('gives /news its own title and description', () => {
		const m = seo_for('/news');
		expect(m.title).toContain('News');
		expect(m.description.length).toBeGreaterThan(50);
		expect(is_indexable('/news')).toBe(true);
	});

	it('gives every post its own title and description', () => {
		for (const p of NEWS) {
			const m = seo_for(`/news/${p.s}`);
			expect(m.title).toContain(p.t);
			expect(m.description).toBe(p.m);
			expect(is_indexable(`/news/${p.s}`)).toBe(true);
		}
	});

	it('resolves a trailing slash to the same entry', () => {
		const p = NEWS[0];
		expect(seo_for(`/news/${p.s}/`).title).toBe(seo_for(`/news/${p.s}`).title);
		expect(seo_for('/news/').title).toBe(seo_for('/news').title);
	});

	it('keeps an unknown news slug out of the index', () => {
		expect(is_indexable('/news/not-a-post')).toBe(false);
	});

	it('leaves the existing entries alone', () => {
		expect(seo_for('/').title).toContain('BEEE');
		expect(is_indexable('/dashboard')).toBe(false);
	});

	it('lists /news and every post in the sitemap', () => {
		const paths = sitemap_entries().map((e) => e.path);
		expect(paths).toContain('/news');
		for (const p of NEWS) expect(paths).toContain(`/news/${p.s}`);
	});

	it('keeps the sitemap sorted by priority and free of duplicates', () => {
		const entries = sitemap_entries();
		const priorities = entries.map((e) => e.priority);
		expect([...priorities].sort((a, b) => b - a)).toEqual(priorities);
		expect(new Set(entries.map((e) => e.path)).size).toBe(entries.length);
		for (const e of entries) {
			expect(e.priority).toBeGreaterThan(0);
			expect(e.changefreq.length).toBeGreaterThan(0);
		}
	});
});
