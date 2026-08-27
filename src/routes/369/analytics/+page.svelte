<script lang="ts">
	let { data } = $props();
	let pw = $state('');
	let err = $state('');
	let loading = $state(false);

	async function login(e: Event) {
		e.preventDefault();
		err = '';
		loading = true;
		try {
			const res = await fetch('/api/analytics-auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password: pw })
			});
			const j = await res.json();
			if (!res.ok) throw new Error(j.error || 'failed');
			location.reload();
		} catch (ex: any) {
			err = ex.message || 'invalid password';
		} finally {
			loading = false;
		}
	}

	async function logout() {
		await fetch('/api/analytics-auth', { method: 'DELETE' });
		location.reload();
	}
</script>

<svelte:head>
	<title>analytics — beee</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-[#0A0F1A] text-white px-4 py-10">
	<div class="mx-auto max-w-6xl">
		{#if !data.authed}
			<div class="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8">
				<h1 class="text-xl font-semibold tracking-tight">analytics login</h1>
				<p class="mt-1 text-sm text-white/60">enter password to view dashboard</p>
				<form onsubmit={login} class="mt-6 space-y-4">
					<input
						type="password"
						bind:value={pw}
						placeholder="password"
						autocomplete="current-password"
						class="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/20"
					/>
					{#if err}
						<p class="text-sm text-red-400">{err}</p>
					{/if}
					<button
						type="submit"
						disabled={loading || !pw}
						class="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-black disabled:opacity-40"
					>
						{loading ? 'checking...' : 'enter'}
					</button>
				</form>
			</div>
		{:else}
			<div class="flex flex-wrap items-center justify-between gap-4">
				<h1 class="text-2xl font-semibold tracking-tight">analytics</h1>
				<div class="flex items-center gap-2">
					<a href="?range=24h" class="rounded-full border px-3 py-1 text-xs {data.range === '24h' ? 'bg-white text-black border-white' : 'border-white/15 text-white/70'}">24h</a>
					<a href="?range=7d" class="rounded-full border px-3 py-1 text-xs {data.range === '7d' ? 'bg-white text-black border-white' : 'border-white/15 text-white/70'}">7d</a>
					<a href="?range=30d" class="rounded-full border px-3 py-1 text-xs {data.range === '30d' ? 'bg-white text-black border-white' : 'border-white/15 text-white/70'}">30d</a>
					<button onclick={logout} class="ml-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">logout</button>
				</div>
			</div>

			<div class="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
				<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
					<div class="text-xs text-white/50">total events</div>
					<div class="mt-1 text-2xl font-semibold">{data.stats.total}</div>
					<div class="text-xs text-white/40">{data.stats.days}d range</div>
				</div>
				<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
					<div class="text-xs text-white/50">page views</div>
					<div class="mt-1 text-2xl font-semibold">{data.stats.pv}</div>
					<div class="text-xs text-white/40">pv events</div>
				</div>
				<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
					<div class="text-xs text-white/50">clicks</div>
					<div class="mt-1 text-2xl font-semibold">{data.stats.clicks}</div>
					<div class="text-xs text-white/40">tracked clicks</div>
				</div>
				<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
					<div class="text-xs text-white/50">unique visitors</div>
					<div class="mt-1 text-2xl font-semibold">{data.stats.unique_ips}</div>
					<div class="text-xs text-white/40">ip hash</div>
				</div>
				<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
					<div class="text-xs text-white/50">live 30m</div>
					<div class="mt-1 text-2xl font-semibold">{data.stats.live}</div>
					<div class="text-xs text-emerald-400">last 30 min</div>
				</div>
			</div>

			<div class="mt-6 grid gap-4 md:grid-cols-2">
				<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
					<h2 class="text-sm font-medium">trend</h2>
					{#if data.trend.length === 0}
						<p class="mt-3 text-xs text-white/40">no data yet — visits will appear after beacon is live</p>
					{:else}
						<div class="mt-3 space-y-1">
							{#each data.trend as [day, n]}
								<div class="flex items-center justify-between text-xs">
									<span class="text-white/60">{day}</span>
									<span class="font-medium">{n}</span>
								</div>
							{/each}
						</div>
					{/if}
				</div>
				<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
					<h2 class="text-sm font-medium">top pages</h2>
					{#if data.top_pages.length === 0}
						<p class="mt-3 text-xs text-white/40">no pages yet</p>
					{:else}
						<div class="mt-3 space-y-1">
							{#each data.top_pages as [p, n]}
								<div class="flex items-center justify-between text-xs">
									<span class="truncate pr-4 text-white/60">{p}</span>
									<span class="font-medium">{n}</span>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<div class="mt-4 grid gap-4 md:grid-cols-3">
				<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
					<h2 class="text-sm font-medium">top referrers</h2>
					<div class="mt-3 space-y-1">
						{#each data.top_refs as [r, n]}
							<div class="flex items-center justify-between text-xs">
								<span class="truncate pr-4 text-white/60">{r}</span>
								<span class="font-medium">{n}</span>
							</div>
						{/each}
						{#if data.top_refs.length === 0}<p class="text-xs text-white/40">no data</p>{/if}
					</div>
				</div>
				<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
					<h2 class="text-sm font-medium">by country</h2>
					<div class="mt-3 space-y-1">
						{#each data.top_countries as [c, n]}
							<div class="flex items-center justify-between text-xs">
								<span class="text-white/60">{c}</span>
								<span class="font-medium">{n}</span>
							</div>
						{/each}
						{#if data.top_countries.length === 0}<p class="text-xs text-white/40">no data</p>{/if}
					</div>
				</div>
				<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
					<h2 class="text-sm font-medium">partner codes (c param)</h2>
					<div class="mt-3 space-y-1">
						{#each data.top_partners as [c, n]}
							<div class="flex items-center justify-between text-xs">
								<span class="text-white/60">{c}</span>
								<span class="font-medium">{n}</span>
							</div>
						{/each}
						{#if data.top_partners.length === 0}<p class="text-xs text-white/40">no partner traffic yet — share links like ?c=CODE</p>{/if}
					</div>
				</div>
			</div>

			<div class="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
				<h2 class="text-sm font-medium">recent activity</h2>
				<div class="mt-3 overflow-x-auto">
					<table class="w-full text-left text-xs">
						<thead class="text-white/40">
							<tr>
								<th class="py-2 font-normal">time</th>
								<th class="py-2 font-normal">kind</th>
								<th class="py-2 font-normal">path</th>
								<th class="py-2 font-normal">ip</th>
								<th class="py-2 font-normal">country</th>
							</tr>
						</thead>
						<tbody>
							{#each data.recent as e}
								<tr class="border-t border-white/5">
									<td class="py-2 text-white/60">{new Date(e.d).toLocaleString()}</td>
									<td class="py-2"><span class="rounded-full bg-white/10 px-2 py-0.5">{e.k}</span></td>
									<td class="max-w-[260px] truncate py-2 text-white/70">{e.u}</td>
									<td class="py-2 text-white/50">{e.ip_trunc || '—'}</td>
									<td class="py-2 text-white/50">{e.co || '—'}</td>
								</tr>
							{/each}
							{#if data.recent.length === 0}
								<tr><td colspan="5" class="py-6 text-center text-white/40">no events yet — browse the site to generate data</td></tr>
							{/if}
						</tbody>
					</table>
				</div>
			</div>

			<p class="mt-6 text-xs text-white/30">private dashboard — not indexed, no-store, analytics_auth httpOnly cookie, 12h expiry, rate limited</p>
		{/if}
	</div>
</div>
