import preprocess from 'svelte-preprocess';

import tailwindcss from 'tailwindcss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			css: {
				postcss: {
					plugins: [
						tailwindcss,
					]
				}
			}
		}
	}
};

export default config;
