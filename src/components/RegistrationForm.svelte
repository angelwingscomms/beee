<script lang="ts">
	import ConfirmationModal from './ConfirmationModal.svelte';
	import PhoneInput from '$lib/components/PhoneInput.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { dev } from '$app/environment';
	import { REG_AMOUNT, DEV_REG_FEE_NAIRA, D_FREE_OPEN, D_ENTRY_CLOSE, D_LIVE_STAGE, D_FINALE } from '$lib/constants';

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let phone = $state('+234');
	let password = $state('');
	let showConfirmation = $state(false);
	let isProcessing = $state(false);
	let apiError = $state('');
	let registrationId = $state('');

	let firstNameErr = $state('');
	let lastNameErr = $state('');
	let emailErr = $state('');
	let phoneErr = $state('');
	let passwordErr = $state('');

	const AMOUNT = dev ? DEV_REG_FEE_NAIRA : REG_AMOUNT;

	function clearErrors() {
		firstNameErr = '';
		lastNameErr = '';
		emailErr = '';
		phoneErr = '';
		passwordErr = '';
	}

	function validateForm(): boolean {
		clearErrors();
		apiError = '';
		let valid = true;

		if (!firstName.trim()) {
			firstNameErr = 'First name is required';
			valid = false;
		}
		if (!lastName.trim()) {
			lastNameErr = 'Last name is required';
			valid = false;
		}
		if (!email.trim()) {
			emailErr = 'Email is required';
			valid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			emailErr = 'Enter a valid email address';
			valid = false;
		}
		if (!phone.trim() || phone.trim() === '+234') {
			phoneErr = 'Phone is required';
			valid = false;
		}
		if (!password.trim()) {
			passwordErr = 'Password is required';
			valid = false;
		} else if (password.trim().length < 8) {
			passwordErr = 'Password must be at least 8 characters';
			valid = false;
		}

		return valid;
	}

	async function handleSubmit() {
		if (!validateForm()) {
			return;
		}
		showConfirmation = true;
	}

	async function confirmPayment() {
		isProcessing = true;
		apiError = '';
		let auth_url = '';
		console.log('[registration] confirmPayment started');

		try {
			console.log('[registration] POST /api/register-init-payment', {
				firstName, lastName, email, phone, hasPassword: !!password
			});
			const r = await fetch('/api/register-init-payment', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					firstName: firstName.trim(),
					lastName: lastName.trim(),
					email: email.trim(),
					phone: phone.trim(),
					password: password.trim()
				})
			});
			console.log('[registration] init response status:', r.status, r.statusText);

			if (!r.ok) {
				const e = await r.json().catch(() => ({}));
				console.error('[registration] init failed:', e);
				throw new Error(e.error || 'Payment initialization failed');
			}

			const d = await r.json();
			console.log('[registration] init response data:', {
				success: d.success,
				hasAccessCode: !!d.access_code,
				hasAuthUrl: !!d.authorization_url,
				registrationId: d.registrationId,
				amount: d.amount,
				discounted: d.discounted
			});
			if (!d.access_code) throw new Error('Invalid response from payment gateway');
			registrationId = d.registrationId;
			auth_url = d.authorization_url;

			console.log('[registration] loading Paystack inline SDK...');
			const PaystackPop = (await import('@paystack/inline-js')).default;
			const popup = new PaystackPop();
			console.log('[registration] Paystack popup created, resuming transaction', d.access_code);
			const fb = setTimeout(() => {
				console.warn('[registration] popup fallback timer fired -> redirect to', auth_url);
				window.location.href = auth_url;
			}, 15000);
			popup.resumeTransaction(d.access_code, {
				onLoad: () => {
					clearTimeout(fb);
					console.log('[registration] Paystack popup onLoad');
				},
				onSuccess: (tx) => {
					clearTimeout(fb);
					console.log('[registration] Paystack onSuccess', { reference: tx.reference });
					window.location.href = `/payment/callback?reference=${tx.reference}`;
				},
				onCancel: () => {
					clearTimeout(fb);
					console.log('[registration] Paystack onCancel');
					isProcessing = false;
				},
				onError: () => {
					clearTimeout(fb);
					console.error('[registration] Paystack onError -> fallback redirect');
					window.location.href = auth_url;
				}
			});
		} catch (error) {
			if (auth_url) {
				console.warn('[registration] error but auth_url present -> fallback redirect');
				window.location.href = auth_url;
			} else {
				const msg = error instanceof Error ? error.message : 'Unknown error';
				apiError = msg;
				console.error('[registration]', error);
				isProcessing = false;
			}
		}
	}

	function closeConfirmation() {
		showConfirmation = false;
	}
</script>

<main class="page-shell simple-home" aria-labelledby="event-title">
	<section class="container simple-home-grid">
		<div class="event-intro">
			<a class="brand-lockup" href="/" aria-label="BEEE TEAMUP Home" style="flex-direction:row;flex-wrap:wrap;gap:10px;align-items:flex-end">
				<span class="logo-chip" style="display:flex;flex-direction:row;align-items:flex-start">
				<img src="/logo.svg" alt="BEEE" />
				<span class="logo-tm">TM</span>
			</span>
			<span id="brand-tagline" class="text-[20px]" style="font-family:'GC Bumble',sans-serif;font-weight:700;display:block;line-height:1"><span style="color:var(--ink)">Be</span> <span style="color:var(--primary)">Everything</span> <span style="color:var(--ink)">E<img src="/tick.webp" alt="" style="display:inline-block;width:1.1em;height:auto;vertical-align:baseline;line-height:0;margin:0 -0.54em 0 0">cellent</span> <span style="color:var(--primary)">Every Day</span></span>
			</a>

			<h1 id="event-title" class="championship-title flex flex-col">
  <span class="text-[32px] font-championship font-bold mb-2">BEEE Spectacular Chess Championship</span>
  <span class="text-[20px] font-championship" style="color:white">Abuja 2026</span>
</h1>

			<p class="welcome-text">Register your player for the 2026 Championship. Coaching is underway, your child gets access the day you register.</p>

			<div class="cards-row">
				<div class="flex flex-col gap-4">
					<div class="journey-card">
						<h3 class="journey-card-title">The Championship Journey</h3>
						<div class="journey-steps">
							<div class="journey-step">
								<div class="journey-body">
									<span class="journey-date">{D_FREE_OPEN}</span>
									<span class="journey-name">Online Coaching Begins</span>
								</div>
							</div>
							<div class="journey-arrow"></div>
							<div class="journey-step">
								<div class="journey-body">
									<span class="journey-date">August&ndash;September, 2026</span>
									<span class="journey-name">TEAMUP Development</span>
								</div>
							</div>
							<div class="journey-arrow"></div>
							<div class="journey-step">
								<div class="journey-body">
									<span class="journey-date">{D_ENTRY_CLOSE}</span>
									<span class="journey-name">Entry Closes</span>
								</div>
							</div>
							<div class="journey-arrow"></div>
							<div class="journey-step">
								<div class="journey-body">
									<span class="journey-date">{D_LIVE_STAGE}</span>
									<span class="journey-name">Live Preliminaries &amp; Elite Qualifiers</span>
								</div>
							</div>
							<div class="journey-arrow"></div>
							<div class="journey-step">
								<div class="journey-body">
									<span class="journey-date">{D_FINALE}</span>
									<span class="journey-name">Championship Grand Finale</span>
								</div>
							</div>
						</div>
					</div>
					<div class="price-band simple-price flex-1">
						<span class="text-[20px] font-[500]" style="font-family:var(--font-display)">Registration fee</span>
						<strong class="!inline-flex flex-wrap items-baseline gap-x-[3px] gap-y-[7px] -mt-[9px]">₦{AMOUNT.toLocaleString()}<span class="text-[18px] font-normal">per participant</span></strong>
					</div>
				</div>
				<div class="teamup-card">
					<div class="flex items-baseline gap-x-2">
					<h3 class="teamup-heading">About BEEE TEAMUP</h3>
					<span class="relative inline-flex items-end shrink-0">
						<img src="/flower-gear.webp" alt="" class="teamup-icon" />
						<sup class="absolute top-0 -right-2.5 text-[6.5px] leading-none font-semibold" style="color:var(--primary)">TM</sup>
					</span>
				</div>
					<p class="teamup-tagline">Technology, Enterprise, Art, Mentorship, Upskill</p>
					<p class="teamup-text">BEEE TEAMUP is the championship's Development Stage where qualifying participants will be exposed to:</p>
					<ul class="teamup-list">
						<li>Advanced Chess Development</li>
						<li>Creativity &amp; Innovation</li>
						<li>Strategic Thinking and Leadership</li>
						<li>Teamwork &amp; Collaboration</li>
					</ul>
					<p class="teamup-outro">as they prepare for the Championship Grand Finale.</p>
				</div>
			</div>

			<ul class="space-y-1 text-[14px] leading-snug text-black font-registration">
				<li class="border-l-2 border-primary pl-3">Qualification slots are limited and will be allocated on a first-completed-registration basis.</li>
				<li class="border-l-2 border-primary pl-3">Registration closes once available slots are filled, places are limited.</li>
				<li class="border-l-2 border-primary pl-3">Entry into the championship officially closes {D_ENTRY_CLOSE}.</li>
				<li class="border-l-2 border-primary pl-3">Participants must be between 10 and 14 years of age.</li>
				<li class="border-l-2 border-primary pl-3">Sponsorship of participants is by parents or other interested sponsor.</li>
			</ul>

		</div>

		<form
			class="registration-form font-registration"
			novalidate
			onsubmit={(event) => {
				event.preventDefault();
				handleSubmit();
			}}
		>
			<header class="form-header">
				<h2>Register as a Participant</h2>
			</header>

			<section class="form-section space-y-1.5">
				<div class="field-grid">
					<div class="field">
						<TextInput id="firstName" label="First Name" bind:value={firstName} required wrapperClass="!bg-surface-card !border-transparent" error={firstNameErr} oninput={() => firstNameErr = ''} />
					</div>
					<div class="field">
						<TextInput id="lastName" label="Last Name" bind:value={lastName} required wrapperClass="!bg-surface-card !border-transparent" error={lastNameErr} oninput={() => lastNameErr = ''} />
					</div>
				</div>
				<div class="field">
					<TextInput id="email" label="Email Address" type="email" bind:value={email} required wrapperClass="!bg-surface-card !border-transparent" error={emailErr} oninput={() => emailErr = ''} />
				</div>
				<div class="field field-full">
				<PhoneInput
					id="phone"
					value={phone}
					placeholder="Phone number"
					theme
					onChange={(v) => { phone = v; phoneErr = ''; }}
				/>
			</div>
			<div class="field">
				<TextInput id="password" label="Password" type="password" bind:value={password} required wrapperClass="!bg-surface-card !border-transparent" error={passwordErr} oninput={() => passwordErr = ''} />
			</section>

			{#if apiError}
				<div class="error-message" role="alert">{apiError}</div>
			{/if}

			<div class="submit-row">
				<button
					type="submit"
					disabled={isProcessing}
					class="button-primary w-fit !transition-all duration-500 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_18px_42px_rgba(242,120,48,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
				>
					{#if isProcessing}
						<span class="spinner" aria-hidden="true"></span>
						Processing
					{:else}
						Register
					{/if}
				</button>
			</div>

			<div class="registration-checker-squares mt-10 grid grid-cols-8 overflow-hidden" aria-hidden="true">
				{#each Array(24) as _, i}
					<span
						class={[
							(Math.floor(i / 8) + i) % 2 === 0 ? 'aspect-square bg-[#F5EDE0]' : 'aspect-square bg-[#DFD0BE]',
							i === 0 ? 'rounded-tl-lg' : '',
							i === 7 ? 'rounded-tr-lg' : '',
							i === 16 ? 'rounded-bl-lg' : '',
							i === 23 ? 'rounded-br-lg' : '',
							i === 9 ? 'bg-cover bg-center' : ''
						]}
						style={i === 9 ? 'background-image: url(/pieces/gioco/bK.svg)' : ''}
					></span>
				{/each}
			</div>
		</form>

	</section>
</main>

{#if showConfirmation}
	<ConfirmationModal
		{firstName}
		{lastName}
		school={''}
		{email}
		{phone}
		{AMOUNT}
		onConfirm={confirmPayment}
		onCancel={closeConfirmation}
		{isProcessing}
	/>
{/if}

<style>
	.event-intro {
		text-align: left;
	}
	.event-intro :global(.lead) {
		margin-inline: 0;
	}
	.cards-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}
	@media (max-width: 640px) {
		.cards-row {
			grid-template-columns: 1fr;
		}
	}
	.journey-card {
		border-radius: 12px;
		background: var(--surface-card);
		padding: 22px 26px;
	}
	.teamup-card {
		border-radius: 12px;
		background: var(--surface-card);
		padding: 22px 26px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.teamup-heading {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 500;
		font-size: 20px;
		line-height: 1.2;
		color: var(--ink);
	}
	.teamup-icon {
		width: 28px;
		height: 28px;
		flex-shrink: 0;
	}
	.teamup-tagline {
		margin: 0;
		font-family: var(--font-registration);
		font-size: 13px;
		font-weight: 600;
		color: var(--primary);
		letter-spacing: 0.03em;
	}
	.teamup-text {
		margin: 0;
		font-family: var(--font-registration);
		font-size: 12px;
		line-height: 1.5;
		color: var(--body);
	}
	.teamup-list {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.teamup-list li {
		padding: 0 0 0 14px;
		position: relative;
		font-family: var(--font-registration);
		font-size: 14px;
		line-height: 1.65;
		color: var(--body-strong);
	}
	.teamup-list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 7px;
		width: 4px;
		height: 4px;
		border-radius: 999px;
		background: var(--primary);
	}
	.teamup-outro {
		margin: 0;
		font-family: var(--font-registration);
		font-size: 12px;
		line-height: 1.5;
		color: var(--muted);
	}
	.journey-card-title {
		margin: 0 0 16px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 20px;
		line-height: 1.2;
		color: var(--ink);
	}
	.journey-steps {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.journey-step {
		display: flex;
		gap: 14px;
	}
	.journey-arrow {
		width: 7px;
		height: 6px;
		background: var(--primary);
		position: relative;
		margin: 10px 0;
	}
	.journey-arrow::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		translate: -50%;
		width: 0;
		height: 0;
		border-left: 3.5px solid transparent;
		border-right: 3.5px solid transparent;
		border-top: 6px solid var(--primary);
	}
	.journey-body {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}
	.journey-date {
		font-family: var(--font-registration);
		font-size: 13px;
		font-weight: 600;
		color: var(--primary);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.journey-name {
		font-family: var(--font-registration);
		font-size: 13px;
		color: var(--body-strong);
		line-height: 1.3;
	}
</style>
