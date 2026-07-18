import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function read(p: string) {
	return readFileSync(resolve(process.cwd(), p), 'utf8');
}

describe('Parent multi-kid registration', () => {
	it('removes the email-exists gate on /register (no user/check redirect)', () => {
		const reg = read('src/routes/register/+page.svelte');
		expect(reg).not.toContain('/api/user/check');
		expect(reg).not.toContain('Redirecting to login');
	});

	it('payment callback persists active_reg in localStorage on success', () => {
		const cb = read('src/routes/payment/callback/+page.svelte');
		expect(cb).toContain("localStorage.setItem('active_reg'");
	});

	it('find_or_create_player_user creates email-only identity (no display name)', () => {
		const db = read('src/lib/db/index.ts');
		// New user branch must not set n
		const newBranch = db.slice(db.indexOf('const user_id = new_id();'));
		expect(newBranch).toContain("s: 'u', e: email, d: Date.now(), c: ['rpb']");
		expect(newBranch).not.toMatch(/n:\s*name/);
	});

	it('dashboard switches active registration via localStorage', () => {
		const dash = read('src/routes/dashboard/+page.svelte');
		expect(dash).toContain("localStorage.getItem('active_reg')");
		expect(dash).toContain("localStorage.setItem('active_reg'");
		expect(dash).toContain('active_reg');
		expect(dash).toContain('reg-select');
	});
});
