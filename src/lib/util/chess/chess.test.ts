import { describe, it, expect } from 'vitest';
import { DIFFICULTY_PRESETS, getHints } from './engine';

describe('getHints', () => {
	it('should be a function', () => {
		expect(typeof getHints).toBe('function');
	});

	it('should reject in node (no Worker)', async () => {
		await expect(getHints('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 3)).rejects.toThrow();
	});
});

describe('DIFFICULTY_PRESETS', () => {
	it('should have 10 levels', () => {
		expect(DIFFICULTY_PRESETS).toHaveLength(10);
	});

	it('should increase depth with level', () => {
		for (let i = 1; i < DIFFICULTY_PRESETS.length; i++) {
			expect(DIFFICULTY_PRESETS[i].depth).toBeGreaterThanOrEqual(DIFFICULTY_PRESETS[i - 1].depth);
		}
	});

	it('should increase moveTime with level', () => {
		for (let i = 1; i < DIFFICULTY_PRESETS.length; i++) {
			expect(DIFFICULTY_PRESETS[i].moveTime).toBeGreaterThanOrEqual(DIFFICULTY_PRESETS[i - 1].moveTime);
		}
	});

	it('last level should have null elo (full strength)', () => {
		expect(DIFFICULTY_PRESETS[9].elo).toBeNull();
	});

	it('levels 1-9 should have numeric elo', () => {
		for (let i = 0; i < 9; i++) {
			expect(typeof DIFFICULTY_PRESETS[i].elo).toBe('number');
		}
	});

	it('level 1 should be easiest (lowest values)', () => {
		const l1 = DIFFICULTY_PRESETS[0];
		expect(l1.elo).toBe(800);
		expect(l1.depth).toBe(4);
		expect(l1.moveTime).toBe(500);
	});
});
