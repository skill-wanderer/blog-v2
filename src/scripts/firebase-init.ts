// Firebase client-side initialization script
// This script should be loaded in the browser to initialize Firebase

import { initializeFirebase, isFirebaseConfigured } from '../lib/firebase';
import { blogAnalytics } from '../lib/analytics';

// Initialize Firebase when the script loads
(function initializeFirebaseApp() {
  try {
    if (!isFirebaseConfigured()) {
      console.warn('Firebase is not properly configured. Please check your environment variables.');
      return;
    }

    // Initialize Firebase
    initializeFirebase();
    
    // Initialize analytics tracking for blog
    if (typeof window !== 'undefined') {
      // Track initial page view
      document.addEventListener('DOMContentLoaded', () => {
        const pageTitle = document.title || 'Skill Wanderer Blog';
        const pageLocation = window.location.href;
        
        blogAnalytics.trackPageView({
          page_title: pageTitle,
          page_location: pageLocation,
          page_category: getPageCategory(),
        });
      });

      // Track scroll depth
      let scrollDepthTracked = new Set<number>();
      
      window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        // Track at 25%, 50%, 75%, and 100% scroll depths
        [25, 50, 75, 100].forEach(threshold => {
          if (scrollPercent >= threshold && !scrollDepthTracked.has(threshold)) {
            scrollDepthTracked.add(threshold);
            
            if (threshold === 75 || threshold === 100) {
              const postId = getPostIdFromUrl();
              const postTitle = document.title || '';
              
              if (postId) {
                blogAnalytics.trackPostEngagement({
                  post_id: postId,
                  post_title: postTitle,
                  author_id: getAuthorFromMeta() || 'unknown',
                  category: getCategoryFromMeta() || 'unknown',
                  engagement_type: threshold === 75 ? 'scroll_75' : 'scroll_100',
                });
              }
            }
            
            blogAnalytics.trackScrollDepth(getPostIdFromUrl() || 'unknown', threshold);
          }
        });
      }, 1000));

      // Track time on page
      let timeOnPageTracked = new Set<string>();
      
      [30000, 60000, 300000].forEach(timeThreshold => {
        setTimeout(() => {
          const eventKey = `time_${timeThreshold}`;
          if (!timeOnPageTracked.has(eventKey)) {
            timeOnPageTracked.add(eventKey);
            
            const postId = getPostIdFromUrl();
            const postTitle = document.title || '';
            
            if (postId) {
              let engagementType: 'time_on_page_30s' | 'time_on_page_60s' | 'time_on_page_300s';
              
              if (timeThreshold === 30000) engagementType = 'time_on_page_30s';
              else if (timeThreshold === 60000) engagementType = 'time_on_page_60s';
              else engagementType = 'time_on_page_300s';
              
              blogAnalytics.trackPostEngagement({
                post_id: postId,
                post_title: postTitle,
                author_id: getAuthorFromMeta() || 'unknown',
                category: getCategoryFromMeta() || 'unknown',
                engagement_type: engagementType,
              });
            }
          }
        }, timeThreshold);
      });

      // Track external link clicks
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const link = target.closest('a') as HTMLAnchorElement;
        
        if (link && isExternalLink(link.href)) {
          blogAnalytics.trackExternalLinkClick(
            link.href,
            link.textContent || link.href,
            getPostIdFromUrl() || undefined
          );
        }
      });
    }
    
    console.log('Firebase and blog analytics initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
  }
})();

// Utility functions
function getPageCategory(): string {
  const pathname = window.location.pathname;
  
  if (pathname === '/' || pathname === '/index.html') return 'home';
  if (pathname.startsWith('/blog/')) return 'blog-post';
  if (pathname.startsWith('/category/')) return 'category';
  if (pathname.startsWith('/author/')) return 'author';
  if (pathname.startsWith('/tag/')) return 'tag';
  
  return 'other';
}

function getPostIdFromUrl(): string | null {
  const pathname = window.location.pathname;
  const blogMatch = pathname.match(/^\/blog\/(.+)$/);
  return blogMatch ? blogMatch[1] : null;
}

function getAuthorFromMeta(): string | null {
  const metaAuthor = document.querySelector('meta[name="author"]') as HTMLMetaElement;
  return metaAuthor ? metaAuthor.content : null;
}

function getCategoryFromMeta(): string | null {
  const metaCategory = document.querySelector('meta[name="category"]') as HTMLMetaElement;
  return metaCategory ? metaCategory.content : null;
}

function isExternalLink(url: string): boolean {
  try {
    const linkUrl = new URL(url);
    return linkUrl.hostname !== window.location.hostname;
  } catch {
    return false;
  }
}

function throttle<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;
  
  return function executedFunction(...args: Parameters<T>) {
    const now = Date.now();
    
    if (!previous) {
      func(...args);
      previous = now;
      return;
    }
    
    const remaining = wait - (now - previous);
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      func(...args);
      previous = now;
    } else if (!timeout) {
      timeout = setTimeout(() => {
        func(...args);
        previous = Date.now();
        timeout = null;
      }, remaining);
    }
  };
}
