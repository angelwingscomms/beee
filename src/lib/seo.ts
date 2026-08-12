export const SITE_URL = 'https://beeeproject.com';
export const SITE_NAME = 'BEEE';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`;

export type SeoEntry = {
	title: string;
	description: string;
	/** Omit for private/utility pages: they are noindex and stay out of the sitemap. */
	sitemap?: { priority: number; changefreq: string };
};

/** Single source of truth for <head> metadata and sitemap.xml. */
export const SEO: Record<string, SeoEntry> = {
	'/': {
		title: 'BEEE Chess Championship Abuja 2026 | More Than a Chess Championship',
		description:
			'Chess, leadership and life skills for Abuja kids aged 10–14. AI coaching, mentorship and the TEAMUP™ programme. Entry closes 26 September 2026.',
		sitemap: { priority: 1.0, changefreq: 'weekly' }
	},
	'/register': {
		title: 'Register | BEEE Spectacular Chess Championship Abuja 2026',
		description:
			'Register your child for the BEEE Spectacular Chess Championship Abuja 2026 and the TEAMUP™ development programme. Secure a place in minutes.',
		sitemap: { priority: 0.9, changefreq: 'weekly' }
	},
	'/about': {
		title: 'About BEEE | Be Everything Excellent Every Day',
		description:
			'BEEE is an integrated learning platform combining youth programmes, digital tools, mentorship and immersive experiences that inspire excellence.',
		sitemap: { priority: 0.8, changefreq: 'monthly' }
	},
	'/teamup': {
		title: 'TEAMUP™ Programme | BEEE Chess Championship Abuja 2026',
		description:
			'The TEAMUP™ development programme grows players, learners and leaders through Technology, Enterprise, Art, Mentorship and Upskill.',
		sitemap: { priority: 0.8, changefreq: 'monthly' }
	},
	'/e4': {
		title: 'e4™ AI Chess Coach | BEEE Chess Championship Abuja 2026',
		description:
			'e4™ is an AI-powered chess coach giving young players real-time move analysis, personalised training plans and game insights.',
		sitemap: { priority: 0.8, changefreq: 'monthly' }
	},
	'/taskify': {
		title: 'Taskify™ Digital Passport | BEEE Chess Championship Abuja 2026',
		description:
			'Taskify™ is a digital development passport tracking each participant’s progress, milestones, badges and growth through the championship.',
		sitemap: { priority: 0.8, changefreq: 'monthly' }
	},
  	'/why-beee': {
 		title: 'Why BEEE? | Our Mission & Vision',
 		description:
 			'Every young person holds extraordinary potential. Our mission: cultivate strategic thinking, leadership and lifelong learning through chess.',
 		sitemap: { priority: 0.7, changefreq: 'monthly' }
 	},
 	'/quotes': {
 		title: 'Chess Quotes | Be Everything Excellent Every Day',
 		description:
 			'Inspirational chess quotes that motivate personal growth, strategic thinking, and excellence in life and competition. Discover wisdom from chess masters.',
 		sitemap: { priority: 0.6, changefreq: 'weekly' }
 	},
 	'/faq': {
 		title: 'FAQ | BEEE Spectacular Chess Championship Abuja 2026',
 		description:
 			'Answers on registration, fees, eligibility, participation, awards and the TEAMUP™ programme for the BEEE Chess Championship Abuja 2026.',
 		sitemap: { priority: 0.7, changefreq: 'monthly' }
 	},
	'/partner': {
		title: 'Partner Programme | BEEE Chess Championship Abuja 2026',
		description:
			'Join the BEEE Partner Programme, share your referral code and earn a commission on every championship registration you refer.',
		sitemap: { priority: 0.7, changefreq: 'monthly' }
	},
	'/privacy': {
		title: 'Privacy Policy | BEEE',
		description:
			'How BEEE collects, uses and protects your personal data when you register for the BEEE Spectacular Chess Championship Abuja 2026.',
		sitemap: { priority: 0.3, changefreq: 'yearly' }
	},
	'/terms': {
		title: 'Terms of Service | BEEE',
		description:
			'The terms that apply when you register for or take part in the BEEE Spectacular Chess Championship Abuja 2026.',
		sitemap: { priority: 0.3, changefreq: 'yearly' }
	},

	// Private / utility — noindex, excluded from sitemap.
	'/login': { title: 'Log in | BEEE', description: 'Log in to your BEEE account.' },
	'/logout': { title: 'Signing out | BEEE', description: 'Signing out of your BEEE account.' },
	'/account': { title: 'Account | BEEE', description: 'Manage your BEEE account.' },
	'/profile': { title: 'Profile | BEEE', description: 'Manage your BEEE profile.' },
	'/dashboard': { title: 'Dashboard | BEEE', description: 'Your BEEE dashboard.' },
	'/dashboard/partner': {
		title: 'Partner Dashboard | BEEE',
		description: 'Track your BEEE partner referrals and payouts.'
	},
	'/dashboard/settings': {
		title: 'Settings | BEEE',
		description: 'Manage your BEEE account settings.'
	},
	'/payment/callback': {
		title: 'Payment | BEEE',
		description: 'Confirming your BEEE registration payment.'
	},
	'/design': { title: 'Design System | BEEE', description: 'Internal BEEE design system.' },
	'/i': { title: 'Admin | BEEE', description: 'Internal BEEE admin.' }
};

const FALLBACK: SeoEntry = {
	title: 'BEEE | Be Everything Excellent Every Day',
	description:
		'BEEE runs the TEAMUP™ youth development programme and the Spectacular Chess Championship in Abuja.'
};

/** Strips a trailing slash so `/faq/` and `/faq` resolve to the same entry. */
export function seo_for(pathname: string): SeoEntry {
	const key = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
	return SEO[key] ?? FALLBACK;
}

/** Everything without a `sitemap` block is private, plus anything unmapped (404s, deep app routes). */
export function is_indexable(pathname: string): boolean {
	const key = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
	return SEO[key]?.sitemap !== undefined;
}

export const sitemap_entries = () =>
	Object.entries(SEO)
		.filter(([, v]) => v.sitemap)
		.map(([path, v]) => ({ path, ...v.sitemap! }))
		.sort((a, b) => b.priority - a.priority);
