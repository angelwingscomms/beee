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
</script>

<main class="page-shell simple-home" aria-labelledby="event-title">
	<section class="container simple-home-grid">
		<div class="event-intro">
			<a class="brand-lockup" href="/" aria-label="BEEE T.E.A.M.U.P. Home">
				<span class="logo-chip"><img src="/beee.png" alt="" /></span>
			</a>

			<h1 id="event-title" class="display-xl">BEEE T.E.A.M.U.P. Spectacular Chess Championship Abuja 2026</h1>
			<p class="lead">
				Register now to confirm your entry
			</p>

			<div
				class="price-band simple-price transition duration-500 ease-out hover:-translate-y-1 hover:bg-[#F7EDE4] hover:shadow-[0_24px_70px_rgba(204,120,92,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
			>
				<div>
					<span>Registration fee</span>
					<strong>{formatCurrency(REGISTRATION_AMOUNT)}</strong>
				</div>
			</div>

			<ul class="mt-2 space-y-0.5 text-sm text-stone-500 list-disc pl-4">
				<li>Players must be 10 to 14 years old</li>
				<li>Only schools in Abuja may register</li>
				<li>A school must register four (4) participants</li>
				<li>Only the first thirty-two (32) schools qualify</li>
				<li>Registration deadline: June 15, 2026</li>
			</ul>
		</div>

		<form
			class="registration-form"
			onsubmit={(event) => {
				event.preventDefault();
				handleSubmit();
			}}
		>
			<section class="form-section" aria-labelledby="school-section-title">
				<h2 id="school-section-title" class="form-section-title">School Details</h2>
				<div class="field">
					<label for="schoolName">School Name</label>
					<input
						id="schoolName"
						class="text-input"
						type="text"
						bind:value={schoolName}
						required
					/>
				</div>
				<div class="field">
					<label for="schoolEmail">School Email</label>
					<input
						id="schoolEmail"
						class="text-input"
						type="email"
						bind:value={schoolEmail}
						required
					/>
				</div>
				<div class="field field-full">
					<label for="schoolPhone">School Phone</label>
					<PhoneInput
						id="schoolPhone"
						value={schoolPhone}
						onChange={(v) => schoolPhone = v}
					/>
				</div>
			</section>

			<section class="form-section" aria-labelledby="players-section-title">
				<h2 id="players-section-title" class="form-section-title">Players</h2>
				<div class="player-grid">
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
					class="button-primary !transition-all duration-500 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_18px_42px_rgba(204,120,92,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
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
