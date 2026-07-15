// Mock Paystack server for e2e tests.
// Implements the subset of the Paystack API the app uses, so the full
// register → pay → partner-payout flow can run locally against a real dev
// server (PAYSTACK_BASE_URL points here). Run with: node e2e/paystack-mock.mjs
import { createServer } from 'node:http';
import { createHmac } from 'node:crypto';

const PORT = process.env.PAYSTACK_MOCK_PORT || 8788;
const SECRET = process.env.SECRET || 'test-secret-key';

// reference -> { amount, email, metadata }
const txns = new Map();
const recipients = new Map();
const transfers = new Map();

function json(res, code, body) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

const server = createServer((req, res) => {
  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    const auth = req.headers['authorization'] || '';
    if (!auth.includes(SECRET)) return json(res, 401, { status: false, message: 'Invalid secret key' });

    let p = {};
    try { p = body ? JSON.parse(body) : {}; } catch { /* ignore */ }

    const url = req.url.split('?')[0];
    const method = req.method;

    // Initialize: remember amount so verify returns the same value.
    if (method === 'POST' && url === '/transaction/initialize') {
      const ref = (p.metadata && p.metadata.regId) || `ref_${Date.now()}`;
      txns.set(ref, { amount: p.amount, email: p.email, metadata: p.metadata || {} });
      return json(res, 200, {
        status: true,
        data: { authorization_url: `http://localhost/callback?reference=${ref}`, access_code: 'ACC', reference: ref }
      });
    }

    // Verify: return the stored amount so the app's amount check passes.
    if (method === 'GET' && url.startsWith('/transaction/verify/')) {
      const ref = url.split('/transaction/verify/')[1];
      const t = txns.get(ref) || { amount: p.amount || 1500000, email: 'e@e.com', metadata: {} };
      return json(res, 200, {
        status: true,
        data: { status: 'success', reference: ref, amount: t.amount, customer: { email: t.email }, metadata: t.metadata }
      });
    }

    if (method === 'POST' && url === '/bank/resolve') {
      return json(res, 200, { status: true, data: { account_number: p.account_number, account_name: 'Test Account', bank_id: 1 } });
    }

    if (method === 'POST' && url === '/transferrecipient') {
      const code = `RCP_${recipients.size + 1}`;
      recipients.set(code, p);
      return json(res, 200, { status: true, data: { recipient_code: code, active: true } });
    }

    if (method === 'POST' && url === '/transfer') {
      const ref = p.reference;
      if (transfers.has(ref)) {
        return json(res, 409, { status: false, message: `Transfer with reference ${ref} already exists` });
      }
      transfers.set(ref, p);
      return json(res, 200, { status: true, data: { transfer_code: `TRF_${transfers.size}`, status: 'success', reference: ref } });
    }

    if (url === '/balance' || url === '/transfer/balance') {
      return json(res, 200, { status: true, data: [{ balance: 1000000000, currency: 'NGN' }] });
    }

    json(res, 404, { status: false, message: `No mock for ${method} ${url}` });
  });
});

server.listen(PORT, () => console.log(`[paystack-mock] on ${PORT}`));
