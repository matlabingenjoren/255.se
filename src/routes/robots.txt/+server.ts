import type { RequestHandler } from './$types'

import robots from './robots.txt?raw'

export const GET: RequestHandler = async (event) => {
  return new Response(robots.replaceAll('${origin}', event.url.origin), {
    headers: {
      'Cache-Control': 'max-age=3600',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
