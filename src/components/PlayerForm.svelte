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
	// even player (0,2): first=theme bg/white text, last=white bg/theme text
	// odd player (1,3):  first=white bg/theme text, last=theme bg/white text
	// mobile (≤766px): all first=theme bg/white text, all last=white bg/theme text
	const a = '!bg-primary !text-white placeholder:!text-white/70 !border-primary/60';
	const b = '!bg-white !text-primary placeholder:!text-primary/70 !border-primary';
	const mFirst = 'max-md:!bg-primary max-md:!text-white max-md:placeholder:!text-white/70 max-md:!border-primary/60';
	const mLast = 'max-md:!bg-white max-md:!text-primary max-md:placeholder:!text-primary/70 max-md:!border-primary';
	const firstClass = `${index % 2 === 0 ? a : b} ${mFirst}`;
	const lastClass = `${index % 2 === 0 ? b : a} ${mLast}`;
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
