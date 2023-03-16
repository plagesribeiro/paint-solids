import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			components: 'src/components',
			stores: 'src/stores',
			services: 'src/services',
			assets: 'src/assets'
		}
	},
	preprocess: vitePreprocess()
};

export default config;
