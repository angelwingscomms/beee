<section class="hero-band hero-section">
	<div class="container">
		<div class="hero-split">
			<div class="hero-left">
				<p class="eyebrow">BEEE Spectacular Chess Championship Abuja 2026</p>
				<h1 class="display-xl hero-title">Where Young Minds<br>Compete.<br>Develop.<br>Excel.</h1>
				<p class="lead hero-subtitle">More than a championship. A transformational journey in leadership, strategy, innovation and personal growth.</p>
				<div class="hero-actions hero-actions-row">
					<a href="/register" class="button-primary cta-entrance">Register Now</a>
					<a href="#teamp" class="button-secondary">Explore T.E.A.M.U.P.</a>
				</div>
				<div class="hero-meta">
					<strong>October 2026 Grand Finale</strong>
					<span>Abuja</span>
					<span>Open Registration</span>
				</div>
				<p class="mystery-teaser">&mdash; Featuring a Grand Finale unlike any other school chess championship.</p>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-split {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: center;
	}
	.hero-left {
		display: flex;
		flex-direction: column;
	}
	.hero-meta {
		display: flex;
		gap: 16px;
		align-items: center;
		font-size: 14px;
		margin-top: 24px;
	}
	.hero-meta strong {
		font-weight: 600;
		color: var(--ink);
	}
	.hero-meta span {
		color: var(--muted);
	}
	.hero-meta span + span::before {
		content: '·';
		margin-right: 16px;
		color: var(--hairline);
	}
	.mystery-teaser {
		margin-top: 32px;
		color: var(--muted);
		font-size: 13px;
		opacity: 0.7;
	}
	@media (max-width: 900px) {
		.hero-meta {
			flex-wrap: wrap;
		}
		.hero-meta span + span::before {
			display: none;
		}
	}
</style>
