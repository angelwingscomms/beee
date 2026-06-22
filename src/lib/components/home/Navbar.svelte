<script lang="ts">
	import { Menu, X } from '@lucide/svelte';

	let menu_open = $state(false);
	let active_hash = $state('');

	$effect(() => {
		active_hash = window.location.hash || '#about';
		const handler = () => active_hash = window.location.hash;
		window.addEventListener('hashchange', handler);
		return () => window.removeEventListener('hashchange', handler);
	});
</script>

<nav class="navbar">
	<div class="container navbar-inner">
		<a href="/" class="brand">
			<img src="/logo.svg" alt="BEEE" class="logo" />
		</a>

		<div class="nav-links">
			<a href="#about" class:active={active_hash === '#about'}>About</a>
			<a href="#teamp" class:active={active_hash === '#teamp'}>T.E.A.M.U.P.</a>
			<a href="#journey" class:active={active_hash === '#journey'}>Journey</a>
			<a href="#faq" class:active={active_hash === '#faq'}>FAQ</a>
			<a href="#register" class:active={active_hash === '#register'}>Register</a>
		</div>

		<div class="nav-actions">
			<a href="/register" class="button-primary">Register Now</a>
			<button
				class="mobile-toggle"
				onclick={() => menu_open = !menu_open}
				aria-label={menu_open ? 'Close menu' : 'Open menu'}
				aria-expanded={menu_open}
			>
				{#if menu_open}
					<X size={20} />
				{:else}
					<Menu size={20} />
				{/if}
			</button>
		</div>
	</div>
</nav>

<!-- Mobile overlay backdrop -->
<div class="mobile-backdrop" class:visible={menu_open} onclick={() => menu_open = false}></div>

<!-- Mobile slide-down menu -->
<div class="mobile-menu" class:open={menu_open}>
	<div class="mobile-menu-inner">
		<a href="#about" onclick={() => menu_open = false}>About</a>
		<a href="#teamp" onclick={() => menu_open = false}>T.E.A.M.U.P.</a>
		<a href="#journey" onclick={() => menu_open = false}>Journey</a>
		<a href="#faq" onclick={() => menu_open = false}>FAQ</a>
		<a href="#register" onclick={() => menu_open = false}>Register</a>
		<div class="mobile-divider"></div>
		<a href="/register" class="button-primary" onclick={() => menu_open = false}>Register Now</a>
	</div>
</div>

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
		background: color-mix(in srgb, var(--canvas) 86%, transparent);
		backdrop-filter: blur(18px);
		-webkit-backdrop-filter: blur(18px);
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
		flex-shrink: 0;
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
		justify-content: center;
		gap: 28px;
		flex: 1;
	}

	.nav-links a {
		position: relative;
		font-size: 14px;
		font-weight: 500;
		color: var(--muted);
		text-decoration: none;
		padding: 4px 0;
		transition: color 220ms ease;
	}

	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 50%;
		width: 0;
		height: 2px;
		border-radius: 2px;
		background: var(--primary);
		transition: width 260ms cubic-bezier(0.34, 1.56, 0.64, 1), left 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.nav-links a:hover,
	.nav-links a.active {
		color: var(--ink);
	}

	.nav-links a:hover::after,
	.nav-links a.active::after {
		width: 100%;
		left: 0;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-shrink: 0;
	}

	.button-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		padding: 0 22px;
		font-size: 14px;
		font-weight: 500;
		line-height: 1;
		border-radius: 8px;
		background: var(--primary);
		color: var(--on-primary);
		text-decoration: none;
		border: 1px solid var(--primary);
		transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
	}

	.button-primary:hover {
		background: var(--primary-active);
		border-color: var(--primary-active);
		transform: scale(1.02);
	}

	.button-primary:active {
		transform: scale(0.98);
	}

	.mobile-toggle {
		display: none;
		width: 40px;
		height: 40px;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--hairline);
		border-radius: 999px;
		background: transparent;
		color: var(--ink);
		cursor: pointer;
		transition: background 160ms ease, border-color 160ms ease;
		-webkit-tap-highlight-color: transparent;
	}

	.mobile-toggle:hover {
		background: var(--surface-soft);
		border-color: var(--surface-card);
	}

	.mobile-backdrop {
		display: none;
		position: fixed;
		z-index: 38;
		inset: 0;
		background: rgba(20, 20, 19, 0.28);
		opacity: 0;
		transition: opacity 280ms ease;
		-webkit-tap-highlight-color: transparent;
		-webkit-backdrop-filter: blur(4px);
		backdrop-filter: blur(4px);
	}

	.mobile-backdrop.visible {
		opacity: 1;
	}

	.mobile-menu {
		display: none;
		position: fixed;
		z-index: 39;
		top: 72px;
		right: 0;
		left: 0;
		background: var(--canvas);
		border-bottom: 1px solid var(--hairline);
		visibility: hidden;
		opacity: 0;
		transform: translateY(-16px);
		pointer-events: none;
		transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease, visibility 260ms ease;
		max-height: calc(100dvh - 72px);
		overflow-y: auto;
	}

	.mobile-menu.open {
		visibility: visible;
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.mobile-menu-inner {
		padding: 16px 24px 28px;
		display: grid;
		gap: 4px;
	}

	.mobile-menu-inner a {
		display: flex;
		align-items: center;
		padding: 14px 12px;
		font-size: 15px;
		font-weight: 500;
		color: var(--ink);
		text-decoration: none;
		border-radius: 8px;
		transition: background 160ms ease, color 160ms ease;
		-webkit-tap-highlight-color: transparent;
	}

	.mobile-menu-inner a:hover {
		background: var(--surface-soft);
		color: var(--primary);
	}

	.mobile-menu-inner .button-primary {
		display: flex;
		justify-content: center;
		margin-top: 8px;
		padding: 14px 12px;
		height: auto;
		color: var(--on-primary);
	}

	.mobile-menu-inner .button-primary:hover {
		color: var(--on-primary);
	}

	.mobile-divider {
		height: 1px;
		background: var(--hairline);
		margin: 8px 12px;
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
		.mobile-backdrop {
			display: block;
		}
		.mobile-menu {
			display: block;
		}
	}
</style>
