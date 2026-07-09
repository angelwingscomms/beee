import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { update_point } from '$lib/db';

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { ba, bn } = await request.json();

  const errors: string[] = [];
  if (!ba || !/^\d{10}$/.test(ba)) {
    errors.push('Account number must be exactly 10 digits');
  }
  if (!bn || bn.trim().length < 2) {
    errors.push('Account name is required');
  }
  if (errors.length > 0) {
    return json({ error: errors.join('. ') }, { status: 400 });
  }

  try {
    await update_point(locals.user.id, { ba: ba.trim(), bn: bn.trim() });
    return json({ success: true });
  } catch {
    return json({ error: 'Failed to save bank details' }, { status: 500 });
  }
};
