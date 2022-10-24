/// <reference types="./src/app" />

import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import twConfig from './tailwind.config.cjs'
import rehypeSlug from 'rehype-slug'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex({
      layout: {
        _: './src/lib/MDLayout.svelte',
      },
      smartypants: {
        quotes: false,
        dashes: 'oldschool',
      },
      rehypePlugins: [rehypeSlug],
    }),
    preprocess({
      postcss: true,
      replace: [[/tailwindcss\.config/g, JSON.stringify(resolveConfig(twConfig))]],
    }),
  ],

  extensions: ['.svelte', '.svx'],

  kit: {
    adapter: adapter(),
  },
}

export default config
