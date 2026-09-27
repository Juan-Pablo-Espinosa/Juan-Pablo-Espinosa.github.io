// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // User/organization Pages repo (<user>.github.io) serves from the domain root,
  // so no `base` is needed. `site` is used for canonical URLs, OG tags and the sitemap.
  site: 'https://juan-pablo-espinosa.github.io',
  output: 'static',
  // The whole stylesheet is small, so inline it and skip a render-blocking request.
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // The generated OG images and the 404 page are not pages worth indexing.
      filter: (page) => !page.includes('/og/') && !page.endsWith('/404/'),
    }),
  ],
  // Prefetch internal links on hover for snappy navigation (tiny, no framework).
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
