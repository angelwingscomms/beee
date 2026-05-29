<script lang="ts">
	import PhoneInput from '$lib/components/PhoneInput.svelte';

	interface Player {
		name: string;
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
		<div class="field field-full">
			<label for="player_{index}_name">Full Name</label>
			<input
				type="text"
				id="player_{index}_name"
				value={player.name}
				oninput={(event) => onChange('name', event.currentTarget.value)}
				placeholder="Enter full name"
				class="text-input"
			/>
			{#if errors[`player_${index}_name`]}
				<p class="error-message">{errors[`player_${index}_name`]}</p>
			{/if}
		</div>

		<div class="field field-full">
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
