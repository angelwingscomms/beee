import { describe, it, expect } from 'vitest';
import { resolve_active_reg } from './active_reg';

describe('resolve_active_reg', () => {
	it('returns the stored id when it is still in the list', () => {
		expect(resolve_active_reg(['a', 'b', 'c'], 'b')).toBe('b');
	});

	it('falls back to the first reg when stored id is foreign', () => {
		expect(resolve_active_reg(['a', 'b', 'c'], 'z')).toBe('a');
	});

	it('falls back to the first reg when stored is null/empty', () => {
		expect(resolve_active_reg(['a', 'b'], null)).toBe('a');
		expect(resolve_active_reg(['a', 'b'], '')).toBe('a');
		expect(resolve_active_reg(['a', 'b'], undefined)).toBe('a');
	});

	it('returns empty string when there are no regs', () => {
		expect(resolve_active_reg([], 'a')).toBe('');
		expect(resolve_active_reg([], null)).toBe('');
	});

	it('ignores blank ids in the list', () => {
		expect(resolve_active_reg(['', 'a'], null)).toBe('a');
	});
});
