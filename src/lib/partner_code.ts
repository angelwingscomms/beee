import Sqids from 'sqids';

// ponytail: kept sqids (not base36 of Date.now) because the two integer inputs
// , unix seconds + a 1000-9999 random nonce , are distinct per call, and sqids
// encodes them into a fixed 6-char code that is unique by construction. A short
// base36 timestamp alone would collide within the same second.
const sqids = new Sqids({ minLength: 6 });

/**
 * Generates a partner affiliate code. Lives in its own client-safe module so it
 * can be imported from browser code (e.g. the register page placeholder) without
 * pulling in server-only modules.
 */
export function gen_partner_code(): string {
  return sqids.encode([Math.floor(Date.now() / 1000), Math.floor(Math.random() * 9000) + 1000]);
}

/**
 * Pulls the code out of whatever a parent pastes: a bare code, the share link
 * (/i/CODE), or a register link (?c=CODE). Anything else keeps its last path
 * segment, so a link shape we have not thought of still resolves.
 */
export function extract_partner_code(input: string): string {
  const s = input.trim();
  const q = s.match(/[?&]c=([^&#\s]+)/);
  if (q) return decodeURIComponent(q[1]).trim();
  return s.split(/[?#]/)[0].replace(/\/+$/, '').split('/').pop() ?? '';
}
