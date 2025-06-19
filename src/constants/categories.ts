// Blog categories constants
export const BLOG_CATEGORIES = [
  'Artificial Intelligence',
  'Home Data Center',
  'Skill-Wanderer Journey'
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];

// Helper function to get all categories for filtering
export const getAllCategories = () => ['all', ...BLOG_CATEGORIES];

// Helper function to check if a category is valid
export const isValidCategory = (category: string): category is BlogCategory => {
  return BLOG_CATEGORIES.includes(category as BlogCategory);
};

// Helper function to format category for URL
export const formatCategoryForUrl = (category: BlogCategory): string => {
  return encodeURIComponent(category);
};

// Helper function to get category display name
export const getCategoryDisplayName = (category: BlogCategory | string): string => {
  return category;
};
