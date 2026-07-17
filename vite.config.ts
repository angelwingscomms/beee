import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [enhancedImages(), tailwindcss(), sveltekit()],
	server: {
		port: 5173,
	},
	optimizeDeps: {
		exclude: ['svelte-chess'],
	},
	test: {
		// e2e specs live under e2e/ and run via Playwright, not vitest.
		exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
	},
});
