import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async (event) => {
  const origin = event.url.origin

  return {
    headers: {
      'Cache-Control': 'max-age=3600',
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `
User-agent: *
Disallow: /hårddisk
Disallow: /h%C3%A5rddisk

Sitemap: ${origin}/sitemap.xml
    `.trim(),
  }
}
