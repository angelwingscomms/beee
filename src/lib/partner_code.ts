import Sqids from 'sqids';

const sqids = new Sqids({ minLength: 6 });

/**
 * Generates a partner affiliate code. Lives in its own client-safe module so it
 * can be imported from browser code (e.g. the register page placeholder) without
 * pulling in server-only modules.
 */
export function gen_partner_code(): string {
  return sqids.encode([Math.floor(Date.now() / 1000), Math.floor(Math.random() * 9000) + 1000]);
}
