# AGENTS.md — AI Agent & Developer Context Reference

> **Purpose:** This file provides authoritative architectural context, performance guardrails, SEO contracts, and domain rules for AI coding agents (Antigravity, Gemini, Claude, Cursor, Copilot) and human engineers working on the **Brown's Interior** codebase (`www.brownsinterior.com`).
> **Read this file before modifying routes, images, data files, styles, or deployment configs.**

---

## 1. Project Identity & Domain Context

* **Brand:** Brown's Interior (`https://www.brownsinterior.com`)
* **Founder & Principal Designer:** Engr. Aslam Sheikh (`Dip. Architecture & Interior Design, NPI` · `B.Sc. in Civil Engg., IUBAT` · `IEB Membership No: A29734`)
* **Core Business:** Residential & Commercial Interior Design, Architectural Design, Structural Consultancy, Renovation, and Exhibition Booth Design & Turnkey Execution across Dhaka, Bangladesh (`Uttara, Dhaka-1230`) and worldwide.
* **Direct Contact / WhatsApp:** `+880 1768-436319` (`8801768436319`), `info@brownsinterior.com`

---

## 2. Critical Performance Guardrails (DO NOT REGRESS)

This site is tuned to achieve **98–100 Performance, 100 Accessibility, 96–100 Best Practices, and 100 SEO** on Google Lighthouse (Mobile & Desktop). Follow these strict rules whenever making changes:

1. **Never Eager-Load Secondary Routes or Heavy SDKs in `src/App.jsx`:**
   * Keep `ProjectsPage`, `ProjectDetail`, `ServicesPage`, `ServiceDetail`, `BlogPost`, `NotFound`, `ExtraPages` (`ProcessPage`, `TestimonialsPage`, `BlogPage`, `CostCalculatorPage`), `Team`, and `Contact` wrapped in `React.lazy()` + `<Suspense>`.
   * Never add top-level `import { createClient } from '@supabase/supabase-js'` in any eagerly loaded module. Always use `getSupabaseClient()` in `src/lib/supabase.js`, which dynamically imports `@supabase/supabase-js` (`~209 KB`) only when `submitInquiry()` is called.
2. **Never Import `src/data/blogData.js` into Homepage or Global Modules:**
   * `src/data/blogData.js` is `~71 KB` of full-text SEO articles.
   * For blog cards on the Homepage (`HomeSections.jsx`) or `/blog` listing (`ExtraPages.jsx`), always import `blogPreviews` from `src/data/siteData.js`.
   * Only `src/components/BlogPost.jsx` (lazy-loaded) and `scripts/generate-sitemap.mjs` (Node build script) should import `src/data/blogData.js`.
3. **Hero LCP Image Contract (`index.html` & `src/components/HomeSections.jsx`):**
   * The first hero slide (`/optimized/hero/slide-1-1600.webp` with `960w`, `1600w`, `2200w` `srcSet`) is preloaded in `index.html` with `fetchpriority="high"`.
   * In `HomeHero` (`src/components/HomeSections.jsx`), slide `0` must render as a native `<img>` with `fetchPriority="high"`, `loading="eager"`, `decoding="sync"`, and **zero initial opacity animation delay** (`<AnimatePresence initial={false}>`). Never revert the hero background to a CSS `background-image` or hide the initial `<h1>` at `opacity: 0`.
4. **Image Format & Optimization Contract (`scripts/optimize-hero.py`):**
   * Always preserve original `.jpg` / `.jpeg` / `.png` files in `public/portfolio/` and `public/team/` untouched.
   * Whenever new images are added to `public/portfolio/` or `public/team/`, run:
     ```bash
     python3 scripts/optimize-hero.py
     ```
     and reference the generated `.webp` paths in `src/data/*.js` and components.
   * Keep `https://www.brownsinterior.com/og-image.jpg` as `.jpg` in `index.html` and `src/components/SEO.jsx` for universal social-scraper compatibility (WhatsApp, Facebook, LinkedIn, X).
5. **Font Loading Contract (`index.html` & `src/index.css`):**
   * Never add `@import url('https://fonts.googleapis.com/...')` inside `.css` files (`src/index.css`, etc.) — CSS `@import` blocks rendering and creates sequential network waterfalls.
   * All Google Fonts (`Playfair Display`, `Inter`, `Montserrat`, `Outfit`, `Italianno`) are loaded via a single non-render-blocking `<link rel="preload" as="style" onload="..." />` tag in `index.html`.
6. **DOM Size & `content-visibility`:**
   * In `src/components/Navbar.jsx`, the desktop `.services-multimenu` dropdown is conditionally rendered (`{menuOpen && (...)}`) so ~350 hidden DOM nodes are not mounted on mobile devices.
   * In `src/styles/site.css`, `.section` uses `content-visibility: auto; contain-intrinsic-size: 1px 650px;`.
   * Always include explicit `width` and `height` attributes on `<img src="/logo.svg" />` and `loading="lazy"` + `decoding="async"` on below-the-fold images.

---

## 3. Data & Routing Architecture

### Service Hierarchy (`src/data/servicesData.js`)
* Contains **7 Core Service Categories** (`interior-design`, `architectural-design`, `structural-engineering`, `renovation-remodeling`, `exhibition-booth-design`, `construction-execution`, `project-consultancy`) and **30+ specialized sub-service options**.
* Resolved dynamically by `findServiceOrOption(slug)` in `src/components/ServiceDetail.jsx` across both `/services/:slug` and `/services/:categorySlug/:slug`.
* When adding a new service or sub-service:
  1. Add it to `src/data/servicesData.js`.
  2. Run `npm run sitemap` (or `npm run build`) so `scripts/generate-sitemap.mjs` automatically adds it to `public/sitemap.xml`.

### Cost Calculator Benchmark (`src/components/ExtraPages.jsx`)
* Calibrated specifically for the Dhaka turnkey market by Engr. Aslam Sheikh (referenced for a `1,200 sq ft` residential baseline):
  * **Standard Tier:** `৳ 750 – ৳ 1,083.33 / sq ft` (`~9 – 13 Lac BDT` for 1,200 sft)
  * **Premium Tier:** `৳ 1,083.33 – ৳ 2,083.33 / sq ft` (`~13 – 25 Lac BDT` for 1,200 sft)
  * **Luxury Tier:** `৳ 1,666.67 – ৳ 3,750 / sq ft` (`~20 – 45 Lac BDT` for 1,200 sft)
* Space multipliers: Residential (`1.0x`), Commercial & Office (`1.2x`), Exhibition Booth (`1.45x`).
* Clicking **"Book Site Visit & BOQ"** passes `?category=...&area=...&budget=...` via query parameters to `/contact`, which pre-fills `src/components/Contact.jsx`.

### Inquiry & Lead Pipeline (`src/lib/supabase.js`)
* `submitInquiry(formData)` performs three actions resiliently:
  1. Dispatches an instant formatted email notification via **Web3Forms API** (`sendEmailNotification`).
  2. Dynamically loads `@supabase/supabase-js` and inserts the lead into `public.inquiries` (if `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured), then marks `email_sent = true`.
  3. Saves a fallback record in `localStorage` (`browns_interior_inquiries_v1`).

---

## 4. Infrastructure, DNS & Security (`vercel.json`)

* **Hosting:** Vercel Production (`www.brownsinterior.com` primary domain; `brownsinterior.com` 308 redirects to `www.brownsinterior.com`).
* **Cloudflare DNS Rule (CRITICAL):**
  * DNS records in Cloudflare for `@` (`A -> 76.76.21.21`) and `www` (`CNAME -> cname.vercel-dns.com`) **MUST remain set to `DNS Only` (Grey Cloud ☁️)**.
  * Do **NOT** enable Cloudflare Proxy (Orange Cloud) in front of Vercel or leave old hosting `A`/`AAAA` records active — double-proxying causes 20-second origin TCP timeouts on cold connections from Google Search.
* **Security Headers (`vercel.json`):**
  * `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` are configured on `/(.*)`.

---

## 5. Pre-Commit Verification Checklist for Agents & Developers

Before committing and pushing any change:
1. **Optimize any newly added images:** `python3 scripts/optimize-hero.py`
2. **Keep `blogPreviews` in `src/data/siteData.js` in sync** if adding or editing a blog post in `src/data/blogData.js`.
3. **Run Linter:** `npm run lint` (uses `oxlint` — must exit with `0 errors`).
4. **Run Production Build & Sitemap Generation:** `npm run build` (regenerates `public/sitemap.xml` and verifies Vite/Rolldown bundle output).
