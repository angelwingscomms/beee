<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let location: { lat: number; lng: number; address: string } | null = null;

  const dispatch = createEventDispatcher();

  let activeTab: 'search' | 'map' | 'paste' = 'search';
  let searchInput = '';
  let mapLink = '';
  let showMap = false;
  let mapCoords = { lat: 6.5244, lng: 3.3792 }; // Lagos, Nigeria default

  function handleSearch() {
    if (searchInput.trim()) {
      // Mock geocoding - in production, use Google Places API
      const mockResults = [
        { address: 'University of Lagos, Akoka, Lagos', lat: 6.5244, lng: 3.3792 },
        { address: 'Covenant University, Ota, Ogun State', lat: 6.6988, lng: 3.2753 },
        { address: 'University of Ibadan, Oyo State', lat: 7.3697, lng: 3.9062 },
        { address: 'Ahmadu Bello University, Zaria', lat: 11.1621, lng: 7.6397 },
      ];

      const result = mockResults.find((r) =>
        r.address.toLowerCase().includes(searchInput.toLowerCase())
      ) || {
        address: searchInput,
        lat: 6.5244 + Math.random() * 5,
        lng: 3.3792 + Math.random() * 5,
      };

      selectLocation(result.address, result.lat, result.lng);
      searchInput = '';
    }
  }

  function selectMapLocation() {
    selectLocation(`Location: ${mapCoords.lat.toFixed(4)}, ${mapCoords.lng.toFixed(4)}`, mapCoords.lat, mapCoords.lng);
    showMap = false;
  }

  function parsePasteLink() {
    if (mapLink.trim()) {
      // Parse Google Maps link or coordinates
      let lat = 6.5244;
      let lng = 3.3792;
      let address = mapLink;

      // Try to extract coordinates from URL
      const coordMatch = mapLink.match(/@([-\d.]+),([-\d.]+)/);
      if (coordMatch) {
        lat = parseFloat(coordMatch[1]);
        lng = parseFloat(coordMatch[2]);
        address = `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }

      selectLocation(address, lat, lng);
      mapLink = '';
    }
  }

  function selectLocation(address: string, lat: number, lng: number) {
    location = { address, lat, lng };
    dispatch('locationChange', location);
  }

  function toggleMap() {
    showMap = !showMap;
    if (showMap) {
      activeTab = 'map';
    }
  }
</script>

<div class="bg-secondary rounded-lg p-8 border border-secondary-light">
  <h2 class="text-2xl font-bold text-foreground mb-6">Location</h2>

  <!-- Tab Navigation -->
  <div class="flex gap-2 mb-6 border-b border-secondary-light">
    <button
      on:click={() => (activeTab = 'search')}
      class={`px-4 py-2 font-medium transition-colors ${
        activeTab === 'search'
          ? 'text-primary border-b-2 border-primary'
          : 'text-muted hover:text-foreground'
      }`}
    >
      Search
    </button>
    <button
      on:click={() => (activeTab = 'map')}
      class={`px-4 py-2 font-medium transition-colors ${
        activeTab === 'map'
          ? 'text-primary border-b-2 border-primary'
          : 'text-muted hover:text-foreground'
      }`}
    >
      Map
    </button>
    <button
      on:click={() => (activeTab = 'paste')}
      class={`px-4 py-2 font-medium transition-colors ${
        activeTab === 'paste'
          ? 'text-primary border-b-2 border-primary'
          : 'text-muted hover:text-foreground'
      }`}
    >
      Paste Link
    </button>
  </div>

  <!-- Search Tab -->
  {#if activeTab === 'search'}
    <div class="space-y-3">
      <input
        type="text"
        bind:value={searchInput}
        placeholder="Search for your school location..."
        class="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-primary"
      />
      <button
        type="button"
        on:click={handleSearch}
        class="w-full bg-primary hover:bg-primary-dark text-background font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Search Location
      </button>
      <p class="text-sm text-muted">
        Try: "University of Lagos" or "Covenant University"
      </p>
    </div>
  {/if}

  <!-- Map Tab -->
  {#if activeTab === 'map'}
    <div class="space-y-4">
      <div class="bg-secondary-light rounded-lg p-4 h-64 flex items-center justify-center border-2 border-secondary">
        <div class="text-center">
          <p class="text-muted mb-3">Interactive Map</p>
          <p class="text-sm text-muted mb-4">
            Coordinates: {mapCoords.lat.toFixed(4)}, {mapCoords.lng.toFixed(4)}
          </p>
          <div class="flex gap-2 justify-center mb-4">
            <button
              type="button"
              on:click={() => (mapCoords.lat += 0.1)}
              class="px-3 py-1 bg-primary hover:bg-primary-dark text-background rounded text-sm"
            >
              ↑ North
            </button>
            <button
              type="button"
              on:click={() => (mapCoords.lat -= 0.1)}
              class="px-3 py-1 bg-primary hover:bg-primary-dark text-background rounded text-sm"
            >
              ↓ South
            </button>
          </div>
          <div class="flex gap-2 justify-center">
            <button
              type="button"
              on:click={() => (mapCoords.lng -= 0.1)}
              class="px-3 py-1 bg-primary hover:bg-primary-dark text-background rounded text-sm"
            >
              ← West
            </button>
            <button
              type="button"
              on:click={() => (mapCoords.lng += 0.1)}
              class="px-3 py-1 bg-primary hover:bg-primary-dark text-background rounded text-sm"
            >
              → East
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        on:click={selectMapLocation}
        class="w-full bg-primary hover:bg-primary-dark text-background font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Confirm Location
      </button>
    </div>
  {/if}

  <!-- Paste Link Tab -->
  {#if activeTab === 'paste'}
    <div class="space-y-3">
      <textarea
        bind:value={mapLink}
        placeholder="Paste your Google Maps link or coordinates here..."
        class="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-primary h-24 resize-none"
      />
      <button
        type="button"
        on:click={parsePasteLink}
        class="w-full bg-primary hover:bg-primary-dark text-background font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Confirm from Link
      </button>
      <p class="text-sm text-muted">
        Example: https://maps.google.com/?q=6.5244,3.3792
      </p>
    </div>
  {/if}

  <!-- Selected Location Display -->
  {#if location}
    <div class="mt-6 p-4 bg-primary bg-opacity-10 border-2 border-primary rounded-lg">
      <p class="text-sm text-muted">Selected Location</p>
      <p class="text-foreground font-semibold">{location.address}</p>
      <p class="text-sm text-muted mt-1">
        Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
      </p>
    </div>
  {/if}
</div>
