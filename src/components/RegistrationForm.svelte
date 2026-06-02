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
					<strong>{formatCurrency(REGISTRATION_AMOUNT_PER_PLAYER)} per participant (Total: {formatCurrency(REGISTRATION_AMOUNT)} per school)</strong>
				</div>
			</div>

			<div class="registration-details-note mt-3 rounded-lg border border-[#eadfd5] bg-[#fffaf4] px-3 py-2 text-[13px] leading-relaxed text-stone-600 shadow-[0_10px_30px_rgba(120,90,60,0.08)]">
				The championship is school-based, and all participant registrations shall be processed through their respective schools. Registration fees may be sponsored by parents, guardians, or other approved sponsors on behalf of participating students.
			</div>
			<ul class="mt-2 space-y-0.5 text-sm text-stone-500 list-none pl-0">
				<li>Players must be 10 to 14 years old</li>
				<li>Players must be enrolled in a school in Abuja</li>
				<li>To qualify, a school must register four (4) participants</li>
				<li>Registration fee is {formatCurrency(REGISTRATION_AMOUNT_PER_PLAYER)} per participant (Total fee: {formatCurrency(REGISTRATION_AMOUNT)} per school)</li>
				<li>Only the first thirty-two (32) schools to register would qualify</li>
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
			<section class="form-section space-y-1.5">
				<div class="field">
					<div class="flex items-center w-full min-h-[40px] border border-[#e6dfd8] rounded-lg bg-[#faf9f5] px-3.5 focus-within:border-[#cc785c] focus-within:shadow-[0_0_0_3px_rgba(204,120,92,0.15)] transition-all duration-150">
						<label for="schoolName" class="shrink-0 !text-[12px] !font-normal !text-[#c7beb4] cursor-pointer select-none">School Name</label>
						<input id="schoolName" class="flex-1 min-w-0 border-none bg-transparent outline-none focus:border-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 py-1.5 text-[12px] text-[#141413]" type="text" bind:value={schoolName} required />
					</div>
				</div>
				<div class="field">
					<div class="flex items-center w-full min-h-[40px] border border-[#e6dfd8] rounded-lg bg-[#faf9f5] px-3.5 focus-within:border-[#cc785c] focus-within:shadow-[0_0_0_3px_rgba(204,120,92,0.15)] transition-all duration-150">
						<label for="schoolEmail" class="shrink-0 !text-[12px] !font-normal !text-[#c7beb4] cursor-pointer select-none">School Email</label>
						<input id="schoolEmail" class="flex-1 min-w-0 border-none bg-transparent outline-none focus:border-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 py-1.5 text-[12px] text-[#141413]" type="email" bind:value={schoolEmail} required />
					</div>
				</div>
				<div class="field field-full">
					<PhoneInput
						id="schoolPhone"
						value={schoolPhone}
						onChange={(v) => schoolPhone = v}
					/>
				</div>
			</section>

			<section class="form-section" aria-labelledby="players-section-title">
				<h2 id="players-section-title" class="form-section-title">Players</h2>
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

<style>
	@media (max-width: 1023px) {
		.event-intro {
			text-align: left;
		}
	}
</style>
