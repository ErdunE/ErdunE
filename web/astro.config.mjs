// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://erdun.me',
  // English stays at the root so existing links and the indexed URL keep
  // working; Chinese lives under /zh/. See web/I18N_PLAN.md §3.1.
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-Hans' } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
