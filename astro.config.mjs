// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://wanderings.skill-wanderer.com',
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: { enabled: true },
  }),
  env: {
    // Newsletter (Resend). Read at build time from `.env` or the build
    // environment and inlined into the server bundle, so the worker needs no
    // runtime secrets. `context: 'server'` keeps them out of client code.
    // Optional so builds without them still pass; /api/subscribe answers 503.
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'public', optional: true }),
      RESEND_FROM_EMAIL: envField.string({ context: 'server', access: 'public', optional: true }),
    },
  },
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ]
  },
  integrations: [
    tailwind(), 
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/draft/')
    })
  ],
  image: {
    // Enable additional image optimizations
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
