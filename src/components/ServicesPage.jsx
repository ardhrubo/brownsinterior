import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calculator, Phone } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import './ServicesPage.css';

export default function ServicesPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <main className="sp-page">
      <section className="sp-hero">
        <div className="container">
          <motion.p className="sp-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            What We Do
          </motion.p>
          <motion.h1 className="sp-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            Curated <span className="italic-serif">Services</span>
          </motion.h1>
          <motion.p className="sp-lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Architecture, interior design, engineering &amp; turnkey execution — under one studio.
          </motion.p>

          <motion.div className="sp-chips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {servicesData.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.slug} to={`/services#${s.slug}`} className="sp-chip">
                  <Icon size={14} />
                  <span>{s.shortTitle || s.title}</span>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="sp-list">
        <div className="container">
          {servicesData.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.slug}
                id={s.slug}
                className={`sp-showcase-block ${i % 2 ? 'reverse' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
              >
                {/* Left: Visual Category Cover Card */}
                <div className="sp-cover-card">
                  <Link to={`/services/${s.slug}`} className="sp-cover-media">
                    <img src={s.image} alt={s.title} loading="lazy" />
                    <div className="sp-cover-overlay" />
                    <span className="sp-cover-num">{s.number}</span>
                    <div className="sp-cover-Bottom">
                      <div className="sp-cover-icon"><Icon size={22} /></div>
                      <div>
                        <h2>{s.title}</h2>
                        <p>{s.tagline || s.description}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="sp-cover-actions">
                    <Link to={`/services/${s.slug}`} className="sp-cta primary" id={`view-${s.slug}`}>
                      Explore {s.shortTitle || s.title} <ArrowRight size={14} />
                    </Link>
                    <Link to="/contact" className="sp-cta secondary" id={`cta-${s.slug}`}>
                      Request Quote
                    </Link>
                  </div>
                </div>

                {/* Right: Visual Sub-Option Mini Cards */}
                <div className="sp-options-grid">
                  {s.options.map((opt, j) => (
                    <motion.div
                      key={opt.slug}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.06 }}
                    >
                      <Link to={`/services/${opt.slug}`} className="sp-opt-card clay">
                        <div className="sp-opt-thumb">
                          <img src={opt.image} alt={opt.title} loading="lazy" />
                        </div>
                        <div className="sp-opt-info">
                          <div className="sp-opt-title-row">
                            <h3>{opt.title}</h3>
                            <ArrowUpRight size={16} className="sp-opt-arrow" />
                          </div>
                          <p>{opt.tagline || opt.desc}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="sp-banner">
        <div className="container sp-banner-inner">
          <div>
            <h2>Ready to transform your space?</h2>
            <p>Get an instant budget estimate or book a free consultation with our studio.</p>
          </div>
          <div className="sp-banner-btns">
            <Link to="/cost-estimator" className="pill-btn glass" id="services-calc-cta">
              <Calculator size={16} /> Cost Calculator
            </Link>
            <Link to="/contact" className="pill-btn" id="services-contact-cta">
              <Phone size={16} /> Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
