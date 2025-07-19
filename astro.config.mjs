// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Get environment mode
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://wanderings.skill-wanderer.com',
  integrations: [
    tailwind(), 
    mdx(),
    sitemap({
      // Customize sitemap generation
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // You can also add custom filters here if needed
      filter: (page) => !page.includes('/draft/')
    })
  ],
  image: {
    // Enable additional image optimizations
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  // Environment-specific configuration
  vite: {
    define: {
      __DEV__: isDev,
      __PROD__: isProd,
    },
    // Only enable source maps in development
    build: {
      sourcemap: isDev
    }
  },
});
