<script lang="ts">
	import PhoneInput from '$lib/components/PhoneInput.svelte';

	interface Player {
		first_name: string;
		last_name: string;
		email: string;
		phone: string;
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
	<div class="field-grid">
		<div class="field">
			<label for="player_{index}_first_name">First Name</label>
			<input
				type="text"
				id="player_{index}_first_name"
				value={player.first_name}
				oninput={(event) => onChange('first_name', event.currentTarget.value)}
				class="text-input"
			/>
			{#if errors[`player_${index}_first_name`]}
				<p class="error-message">{errors[`player_${index}_first_name`]}</p>
			{/if}
		</div>

		<div class="field">
			<label for="player_{index}_last_name">Surname</label>
			<input
				type="text"
				id="player_{index}_last_name"
				value={player.last_name}
				oninput={(event) => onChange('last_name', event.currentTarget.value)}
				class="text-input"
			/>
			{#if errors[`player_${index}_last_name`]}
				<p class="error-message">{errors[`player_${index}_last_name`]}</p>
			{/if}
		</div>

		<div class="field field-full">
			<label for="player_{index}_email">Email</label>
			<input
				type="email"
				id="player_{index}_email"
				value={player.email}
				oninput={(event) => onChange('email', event.currentTarget.value)}
				class="text-input"
			/>
			{#if errors[`player_${index}_email`]}
				<p class="error-message">{errors[`player_${index}_email`]}</p>
			{/if}
		</div>

		<div class="field field-full">
			<label for="player_{index}_phone">Phone Number</label>
			<PhoneInput
				id="player_{index}_phone"
				value={player.phone}
				onChange={(v) => onChange('phone', v)}
			/>
		</div>
	</div>
</article>
