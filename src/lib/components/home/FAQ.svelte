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
					>
						{faq.q}
						<span class="faq-arrow">↓</span>
					</button>
					{#if open_index === i}
						<div class="faq-answer" class:open={open_index === i}>
							<p>{faq.a}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.faq-item {
		border: 1px solid var(--hairline);
		border-radius: 12px;
		overflow: hidden;
	}

	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 20px 24px;
		background: var(--canvas);
		border: none;
		font-size: 16px;
		font-weight: 500;
		color: var(--ink);
		text-align: left;
		cursor: pointer;
		transition: background 160ms ease;
	}

	.faq-question:hover {
		background: var(--surface-soft);
	}

	.faq-arrow {
		transition: transform 200ms ease;
		font-size: 14px;
		color: var(--muted);
	}

	.is-open .faq-arrow {
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0 24px;
		background: var(--surface-soft);
		animation: slide-down 250ms cubic-bezier(.34,1.56,.64,1) both;
	}

	.faq-answer p {
		margin: 0;
		padding: 0 0 20px;
		font-size: 15px;
		line-height: 1.55;
		color: var(--body);
	}

	@keyframes slide-down {
		from {
			opacity: 0;
			max-height: 0;
			padding-top: 0;
		}
		to {
			opacity: 1;
			max-height: 300px;
			padding-top: 20px;
		}
	}
</style>
