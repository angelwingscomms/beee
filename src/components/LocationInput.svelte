<script lang="ts">
	interface Location {
		lat: number;
		lng: number;
		address: string;
	}

	type Tab = 'search' | 'map' | 'link';

	let {
		location = $bindable<Location | null>(null)
	}: {
		location: Location | null;
	} = $props();

	let searchQuery = $state('');
	let searchResults = $state<Array<{ name: string; lat: number; lng: number }>>([]);
	let showSearchDropdown = $state(false);
	let mapLink = $state('');
	let activeTab = $state<Tab>('search');
	let mapCoords = $state({ lat: 6.5244, lng: 3.3792 });

	const mockLocations = [
		{ name: 'University of Lagos, Lagos', lat: 6.5244, lng: 3.3792 },
		{ name: 'Federal University of Technology, Akure', lat: 7.2606, lng: 5.2477 },
		{ name: 'Covenant University, Ota', lat: 6.6753, lng: 3.0095 },
		{ name: 'University of Ibadan, Ibadan', lat: 7.3869, lng: 3.8955 },
		{ name: 'Ahmadu Bello University, Zaria', lat: 11.1921, lng: 7.6556 },
		{ name: 'Lagos State University, Lagos', lat: 6.5956, lng: 3.3969 },
		{ name: 'Obafemi Awolowo University, Ile-Ife', lat: 7.6439, lng: 4.5615 }
	];

	function handleSearch() {
		if (!searchQuery.trim()) {
			searchResults = [];
			showSearchDropdown = false;
			return;
		}

		searchResults = mockLocations.filter((loc) =>
			loc.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		showSearchDropdown = true;
	}

	function selectLocation(loc: (typeof mockLocations)[0]) {
		location = {
			lat: loc.lat,
			lng: loc.lng,
			address: loc.name
		};
		searchQuery = loc.name;
		searchResults = [];
		showSearchDropdown = false;
		activeTab = 'search';
	}

	function confirmMapLocation() {
		location = {
			lat: mapCoords.lat,
			lng: mapCoords.lng,
			address: `Location: ${mapCoords.lat.toFixed(4)}, ${mapCoords.lng.toFixed(4)}`
		};
		activeTab = 'search';
	}

	function nudgeMap(direction: 'north' | 'south' | 'west' | 'east') {
		const step = 0.1;
		if (direction === 'north') mapCoords.lat += step;
		if (direction === 'south') mapCoords.lat -= step;
		if (direction === 'west') mapCoords.lng -= step;
		if (direction === 'east') mapCoords.lng += step;
		mapCoords = { ...mapCoords };
	}

	function handleMapLink() {
		if (!mapLink.trim()) {
			return;
		}

		let lat = 6.5244;
		let lng = 3.3792;
		let address = 'Location from Google Maps';
		const coordMatch = mapLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
		const nameMatch = mapLink.match(/search\/(.+?)\/|place\/(.+?)\//);

		if (coordMatch) {
			lat = parseFloat(coordMatch[1]);
			lng = parseFloat(coordMatch[2]);
		}

		if (nameMatch) {
			address = decodeURIComponent(nameMatch[1] || nameMatch[2]).replace(/\+/g, ' ');
		}

		location = { lat, lng, address };
		mapLink = '';
		activeTab = 'search';
	}
</script>

<div>
	<div class="location-tabs" role="tablist" aria-label="Location input options">
		<button
			type="button"
			class:active={activeTab === 'search'}
			class="category-tab"
			onclick={() => (activeTab = 'search')}
		>
			search
		</button>
		<button
			type="button"
			class:active={activeTab === 'map'}
			class="category-tab"
			onclick={() => (activeTab = 'map')}
		>
			map
		</button>
		<button
			type="button"
			class:active={activeTab === 'link'}
			class="category-tab"
			onclick={() => (activeTab = 'link')}
		>
			paste link
		</button>
	</div>

	{#if activeTab === 'search'}
		<div class="location-search">
			<input
				type="text"
				class="text-input"
				placeholder="search for your school location"
				bind:value={searchQuery}
				oninput={handleSearch}
				onfocus={() => searchResults.length > 0 && (showSearchDropdown = true)}
			/>

			{#if showSearchDropdown && searchResults.length > 0}
				<div class="search-results">
					{#each searchResults as result (result.name)}
						<button type="button" class="search-result" onclick={() => selectLocation(result)}>
							{result.name}
							<span>{result.lat.toFixed(4)}, {result.lng.toFixed(4)}</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	{#if activeTab === 'map'}
		<div class="map-panel">
			<div class="map-pin"><span>B</span></div>
			<div class="map-copy">
				<strong>map focus</strong>
				<span>{mapCoords.lat.toFixed(4)}, {mapCoords.lng.toFixed(4)}</span>
			</div>
		</div>

		<div class="location-actions">
			<div class="coordinate-buttons">
				<button type="button" class="button-secondary" onclick={() => nudgeMap('north')}>
					north
				</button>
				<button type="button" class="button-secondary" onclick={() => nudgeMap('south')}>
					south
				</button>
				<button type="button" class="button-secondary" onclick={() => nudgeMap('west')}>west</button>
				<button type="button" class="button-secondary" onclick={() => nudgeMap('east')}>east</button>
			</div>

			<button type="button" class="button-primary" onclick={confirmMapLocation}>
				confirm location
			</button>
		</div>
	{/if}

	{#if activeTab === 'link'}
		<div class="location-actions">
			<textarea
				class="text-area"
				placeholder="paste a google maps link or coordinates"
				bind:value={mapLink}
			></textarea>
			<button type="button" class="button-primary" onclick={handleMapLink}>
				extract location
			</button>
		</div>
	{/if}

	{#if location}
		<div class="location-result">
			<h3>selected location</h3>
			<p>{location.address}</p>
			<p>{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
		</div>
	{/if}
</div>
