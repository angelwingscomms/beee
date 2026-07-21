// Server-only helper for Groq's OpenAI-compatible chat API.
// Used to sanity-check that a proposed custom partner code "sounds ok"
// (brandable, not offensive, appropriate for a children's program).

import { get_secret } from '$lib/server/secrets';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

export interface CodeCheckResult {
	/** Whether the code is acceptable to use. */
	ok: boolean;
	/** Short human-readable explanation (always present, even when ok). */
	reason: string;
}

const SYSTEM_PROMPT = `You are a brand-safety reviewer for BEEE, a children's chess education program in Nigeria. A "partner referral code" is a short token a partner shares with parents, schools, and community members so registrants can apply it for a discount.

Decide whether the proposed code "sounds ok". A code sounds OK if it is ALL of the following:
- brandable and easy to say aloud and type
- free of profanity, slurs, or vulgarity
- not offensive, hateful, or embarrassing for a child or parent to say
- not a real profane, sexual, drug, or scammy word
- not impersonating a major real-world brand or person
- not pure nonsense that would confuse registrants

Respond ONLY with a JSON object and nothing else, in this exact shape:
{"ok": true|false, "reason": "one short sentence explaining the decision"}`;

/**
 * Ask llama-3.1-8b-instant whether `code` sounds like an acceptable partner code.
 * Fails safe: any transport/parse/availability problem returns ok:false with a
 * reason, so a partner is never silently given an unchecked code.
 */
export async function check_partner_code_sounds_ok(code: string): Promise<CodeCheckResult> {
	const key = await get_secret('GROQ');
	if (!key) {
		return { ok: false, reason: 'Code verification is unavailable right now. Please try again later.' };
	}

	let res: Response;
	try {
		res = await fetch(GROQ_URL, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${key}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: MODEL,
				messages: [
					{ role: 'system', content: SYSTEM_PROMPT },
					{ role: 'user', content: `Proposed partner code: "${code}". Does it sound ok?` }
				],
				temperature: 0,
				max_tokens: 200,
				response_format: { type: 'json_object' }
			})
		});
	} catch {
		return { ok: false, reason: 'Could not reach the code-check service. Please try again.' };
	}

	if (!res.ok) {
		return { ok: false, reason: 'Code verification service returned an error. Please try again.' };
	}

	const data = (await res.json().catch(() => null)) as
		| { choices?: Array<{ message?: { content?: string } }> }
		| null;
	const content = data?.choices?.[0]?.message?.content ?? '';
	const parsed = extract_json(content);
	if (!parsed || typeof parsed.ok !== 'boolean') {
		return { ok: false, reason: 'Could not parse the code verification result. Please try again.' };
	}
	return { ok: parsed.ok, reason: typeof parsed.reason === 'string' ? parsed.reason : '' };
}

function extract_json(text: string): { ok?: unknown; reason?: unknown } | null {
	if (!text) return null;
	const trimmed = text.trim();
	const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
	const candidate = fenced ? fenced[1] : trimmed;
	try {
		return JSON.parse(candidate);
	} catch {
		const m = candidate.match(/\{[\s\S]*\}/);
		if (m) {
			try {
				return JSON.parse(m[0]);
			} catch {
				return null;
			}
		}
		return null;
	}
}
