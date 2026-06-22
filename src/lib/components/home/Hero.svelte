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
			<div class="hero-right">
				<div class="hero-artifact-card">
					<div class="artifact-topline">
						<span><span class="status-dot"></span> Live Arena</span>
						<span>BEEE Championship</span>
					</div>
					<div class="artifact-board-area">
						<div class="board-perspective">
							<div class="board-3d"></div>
						</div>
						<div class="floating-piece" style="top: 18%; left: 12%">
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="var(--primary)" opacity="0.9"/><path d="M16 6l3 6 6 1-4.5 4.5L22 24l-6-3-6 3 1.5-6.5L7 13l6-1z" fill="#fff" opacity="0.85"/></svg>
						</div>
						<div class="floating-piece" style="bottom: 22%; right: 10%">
							<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="var(--accent-amber)" opacity="0.9"/><path d="M16 8l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" fill="#fff" opacity="0.85"/></svg>
						</div>
					</div>
					<div class="artifact-footer">
						<span>Players Online: 24</span>
						<span>Next Round: 00:18:42</span>
					</div>
				</div>
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
	.hero-right {
		position: relative;
	}
	.hero-artifact-card {
		position: relative;
		overflow: hidden;
		border-radius: 16px;
		background: var(--surface-dark);
		color: var(--on-dark);
		box-shadow: 0 24px 64px rgba(20, 20, 19, 0.18);
	}
	.hero-artifact-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(135deg, rgba(242, 120, 48, 0.15), transparent 40%),
			radial-gradient(circle at 80% 10%, rgba(255, 178, 0, 0.12), transparent 40%),
			linear-gradient(180deg, rgba(250, 249, 245, 0.04), transparent 50%);
		pointer-events: none;
		z-index: 1;
	}
	.artifact-topline {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 20px 24px;
		border-bottom: 1px solid rgba(250, 249, 245, 0.08);
		font-size: 13px;
		font-weight: 500;
		color: var(--on-dark-soft);
	}
	.artifact-board-area {
		position: relative;
		z-index: 2;
		display: grid;
		min-height: 340px;
		place-items: center;
		padding: 24px;
		perspective: 800px;
	}
	.board-perspective {
		width: min(80%, 320px);
		aspect-ratio: 1;
		transform: rotateX(55deg) rotateZ(-35deg);
		transform-style: preserve-3d;
	}
	.board-3d {
		position: relative;
		width: 100%;
		height: 100%;
		border: 1px solid rgba(250, 249, 245, 0.12);
		border-radius: 4px;
		overflow: hidden;
		background:
			linear-gradient(90deg, rgba(250, 249, 245, 0.06) 50%, rgba(242, 120, 48, 0.12) 50%),
			linear-gradient(rgba(250, 249, 245, 0.06) 50%, rgba(242, 120, 48, 0.12) 50%);
		background-size: 25% 25%;
	}
	.board-3d::after {
		content: '';
		position: absolute;
		inset: 12%;
		border: 1px solid rgba(255, 178, 0, 0.25);
		pointer-events: none;
	}
	.floating-piece {
		position: absolute;
		z-index: 3;
		filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
		animation: hero-float 5s ease-in-out infinite;
	}
	.floating-piece:nth-child(2) {
		animation-delay: -2.5s;
	}
	@keyframes hero-float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}
	.artifact-footer {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 24px;
		border-top: 1px solid rgba(250, 249, 245, 0.08);
		font-size: 12px;
		color: var(--on-dark-soft);
	}
	@media (max-width: 900px) {
		.hero-split {
			grid-template-columns: 1fr;
			gap: 32px;
		}
		.hero-right {
			order: -1;
		}
		.artifact-board-area {
			min-height: 240px;
		}
		.hero-meta {
			flex-wrap: wrap;
		}
		.hero-meta span + span::before {
			display: none;
		}
	}
</style>
