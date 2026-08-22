import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const llms = readFileSync(join(process.cwd(), 'static/llms.txt'), 'utf8');

describe('llms.txt', () => {
	it('follows the llmstxt.org shape: an H1, a summary and sections', () => {
		expect(llms.startsWith('# ')).toBe(true);
		expect(llms).toMatch(/\n>\s/);
		expect(llms).toMatch(/## /);
	});

	it('tells agents when to use the site', () => {
		expect(llms.toLowerCase()).toContain('when to use this');
		expect(llms.toLowerCase()).toMatch(/use/);
	});

	it('lists developer resources by name', () => {
		expect(llms.toLowerCase()).toContain('developer');
		expect(llms.toLowerCase()).toContain('openapi');
		expect(llms.toLowerCase()).toContain('api reference');
		expect(llms.toLowerCase()).toContain('webhooks');
		expect(llms.toLowerCase()).toContain('authentication');
		expect(llms.toLowerCase()).toContain('sitemap');
		expect(llms.toLowerCase()).toContain('robots.txt');
	});

	it('links the core public pages', () => {
		for (const path of ['/', '/about', '/register', '/faq', '/contact', '/privacy', '/terms']) {
			expect(llms, `missing link for ${path}`).toContain(`https://beeeproject.com${path === '/' ? '/' : path}`);
		}
	});
});
