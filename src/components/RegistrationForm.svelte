<script lang="ts">
	import LocationInput from './LocationInput.svelte';
	import PlayerInput from './PlayerInput.svelte';
	import ConfirmationModal from './ConfirmationModal.svelte';

	interface Player {
		name: string;
		email: string;
	}

	interface Location {
		lat: number;
		lng: number;
		address: string;
	}

	let schoolName = '';
	let schoolEmail = '';
	let schoolPhone = '';
	let players: Player[] = [
		{ name: '', email: '' },
		{ name: '', email: '' },
		{ name: '', email: '' },
		{ name: '', email: '' }
	];
	let location: Location | null = null;
	let showConfirmation = false;
	let isProcessing = false;
	let errorMessage = '';
	let registrationId = '';

	const REGISTRATION_AMOUNT = 50000;

	function validateForm(): boolean {
		errorMessage = '';

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

		const validPlayers = players.filter(p => p.name.trim() && p.email.trim());
		if (validPlayers.length < 4) {
			errorMessage = 'All 4 players must have names and email addresses';
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

		try {
			// Register the team
			const registerResponse = await fetch('/api/registration', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					schoolName,
					schoolEmail,
					schoolPhone,
					location,
					players
				})
			});

			if (!registerResponse.ok) {
				throw new Error('Registration failed');
			}

			const registerData = await registerResponse.json();
			registrationId = registerData.registrationId;

			// Initialize payment
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
				throw new Error('Payment initialization failed');
			}

			const paymentData = await paymentResponse.json();

			// Simulate payment processing
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Verify payment
			const verifyResponse = await fetch('/api/verify-payment', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					registrationId,
					reference: paymentData.reference
				})
			});

			if (!verifyResponse.ok) {
				throw new Error('Payment verification failed');
			}

			// Send confirmation email
			await fetch('/api/send-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					to: schoolEmail,
					schoolName,
					registrationId,
					amount: REGISTRATION_AMOUNT,
					players
				})
			});

			// Success - close modal and show success message
			showConfirmation = false;
			alert('Registration successful! A confirmation email has been sent to ' + schoolEmail);

			// Reset form
			schoolName = '';
			schoolEmail = '';
			schoolPhone = '';
			location = null;
			players = [
				{ name: '', email: '' },
				{ name: '', email: '' },
				{ name: '', email: '' },
				{ name: '', email: '' }
			];
		} catch (error) {
			errorMessage = 'Payment processing error. Please try again.';
			console.error('[v0] Error:', error);
		} finally {
			isProcessing = false;
		}
	}

	function closeConfirmation() {
		showConfirmation = false;
	}
</script>

<div class="w-full max-w-4xl mx-auto">
	<div class="bg-white rounded-xl shadow-2xl p-8 md:p-10">
		<!-- Header -->
		<div class="text-center mb-8">
			<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">BEEE TEAMUP</h1>
			<p class="text-xl md:text-2xl text-gray-700 mb-1">Chess Tournament Registration</p>
			<p class="text-gray-600">Register your 4-player team</p>
		</div>

		<!-- Pricing Banner -->
		<div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 mb-8 text-white">
			<div class="flex flex-col md:flex-row items-center justify-between">
				<div>
					<p class="text-sm font-semibold opacity-90">REGISTRATION FEE</p>
					<p class="text-3xl md:text-4xl font-bold">₦50,000</p>
				</div>
				<div class="text-right mt-4 md:mt-0">
					<p class="text-sm opacity-90">For Fixed</p>
					<p class="text-2xl font-bold">4-Player Team</p>
				</div>
			</div>
		</div>

		<!-- Form -->
		<form on:submit|preventDefault={handleSubmit} class="space-y-8">
			<!-- School Information -->
			<div class="border-b pb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-6">School Information</h2>

				<div class="space-y-4">
					<div>
						<label for="schoolName" class="block text-sm font-semibold text-gray-700 mb-2">
							School Name
						</label>
						<input
							id="schoolName"
							type="text"
							placeholder="e.g., Federal University of Technology"
							bind:value={schoolName}
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
							required
						/>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="schoolEmail" class="block text-sm font-semibold text-gray-700 mb-2">
								School Email
							</label>
							<input
								id="schoolEmail"
								type="email"
								placeholder="contact@school.edu"
								bind:value={schoolEmail}
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
								required
							/>
						</div>

						<div>
							<label for="schoolPhone" class="block text-sm font-semibold text-gray-700 mb-2">
								Phone Number
							</label>
							<input
								id="schoolPhone"
								type="tel"
								placeholder="+234 (0) XXX-XXXX-XXX"
								bind:value={schoolPhone}
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
								required
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Location Selection -->
			<div class="border-b pb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-6">School Location</h2>
				<LocationInput bind:location />
				{#if !location && errorMessage.includes('Location')}
					<p class="text-red-600 text-sm mt-2">{errorMessage}</p>
				{/if}
			</div>

			<!-- Players Information -->
			<div class="border-b pb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-6">4-Player Team Details</h2>
				<div class="space-y-4">
					{#each players as player, index (index)}
						<PlayerInput
							bind:name={player.name}
							bind:email={player.email}
							playerNumber={index + 1}
						/>
					{/each}
				</div>
			</div>

			<!-- Error Message -->
			{#if errorMessage}
				<div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
					{errorMessage}
				</div>
			{/if}

			<!-- Submit Button -->
			<button
				type="submit"
				disabled={isProcessing}
				class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 text-lg"
			>
				{#if isProcessing}
					<span class="flex items-center justify-center gap-2">
						<svg
							class="animate-spin h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Processing...
					</span>
				{:else}
					Sign Up & Pay ₦50,000
				{/if}
			</button>

			<p class="text-center text-sm text-gray-600">
				By registering, you agree to the tournament rules and terms.
			</p>
		</form>
	</div>
</div>

{#if showConfirmation}
	<ConfirmationModal
		schoolName={schoolName}
		players={players}
		amount={REGISTRATION_AMOUNT}
		email={schoolEmail}
		onConfirm={confirmPayment}
		onCancel={closeConfirmation}
		isProcessing={isProcessing}
	/>
{/if}
