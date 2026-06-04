<script lang="ts">
	import { countries, type Country } from '$lib/data/countries';
	import { phone_len, phone_warn } from '$lib/data/phone_lengths';

	let {
		value = '',
		id,
		placeholder = '',
		variant = '',
		onChange
	}: {
		value?: string;
		id?: string;
		placeholder?: string;
		variant?: string;
		onChange?: (v: string) => void;
	} = $props();

	const isA = variant === 'a';
	const wrClass = isA ? '!bg-primary !border-primary/60' : '!bg-white !border-primary';
	const tgClass = isA
		? '!bg-transparent !text-white !border-primary/60'
		: '!bg-white !text-primary !border-primary';
	const piClass = isA
		? '!bg-transparent !text-white placeholder:!text-white/60 !border-primary/60'
		: '!bg-white !text-primary placeholder:!text-primary/60 !border-primary';
	const cvClass = isA ? '!text-white/70' : '!text-primary/70';

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
	<div class="phone-field-row {wrClass}" class:invalid={lenErr} class:warn={lenWarn}>
		<div class="country-select">
			<button
				type="button"
				class="country-trigger {tgClass}"
				class:error={lenErr}
				class:warn={lenWarn}
				onclick={toggleOpen}
				aria-expanded={open}
				aria-haspopup="listbox"
				aria-label="Select country code"
			>
				<span class="country-abbr">{selectedCountry.c}</span>
				<span class="country-code-label {isA ? '!text-white/70' : '!text-primary/70'}">{selectedCountry.d}</span>
				<svg class="chevron {cvClass} {open ? 'chevron-up' : ''}" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
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
			class="phone-input {piClass}"
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

	.phone-field-row {
		display: flex;
		gap: 0;
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
		border: 1px solid var(--hairline);
		border-right: none;
		border-radius: 8px 0 0 8px;
		background: var(--surface-soft);
		color: var(--ink);
		cursor: pointer;
		font-size: 14px;
		line-height: 40px;
		outline: none;
		transition: border-color 160ms ease, box-shadow 160ms ease;
		white-space: nowrap;
	}

	.country-trigger:focus-visible {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px rgba(204, 120, 92, 0.15);
		z-index: 1;
	}

	.country-trigger.error {
		border-color: var(--error);
	}

	.country-trigger.error:focus-visible {
		box-shadow: 0 0 0 3px rgba(198, 69, 69, 0.15);
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
		color: var(--body-strong);
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
		border: 1px solid var(--hairline);
		border-radius: 6px;
		background: var(--canvas);
		color: var(--ink);
		font-size: 13px;
		outline: none;
	}

	.search-input:focus {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px rgba(204, 120, 92, 0.15);
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
		border: 1px solid var(--hairline);
		border-radius: 0 8px 8px 0;
		background: var(--canvas);
		color: var(--ink);
		font-size: 12px;
		line-height: 40px;
		outline: none;
		transition: border-color 160ms ease, box-shadow 160ms ease;
	}

	.phone-input:focus {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px rgba(204, 120, 92, 0.15);
		position: relative;
		z-index: 1;
	}

	.phone-input.error {
		border-color: var(--error);
	}

	.phone-input.error:focus {
		box-shadow: 0 0 0 3px rgba(198, 69, 69, 0.15);
		border-color: var(--error);
	}

	.invalid .phone-input,
	.invalid .country-trigger {
		border-color: var(--error);
	}

	.invalid .phone-input:focus,
	.invalid .country-trigger:focus-visible {
		box-shadow: 0 0 0 3px rgba(198, 69, 69, 0.15);
		border-color: var(--error);
	}

	.warn .phone-input,
	.warn .country-trigger {
		border-color: var(--amber);
	}

	.warn .phone-input:focus,
	.warn .country-trigger:focus-visible {
		box-shadow: 0 0 0 3px rgba(232, 165, 90, 0.2);
		border-color: var(--amber);
	}

	.phone-input.warn {
		border-color: var(--amber);
	}

	.phone-input.warn:focus {
		box-shadow: 0 0 0 3px rgba(232, 165, 90, 0.2);
		border-color: var(--amber);
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
