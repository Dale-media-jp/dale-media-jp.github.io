import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') ?? 'https://dale-media.jp';

  const categories = ['ai-basics', 'biz-ai', 'cases'] as const;

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/ai-basics', priority: '0.8', changefreq: 'weekly' },
    { url: '/biz-ai', priority: '0.8', changefreq: 'weekly' },
    { url: '/cases', priority: '0.8', changefreq: 'weekly' },
  ];

  const posts = (
    await Promise.all(
      categories.map(cat => getCollection(cat, ({ data }) => !data.draft))
    )
  ).flat();

  const postEntries = posts.map(post => ({
    url: `/${post.collection}/${post.id}`,
    lastmod: post.data.pubDate.toISOString().split('T')[0],
    priority: '0.7',
    changefreq: 'monthly',
  }));

  const allEntries = [
    ...staticPages.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
    ...postEntries,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    entry => `  <url>
    <loc>${siteUrl}${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
