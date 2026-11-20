import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BRAND_NAME = "Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও";
const DEFAULT_TITLE = BRAND_NAME;
const DEFAULT_DESC =
  "বাংলাদেশের অন্যতম নির্ভরযোগ্য ইন্টেরিয়র ডিজাইন স্টুডিও। Complete Interior & Exterior Design and Execution Services Across Bangladesh.";
const DEFAULT_KEYWORDS =
  "Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও, বাংলাদেশের অন্যতম নির্ভরযোগ্য ইন্টেরিয়র ডিজাইন স্টুডিও, বাংলাদেশের বেস্ট ইন্টেরিয়র ডিজাইন কোম্পানি, ইন্টেরিয়র ডিজাইন ঢাকা, ফ্ল্যাট ইন্টেরিয়র ডিজাইন, অফিস ইন্টেরিয়র ডিজাইন, Interior Design Dhaka, Interior Design Bangladesh, Architecture Bangladesh, Structural Engineering, Luxury Home Decor, Commercial Office Interior, Brown's Interiors";
import { SITE_URL } from '../lib/site-url';

const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export default function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  image,
  type = 'website',
  schema,
  noindex = false,
}) {
  const location = useLocation();
  const hasBrandInTitle = title && /brown['’]?s\s+interior/i.test(title);
  const fullTitle = title ? (hasBrandInTitle ? title : `${title} | ${BRAND_NAME}`) : DEFAULT_TITLE;
  const fullDesc = description || DEFAULT_DESC;
  const fullKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS;
  const rawPath = canonicalPath || location.pathname;
  const normalizedPath = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '');
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const ogImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`) : `${SITE_URL}/og-image.jpg`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper to set or create meta tag
    const setMeta = (attrName, attrValue, content) => {
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const robotsValue = noindex ? 'noindex, nofollow' : DEFAULT_ROBOTS;
    setMeta('name', 'robots', robotsValue);
    setMeta('name', 'googlebot', robotsValue);
    setMeta('name', 'description', fullDesc);
    setMeta('name', 'keywords', fullKeywords);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', fullDesc);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:type', type);
    setMeta('name', 'twitter:url', canonicalUrl);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', fullDesc);
    setMeta('name', 'twitter:image', ogImage);

    // 3. Update or remove Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (noindex) {
      if (canonical) canonical.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // 4. Inject Dynamic Schema (JSON-LD) if provided
    let schemaScript = document.getElementById('seo-dynamic-schema');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'seo-dynamic-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      const s = document.getElementById('seo-dynamic-schema');
      if (s) s.remove();
    };
  }, [fullTitle, fullDesc, fullKeywords, canonicalUrl, ogImage, type, schema, noindex]);

  return null;
}
