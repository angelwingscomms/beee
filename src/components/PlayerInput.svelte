<script lang="ts">
	export let name: string = '';
	export let email: string = '';
	export let playerNumber: number = 1;
</script>

<div class="p-5 bg-gray-50 rounded-lg border border-gray-200">
	<div class="flex items-center gap-3 mb-4">
		<div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
			{playerNumber}
		</div>
		<h3 class="text-lg font-semibold text-gray-900">Player {playerNumber}</h3>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div>
			<label for="player-{playerNumber}-name" class="block text-sm font-semibold text-gray-700 mb-2">
				Player Name
			</label>
			<input
				id="player-{playerNumber}-name"
				type="text"
				placeholder="Full name"
				bind:value={name}
				class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
				required
			/>
		</div>

		<div>
			<label for="player-{playerNumber}-email" class="block text-sm font-semibold text-gray-700 mb-2">
				Email Address
			</label>
			<input
				id="player-{playerNumber}-email"
				type="email"
				placeholder="player@email.com"
				bind:value={email}
				class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
				required
			/>
		</div>
	</div>
</div>
