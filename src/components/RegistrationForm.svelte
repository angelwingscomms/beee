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
		return `ngn ${amount.toLocaleString()}`;
	}

	function validateForm(): boolean {
		errorMessage = '';
		successMessage = '';

		if (!schoolName.trim()) {
			errorMessage = 'school name is required';
			return false;
		}
		if (!schoolEmail.trim()) {
			errorMessage = 'school email is required';
			return false;
		}
		if (!schoolPhone.trim()) {
			errorMessage = 'phone number is required';
			return false;
		}
		if (!location) {
			errorMessage = 'location is required';
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
			const registerResponse = await fetch('/api/registration', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					schoolName,
					schoolEmail,
					schoolPhone,
					location
				})
			});

			if (!registerResponse.ok) {
				throw new Error('registration failed');
			}

			const registerData = await registerResponse.json();
			registrationId = registerData.registrationId;

			const paymentResponse = await fetch('/api/payment', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					registrationId,
					email: schoolEmail,
					amount: REGISTRATION_AMOUNT,
					schoolName
				})
			});

			if (!paymentResponse.ok) {
				throw new Error('payment initialization failed');
			}

			const paymentData = await paymentResponse.json();

			await new Promise((resolve) => setTimeout(resolve, 1000));

			const verifyResponse = await fetch('/api/verify-payment', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					registrationId,
					reference: paymentData.reference
				})
			});

			if (!verifyResponse.ok) {
				throw new Error('payment verification failed');
			}

			await fetch('/api/send-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					to: schoolEmail,
					schoolName,
					registrationId,
					amount: REGISTRATION_AMOUNT
				})
			});

			showConfirmation = false;
			successMessage = `registration successful. confirmation has been sent to ${schoolEmail}.`;

			schoolName = '';
			schoolEmail = '';
			schoolPhone = '';
			location = null;
		} catch (error) {
			errorMessage = 'payment processing error. please try again.';
			console.error('[registration]', error);
		} finally {
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
			<a class="brand-lockup" href="/" aria-label="beee teamup home">
				<span class="logo-chip"><img src="/ilogo.png" alt="" /></span>
				<span>beee teamup</span>
			</a>

			<h1 id="event-title" class="display-xl">beee teamup chess tournament</h1>
			<p class="lead">
				register your school for the beee teamup chess tournament. complete the form and pay the
				registration fee to confirm your entry.
			</p>

			<div class="price-band simple-price">
				<div>
					<span>registration fee</span>
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
				<div class="form-section-header">
					<h3 id="school-section-title">registration details</h3>
				</div>

				<div class="field">
					<label for="schoolName">school name</label>
					<input
						id="schoolName"
						class="text-input"
						type="text"
						placeholder="school name"
						bind:value={schoolName}
						required
					/>
				</div>

				<div class="field-grid field-grid-spaced">
					<div class="field">
						<label for="schoolEmail">email</label>
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
						<label for="schoolPhone">phone number</label>
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
					<h3 id="location-section-title">location</h3>
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
						processing
					{:else}
						pay {formatCurrency(REGISTRATION_AMOUNT)}
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
