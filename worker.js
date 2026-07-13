import { default as app } from './.svelte-kit/cloudflare/_worker.js';

// Worker entry: serves the SvelteKit app and runs scheduled Cron Triggers.
export default {
  fetch: app.fetch,
  async scheduled(controller, env, ctx) {
    ctx.waitUntil((async () => {
      const base = (env.APP_URL || '').replace(/\/$/, '');
      const secret = env.CRON_SECRET || '';
      try {
        const res = await fetch(`${base}/api/cron/retry-payouts`, {
          method: 'POST',
          headers: { 'x-cron-secret': secret }
        });
        console.log(`[cron] retry-payouts -> ${res.status}`);
      } catch (e) {
        console.error('[cron] retry-payouts failed', e);
      }
    })());
  }
};
