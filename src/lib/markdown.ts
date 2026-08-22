import { SITE_URL, seo_for } from '$lib/seo';
import { get_post } from '$lib/data/news';
import type { NewsBlock, NewsPost } from '$lib/types/news';

/**
 * Markdown representation of the public pages.
 *
 * This is the content an agent gets when it requests a page with
 * `Accept: text/markdown` (see src/hooks.server.ts). Keep it short,
 * factual and link-rich so agents can read and navigate the site.
 */

export const SITE_NAME = 'BEEE';

/** Paths that answer with a real markdown body via Accept negotiation. */
const PUBLIC_PATHS = new Set([
	'/',
	'/about',
	'/contact',
	'/privacy',
	'/terms',
	'/why-beee',
	'/teamup',
	'/e4',
	'/taskify',
	'/quotes',
	'/faq',
	'/partner',
	'/register',
	'/news',
	'/docs',
	'/docs/api',
	'/docs/auth',
	'/docs/webhooks',
	'/docs/agents'
]);

/** Hand-written markdown bodies for the core pages. */
const BODIES: Record<string, string> = {
	'/': `BEEE (Be Everything Excellent Every Day) runs the **BEEE Spectacular Chess Championship Abuja 2026** and the **TEAMUP** youth development programme for children aged 10-14 in Abuja, Nigeria.

It is more than a chess tournament. Registration unlocks three platforms:

- **e4** - an AI chess coach with real-time move analysis and training.
- **TEAMUP** - Technology, Enterprise, Art, Mentorship, Upskill development activities.
- **Taskify** - a Digital Development Passport that records badges, milestones and certificates.

## Key facts

- Entry closes: 26 September 2026
- Live preliminaries: October 2026
- Grand Finale: November 2026, National Stadium, Abuja
- Full access fee: NGN 15,000 (about NGN 13,500 with a partner code)
- Contact: info@beeeproject.com - +234 902 682 4439

## Start here

- [Register your child](https://beeeproject.com/register)
- [About BEEE](https://beeeproject.com/about)
- [TEAMUP programme](https://beeeproject.com/teamup)
- [e4 AI coach](https://beeeproject.com/e4)
- [Taskify passport](https://beeeproject.com/taskify)
- [FAQ](https://beeeproject.com/faq)
- [News and results](https://beeeproject.com/news)`,
	'/about': `BEEE (Be Everything Excellent Every Day) is a learning and development platform for young people. We combine structured programmes, digital tools and mentorship so students grow in education, leadership and life.

## What we believe

We believe every young person has extraordinary potential. Our job is to give it structure: purposeful learning, real mentors, and real challenges.

## Benefits of BEEE programmes

- **Structured learning** - a guided programme with weekly goals.
- **Achievement tracking** - recognition for growth, skills and accomplishments.
- **Network and collaborate** - share experiences with like-minded people.
- **Digital tools and mentorship** - innovative tools and immersive learning.
- **Life skills development** - skills for success in education, leadership, enterprise and life.

## The championship

BEEE runs the **BEEE Spectacular Chess Championship Abuja 2026**, a five-stage journey for children aged 10-14: registration, online training, live preliminaries, elite qualifiers, and a grand finale at the National Stadium, Abuja.

- [Register your child](https://beeeproject.com/register)
- [Privy policy](https://beeeproject.com/privacy)
- [Terms](https://beeeproject.com/terms)`,
	'/contact': `Contact the BEEE team about the BEEE Spectacular Chess Championship Abuja 2026.

## Reach us

- Email: [info@beeeproject.com](mailto:info@beeeproject.com)
- Phone: +234 902 682 4439
- WhatsApp: +234 902 682 4439
- Social: [@thebeeeproject](https://www.instagram.com/thebeeeproject) on Instagram, Facebook and YouTube; @beeeproject on X.

## Business hours

We respond to messages Monday to Friday, 9:00 to 17:00 West Africa Time (GMT+1).

## What to include

- registration or payment questions: include the participant name and any reference number
- partnership enquiries: your organisation name and how you would like to support the championship

- [About BEEE](https://beeeproject.com/about)
- [Register](https://beeeproject.com/register)
- [FAQ](https://beeeproject.com/faq)`,
	'/privacy': `This is the BEEE Privacy Policy. It explains what personal data we collect, why we collect it, and the choices you have.

## Data we collect

- registration: name, email, phone, school or organisation, and a password (stored hashed, never in plain text)
- team registrations add player names and team details
- partners provide bank account details needed to pay commissions
- if you sign in with Google, we receive your name, email and profile picture from Google

## How we use your data

- to create and manage your account and registrations
- to process payments through Paystack
- to communicate about the championship (confirmations, schedules, results)
- to pay partner commissions
- to improve our programmes and prevent fraud

## Your choices

- you can ask for a copy of your data, ask us to correct it, or ask us to delete it
- contact [info@beeeproject.com](mailto:info@beeeproject.com) to make a request

See also [Terms of Service](https://beeeproject.com/terms) and [About BEEE](https://beeeproject.com/about).`,
	'/terms': `These are the BEEE Terms of Service for the BEEE Spectacular Chess Championship Abuja 2026.

## Registration and fees

Registration requires payment of the stated participation fee through Paystack. Registration is confirmed only once payment is verified. Where a partner discount code is applied, the fee is the discounted amount.

## Conduct

Participants and attendees must act with respect and sportsmanship. We may remove a participant for cheating, harassment, unsafe behaviour, or conduct that undermines the event.

## Refunds

Fees are generally non-refundable. Refunds may be considered only for event cancellation by BEEE or documented extenuating circumstances, at our discretion.

## Media and likeness

The championship is photographed and recorded. By participating you grant BEEE permission to use images and recordings for promotional and reporting purposes, in line with our Privacy Policy.

## Accounts and security

You are responsible for keeping your account credentials secure. Do not share your login or use another person's account.

See also [Privacy Policy](https://beeeproject.com/privacy) and [About BEEE](https://beeeproject.com/about).`,
	'/why-beee': `Why choose BEEE? Every young person holds extraordinary potential. Our mission is to cultivate strategic thinking, leadership and lifelong learning through chess.

## What makes BEEE different

- chess is the platform, not the destination
- it is a structured developmental journey for children aged 10-14
- every participant gains e4, TEAMUP and Taskify on registration
- growth is documented, not just celebrated

## The outcome

Children leave with chess skill, leadership practice, real mentorship, and a documented record of what they achieved.

- [Register](https://beeeproject.com/register)
- [About BEEE](https://beeeproject.com/about)
- [TEAMUP](https://beeeproject.com/teamup)`,
	'/teamup': `TEAMUP is the BEEE development programme. It stands for **T**echnology, **E**nterprise, **A**rt, **M**entorship, **U**pskill.

It grows players, learners and leaders beyond the chessboard, through weekly activities, challenges, mentorship and life-skills sessions.

## The pillars

- Technology - using technology creatively and responsibly to solve problems
- Enterprise - building an enterprising, value-creating mindset
- Art - expression and creativity
- Mentorship - guided growth from real role models
- Upskill - practical skills for school, work and life

TEAMUP activities run alongside the chess championship and are included in the registration fee.

- [Register](https://beeeproject.com/register)
- [e4 AI coach](https://beeeproject.com/e4)
- [Taskify passport](https://beeeproject.com/taskify)`,
	'/e4': `e4 is the BEEE AI chess coach. It gives young players real-time move analysis, personalised training plans and game insights.

## Capabilities

- predicts moves and suggests the next best move
- analyses mistakes in real time
- answers questions by voice and text
- provides step-by-step strategy coaching
- breaks down every move in deep game analysis
- plays against AI or real opponents
- auto-generates custom puzzles from real game mistakes

Free e4 access opened 15 August 2026. Paid registration required from 25 August 2026 unlocks full access.

- [Register](https://beeeproject.com/register)
- [TEAMUP](https://beeeproject.com/teamup)
- [Taskify](https://beeeproject.com/taskify)`,
	'/taskify': `Taskify is the BEEE Digital Development Passport. It records every badge, milestone and certificate a participant earns through the championship.

It documents the full journey: training progress, TEAMUP activities, mentorship and competition results. It turns achievement into a permanent, verifiable record.

- [Register](https://beeeproject.com/register)
- [e4 AI coach](https://beeeproject.com/e4)
- [TEAMUP](https://beeeproject.com/teamup)`,
	'/quotes': `Inspirational chess and life quotes that motivate personal growth, strategic thinking and excellence, from the BEEE team. Read them with players, learners and leaders. [View the full quotes page on beeeproject.com](https://beeeproject.com/quotes).`,
	'/faq': `Answers on registration, fees, eligibility, participation, awards and the TEAMUP programme for the BEEE Chess Championship Abuja 2026. [Browse the full FAQ on beeeproject.com](https://beeeproject.com/faq).`,
	'/partner': `Join the BEEE Partner Programme. Share your referral code and earn a commission on every championship registration you refer.

Partners get a unique code, a shareable link and a dashboard to track referrals and payouts.

- [Become a partner](https://beeeproject.com/partner)
- [Register your child](https://beeeproject.com/register)
- [About BEEE](https://beeeproject.com/about)`,
	'/register': `Register your child for the BEEE Spectacular Chess Championship Abuja 2026 and the TEAMUP development programme.

## Steps

1. Enter the participant details (name, school, contact).
2. Set up or log in to your BEEE account.
3. Pay the full access fee with Paystack, or apply a partner code for a discount.

- Full access fee: NGN 15,000 (about NGN 13,500 with a partner code)
- Entry closes: 26 September 2026
- Ages: 10-14

[Go to the registration form](https://beeeproject.com/register) or read the [FAQ](https://beeeproject.com/faq).`,
	'/news': `News and results from the BEEE Spectacular Chess Championship Abuja 2026, written by the BEEE editorial team. [See all stories on beeeproject.com](https://beeeproject.com/news).`,
	'/docs': `BEEE developer and agent documentation. Everything an engineer or an AI agent needs to integrate with beeeproject.com.

## Machine-readable files

- [llms.txt](https://beeeproject.com/llms.txt) - the site index for AI agents
- [sitemap.xml](https://beeeproject.com/sitemap.xml) - XML site map
- [robots.txt](https://beeeproject.com/robots.txt) - crawler policy (GPTBot, ClaudeBot, PerplexityBot allowed)
- [OpenAPI spec](https://beeeproject.com/docs/openapi.json) - the public REST API

## Guides

- [API reference](https://beeeproject.com/docs/api)
- [Authentication](https://beeeproject.com/docs/auth)
- [Webhooks](https://beeeproject.com/docs/webhooks)
- [AI agents](https://beeeproject.com/docs/agents)`,
	'/docs/api': `The BEEE public REST API, documented in the [OpenAPI spec](https://beeeproject.com/docs/openapi.json). All endpoints are under https://beeeproject.com/api and return JSON.

## Public endpoints

- GET /api/banks - list Nigerian bank codes
- POST /api/validate-partner - validate a partner referral code
- POST /api/register - create a registration
- POST /api/register-init-payment - start a Paystack payment for a registration
- POST /api/verify-payment - verify a payment and confirm a registration
- GET /api/user/check - check whether an email is registered

## Authenticated endpoints

- POST /api/auth/signup, /api/auth/login, /api/auth/logout - account and session
- POST /api/become-partner, /api/partner/signup, /api/partner/settings, /api/partner/set-code - partner flows

See [Authentication](https://beeeproject.com/docs/auth) and [Webhooks](https://beeeproject.com/docs/webhooks).`,
	'/docs/auth': `BEEE authentication uses a cookie session plus optional Google sign-in.

- Email/password accounts: POST /api/auth/signup, then POST /api/auth/login sets a session cookie named 'session'.
- Google sign-in: /google starts the OAuth flow; the callback is /google.
- Session cookie is httpOnly, SameSite=Lax. Send it on every authenticated request.
- POST /api/auth/logout clears the session.

For programmatic access, call the public endpoints (banks, validate-partner, user/check) without a session. See the [API reference](https://beeeproject.com/docs/api).`,
	'/docs/webhooks': `Paystack webhooks notify BEEE of payment events.

## Endpoint

- POST /api/webhooks/paystack

## Behaviour

- Respond 200 immediately (Paystack retries otherwise).
- Signature verified with HMAC SHA512 via the 'x-paystack-signature' header.
- The 'charge.success' event is handled idempotently.

Configure the endpoint in the Paystack dashboard under Settings > API Keys and Webhooks. Paystack IPs are 52.31.139.75, 52.49.173.169 and 52.214.14.220.

See the [API reference](https://beeeproject.com/docs/api).`,
	'/docs/agents': `How AI agents should work with beeeproject.com.

## When to use BEEE

Use this site when you need information about the BEEE Spectacular Chess Championship Abuja 2026, the TEAMUP youth development programme, the e4 AI chess coach, the Taskify passport, or BEEE registration, partnerships, pricing, dates or news.

## How to access it

- Read [llms.txt](https://beeeproject.com/llms.txt) for the site index.
- Request any public page with Accept: text/markdown to get a markdown body.
- Fetch [docs/openapi.json](https://beeeproject.com/docs/openapi.json) for the API.
- The site map is at /sitemap.xml.
- GPTBot, ClaudeBot, PerplexityBot and OAI-SearchBot are allowed by robots.txt.

Prefer the markdown representation over scraping the rendered HTML.`
};

function news_to_markdown(p: NewsPost): string {
	const parts: string[] = [`# ${p.t}`, '', `> ${p.x}`, '', p.m, ''];
	for (const b of p.b) {
		switch (b.k) {
			case 'p':
				parts.push(b.t, '');
				break;
			case 'h':
				parts.push(`## ${b.t}`, '');
				break;
			case 'q':
				parts.push(`> ${b.t}`, '', `> ${b.a}`, '');
				break;
			case 'f':
				parts.push('| Label | Value |', '| --- | --- |');
				for (const r of b.r) parts.push(`| ${r.l} | ${r.v} |`);
				parts.push('', '');
				break;
			case 'l':
				parts.push(`### ${b.t}`, '', '| Place | Player | Score |', '| --- | --- | --- |');
				for (const r of b.r) parts.push(`| ${r.p} | ${r.n} | ${r.v} |`);
				parts.push('', '');
				break;
			case 'n':
				parts.push(`> Note: ${b.t}`, '');
				break;
		}
	}
	parts.push('---', '', `Published ${p.d} by ${p.a}. [Read on beeeproject.com](https://beeeproject.com/news/${p.s}).`);
	return parts.join('\n');
}

/**
 * Return a markdown body for a public path, or null when the path has no
 * markdown representation (private or unknown pages).
 */
export function markdown_for(pathname: string): string | null {
	const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

	if (path.startsWith('/news/')) {
		const p = get_post(path.slice('/news/'.length));
		return p ? news_to_markdown(p) : null;
	}
	const body = BODIES[path];
	if (body) {
		const entry = seo_for(path);
		return `# ${entry.title}\n\n${body}`;
	}
	return null;
}

/** Short markdown 404 body pointing agents at the site index and sitemap. */
export function markdown_404(pathname: string): string {
	return `# BEEE - HTTP 404 page not found

The page \`${pathname}\` does not exist on ${SITE_URL}.

## Where to look next

- [Home](https://beeeproject.com/)
- [Register](https://beeeproject.com/register)
- [About BEEE](https://beeeproject.com/about)
- [FAQ](https://beeeproject.com/faq)
- [News and results](https://beeeproject.com/news)
- [Developer docs](https://beeeproject.com/docs)
- [Site map](https://beeeproject.com/sitemap.xml)
- [llms.txt](https://beeeproject.com/llms.txt)

## Request

- Path: \`${pathname}\``;
}

/** Returns the markdown-negotiable set (used to decide Vary: Accept). */
export function supports_markdown(pathname: string): boolean {
	const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
	return PUBLIC_PATHS.has(path) || path.startsWith('/news/');
}
