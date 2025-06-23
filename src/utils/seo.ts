/**
 * SEO utility functions for optimizing metadata
 */

/**
 * Truncate text to specified character limit while preserving word boundaries
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // If we can find a space within reasonable distance from the end, use it
  if (lastSpaceIndex > maxLength - 20) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  // Otherwise, truncate at the limit with ellipsis
  return truncated.substring(0, maxLength - 3) + '...';
}

/**
 * Optimize title for SEO (50-60 characters ideal)
 */
export function optimizeTitle(title: string): string {
  const maxLength = 60;
  return truncateText(title, maxLength);
}

/**
 * Optimize meta description for SEO (150-160 characters ideal)
 */
export function optimizeDescription(description: string): string {
  const maxLength = 160;
  return truncateText(description, maxLength);
}

/**
 * Calculate reading time based on word count
 * Average reading speed: 200-250 words per minute
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 225; // Average reading speed
  const wordCount = countWords(content);
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Count words in text content
 */
export function countWords(text: string): number {
  // Remove HTML tags and normalize whitespace
  const cleanText = text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  if (!cleanText) return 0;
  
  return cleanText.split(' ').length;
}

/**
 * Generate reading time in ISO 8601 duration format for schema.org
 */
export function getReadingTimeISO(minutes: number): string {
  return `PT${minutes}M`;
}

/**
 * Validate and clean keywords
 */
export function optimizeKeywords(keywords: string[]): string {
  return keywords
    .map(keyword => keyword.trim().toLowerCase())
    .filter(keyword => keyword.length > 0)
    .slice(0, 10) // Limit to 10 keywords
    .join(', ');
}

/**
 * Generate enhanced title with brand for homepage
 */
export function generatePageTitle(title: string, includeBrand: boolean = true): string {
  const brand = 'Skill-Wanderer';
  const separator = ' | ';
  
  if (!includeBrand) return optimizeTitle(title);
  
  const maxTitleLength = 60 - brand.length - separator.length;
  const optimizedTitle = truncateText(title, maxTitleLength);
  
  return `${optimizedTitle}${separator}${brand}`;
}

/**
 * Validate title length and provide feedback
 */
export function validateTitle(title: string): { isValid: boolean; message: string; length: number } {
  const length = title.length;
  
  if (length < 30) {
    return { isValid: false, message: 'Title too short (minimum 30 characters)', length };
  }
  
  if (length > 60) {
    return { isValid: false, message: 'Title too long (maximum 60 characters)', length };
  }
  
  return { isValid: true, message: 'Title length is optimal', length };
}

/**
 * Validate description length and provide feedback
 */
export function validateDescription(description: string): { isValid: boolean; message: string; length: number } {
  const length = description.length;
  
  if (length < 120) {
    return { isValid: false, message: 'Description too short (minimum 120 characters)', length };
  }
  
  if (length > 160) {
    return { isValid: false, message: 'Description too long (maximum 160 characters)', length };
  }
  
  return { isValid: true, message: 'Description length is optimal', length };
}