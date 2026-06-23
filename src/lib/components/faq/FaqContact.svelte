<script lang="ts">
	import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="faq-contact" use:motionFadeUp>
	<div class="container">
		<div class="contact-card">
			<h2 class="display-sm">Still have questions?</h2>
			<p class="contact-text">We are happy to help. Reach out to the championship organisers.</p>
			<div class="contact-links">
				<a href="mailto:info@beeeproject.com" class="contact-link">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
						<path d="M2 4l6 4 6-4M2 4v8a1 1 0 001 1h10a1 1 0 001-1V4M2 4a1 1 0 011-1h10a1 1 0 011 1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					info@beeeproject.com
				</a>
				<a href="tel:+2348020920872" class="contact-link">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
						<path d="M14.5 11.5v2a1.33 1.33 0 01-1.46 1.33 13.2 13.2 0 01-5.75-2.04 13 13 0 01-4-4A13.2 13.2 0 011.17 3 1.33 1.33 0 012.5 1.5h2a1.33 1.33 0 011.33 1.15 8.54 8.54 0 00.47 1.9 1.33 1.33 0 01-.3 1.4L5.3 7a10.67 10.67 0 004 4l1.05-1.05a1.33 1.33 0 011.4-.3 8.54 8.54 0 001.9.47A1.33 1.33 0 0114.5 11.5z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					+234 802 092 0872
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.faq-contact {
		padding: 48px 0 96px;
		background: var(--canvas);
	}

	.container {
		width: min(1200px, calc(100% - 48px));
		margin: 0 auto;
	}

	.contact-card {
		border-radius: 12px;
		background: var(--surface-soft);
		padding: 48px;
		text-align: center;
	}

	.contact-text {
		max-width: 480px;
		margin: 12px auto 0;
		color: var(--body);
		font-size: 16px;
		line-height: 1.55;
	}

	.contact-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 16px 24px;
		margin-top: 28px;
	}

	.contact-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		border-radius: 8px;
		background: var(--canvas);
		color: var(--ink);
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
		transition: background 160ms ease, color 160ms ease;
	}

	.contact-link:hover {
		background: var(--primary);
		color: var(--on-primary);
	}

	@media (max-width: 767px) {
		.faq-contact {
			padding: 32px 0 64px;
		}

		.contact-card {
			padding: 32px 24px;
		}
	}
</style>
