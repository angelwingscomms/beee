<script lang="ts">
	import { ClipboardCheck, BadgeCheck, Users, Trophy } from '@lucide/svelte'

	let items = $state([
		{ icon: ClipboardCheck, title: 'Development Programme', subtitle: 'Progress Tracking' },
		{ icon: BadgeCheck, title: 'Digital Passport', subtitle: 'Achievements & Badges' },
		{ icon: Users, title: 'Mentorship', subtitle: 'Leadership & Growth' },
		{ icon: Trophy, title: 'Championship', subtitle: 'Grand Finale' },
	])
</script>

<section class="section-band section-soft">
	<div class="container">
		<div class="trust-strip">
			{#each items as item}
				<div class="trust-card">
					<div class="trust-icon">
						<item.icon size={28} color="var(--primary)" />
					</div>
					<div class="trust-text">
						<strong>{item.title}</strong>
						<span>{item.subtitle}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.trust-strip {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}

	.trust-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 24px 28px;
		border-radius: 14px;
		background: var(--surface-card);
		border: 1px solid var(--hairline);
		box-shadow: var(--shadow-soft);
		transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1),
			border-color 300ms ease,
			background 300ms ease;
	}
	.trust-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 28px rgba(242, 120, 48, 0.12);
		border-color: color-mix(in srgb, var(--hairline) 60%, var(--primary));
		background: color-mix(in srgb, var(--surface-card) 92%, var(--primary));
	}

	.trust-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		border-radius: 12px;
		background: color-mix(in srgb, var(--surface-card) 85%, var(--primary));
		flex-shrink: 0;
		transition: background 300ms ease, transform 300ms ease;
	}
	.trust-card:hover .trust-icon {
		background: color-mix(in srgb, var(--surface-card) 70%, var(--primary));
		transform: scale(1.05);
	}

	.trust-text strong {
		display: block;
		font-size: 15px;
		font-weight: 600;
		color: var(--ink);
		line-height: 1.3;
	}

	.trust-text span {
		display: block;
		font-size: 13px;
		color: var(--muted);
		margin-top: 3px;
	}

	@media (max-width: 767px) {
		.trust-strip {
			grid-template-columns: repeat(2, 1fr);
			gap: 16px;
		}

		.trust-card {
			padding: 20px 24px;
		}

		.trust-icon {
			width: 48px;
			height: 48px;
		}
	}

	@media (max-width: 480px) {
		.trust-strip {
			grid-template-columns: 1fr;
		}

		.trust-card {
			padding: 18px 22px;
		}
	}
</style>
