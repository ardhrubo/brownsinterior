import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { normalizeSiteUrl } from './src/lib/site-url.js'
import { generateSitemap } from './scripts/generate-sitemap.mjs'
import { prerenderRoutes } from './scripts/prerender-routes.mjs'

// https://vite.dev/config/
export default defineConfig(async ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL || undefined);
  if (command === 'build') await generateSitemap(siteUrl);
  return {
  define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl) },
  plugins: [react(), {
    name: 'site-origin-html',
    transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%VITE_SITE_URL%', siteUrl) },
    async closeBundle() {
      if (command === 'build') {
        await prerenderRoutes(siteUrl);
      }
    },
  }],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'vendor-three';
            if (id.includes('@supabase')) return 'vendor-supabase';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react') || id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'vendor-react';
            return 'vendor';
          }
        },
      },
    },
  },
  };
})

