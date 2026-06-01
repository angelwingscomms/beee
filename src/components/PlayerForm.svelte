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

<div class="field-grid">
	<input
		type="text"
		id="player_{index}_first_name"
		value={first_name}
		oninput={(event) => onChange('first_name', event.currentTarget.value)}
		class="text-input"
		placeholder="First name"
		required
	/>
	<input
		type="text"
		id="player_{index}_last_name"
		value={last_name}
		oninput={(event) => onChange('last_name', event.currentTarget.value)}
		class="text-input"
		placeholder="Last name"
		required
	/>
</div>
