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
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', fontWeight: '600' }}>{project.category}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-massive)', fontSize: '4rem', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '2rem', lineHeight: '1' }}>{project.title}</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem', padding: '2rem', background: '#ffffff', borderRadius: '4px', border: '1px solid #e5e5e5' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Client</p>
              <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{project.client}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</p>
              <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{project.location}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Year</p>
              <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{project.year}</p>
            </div>
          </div>

          <div style={{ marginBottom: '4rem' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'cover', borderRadius: '4px' }} />
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>Project Overview</h2>
            <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: '1.8' }}>{project.description}</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Gallery</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {project.gallery.map((img, idx) => (
                <img key={idx} src={img} alt={`${project.title} gallery ${idx+1}`} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
