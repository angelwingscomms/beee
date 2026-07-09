import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { search_by_payload } from '$lib/db';
import type { Registration } from '$lib/types/registration';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  if (!user) redirect(302, '/login?next=/dashboard');

  const registrations = await search_by_payload<Registration>({ s: 'reg', e: user.email });

  return { user, registrations };
};
