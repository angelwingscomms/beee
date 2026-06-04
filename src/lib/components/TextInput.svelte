<script lang="ts">
	let {
		id,
		label,
		type = 'text',
		placeholder = '',
		required = false,
		value = $bindable(''),
		oninput,
		wrapperClass = '!bg-white !border-transparent',
		labelClass = '!text-primary',
		inputClass = '!text-primary placeholder:!text-primary/60',
	}: {
		id: string;
		label: string;
		type?: string;
		placeholder?: string;
		required?: boolean;
		value?: string;
		oninput?: (e: Event) => void;
		wrapperClass?: string;
		labelClass?: string;
		inputClass?: string;
	} = $props();
</script>

<div
	class="flex items-center w-full min-h-[40px] border border-[var(--hairline)] rounded-lg px-3.5 focus-within:border-transparent transition-all duration-150 {wrapperClass}"
>
	<label for={id} class="shrink-0 !text-[12px] !font-normal {labelClass} cursor-pointer select-none">{label}</label>
	<input
		{id}
		class="flex-1 min-w-0 border-none bg-transparent outline-none focus:border-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 py-1.5 text-[12px] {inputClass}"
		{type}
		{placeholder}
		{required}
		bind:value
		{oninput}
	/>
</div>
