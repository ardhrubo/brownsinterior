import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = "Brown's Interior | Premium Interior Design & Architecture in Bangladesh & Worldwide";
const DEFAULT_DESC =
  "Transforming spaces into breathtaking realities. Brown's Interior offers luxury interior design, visionary architecture, and complete turnkey structural solutions all over Bangladesh and worldwide.";
const SITE_URL = 'https://www.brownsinterior.com';

export default function SEO({
  title,
  description,
  canonicalPath,
  image,
  type = 'website',
  schema,
}) {
  const location = useLocation();
  const fullTitle = title ? `${title} | Brown's Interior` : DEFAULT_TITLE;
  const fullDesc = description || DEFAULT_DESC;
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

    setMeta('name', 'description', fullDesc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', fullDesc);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:type', type);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', fullDesc);
    setMeta('name', 'twitter:image', ogImage);

    // 3. Update Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

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
  }, [fullTitle, fullDesc, canonicalUrl, ogImage, type, schema]);

  return null;
}
