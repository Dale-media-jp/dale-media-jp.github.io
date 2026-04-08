import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  category: z.enum(['ai-basics', 'biz-ai', 'cases']),
  persona: z.string(),
  keywords: z.array(z.string()),
  draft: z.boolean().default(false),
  coverImage: z.string().optional(),
});

export const collections = {
  'ai-basics': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ai-basics' }),
    schema: articleSchema,
  }),
  'biz-ai': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/biz-ai' }),
    schema: articleSchema,
  }),
  'cases': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
    schema: articleSchema,
  }),
};
