import { getCollection } from 'astro:content';
import { escapeHtml, getSlug, sortPosts } from '../utils/blog';

export async function GET() {
  const site = 'https://777stay.github.io';
  const posts = sortPosts(await getCollection('blog'));
  const items = posts.map((post) => {
    const url = `${site}/blog/${getSlug(post.id)}/`;
    return `    <item>
      <title>${escapeHtml(post.data.title)}</title>
      <description>${escapeHtml(post.data.description)}</description>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>777stay 技术博客</title>
    <description>后端开发、系统设计、AI 工具链、源码阅读和项目复盘。</description>
    <link>${site}/</link>
    <language>zh-CN</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
