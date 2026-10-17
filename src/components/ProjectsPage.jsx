import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { PageHero, CostCTA } from './HomeSections';
import './Portfolio.css';

export default function ProjectsPage() {
  return (
    <main style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <PageHero
        title="Our Projects"
        sub="Explore our portfolio of residential, commercial, architectural, and exhibition excellence."
        image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
        crumb="Projects"
      />
      <section className="section">
        <div className="container">
          <div className="portfolio-grid">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className="portfolio-item"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link to={`/project/${project.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                  <div className="portfolio-image-wrapper">
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <div className="portfolio-overlay">
                      <div className="portfolio-info">
                        <span className="portfolio-category">{project.category}</span>
                        <h3 className="portfolio-title">{project.title}</h3>
                      </div>
                      <div className="portfolio-link">
                        <ArrowUpRight size={22} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CostCTA />
    </main>
  );
}
