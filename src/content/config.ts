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
    modifiedDate: z.string().optional(),
    category: z.enum(BLOG_CATEGORIES as readonly [string, ...string[]]),
    readTime: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    wordCount: z.number().optional(),
  }),
});

export const collections = {
  posts,
};
