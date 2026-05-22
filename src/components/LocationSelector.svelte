<script lang="ts">
	import LocationInput from './LocationInput.svelte';

	interface Location {
		lat: number;
		lng: number;
		address: string;
	}

	let {
		location = $bindable<Location | null>(null)
	}: {
		location: Location | null;
	} = $props();
</script>

<section class="form-section" aria-labelledby="location-selector-title">
	<div class="form-section-header">
		<h3 id="location-selector-title">Location</h3>
		<span>School site</span>
	</div>

	<LocationInput bind:location />
</section>
