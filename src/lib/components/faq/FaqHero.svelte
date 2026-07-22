<script lang="ts">
	import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="faq-hero" use:motionFadeUp>
	<div class="container">
		<p class="eyebrow">FAQ</p>
		<h1 class="display-lg">Frequently Asked Questions</h1>
		<p class="faq-subtitle">Everything you need to know about the BEEE Spectacular Chess Championship Abuja 2026 and the TEAMUP™ (Technology, Enterprise, Art, Mentorship, Upskill) Development Programme.</p>
	</div>
</section>

<style>
	.faq-hero {
		position: relative;
		padding: 96px 0 0;
		background: var(--canvas);
		overflow: hidden;
	}

	.faq-hero::before {
		content: '';
		position: absolute;
		top: -120px;
		left: 50%;
		width: 900px;
		height: 500px;
		transform: translateX(-50%);
		background: radial-gradient(closest-side, color-mix(in srgb, var(--primary) 4%, transparent), transparent);
		pointer-events: none;
	}

	.container {
		position: relative;
		width: min(1200px, calc(100% - 48px));
		margin: 0 auto;
	}

	.faq-subtitle {
		max-width: 56ch;
		margin: 16px 0 0;
		color: var(--body-strong);
		font-size: 18px;
		line-height: 1.55;
	}

	@media (--sm-down) {
		.faq-hero {
			padding: 64px 0 0;
		}

		.faq-subtitle {
			font-size: 16px;
		}
	}
</style>
