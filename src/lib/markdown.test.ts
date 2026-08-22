import { describe, expect, it } from 'vitest';
import { markdown_for, markdown_404, supports_markdown, SITE_NAME } from '$lib/markdown';
import { NEWS } from '$lib/data/news';

describe('markdown_for', () => {
	it('returns markdown for every core public page', () => {
		for (const p of [
			'/',
			'/about',
			'/contact',
			'/privacy',
			'/terms',
			'/why-beee',
			'/teamup',
			'/e4',
			'/taskify',
			'/quotes',
			'/faq',
			'/partner',
			'/register',
			'/news',
			'/docs',
			'/docs/api',
			'/docs/auth',
			'/docs/webhooks',
			'/docs/agents'
		]) {
			const md = markdown_for(p);
			expect(md, `no markdown for ${p}`).toBeTruthy();
			expect(md).toContain('#');
			expect(md).toContain('beee');
		}
	});

	it('marks pages as markdown-negotiable', () => {
		expect(supports_markdown('/about')).toBe(true);
		expect(supports_markdown('/news/a-post')).toBe(true);
		expect(supports_markdown('/dashboard')).toBe(false);
		expect(supports_markdown('/api/banks')).toBe(false);
	});

	it('returns markdown for every news post', () => {
		for (const p of NEWS) {
			const md = markdown_for(`/news/${p.s}`);
			expect(md).toBeTruthy();
			expect(md).toContain(p.t);
			expect(md).toContain(`/news/${p.s}`);
		}
	});

	it('returns null for unknown topics and private pages', () => {
		expect(markdown_for('/no-such-page')).toBeNull();
		expect(markdown_for('/news/not-a-post')).toBeNull();
		expect(markdown_for('/dashboard')).toBeNull();
	});
});

describe('markdown_404', () => {
	it('points agents at the site map, docs and index', () => {
		const md = markdown_404('/nope');
		expect(md).toContain('404');
		expect(md).toContain('llms.txt');
		expect(md).toContain('sitemap.xml');
		expect(md).toContain('/docs');
		expect(md).toContain('/nope');
	});

	it('names the site', () => {
		expect(markdown_404('/x')).toContain(SITE_NAME);
	});
});
