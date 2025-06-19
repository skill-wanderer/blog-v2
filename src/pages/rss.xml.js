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
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishDate),
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.category ? [getCategoryDisplayName(post.data.category)] : [],
      author: post.data.author?.name || 'Skill-Wanderer',
      customData: `
        <language>en-us</language>
        <category>${post.data.category ? getCategoryDisplayName(post.data.category) : 'Technology'}</category>
        <readingTime>${post.data.readTime || '5 min read'}</readingTime>
      `,
    })),
    customData: `
      <language>en-us</language>
      <managingEditor>contact@wanderings.skill-wanderer.com (Skill-Wanderer)</managingEditor>
      <webMaster>contact@wanderings.skill-wanderer.com (Skill-Wanderer)</webMaster>
      <category>Technology</category>
      <category>Software Development</category>
      <category>Programming</category>
      <category>Home Lab</category>
      <category>Kubernetes</category>
      <category>AI</category>
      <ttl>60</ttl>
    `,
  });
}
