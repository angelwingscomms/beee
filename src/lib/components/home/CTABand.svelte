<script lang="ts">
	let {
		heading = '',
		description = '',
		button_text = 'Register Now',
		button_href = '/register',
		variant = 'coral' as 'coral' | 'dark',
	}: {
		heading: string;
		description: string;
		button_text?: string;
		button_href?: string;
		variant?: 'coral' | 'dark';
	} = $props();
</script>

<section class="section-band {variant === 'dark' ? 'section-dark' : ''}">
	<div class="container">
		<div class="cta-card">
			<div>
				<h2 class="display-sm" style="margin: 0">{heading}</h2>
				{#if description}
					<p>{description}</p>
				{/if}
			</div>
			<a href={button_href} class="button-primary cta-entrance">{button_text}</a>
		</div>
	</div>
</section>
