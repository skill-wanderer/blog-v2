// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

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
  vite: {
    define: {
      // Make Firebase environment variables available to the client
      __FIREBASE_CONFIG__: JSON.stringify({
        apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
      }),
    },
  },
});
