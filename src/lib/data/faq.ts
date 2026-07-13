export type FaqQ = { q: string; a: string };
export type FaqC = { i: string; n: string; qs: FaqQ[] };

export const cs: FaqC[] = [
	{
		i: 'general', n: 'General', qs: [
			{ q: 'What is the BEEE Spectacular Chess Championship?', a: 'The BEEE Spectacular Chess Championship is a unique championship experience that combines competitive chess with the T.E.A.M.U.P. Development Programme, providing participants with opportunities to develop strategic thinking, leadership, creativity, innovation, and personal growth.' },
			{ q: 'Is this only a chess tournament?', a: 'No. The championship includes a structured development programme that extends beyond competition and focuses on building well-rounded young thinkers, leaders, and problem-solvers.' },
			{ q: 'Who can participate?', a: 'Primary and secondary school students who meet the eligibility requirements published by the championship organisers.' },
			{ q: 'Is prior chess experience required?', a: 'No. Participants with varying levels of chess experience may register. Competition categories and developmental activities are designed to support different skill levels.' },
			{ q: 'What are the age categories?', a: 'The championship is open to chess players aged 10–14, grouped into two categories: ages 10–11 and ages 12–14.' },
			{ q: 'Where is the championship held?', a: 'Abuja.' },
			{ q: 'When does the programme run?', a: 'Summer through the Championship Grand Finale on October 10.' },
			{ q: 'What are the competition dates?', a: 'Specific competition dates and stages are published on the official championship website and communicated to registered participants.' },
		]
	},
	{
		i: 'registration', n: 'Registration', qs: [
			{ q: 'How do I register?', a: 'Participants may complete registration through the official championship registration portal.' },
			{ q: 'Can a school register multiple participants?', a: 'Yes. Schools may register eligible students in accordance with the championship registration guidelines.' },
			{ q: 'Can parents register their children directly?', a: 'Yes, where direct registration has been provided by the organisers.' },
			{ q: 'Is there a registration deadline?', a: 'Yes. Registration deadlines will be published on the official championship website and communication channels.' },
			{ q: 'Is there a registration fee?', a: 'Any applicable registration fee will be clearly stated during the registration process.' },
			{ q: 'Can participation fees be sponsored?', a: 'Yes. Participation fees may be sponsored by parents, guardians, schools, or other interested sponsors.' },
		]
	},
	{
		i: 'teamup', n: 'T.E.A.M.U.P.', qs: [
			{ q: 'What is T.E.A.M.U.P.?', a: 'T.E.A.M.U.P. stands for Technology, Enterprise, Art, Mentorship, and Upskill. It is the developmental component of the championship designed to help participants grow beyond the chessboard.' },
			{ q: 'When does T.E.A.M.U.P. begin?', a: 'Participants gain access to the programme immediately after successful registration.' },
			{ q: 'What activities are included?', a: 'Activities may include mentored learning, chess training, leadership exercises, innovation challenges, collaborative projects, personal development activities, project-based challenges, and assessments and milestone tracking.' },
			{ q: 'Is participation in T.E.A.M.U.P. compulsory?', a: 'Participation is strongly encouraged as it forms an important part of the championship experience.' },
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
			{ q: 'How does the championship work?', a: 'Participants progress through various stages of development and competition leading to the Championship Grand Finale.' },
			{ q: 'What happens after registration?', a: 'Participants begin the T.E.A.M.U.P. Development Programme and prepare for championship activities and competition stages.' },
			{ q: 'How are winners determined?', a: 'Winners are determined according to the official competition rules and scoring procedures.' },
			{ q: 'Are certificates issued?', a: 'Yes. Eligible participants may receive certificates of participation, achievement, and other forms of recognition.' },
		]
	},
	{
		i: 'awards', n: 'Awards', qs: [
			{ q: 'What are the prizes?', a: 'Prizes may include championship trophies, medals, certificates, achievement awards, T.E.A.M.U.P. Excellence Awards, leadership recognition awards, innovation awards, and special merit awards.' },
			{ q: 'Are there awards for schools?', a: 'Yes. Schools may also receive recognition based on participation and championship performance.' },
		]
	},
	{
		i: 'parents', n: 'Parents & Schools', qs: [
			{ q: 'How can parents support participants?', a: 'Parents can monitor progress through the Development Passport, encourage participation, and support learning activities throughout the programme.' },
			{ q: 'How will schools benefit?', a: 'Schools gain access to a platform that promotes strategic thinking, leadership development, innovation, healthy competition, and student achievement.' },
			{ q: 'How will progress be tracked?', a: 'Progress is tracked through the participant\'s T.E.A.M.U.P. Development Passport, which records attendance, milestones, badges, assessment results, and other achievements.' },
			{ q: 'Why should my school partner with BEEE?', a: 'Affiliate schools may complement their summer activities with the T.E.A.M.U.P. programme and benefit from its developmental opportunities.' },
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
