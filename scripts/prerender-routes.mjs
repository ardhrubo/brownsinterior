import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BRAND_NAME = "Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও";
const DEFAULT_KEYWORDS =
  "Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও, বাংলাদেশের অন্যতম নির্ভরযোগ্য ইন্টেরিয়র ডিজাইন স্টুডিও, বাংলাদেশের বেস্ট ইন্টেরিয়র ডিজাইন কোম্পানি, ইন্টেরিয়র ডিজাইন ঢাকা, ফ্ল্যাট ইন্টেরিয়র ডিজাইন, অফিস ইন্টেরিয়র ডিজাইন, Interior Design Dhaka, Interior Design Bangladesh, Architecture Bangladesh, Structural Engineering, Luxury Home Decor, Commercial Office Interior, Brown's Interiors";

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripMarkdown(text = '') {
  return String(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1');
}

function formatRichTextHtml(text = '') {
  let out = escapeHtml(text);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const safeHref = url.startsWith('/') || url.startsWith('https://') || url.startsWith('http://') ? url : '#';
    return `<a href="${escapeHtml(safeHref)}">${label}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return out;
}

function toAbsoluteUrl(domain, assetPath) {
  if (!assetPath) return `${domain}/og-image.jpg`;
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) return assetPath;
  return `${domain}${assetPath.startsWith('/') ? '' : '/'}${assetPath}`;
}

function formatTitle(title) {
  if (!title) return BRAND_NAME;
  return /brown['’]?s\s+interior/i.test(title) ? title : `${title} | ${BRAND_NAME}`;
}

function replaceMetaTag(html, attrName, attrValue, content) {
  const safeContent = escapeHtml(content);
  const regex = new RegExp(
    `(<meta\\s+${attrName}=["']${attrValue}["']\\s+content=)(?:"[^"]*"|'[^']*')(\\s*/?>)`,
    'i'
  );
  if (regex.test(html)) {
    return html.replace(regex, `$1"${safeContent}"$2`);
  }
  return html.replace('</head>', `  <meta ${attrName}="${attrValue}" content="${safeContent}" />\n  </head>`);
}

function renderStaticRouteHtml(template, domain, route) {
  const canonicalUrl = `${domain}${route.path === '/' ? '/' : route.path}`;
  const fullTitle = formatTitle(route.title);
  const description = route.description || '';
  const keywords = route.keywords ? `${route.keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS;
  const ogImage = toAbsoluteUrl(domain, route.image || '/og-image.jpg');
  const ogType = route.type || 'website';

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);
  html = replaceMetaTag(html, 'name', 'title', fullTitle);
  if (description) {
    html = replaceMetaTag(html, 'name', 'description', description);
  }
  html = replaceMetaTag(html, 'name', 'keywords', keywords);

  if (route.noindex) {
    html = replaceMetaTag(html, 'name', 'robots', 'noindex, nofollow');
    html = replaceMetaTag(html, 'name', 'googlebot', 'noindex, nofollow');
    html = html.replace(/\s*<link\s+rel=["']canonical["'][^>]*\/?>/i, '');
  } else {
    html = html.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
    );
  }

  html = replaceMetaTag(html, 'property', 'og:type', ogType);
  html = replaceMetaTag(html, 'property', 'og:url', route.noindex ? `${domain}/` : canonicalUrl);
  html = replaceMetaTag(html, 'property', 'og:title', fullTitle);
  if (description) {
    html = replaceMetaTag(html, 'property', 'og:description', description);
    html = replaceMetaTag(html, 'name', 'twitter:description', description);
  }
  html = replaceMetaTag(html, 'property', 'og:image', ogImage);
  html = replaceMetaTag(html, 'property', 'og:image:alt', fullTitle);
  html = replaceMetaTag(html, 'name', 'twitter:url', route.noindex ? `${domain}/` : canonicalUrl);
  html = replaceMetaTag(html, 'name', 'twitter:title', fullTitle);
  html = replaceMetaTag(html, 'name', 'twitter:image', ogImage);

  if (route.schema) {
    const schemaJson = JSON.stringify(route.schema).replace(/<\/script/gi, '<\\/script');
    html = html.replace(
      '</head>',
      `  <script id="seo-dynamic-schema" type="application/ld+json">${schemaJson}</script>\n  </head>`
    );
  }

  if (route.bodyHtml) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"><main style="max-width:960px;margin:0 auto;padding:120px 24px 64px;font-family:Inter,sans-serif;color:#1c1815;line-height:1.7">${route.bodyHtml}</main></div>`
    );
  }

  return html;
}

function buildNavFooterHtml() {
  return `<nav aria-label="Primary Navigation" style="margin-top:40px;padding-top:20px;border-top:1px solid #e5ddd2">
    <a href="/">Home</a> · <a href="/about">About</a> · <a href="/services">Services</a> · <a href="/projects">Projects</a> · <a href="/process">Process</a> · <a href="/testimonials">Testimonials</a> · <a href="/cost-estimator">Cost Calculator</a> · <a href="/careers">Careers</a> · <a href="/blog">Blog</a> · <a href="/contact">Contact</a>
  </nav>
  <footer style="margin-top:16px;font-size:14px;color:#5a524a">
    <p>Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও · Uttara, Dhaka-1230, Bangladesh · Phone / WhatsApp: +880 1768-436319 · Email: info@brownsinteriorsbd.com</p>
  </footer>`;
}

export async function prerenderRoutes(domain) {
  const distDir = path.resolve(rootDir, 'dist');
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Cannot prerender routes: ${templatePath} does not exist.`);
  }

  const template = fs.readFileSync(templatePath, 'utf8');
  const { servicesData } = await import('../src/data/servicesData.js');
  const { projectsData } = await import('../src/data/projectsData.js');
  const { blogPosts } = await import('../src/data/blogData.js');
  const {
    stats,
    testimonials,
    processSteps,
    teamMembers,
    careerPositions,
    blogPreviews,
  } = await import('../src/data/siteData.js');

  const routes = [];
  const navFooter = buildNavFooterHtml();

  // 0. Homepage (/) — prerendered directly into dist/index.html so Googlebot sees full H1, services, projects, blog & nav without waiting on JS
  const homeServicesHtml = servicesData
    .map(
      (s) => `<li>
        <h3><a href="/services/${escapeHtml(s.slug)}">${escapeHtml(s.title)}</a></h3>
        <p>${escapeHtml(s.tagline || s.description || '')}</p>
        ${
          Array.isArray(s.options) && s.options.length
            ? `<p>${s.options
                .map((o) => `<a href="/services/${escapeHtml(o.slug)}">${escapeHtml(o.title)}</a>`)
                .join(' · ')}</p>`
            : ''
        }
      </li>`
    )
    .join('');

  const homeProjectsHtml = projectsData
    .slice(0, 5)
    .map(
      (p) => `<li><a href="/project/${p.id}">${escapeHtml(p.title)}</a> (${escapeHtml(p.category)} · ${escapeHtml(p.location || 'Dhaka')} · ${escapeHtml(p.area || '')}) — ${escapeHtml(p.description || '')}</li>`
    )
    .join('');

  const homeBlogsHtml = blogPreviews
    .slice(0, 3)
    .map(
      (b) => `<li><a href="/blog/${escapeHtml(b.slug)}">${escapeHtml(b.title)}</a> — ${escapeHtml(b.excerpt || '')}</li>`
    )
    .join('');

  routes.push({
    path: '/',
    outFile: 'index.html',
    title: null,
    description:
      "বাংলাদেশের অন্যতম নির্ভরযোগ্য ইন্টেরিয়র ডিজাইন স্টুডিও। Complete Interior & Exterior Design and Execution Services Across Bangladesh.",
    bodyHtml: `<h1>Beautiful Design, Quality Work — Trusted Service | Brown's Interiors</h1>
      <p>Complete Interior &amp; Exterior Design and Execution Services Across Bangladesh and worldwide, led by <strong>Engr. Aslam Sheikh</strong> (Dip. Architecture &amp; Interior Design, NPI · B.Sc. in Civil Engg., IUBAT · IEB Membership No: A29734).</p>
      <p>${stats.map((s) => `${s.value}${s.suffix} ${escapeHtml(s.label)}`).join(' · ')}</p>
      <section>
        <h2>Our Core Services</h2>
        <ul>${homeServicesHtml}</ul>
        <p><a href="/services">View All Services</a> · <a href="/cost-estimator">Estimate Your Interior Cost</a></p>
      </section>
      <section>
        <h2>Featured Interior &amp; Architectural Projects</h2>
        <ul>${homeProjectsHtml}</ul>
        <p><a href="/projects">Browse All Completed Projects</a></p>
      </section>
      <section>
        <h2>Our 6-Step Turnkey Process</h2>
        <ol>${processSteps
          .map((st) => `<li><strong>${escapeHtml(st.title)}</strong> (${escapeHtml(st.duration)}) — ${escapeHtml(st.text)}</li>`)
          .join('')}</ol>
      </section>
      <section>
        <h2>Client Testimonials</h2>
        <ul>${testimonials
          .slice(0, 3)
          .map((t) => `<li>"${escapeHtml(t.text)}" — <strong>${escapeHtml(t.name)}</strong> (${escapeHtml(t.role)})</li>`)
          .join('')}</ul>
      </section>
      <section>
        <h2>Featured Interior Design Guides</h2>
        <ul>${homeBlogsHtml}</ul>
        <p><a href="/blog">Read All Articles</a> · <a href="/contact">Book Free Consultation</a></p>
      </section>
      ${navFooter}`,
  });

  // 1. Core static routes
  routes.push({
    path: '/about',
    title: 'About Us',
    description:
      "Learn about Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও, led by Engr. Aslam Sheikh. Over 10 years of experience delivering luxury interior design, architecture, and turnkey construction across Bangladesh.",
    bodyHtml: `<h1>About Brown's Interiors</h1>
      <p>Led by Founder &amp; Principal Designer <strong>Engr. Aslam Sheikh</strong> (Dip. Architecture &amp; Interior Design, NPI · B.Sc. in Civil Engg., IUBAT · IEB Membership No: A29734), Brown's Interiors delivers residential, commercial, architectural, structural, and exhibition booth turnkey execution across Dhaka and Bangladesh, alongside worldwide online architectural and interior design services.</p>
      <p>${stats.map((s) => `${s.value}${s.suffix} ${escapeHtml(s.label)}`).join(' · ')}</p>
      <h2>Leadership &amp; Execution Team</h2>
      <ul>${teamMembers
        .map(
          (m) => `<li><strong>${escapeHtml(m.name)}</strong> — ${escapeHtml(m.role)} (${escapeHtml(m.specialty)}). ${escapeHtml(m.responsibilities)}${m.qualificationSummary ? ` Credentials: ${escapeHtml(m.qualificationSummary)}.` : ''}</li>`
        )
        .join('')}</ul>
      <h2>Our 6-Step Execution Methodology</h2>
      <ol>${processSteps
        .map((st) => `<li><strong>${escapeHtml(st.title)}</strong> (${escapeHtml(st.phase)} · ${escapeHtml(st.duration)}) — ${escapeHtml(st.text)}</li>`)
        .join('')}</ol>
      ${navFooter}`,
  });

  routes.push({
    path: '/services',
    title: 'Our Services',
    description:
      "Explore interior design, architectural planning, structural engineering, renovation, and trade show booth solutions by Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও in Dhaka.",
    bodyHtml: `<h1>Interior Design, Architecture &amp; Turnkey Services</h1>
      <p>Holistic architecture, interior design, structural engineering, renovation, and turnkey execution solutions crafted for residential, commercial, and exhibition spaces in Dhaka and across Bangladesh.</p>
      <ul>${servicesData
        .map(
          (c) => `<li>
            <h2><a href="/services/${escapeHtml(c.slug)}">${escapeHtml(c.title)}</a></h2>
            <p>${escapeHtml(c.intro || c.tagline || c.description || '')}</p>
            ${
              Array.isArray(c.options)
                ? `<ul>${c.options
                    .map((o) => `<li><a href="/services/${escapeHtml(o.slug)}">${escapeHtml(o.title)}</a> — ${escapeHtml(o.tagline || o.desc || '')}</li>`)
                    .join('')}</ul>`
                : ''
            }
          </li>`
        )
        .join('')}</ul>
      ${navFooter}`,
  });

  routes.push({
    path: '/projects',
    title: 'Completed Projects Portfolio',
    description:
      "Browse our portfolio of completed luxury duplexes, corporate offices, restaurants, and villas in Gulshan, Banani, and Dhaka by Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও.",
    bodyHtml: `<h1>Completed Interior &amp; Architectural Projects</h1>
      <p>Explore our completed residential, commercial, architectural, and exhibition booth projects across Gulshan, Banani, Dhanmondi, Uttara, and Bashundhara R/A in Dhaka.</p>
      <ul>${projectsData
        .map(
          (p) => `<li>
            <h2><a href="/project/${p.id}">${escapeHtml(p.title)}</a></h2>
            <p>${escapeHtml(p.category)} · ${escapeHtml(p.location || 'Dhaka')} · ${escapeHtml(p.area || '')} · ${escapeHtml(p.year || '')}</p>
            <p>${escapeHtml(p.description || '')}</p>
          </li>`
        )
        .join('')}</ul>
      ${navFooter}`,
  });

  routes.push({
    path: '/process',
    title: 'Our Process',
    description:
      'Explore our proven 6-step interior and architecture process from consultation and 3D visualization to turnkey handover in Dhaka.',
    bodyHtml: `<h1>Our 6-Step Turnkey Design &amp; Build Process</h1>
      <p>A clear, systematic 6-step journey from your first concept and laser site survey to final turnkey handover with a 1-year workmanship warranty.</p>
      <ol>${processSteps
        .map(
          (st) => `<li>
            <h2>${escapeHtml(st.step)} — ${escapeHtml(st.title)} (${escapeHtml(st.phase)} · ${escapeHtml(st.duration)})</h2>
            <p>${escapeHtml(st.text)}</p>
          </li>`
        )
        .join('')}</ol>
      <p><a href="/cost-estimator">Estimate Your Project Cost</a> · <a href="/contact">Schedule a Site Visit</a></p>
      ${navFooter}`,
  });

  routes.push({
    path: '/testimonials',
    title: 'Client Reviews & Testimonials',
    description:
      "Read genuine testimonials from apartment owners, corporate directors, and commercial clients across Dhaka who transformed their spaces with Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও.",
    bodyHtml: `<h1>Client Reviews &amp; Testimonials</h1>
      <p>4.9 / 5 Average Client Rating · 250+ Handed-Over Spaces · Residential, Commercial &amp; Expo clients across Gulshan, Banani, Dhanmondi, Uttara, Bashundhara R/A, and overseas.</p>
      <ul>${testimonials
        .map(
          (t) => `<li>
            <blockquote>"${escapeHtml(t.text)}"</blockquote>
            <p><strong>${escapeHtml(t.name)}</strong> — ${escapeHtml(t.role)} (${t.rating}/5 Stars)</p>
          </li>`
        )
        .join('')}</ul>
      <p><a href="/projects">Explore Completed Projects</a> · <a href="/contact">Book Your Free Consultation</a></p>
      ${navFooter}`,
  });

  routes.push({
    path: '/cost-estimator',
    title: 'Interior Design Cost Calculator',
    description:
      'Estimate residential, commercial, and exhibition booth interior design costs instantly with our transparent budget calculator.',
    bodyHtml: `<h1>Dhaka Interior Design Cost Calculator (2026)</h1>
      <p>Instant, transparent budget calculation calibrated for Dhaka's residential, commercial office, and exhibition booth turnkey interior market by Engr. Aslam Sheikh.</p>
      <h2>Calibrated Turnkey Packages (per sq ft)</h2>
      <ul>
        <li><strong>Standard Tier (৳750 – ৳1,083.33 / sq ft · ~৳9 – 13 Lac for 1,200 sft Residential):</strong> Quality HPL board, clean electrical fit-out, and commercial hardware.</li>
        <li><strong>Premium Tier (৳1,083.33 – ৳2,083.33 / sq ft · ~৳13 – 25 Lac for 1,200 sft Residential):</strong> High-gloss acrylic, natural teak/oak veneer, and warm cove lighting.</li>
        <li><strong>Luxury Tier (৳1,666.67 – ৳3,750 / sq ft · ~৳20 – 45 Lac for 1,200 sft Residential):</strong> Italian marble, acoustic paneling, smart dimming, and bespoke millwork.</li>
      </ul>
      <h2>Space Multipliers</h2>
      <ul>
        <li><strong>Residential (1.0x):</strong> Apartments, homes, and duplexes.</li>
        <li><strong>Commercial &amp; Office (1.2x):</strong> Corporate offices, retail stores, restaurants, and showrooms.</li>
        <li><strong>Exhibition Booth (1.45x):</strong> Trade fair stalls and custom pavilions at BICC / ICCB.</li>
      </ul>
      <p>Need an itemized line-by-line BOQ for your floor plan? <a href="/contact">Book a Free Site Visit &amp; BOQ Consultation</a> or read our <a href="/blog/interior-design-cost-in-bangladesh-guide">Interior Design Cost Guide</a>.</p>
      ${navFooter}`,
  });

  routes.push({
    path: '/careers',
    title: 'Careers',
    description:
      "Join Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও in Uttara, Dhaka. Explore open career opportunities for Interior Designers, 3D Visualizers, Project Architects, Site Engineers, and Interns.",
    keywords: "Interior Design Jobs Dhaka, Architect Jobs Bangladesh, Civil Engineer Jobs Dhaka, 3D Visualizer Jobs, Brown's Interiors Careers",
    bodyHtml: `<h1>Careers at Brown's Interiors</h1>
      <p>Join our architects, interior designers, 3D visualizers, and site engineers at our Uttara, Dhaka-1230 studio. Send your CV and portfolio to <a href="mailto:career@brownsinteriorsbd.com">career@brownsinteriorsbd.com</a>.</p>
      <h2>Open Positions (${careerPositions.length})</h2>
      <ul>${careerPositions
        .map(
          (pos) => `<li>
            <h3>${escapeHtml(pos.title)}</h3>
            <p>${escapeHtml(pos.department)} · ${escapeHtml(pos.type)} · ${escapeHtml(pos.location)} · Experience: ${escapeHtml(pos.experience)} · ${escapeHtml(pos.compensation)}</p>
            <p>${escapeHtml(pos.summary)}</p>
            <ul>${pos.responsibilities.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>
            <ul>${pos.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>
          </li>`
        )
        .join('')}</ul>
      ${navFooter}`,
  });

  routes.push({
    path: '/contact',
    title: 'Contact Us & Book Free Consultation',
    description:
      "Contact Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও in Uttara, Dhaka. Book a free consultation, site visit, or request an itemized BOQ estimate for your residential or commercial project.",
    bodyHtml: `<h1>Contact Brown's Interiors &amp; Book a Free Consultation</h1>
      <p>Let's plan, design, and build your space with transparent itemized BOQ costing and engineering-led turnkey execution across Dhaka, Bangladesh, and worldwide.</p>
      <h2>Studio Contact Details</h2>
      <ul>
        <li><strong>Studio Location:</strong> Uttara, Dhaka-1230, Bangladesh</li>
        <li><strong>Phone &amp; WhatsApp:</strong> +880 1768-436319</li>
        <li><strong>Email:</strong> info@brownsinteriorsbd.com (Careers: career@brownsinteriorsbd.com)</li>
        <li><strong>Office Hours:</strong> Saturday – Thursday, 9:00 AM – 7:00 PM</li>
      </ul>
      <h2>Available Consultation Categories</h2>
      <ul>${servicesData
        .map((s) => `<li><a href="/services/${escapeHtml(s.slug)}">${escapeHtml(s.title)}</a> — ${escapeHtml(s.tagline || '')}</li>`)
        .join('')}</ul>
      <p>Want a quick budget range first? Try our <a href="/cost-estimator">Dhaka Interior Cost Estimator</a>.</p>
      ${navFooter}`,
  });

  routes.push({
    path: '/blog',
    title: 'Interior Design & Renovation Blog',
    description:
      "Practical guides, styling tips, budget planning advice, and exhibition stall design ideas from Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও.",
    bodyHtml: `<h1>Interior Design &amp; Renovation Guides</h1>
      <p>In-depth interior design guides, Dhaka cost breakdowns, renovation checklists, and studio insights by Engr. Aslam Sheikh and the Brown's Interiors team.</p>
      <ul>${blogPosts
        .map((b) => `<li><h2><a href="/blog/${escapeHtml(b.slug)}">${escapeHtml(b.title)}</a></h2><p>${escapeHtml(b.date)} · ${escapeHtml(b.readTime)} · ${escapeHtml(b.excerpt || '')}</p></li>`)
        .join('')}</ul>
      ${navFooter}`,
  });

  // 2. Service category & sub-service routes
  const seenServices = new Set();
  for (const category of servicesData) {
    const pushServiceRoute = (item, isCategory) => {
      if (seenServices.has(item.slug)) return;
      seenServices.add(item.slug);
      const desc = item.intro || item.tagline || item.desc || item.description || '';
      const img = item.image || (item.gallery && item.gallery[0]) || '/og-image.jpg';
      const urlPath = `/services/${item.slug}`;
      const schema = [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: item.title,
          description: desc,
          serviceType: category.title,
          image: toAbsoluteUrl(domain, img),
          url: `${domain}${urlPath}`,
          provider: { '@id': `${domain}/#organization` },
          areaServed: { '@type': 'Country', name: 'Bangladesh' },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${domain}/` },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${domain}/services` },
            ...(isCategory
              ? [{ '@type': 'ListItem', position: 3, name: item.title, item: `${domain}${urlPath}` }]
              : [
                  { '@type': 'ListItem', position: 3, name: category.title, item: `${domain}/services/${category.slug}` },
                  { '@type': 'ListItem', position: 4, name: item.title, item: `${domain}${urlPath}` },
                ]),
          ],
        },
      ];
      const specsHtml = Array.isArray(item.specs) && item.specs.length
        ? `<ul>${item.specs.map((sp) => `<li><strong>${escapeHtml(sp.label)}:</strong> ${escapeHtml(sp.value)}</li>`).join('')}</ul>`
        : '';
      const highlightsHtml = Array.isArray(item.highlights) && item.highlights.length
        ? `<p><strong>Key Areas:</strong> ${item.highlights.map((h) => escapeHtml(h)).join(' · ')}</p>`
        : '';
      const optionsHtml =
        isCategory && Array.isArray(category.options)
          ? `<h2>Specialized Services</h2><ul>${category.options
              .map((o) => `<li><a href="/services/${escapeHtml(o.slug)}">${escapeHtml(o.title)}</a> — ${escapeHtml(o.tagline || o.desc || '')}</li>`)
              .join('')}</ul>`
          : '';
      const featuresHtml = Array.isArray(item.features)
        ? `<h2>What Is Included</h2><ul>${item.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}</ul>`
        : '';
      const siblingHtml =
        !isCategory && Array.isArray(category.options)
          ? `<h2>Related ${escapeHtml(category.shortTitle || category.title)} Services</h2><ul>${category.options
              .filter((o) => o.slug !== item.slug)
              .map((o) => `<li><a href="/services/${escapeHtml(o.slug)}">${escapeHtml(o.title)}</a></li>`)
              .join('')}</ul>`
          : '';

      routes.push({
        path: urlPath,
        title: `${item.title} - Interior & Architectural Service`,
        description: desc,
        image: img,
        schema,
        bodyHtml: `<article>
          <h1>${escapeHtml(item.title)}</h1>
          <p>${escapeHtml(desc)}</p>
          ${item.description && item.description !== desc ? `<p>${escapeHtml(item.description)}</p>` : ''}
          ${specsHtml}
          ${highlightsHtml}
          ${featuresHtml}
          ${optionsHtml}
          ${siblingHtml}
          <p><a href="/cost-estimator">Estimate Cost</a> · <a href="/contact">Book Consultation</a></p>
        </article>${navFooter}`,
      });
    };

    pushServiceRoute(category, true);
    if (Array.isArray(category.options)) {
      for (const opt of category.options) {
        pushServiceRoute(opt, false);
      }
    }
  }

  // 3. Project detail routes
  for (const project of projectsData) {
    const img = project.coverImage || project.image || '/og-image.jpg';
    const urlPath = `/project/${project.id}`;
    routes.push({
      path: urlPath,
      title: `${project.title} - Interior Project`,
      description: project.description,
      image: img,
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          image: toAbsoluteUrl(domain, img),
          url: `${domain}${urlPath}`,
          creator: { '@id': `${domain}/#organization` },
          locationCreated: project.location ? { '@type': 'Place', name: project.location } : undefined,
          dateCreated: project.year,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${domain}/` },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: `${domain}/projects` },
            { '@type': 'ListItem', position: 3, name: project.title, item: `${domain}${urlPath}` },
          ],
        },
      ],
      bodyHtml: `<article>
        <h1>${escapeHtml(project.title)}</h1>
        <ul>
          <li><strong>Category:</strong> ${escapeHtml(project.category || '')}</li>
          <li><strong>Client:</strong> ${escapeHtml(project.client || 'Private Client')}</li>
          <li><strong>Location:</strong> ${escapeHtml(project.location || 'Dhaka')}</li>
          <li><strong>Area:</strong> ${escapeHtml(project.area || '')}</li>
          <li><strong>Year:</strong> ${escapeHtml(project.year || '')}</li>
        </ul>
        <p>${escapeHtml(project.description || '')}</p>
        <p><a href="/projects">View All Completed Projects</a> · <a href="/cost-estimator">Estimate Similar Project Cost</a> · <a href="/contact">Book Free Consultation</a></p>
      </article>${navFooter}`,
    });
  }

  // 4. Blog post routes (full English + Bengali text rendered for maximum crawlability)
  for (const post of blogPosts) {
    const urlPath = `/blog/${post.slug}`;
    const blogPostingSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      image: [toAbsoluteUrl(domain, post.image)],
      datePublished: post.publishDateISO || '2026-10-20T09:00:00+06:00',
      dateModified: post.publishDateISO || '2026-10-20T09:00:00+06:00',
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${domain}${urlPath}` },
      author: {
        '@type': 'Person',
        name: post.author?.name || 'Engr. Aslam Sheikh',
        jobTitle: post.author?.role || 'Founder & Principal Designer',
        image: toAbsoluteUrl(domain, post.author?.avatar || '/team/engr-aslam-sheikh.webp'),
        url: `${domain}/about`,
      },
      publisher: {
        '@type': 'Organization',
        name: "Brown's Interiors",
        alternateName: ["Brown's Interior", BRAND_NAME],
        url: domain,
        logo: { '@type': 'ImageObject', url: `${domain}/favicon-512x512.png`, width: 512, height: 512 },
      },
      keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : undefined,
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${domain}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: `${domain}${urlPath}` },
      ],
    };

    const faqSchema =
      Array.isArray(post.faqs) && post.faqs.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: stripMarkdown(faq.answer) },
            })),
          }
        : null;

    const itemListSchema =
      Array.isArray(post.featuredFirms) && post.featuredFirms.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: post.title,
            numberOfItems: post.featuredFirms.length,
            itemListElement: post.featuredFirms.map((firm, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: firm.name,
              ...(firm.url
                ? {
                    url: firm.url.includes('brownsinterior')
                      ? `${domain}/`
                      : firm.url,
                  }
                : {}),
            })),
          }
        : null;

    const introHtml = (post.intro || post.body || [])
      .map((p) => `<p>${formatRichTextHtml(p)}</p>`)
      .join('');

    const rankedHtml =
      post.rankedFirmsSection && Array.isArray(post.rankedFirmsSection.firms)
        ? `<section id="${escapeHtml(post.rankedFirmsSection.id || 'top-ranking')}">
            <h2>${escapeHtml(post.rankedFirmsSection.title || '')}</h2>
            ${post.rankedFirmsSection.lead ? `<p>${escapeHtml(post.rankedFirmsSection.lead)}</p>` : ''}
            <ul>${post.rankedFirmsSection.firms
              .map(
                (f) => `<li>
                  <h3>${escapeHtml(f.name)}</h3>
                  <img src="${escapeHtml(f.logo)}" alt="${escapeHtml(f.logoAlt || f.name)}" width="110" height="26" loading="lazy" />
                  <p>${escapeHtml(f.location || '')}${f.websiteLabel ? ` · ${escapeHtml(f.websiteLabel)}` : ''}</p>
                  ${(Array.isArray(f.paragraphs) && f.paragraphs.length ? f.paragraphs : [f.summary || ''])
                    .map((p) => `<p>${formatRichTextHtml(p)}</p>`)
                    .join('')}
                </li>`
              )
              .join('')}</ul>
          </section>`
        : '';

    const sectionsHtml = (post.sections || [])
      .map(
        (sec, idx) => `<section id="${escapeHtml(sec.id || '')}">
          <h2>${escapeHtml(sec.title || '')}</h2>
          ${sec.lead ? `<p><em>${escapeHtml(sec.lead)}</em></p>` : ''}
          ${(sec.paragraphs || []).map((p) => `<p>${formatRichTextHtml(p)}</p>`).join('')}
          ${
            Array.isArray(sec.keyTakeaways) && sec.keyTakeaways.length
              ? `<ul>${sec.keyTakeaways.map((k) => `<li>${formatRichTextHtml(k)}</li>`).join('')}</ul>`
              : ''
          }
        </section>${idx === 0 ? rankedHtml : ''}`
      )
      .join('');

    const faqsHtml =
      Array.isArray(post.faqs) && post.faqs.length
        ? `<section id="faqs"><h2>Frequently Asked Questions</h2>${post.faqs
            .map((f) => `<h3>${escapeHtml(f.question)}</h3><p>${formatRichTextHtml(f.answer)}</p>`)
            .join('')}</section>`
        : '';

    const bnSummaryHtml = post.bn?.title
      ? `<section lang="bn"><h2>${escapeHtml(post.bn.title)}</h2><p>${escapeHtml(post.bn.subtitle || post.bn.excerpt || '')}</p></section>`
      : '';

    routes.push({
      path: urlPath,
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : '',
      image: post.image,
      type: 'article',
      schema: [blogPostingSchema, breadcrumbSchema, itemListSchema, faqSchema].filter(Boolean),
      bodyHtml: `<article>
        <h1>${escapeHtml(post.title)}</h1>
        ${post.subtitle ? `<p>${escapeHtml(post.subtitle)}</p>` : ''}
        ${introHtml}
        ${sectionsHtml}
        ${faqsHtml}
        ${bnSummaryHtml}
      </article>${navFooter}`,
    });
  }

  // 5. True HTTP 404 fallback page (served automatically by Vercel when no file matches)
  routes.push({
    path: '/404',
    outFile: '404.html',
    noindex: true,
    title: '404 - Page Not Found',
    description: "The requested page could not be found on Brown's Interiors.",
    bodyHtml: `<h1>404 — Page Not Found</h1>
      <p>The page you are looking for does not exist or has moved. Explore our services, completed projects, or blog guides below.</p>
      ${navFooter}`,
  });

  // Write each pre-rendered HTML file to dist/
  for (const route of routes) {
    const outRel = route.outFile || `${route.path.replace(/^\/+/, '')}.html`;
    const outPath = path.join(distDir, outRel);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, renderStaticRouteHtml(template, domain, route), 'utf8');
  }

  console.log(`Successfully prerendered ${routes.length} static SEO routes into ${distDir}`);
}
