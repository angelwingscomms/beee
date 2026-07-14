import { load_dashboard } from './load';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => load_dashboard(locals);
