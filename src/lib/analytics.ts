// Note: Firebase Analytics has been disabled
// This file provides analytics interfaces but logs to console instead

export interface BlogAnalyticsEvent {
  event_name: string;
  page_title?: string;
  page_location?: string;
  content_group1?: string; // category
  content_group2?: string; // author
  content_group3?: string; // tags
  custom_parameter_1?: string;
  custom_parameter_2?: string;
  value?: number;
}

export interface PageViewEvent {
  page_title: string;
  page_location: string;
  page_category?: string;
  author_id?: string;
  read_time?: string;
  tags?: string[];
}

export interface PostEngagementEvent {
  post_id: string;
  post_title: string;
  author_id: string;
  category: string;
  engagement_type: 'scroll_75' | 'scroll_100' | 'time_on_page_30s' | 'time_on_page_60s' | 'time_on_page_300s';
  read_time?: string;
}

class BlogAnalytics {
  private isInitialized = false;

  constructor() {
    this.initializeAnalytics();
  }

  private initializeAnalytics(): void {
    if (typeof window !== 'undefined') {
      this.isInitialized = true;
      console.log('Blog Analytics initialized (Console mode - Firebase Analytics disabled)');
    }
  }

  // Track page views
  trackPageView(event: PageViewEvent): void {
    if (!this.isInitialized) return;

    console.log('Analytics: Page View', {
      page_title: event.page_title,
      page_location: event.page_location,
      category: event.page_category || 'unknown',
      author: event.author_id || 'unknown',
      tags: event.tags?.join(',') || '',
      read_time: event.read_time || '',
    });
  }

  // Track blog post engagement
  trackPostEngagement(event: PostEngagementEvent): void {
    if (!this.isInitialized) return;

    console.log('Analytics: Post Engagement', {
      post_id: event.post_id,
      post_title: event.post_title,
      category: event.category,
      author: event.author_id,
      engagement_type: event.engagement_type,
      read_time: event.read_time || '',
    });
  }

  // Track search events
  trackSearch(searchTerm: string, resultsCount: number = 0): void {
    if (!this.isInitialized) return;

    console.log('Analytics: Search', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  }

  // Track social sharing
  trackShare(postId: string, postTitle: string, platform: string): void {
    if (!this.isInitialized) return;

    console.log('Analytics: Share', {
      content_type: 'blog_post',
      content_id: postId,
      content_title: postTitle,
      platform: platform,
    });
  }

  // Track newsletter signup
  trackNewsletterSignup(source: string = 'blog'): void {
    if (!this.isInitialized) return;

    console.log('Analytics: Newsletter Signup', {
      method: 'newsletter',
      source: source,
    });
  }

  // Track external link clicks
  trackExternalLinkClick(url: string, linkText: string, postId?: string): void {
    if (!this.isInitialized) return;

    console.log('Analytics: External Link Click', {
      link_url: url,
      link_text: linkText,
      outbound: true,
      content_id: postId || '',
    });
  }

  // Track scroll depth
  trackScrollDepth(postId: string, depth: number): void {
    if (!this.isInitialized) return;

    console.log('Analytics: Scroll Depth', {
      content_id: postId,
      percent_scrolled: depth,
    });
  }

  // Set user properties
  setUserProperties(properties: Record<string, string>): void {
    if (!this.isInitialized) return;

    console.log('Analytics: User Properties', properties);
  }

  // Set user ID (for logged-in users)
  setUserId(userId: string): void {
    if (!this.isInitialized) return;

    console.log('Analytics: User ID Set', { userId });
  }

  // Custom event tracking
  trackCustomEvent(eventName: string, parameters: Record<string, any> = {}): void {
    if (!this.isInitialized) return;

    console.log(`Analytics: Custom Event - ${eventName}`, parameters);
  }
}

// Export singleton instance
export const blogAnalytics = new BlogAnalytics();

// Export utility functions for common tracking scenarios
export const trackBlogPageView = (pageTitle: string, slug: string, category?: string, authorId?: string, readTime?: string, tags?: string[]) => {
  blogAnalytics.trackPageView({
    page_title: pageTitle,
    page_location: `${window.location.origin}/blog/${slug}`,
    page_category: category,
    author_id: authorId,
    read_time: readTime,
    tags: tags,
  });
};

export const trackHomePageView = () => {
  blogAnalytics.trackPageView({
    page_title: 'Skill Wanderer - Tech Blog & Learning Resources',
    page_location: window.location.href,
    page_category: 'home',
  });
};

export const trackReadingProgress = (postId: string, postTitle: string, authorId: string, category: string, progressType: 'scroll_75' | 'scroll_100' | 'time_on_page_30s' | 'time_on_page_60s' | 'time_on_page_300s') => {
  blogAnalytics.trackPostEngagement({
    post_id: postId,
    post_title: postTitle,
    author_id: authorId,
    category: category,
    engagement_type: progressType,
  });
};
