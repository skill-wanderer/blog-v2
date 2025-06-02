import { defineCollection, z } from 'astro:content';
import { BLOG_CATEGORIES, type BlogCategory } from '../constants/categories.ts';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.object({
      name: z.string(),
      bio: z.string(),
      avatar: z.string().optional(),
      social: z.object({
        twitter: z.string().optional(),
        linkedin: z.string().optional(),
        github: z.string().optional(),
        website: z.string().optional(),
      }).optional(),
    }),
    publishDate: z.string(),
    category: z.enum(BLOG_CATEGORIES as readonly [string, ...string[]]),
    readTime: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  posts,
};
