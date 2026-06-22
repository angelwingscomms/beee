<footer class="site-footer">
	<div class="container">
		<div class="footer-grid">
			<div class="footer-brand">
				<div class="brand-lockup" style="margin-bottom: 16px">
					<span class="spike-mark" style="color: var(--primary)"></span>
					<span style="color: var(--on-dark); font-weight: 600; font-size: 18px">BEEE</span>
				</div>
				<p style="color: var(--on-dark-soft); font-size: 14px; line-height: 1.55; margin: 0">
					Building Exceptional Experiences Through Education. The BEEE T.E.A.M.U.P. programme develops young leaders through chess, technology, and mentorship.
				</p>
			</div>
			<div>
				<strong>Programme</strong>
				<a href="#about">About</a>
				<a href="#teamp">T.E.A.M.U.P. Pillars</a>
				<a href="#journey">Journey</a>
				<a href="/register">Register</a>
				<a href="#faq">FAQ</a>
			</div>
			<div>
				<strong>Resources</strong>
				<a href="#benefits">Benefits</a>
				<a href="#parents">Parent Dashboard</a>
				<a href="#awards">Awards</a>
				<a href="/register">Digital Passport</a>
			</div>
			<div>
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
		padding: 64px 0 32px;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1.4fr repeat(3, 1fr);
		gap: 40px;
	}

	.site-footer strong {
		display: block;
		color: var(--on-dark);
		font-size: 14px;
		font-weight: 500;
		margin-top: 0;
		margin-bottom: 16px;
	}

	.site-footer a,
	.site-footer span {
		display: block;
		margin-top: 10px;
		color: var(--on-dark-soft);
		font-size: 14px;
		text-decoration: none;
		transition: color 160ms ease;
	}

	.site-footer a:hover {
		color: var(--primary);
	}

	.footer-brand p {
		color: var(--on-dark-soft);
		font-size: 14px;
		line-height: 1.55;
		margin: 0;
	}

	.footer-bottom {
		margin-top: 48px;
		padding-top: 24px;
		border-top: 1px solid var(--surface-dark-elevated);
		color: var(--on-dark-soft);
		font-size: 13px;
	}

	@media (max-width: 767px) {
		.footer-grid {
			grid-template-columns: 1fr 1fr;
			gap: 32px;
		}
		.footer-brand {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 480px) {
		.footer-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
