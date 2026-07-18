// One-shot backfill: remap stored `st` to single-char values per AGENTS.md rule.
// Reads QDRANT_URL / QDRANT_KEY from env. DRY=1 to report only (no writes).
// Handles Qdrant typed-value wrapping ({keyword},{text}) for st.

import { QdrantClient } from '@qdrant/js-client-rest';

const COLLECTION = 'i';
const REG_MAP = { pending: 'r', paid: 'i' };
const PO_MAP = { pending: 'r', success: 's', failed: 'f', processing: 'p', blocked_self: 'b', reversed: 'v' };
const DRY = process.env.DRY === '1';

function unwrap(v) {
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    if ('keyword' in v) return v.keyword;
    if ('text' in v) return v.text;
  }
  return v;
}
function rewrap(orig, val) {
  if (orig && typeof orig === 'object' && !Array.isArray(orig)) {
    if ('keyword' in orig) return { keyword: val };
    if ('text' in orig) return { text: val };
  }
  return val;
}

async function main() {
  const q = new QdrantClient({
    url: process.env.QDRANT_URL || 'http://localhost:6333',
    apiKey: process.env.QDRANT_KEY || undefined
  });

  let next = null;
  let scanned = 0, changed = 0, skipped = 0;
  const samples = [];

  while (true) {
    const res = await q.scroll(COLLECTION, {
      limit: 256,
      with_payload: true,
      with_vector: false,
      offset: next
    });
    const points = res.points || [];
    if (points.length === 0) break;

    for (const p of points) {
      scanned++;
      const s = unwrap(p.payload?.s);
      const stRaw = unwrap(p.payload?.st);
      const map = s === 'reg' ? REG_MAP : s === 'po' ? PO_MAP : null;
      if (!map || stRaw === undefined || !(stRaw in map)) { skipped++; continue; }
      const mapped = map[stRaw];
      if (mapped === stRaw) { skipped++; continue; }
      changed++;
      if (samples.length < 10) samples.push({ id: p.id, s, from: stRaw, to: mapped });
      if (!DRY) {
        await q.setPayload(COLLECTION, {
          wait: true,
          points: [p.id],
          payload: { st: rewrap(p.payload.st, mapped) }
        });
      }
    }

    next = res.next_page_offset ?? null;
    if (next === null || next === undefined) break;
  }

  console.log(JSON.stringify({ dry: DRY, scanned, changed, skipped, samples }, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
