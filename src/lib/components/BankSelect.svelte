<script lang="ts">
	import { banks as staticBanks, type Bank } from '$lib/data/banks';

	let {
		value = '',
		onChange
	}: {
		value?: string;
		onChange?: (b: { n: string; c: string } | null) => void;
	} = $props();

	let open = $state(false);
	let search = $state('');
	let searchRef = $state<HTMLInputElement | null>(null);
	let listRef = $state<HTMLUListElement | null>(null);
	let activeIdx = $state(0);

	let selectedBank = $state<Bank | null>(null);
	let banks = $state<Bank[]>(staticBanks);

	$effect(() => {
		fetch('/api/banks')
			.then(r => r.json())
			.then(fresh => {
				if (fresh?.banks) {
					banks = fresh.banks.map((fb: { n: string; c: string }) => {
						const s = staticBanks.find(sb => sb.c === fb.c);
						return { n: fb.n, c: fb.c, a: s?.a || [] };
					});
				}
			})
			.catch(() => {});
	});

	$effect(() => {
		if (value) {
			const m = banks.find(
				b => b.n.toLowerCase() === value.toLowerCase() || b.a.some(a => a.toLowerCase() === value.toLowerCase())
			);
			if (m) {
				selectedBank = m;
				onChange?.({ n: m.n, c: m.c });
			}
		}
	});

	let filtered = $derived(
		search
			? banks.filter(
					b =>
						b.n.toLowerCase().includes(search.toLowerCase()) ||
						b.a.some(a => a.toLowerCase().includes(search.toLowerCase()))
				)
			: banks
	);

	$effect(() => {
		if (open) {
			activeIdx = 0;
			search = '';
			requestAnimationFrame(() => searchRef?.focus());
		}
	});

	function selectBank(b: Bank) {
		selectedBank = b;
		open = false;
		onChange?.({ n: b.n, c: b.c });
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
			selectBank(filtered[activeIdx]);
		} else if (e.key === 'Escape') {
			open = false;
		}
	}

	function onBackdropClick() {
		open = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bank-select" onclick={(e) => e.stopPropagation()} onkeydown={handleKeydown}>
	<button
		type="button"
		class="bank-trigger"
		class:has-value={!!selectedBank}
		onclick={toggleOpen}
		aria-expanded={open}
		aria-haspopup="listbox"
		aria-label="Select bank"
	>
		<span class="trigger-label">{selectedBank?.n || value || 'Select bank...'}</span>
		<svg class="chevron" class:chevron-up={open} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
			<path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>

	{#if open}
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<div class="dropdown-backdrop" onclick={onBackdropClick}></div>
		<div class="dropdown-panel" role="listbox" aria-label="Banks">
			<div class="search-wrap">
				<input
					type="text"
					class="search-input"
					placeholder="Search bank..."
					bind:value={search}
					bind:this={searchRef}
					role="searchbox"
				/>
			</div>
			<ul class="bank-list" bind:this={listRef}>
				{#each filtered as bank, i}
					<li>
						<button
							type="button"
							class="bank-option"
							class:active={i === activeIdx}
							class:selected={bank.c === selectedBank?.c}
							role="option"
							aria-selected={bank.c === selectedBank?.c}
							onclick={() => selectBank(bank)}
							onmouseenter={() => (activeIdx = i)}
						>
							<span class="bank-name">{bank.n}</span>
						</button>
					</li>
				{/each}
				{#if filtered.length === 0}
					<li class="no-results">No banks found</li>
				{/if}
			</ul>
		</div>
	{/if}
</div>

<style>
	.bank-select {
		position: relative;
		width: 100%;
	}

	.bank-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
		width: 100%;
		min-height: 40px;
		padding: 0 14px;
		border-radius: 8px;
		background: var(--canvas);
		color: var(--muted);
		cursor: pointer;
		font-size: 12px;
		line-height: 40px;
		outline: none;
		white-space: nowrap;
	}

	.bank-trigger.has-value {
		color: var(--ink);
	}

	.trigger-label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
	}

	.chevron {
		color: var(--muted);
		transition: transform 180ms var(--ease-out);
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
		width: 100%;
		min-width: 280px;
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

	.bank-list {
		list-style: none;
		margin: 0;
		padding: 4px;
		overflow-y: auto;
		flex: 1;
	}

	.bank-option {
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

	.bank-option:hover,
	.bank-option.active {
		background: var(--surface-soft);
	}

	.bank-option.selected {
		font-weight: 500;
		color: var(--ink);
		background: var(--surface-card);
	}

	.bank-name {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.no-results {
		padding: 20px 12px;
		color: var(--muted);
		font-size: 13px;
		text-align: center;
	}
</style>
