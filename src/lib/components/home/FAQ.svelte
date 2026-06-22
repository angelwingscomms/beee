<script lang="ts">
	let open_index = $state<number | null>(null);

	const faqs = [
		{
			q: 'Who can participate?',
			a: 'The BEEE programme is open to children and teenagers aged 7–17. Participants are grouped into Junior (7–10), Intermediate (11–13), and Senior (14–17) tiers with age-appropriate curriculum and chess training.',
		},
		{
			q: 'Do I need prior chess experience?',
			a: 'Not at all. We welcome every level from complete beginner to experienced player. Our coaches assess each participant and provide tailored instruction that meets them where they are.',
		},
		{
			q: 'What is T.E.A.M.U.P.?',
			a: 'T.E.A.M.U.P. is our six-pillar developmental framework — Technology, Enterprise, Art, Mentorship, Upskilling, and Personal Development. It runs alongside chess training to build well-rounded future leaders.',
		},
		{
			q: 'How is progress tracked?',
			a: 'Every participant receives a Development Passport that records attendance, achievements, badges earned, mentorship progress, and certificates. Parents can view everything in real time through the parent dashboard.',
		},
		{
			q: 'What is the Development Passport?',
			a: 'A digital record that follows each participant through their entire BEEE journey. It captures badges, stamps, certificates, leadership activities, and milestone achievements across all six T.E.A.M.U.P. pillars.',
		},
		{
			q: 'Can parents monitor progress?',
			a: 'Yes. Parents get secure access to a live dashboard showing their child\'s progress, attendance, badges, rank, and detailed reports. You\'ll see every achievement as it happens.',
		},
		{
			q: 'What happens after registration?',
			a: 'After registration you\'ll receive a welcome packet with the full programme calendar, your child\'s tier assignment, and instructions for accessing the T.E.A.M.U.P. portal and Development Passport.',
		},
		{
			q: 'How do I register?',
			a: 'Click the "Register Now" button on this page, fill out the participant details form, and our team will follow up within 48 hours with next steps and payment options.',
		},
	];
</script>

<section class="section-band" id="faq">
	<div class="container" style="max-width: 720px">
		<h2 class="display-lg" style="margin: 0 0 48px; text-align: center">Frequently Asked Questions</h2>
		<div class="faq-list">
			{#each faqs as faq, i}
				<div class="faq-item" class:is-open={open_index === i}>
					<button
						class="faq-question"
						onclick={() => open_index = open_index === i ? null : i}
						aria-expanded={open_index === i}
					>
						<span>{faq.q}</span>
						<svg class="faq-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
					<div class="faq-answer-wrap" class:open={open_index === i}>
						<div class="faq-answer">
							<p>{faq.a}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.faq-item {
		border: 1px solid var(--hairline);
		border-radius: 12px;
		background: var(--surface-card);
		overflow: hidden;
		transition: border-color 200ms ease;
	}

	.faq-item.is-open {
		border-color: var(--primary);
	}

	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		width: 100%;
		padding: 20px 24px;
		background: transparent;
		border: none;
		font-size: 16px;
		font-weight: 500;
		color: var(--ink);
		text-align: left;
		cursor: pointer;
		transition: background 160ms ease;
		-webkit-tap-highlight-color: transparent;
	}

	.faq-question:hover {
		background: var(--surface-soft);
	}

	.faq-question:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: -2px;
		border-radius: 12px;
	}

	.faq-arrow {
		flex-shrink: 0;
		color: var(--muted);
		transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), color 200ms ease;
	}

	.is-open .faq-arrow {
		transform: rotate(180deg);
		color: var(--primary);
	}

	.faq-answer-wrap {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.faq-answer-wrap.open {
		grid-template-rows: 1fr;
	}

	.faq-answer {
		overflow: hidden;
		min-height: 0;
	}

	.faq-answer p {
		margin: 0;
		padding: 0 24px 20px;
		font-size: 15px;
		line-height: 1.6;
		color: var(--body);
	}
</style>
