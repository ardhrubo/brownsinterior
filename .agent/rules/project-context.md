# Brown's Interior — Agent & Developer Rules

Please read and follow all architectural, performance, SEO, and infrastructure guardrails documented in [`AGENTS.md`](../AGENTS.md) and [`README.md`](../README.md).

## Key Rules Summary
- **Performance (98–100 Lighthouse):** Keep secondary routes and below-the-fold heavy components (`Team`, `Contact`, `ExtraPages`, `BlogPost`, `ServicesPage`, `ServiceDetail`, `ProjectsPage`, `ProjectDetail`) lazy-loaded via `React.lazy()` in `src/App.jsx`.
- **Supabase Dynamic Import:** Never import `@supabase/supabase-js` eagerly at the top of a file; always use `getSupabaseClient()` in `src/lib/supabase.js`.
- **Blog Data Separation:** Never import `src/data/blogData.js` into homepage or global components; use `blogPreviews` from `src/data/siteData.js` for cards and previews.
- **Image Pipeline:** Keep original `.jpg`/`.png` files untouched in `public/portfolio/` and `public/team/`. Run `python3 scripts/optimize-hero.py` to generate `.webp` derivatives and reference `.webp` in UI components (keep `og-image.jpg` as `.jpg` for social sharing).
- **Fonts & CSS:** Never add `@import url('https://fonts.googleapis.com/...')` in CSS files; fonts are loaded asynchronously in `index.html`.
- **Verification:** Always run `npm run lint` and `npm run build` (which updates `public/sitemap.xml`) before committing.
