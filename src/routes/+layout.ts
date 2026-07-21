import type { LayoutLoad } from './$types';

const OG: Record<string, string> = {
  '/': 'https://beeeproject.com/og.png',
  '/register': 'https://beeeproject.com/register-bg.png',
  '/about': 'https://beeeproject.com/images/championship/about-bg.png',
  '/e4': 'https://beeeproject.com/e4-ui.png',
  '/teamup': 'https://beeeproject.com/images/championship/technology.png',
  '/taskify': 'https://beeeproject.com/images/championship/bento_passport.png',
  '/why-beee': 'https://beeeproject.com/images/championship/about-new.png',
  '/partner': 'https://beeeproject.com/images/championship/mentorship.png',
  '/faq': 'https://beeeproject.com/og.png',
  '/privacy': 'https://beeeproject.com/og.png',
  '/terms': 'https://beeeproject.com/og.png',
};

export const load: LayoutLoad = ({ route, data }) => {
  return { ...data, ogImage: OG[route.id ?? '/'] ?? 'https://beeeproject.com/og.png' };
};
