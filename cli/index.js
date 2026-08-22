#!/usr/bin/env node

const BASE = process.env.BEEE_URL || 'https://beeeproject.com';

const cmd = process.argv[2] || 'help';
const arg = process.argv[3];

const usage = `beee — CLI for the BEEE public API (https://beeeproject.com/docs)

usage:
  beee banks                      list Nigerian bank codes
  beee check-partner <code>       validate a partner referral code
  beee check-email <email>        check whether an email is registered
  beee spec                       print the OpenAPI spec
  beee docs                       open the API docs`;

async function call(path, init) {
  const r = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { 'content-type': 'application/json', ...(init && init.headers) }
  });
  const body = await r.json().catch(() => ({}));
  console.log(JSON.stringify(body, null, 2));
  if (!r.ok) process.exit(1);
}

if (cmd === 'banks') await call('/api/banks');
else if (cmd === 'check-partner')
  await call('/api/validate-partner', { method: 'POST', body: JSON.stringify({ code: arg }) });
else if (cmd === 'check-email') await call(`/api/user/check?email=${encodeURIComponent(arg || '')}`);
else if (cmd === 'spec') await call('/docs/openapi.json');
else if (cmd === 'docs') console.log(usage);
else console.log(usage);
