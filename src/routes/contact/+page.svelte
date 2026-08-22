<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<div class="contact">
	<div class="container contact-inner">
		<h1 class="contact-title">Contact BEEE</h1>
		<p class="contact-updated">We reply Monday to Friday, 9:00-17:00 West Africa Time (GMT+1).</p>

		<section class="contact-section">
			<h2>Chat with us</h2>
			<p>The quickest way to reach us is email. We answer every message, usually within one working day.</p>
			<ul>
				<li><a href="mailto:info@beeeproject.com">info@beeeproject.com</a> - general, registration and payment questions</li>
				<li>Phone: +234 902 682 4439</li>
				<li>WhatsApp: +234 902 682 4439</li>
			</ul>
		</section>

		<section class="contact-section">
			<h2>Who to contact</h2>
			<ul>
				<li><strong>Registration and payments:</strong> include the participant's name and any payment reference so we can find the record.</li>
				<li><strong>Partnerships:</strong> share your organisation's name, how you would like to help, and the region you are based in.</li>
				<li><strong>Press and media:</strong> tell us the outlet and the deadline.</li>
			</ul>
		</section>

		<section class="contact-section">
			<h2>Where to find us</h2>
			<ul>
				<li>Instagram: <a href="https://www.instagram.com/thebeeeproject" rel="me">@thebeeeproject</a></li>
				<li>Facebook: <a href="https://www.facebook.com/thebeeeproject" rel="me">@thebeeeproject</a></li>
				<li>YouTube: <a href="https://www.youtube.com/@thebeeeproject" rel="me">@thebeeeproject</a></li>
				<li>X (Twitter): <a href="https://x.com/beeeproject" rel="me">@beeeproject</a></li>
			</ul>
		</section>

		<section class="contact-section">
			<h2>Before you write</h2>
			<p>Most registration questions are answered in our <a href="/faq">FAQ</a>. The fees, age groups, timeline and venues are all listed there.</p>
		</section>

		<div class="contact-cta">
			<Button href="/register">Register your child</Button>
		</div>
	</div>
</div>

<style>
	.contact {
		background: var(--canvas);
		padding: 120px 0 80px;
		min-height: 100dvh;
	}
	.contact-inner {
		max-width: 760px;
	}
	.contact-title {
		font-family: var(--font-hero);
		font-size: clamp(2.2rem, 5vw, 3.5rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--ink);
		margin: 0;
	}
	.contact-updated {
		color: var(--body);
		margin: 8px 0 40px;
		font-size: 15px;
	}
	.contact-section {
		margin-bottom: 36px;
	}
	.contact-section h2 {
		font-family: var(--font-hero);
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--ink);
		margin: 0 0 12px;
	}
	.contact-section p,
	.contact-section li {
		font-size: 16px;
		line-height: 1.7;
		color: var(--body);
		margin: 0 0 12px;
	}
	.contact-section a {
		color: var(--primary);
		text-underline-offset: 3px;
	}
	.contact-section ul,
	.contact-section ol {
		padding-left: 20px;
	}
	.contact-cta {
		margin-top: 16px;
	}
</style>
