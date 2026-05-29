<script lang="ts">
	interface Player {
		name: string;
		email: string;
	}

	let {
		index,
		player,
		errors = {},
		onChange
	}: {
		index: number;
		player: Player;
		errors?: Record<string, string>;
		onChange: (field: string, value: string) => void;
	} = $props();
</script>

<article class="player-card">
	<div class="player-card-header">
		<div class="player-number">{index + 1}</div>
		<h3>Player {index + 1}</h3>
	</div>

	<div class="field-grid">
		<div class="field">
			<label for="player_{index}_name">Full name</label>
			<input
				type="text"
				id="player_{index}_name"
				value={player.name}
				oninput={(event) => onChange('name', event.currentTarget.value)}
				placeholder="Enter player full name"
				class="text-input"
			/>
			{#if errors[`player_${index}_name`]}
				<p class="error-message">{errors[`player_${index}_name`]}</p>
			{/if}
		</div>

		<div class="field">
			<label for="player_{index}_email">Email</label>
			<input
				type="email"
				id="player_{index}_email"
				value={player.email}
				oninput={(event) => onChange('email', event.currentTarget.value)}
				placeholder="player@example.com"
				class="text-input"
			/>
			{#if errors[`player_${index}_email`]}
				<p class="error-message">{errors[`player_${index}_email`]}</p>
			{/if}
		</div>
	</div>
</article>
