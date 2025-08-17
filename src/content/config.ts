import { defineCollection, z } from 'astro:content';
import { BLOG_CATEGORIES, type BlogCategory } from '../constants/categories.ts';
import { AUTHOR_IDS } from '../constants/authors.ts';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    authorId: z.enum(AUTHOR_IDS),
    publishDate: z.string(),
    category: z.enum(BLOG_CATEGORIES as readonly [string, ...string[]]).optional(),
    categories: z.array(z.enum(BLOG_CATEGORIES as readonly [string, ...string[]])).optional(),
    readTime: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }).refine(data => data.category || (data.categories && data.categories.length > 0), {
    message: "Either 'category' or 'categories' must be provided",
  }),
});

export const collections = {
  posts,
};
