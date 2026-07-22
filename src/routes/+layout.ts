import type { LayoutLoad } from './$types';
import { SITE_URL } from '$lib/seo';

/** Purpose-built 1200x630 cards — the declared og:image:width/height must match the file. */
const OG: Record<string, string> = {
  '/': `${SITE_URL}/og.png`,
  '/register': `${SITE_URL}/og/register.jpg`,
  '/about': `${SITE_URL}/og/about.jpg`,
  '/e4': `${SITE_URL}/og/e4.jpg`,
  '/teamup': `${SITE_URL}/og/teamup.jpg`,
  '/taskify': `${SITE_URL}/og/taskify.jpg`,
  '/why-beee': `${SITE_URL}/og/why-beee.jpg`,
  '/partner': `${SITE_URL}/og/partner.jpg`,
};

export const load: LayoutLoad = ({ route, data }) => {
  return { ...data, ogImage: OG[route.id ?? '/'] ?? `${SITE_URL}/og.png` };
};
