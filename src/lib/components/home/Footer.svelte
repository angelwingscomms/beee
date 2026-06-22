<script>
	let { } = $props();
</script>

<footer class="site-footer">
	<div class="container">
		<div class="footer-grid">
			<div class="footer-brand">
				<div class="brand-lockup">
					<span class="spike-mark" style="color: var(--primary)"></span>
					<span class="brand-name">BEEE</span>
				</div>
				<p>
					Building Exceptional Experiences Through Education. The BEEE
					T.E.A.M.U.P. programme develops young leaders through chess,
					technology, and mentorship.
				</p>
			</div>
			<div class="footer-col">
				<strong>Programme</strong>
				<a href="#about">About</a>
				<a href="#teamp">T.E.A.M.U.P. Pillars</a>
				<a href="#journey">Journey</a>
				<a href="/register">Register</a>
				<a href="#faq">FAQ</a>
			</div>
			<div class="footer-col">
				<strong>Resources</strong>
				<a href="#benefits">Benefits</a>
				<a href="#parents">Parent Dashboard</a>
				<a href="#awards">Awards</a>
				<a href="/register">Digital Passport</a>
			</div>
			<div class="footer-col">
				<strong>Contact</strong>
				<span>Abuja, Nigeria</span>
				<span>hello@beee.ng</span>
				<span>+234 800 BEEE</span>
				<span>Instagram</span>
				<span>YouTube</span>
			</div>
		</div>
		<div class="footer-bottom">
			&copy; BEEE Spectacular Chess Championship Abuja 2026
		</div>
	</div>
</footer>

<style>
	.site-footer {
		background: var(--surface-dark);
		padding: 72px 0 28px;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1.4fr repeat(3, 1fr);
		gap: 40px;
	}

	.brand-lockup {
		display: inline-flex;
		align-items: center;
		gap: 14px;
		margin-bottom: 20px;
	}

	.brand-name {
		color: var(--on-dark);
		font-size: 20px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.footer-brand p {
		color: var(--on-dark-soft);
		font-size: 14px;
		line-height: 1.65;
		margin: 0;
		max-width: 38ch;
	}

	.footer-col strong {
		display: block;
		color: var(--on-dark);
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin-bottom: 20px;
	}

	.footer-col a,
	.footer-col span {
		display: block;
		margin-top: 12px;
		color: var(--on-dark-soft);
		font-size: 14px;
		line-height: 1.5;
		text-decoration: none;
		transition: color 200ms ease;
	}

	.footer-col a:first-of-type,
	.footer-col span:first-of-type {
		margin-top: 0;
	}

	.footer-col a:hover {
		color: var(--primary);
	}

	.footer-bottom {
		margin-top: 56px;
		padding-top: 24px;
		border-top: 1px solid var(--surface-dark-elevated);
		color: var(--on-dark-soft);
		font-size: 13px;
		line-height: 1.5;
	}

	@media (max-width: 900px) {
		.footer-grid {
			grid-template-columns: 1fr 1fr;
			gap: 36px;
		}
		.footer-brand {
			grid-column: 1 / -1;
		}
		.footer-brand p {
			max-width: none;
		}
	}

	@media (max-width: 540px) {
		.site-footer {
			padding: 52px 0 24px;
		}
		.footer-grid {
			grid-template-columns: 1fr;
			gap: 32px;
		}
		.footer-bottom {
			margin-top: 40px;
		}
	}
</style>
