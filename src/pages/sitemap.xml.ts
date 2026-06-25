import { getCollection } from 'astro:content';
import { escapeHtml, getAllTags, getSlug, sortPosts } from '../utils/blog';

export async function GET() {
  const site = 'https://777stay.github.io';
  const posts = sortPosts(await getCollection('blog'));
  const tags = getAllTags(posts).map(([tag]) => tag);
  const urls = [
    '/',
    '/blog/',
    '/tags/',
    '/about/',
    ...posts.map((post) => `/blog/${getSlug(post.id)}/`),
    ...tags.map((tag) => `/tags/${encodeURIComponent(tag)}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${escapeHtml(site + path)}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
