import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BRAND_NAME = "Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও";
const SHORT_BRAND_NAME = "Brown's Interiors";
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
  return /brown['’]?s\s+interior/i.test(title) ? title : `${title} | ${SHORT_BRAND_NAME}`;
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

function renderFigureHtml(src, alt, caption) {
  if (!src) return '';
  return `<figure style="margin:20px 0">
    <img src="${escapeHtml(src)}" alt="${escapeHtml(alt || '')}" width="960" height="600" loading="lazy" style="max-width:100%;height:auto;border-radius:12px" />
    ${caption ? `<figcaption style="font-size:14px;color:#5a524a;margin-top:6px">${escapeHtml(caption)}</figcaption>` : ''}
  </figure>`;
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
  const { servicesData, findServiceOrOption } = await import('../src/data/servicesData.js');
  const { serviceDetailsContent } = await import('../src/data/serviceDetailsContent.js');
  const { projectsData } = await import('../src/data/projectsData.js');
  const { projectCaseStudies } = await import('../src/data/projectCaseStudies.js');
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

  // 0. Homepage (/)
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
      ${renderFigureHtml('/optimized/hero/slide-1-1600.webp', "Luxury residential interior design in Dhaka by Brown's Interiors")}
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
    title: 'About Us & Leadership Team',
    description:
      "Meet Engr. Aslam Sheikh and the Brown's Interiors team in Uttara, Dhaka. 10+ years delivering turnkey interiors, architecture, and civil engineering.",
    bodyHtml: `<h1>About Brown's Interiors</h1>
      <p>Led by Founder &amp; Principal Designer <strong>Engr. Aslam Sheikh</strong> (Dip. Architecture &amp; Interior Design, NPI · B.Sc. in Civil Engg., IUBAT · IEB Membership No: A29734), Brown's Interiors delivers residential, commercial, architectural, structural, and exhibition booth turnkey execution across Dhaka and Bangladesh, alongside worldwide online architectural and interior design services.</p>
      ${renderFigureHtml('/team/engr-aslam-sheikh.webp', "Engr. Aslam Sheikh — Founder & Principal Designer of Brown's Interiors")}
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
    title: 'Interior Design & Architecture Services in Dhaka',
    description:
      'Explore residential & office interior design, RAJUK architecture, structural engineering, renovation, and exhibition booth solutions across Bangladesh.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: "Interior Design & Architecture Services | Brown's Interiors",
      url: `${domain}/services`,
      description: 'Complete interior design, architectural planning, structural engineering, renovation, and exhibition booth services across Bangladesh.',
    },
    bodyHtml: `<h1>Interior Design, Architecture &amp; Turnkey Services</h1>
      <p>Holistic architecture, interior design, structural engineering, renovation, and turnkey execution solutions crafted for residential, commercial, and exhibition spaces in Dhaka and across Bangladesh.</p>
      ${renderFigureHtml('/portfolio/interior/living-room.webp', "Turnkey residential interior design in Dhaka by Brown's Interiors")}
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
    title: 'Completed Interior Projects Portfolio in Dhaka',
    description:
      'Browse completed luxury apartments, duplexes, corporate offices, villas, and exhibition booths in Gulshan, Banani, Dhanmondi, and Uttara, Dhaka.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: "Completed Interior & Architectural Projects | Brown's Interiors",
      url: `${domain}/projects`,
    },
    bodyHtml: `<h1>Completed Interior &amp; Architectural Projects</h1>
      <p>Explore our completed residential, commercial, architectural, and exhibition booth projects across Gulshan, Banani, Dhanmondi, Uttara, and Bashundhara R/A in Dhaka.</p>
      <ul>${projectsData
        .map(
          (p) => `<li>
            <h2><a href="/project/${p.id}">${escapeHtml(p.title)}</a></h2>
            ${renderFigureHtml(p.image, `${p.title} in ${p.location}`)}
            <p>${escapeHtml(p.category)} · ${escapeHtml(p.location || 'Dhaka')} · ${escapeHtml(p.area || '')} · ${escapeHtml(p.year || '')}</p>
            <p>${escapeHtml(p.description || '')}</p>
          </li>`
        )
        .join('')}</ul>
      ${navFooter}`,
  });

  const processFaqs = [
    {
      question: 'What happens during the initial site visit and consultation?',
      answer:
        'Our design engineer visits your flat, office, or plot in Dhaka with laser measurement tools to record exact room dimensions, column and beam positions, plumbing stacks, and electrical DB capacity while discussing your functional goals and target budget.',
    },
    {
      question: 'Do I see 3D designs and approve materials before site work begins?',
      answer:
        'Yes. We never cut a single board or order finishes until you review photorealistic 3D views, inspect physical material sample boards (plywood, HPL, veneer, marble, hardware), and sign off on your room-by-room itemized BOQ.',
    },
    {
      question: 'How does Brown’s Interiors guarantee on-time handover in Dhaka?',
      answer:
        'We run off-site workshop fabrication in parallel with on-site civil and MEP rough-in under a milestone Gantt schedule supervised daily by our civil and interior engineers, ending with a 50-point snag inspection and 1-year workmanship warranty.',
    },
  ];

  routes.push({
    path: '/process',
    title: 'Our 6-Step Turnkey Design & Build Process',
    description:
      'Explore our proven 6-step interior and architectural process in Dhaka from laser site survey and 4K 3D renders to itemized BOQ and turnkey handover.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: processFaqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    bodyHtml: `<h1>Our 6-Step Turnkey Design &amp; Build Process</h1>
      <p>A clear, systematic 6-step interior and architectural workflow engineered by Engr. Aslam Sheikh to take Dhaka residential flats, corporate offices, villas, and ICCB/BICC exhibition booths from first concept and laser site survey to final turnkey handover with a written 1-year workmanship warranty.</p>
      ${renderFigureHtml('/portfolio/residential/bedroom-bay-window-suite.webp', "Turnkey residential execution workflow by Brown's Interiors in Dhaka")}
      <h2>Step-by-Step Project Delivery</h2>
      <ol>${processSteps
        .map(
          (st) => `<li>
            <h3>${escapeHtml(st.step)} — ${escapeHtml(st.title)} (${escapeHtml(st.phase)} · ${escapeHtml(st.duration)})</h3>
            <p>${escapeHtml(st.text)}</p>
          </li>`
        )
        .join('')}</ol>
      <h2>Why Structured Engineering Matters</h2>
      <p>Most interior delays and cost overruns in Bangladesh stem from starting site carpentry before electrical, AC, plumbing, and material specifications are resolved. By separating discovery, 2D AutoCAD zoning, 4K 3D visualization, physical sample approval, and itemized BOQ lock-in ahead of mobilization, every trade works from one unified drawing set with zero guesswork.</p>
      <h2>Process Frequently Asked Questions</h2>
      ${processFaqs.map((f) => `<h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p>`).join('')}
      <p><a href="/cost-estimator">Estimate Your Project Cost</a> · <a href="/blog/how-browns-interiors-works-process">Read Full Process Walkthrough</a> · <a href="/contact">Schedule a Site Visit</a></p>
      ${navFooter}`,
  });

  routes.push({
    path: '/testimonials',
    title: 'Client Reviews & Testimonials in Dhaka',
    description:
      "Read verified reviews from Gulshan, Banani, Dhanmondi, Bashundhara, and UK NRB clients who transformed their homes and offices with Brown's Interiors.",
    bodyHtml: `<h1>Client Reviews &amp; Testimonials</h1>
      <p>Rated 4.9 out of 5 across 250+ handed-over residential apartments, duplex villas, corporate offices, restaurants, and trade exhibition booths across Gulshan, Banani, Dhanmondi, Uttara, Bashundhara R/A, and overseas NRB communities in the UK, USA, Canada, and Middle East.</p>
      ${renderFigureHtml('/portfolio/residential/living-marble-luxury-hall.webp', "Completed Gulshan residence handed over by Brown's Interiors")}
      <h2>Verified Client Stories Across Dhaka &amp; Abroad</h2>
      <p>From 1,200 sq ft family flats in Uttara and Dhanmondi to 7,800 sq ft corporate headquarters in Banani and overnight ICCB trade show pavilions, our clients judge our work on three promises: exact 3D-to-reality finishing, transparent itemized BOQ pricing with zero hidden extras, and punctual handover backed by a 1-year workmanship warranty.</p>
      <ul>${testimonials
        .map(
          (t) => `<li>
            <blockquote>"${escapeHtml(t.text)}"</blockquote>
            <p><strong>${escapeHtml(t.name)}</strong> — ${escapeHtml(t.role)} (${t.rating}/5 Stars)</p>
          </li>`
        )
        .join('')}</ul>
      <h2>What Homeowners &amp; Corporate Clients Highlight Most</h2>
      <ul>
        <li><strong>Itemized BOQ Transparency:</strong> Clear unit rates and locked material brands agreed before mobilization so budgets stay predictable.</li>
        <li><strong>3D-to-Reality Fidelity:</strong> Permanent in-house carpentry, electrical, glazing, and polishing teams building strictly to approved drawings.</li>
        <li><strong>Reliable Remote NRB Updates:</strong> Weekly WhatsApp and cloud walkthrough videos allowing overseas families to complete Dhaka flats stress-free.</li>
        <li><strong>Post-Handover Support:</strong> Dedicated 1-year workmanship warranty and responsive maintenance checks after move-in.</li>
      </ul>
      <p><a href="/projects">Explore Completed Projects</a> · <a href="/services/remote-international-design-services">NRB Remote Services</a> · <a href="/contact">Book Your Free Consultation</a></p>
      ${navFooter}`,
  });

  const calcFaqs = [
    {
      question: 'How accurate is the Dhaka interior design cost estimator?',
      answer:
        'Our estimator is calibrated directly from real Dhaka turnkey BOQ benchmarks maintained by Engr. Aslam Sheikh across 250+ residential, commercial, and exhibition projects. It gives a realistic planning range before an on-site laser survey produces your exact line-by-line BOQ.',
    },
    {
      question: 'What factors change per-sq-ft interior pricing the most?',
      answer:
        'Total square footage of custom cabinetry (wardrobes, modular kitchen, wall paneling), core board grade (commercial ply vs. waterproof marine plywood/HDHMR), surface finish (HPL vs. acrylic/veneer/PU lacquer), marble or quartz stone volume, and imported German hardware.',
    },
    {
      question: 'Are electrical appliances, ACs, and loose decor included in the estimate?',
      answer:
        'Turnkey interior estimates cover civil updates, ceilings, concealed electrical/lighting, paint, paneling, modular kitchen, and fixed cabinetry. Loose electronics (ACs, TVs, ovens, refrigerators) are itemized separately upon request so you never pay hidden markups.',
    },
  ];

  routes.push({
    path: '/cost-estimator',
    title: 'Dhaka Interior Design Cost Calculator (2026)',
    description:
      'Calculate residential flat, corporate office, and exhibition booth interior costs in Dhaka per sq ft across Standard, Premium, and Luxury tiers.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: calcFaqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    bodyHtml: `<h1>Dhaka Interior Design Cost Calculator (2026)</h1>
      <p>Instant, transparent budget calculation calibrated specifically for Dhaka's residential apartment, corporate office, and trade exhibition booth turnkey interior market by Engr. Aslam Sheikh.</p>
      ${renderFigureHtml('/portfolio/interior/modern-kitchen.webp', "Modular kitchen and residential turnkey interior costing in Dhaka by Brown's Interiors")}
      <h2>Calibrated Turnkey Packages (per sq ft)</h2>
      <ul>
        <li><strong>Standard Tier (৳750 – ৳1,083.33 / sq ft · ~৳9 – 13 Lac for 1,200 sft Residential):</strong> Quality HPL laminated cabinetry, clean electrical and LED fit-out, false ceiling margins, damp-proof paint, and dependable commercial hardware.</li>
        <li><strong>Premium Tier (৳1,083.33 – ৳2,083.33 / sq ft · ~৳13 – 25 Lac for 1,200 sft Residential):</strong> High-gloss acrylic and natural teak/oak veneer finishes, waterproof marine plywood kitchen base units, quartz counters, soft-close hardware, and warm architectural cove lighting.</li>
        <li><strong>Luxury Tier (৳1,666.67 – ৳3,750 / sq ft · ~৳20 – 45 Lac for 1,200 sft Residential):</strong> Book-matched Italian marble accents, acoustic fluted paneling, PU lacquer bespoke millwork, smart scene dimmers, and custom handcrafted furniture.</li>
      </ul>
      <h2>Space Type Multipliers</h2>
      <ul>
        <li><strong>Residential (1.0x):</strong> Apartments, duplexes, triplex villas, and family homes across Uttara, Bashundhara R/A, Dhanmondi, Banani, and Gulshan.</li>
        <li><strong>Commercial &amp; Office (1.2x):</strong> Corporate offices, buying houses, retail showrooms, cafés, and clinics requiring acoustic glass partitions and heavy-duty MEP.</li>
        <li><strong>Exhibition Booth (1.45x):</strong> Custom trade fair stalls and flagship pavilions engineered for rapid overnight setup at BICC and ICCB.</li>
      </ul>
      <h2>Interior Costing Frequently Asked Questions</h2>
      ${calcFaqs.map((f) => `<h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p>`).join('')}
      <p>Need an exact itemized BOQ for your floor plan? <a href="/contact">Book a Free Site Visit &amp; BOQ Consultation</a> or read our complete <a href="/blog/interior-design-cost-in-bangladesh-guide">2026 Interior Design Cost Guide for Bangladesh</a>.</p>
      ${navFooter}`,
  });

  routes.push({
    path: '/careers',
    title: "Careers at Brown's Interiors — Uttara, Dhaka",
    description:
      "Join Brown's Interiors in Uttara, Dhaka. Explore open roles for Interior Designers, 3D Visualizers, Project Architects, Site Engineers, and Interns.",
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
    title: 'Contact Us & Book Free Consultation in Dhaka',
    description:
      "Contact Brown's Interiors in Uttara, Dhaka (+880 1768-436319). Book a free site visit, design consultation, or itemized BOQ for your project.",
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: "Contact Brown's Interiors",
      url: `${domain}/contact`,
      mainEntity: { '@id': `${domain}/#organization` },
    },
    bodyHtml: `<h1>Contact Brown's Interiors &amp; Book a Free Consultation</h1>
      <p>Let's plan, design, and build your residential apartment, duplex villa, corporate office, retail showroom, or trade exhibition booth with transparent itemized BOQ costing and civil-engineer-led turnkey execution across Dhaka, Bangladesh, and worldwide.</p>
      <h2>Studio Contact Details</h2>
      <ul>
        <li><strong>Studio Location:</strong> Uttara, Dhaka-1230, Bangladesh</li>
        <li><strong>Direct Phone &amp; WhatsApp:</strong> +880 1768-436319</li>
        <li><strong>General &amp; Project Inquiries:</strong> info@brownsinteriorsbd.com</li>
        <li><strong>Careers &amp; Recruitment:</strong> career@brownsinteriorsbd.com</li>
        <li><strong>Office Hours:</strong> Saturday – Thursday, 9:00 AM – 7:00 PM (BST)</li>
      </ul>
      <h2>Service Coverage Across Dhaka &amp; Worldwide</h2>
      <p>Our engineering and execution teams conduct on-site surveys and full turnkey builds across Uttara, Gulshan, Banani, Baridhara, Bashundhara R/A, Dhanmondi, Mirpur DOHS, Mohakhali, Motijheel, and major Bangladeshi cities—plus dedicated Zoom consultations and turnkey Dhaka handover for Non-Resident Bangladeshi (NRB) clients in the UK, USA, Canada, Europe, Australia, and the Middle East.</p>
      <h2>What to Share for a Faster Proposal</h2>
      <ul>
        <li>Approximate floor area (sq ft or katha) and property neighborhood</li>
        <li>Project type (new flat handover, renovation, corporate office, building architecture, or ICCB/BICC expo stall)</li>
        <li>Target move-in or launch date and comfortable budget tier (Standard, Premium, or Luxury)</li>
      </ul>
      <h2>Available Consultation Categories</h2>
      <ul>${servicesData
        .map((s) => `<li><a href="/services/${escapeHtml(s.slug)}">${escapeHtml(s.title)}</a> — ${escapeHtml(s.tagline || '')}</li>`)
        .join('')}</ul>
      <p>Want a quick budget range first? Try our <a href="/cost-estimator">Dhaka Interior Cost Estimator</a> or browse our <a href="/projects">Completed Projects</a>.</p>
      ${navFooter}`,
  });

  routes.push({
    path: '/blog',
    title: 'Interior Design & Renovation Blog Bangladesh',
    description:
      'Practical interior design guides, Dhaka sq ft cost breakdowns, small apartment tips, and exhibition booth insights by Engr. Aslam Sheikh.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: "Interior Design & Renovation Blog | Brown's Interiors",
      url: `${domain}/blog`,
    },
    bodyHtml: `<h1>Interior Design &amp; Renovation Guides</h1>
      <p>In-depth interior design guides, Dhaka cost breakdowns, renovation checklists, and studio insights by Engr. Aslam Sheikh and the Brown's Interiors team.</p>
      <ul>${blogPosts
        .map((b) => `<li><h2><a href="/blog/${escapeHtml(b.slug)}">${escapeHtml(b.title)}</a></h2><p>${escapeHtml(b.date)} · ${escapeHtml(b.readTime)} · ${escapeHtml(b.excerpt || '')}</p></li>`)
        .join('')}</ul>
      ${navFooter}`,
  });

  // 2. Service category & sub-service routes (all 36 enriched with unique editorial, standards, FAQs, images & cross-links)
  const seenServices = new Set();
  for (const category of servicesData) {
    const pushServiceRoute = (item, isCategory) => {
      if (seenServices.has(item.slug)) return;
      seenServices.add(item.slug);
      const rich = serviceDetailsContent[item.slug] || null;
      const seoTitle = rich?.seoTitle || `${item.title} in Dhaka`;
      const desc = rich?.seoDescription || item.intro || item.tagline || item.desc || item.description || '';
      const leadCopy = item.intro || item.tagline || item.desc || item.description || '';
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
        ...(rich?.faqs?.length
          ? [
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: rich.faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: { '@type': 'Answer', text: faq.answer },
                })),
              },
            ]
          : []),
      ];

      const specsHtml = Array.isArray(item.specs) && item.specs.length
        ? `<ul>${item.specs.map((sp) => `<li><strong>${escapeHtml(sp.label)}:</strong> ${escapeHtml(sp.value)}</li>`).join('')}</ul>`
        : '';
      const highlightsHtml = Array.isArray(item.highlights) && item.highlights.length
        ? `<p><strong>Key Areas:</strong> ${item.highlights.map((h) => escapeHtml(h)).join(' · ')}</p>`
        : '';
      const featuresHtml = Array.isArray(item.features)
        ? `<h2>What Is Included</h2><ul>${item.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}</ul>`
        : '';
      const overviewHtml = rich?.overview?.length
        ? `<section><h2>How We Deliver ${escapeHtml(item.title)} in Dhaka</h2>${rich.overview
            .map((p) => `<p>${escapeHtml(p)}</p>`)
            .join('')}</section>`
        : '';
      const standardsHtml = rich?.technicalStandards?.length
        ? `<section><h2>Technical Standards &amp; Deliverables</h2><ul>${rich.technicalStandards
            .map((st) => `<li>${escapeHtml(st)}</li>`)
            .join('')}</ul></section>`
        : '';
      const faqsHtml = rich?.faqs?.length
        ? `<section><h2>Frequently Asked Questions</h2>${rich.faqs
            .map((f) => `<h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p>`)
            .join('')}</section>`
        : '';
      const optionsHtml =
        isCategory && Array.isArray(category.options)
          ? `<h2>Specialized ${escapeHtml(category.shortTitle || category.title)} Services</h2><ul>${category.options
              .map((o) => `<li><a href="/services/${escapeHtml(o.slug)}">${escapeHtml(o.title)}</a> — ${escapeHtml(o.tagline || o.desc || '')}</li>`)
              .join('')}</ul>`
          : '';
      const siblingHtml =
        !isCategory && Array.isArray(category.options)
          ? `<h2>Related ${escapeHtml(category.shortTitle || category.title)} Services</h2><ul>${category.options
              .filter((o) => o.slug !== item.slug)
              .map((o) => `<li><a href="/services/${escapeHtml(o.slug)}">${escapeHtml(o.title)}</a></li>`)
              .join('')}</ul>`
          : '';

      const relatedProjects = (rich?.relatedProjectIds || [])
        .map((pid) => projectsData.find((p) => p.id === pid))
        .filter(Boolean);
      const relatedBlogs = (rich?.relatedBlogSlugs || [])
        .map((bslug) => blogPreviews.find((b) => b.slug === bslug))
        .filter(Boolean);

      const crossLinksHtml =
        relatedProjects.length || relatedBlogs.length
          ? `<section>
              ${
                relatedProjects.length
                  ? `<h2>Related Completed Projects</h2><ul>${relatedProjects
                      .map((p) => `<li><a href="/project/${p.id}">${escapeHtml(p.title)}</a> (${escapeHtml(p.location)} · ${escapeHtml(p.area)})</li>`)
                      .join('')}</ul>`
                  : ''
              }
              ${
                relatedBlogs.length
                  ? `<h2>Helpful Planning Guides</h2><ul>${relatedBlogs
                      .map((b) => `<li><a href="/blog/${escapeHtml(b.slug)}">${escapeHtml(b.title)}</a></li>`)
                      .join('')}</ul>`
                  : ''
              }
            </section>`
          : '';

      const heroFigureHtml = img.startsWith('/') ? renderFigureHtml(img, `${item.title} by Brown's Interiors in Dhaka`) : '';

      routes.push({
        path: urlPath,
        title: seoTitle,
        description: desc,
        image: img,
        schema,
        bodyHtml: `<article>
          <h1>${escapeHtml(item.title)}</h1>
          <p>${escapeHtml(leadCopy)}</p>
          ${item.description && item.description !== leadCopy ? `<p>${escapeHtml(item.description)}</p>` : ''}
          ${heroFigureHtml}
          ${specsHtml}
          ${highlightsHtml}
          ${featuresHtml}
          ${overviewHtml}
          ${standardsHtml}
          ${faqsHtml}
          ${optionsHtml}
          ${siblingHtml}
          ${crossLinksHtml}
          <p><a href="/cost-estimator">Estimate Cost</a> · <a href="/contact">Book Free Consultation</a></p>
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

  // 3. Project detail routes (all 7 enriched with full architectural case studies, images & cross-links)
  for (const project of projectsData) {
    const study = projectCaseStudies[project.id] || null;
    const img = project.coverImage || project.image || '/og-image.jpg';
    const urlPath = `/project/${project.id}`;
    const seoTitle = study?.seoTitle || `${project.title} — ${project.location}`;
    const seoDesc = study?.seoDescription || project.description;

    const relatedServices = (study?.relatedServiceSlugs || [])
      .map((slug) => findServiceOrOption(slug)?.data)
      .filter(Boolean);
    const otherProjects = projectsData.filter((p) => p.id !== project.id).slice(0, 3);

    const galleryHtml = Array.isArray(project.gallery)
      ? `<section><h2>Project Gallery</h2>${project.gallery
          .map((gImg, idx) => {
            const cap = study?.galleryCaptions?.[idx] || `${project.title} — View ${idx + 1}`;
            return renderFigureHtml(gImg, cap, cap);
          })
          .join('')}</section>`
      : '';

    routes.push({
      path: urlPath,
      title: seoTitle,
      description: seoDesc,
      image: img,
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: seoDesc,
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
          ${study?.timeline ? `<li><strong>Timeline:</strong> ${escapeHtml(study.timeline)}</li>` : ''}
          ${study?.scope ? `<li><strong>Scope:</strong> ${escapeHtml(study.scope)}</li>` : ''}
        </ul>
        <section>
          <h2>Project Overview</h2>
          <p>${escapeHtml(project.description || '')}</p>
        </section>
        ${
          study
            ? `<section>
                <h2>Design Brief &amp; Site Context</h2>
                <p>${escapeHtml(study.brief)}</p>
                <h2>Architectural &amp; Engineering Execution</h2>
                <p>${escapeHtml(study.solution)}</p>
                <h2>Materials &amp; Finishes Specified</h2>
                <ul>${study.materials.map((m) => `<li>${escapeHtml(m)}</li>`).join('')}</ul>
                <h2>Key Delivery Highlights</h2>
                <ul>${study.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}</ul>
              </section>`
            : ''
        }
        ${galleryHtml}
        ${
          relatedServices.length
            ? `<section><h2>Services Behind This Project</h2><ul>${relatedServices
                .map((s) => `<li><a href="/services/${escapeHtml(s.slug)}">${escapeHtml(s.title)}</a></li>`)
                .join('')}</ul></section>`
            : ''
        }
        <section>
          <h2>More Completed Projects</h2>
          <ul>${otherProjects
            .map((op) => `<li><a href="/project/${op.id}">${escapeHtml(op.title)}</a> (${escapeHtml(op.location)} · ${escapeHtml(op.area)})</li>`)
            .join('')}</ul>
        </section>
        <p><a href="/projects">View All Completed Projects</a> · <a href="/cost-estimator">Estimate Similar Project Cost</a> · <a href="/contact">Book Free Consultation</a></p>
      </article>${navFooter}`,
    });
  }

  // 4. Blog post routes (full English + Bengali text + inline images rendered for maximum crawlability)
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
          ${sec.inlineImage?.src ? renderFigureHtml(sec.inlineImage.src, sec.inlineImage.alt || sec.title, sec.inlineImage.caption || '') : ''}
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
        ${post.image ? renderFigureHtml(post.image, post.title) : ''}
        ${introHtml}
        ${sectionsHtml}
        ${faqsHtml}
        ${bnSummaryHtml}
      </article>${navFooter}`,
    });
  }

  // 5. True HTTP 404 fallback page
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
