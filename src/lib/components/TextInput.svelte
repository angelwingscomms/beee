<script lang="ts">
	let {
		id,
		label,
		type = 'text',
		placeholder = '',
		required = false,
		value = $bindable(''),
		oninput,
			wrapperClass = '',
			labelClass = '!text-white',
			inputClass = 'placeholder:!text-white/60',
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
	class="ti-wrap flex items-center w-full min-h-[40px] rounded-lg px-3.5 focus-within:shadow-[0_0_0_3px_rgba(242,120,48,0.18)] transition-all duration-150 {wrapperClass}"
	class:invalid
>
	<div class="ti-bg"></div>
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
	.ti-wrap {
		position: relative;
		isolation: isolate;
	}

	.ti-bg {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		z-index: -1;
		background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,247,242,0.85) 50%, rgba(255,255,255,0.92) 100%);
		backdrop-filter: blur(32px) saturate(1.5);
		-webkit-backdrop-filter: blur(32px) saturate(1.5);
		border: 1px solid rgba(255, 255, 255, 0.5);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.04),
			0 2px 12px rgba(255, 255, 255, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.85),
			inset 0 -1px 0 rgba(255, 255, 255, 0.2),
			inset 1px 0 0 rgba(255, 255, 255, 0.15),
			inset -1px 0 0 rgba(255, 255, 255, 0.15),
			0 0 60px rgba(255, 255, 255, 0.15);
		overflow: hidden;
		transition: border-color 150ms ease;
	}

	.ti-bg::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: linear-gradient(
			105deg,
			transparent 15%,
			rgba(255, 255, 255, 0.35) 32%,
			rgba(255, 255, 255, 0.6) 38%,
			rgba(255, 255, 255, 0.35) 44%,
			transparent 60%
		);
		background-size: 220% 100%;
		animation: ti-sheen 5s ease-in-out infinite;
		pointer-events: none;
	}

	.ti-bg::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%);
		pointer-events: none;
	}

	@keyframes ti-sheen {
		0% { background-position: 170% 0; }
		50% { background-position: -70% 0; }
		100% { background-position: 170% 0; }
	}

	.ti-wrap:focus-within .ti-bg {
		border-color: var(--primary);
	}

	.ti-wrap.invalid .ti-bg {
		border-color: var(--error);
	}

	:global(.dark) .ti-bg {
		background: linear-gradient(135deg, rgba(30, 29, 26, 0.6) 0%, rgba(24, 23, 21, 0.45) 50%, rgba(30, 29, 26, 0.55) 100%);
		border-color: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(36px) saturate(1.3);
		-webkit-backdrop-filter: blur(36px) saturate(1.3);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.35),
			0 0 40px rgba(255, 255, 255, 0.03),
			inset 0 1px 0 rgba(255, 255, 255, 0.08),
			inset 0 -1px 0 rgba(255, 255, 255, 0.04),
			inset 1px 0 0 rgba(255, 255, 255, 0.05),
			inset -1px 0 0 rgba(255, 255, 255, 0.05);
	}

	:global(.dark) .ti-bg::before {
		background: linear-gradient(
			105deg,
			transparent 15%,
			rgba(255, 255, 255, 0.04) 32%,
			rgba(255, 255, 255, 0.08) 38%,
			rgba(255, 255, 255, 0.04) 44%,
			transparent 60%
		);
	}

	:global(.dark) .ti-bg::after {
		background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.04) 0%, transparent 60%);
	}

	label {
		color: #ffffff !important;
	}

	input {
		color: #ffffff;
		-webkit-text-fill-color: #ffffff;
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
