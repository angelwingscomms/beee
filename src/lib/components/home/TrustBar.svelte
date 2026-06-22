<script lang="ts">
	import { ClipboardCheck, BadgeCheck, Users, Trophy } from '@lucide/svelte'

	const items = [
		{ icon: ClipboardCheck, title: 'Development Programme', subtitle: 'Progress Tracking' },
		{ icon: BadgeCheck, title: 'Digital Passport', subtitle: 'Achievements & Badges' },
		{ icon: Users, title: 'Mentorship', subtitle: 'Leadership & Growth' },
		{ icon: Trophy, title: 'Championship', subtitle: 'Grand Finale' },
	]
</script>

<section class="section-band section-soft">
	<div class="container">
		<div class="trust-strip">
			{#each items as item}
				<div class="trust-item">
					<svelte:component this={item.icon} size={28} color="var(--primary)" />
					<div>
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
		gap: 16px;
	}

	.trust-item {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 20px 24px;
		border-radius: 12px;
		background: var(--surface-card);
	}

	.trust-item strong {
		display: block;
		font-size: 15px;
		font-weight: 600;
		color: var(--ink);
		line-height: 1.3;
	}

	.trust-item span {
		display: block;
		font-size: 13px;
		color: var(--muted);
		margin-top: 2px;
	}

	@media (max-width: 767px) {
		.trust-strip {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.trust-strip {
			grid-template-columns: 1fr;
		}

		.trust-item {
			padding: 16px 20px;
		}
	}
</style>
