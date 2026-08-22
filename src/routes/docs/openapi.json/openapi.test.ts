import { describe, expect, it } from 'vitest';

describe('openapi spec', () => {
	it('is valid OpenAPI 3.1 with the BEEE brand', async () => {
		const mod = await import('./+server');
		const res = await mod.GET();
		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toContain('application/json');

		const spec = JSON.parse(await res.text());
		expect(spec.openapi).toBe('3.1.0');
		expect(spec.info.title).toContain('BEEE');
		expect(spec.info.version).toBeTruthy();
		expect(spec.servers[0].url).toContain('beeeproject.com');
		for (const p of ['/banks', '/validate-partner', '/register', '/user/check']) {
			expect(spec.paths[p], `missing path ${p}`).toBeTruthy();
		}
	});
});
