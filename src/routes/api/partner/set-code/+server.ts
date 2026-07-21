import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { search_by_payload, update_point } from '$lib/db';
import { check_partner_code_sounds_ok } from '$lib/groq';
import type { User } from '$lib/types';

// A custom partner code must be short, URL-safe, and easy to type/share.
const CODE_RE = /^[a-z0-9_-]{3,24}$/;

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}

	const body = await request.json().catch(() => ({}));
	const raw = typeof body.code === 'string' ? body.code.trim() : '';
	const code = raw.toLowerCase();

	if (!raw) {
		return json({ error: 'Enter a partner code' }, { status: 400 });
	}
	if (!CODE_RE.test(code)) {
		return json(
			{
				error:
					'Use 3–24 characters: lowercase letters, numbers, hyphens, or underscores only.'
			},
			{ status: 400 }
		);
	}

	// Must be unique across every user (a registration looks up partners by an
	// exact `ac` match, so a collision would orphan or misroute referrals).
	const collisions = await search_by_payload<User>({ s: 'u', ac: code });
	const taken = collisions.some((u) => (u as { i?: string }).i !== locals.user!.id);
	if (taken) {
		return json({ error: 'That code is already taken. Pick another.' }, { status: 409 });
	}

	// Let llama-3.1-8b-instant decide whether it "sounds ok" before we commit it.
	const verdict = await check_partner_code_sounds_ok(code);
	if (!verdict.ok) {
		return json(
			{ error: verdict.reason || 'That code does not sound right. Try a different one.' },
			{ status: 422 }
		);
	}

	try {
		await update_point(locals.user.id, { ac: code });
	} catch {
		return json({ error: 'Failed to save your partner code' }, { status: 500 });
	}

	return json({ success: true, code });
};
