import { defineConfig } from 'vite';
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
});
