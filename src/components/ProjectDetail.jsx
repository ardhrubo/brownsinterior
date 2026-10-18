import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calculator, Phone } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import SEO from './SEO';

import NotFound from './NotFound';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === parseInt(id, 10));

  if (!project) {
    return <NotFound message="We could not find the interior project you requested." />;
  }

  return (
    <main style={{ paddingTop: '110px', backgroundColor: '#fafafa', minHeight: '100vh', paddingBottom: '80px' }}>
      <SEO
        title={`${project.title} - Interior Project`}
        description={project.description}
        canonicalPath={`/project/${project.id}`}
        image={project.coverImage || project.image}
      />
      <div className="container">
        <Link
          to="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '1.75rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            fontSize: '0.82rem',
            letterSpacing: '1.5px',
            fontWeight: '600',
          }}
        >
          <ArrowLeft size={16} /> Back to All Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            <span
              style={{
                color: 'var(--gold-dark)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.8rem',
                fontWeight: '700',
              }}
            >
              {project.category}
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.85rem, 4.5vw, 3.2rem)',
              color: '#1a1a1a',
              marginBottom: '1.5rem',
              lineHeight: '1.18',
            }}
          >
            {project.title}
          </h1>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
              padding: '1.25rem 1.5rem',
              background: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #e5dfd8',
            }}
          >
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Client
              </p>
              <p style={{ fontWeight: '600', fontSize: '0.96rem' }}>{project.client}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Location
              </p>
              <p style={{ fontWeight: '600', fontSize: '0.96rem' }}>{project.location}</p>
            </div>
            {project.area && (
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Area
                </p>
                <p style={{ fontWeight: '600', fontSize: '0.96rem' }}>{project.area}</p>
              </div>
            )}
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Year
              </p>
              <p style={{ fontWeight: '600', fontSize: '0.96rem' }}>{project.year}</p>
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '64vh',
                objectFit: 'cover',
                borderRadius: '16px',
              }}
            />
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto 3rem auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)', marginBottom: '0.85rem' }}>
              Project Overview
            </h2>
            <p style={{ fontSize: '1rem', color: '#444', lineHeight: '1.75' }}>{project.description}</p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)', marginBottom: '1.25rem', textAlign: 'center' }}>
              Project Gallery
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.15rem' }}>
              {project.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${project.title} gallery ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '14px',
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
            <Link to="/cost-estimator" className="pill-btn dark">
              <Calculator size={16} /> Estimate Cost
            </Link>
            <Link to="/contact" className="pill-btn">
              <Phone size={16} /> Book Free Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
