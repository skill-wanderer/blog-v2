import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getCategoryDisplayName } from '../constants/categories.ts';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({
  html: true,        // Allow HTML tags in source
  linkify: true,     // Auto-convert URLs to links
  typographer: true, // Smart quotes, dashes, etc.
});

/**
 * Strip MDX-specific syntax from post body so markdown-it can render it cleanly.
 * Removes: import statements, export statements, and JSX components like <Image />.
 */
function stripMdxSyntax(body) {
  if (!body) return '';
  return body
    // Remove import statements (single and multi-line)
    .replace(/^import\s+.*?(?:from\s+['"].*?['"];?\s*$|['"].*?['"];?\s*$)/gm, '')
    // Remove export statements
    .replace(/^export\s+.*$/gm, '')
    // Remove self-closing JSX components like <Image ... /> or <Component ... />
    .replace(/<[A-Z][A-Za-z]*\s[^>]*?\/>/g, (match) => {
      // Try to preserve alt text from Image components as a paragraph
      const altMatch = match.match(/alt=["']([^"']+)["']/);
      return altMatch ? `*${altMatch[1]}*` : '';
    })
    // Remove opening+closing JSX components like <Component>...</Component>
    .replace(/<[A-Z][A-Za-z]*(?:\s[^>]*)?>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, '')
    // Remove standalone opening JSX tags like <Component>
    .replace(/<[A-Z][A-Za-z]*(?:\s[^>]*)?>/g, '')
    // Remove standalone closing JSX tags like </Component>
    .replace(/<\/[A-Z][A-Za-z]*>/g, '')
    // Clean up excessive blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

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

      // Render the full post body to HTML for RSS content:encoded
      const cleanBody = stripMdxSyntax(post.body ?? '');
      const renderedContent = sanitizeHtml(parser.render(cleanBody), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption', 'video', 'source', 'iframe', 'details', 'summary']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
          a: ['href', 'name', 'target', 'rel'],
          iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen'],
        },
        // Convert relative image URLs to absolute
        transformTags: {
          'img': (tagName, attribs) => {
            if (attribs.src && attribs.src.startsWith('/')) {
              attribs.src = `${context.site}${attribs.src.slice(1)}`;
            }
            return { tagName, attribs };
          },
          'a': (tagName, attribs) => {
            if (attribs.href && attribs.href.startsWith('/')) {
              attribs.href = `${context.site}${attribs.href.slice(1)}`;
            }
            return { tagName, attribs };
          },
        },
      });

      return {
        title: post.data.title,
        pubDate: new Date(post.data.publishDate),
        description: post.data.description,
        link: `/blog/${post.slug}/`,
        categories: displayCategories,
        author: post.data.author?.name || 'Skill-Wanderer',
        content: renderedContent,
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
