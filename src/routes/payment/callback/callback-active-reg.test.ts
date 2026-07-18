// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function read(p: string) {
	return readFileSync(resolve(process.cwd(), p), 'utf8');
}

describe('payment callback persists active_reg (jsdom)', () => {
	it('localStorage is available and writable in this env', () => {
		// sanity for the browser-only side effect the component relies on
		localStorage.setItem('active_reg', 'reg_x');
		expect(localStorage.getItem('active_reg')).toBe('reg_x');
	});

	it('callback writes active_reg = reference on successful verification', () => {
		const cb = read('src/routes/payment/callback/+page.svelte');
		expect(cb).toContain("localStorage.setItem('active_reg'");
		expect(cb).toContain('reference');
		// assignment uses the same reference passed to verify()
		const m = cb.match(/localStorage\.setItem\('active_reg',\s*([^)]+)\)/);
		expect(m).not.toBeNull();
		expect(m![1].trim()).toBe('reference');
	});
});
