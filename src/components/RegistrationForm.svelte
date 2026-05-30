<script lang="ts">
	import { chess_board_cells } from '$lib/util/home/chess_visual';
	import ConfirmationModal from './ConfirmationModal.svelte';
	import PlayerForm from './PlayerForm.svelte';

	let schoolName = $state('');
	let showConfirmation = $state(false);
	let isProcessing = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	let registrationId = $state('');

	const REGISTRATION_AMOUNT = 12500;

	let playerName = $state('');
	let playerEmail = $state('');
	let playerPhone = $state('+234');
	const board_cells = chess_board_cells();

	function validateForm(): boolean {
		errorMessage = '';
		successMessage = '';

		if (!schoolName.trim()) {
			errorMessage = 'School name is required';
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
					playerName,
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

<main class="page-shell simple-home relative isolate" aria-labelledby="event-title">
	<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
		<div
			class="absolute left-[-92px] top-[9%] grid w-[280px] rotate-[-14deg] grid-cols-8 overflow-hidden rounded-lg border border-hairline/70 bg-canvas/60 opacity-45 shadow-[0_30px_90px_rgba(20,20,19,0.10)] md:w-[430px] lg:w-[560px]"
		>
			{#each board_cells as c (c.i)}
				<span class={c.d ? 'aspect-square bg-primary/25' : 'aspect-square bg-surface-card/75'}></span>
			{/each}
		</div>

		<div
			class="absolute bottom-[-116px] right-[-104px] grid w-[270px] rotate-[8deg] grid-cols-8 overflow-hidden rounded-lg border border-hairline/80 bg-canvas/70 opacity-55 shadow-[0_30px_90px_rgba(20,20,19,0.10)] md:w-[420px] lg:w-[520px]"
		>
			{#each board_cells as c (c.i)}
				<span class={c.d ? 'aspect-square bg-surface-dark/15' : 'aspect-square bg-primary/20'}></span>
			{/each}
		</div>

		<div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-canvas to-transparent"></div>
	</div>

	<section class="container simple-home-grid relative z-10">
		<div class="event-intro">
			<a class="brand-lockup" href="/" aria-label="BEEE T.E.A.M.U.P. Home">
				<span class="logo-chip"><img src="/beee.png" alt="" /></span>
			</a>

			<h1 id="event-title" class="display-xl">BEEE T.E.A.M.U.P. Spectacular Chess Championship Abuja 2026</h1>
			<p class="lead">
				Complete the form and pay the registration fee to confirm your entry.
			</p>

			<div class="price-band simple-price">
				<div>
					<span>Registration fee</span>
					<strong>NGN {REGISTRATION_AMOUNT.toLocaleString()}</strong>
				</div>
			</div>
		</div>

		<form
			class="registration-form relative overflow-hidden border border-hairline/80 shadow-[0_24px_80px_rgba(20,20,19,0.08)] backdrop-blur"
			onsubmit={(event) => {
				event.preventDefault();
				handleSubmit();
			}}
		>
			<div class="pointer-events-none absolute inset-x-0 top-0 grid h-2 grid-cols-8" aria-hidden="true">
				{#each board_cells.slice(0, 8) as c (c.i)}
					<span class={c.d ? 'bg-primary/45' : 'bg-surface-card'}></span>
				{/each}
			</div>

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
			</section>

			<section class="form-section">
				<PlayerForm
					index={0}
					player={{ name: playerName, email: playerEmail, phone: playerPhone }}
					onChange={(field, value) => {
						if (field === 'name') playerName = value;
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
				<button type="submit" disabled={isProcessing} class="button-primary">
					{#if isProcessing}
						<span class="spinner" aria-hidden="true"></span>
						Processing
					{:else}
						Register
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
		playerPhone={playerPhone}
		onConfirm={confirmPayment}
		onCancel={closeConfirmation}
		isProcessing={isProcessing}
	/>
{/if}
