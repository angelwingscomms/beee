import { search_by_payload } from '$lib/db';
import { extract_partner_code } from '$lib/partner_code';
import type { User } from '$lib/types';

/**
 * Resolves anything a parent typed into the partner who owns it, or null.
 * Custom codes are stored lowercased (api/partner/set-code), while generated
 * codes are mixed case, so a miss on the typed text retries in lowercase.
 * Every caller must store the returned partner's own `ac`, never the typed
 * text, so the payout lookup finds the same partner later.
 */
export async function find_partner_by_code(input: string): Promise<(User & { i: string }) | null> {
  const code = extract_partner_code(input);
  if (!code) return null;
  const lower = code.toLowerCase();
  for (const c of code === lower ? [code] : [code, lower]) {
    const us = await search_by_payload<User>({ s: 'u', ac: c });
    const partner = us.find(u => u.c?.includes('fab')) as (User & { i: string }) | undefined;
    if (partner) return partner;
  }
  return null;
}
