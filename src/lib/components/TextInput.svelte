<script lang="ts">
	let {
		id,
		label,
		type = 'text',
		placeholder = '',
		required = false,
		value = $bindable(''),
		oninput,
			wrapperClass = '!bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(248,247,242,0.85)_50%,rgba(255,255,255,0.92)_100%)] !backdrop-blur-[32px] !border-[var(--hairline)]',
			labelClass = '!text-muted',
			inputClass = 'placeholder:!text-muted-soft',
		error = '',
		showToggle = false,
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
		error?: string;
		showToggle?: boolean;
	} = $props();

	let invalid = $derived(!!error);
	let visible = $state(false);
	let inputType = $derived(showToggle && type === 'password' ? (visible ? 'text' : 'password') : type);
</script>

<div
	class="flex items-center w-full min-h-[40px] border border-[var(--hairline)] rounded-lg px-3.5 focus-within:!border-[var(--primary)] focus-within:shadow-[0_0_0_3px_rgba(242,120,48,0.18)] transition-all duration-150 {wrapperClass}"
	class:!border-[var(--error)]={invalid}
>
	<label for={id} class="shrink-0 !text-[12px] !font-normal {labelClass} cursor-pointer select-none">{label}</label>
	<input
		{id}
		class="flex-1 min-w-0 border-none bg-transparent outline-none focus:border-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 py-1.5 !text-[12px] {inputClass}"
		type={inputType}
		{placeholder}
		{required}
		bind:value
		{oninput}
		aria-invalid={invalid}
	/>
	{#if showToggle && type === 'password'}
		<button type="button" onclick={() => visible = !visible} class="eye-btn" aria-label={visible ? 'Hide password' : 'Show password'}>
			{#if visible}
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
			{:else}
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
			{/if}
		</button>
	{/if}
</div>
{#if error}
	<p class="field-msg field-error" role="alert">{error}</p>
{/if}

<style>
	input {
		color: #141413;
		-webkit-text-fill-color: #141413;
	}
	.field-msg {
		margin: 6px 0 0;
		font-size: 12px;
		line-height: 1.4;
	}
	.field-error {
		color: var(--error);
	}
	.eye-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		margin-right: -4px;
		border: none;
		background: none;
		cursor: pointer;
		color: var(--muted);
		flex-shrink: 0;
		border-radius: 6px;
		transition: background 0.15s, color 0.15s;
	}
	.eye-btn:hover {
		background: var(--surface-soft);
		color: var(--body-strong);
	}
</style>
