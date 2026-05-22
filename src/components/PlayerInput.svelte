<script lang="ts">
	let {
		name = $bindable(''),
		email = $bindable(''),
		playerNumber = 1
	}: {
		name: string;
		email: string;
		playerNumber?: number;
	} = $props();
</script>

<article class="player-card">
	<div class="player-card-header">
		<div class="player-number">{playerNumber}</div>
		<h3>Player {playerNumber}</h3>
	</div>

	<div class="field-grid">
		<div class="field">
			<label for="player-{playerNumber}-name">Player name</label>
			<input
				id="player-{playerNumber}-name"
				class="text-input"
				type="text"
				placeholder="Full name"
				bind:value={name}
				required
			/>
		</div>

		<div class="field">
			<label for="player-{playerNumber}-email">Email address</label>
			<input
				id="player-{playerNumber}-email"
				class="text-input"
				type="email"
				placeholder="player@email.com"
				bind:value={email}
				required
			/>
		</div>
	</div>
</article>
