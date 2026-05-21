<script lang="ts">
	import { onMount } from 'svelte';

	export let location: { lat: number; lng: number; address: string } | null = null;

	let searchQuery = '';
	let searchResults: Array<{ name: string; lat: number; lng: number }> = [];
	let showSearchDropdown = false;
	let mapContainer: HTMLDivElement;
	let map: any = null;
	let marker: any = null;
	let mapLink = '';
	let activeTab = 'search'; // 'search', 'map', or 'link'

	// Mock locations for search autocomplete
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

		searchResults = mockLocations.filter(loc =>
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

	function initMap() {
		// Create a simple embedded map (using a static image for demo)
		if (mapContainer) {
			mapContainer.innerHTML = `
				<div class="w-full h-96 bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg border-2 border-gray-300 flex items-center justify-center cursor-pointer" id="mapElement">
					<div class="text-center">
						<svg class="w-16 h-16 mx-auto text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
						</svg>
						<p class="text-gray-700 font-semibold">Click to set location on map</p>
						<p class="text-gray-500 text-sm mt-2">Demo: Using University of Lagos</p>
					</div>
				</div>
			`;

			const mapElement = document.getElementById('mapElement');
			if (mapElement) {
				mapElement.addEventListener('click', () => {
					// Default to University of Lagos
					location = {
						lat: 6.5244,
						lng: 3.3792,
						address: 'University of Lagos, Lagos'
					};
				});
			}
		}
	}

	function handleMapLink() {
		if (!mapLink.trim()) {
			return;
		}

		// Parse Google Maps link to extract coordinates
		let lat = 6.5244;
		let lng = 3.3792;
		let address = 'Location from Google Maps';

		// Try to extract coordinates from link
		const coordMatch = mapLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
		if (coordMatch) {
			lat = parseFloat(coordMatch[1]);
			lng = parseFloat(coordMatch[2]);
		}

		// Try to extract location name
		const nameMatch = mapLink.match(/search\/(.+?)\/|place\/(.+?)\//);
		if (nameMatch) {
			address = decodeURIComponent(nameMatch[1] || nameMatch[2]).replace(/\+/g, ' ');
		}

		location = { lat, lng, address };
	}

	onMount(() => {
		initMap();
	});
</script>

<div class="space-y-4">
	<!-- Tabs -->
	<div class="flex gap-2 border-b">
		<button
			type="button"
			on:click={() => (activeTab = 'search')}
			class="px-4 py-2 font-semibold {activeTab === 'search'
				? 'border-b-2 border-blue-600 text-blue-600'
				: 'text-gray-600 hover:text-gray-900'}"
		>
			Search Places
		</button>
		<button
			type="button"
			on:click={() => (activeTab = 'map')}
			class="px-4 py-2 font-semibold {activeTab === 'map'
				? 'border-b-2 border-blue-600 text-blue-600'
				: 'text-gray-600 hover:text-gray-900'}"
		>
			Map
		</button>
		<button
			type="button"
			on:click={() => (activeTab = 'link')}
			class="px-4 py-2 font-semibold {activeTab === 'link'
				? 'border-b-2 border-blue-600 text-blue-600'
				: 'text-gray-600 hover:text-gray-900'}"
		>
			Paste Link
		</button>
	</div>

	<!-- Search Tab -->
	{#if activeTab === 'search'}
		<div class="relative">
			<div class="relative">
				<input
					type="text"
					placeholder="Search for your school location..."
					bind:value={searchQuery}
					on:input={handleSearch}
					on:focus={() => searchResults.length > 0 && (showSearchDropdown = true)}
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
				/>
				<svg
					class="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path>
				</svg>
			</div>

			{#if showSearchDropdown && searchResults.length > 0}
				<div class="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
					{#each searchResults as result (result.name)}
						<button
							type="button"
							on:click={() => selectLocation(result)}
							class="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition"
						>
							<p class="font-semibold text-gray-900">{result.name}</p>
							<p class="text-xs text-gray-500">{result.lat.toFixed(4)}, {result.lng.toFixed(4)}</p>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	<!-- Map Tab -->
	{#if activeTab === 'map'}
		<div bind:this={mapContainer}></div>
	{/if}

	<!-- Paste Link Tab -->
	{#if activeTab === 'link'}
		<div class="space-y-3">
			<input
				type="text"
				placeholder="Paste Google Maps link here (e.g., https://maps.google.com/...)"
				bind:value={mapLink}
				class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
			/>
			<button
				type="button"
				on:click={handleMapLink}
				class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
			>
				Extract Location from Link
			</button>
		</div>
	{/if}

	<!-- Selected Location Display -->
	{#if location}
		<div class="bg-green-50 border-2 border-green-300 rounded-lg p-4">
			<div class="flex items-start gap-3">
				<svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clip-rule="evenodd"
					></path>
				</svg>
				<div class="flex-1">
					<p class="font-semibold text-green-900">{location.address}</p>
					<p class="text-sm text-green-700">Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
				</div>
			</div>
		</div>
	{/if}
</div>
