import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function generateSitemap() {
  const { servicesData } = await import('../src/data/servicesData.js');
  const { projectsData } = await import('../src/data/projectsData.js');
  const { blogPosts } = await import('../src/data/siteData.js');

  const domain = 'https://www.brownsinterior.com';
  const today = new Date().toISOString().split('T')[0];

  const urls = [];

  // Helper to ensure all image URLs are strictly absolute (Google Image Sitemap requirement)
  function toAbsoluteUrl(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${domain}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  // Helper to add URL
  function addUrl({ loc, lastmod = today, changefreq = 'monthly', priority = '0.8', images = [] }) {
    urls.push({
      loc: `${domain}${loc}`,
      lastmod,
      changefreq,
      priority,
      images: images
        .filter((img) => img && img.loc)
        .map((img) => ({
          loc: toAbsoluteUrl(img.loc),
          title: img.title || '',
        })),
    });
  }

  // 1. Core Pages
  addUrl({ loc: '/', priority: '1.0', changefreq: 'weekly', images: [{ loc: `${domain}/og-image.jpg`, title: "Brown's Interior - Luxury Interior Design" }] });
  addUrl({ loc: '/about', priority: '0.8', changefreq: 'monthly' });
  addUrl({ loc: '/services', priority: '0.9', changefreq: 'weekly' });
  addUrl({ loc: '/projects', priority: '0.9', changefreq: 'weekly' });
  addUrl({ loc: '/process', priority: '0.8', changefreq: 'monthly' });
  addUrl({ loc: '/testimonials', priority: '0.7', changefreq: 'monthly' });
  addUrl({ loc: '/cost-estimator', priority: '0.8', changefreq: 'monthly' });
  addUrl({ loc: '/blog', priority: '0.8', changefreq: 'weekly' });
  addUrl({ loc: '/contact', priority: '0.8', changefreq: 'monthly' });

  // 2. Service Category Pages & Sub-service Option Pages
  const seenServiceSlugs = new Set();
  servicesData.forEach((category) => {
    if (!seenServiceSlugs.has(category.slug)) {
      seenServiceSlugs.add(category.slug);
      const catImages = category.image ? [{ loc: category.image, title: category.title }] : [];
      addUrl({
        loc: `/services/${category.slug}`,
        priority: '0.85',
        changefreq: 'monthly',
        images: catImages,
      });
    }

    if (Array.isArray(category.options)) {
      category.options.forEach((opt) => {
        if (!seenServiceSlugs.has(opt.slug)) {
          seenServiceSlugs.add(opt.slug);
          const optImages = opt.image ? [{ loc: opt.image, title: opt.title }] : [];
          addUrl({
            loc: `/services/${opt.slug}`,
            priority: '0.8',
            changefreq: 'monthly',
            images: optImages,
          });
        }
      });
    }
  });

  // 3. Project Detail Pages
  projectsData.forEach((p) => {
    const pImages = [];
    if (p.image) pImages.push({ loc: p.image, title: p.title });
    if (Array.isArray(p.gallery)) {
      p.gallery.forEach((g) => pImages.push({ loc: g, title: p.title }));
    }
    addUrl({
      loc: `/project/${p.id}`,
      priority: '0.75',
      changefreq: 'monthly',
      images: pImages.slice(0, 3),
    });
  });

  // 4. Blog Posts
  blogPosts.forEach((b) => {
    const bImages = b.image ? [{ loc: b.image, title: b.title }] : [];
    addUrl({
      loc: `/blog/${b.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      images: bImages,
    });
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${
      u.images && u.images.length > 0
        ? '\n' +
          u.images
            .map(
              (img) => `    <image:image>
      <image:loc>${img.loc.replace(/&/g, '&amp;')}</image:loc>
      <image:title>${img.title ? img.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : ''}</image:title>
    </image:image>`
            )
            .join('\n')
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>
`;

  const publicSitemapPath = path.resolve(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xml.trim() + '\n', 'utf8');

  // Also write to dist/sitemap.xml if dist exists
  const distDir = path.resolve(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), xml.trim() + '\n', 'utf8');
  }

  console.log(`Successfully generated sitemap with ${urls.length} verified URLs at:`);
  console.log(` - ${publicSitemapPath}`);
}

generateSitemap().catch((err) => {
  console.error('Failed to generate sitemap:', err);
  process.exit(1);
});
