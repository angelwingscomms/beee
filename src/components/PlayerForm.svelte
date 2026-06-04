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

	// Alternating input styles:
	// even player (0,2): first=light theme bg/theme text, last=white bg/theme text
	// odd player (1,3):  first=white bg/theme text, last=light theme bg/theme text
	const a = '!bg-primary/30 !text-primary placeholder:!text-primary/50 !border-primary/40';
	const b = '!bg-white !text-primary placeholder:!text-primary/70 !border-primary';
	const firstClass = index % 2 === 0 ? a : b;
	const lastClass = index % 2 === 0 ? b : a;
</script>

<div class="field-grid">
	<input
		type="text"
		id="player_{index}_first_name"
		value={first_name}
		oninput={(event) => onChange('first_name', event.currentTarget.value)}
		class="text-input {firstClass}"
		placeholder="First name"
		required
	/>
	<input
		type="text"
		id="player_{index}_last_name"
		value={last_name}
		oninput={(event) => onChange('last_name', event.currentTarget.value)}
		class="text-input {lastClass}"
		placeholder="Last name"
		required
	/>
</div>
