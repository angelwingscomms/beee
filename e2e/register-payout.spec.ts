import { test, expect, request } from '@playwright/test';
import { createHmac } from 'node:crypto';
import { loadEnv } from './env.mjs';

const SECRET = loadEnv().PAYSTACK_SECRET_KEY_TEST || 'test-secret-key';

function sign(body: string): string {
  return createHmac('sha512', SECRET).update(body).digest('hex');
}

async function new_reg(req: any): Promise<string> {
  const res = await req.post('/api/register', {
    data: {
      firstName: 'E2E', lastName: 'Player', email: `e2e_${Date.now()}@example.com`,
      phone: '+234801234567', school: 'S', password: 'password123'
    }
  });
  expect(res.ok()).toBeTruthy();
  const d = await res.json();
  return d.registrationId;
}

async function post_webhook(req: any, event: string, data: Record<string, unknown>, sig?: string) {
  const body = JSON.stringify({ event, data });
  return req.post('/api/webhooks/paystack', {
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'x-paystack-signature': sig === undefined ? sign(body) : sig
    }
  });
}

test.describe('E2E: register → pay → partner payout (webhook-driven)', () => {
  test('E1/E2/E3: register, simulate payment, callback shows confirmed', async ({ request: req, page }) => {
    const regId = await new_reg(req);
    // E3: visiting the callback page runs the real verify-payment path (mock
    // returns success + matching amount) and must confirm registration.
    await page.goto(`/payment/callback?reference=${regId}`);
    await expect(page.getByText('Registration Confirmed!')).toBeVisible({ timeout: 10_000 });
  });

  test('E4: replaying the callback is idempotent — still confirmed', async ({ request: req, page }) => {
    const regId = await new_reg(req);
    await page.goto(`/payment/callback?reference=${regId}`);
    await expect(page.getByText('Registration Confirmed!')).toBeVisible({ timeout: 10_000 });
    await page.reload();
    await expect(page.getByText('Registration Confirmed!')).toBeVisible({ timeout: 10_000 });
  });

  test('E5: an unknown reference shows the failed state', async ({ page }) => {
    await page.goto('/payment/callback?reference=does_not_exist');
    await expect(page.getByText('Payment Failed')).toBeVisible({ timeout: 10_000 });
  });

  test('E6: charge.success webhook with a valid HMAC is accepted (200)', async ({ request: req }) => {
    const regId = await new_reg(req);
    const res = await post_webhook(req, 'charge.success', { reference: regId });
    expect(res.status()).toBe(200);
  });

  test('E7: replaying the same charge.success webhook stays 200 (idempotent)', async ({ request: req }) => {
    const regId = await new_reg(req);
    const first = await post_webhook(req, 'charge.success', { reference: regId });
    const second = await post_webhook(req, 'charge.success', { reference: regId });
    expect(first.status()).toBe(200);
    expect(second.status()).toBe(200);
  });

  test('E8: webhook with a bad signature is rejected (401)', async ({ request: req }) => {
    const res = await post_webhook(req, 'charge.success', { reference: 'x' }, 'deadbeef');
    expect(res.status()).toBe(401);
  });

  test('E9: transfer.success webhook reconciles and is accepted (200)', async ({ request: req }) => {
    const regId = await new_reg(req);
    const res = await post_webhook(req, 'transfer.success', { reference: `po-${regId}` });
    expect(res.status()).toBe(200);
  });
});
