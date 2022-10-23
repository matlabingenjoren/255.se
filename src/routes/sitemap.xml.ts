import type { RequestHandler } from '@sveltejs/kit'

// Provides formatting of template strings
const html = (str: TemplateStringsArray, ...args: Parameters<typeof String.raw>[1][]) =>
  String.raw({ raw: str }, ...args)

export const get: RequestHandler = async (event) => {
  const origin = event.url.origin

  return {
    headers: {
      'Cache-Control': 'max-age=3600',
      'Content-Type': 'application/xml; charset=utf-8',
    },
    body: html`
      <?xml version="1.0" encoding="UTF-8" ?>
      <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
      >
        <url>
          <loc>${origin}/ankeboter</loc>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${origin}/kr%C3%B6nikor</loc>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${origin}/r%C3%B6stsystem</loc>
          <changefreq>monthly</changefreq>
          <priority>0.5</priority>
        </url>
        <url>
          <loc>${origin}/sittningslokaler</loc>
          <changefreq>monthly</changefreq>
          <priority>0.9</priority>
        </url>
        <url>
          <loc>${origin}/verser</loc>
          <changefreq>monthly</changefreq>
          <priority>0.5</priority>
        </url>
      </urlset>
    `.trim(),
  }
}
