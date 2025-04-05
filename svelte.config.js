import adapter from "@sveltejs/adapter-static";
import {vitePreprocess} from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html'
		}),
		alias: {
			lib: 'src/lib',
			components: 'src/components',
			store: 'src/store'
		},
		prerender: {
			entries: ['*']
		}
	},
	preprocess: vitePreprocess()
};

export default config;
