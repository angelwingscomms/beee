import { describe, it, expect } from 'vitest';
import { cs, filterBySearch, filterByCategory } from '$lib/data/faq';

describe('faq data integrity', () => {
	it('has 7 categories', () => {
		expect(cs.length).toBe(7);
	});

	it('every category has an id, name, and questions', () => {
		for (const c of cs) {
			expect(c.i).toBeTruthy();
			expect(c.n).toBeTruthy();
			expect(c.qs.length).toBeGreaterThan(0);
		}
	});

	it('every question has q and a', () => {
		for (const c of cs) {
			for (const q of c.qs) {
				expect(q.q).toBeTruthy();
				expect(q.a).toBeTruthy();
			}
		}
	});

	it('total question count across all categories is 34', () => {
		const total = cs.reduce((s, c) => s + c.qs.length, 0);
		expect(total).toBe(34);
	});
});

describe('filterByCategory', () => {
	it('returns all categories when id is "all"', () => {
		const r = filterByCategory(cs, 'all');
		expect(r).toEqual(cs);
	});

	it('returns only matching category', () => {
		const r = filterByCategory(cs, 'registration');
		expect(r.length).toBe(1);
		expect(r[0].i).toBe('registration');
	});

	it('returns empty array for unknown category', () => {
		const r = filterByCategory(cs, 'nonexistent');
		expect(r.length).toBe(0);
	});
});

describe('filterBySearch', () => {
	it('returns all categories for empty query', () => {
		const r = filterBySearch(cs, '');
		expect(r).toEqual(cs);
	});

	it('filters questions by question text', () => {
		const r = filterBySearch(cs, 'chess');
		expect(r.length).toBeGreaterThan(0);
		// At least one question with "chess" in it
		const all_qs = r.flatMap(c => c.qs);
		expect(all_qs.some(q => q.q.toLowerCase().includes('chess'))).toBe(true);
	});

	it('filters questions by answer text', () => {
		const r = filterBySearch(cs, 'passport');
		expect(r.length).toBeGreaterThan(0);
	});

	it('is case insensitive', () => {
		const r1 = filterBySearch(cs, 'REGISTER');
		const r2 = filterBySearch(cs, 'register');
		expect(r1.length).toBe(r2.length);
	});

	it('returns empty when no match', () => {
		const r = filterBySearch(cs, 'zzzzzznonexistent');
		expect(r.length).toBe(0);
	});
});

describe('combined filters', () => {
	it('category + search work together', () => {
		const cat = filterByCategory(cs, 'registration');
		const searched = filterBySearch(cat, 'fee');
		expect(searched.length).toBe(1);
		expect(searched[0].qs.length).toBe(2);
		expect(searched[0].qs[0].q).toContain('fee');
	});
});
