import { REG_AMOUNT, DISCOUNT_PCT, D_FREE_OPEN, D_PAY_REQUIRED, D_ENTRY_CLOSE, D_FINALE } from '$lib/constants';

export type FaqQ = { q: string; a: string };
export type FaqC = { i: string; n: string; qs: FaqQ[] };

// Single source of truth for the fee copy so it can never drift from the
// amount actually charged (constants.ts) again.
const discounted_amount = Math.round(REG_AMOUNT * (1 - DISCOUNT_PCT / 100));

export const cs: FaqC[] = [
	{
		i: 'general', n: 'General', qs: [
			{ q: 'What is the BEEE Spectacular Chess Championship?', a: 'The BEEE Spectacular Chess Championship is a unique championship experience that combines competitive chess with the TEAMUP Development Programme, providing participants with opportunities to develop strategic thinking, leadership, creativity, innovation, and personal growth' },
			{ q: 'Is this only a chess tournament?', a: 'It is a transformative championship experience that combines AI-powered coaching, creativity, mentorship and a purposeful self development programme' },
			{ q: 'Who can participate?', a: 'Children aged 10–14 years.' },
			{ q: 'Is prior chess experience required?', a: 'No. Participants with varying levels of chess experience may register. The competition and the developmental activities are designed to support different skill levels.' },
			{ q: 'Are there age categories?', a: 'No. The championship has no age categories. Every participant is aged 10–14 and plays in the same championship.' },
			{ q: 'Where is the championship held?', a: 'The Live Preliminary Rounds and Elite Qualifiers Stage take place at centres across Abuja. The Spectacular Championship Grand Finale is held at the National Stadium, Abuja.' },
			{ q: 'What are the championship dates?', a: `${D_FREE_OPEN}: 10 days of free access to the e4 Chess Coach platform begins. ${D_PAY_REQUIRED}: free access ends, and participants pay the registration fee to keep their slot and continue training. ${D_ENTRY_CLOSE}: registration ends and entry into the championship officially closes. October 2026: live tournaments begin, with the Preliminary Rounds and the Elite Qualifiers Stage at centres across Abuja. ${D_FINALE}: the Spectacular Championship Grand Finale at the National Stadium, Abuja.` },
			{ q: 'What should participants bring to the championship?', a: 'Nothing. All equipment is provided.' },
		]
	},
	{
		i: 'registration', n: 'Registration', qs: [
			{ q: 'How do I register?', a: 'Complete registration through the official championship registration portal at /register.' },
			{ q: 'Can a school register multiple participants?', a: 'Yes. Schools can register multiple eligible students.' },
			{ q: 'Can parents register their children directly?', a: 'Yes. Register directly at beeeproject.com/register, you don’t need to go through a school.' },
			{ q: 'Is there a registration deadline?', a: `Entry into the championship officially closes ${D_ENTRY_CLOSE}. Registration is free for everyone, and full access is unlocked with the ₦${REG_AMOUNT.toLocaleString()} fee, payable anytime from your dashboard. Participants may join at any time between ${D_FREE_OPEN} and ${D_ENTRY_CLOSE}. The earlier you register, the more time your child has to learn and improve.` },
			{ q: 'Is there a registration fee?', a: `Registration is free for everyone. The ₦${REG_AMOUNT.toLocaleString()} fee unlocks full access to e4 Chess Coach, TEAMUP and the Taskify Development Passport. Participants with a partner code unlock full access for ₦${discounted_amount.toLocaleString()}, a ${DISCOUNT_PCT}% saving. e4 Chess Coach is free for all participants from ${D_FREE_OPEN}; from ${D_PAY_REQUIRED} continued access requires the registration fee.` },
			{ q: 'What is the refund policy?', a: 'Fees are non-refundable, except if BEEE cancels the event. See our Terms for details.' },
		]
	},
	{
		i: 'teamup', n: 'TEAMUP', qs: [
			{ q: 'What is TEAMUP?', a: 'TEAMUP stands for Technology, Enterprise, Art, Mentorship, and Upskill. It is the developmental component of the championship designed to help participants grow beyond the chessboard.' },
			{ q: 'When does TEAMUP begin?', a: 'Participants gain access to the programme immediately after successful registration.' },
			{ q: 'What activities are included?', a: 'Activities include mentored learning, chess training, leadership exercises, innovation challenges, collaborative projects, personal development activities, project-based challenges, assessments and milestone tracking.' },
			{ q: 'Is participation in TEAMUP compulsory?', a: 'No, but it is strongly encouraged as it forms an important part of the championship experience.' },
		]
	},
	{
		i: 'passport', n: 'Taskify', qs: [
			{ q: 'What is the Taskify™ Development Passport?', a: 'The Development Passport is a digital record of a participant\'s developmental journey throughout the championship cycle.' },
			{ q: 'What information is recorded in the passport?', a: 'The passport contains attendance records, developmental milestones, achievement badges, skills acquired, assessment results, project participation, leadership activities, mentorship engagement, certificates earned, and other notable accomplishments.' },
			{ q: 'Can parents access the passport?', a: 'Yes. Parents and guardians will have access to their child\'s Development Passport and progress records.' },
			{ q: 'Why is the passport important?', a: 'It provides a documented record of growth, achievements, participation, and development throughout the programme.' },
			{ q: 'How do registered players access the programme materials?', a: 'Registered players receive access details by email once payment is confirmed.' },
		]
	},
	{
		i: 'e4', n: 'e4', qs: [
			{ q: 'What is e4™?', a: 'e4™ is an AI-assisted chess learning platform providing guided instruction, game analysis, and personalised practice for every participant.' },
			{ q: 'How does e4 help my child improve?', a: 'e4 analyses every move as your child plays, flagging mistakes, suggesting better plans, and answering questions by voice or text.' },
			{ q: 'What are the benefits of e4?', a: 'e4 offers guided AI instruction, step-by-step strategy coaching, engine-backed game analysis, virtual and real opponents, and custom puzzles generated from your child\'s own games.' },
			{ q: 'When do participants get access to e4?', a: `Free access to e4 opens to all participants on ${D_FREE_OPEN} and runs for 10 days. It ends on ${D_PAY_REQUIRED}. From that date, continued access requires registration through payment of the fee, which also unlocks the TEAMUP programme and the Taskify Development Passport. Registered participants keep their access until the championship ends.` },
		]
	},
	{
		i: 'competition', n: 'Competition', qs: [
			{ q: 'How does the championship work?', a: `The championship follows six stages: (1) Registration, participants gain access to e4 Chess Coach, TEAMUP, and the Taskify Development Passport. (2) Learn, participants train with AI-powered chess coaching, leadership and life-skills development, interactive challenges, and creativity workshops. (3) Compete, Live Preliminary Rounds held at centres across Abuja in October 2026. (4) Evolve, qualifying participants advance through elimination tournaments. (5) Qualify, the Elite Qualifiers Stage trains players for finalist positions. (6) Grand Finale, finalists participate in the immersive championship experience in ${D_FINALE} at the National Stadium, Abuja.` },
			{ q: 'What happens after registration?', a: 'Participants begin the TEAMUP Development Programme and prepare for championship activities and competition stages.' },
			{ q: 'Are certificates issued?', a: 'Yes. Participants receive certificates of participation, achievement, and other forms of recognition.' },
		]
	},
	{
		i: 'awards', n: 'Awards', qs: [
			{ q: 'Are there awards for schools?', a: 'Yes. Schools may also receive recognition based on participation and championship performance.' },
			{ q: 'What can my child win?', a: 'Every participant plays for more than the championship title. Awards include the Championship Trophy, Medals and Awards, Certificates of Participation and Achievement, TEAMUP Excellence Awards, Leadership Recognition Awards, Innovation and Creativity Awards, Special Merit Awards, and School Recognition Awards.' },
		]
	},
	{
		i: 'parents', n: 'Parents & Schools', qs: [
			{ q: 'How can parents support participants?', a: 'Parents can monitor progress through the Development Passport, encourage participation, and support learning activities throughout the programme.' },
			{ q: 'How will parents benefit?', a: 'You see the growth, not just hear about it. Parents get full access to their child\'s Development Passport, a live record of every skill, badge, and certificate earned from the first coaching session to the Grand Finale. Meanwhile your child builds confidence, discipline, and leadership through structured coaching and mentorship, all covered by one registration fee.' },
			{ q: 'How will progress be tracked?', a: 'Progress is tracked through the participant\'s Taskify Development Passport, which records attendance, milestones, badges, assessment results, and other achievements.' },
			{ q: 'Why should my school partner with BEEE?', a: 'In addition to enriching your school\'s co-curricular programme with a unique blend of learning, leadership development, and competitive chess, participating schools enjoy partnership benefits, recognition opportunities, and dedicated support throughout the championship.' },
			{ q: 'What is expected of participating schools?', a: 'Participating schools are expected to support student registration, encourage engagement with the TEAMUP programme, facilitate participation in competition stages, and celebrate student achievements throughout the championship.' },
		]
	},
];

export function filterBySearch(cs: FaqC[], q: string): FaqC[] {
	if (!q.trim()) return cs;
	const lq = q.toLowerCase();
	return cs.map(c => ({
		...c,
		qs: c.qs.filter(i => i.q.toLowerCase().includes(lq) || i.a.toLowerCase().includes(lq))
	})).filter(c => c.qs.length > 0);
}

export function filterByCategory(cs: FaqC[], id: string): FaqC[] {
	if (id === 'all') return cs;
	return cs.filter(c => c.i === id);
}
