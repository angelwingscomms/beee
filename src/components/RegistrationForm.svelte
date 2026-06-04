<script lang="ts">
	import ConfirmationModal from './ConfirmationModal.svelte';
	import PlayerForm from './PlayerForm.svelte';
	import PhoneInput from '$lib/components/PhoneInput.svelte';

	let schoolName = $state('');
	let schoolEmail = $state('');
	let schoolPhone = $state('+234');
	let showConfirmation = $state(false);
	let isProcessing = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	let registrationId = $state('');

	const REGISTRATION_AMOUNT = 50000;
	const REGISTRATION_AMOUNT_PER_PLAYER = 12500;
	const NUM_PLAYERS = 4;

	let players = $state(
		Array.from({ length: NUM_PLAYERS }, () => ({ first_name: '', last_name: '' }))
	);

	function formatCurrency(amount: number): string {
		return `₦${amount.toLocaleString()}`;
	}

	function validateForm(): boolean {
		errorMessage = '';
		successMessage = '';

		if (!schoolName.trim()) {
			errorMessage = 'School name is required';
			return false;
		}
		if (!schoolEmail.trim()) {
			errorMessage = 'School email is required';
			return false;
		}
		if (!schoolPhone.trim() || schoolPhone.trim() === '+234') {
			errorMessage = 'School phone is required';
			return false;
		}
		for (let i = 0; i < NUM_PLAYERS; i++) {
			if (!players[i].first_name.trim()) {
				errorMessage = `Player ${i + 1} first name is required`;
				return false;
			}
			if (!players[i].last_name.trim()) {
				errorMessage = `Player ${i + 1} last name is required`;
				return false;
			}
		}

		return true;
	}

	async function handleSubmit() {
		if (!validateForm()) {
			return;
		}

		showConfirmation = true;
	}

	async function confirmPayment() {
		isProcessing = true;
		errorMessage = '';
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
			errorMessage = msg;
			console.error('[registration]', error);
			console.error('[registration] message:', msg);
			isProcessing = false;
		}
	}

	function closeConfirmation() {
		showConfirmation = false;
	}

	function updatePlayer(i: number, field: string, value: string) {
		if (field === 'first_name') players[i].first_name = value;
		if (field === 'last_name') players[i].last_name = value;
	}

	const sA = '!bg-[#EFE9DE] !border-[#EFE9DE]/80 focus-within:!border-[#EFE9DE]';
	const sB = '!bg-white !border-secondary focus-within:!border-secondary';
	const sALabel = '!text-primary';
	const sBLabel = '!text-primary';
	const sAInput = '!text-primary placeholder:!text-primary/60';
	const sBInput = '!text-primary placeholder:!text-primary/60';
</script>

<main class="page-shell simple-home" aria-labelledby="event-title">
	<section class="container simple-home-grid">
		<div class="event-intro">
			<div class="flex flex-col gap-1">
				<a class="brand-lockup" href="/" aria-label="BEEE T.E.A.M.U.P. Home">
					<span class="logo-chip">
					<img src="/logo.svg" alt="BEEE" />
				</span>
				</a>

				<h1 id="event-title" class="championship-title flex flex-col">
  <span class="text-[52px] font-['Montserrat']">BEEE</span>
  <span class="text-[20px] font-['Montserrat'] mb-4">Be Everything Excellent Everyday</span>
  <span class="text-[32px] font-championship font-bold">Spectacular Chess Championship</span>
  <span class="text-[20px] font-championship">Abuja 2026</span>
</h1>
			</div>

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
						<span>Registration fee</span>
						<strong class="!inline-flex flex-wrap items-baseline gap-x-[3px] gap-y-[7px]">₦12,500<span class="text-[13px] font-normal">per player</span></strong>
						<span class="block text-[14px] font-bold !text-[#000]" style="font-family:var(--font-display)">Total: ₦50,000<br>per school team</span>
					</div>
				</div>
				<div class="teamup-card">
					<h3 class="teamup-heading">What is T.E.A.M.U.P.? <img src="/flower-gear.png" alt="" class="teamup-icon" /></h3>
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

			<ul class="space-y-1 text-[13px] leading-snug text-black font-registration">
				<li class="border-l-2 border-black pl-3">Registration closes on June 18, 2026, or earlier if available placement slots are filled.</li>
				<li class="border-l-2 border-black pl-3">Registration is through participating schools within the FCT.</li>
				<li class="border-l-2 border-black pl-3">Participants must be between 10 and 14 years of age.</li>
				<li class="border-l-2 border-black pl-3">Each participating school must register four (4) players.</li>
				<li class="border-l-2 border-black pl-3">Sponsorship of participants is by parents or other interested sponsor.</li>
				<li class="border-l-2 border-primary pl-3 motion-safe:animate-deadline-pulse">Qualification slots are limited and will be allocated on a first-completed-registration basis.</li>
			</ul>
		</div>

		<form
			class="registration-form font-registration"
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
					<div class="flex items-center w-full min-h-[40px] border border-[var(--hairline)] rounded-lg px-3.5 focus-within:border-[var(--secondary)] focus-within:shadow-[0_0_0_3px_rgba(239,233,222,0.3)] transition-all duration-150 {sB}">
						<label for="schoolName" class="shrink-0 !text-[12px] !font-normal {sBLabel} cursor-pointer select-none">School Name</label>
						<input id="schoolName" class="flex-1 min-w-0 border-none bg-transparent outline-none focus:border-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 py-1.5 text-[12px] {sBInput}" type="text" bind:value={schoolName} required />
					</div>
				</div>
				<div class="field">
					<div class="flex items-center w-full min-h-[40px] border border-[var(--hairline)] rounded-lg px-3.5 focus-within:border-[var(--secondary)] focus-within:shadow-[0_0_0_3px_rgba(239,233,222,0.3)] transition-all duration-150 {sA}">
						<label for="schoolEmail" class="shrink-0 !text-[12px] !font-normal {sALabel} cursor-pointer select-none">School Email</label>
						<input id="schoolEmail" class="flex-1 min-w-0 border-none bg-transparent outline-none focus:border-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 py-1.5 text-[12px] {sAInput}" type="email" bind:value={schoolEmail} required />
					</div>
				</div>
				<div class="field field-full">
					<PhoneInput
						id="schoolPhone"
						value={schoolPhone}
						placeholder="School phone"
						theme
						onChange={(v) => schoolPhone = v}
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
						/>
					{/each}
				</div>
			</section>

			{#if errorMessage}
				<div class="error-message" role="alert">{errorMessage}</div>
			{/if}

			{#if successMessage}
				<div class="success-message" role="status">{successMessage}</div>
			{/if}

			<div class="submit-row">
				<button
					type="submit"
					disabled={isProcessing}
					class="button-primary w-fit motion-safe:animate-button-pulse !transition-all duration-500 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_18px_42px_rgba(204,120,92,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
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
		display: inline;
		width: 28px;
		height: 28px;
		vertical-align: baseline;
		position: relative;
		top: 1px;
		margin-left: 10px;
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
		font-size: 12px;
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
	}
	.journey-step {
		display: flex;
		gap: 14px;
	}
	.journey-arrow {
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 6px solid var(--primary);
		margin: 2px auto;
	}
	.journey-body {
		display: flex;
		flex-direction: column;
		gap: 1px;
		align-items: center;
		text-align: center;
	}
	.journey-date {
		font-family: var(--font-registration);
		font-size: 11px;
		font-weight: 600;
		color: var(--primary);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.journey-name {
		font-family: var(--font-registration);
		font-size: 13px;
		font-weight: 500;
		color: var(--body-strong);
		line-height: 1.3;
	}
</style>
