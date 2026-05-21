<script lang="ts">
	interface Player {
		name: string;
		email: string;
	}

	export let schoolName: string;
	export let players: Player[];
	export let amount: number;
	export let email: string;
	export let onConfirm: () => void;
	export let onCancel: () => void;
	export let isProcessing: boolean = false;
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
	<div class="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
		<!-- Header -->
		<div class="bg-blue-600 text-white p-6">
			<h2 class="text-2xl font-bold">Confirm Registration</h2>
			<p class="text-blue-100 mt-1">Review your details before payment</p>
		</div>

		<!-- Content -->
		<div class="p-6 space-y-6">
			<!-- School Details -->
			<div>
				<h3 class="font-semibold text-gray-900 mb-3">School Details</h3>
				<div class="bg-gray-50 rounded-lg p-4 space-y-2">
					<div>
						<p class="text-xs font-semibold text-gray-600">SCHOOL NAME</p>
						<p class="text-gray-900 font-semibold">{schoolName}</p>
					</div>
					<div>
						<p class="text-xs font-semibold text-gray-600">CONTACT EMAIL</p>
						<p class="text-gray-900">{email}</p>
					</div>
				</div>
			</div>

			<!-- Players List -->
			<div>
				<h3 class="font-semibold text-gray-900 mb-3">Team Players</h3>
				<div class="space-y-2">
					{#each players as player, index}
						{#if player.name && player.email}
							<div class="bg-blue-50 rounded-lg p-3 flex items-start gap-3">
								<div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
									{index + 1}
								</div>
								<div class="flex-1 min-w-0">
									<p class="font-semibold text-gray-900 truncate">{player.name}</p>
									<p class="text-sm text-gray-600 truncate">{player.email}</p>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Price Summary -->
			<div class="border-t pt-6">
				<div class="flex justify-between items-center">
					<span class="text-gray-700 font-semibold">Registration Fee:</span>
					<span class="text-2xl font-bold text-blue-600">₦{amount.toLocaleString()}</span>
				</div>
				<p class="text-xs text-gray-600 mt-2">For 4-player team registration</p>
			</div>

			<!-- Terms -->
			<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
				<p class="text-sm text-yellow-900">
					By confirming, you agree that the registration fee of <strong>₦{amount.toLocaleString()}</strong> will be charged to complete this registration.
				</p>
			</div>
		</div>

		<!-- Actions -->
		<div class="bg-gray-50 px-6 py-4 border-t flex gap-3">
			<button
				type="button"
				on:click={onCancel}
				disabled={isProcessing}
				class="flex-1 px-4 py-2 text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
			>
				Cancel
			</button>
			<button
				type="button"
				on:click={onConfirm}
				disabled={isProcessing}
				class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
			>
				{#if isProcessing}
					<svg
						class="animate-spin h-4 w-4"
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
				{:else}
					Confirm & Pay
				{/if}
			</button>
		</div>
	</div>
</div>
