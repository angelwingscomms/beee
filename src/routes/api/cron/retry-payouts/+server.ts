import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { retry_failed_payouts } from '$lib/partner';
import { get_secret } from '$lib/server/secrets';

// Triggered by the Cloudflare Cron Trigger (see worker.js + wrangler crons).
// Re-attempts partner payouts that previously failed (bank/recipient/transfer
// errors) and reconciles stuck transfers. Protected by CRON_SECRET.
export const POST: RequestHandler = async ({ request, platform }) => {
  const secret = await get_secret('CRON_SECRET');
  const header = request.headers.get('x-cron-secret') || '';
  if (secret) {
    if (header !== secret) return json({ error: 'Unauthorized' }, { status: 401 });
  } else if (!dev) {
    return json({ error: 'CRON_SECRET not configured' }, { status: 401 });
  }

  const res = await retry_failed_payouts(platform);
  return json({ success: true, ...res });
};
