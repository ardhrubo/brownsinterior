import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './Portfolio.css';

// Using placeholder Unsplash architecture/interior images
const projects = [
  {
    id: 1,
    title: 'Modern Penthouse',
    category: 'Interior Design',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Corporate HQ',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Luxury Villa',
    category: 'Full Engineering',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Boutique Hotel',
    category: 'Interior Styling',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Featured <span className="italic-serif">Projects</span></h2>
          <div className="title-divider"></div>
        </motion.div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="portfolio-item"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="portfolio-image-wrapper">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-overlay">
                  <div className="portfolio-info">
                    <span className="portfolio-category">{project.category}</span>
                    <h3 className="portfolio-title">{project.title}</h3>
                  </div>
                  <a href="#" className="portfolio-link">
                    <ArrowUpRight size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="portfolio-cta">
          <a href="#" className="btn btn-outline">View All Projects</a>
        </div>
      </div>
    </section>
  );
}
