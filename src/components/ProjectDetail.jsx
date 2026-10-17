import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { projectsData } from '../data/projectsData';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <main style={{ paddingTop: '120px', minHeight: '60vh', textAlign: 'center' }}>
        <h2>Project not found</h2>
        <Link to="/" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>Return Home</Link>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '100px', backgroundColor: '#fafafa', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px', fontWeight: '600' }}>
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: '600' }}>{project.category}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-massive)', fontSize: 'clamp(1.85rem, 4.8vw, 3.6rem)', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: '1.75rem', lineHeight: '1.15' }}>{project.title}</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem', padding: '1.5rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #e5e5e5' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Client</p>
              <p style={{ fontWeight: '600', fontSize: '1rem' }}>{project.client}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</p>
              <p style={{ fontWeight: '600', fontSize: '1rem' }}>{project.location}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Year</p>
              <p style={{ fontWeight: '600', fontSize: '1rem' }}>{project.year}</p>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: 'auto', maxHeight: '68vh', objectFit: 'cover', borderRadius: '16px' }} />
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto 3.5rem auto' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>Project Overview</h2>
            <p style={{ fontSize: '1.02rem', color: '#444', lineHeight: '1.8' }}>{project.description}</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1.5rem', textAlign: 'center' }}>Gallery</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {project.gallery.map((img, idx) => (
                <img key={idx} src={img} alt={`${project.title} gallery ${idx+1}`} style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '14px', cursor: 'pointer', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
