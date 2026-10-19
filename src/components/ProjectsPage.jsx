import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { PageHero, SectionHead, CostCTA } from './HomeSections';
import SEO from './SEO';
import './HomeSections.css';
import './Portfolio.css';

export default function ProjectsPage() {
  const cats = ['All', ...new Set(projectsData.map((p) => p.category))];
  const [cat, setCat] = useState('All');
  const list = projectsData.filter((p) => cat === 'All' || p.category === cat);

  return (
    <main style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <SEO
        title="Completed Projects Portfolio - Luxury Interiors & Architecture"
        description="Browse our portfolio of completed luxury duplexes, corporate offices, restaurants, and villas in Gulshan, Banani, and Dhaka by Brown's Interior."
        canonicalPath="/projects"
      />
      <section className="section page-start-section">
        <div className="container">
          <SectionHead
            eyebrow="Complete Portfolio"
            title="Selected"
            script="Works"
            sub="Explore our portfolio of residential, commercial, architectural, and exhibition excellence across Dhaka."
          />

          <div className="proj-tabs">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                className={c === cat ? 'active' : ''}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="proj-editorial-grid">
            {list.map((p, idx) => {
              const isFlagship = idx === 0 && cat === 'All';
              return (
                <motion.div
                  key={p.id}
                  className={`proj-editorial-item ${isFlagship ? 'is-flagship' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Link to={`/project/${p.id}`} className="proj-card">
                    <img src={p.image} alt={p.title} loading="lazy" />
                    <div className="proj-index-badge">{String(idx + 1).padStart(2, '0')}</div>
                    <div className="proj-info">
                      <div className="proj-meta-row">
                        <span className="proj-cat">{p.category}</span>
                        {p.area && <span className="proj-area-pill">{p.area}</span>}
                      </div>
                      <h3>{p.title}</h3>
                      <div className="proj-bottom-bar">
                        {p.location && (
                          <span className="proj-loc">
                            <MapPin size={13} /> {p.location}
                          </span>
                        )}
                        <span className="proj-explore-link">
                          View <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <CostCTA />
    </main>
  );
}
