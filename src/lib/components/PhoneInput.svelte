<script lang="ts">
	import { countries, type Country } from '$lib/data/countries';
	import { phone_len, phone_warn } from '$lib/data/phone_lengths';

	let {
		value = '',
		id,
		label = '',
		placeholder = '',
		theme = false,
		valid = $bindable(false),
		onChange
	}: {
		value?: string;
		id?: string;
		label?: string;
		placeholder?: string;
		theme?: boolean;
		valid?: boolean;
		onChange?: (v: string) => void;
	} = $props();

	const defaultCountry = countries.find(c => c.c === 'NG')!;

	let selectedCountry = $state(defaultCountry);
	let phoneNumber = $state('');
	let open = $state(false);
	let search = $state('');
	let searchRef = $state<HTMLInputElement | null>(null);
	let listRef = $state<HTMLUListElement | null>(null);
	let activeIdx = $state(0);
	let touched = $state(false);

	$effect(() => {
		if (value) {
			for (const c of countries) {
				if (value.startsWith(c.d)) {
					selectedCountry = c;
					phoneNumber = value.slice(c.d.length);
					return;
				}
			}
		}
	});

	let filtered = $derived(
		search
			? countries.filter(
					c =>
						c.n.toLowerCase().includes(search.toLowerCase()) ||
						c.d.includes(search) ||
						c.c.toLowerCase().includes(search.toLowerCase())
				)
			: countries
	);

	let digitsOnly = $derived(phoneNumber.replace(/\D/g, ''));

	let hasNonDigits = $derived(touched && phoneNumber.length > 0 && phoneNumber !== digitsOnly);

	let lenRange = $derived(phone_len[selectedCountry.c] ?? null);
	let warnLens = $derived(phone_warn[selectedCountry.c] ?? null);

	let lenErr = $derived(
		hasNonDigits || (touched && digitsOnly.length > 0 && lenRange
			? digitsOnly.length < lenRange[0] || digitsOnly.length > lenRange[1]
			: false)
	);

	let lenWarn = $derived(
		!lenErr && touched && digitsOnly.length > 0 && warnLens
			? warnLens.includes(digitsOnly.length)
			: false
	);

	let errMsg = $derived(
		hasNonDigits
			? 'Only digits allowed'
			: lenErr && lenRange
				? lenRange[0] === lenRange[1]
					? `Enter exactly ${lenRange[0]} digits`
					: `Enter ${lenRange[0]}-${lenRange[1]} digits`
				: lenWarn
					? 'Landline format. Most Nigerian numbers are 10 digits'
					: ''
	);

	$effect(() => {
		if (open) {
			activeIdx = 0;
			search = '';
			requestAnimationFrame(() => searchRef?.focus());
		}
	});

	// Expose validity to the parent so a form's submit button can stay disabled
	// until the phone number is actually valid (non-empty, digits-only, correct length).
	$effect(() => {
		valid =
			digitsOnly.length > 0 &&
			!hasNonDigits &&
			(!lenRange || (digitsOnly.length >= lenRange[0] && digitsOnly.length <= lenRange[1]));
	});

	function selectCountry(c: Country) {
		selectedCountry = c;
		open = false;
		emit();
	}

	function emit() {
		onChange?.(selectedCountry.d + phoneNumber.replace(/^0+/, ''));
	}

	function handlePhoneInput(e: Event) {
		phoneNumber = (e.target as HTMLInputElement).value;
		touched = true;
		emit();
	}

	function toggleOpen() {
		open = !open;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			activeIdx = Math.min(activeIdx + 1, filtered.length - 1);
			listRef?.children[activeIdx]?.scrollIntoView({ block: 'nearest' });
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			activeIdx = Math.max(activeIdx - 1, 0);
			listRef?.children[activeIdx]?.scrollIntoView({ block: 'nearest' });
		} else if (e.key === 'Enter' && open) {
			e.preventDefault();
			selectCountry(filtered[activeIdx]);
		} else if (e.key === 'Escape') {
			open = false;
		}
	}

	function onBackdropClick() {
		open = false;
	}

	function onPhoneBlur() {
		touched = true;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="phone-input-wrapper" onclick={(e) => e.stopPropagation()} onkeydown={handleKeydown}>
	{#if label}
		<label class="phone-label" for={id}>{label}</label>
	{/if}
	<div class="phone-field-row" class:invalid={lenErr} class:warn={lenWarn}>
		<div class="pi-bg"></div>
		<div class="country-select">
			<button
				type="button"
				class="country-trigger"
				class:error={lenErr}
				class:warn={lenWarn}
				class:themed={theme}
				onclick={toggleOpen}
				aria-expanded={open}
				aria-haspopup="listbox"
				aria-label="Select country code"
			>
				<span class="country-abbr">{selectedCountry.c}</span>
				<span class="country-code-label" class:themed-label={theme}>{selectedCountry.d}</span>
				<svg class="chevron" class:themed-chevron={theme} class:chevron-up={open} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
					<path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>

			{#if open}
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<div class="dropdown-backdrop" onclick={onBackdropClick}></div>
				<div class="dropdown-panel" role="listbox" aria-label="Countries">
					<div class="search-wrap">
						<input
							type="text"
							class="search-input"
							placeholder="Search country..."
							bind:value={search}
							bind:this={searchRef}
							role="searchbox"
						/>
					</div>
					<ul class="country-list" bind:this={listRef}>
						{#each filtered as country, i (country.c)}
							<li>
								<button
									type="button"
									class="country-option"
									class:active={i === activeIdx}
									class:selected={country.c === selectedCountry.c}
									role="option"
									aria-selected={country.c === selectedCountry.c}
									onclick={() => selectCountry(country)}
									onmouseenter={() => (activeIdx = i)}
								>
									<span class="country-flag">{country.f}</span>
									<span class="country-name">{country.n}</span>
									<span class="country-dial">{country.d}</span>
								</button>
							</li>
						{/each}
						{#if filtered.length === 0}
							<li class="no-results">No countries found</li>
						{/if}
					</ul>
				</div>
			{/if}
		</div>

		<input
			type="tel"
			{id}
			class="phone-input" class:themed-input={theme}
			class:error={lenErr}
			class:warn={lenWarn}
			value={phoneNumber}
			oninput={handlePhoneInput}
			required
			onblur={onPhoneBlur}
			{placeholder}
			aria-label="Phone number"
			aria-invalid={lenErr || lenWarn}
		/>
	</div>
	{#if errMsg}
		<p class="field-msg" class:field-error={lenErr} class:field-warn={lenWarn} role="alert">{errMsg}</p>
	{/if}
</div>

<style>
	.phone-input-wrapper {
		position: relative;
		width: 100%;
	}

	.phone-label {
		display: block;
		margin-bottom: 6px;
		font-size: 12px;
		font-weight: normal;
		color: var(--body-strong);
		cursor: pointer;
		user-select: none;
	}

	.phone-field-row {
		display: flex;
		gap: 0;
		position: relative;
		isolation: isolate;
		border-radius: 8px;
	}

	/* Frosted-glass background matching TextInput's .ti-bg */
	.pi-bg {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		z-index: -1;
		background: linear-gradient(135deg, rgba(30, 29, 26, 0.6) 0%, rgba(24, 23, 21, 0.45) 50%, rgba(30, 29, 26, 0.55) 100%);
		backdrop-filter: blur(36px) saturate(1.3);
		-webkit-backdrop-filter: blur(36px) saturate(1.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.35),
			0 0 40px rgba(255, 255, 255, 0.03),
			inset 0 1px 0 rgba(255, 255, 255, 0.08),
			inset 0 -1px 0 rgba(255, 255, 255, 0.04),
			inset 1px 0 0 rgba(255, 255, 255, 0.05),
			inset -1px 0 0 rgba(255, 255, 255, 0.05);
		overflow: hidden;
		transition: border-color 150ms ease;
	}

	.pi-bg::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
			background: linear-gradient(
				105deg,
				transparent 15%,
				rgba(255, 255, 255, 0.04) 32%,
				rgba(255, 255, 255, 0.08) 38%,
				rgba(255, 255, 255, 0.04) 44%,
				transparent 60%
			);
			background-size: 220% 100%;
		animation: pi-sheen 5s ease-in-out infinite;
		pointer-events: none;
	}

	.pi-bg::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(ellipse at 30% 50%, rgba(255, 255, 255, 0.04) 0%, transparent 60%);
		pointer-events: none;
	}

	@keyframes pi-sheen {
		0% { background-position: 170% 0; }
		50% { background-position: -70% 0; }
		100% { background-position: 170% 0; }
	}

	.phone-field-row:focus-within .pi-bg {
		border-color: var(--primary);
	}

	.invalid .pi-bg {
		border-color: var(--error);
	}

	.country-select {
		position: relative;
		flex-shrink: 0;
	}

	.country-trigger {
		display: flex;
		align-items: center;
		gap: 6px;
		height: 40px;
		padding: 0 10px;
		border-radius: 8px 0 0 8px;
		background: transparent;
		color: var(--ink);
		cursor: pointer;
		font-size: 14px;
		line-height: 40px;
		outline: none;
		white-space: nowrap;
		color: #fff;
	}

	.country-trigger.error {
		background: rgba(198, 69, 69, 0.08);
	}

	.country-abbr {
		font-weight: 500;
		font-size: 13px;
		line-height: 40px;
	}

	.country-code-label {
		font-weight: 500;
		font-size: 13px;
		line-height: 40px;
		color: #fff;
	}

	.chevron {
		color: var(--muted);
		transition: transform 180ms ease;
		flex-shrink: 0;
	}

	.chevron-up {
		transform: rotate(180deg);
	}

	.dropdown-backdrop {
		position: fixed;
		inset: 0;
		z-index: 40;
	}

	.dropdown-panel {
		position: absolute;
		z-index: 50;
		top: calc(100% + 4px);
		left: 0;
		width: 320px;
		max-height: 320px;
		overflow: hidden;
		border: 1px solid var(--hairline);
		border-radius: 10px;
		background: var(--canvas);
		box-shadow: 0 8px 32px rgba(20, 20, 19, 0.12);
		display: flex;
		flex-direction: column;
	}

	.search-wrap {
		padding: 8px;
		border-bottom: 1px solid var(--hairline);
		flex-shrink: 0;
	}

	.search-input {
		width: 100%;
		min-height: 36px;
		padding: 8px 12px;
		border-radius: 6px;
		background: var(--canvas);
		color: var(--ink);
		font-size: 13px;
		outline: none;
	}


	.country-list {
		list-style: none;
		margin: 0;
		padding: 4px;
		overflow-y: auto;
		flex: 1;
	}

	.country-option {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 8px 10px;
		border: none;
		border-radius: 6px;
		background: transparent;
		color: var(--body);
		font-size: 13px;
		cursor: pointer;
		text-align: left;
	}

	.country-option:hover,
	.country-option.active {
		background: var(--surface-soft);
	}

	.country-option.selected {
		font-weight: 500;
		color: var(--ink);
		background: var(--surface-card);
	}

	.country-name {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.country-dial {
		color: var(--muted);
		font-size: 12px;
		flex-shrink: 0;
	}

	.no-results {
		padding: 20px 12px;
		color: var(--muted);
		font-size: 13px;
		text-align: center;
	}

	.phone-input {
		flex: 1;
		min-width: 0;
		height: 40px;
		padding: 0 14px;
		border-radius: 0 8px 8px 0;
		background: transparent;
		color: #fff;
		font-size: 12px;
		line-height: 40px;
		outline: none;
	}

	.invalid .phone-input,
	.invalid .country-trigger {
		background: rgba(198, 69, 69, 0.08);
	}

	.warn .phone-input,
	.warn .country-trigger {
		background: rgba(232, 165, 90, 0.08);
	}

	.country-trigger.themed {
		background: var(--surface-card);
		color: var(--ink);
		border-color: transparent;
		border-radius: 8px 0 0 8px;
	}

	.themed-input {
		background: var(--surface-card);
		color: var(--ink);
		border-color: transparent;
		border-radius: 0 8px 8px 0;
	}

	.themed-label {
		color: var(--muted);
	}

	.themed-chevron {
		color: var(--muted);
	}

	.phone-input::placeholder {
		color: var(--muted-soft);
	}

	.field-msg {
		margin: 6px 0 0;
		font-size: 12px;
		line-height: 1.4;
	}

	.field-error {
		color: var(--error);
	}

	.field-warn {
		color: var(--amber);
	}
</style>
