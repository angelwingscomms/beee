<script lang="ts">
	import ConfirmationModal from './ConfirmationModal.svelte';
	import PlayerForm from './PlayerForm.svelte';
	import PhoneInput from '$lib/components/PhoneInput.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let schoolName = $state('');
	let schoolEmail = $state('');
	let schoolPhone = $state('+234');
	let showConfirmation = $state(false);
	let isProcessing = $state(false);
	let apiError = $state('');
	let successMessage = $state('');
	let registrationId = $state('');

	let schoolNameErr = $state('');
	let schoolEmailErr = $state('');
	let schoolPhoneErr = $state('');
	let playerErrors = $state(
		Array.from({ length: 4 }, () => ({ first_name: '', last_name: '' }))
	);

	const REGISTRATION_AMOUNT = 50000;
	const REGISTRATION_AMOUNT_PER_PLAYER = 12500;
	const NUM_PLAYERS = 4;

	let players = $state(
		Array.from({ length: NUM_PLAYERS }, () => ({ first_name: '', last_name: '' }))
	);

	function formatCurrency(amount: number): string {
		return `₦${amount.toLocaleString()}`;
	}

	function clearErrors() {
		schoolNameErr = '';
		schoolEmailErr = '';
		schoolPhoneErr = '';
		for (let i = 0; i < NUM_PLAYERS; i++) {
			playerErrors[i].first_name = '';
			playerErrors[i].last_name = '';
		}
	}

	function validateForm(): boolean {
		clearErrors();
		apiError = '';
		successMessage = '';
		let valid = true;

		if (!schoolName.trim()) {
			schoolNameErr = 'School name is required';
			valid = false;
		}
		if (!schoolEmail.trim()) {
			schoolEmailErr = 'School email is required';
			valid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(schoolEmail.trim())) {
			schoolEmailErr = 'Enter a valid email address';
			valid = false;
		}
		if (!schoolPhone.trim() || schoolPhone.trim() === '+234') {
			schoolPhoneErr = 'School phone is required';
			valid = false;
		}
		for (let i = 0; i < NUM_PLAYERS; i++) {
			if (!players[i].first_name.trim()) {
				playerErrors[i].first_name = 'First name is required';
				valid = false;
			}
			if (!players[i].last_name.trim()) {
				playerErrors[i].last_name = 'Last name is required';
				valid = false;
			}
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
		successMessage = '';

		try {
			const initResponse = await fetch('/api/register-init-payment', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					schoolName,
					schoolEmail,
					schoolPhone,
					players: players.map(p => [p.first_name.trim(), p.last_name.trim()])
				})
			});

			if (!initResponse.ok) {
				const err = await initResponse.json().catch(() => ({}));
				throw new Error(err.error || 'Payment initialization failed');
			}

			const { authorization_url, registrationId: reg_id } = await initResponse.json();
			registrationId = reg_id;

			window.location.href = authorization_url;
		} catch (error) {
			const msg = error instanceof Error ? error.message : 'Unknown error';
			apiError = msg;
			console.error('[registration]', error);
			console.error('[registration] message:', msg);
			isProcessing = false;
		}
	}

	function closeConfirmation() {
		showConfirmation = false;
	}

	function updatePlayer(i: number, field: string, value: string) {
		if (field === 'first_name') {
			players[i].first_name = value;
			playerErrors[i].first_name = '';
		}
		if (field === 'last_name') {
			players[i].last_name = value;
			playerErrors[i].last_name = '';
		}
	}
</script>

<main class="page-shell simple-home" aria-labelledby="event-title">
	<section class="container simple-home-grid">
		<div class="event-intro">
			<a class="brand-lockup" href="/" aria-label="BEEE T.E.A.M.U.P. Home" style="flex-direction:column;gap:4px;align-items:flex-start">
				<span class="logo-chip">
				<img src="/logo.svg" alt="BEEE" />
				<span class="logo-tm">TM</span>
			</span>
			<span class="text-[20px]" style="font-family:'GC Bumble',sans-serif;font-weight:700"><span style="color:var(--ink)">Be</span> <span style="color:var(--primary)">Everything</span> <span style="color:var(--ink)">E<span style="margin-right:-0.144em;-webkit-text-stroke:0.5px currentColor">✔</span>cellent</span> <span style="color:var(--primary)">Every Day</span></span>
			</a>

			<h1 id="event-title" class="championship-title flex flex-col">
  <span class="text-[32px] font-championship font-bold mb-2">BEEE Spectacular Chess Championship</span>
  <span class="text-[20px] font-championship" style="color:var(--primary)">Abuja 2026</span>
</h1>

			<p class="welcome-text">Welcome to a unique championship experience that redefines inter-school engagement among young minds.</p>

			<div class="cards-row">
				<div class="flex flex-col gap-4">
					<div class="journey-card">
						<h3 class="journey-card-title">The Championship Journey</h3>
						<div class="journey-steps">
							<div class="journey-step">
								<div class="journey-body">
									<span class="journey-date">June 2026</span>
									<span class="journey-name">Preliminary Rounds</span>
								</div>
							</div>
							<div class="journey-arrow"></div>
							<div class="journey-step">
								<div class="journey-body">
									<span class="journey-date">July — August 2026</span>
									<span class="journey-name">BEEE T.E.A.M.U.P. Development</span>
								</div>
							</div>
							<div class="journey-arrow"></div>
							<div class="journey-step">
								<div class="journey-body">
									<span class="journey-date">October 2026</span>
									<span class="journey-name">Championship Grand Finale</span>
								</div>
							</div>
						</div>
					</div>
					<div class="price-band simple-price flex-1">
						<span class="text-[20px] font-[500]" style="font-family:var(--font-display)">Registration fee</span>
						<strong class="!inline-flex flex-wrap items-baseline gap-x-[3px] gap-y-[7px] -mt-[9px]">₦12,500<span class="text-[18px] font-normal">per player</span></strong>
						<div class="flex flex-wrap items-baseline gap-x-1 !text-[#000]" style="font-family:var(--font-display)">
							<span class="text-[18px] font-bold">Total: ₦50,000</span>
							<span class="text-[16px] font-bold">per school team</span>
						</div>
						<button type="button" onclick={() => { const el = document.getElementById('schoolName'); el?.scrollIntoView({ behavior: 'smooth', block: 'start' }); el?.focus(); }} class="button-primary !border-0 text-xs px-3 py-1.5 min-h-0 w-fit motion-safe:animate-hint-loading !transition-all duration-500 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_18px_42px_rgba(204,120,92,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100">Register Your School</button>
					</div>
				</div>
				<div class="teamup-card">
					<div class="flex items-center gap-x-2">
					<h3 class="teamup-heading">About BEEE T.E.A.M.U.P.</h3>
					<span class="relative inline-flex shrink-0">
						<img src="/flower-gear.png" alt="" class="teamup-icon" />
						<sup class="absolute top-0 -right-2.5 text-[6.5px] leading-none font-semibold" style="color:var(--primary)">TM</sup>
					</span>
				</div>
					<p class="teamup-tagline">Technology &middot; Enterprise &middot; Art &middot; Mentorship &middot; Upskill Project</p>
					<p class="teamup-text">BEEE T.E.A.M.U.P. is the championship's Development Stage where qualifying participants will be exposed to:</p>
					<ul class="teamup-list">
						<li>Advanced Chess Development</li>
						<li>Innovation &amp; Creativity</li>
						<li>Strategic Thinking</li>
						<li>Teamwork &amp; Collaboration</li>
						<li>Leadership Development</li>
						<li>Personal Growth &amp; Upskilling</li>
					</ul>
					<p class="teamup-outro">as they prepare for the Championship Grand Finale.</p>
				</div>
			</div>

			<ul class="space-y-1 text-[14px] leading-snug text-black font-registration">
				<li class="border-l-2 border-primary pl-3">Qualification slots are limited and will be allocated on a first-completed-registration basis.</li>
				<li class="border-l-2 border-primary pl-3">Registration is through participating schools within the FCT.</li>
				<li class="border-l-2 border-primary pl-3">Participants must be between 10 and 14 years of age.</li>
				<li class="border-l-2 border-primary pl-3">Each participating school must register four (4) players.</li>
				<li class="border-l-2 border-primary pl-3">Sponsorship of participants is by parents or other interested sponsor.</li>
				<li class="border-l-2 border-primary pl-3">Registration closes on June 18, 2026, or earlier if available placement slots are filled.</li>
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
				<h2>Register Your School</h2>
			</header>

			<section class="form-section space-y-1.5">
				<div class="field">
					<TextInput id="schoolName" label="School Name" bind:value={schoolName} required wrapperClass="!bg-white !border-transparent" error={schoolNameErr} oninput={() => schoolNameErr = ''} />
				</div>
				<div class="field">
					<TextInput id="schoolEmail" label="School Email" type="email" bind:value={schoolEmail} required wrapperClass="!bg-[#EFE9DE] !border-transparent" error={schoolEmailErr} oninput={() => schoolEmailErr = ''} />
				</div>
				<div class="field field-full">
					<PhoneInput
						id="schoolPhone"
						value={schoolPhone}
						placeholder="School phone"
						theme
						onChange={(v) => { schoolPhone = v; schoolPhoneErr = ''; }}
					/>
			</section>

			<section class="form-section" aria-labelledby="players-section-title">
				<h2 id="players-section-title" class="form-section-title">Enter 4 players</h2>
				<div class="players-list">
					{#each players as player, i}
						<PlayerForm
							index={i}
							first_name={player.first_name}
							last_name={player.last_name}
							onChange={(field, value) => updatePlayer(i, field, value)}
							firstNameError={playerErrors[i].first_name}
							lastNameError={playerErrors[i].last_name}
						/>
					{/each}
				</div>
			</section>

			{#if apiError}
				<div class="error-message" role="alert">{apiError}</div>
			{/if}

			{#if successMessage}
				<div class="success-message" role="status">{successMessage}</div>
			{/if}

			<div class="submit-row">
				<button
					type="submit"
					disabled={isProcessing}
					class="button-primary w-fit !transition-all duration-500 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_18px_42px_rgba(204,120,92,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
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
		schoolName={schoolName}
		schoolEmail={schoolEmail}
		schoolPhone={schoolPhone}
		players={players.map(p => [p.first_name.trim(), p.last_name.trim()])}
		amount={REGISTRATION_AMOUNT}
		onConfirm={confirmPayment}
		onCancel={closeConfirmation}
		isProcessing={isProcessing}
	/>
{/if}

<style>
	.form-section-title {
		font-family: var(--font-display);
		color: var(--primary);
		margin-bottom: 8px;
	}
	.teamup-font {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.15em;
	}
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
		font-size: 10.5px;
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
		font-weight: 500;
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
		width: 10px;
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
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
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
