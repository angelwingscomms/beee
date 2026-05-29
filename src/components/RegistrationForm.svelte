<script lang="ts">
	import LocationInput from './LocationInput.svelte';
	import ConfirmationModal from './ConfirmationModal.svelte';

	interface Location {
		lat: number;
		lng: number;
		address: string;
	}

	let schoolName = $state('');
	let schoolEmail = $state('');
	let schoolPhone = $state('');
	let location = $state<Location | null>(null);
	let showConfirmation = $state(false);
	let isProcessing = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	let registrationId = $state('');

	const REGISTRATION_AMOUNT = 50000;

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
		if (!location) {
			errorMessage = 'Location is required';
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
			// Step 1: Create registration in db
			const registerResponse = await fetch('/api/registration', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ schoolName, schoolEmail, schoolPhone, location })
			});

			if (!registerResponse.ok) {
				const err = await registerResponse.json().catch(() => ({}));
				throw new Error(err.error || 'Registration failed');
			}

			const { registrationId: reg_id } = await registerResponse.json();
			registrationId = reg_id;

			// Step 2: Initialize Paystack transaction — server calls Paystack API
			const paymentResponse = await fetch('/api/payment', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ registrationId: reg_id, email: schoolEmail })
			});

			if (!paymentResponse.ok) {
				const err = await paymentResponse.json().catch(() => ({}));
				throw new Error(err.error || 'Payment initialization failed');
			}

			const { authorization_url } = await paymentResponse.json();

			// Step 3: Redirect browser to Paystack checkout page
			// Paystack will redirect back to /payment/callback?reference=<reg_id>
			window.location.href = authorization_url;
		} catch (error) {
			const msg = error instanceof Error ? error.message : 'Unknown error';
			errorMessage = msg;
			console.error('[registration]', error);
			console.error('[registration] message:', msg);
			isProcessing = false;
		}
		// Note: isProcessing stays true during redirect — intentional (page is leaving)
	}

	function closeConfirmation() {
		showConfirmation = false;
	}
</script>

<main class="page-shell simple-home" aria-labelledby="event-title">
	<section class="container simple-home-grid">
		<div class="event-intro">
			<a class="brand-lockup" href="/" aria-label="BEEE T.E.A.M.U.P. Home">
				<span class="logo-chip"><img src="/ilogo.png" alt="" /></span>
				<span>BEEE T.E.A.M.U.P.</span>
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
						<input
							id="schoolPhone"
							class="text-input"
							type="tel"
							placeholder="+234"
							bind:value={schoolPhone}
							required
						/>
					</div>
				</div>
			</section>

			<section class="form-section" aria-labelledby="location-section-title">
				<div class="form-section-header">
					<h3 id="location-section-title">School Location</h3>
				</div>
				<LocationInput bind:location />
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
		onConfirm={confirmPayment}
		onCancel={closeConfirmation}
		isProcessing={isProcessing}
	/>
{/if}
