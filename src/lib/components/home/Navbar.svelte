<script lang="ts">
	import { Menu, X } from '@lucide/svelte';

	let menu_open = $state(false);
</script>

<nav class="navbar">
	<div class="container navbar-inner">
		<a href="/" class="brand">
			<img src="/logo.svg" alt="BEEE" class="logo" />
		</a>
		<div class="nav-links">
			<a href="#about">About</a>
			<a href="#teamp">T.E.A.M.U.P.</a>
			<a href="#journey">Journey</a>
			<a href="#faq">FAQ</a>
			<a href="#register">Register</a>
		</div>
		<div class="nav-actions">
			<a href="/register" class="button-primary">Register Now</a>
			<button class="mobile-toggle" onclick={() => menu_open = !menu_open} aria-label="Toggle menu">
				{#if menu_open}
					<X size={20} />
				{:else}
					<Menu size={20} />
				{/if}
			</button>
		</div>
	</div>
	{#if menu_open}
		<div class="mobile-menu">
			<a href="#about" onclick={() => menu_open = false}>About</a>
			<a href="#teamp" onclick={() => menu_open = false}>T.E.A.M.U.P.</a>
			<a href="#journey" onclick={() => menu_open = false}>Journey</a>
			<a href="#faq" onclick={() => menu_open = false}>FAQ</a>
			<a href="#register" onclick={() => menu_open = false}>Register</a>
			<a href="/register" class="button-primary" onclick={() => menu_open = false}>Register Now</a>
		</div>
	{/if}
</nav>

<style>
	.container {
		width: min(1200px, calc(100% - 48px));
		margin: 0 auto;
	}
	.navbar {
		position: sticky;
		top: 0;
		z-index: 40;
		height: 72px;
		background: rgba(250, 249, 245, 0.92);
		backdrop-filter: blur(18px);
		border-bottom: 1px solid var(--hairline-soft);
	}
	.navbar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 72px;
		gap: 24px;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-size: 18px;
		font-weight: 600;
		color: var(--ink);
		text-decoration: none;
	}
	.logo {
		height: 36px;
		width: auto;
		display: block;
	}
	.nav-links {
		display: flex;
		align-items: center;
		gap: 22px;
		font-size: 14px;
		font-weight: 500;
		color: var(--ink);
	}
	.nav-links a {
		position: relative;
		color: var(--ink);
		text-decoration: none;
		transition: color 160ms ease;
	}
	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 2px;
		border-radius: 2px;
		background: var(--primary);
		transition: width 220ms cubic-bezier(.34,1.56,.64,1);
	}
	.nav-links a:hover {
		color: var(--primary);
	}
	.nav-links a:hover::after {
		width: 100%;
	}
	.nav-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.mobile-toggle {
		display: none;
		width: 40px;
		height: 40px;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--hairline);
		border-radius: 999px;
		background: var(--canvas);
		color: var(--ink);
		cursor: pointer;
		transition: background 160ms ease;
	}
	.mobile-toggle:hover {
		background: var(--surface-soft);
	}
	.mobile-menu {
		position: fixed;
		z-index: 25;
		top: 72px;
		right: 0;
		left: 0;
		display: grid;
		gap: 14px;
		border-bottom: 1px solid var(--hairline);
		background: var(--canvas);
		padding: 24px;
	}
	.mobile-menu a {
		color: var(--ink);
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
		transition: color 160ms ease;
	}
	.mobile-menu a:hover {
		color: var(--primary);
	}
	@media (max-width: 767px) {
		.nav-links {
			display: none;
		}
		.nav-actions .button-primary {
			display: none;
		}
		.mobile-toggle {
			display: inline-flex;
		}
	}
</style>
