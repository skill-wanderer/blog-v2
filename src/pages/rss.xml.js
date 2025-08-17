import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getCategoryDisplayName } from '../constants/categories.ts';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sortedPosts = posts.sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime());

  return rss({
    title: 'Skill-Wanderer - Tech Journey & Insights',
    description: 'Join me on my learning journey as I share insights from exploring various tech domains, building projects, and navigating the ever-evolving landscape of software development.',
    site: context.site,
    items: sortedPosts.map((post) => {
      // Support both single category and categories array
      const postCategories = post.data.categories || (post.data.category ? [post.data.category] : []);
      const displayCategories = postCategories.map(cat => getCategoryDisplayName(cat));
      const primaryCategory = displayCategories[0] || 'Technology';
      
      return {
        title: post.data.title,
        pubDate: new Date(post.data.publishDate),
        description: post.data.description,
        link: `/blog/${post.slug}/`,
        categories: displayCategories,
        author: post.data.author?.name || 'Skill-Wanderer',
        customData: `
          <language>en-us</language>
          <category>${primaryCategory}</category>
          <readingTime>${post.data.readTime || '5 min read'}</readingTime>
        `,
      };
    }),
    customData: `
      <language>en-us</language>

      <ttl>60</ttl>
    `,
  });
}
