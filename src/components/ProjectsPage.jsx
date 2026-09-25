import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import './Portfolio.css';

export default function ProjectsPage() {
  return (
    <main style={{ paddingTop: '120px', backgroundColor: '#fafafa', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="title-massive" style={{ color: '#1a1a1a', fontSize: '5rem', marginBottom: '1rem', textAlign: 'center' }}>ALL PROJECTS</h1>
          <p className="contact-subtitle" style={{ textAlign: 'center' }}>Explore our complete portfolio of interior and architectural excellence.</p>
        </motion.div>

        <div className="portfolio-grid" style={{ marginTop: '4rem' }}>
          {projectsData.map((project, index) => (
            <motion.div 
              key={project.id}
              className="portfolio-item"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/project/${project.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                <div className="portfolio-image-wrapper">
                  <img src={project.image} alt={project.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-info">
                      <span className="portfolio-category">{project.category}</span>
                      <h3 className="portfolio-title">{project.title}</h3>
                    </div>
                    <div className="portfolio-link">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
