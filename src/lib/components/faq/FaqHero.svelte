<script lang="ts">
	import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="faq-hero" use:motionFadeUp>
	<div class="container">
		<p class="eyebrow">FAQ</p>
		<h1 class="display-lg">Frequently Asked Questions</h1>
		<p class="faq-subtitle">Everything you need to know about the BEEE Spectacular Chess Championship Abuja 2026 and the T.E.A.M.U.P. Development Programme.</p>
	</div>
</section>

<style>
	.faq-hero {
		padding: 96px 0 48px;
		background: var(--canvas);
	}

	.container {
		width: min(1200px, calc(100% - 48px));
		margin: 0 auto;
	}

	.faq-subtitle {
		max-width: 620px;
		margin: 16px 0 0;
		color: var(--body);
		font-size: 18px;
		line-height: 1.55;
	}

	@media (max-width: 767px) {
		.faq-hero {
			padding: 64px 0 32px;
		}

		.faq-subtitle {
			font-size: 16px;
		}
	}
</style>
