/**
 * SEO utility functions for optimizing metadata
 */

/**
 * Calculate estimated word count from content
 */
export function calculateWordCount(content: string): number {
  // Remove HTML tags and markdown syntax
  const cleanContent = content
    .replace(/(<([^>]+)>)/gi, '') // Remove HTML tags
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/#+ /g, '') // Remove markdown headers
    .replace(/[*_~`]/g, '') // Remove markdown formatting
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  return cleanContent.split(' ').filter(word => word.length > 0).length;
}

/**
 * Calculate estimated reading time based on word count
 */
export function calculateReadingTime(wordCount: number, wordsPerMinute: number = 200): string {
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Optimize title length for SEO (ideal 50-60 characters)
 */
export function optimizeTitleLength(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) return title;
  
  // Try to cut at a word boundary
  const truncated = title.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Optimize description length for SEO (ideal 150-160 characters)
 */
export function optimizeDescriptionLength(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  
  // Try to cut at a sentence boundary
  const truncated = description.substring(0, maxLength - 3);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastPeriod > maxLength * 0.8) {
    return truncated.substring(0, lastPeriod + 1);
  }
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Generate keywords from content and tags
 */
export function generateKeywords(
  tags: string[] = [],
  category?: string,
  title?: string,
  baseKeywords: string[] = []
): string {
  const keywords = new Set([
    ...baseKeywords,
    ...tags.map(tag => tag.toLowerCase()),
    ...(category ? [category.toLowerCase().replace(/\s+/g, ' ')] : []),
    ...(title ? extractKeywordsFromTitle(title) : [])
  ]);
  
  return Array.from(keywords).filter(Boolean).join(', ');
}

/**
 * Extract potential keywords from title
 */
function extractKeywordsFromTitle(title: string): string[] {
  const stopWords = new Set([
    'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'the', 'this', 'that', 'these', 'those', 'is', 'are', 'was', 'were', 'be', 'been',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
    'how', 'what', 'when', 'where', 'why', 'who', 'which'
  ]);
  
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word))
    .slice(0, 5); // Limit to 5 keywords
}

/**
 * Convert reading time string to ISO 8601 duration
 */
export function readingTimeToISO8601(readTime: string): string {
  const match = readTime.match(/(\d+)/);
  const minutes = match ? parseInt(match[1]) : 5;
  return `PT${minutes}M`;
}

/**
 * Generate structured data for FAQ sections
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}
