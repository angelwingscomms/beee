<script lang="ts">
	let {
		index,
		first_name = '',
		last_name = '',
		onChange
	}: {
		index: number;
		first_name?: string;
		last_name?: string;
		onChange: (field: string, value: string) => void;
	} = $props();
</script>

<article class="player-card">
	<h4 class="player-heading">Player {index + 1}</h4>
	<div class="field-grid">
		<div class="field">
			<label for="player_{index}_first_name">First Name</label>
			<input
				type="text"
				id="player_{index}_first_name"
				value={first_name}
				oninput={(event) => onChange('first_name', event.currentTarget.value)}
				class="text-input"
				required
			/>
		</div>

		<div class="field">
			<label for="player_{index}_last_name">Last Name</label>
			<input
				type="text"
				id="player_{index}_last_name"
				value={last_name}
				oninput={(event) => onChange('last_name', event.currentTarget.value)}
				class="text-input"
				required
			/>
		</div>
	</div>
</article>
