import { describe, it, expect, vi, beforeEach } from 'vitest';

let retry: any;
let cron_secret = 'topsecret';

vi.mock('$app/environment', () => ({ get dev() { return false; }, get browser() { return false; } }));
vi.mock('$lib/server/secrets', () => ({
    get_secret: vi.fn(async (k: string) => (k === 'CRON_SECRET' ? cron_secret : ''))
}));
vi.mock('$lib/partner', () => ({
    retry_failed_payouts: (...a: any[]) => retry(...a)
}));

describe('cron retry-payouts endpoint', () => {
    beforeEach(() => {
        retry = vi.fn(async () => ({ scanned: 1, retried: 1, succeeded: 1, failed: 0 }));
        cron_secret = 'topsecret';
    });

    it('rejects requests without the x-cron-secret (401)', async () => {
        const { POST } = await import('./+server');
        const req = new Request('http://localhost/api/cron/retry-payouts', { method: 'POST' });
        const res = await POST({ request: req, platform: {} as any } as any);
        expect(res.status).toBe(401);
        expect(retry).not.toHaveBeenCalled();
    });

    it('runs retry_failed_payouts when the secret matches', async () => {
        const { POST } = await import('./+server');
        const req = new Request('http://localhost/api/cron/retry-payouts', {
            method: 'POST', headers: { 'x-cron-secret': 'topsecret' }
        });
        const res = await POST({ request: req, platform: {} as any } as any);
        expect(res.status).toBe(200);
        expect(retry).toHaveBeenCalledTimes(1);
    });
});
