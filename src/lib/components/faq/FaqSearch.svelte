<script lang="ts">
	let { value = $bindable('') }: { value?: string } = $props();

	function handleInput(e: Event) {
		const t = e.target as HTMLInputElement;
		value = t.value;
	}

	function clear() {
		value = '';
	}
</script>

<div class="faq-search">
	<label for="faq-search" class="sr-only">Search FAQs</label>
	<div class="search-icon">
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</div>
	<input
		id="faq-search"
		type="search"
		placeholder="Search FAQs..."
		{value}
		oninput={handleInput}
		class="search-input"
	/>
	{#if value}
		<button onclick={clear} class="search-clear" aria-label="Clear search">
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
				<path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
		</button>
	{/if}
</div>

<style>
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}

	.faq-search {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		max-width: 480px;
		height: 48px;
		border-radius: 10px;
		border: 1px solid var(--hairline);
		background: var(--canvas);
		transition: border-color 160ms ease, box-shadow 160ms ease;
	}

	.faq-search:focus-within {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px rgba(242, 120, 48, 0.12);
	}

	.search-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		flex-shrink: 0;
		color: var(--muted);
	}

	.search-input {
		flex: 1;
		height: 100%;
		border: none;
		background: transparent;
		color: var(--ink);
		font-size: 15px;
		font-family: inherit;
		padding: 0 12px 0 0;
		outline: none;
	}

	.search-input::placeholder {
		color: var(--muted-soft);
	}

	.search-clear {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		margin-right: 6px;
		border: none;
		border-radius: 8px;
		background: transparent;
		color: var(--muted);
		cursor: pointer;
		flex-shrink: 0;
		transition: background 160ms ease, color 160ms ease;
	}

	.search-clear:hover {
		background: var(--surface-card);
		color: var(--ink);
	}
</style>
