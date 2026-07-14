export type FaqQ = { q: string; a: string };
export type FaqC = { i: string; n: string; qs: FaqQ[] };

export const cs: FaqC[] = [
	{
		i: 'general', n: 'General', qs: [
			{ q: 'What is the BEEE Spectacular Chess Championship?', a: 'The BEEE Spectacular Chess Championship is a unique championship experience that combines competitive chess with the T.E.A.M.U.P. Development Programme, providing participants with opportunities to develop strategic thinking, leadership, creativity, innovation, and personal growth.' },
			{ q: 'Is this only a chess tournament?', a: 'No. The championship includes a structured development programme that extends beyond competition and focuses on building well-rounded young thinkers, leaders, and problem-solvers.' },
			{ q: 'Who can participate?', a: 'Children aged 10–14 years.' },
			{ q: 'Is prior chess experience required?', a: 'No. Participants with varying levels of chess experience may register. Competition categories and developmental activities are designed to support different skill levels.' },
			{ q: 'What are the age categories?', a: 'The championship is open to chess players aged 10–14, grouped into two categories: ages 10–11 and ages 12–14.' },
			{ q: 'Where is the championship held?', a: 'National Stadium Abuja.' },
			{ q: 'When does the programme run?', a: 'Programme dates are displayed on the homepage. Online coaching begins July 28, 2026, with live preliminary competitions in September and the Championship Grand Finale in October 2026.' },
			{ q: 'What are the competition dates?', a: 'Competition dates are displayed on the homepage. Online coaching begins July 28, 2026, with preliminary rounds in September and the Grand Finale in October.' },
			{ q: 'What should participants bring to the championship?', a: 'Nothing. All equipment is provided.' },
		]
	},
	{
		i: 'registration', n: 'Registration', qs: [
			{ q: 'How do I register?', a: 'Complete registration through the official championship registration portal at /register.' },
			{ q: 'Can a school register multiple participants?', a: 'Yes. Schools may register eligible students in accordance with the championship registration guidelines.' },
			{ q: 'Can parents register their children directly?', a: 'Yes, where direct registration has been provided by the organisers.' },
			{ q: 'Is there a registration deadline?', a: 'Yes. Registration deadlines will be published on the official championship website and communication channels.' },
			{ q: 'Is there a registration fee?', a: 'Yes. The registration fee is ₦15,000. Participants with a partner or sponsor code pay ₦13,500.' },
			{ q: 'What is the refund policy?', a: 'No refunds.' },
		]
	},
	{
		i: 'teamup', n: 'T.E.A.M.U.P.', qs: [
			{ q: 'What is T.E.A.M.U.P.?', a: 'T.E.A.M.U.P. stands for Technology, Enterprise, Art, Mentorship, and Upskill. It is the developmental component of the championship designed to help participants grow beyond the chessboard.' },
			{ q: 'When does T.E.A.M.U.P. begin?', a: 'Participants gain access to the programme immediately after successful registration.' },
			{ q: 'What activities are included?', a: 'Activities may include mentored learning, chess training, leadership exercises, innovation challenges, collaborative projects, personal development activities, project-based challenges, and assessments and milestone tracking.' },
			{ q: 'Is participation in T.E.A.M.U.P. compulsory?', a: 'No, but it is strongly encouraged as it forms an important part of the championship experience.' },
		]
	},
	{
		i: 'passport', n: 'Passport', qs: [
			{ q: 'What is the T.E.A.M.U.P. Development Passport?', a: 'The Development Passport is a digital record of a participant\'s developmental journey throughout the championship cycle.' },
			{ q: 'What information is recorded in the passport?', a: 'The passport may contain attendance records, developmental milestones, achievement badges, skills acquired, assessment results, project participation, leadership activities, mentorship engagement, certificates earned, and other notable accomplishments.' },
			{ q: 'Can parents access the passport?', a: 'Yes. Parents and guardians will have access to their child\'s Development Passport and progress records.' },
			{ q: 'Why is the passport important?', a: 'It provides a documented record of growth, achievements, participation, and development throughout the programme.' },
			{ q: 'How do registered players access the programme materials?', a: 'Registered players are issued a Passport code with access to the T.E.A.M.U.P. Development materials.' },
		]
	},
	{
		i: 'competition', n: 'Competition', qs: [
			{ q: 'How does the championship work?', a: 'The championship follows six stages: (1) Registration — participants gain access to E4 Chess Coach, T.E.A.M.U.P., and the Taskify Development Passport. (2) Learn — participants train with AI-powered chess coaching, leadership and life-skills development, interactive challenges, and creativity workshops. (3) Compete — live preliminary chess championship rounds held in September 2026. (4) Evolve — qualifying participants advance through elimination tournaments. (5) Qualify — elite qualifiers train for finalist positions. (6) Grand Finale — finalists participate in the immersive championship experience.' },
			{ q: 'What happens after registration?', a: 'Participants begin the T.E.A.M.U.P. Development Programme and prepare for championship activities and competition stages.' },
			{ q: 'Are certificates issued?', a: 'Yes. Participants receive certificates of participation, achievement, and other forms of recognition.' },
		]
	},
	{
		i: 'awards', n: 'Awards', qs: [
			{ q: 'Are there awards for schools?', a: 'Yes. Schools may also receive recognition based on participation and championship performance.' },
		]
	},
	{
		i: 'parents', n: 'Parents & Schools', qs: [
			{ q: 'How can parents support participants?', a: 'Parents can monitor progress through the Development Passport, encourage participation, and support learning activities throughout the programme.' },
			{ q: 'How will schools benefit?', a: 'Schools gain access to a platform that promotes strategic thinking, leadership development, innovation, healthy competition, and student achievement.' },
			{ q: 'How will progress be tracked?', a: 'Progress is tracked through the participant\'s T.E.A.M.U.P. Development Passport, which records attendance, milestones, badges, assessment results, and other achievements.' },
			{ q: 'Why should my school partner with BEEE?', a: 'In addition to enhancing your school\'s summer holiday programme with a unique blend of learning, leadership development, and competitive chess, participating schools enjoy partnership benefits, recognition opportunities, and dedicated support throughout the championship. Schools interested in becoming participating institutions are encouraged to contact the Championship Coordination Team for full partnership details.' },
			{ q: 'What is expected of participating schools?', a: 'Participating schools are expected to support student registration, encourage engagement with the T.E.A.M.U.P. programme, facilitate participation in competition stages, and celebrate student achievements throughout the championship.' },
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
