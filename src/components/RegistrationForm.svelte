<script lang="ts">
	import ConfirmationModal from './ConfirmationModal.svelte';
	import PhoneInput from '$lib/components/PhoneInput.svelte';
	import PlayerForm from './PlayerForm.svelte';

	let schoolName = $state('');
	let schoolEmail = $state('');
	let schoolPhone = $state('+234');
	let showConfirmation = $state(false);
	let isProcessing = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	let registrationId = $state('');

	const REGISTRATION_AMOUNT = 50000;

	interface Player {
		name: string;
		email: string;
		chessRating: string;
	}

	let players = $state<Player[]>(
		Array.from({ length: 4 }, () => ({ name: '', email: '', chessRating: '' }))
	);

	function updatePlayer(index: number, field: string, value: string) {
		players[index] = { ...players[index], [field]: value };
	}

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
		if (!schoolPhone.trim()) {
			errorMessage = 'Phone number is required';
			return false;
		}

		for (let i = 0; i < players.length; i++) {
			if (!players[i].name.trim()) {
				errorMessage = `Player ${i + 1} name is required`;
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
					players
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
</script>

<main class="page-shell simple-home" aria-labelledby="event-title">
	<section class="container simple-home-grid">
		<div class="event-intro">
			<a class="brand-lockup" href="/" aria-label="BEEE T.E.A.M.U.P. Home">
				<span class="logo-chip"><img src="/beee.png" alt="" /></span>
			</a>

			<h1 id="event-title" class="display-xl">BEEE T.E.A.M.U.P. Chess Championship Abuja 2026</h1>
			<p class="lead">
				Complete the form and pay the registration fee to confirm your entry for 4 players.
			</p>

			<div class="price-band simple-price">
				<div>
					<span>Registration fee</span>
					<strong>{formatCurrency(REGISTRATION_AMOUNT)}</strong>
				</div>
			</div>
		</div>

		<form
			class="registration-form"
			onsubmit={(event) => {
				event.preventDefault();
				handleSubmit();
			}}
		>
			<section class="form-section" aria-labelledby="school-section-title">
				<div class="field">
					<label for="schoolName">School Name</label>
					<input
						id="schoolName"
						class="text-input"
						type="text"
						placeholder="School Name"
						bind:value={schoolName}
						required
					/>
				</div>

				<div class="field-grid field-grid-spaced">
					<div class="field">
						<label for="schoolEmail">Email</label>
						<input
							id="schoolEmail"
							class="text-input"
							type="email"
							placeholder="contact@school.edu"
							bind:value={schoolEmail}
							required
						/>
					</div>

					<div class="field">
						<label for="schoolPhone">Phone Number</label>
						<PhoneInput
							id="schoolPhone"
							value={schoolPhone}
							onChange={(v) => (schoolPhone = v)}
						/>
					</div>
				</div>
			</section>

			<section class="form-section" aria-labelledby="players-section-title">
				<h2 id="players-section-title" class="section-label">Participants (4 players)</h2>
				<div class="player-grid">
					{#each players as player, i (i)}
						<PlayerForm
							index={i}
							player={player}
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
				<button type="submit" disabled={isProcessing} class="button-primary">
					{#if isProcessing}
						<span class="spinner" aria-hidden="true"></span>
						Processing
					{:else}
						Pay {formatCurrency(REGISTRATION_AMOUNT)}
					{/if}
				</button>
			</div>
		</form>
	</section>
</main>

{#if showConfirmation}
	<ConfirmationModal
		schoolName={schoolName}
		amount={REGISTRATION_AMOUNT}
		email={schoolEmail}
		players={players}
		onConfirm={confirmPayment}
		onCancel={closeConfirmation}
		isProcessing={isProcessing}
	/>
{/if}
