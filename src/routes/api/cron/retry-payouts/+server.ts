import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { retry_failed_payouts } from '$lib/partner';
import { get_secret } from '$lib/server/secrets';

// Triggered by the Cloudflare Cron Trigger (see worker.js + wrangler crons).
// Re-attempts partner payouts that previously failed (bank/recipient/transfer
// errors) and reconciles stuck transfers. Protected by CRON_SECRET.
export const POST: RequestHandler = async ({ request, platform }) => {
  console.log(`[cron/retry-payouts] === CRON TRIGGERED === dev=${dev}`);
  const secret = await get_secret('CRON_SECRET');
  const header = request.headers.get('x-cron-secret') || '';
  console.log(`[cron/retry-payouts] auth: CRON_SECRET configured=${!!secret}, header present=${!!header}`);
  if (secret) {
    if (header !== secret) {
      console.warn(`[cron/retry-payouts] REJECTED: x-cron-secret header does not match CRON_SECRET`);
      return json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.log(`[cron/retry-payouts] auth OK (secret matched)`);
  } else if (!dev) {
    console.warn(`[cron/retry-payouts] REJECTED: CRON_SECRET not configured in production`);
    return json({ error: 'CRON_SECRET not configured' }, { status: 401 });
  } else {
    console.log(`[cron/retry-payouts] dev mode with no CRON_SECRET — allowing`);
  }

  console.log(`[cron/retry-payouts] invoking retry_failed_payouts...`);
  const res = await retry_failed_payouts(platform);
  console.log(`[cron/retry-payouts] === DONE ===`, res);
  return json({ success: true, ...res });
};
