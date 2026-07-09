import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { get } from '$lib/db';
import type { User } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, '/login/google?next=/affiliate/settings');
  const user = await get<User>(locals.user.id);
  if (!user) throw redirect(302, '/login/google?next=/affiliate/settings');
  return {
    email: user.e,
    name: user.n,
    ac: user.ac,
    ba: user.ba,
    bn: user.bn
  };
};
