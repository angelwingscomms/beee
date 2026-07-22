import { get_secret } from '$lib/server/secrets';
import { search_by_payload } from '$lib/db';
import type { Registration } from '$lib/types/registration';
import type { User } from '$lib/types';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => ({});

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const p = data.get('password') as string;

    if (p !== await get_secret('PASSWORD')) {
      return fail(401, { error: 'Wrong password' });
    }

    const registrations = await search_by_payload<Registration>(
      { s: 'reg' },
      true,
      144,
      { key: 'd', direction: 'desc' }
    );

    // Phone lives on the User, not the Registration , build an email -> phone map.
    const users = await search_by_payload<User>({ s: 'u' }, true, 1000);
    const phonesByEmail = new Map<string, string>();
    for (const u of users) {
      if (u.e && u.ph?.length) phonesByEmail.set(u.e, u.ph.join(', '));
    }

    return { success: true, registrations, phonesByEmail: Object.fromEntries(phonesByEmail) };
  }
};
