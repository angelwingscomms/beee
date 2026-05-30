<script lang="ts">
	import ConfirmationModal from './ConfirmationModal.svelte';
	import PlayerForm from './PlayerForm.svelte';

	let schoolName = $state('');
	let showConfirmation = $state(false);
	let isProcessing = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	let registrationId = $state('');

	const REGISTRATION_AMOUNT = 12500;

	let playerFirstName = $state('');
	let playerLastName = $state('');
	let playerEmail = $state('');
	let playerPhone = $state('+234');

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
		if (!playerFirstName.trim()) {
			errorMessage = 'First name is required';
			return false;
		}
		if (!playerLastName.trim()) {
			errorMessage = 'Surname is required';
			return false;
		}
		if (!playerEmail.trim()) {
			errorMessage = 'Player email is required';
			return false;
		}
		if (!playerPhone.trim()) {
			errorMessage = 'Player phone is required';
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
					playerFirstName,
					playerLastName,
					playerEmail,
					playerPhone
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
						bind:value={schoolName}
						required
					/>
				</div>
			</section>

			<section class="form-section">
				<PlayerForm
					index={0}
					player={{ first_name: playerFirstName, last_name: playerLastName, email: playerEmail, phone: playerPhone }}
					onChange={(field, value) => {
						if (field === 'first_name') playerFirstName = value;
						if (field === 'last_name') playerLastName = value;
						if (field === 'email') playerEmail = value;
						if (field === 'phone') playerPhone = value;
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
							// original-registration-checker-squares-colors: even=bg-surface-card (#efe9de), odd=bg-primary (#cc785c)
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
		amount={REGISTRATION_AMOUNT}
		playerFirstName={playerFirstName}
		playerLastName={playerLastName}
		playerEmail={playerEmail}
		playerPhone={playerPhone}
		onConfirm={confirmPayment}
		onCancel={closeConfirmation}
		isProcessing={isProcessing}
	/>
{/if}
