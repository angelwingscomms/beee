import { describe, it, expect } from 'vitest';
import { extract_partner_code } from './partner_code';

describe('extract_partner_code', () => {
	it('keeps a bare code', () => {
		expect(extract_partner_code('  AFF123 ')).toBe('AFF123');
	});

	it('reads the share link', () => {
		expect(extract_partner_code('https://beeeproject.com/i/AFF123')).toBe('AFF123');
		expect(extract_partner_code('beeeproject.com/i/AFF123/')).toBe('AFF123');
	});

	it('reads a register link', () => {
		expect(extract_partner_code('https://beeeproject.com/register?c=AFF123')).toBe('AFF123');
		expect(extract_partner_code('/register?c=AFF123&x=1')).toBe('AFF123');
	});

	it('reads any other link shape by its last segment', () => {
		expect(extract_partner_code('https://beeeproject.com/partner/AFF123')).toBe('AFF123');
	});

	it('returns empty for empty input', () => {
		expect(extract_partner_code('   ')).toBe('');
	});
});
