export const DEFAULT_SITE_URL = 'https://brownsinteriorsbd.com';

export function normalizeSiteUrl(value = DEFAULT_SITE_URL) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('VITE_SITE_URL must be an HTTPS origin, e.g. https://brownsinteriorsbd.com (no path, credentials, query, or fragment).');
  }
  return url.origin;
}

export const SITE_URL = normalizeSiteUrl(import.meta.env?.VITE_SITE_URL || DEFAULT_SITE_URL);
