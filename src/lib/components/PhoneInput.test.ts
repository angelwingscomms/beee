import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const phone_input = readFileSync(resolve(process.cwd(), 'src/lib/components/PhoneInput.svelte'), 'utf8');

describe('PhoneInput alignment', () => {
	it('centers country and phone text vertically', () => {
		expect(phone_input).toContain('height: 40px;');
		expect(phone_input).toContain('padding: 0 10px;');
		expect(phone_input).toContain('padding: 0 14px;');
		expect(phone_input).toContain('line-height: 40px;');
		expect(phone_input).toContain('min-height: 36px;');
	});
});
