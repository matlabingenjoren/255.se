import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools } from 'vite-imagetools'
import doSync from 'do-sync'
import path from 'path'

/** @type {import('imagetools-core').OutputFormat} */
const imageFormat = () => (metadatas) => {
  /** @type {{[format: string]: typeof metadatas[number]}} */
  const formats = {}
  metadatas.forEach((meta) => {
    if (!(meta.format in formats)) {
      formats[meta.format] = []
    }
    formats[meta.format].push(meta)
  })

  /** @type {import('&Image').Srcset[]} */
  const sources = Object.entries(formats).map(([format, metas]) => ({
    srcset: metas.map((meta) => `${meta.src} ${meta.width}w`).join(', '),
    type: `image/${format}`,
  }))

  /** @type {string} */
  const file = metadatas[0].image.options.input.file
  /** @type {number} */
  const aspect = metadatas[0].aspect
  const data = doSync.doSync(async (file) => {
    const sharp = global['require']('sharp')
    return (await sharp(file).resize({ width: 20 }).png().toBuffer()).toString('base64')
  })(file)

  /** @type {import('./src/lib/types').Image} */
  return {
    sources,
    placeholder: `data:image/png;base64,${data}`,
    alt: path.parse(file).name,
    aspect,
  }
}

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    imagetools({
      extendOutputFormats: (defaults) => ({ ...defaults, Image: imageFormat }),
    }),
  ],
  assetsInclude: ['**/*.xml'],
}

export default config
