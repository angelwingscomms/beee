import { describe, expect, it } from 'vitest';
import { NEWS, get_post, latest_posts } from '$lib/data/news';
import type { NewsBlock } from '$lib/types/news';

const SLUG = 'fide-world-amateur-abuja-2026';
const post = get_post(SLUG)!;
const body = JSON.stringify(post.b);

const ledger = (caption: string) => {
	const b = post.b.find((x): x is Extract<NewsBlock, { k: 'l' }> => x.k === 'l' && x.t === caption);
	expect(b, `no ledger captioned "${caption}"`).toBeTruthy();
	return b!.r;
};

describe('news registry', () => {
	it('carries the FIDE Abuja post', () => {
		expect(NEWS.length).toBeGreaterThan(0);
		expect(post).toBeTruthy();
	});

	it('sorts newest first', () => {
		const dates = NEWS.map((p) => p.d);
		expect([...dates].sort().reverse()).toEqual(dates);
	});

	it('latest_posts honours the limit and starts at the newest', () => {
		expect(latest_posts(1)).toHaveLength(1);
		expect(latest_posts(1)[0].s).toBe(NEWS[0].s);
		expect(latest_posts(99).length).toBe(NEWS.length);
	});

	it('returns undefined for an unknown slug', () => {
		expect(get_post('no-such-post')).toBeUndefined();
	});

	it('gives every post the fields the pages read', () => {
		for (const p of NEWS) {
			expect(p.s).toMatch(/^[a-z0-9-]+$/);
			expect(p.d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(p.t.length).toBeGreaterThan(0);
			expect(p.k.length).toBeGreaterThan(0);
			expect(p.x.length).toBeGreaterThan(0);
			expect(p.m.length).toBeGreaterThan(50);
			expect(p.m.length).toBeLessThan(165);
			expect(p.a.length).toBeGreaterThan(0);
			expect(p.r).toBeGreaterThan(0);
			expect(p.b.length).toBeGreaterThan(6);
			expect(p.o.length).toBeGreaterThan(0);
		}
	});

	it('gives every slug a unique value', () => {
		expect(new Set(NEWS.map((p) => p.s)).size).toBe(NEWS.length);
	});
});

describe('FIDE Abuja 2026 post, fixed fields', () => {
	it('uses the settled headline, kicker, date and byline', () => {
		expect(post.t).toBe('A 14-year-old won the world');
		expect(post.k).toBe('ABUJA · 1–8 AUGUST 2026 · 11 ROUNDS');
		expect(post.d).toBe('2026-08-11');
		expect(post.a).toBe('BEEE Editorial');
	});

	it('opens with the fact strip', () => {
		expect(post.b[0].k).toBe('f');
		const rows = (post.b[0] as Extract<NewsBlock, { k: 'f' }>).r;
		expect(rows).toHaveLength(4);
		expect(rows.map((r) => r.l)).toEqual(['Event', 'Venue', 'Dates', 'Format']);
		expect(rows[1].v).toContain('Bolton White');
	});
});

describe('FIDE Abuja 2026 post, facts', () => {
	it('carries the rapid standings exactly', () => {
		const r = ledger('Rapid, final standings');
		expect(r).toHaveLength(5);
		expect(r[0]).toMatchObject({ p: '1', n: 'Ekunke Odey Goodness', c: 'NGR', v: '9', w: true });
		expect(r[1]).toMatchObject({ p: '2', n: 'FM Eugene Ekpoikong Unwana', c: 'NGR', v: '8½' });
		expect(r[2]).toMatchObject({ p: '3', n: 'FM Bomo Lovet Kigigha', c: 'NGR', v: '8½' });
		expect(r[3]).toMatchObject({ p: '4', n: 'Joseph Sambo', c: 'NGR', v: '7½' });
		expect(r[4]).toMatchObject({ p: '5', n: 'AIM Sahil Sanjay Shejal', c: 'IND', v: '7½' });
		expect(r.filter((x) => x.w)).toHaveLength(1);
	});

	it('carries the blitz standings exactly', () => {
		const r = ledger('Blitz, final standings');
		expect(r).toHaveLength(3);
		expect(r[0]).toMatchObject({ p: '1', n: 'AIM Shejal Sahil Sanjay', c: 'IND', v: '9' });
		expect(r[1]).toMatchObject({ p: '2', n: 'CM Pankaj Sharma', c: 'IND', v: '8½' });
		expect(r[2]).toMatchObject({ p: '3', n: 'Odafe Benedict Efemuai', c: 'NGR', v: '8' });
	});

	it('carries the six blitz category champions exactly', () => {
		const r = ledger('Blitz, category champions');
		expect(r).toHaveLength(6);
		expect(r[0]).toMatchObject({ p: 'U1700 Open', n: 'Saket Kumar', c: 'IND', v: '6½' });
		expect(r[1]).toMatchObject({ p: 'U1700 Women', n: 'Rani Puja', c: 'IND', v: '4½' });
		expect(r[2]).toMatchObject({ p: 'U2000 Open', n: 'AIM Shejal Sahil Sanjay', c: 'IND', v: '9' });
		expect(r[3]).toMatchObject({ p: 'U2000 Women', n: 'Omoruyi Sandra Osarugue', c: 'NGR', v: '5½' });
		expect(r[4]).toMatchObject({ p: 'U2300 Open', n: 'Efemuai Odafe Benedict', c: 'NGR', v: '8' });
		expect(r[5]).toMatchObject({ p: 'U2300 Women', n: 'WFM Asanga Nsisong', c: 'NGR', v: '3' });
	});

	it('sets nine of eleven as the monumental numeral', () => {
		const n = post.b.find((b) => b.k === 'n');
		expect(n).toMatchObject({ k: 'n', n: '9', d: '11' });
		expect((n as Extract<NewsBlock, { k: 'n' }>).t).toContain('Ekunke Odey Goodness');
	});

	it('names the venue, the organisers and both time controls', () => {
		expect(body).toContain('Bolton White');
		expect(body).toContain('Abuja');
		expect(body).toContain('Nigeria Chess Federation');
		expect(body).toContain('15+10');
		expect(body).toContain('3+2');
	});

	it('attributes the only quote to Dankwambo', () => {
		const q = post.b.find((b) => b.k === 'q') as Extract<NewsBlock, { k: 'q' }>;
		expect(q).toBeTruthy();
		expect(q.a).toContain('Dankwambo');
		expect(q.t).toContain('transformation in Nigeria');
	});

	it('runs the blocks in the settled order', () => {
		expect(post.b.map((b) => b.k).join('')).toBe('fpphplnphpllqhpp');
	});

	it('cites FIDE, over https, on every source', () => {
		expect(post.o.some((s) => s.u.startsWith('https://www.fide.com/'))).toBe(true);
		for (const s of post.o) {
			expect(s.u).toMatch(/^https:\/\//);
			expect(s.t.length).toBeGreaterThan(0);
		}
	});

	it('publishes nothing the sources do not carry', () => {
		expect(body).not.toMatch(/prize fund/i);
		expect(body).not.toMatch(/\d+\s+(federations|countries|nations)/i);
		expect(body).not.toMatch(/\d+\s+players\b/i);
	});

	it('uses no italic markup, per AGENTS.md', () => {
		expect(body).not.toMatch(/<\/?(em|i)>/);
		expect(body).not.toMatch(/font-style/);
	});

	it('never puts a space before a comma or a full stop', () => {
		expect(body).not.toMatch(/ [,.]/);
	});
});
