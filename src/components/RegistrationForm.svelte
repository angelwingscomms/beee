<script lang="ts">
	import ConfirmationModal from './ConfirmationModal.svelte';
	import PhoneInput from '$lib/components/PhoneInput.svelte';
	import PlayerForm from './PlayerForm.svelte';

	let schoolName = $state('');
	let schoolPhone = $state('+234');
	let showConfirmation = $state(false);
	let isProcessing = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	let registrationId = $state('');

	const REGISTRATION_AMOUNT = 12500;

	let playerName = $state('');
	let playerEmail = $state('');

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
		if (!schoolPhone.trim()) {
			errorMessage = 'Phone number is required';
			return false;
		}
		if (!playerName.trim()) {
			errorMessage = 'Player name is required';
			return false;
		}
		if (!playerEmail.trim()) {
			errorMessage = 'Player email is required';
			return false;
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
					schoolPhone,
					playerName,
					playerEmail
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
				Complete the form and pay the registration fee to confirm your entry.
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

				<div class="field">
					<label for="schoolPhone">Phone Number</label>
					<PhoneInput
						id="schoolPhone"
						value={schoolPhone}
						onChange={(v) => (schoolPhone = v)}
					/>
				</div>
			</section>

			<section class="form-section" aria-labelledby="player-section-title">
				<h2 id="player-section-title" class="section-label">Participant</h2>
				<PlayerForm
					index={0}
					player={{ name: playerName, email: playerEmail }}
					onChange={(field, value) => {
						if (field === 'name') playerName = value;
						if (field === 'email') playerEmail = value;
					}}
				/>
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
		playerName={playerName}
		playerEmail={playerEmail}
		onConfirm={confirmPayment}
		onCancel={closeConfirmation}
		isProcessing={isProcessing}
	/>
{/if}
