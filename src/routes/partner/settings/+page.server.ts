import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import Sqids from 'sqids';
import { get, search_by_payload, update_point } from '$lib/db';
import type { User } from '$lib/types';
import type { Registration } from '$lib/types/registration';

const sqids = new Sqids({ minLength: 6 });

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, '/login/google?next=/partner/settings');
  const user = await get<User>(locals.user.id);
  if (!user) throw redirect(302, '/login/google?next=/partner/settings');

  let c = user.c ?? [];
  let ac = user.ac;
  let did_upgrade = false;
  if (!c.includes('fab')) {
    c = [...c, 'fab'];
    did_upgrade = true;
  }
  if (!ac) {
    ac = sqids.encode([Math.floor(Date.now() / 1000), Math.floor(Math.random() * 9000) + 1000]);
    did_upgrade = true;
  }
  if (did_upgrade) {
    await update_point<User>(locals.user.id, { c, ac });
  }

  const registrations = ac
    ? await search_by_payload<Registration>({ s: 'reg', ac }, ['fn', 'ln', 'e', 'sn', 'st', 'ref', 'amt', 'd'], 100)
    : [];

  return {
    email: user.e,
    name: user.n,
    ac,
    ba: user.ba,
    bn: user.bn,
    bk: user.bk,
    registrations
  };
};
