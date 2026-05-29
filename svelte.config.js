import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: true
	},
	vitePlugin: {
		dynamicCompileOptions({ filename }) {
			if (filename.includes('node_modules')) {
				return { runes: false };
			}
		}
	},
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
			$lib: 'src/lib'
		}
	}
};

export default config;
