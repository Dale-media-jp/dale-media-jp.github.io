import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

const site =
  process.env.PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://dale-media-jp.github.io');

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [mdx()],
});
