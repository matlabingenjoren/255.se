import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import { imagetools } from 'vite-imagetools'
import path from 'path'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import twConfig from './tailwind.config.cjs'
import { doSync } from 'do-sync'
import rehypeSlug from 'rehype-slug'

/** @type {import('vite-imagetools').OutputFormat} */
const imageFormat = () => (metadatas) => {
  const formats = {}
  metadatas.forEach((meta) => {
    if (!(meta.format in formats)) {
      formats[meta.format] = []
    }
    formats[meta.format].push(meta)
  })

  const sources = Object.entries(formats).map(([format, metas]) => ({
    srcset: metas.map((meta) => `${meta.src} ${meta.width}w`).join(', '),
    type: `image/${format}`,
  }))

  const file = metadatas[0].image.options.input.file
  const data = doSync(async (file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sharp = require('sharp')
    return (await sharp(file).resize({ width: 20 }).png().toBuffer()).toString('base64')
  })(file)

  return {
    sources,
    placeholder: `data:image/png;base64,${data}`,
    alt: path.parse(file).name,
  }
}

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
    vite: {
      plugins: [
        imagetools({
          extendOutputFormats: (defaults) => ({ ...defaults, Image: imageFormat }),
        }),
      ],
    },
    prerender: {
      default: true,
    },
  },
}

export default config
