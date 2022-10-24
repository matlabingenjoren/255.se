import type { RequestHandler } from './$types'

import sitemap from './sitemap.xml?raw'

export const GET: RequestHandler = async (event) => {
  return new Response(sitemap.replaceAll('${origin}', event.url.origin), {
    headers: {
      'Cache-Control': 'max-age=3600',
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
