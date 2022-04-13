import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import resolveConfig from 'tailwindcss/resolveConfig.js';
import twConfig from './tailwind.config.cjs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
			replace: [['tailwindcss.config', JSON.stringify(resolveConfig(twConfig))]]
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
