import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import SEO from './SEO';

export default function NotFound({ message = "The page you're looking for doesn't exist or has been moved." }) {
  useEffect(() => {
    // Explicitly tell Googlebot and search crawlers not to index 404 / soft-404 pages
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    const previousContent = robotsMeta.getAttribute('content');
    robotsMeta.setAttribute('content', 'noindex, follow');

    return () => {
      // Restore on unmount
      if (robotsMeta && previousContent) {
        robotsMeta.setAttribute('content', previousContent);
      }
    };
  }, []);

  return (
    <main style={{
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 20px 80px',
      textAlign: 'center',
      backgroundColor: '#fafafa',
    }}>
      <SEO
        title="404 - Page Not Found"
        description="The requested page could not be found on Brown's Interior."
      />
      <div style={{ maxWidth: '540px', margin: '0 auto' }}>
        <span style={{
          fontSize: '4.5rem',
          fontFamily: 'var(--font-display, serif)',
          fontWeight: '700',
          color: 'var(--gold, #c9b59c)',
          lineHeight: '1',
          display: 'block',
          marginBottom: '0.5rem',
        }}>
          404
        </span>
        <h1 style={{
          fontSize: '1.75rem',
          fontFamily: 'var(--font-display, serif)',
          fontWeight: '600',
          color: 'var(--text-color, #1c1815)',
          marginBottom: '1rem',
        }}>
          Page Not Found
        </h1>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-muted, #666)',
          lineHeight: '1.6',
          marginBottom: '2rem',
        }}>
          {message}
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Link
            to="/"
            className="pill-btn dark"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
            }}
          >
            <Home size={16} /> Return Home
          </Link>
          <Link
            to="/services"
            className="pill-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
            }}
          >
            Explore Services
          </Link>
        </div>
      </div>
    </main>
  );
}
