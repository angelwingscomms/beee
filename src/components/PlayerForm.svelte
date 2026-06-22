<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';

	let {
		index,
		first_name = '',
		last_name = '',
		email = '',
		onChange,
		firstNameError = '',
		lastNameError = '',
		emailError = '',
	}: {
		index: number;
		first_name?: string;
		last_name?: string;
		email?: string;
		onChange: (field: string, value: string) => void;
		firstNameError?: string;
		lastNameError?: string;
		emailError?: string;
	} = $props();

	// Alternating input styles:
	// even player (0,2): first=theme bg/white text, last=white bg/theme text
	// odd player (1,3):  first=white bg/theme text, last=theme bg/white text
	// mobile (≤766px): all first=theme bg/white text, all last=white bg/theme text
	const aWrap = '!bg-secondary !border-transparent';
	const bWrap = '!bg-white !border-transparent';
	const aInput = '!text-primary placeholder:!text-primary/70';
	const bInput = '!text-primary placeholder:!text-primary/70';
	const mFirstWrap = 'max-md:!bg-secondary max-md:!border-transparent';
	const mLastWrap = 'max-md:!bg-white max-md:!border-transparent';
	const mFirstInput = 'max-md:!text-primary max-md:placeholder:!text-primary/70';
	const mLastInput = 'max-md:!text-primary max-md:placeholder:!text-primary/70';
	const even = $derived(index % 2 === 0);
	const firstWrapClass = $derived(`${even ? aWrap : bWrap} ${mFirstWrap}`);
	const firstInputClass = $derived(`${even ? aInput : bInput} ${mFirstInput}`);
	const lastWrapClass = $derived(`${even ? bWrap : aWrap} ${mLastWrap}`);
	const lastInputClass = $derived(`${even ? bInput : aInput} ${mLastInput}`);
</script>

<div class="field-grid">
	<TextInput
		id="player_{index}_first_name"
		label="First name"
		value={first_name}
		oninput={(e: Event) => onChange('first_name', (e.currentTarget as HTMLInputElement).value)}
		wrapperClass={firstWrapClass}
		inputClass={firstInputClass}
		required
		error={firstNameError}
	/>
	<TextInput
		id="player_{index}_last_name"
		label="Last name"
		value={last_name}
		oninput={(e: Event) => onChange('last_name', (e.currentTarget as HTMLInputElement).value)}
		wrapperClass={lastWrapClass}
		inputClass={lastInputClass}
		required
		error={lastNameError}
	/>
	<TextInput
		id="player_{index}_email"
		label="Email address"
		type="email"
		value={email}
		oninput={(e: Event) => onChange('email', (e.currentTarget as HTMLInputElement).value)}
		wrapperClass="!bg-white !border-[#DFD0BE] field-full"
		inputClass="!text-primary placeholder:!text-primary/70"
		required
		error={emailError}
	/>
</div>
