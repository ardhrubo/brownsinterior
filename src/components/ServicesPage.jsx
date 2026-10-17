import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import Process from './Process';
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
          <motion.p className="sp-eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            What We Do
          </motion.p>
          <motion.h1 className="sp-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Our <span className="italic-serif">Services</span>
          </motion.h1>
          <div className="title-divider"></div>
          <motion.p className="sp-lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Interior design, architecture, engineering and project delivery — complete solutions under one roof.
          </motion.p>

          <motion.div className="sp-chips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            {servicesData.map((s) => (
              <Link key={s.slug} to={`/services#${s.slug}`} className="sp-chip">
                {s.shortTitle || s.title}
              </Link>
            ))}
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
                className={`sp-block ${i % 2 ? 'reverse' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
              >
                <div className="sp-intro">
                  <span className="sp-number">{s.number}</span>
                  <div className="sp-icon"><Icon size={30} strokeWidth={1.5} /></div>
                  <h2 className="sp-block-title">{s.title}</h2>
                  <p className="sp-desc">{s.description}</p>
                  <div className="sp-actions-row">
                    <Link to={`/services/${s.slug}`} className="sp-cta primary" id={`explore-${s.slug}`}>
                      Explore {s.shortTitle || s.title} <ArrowRight size={15} />
                    </Link>
                    <Link to="/contact" className="sp-cta secondary" id={`cta-${s.slug}`}>
                      Get a Quote
                    </Link>
                  </div>
                </div>
                <ul className="sp-items">
                  {s.items.map((item, j) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.07 }}
                    >
                      <Link
                        to={`/services/${s.slug}#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', color: 'inherit' }}
                      >
                        <span className="sp-check"><Check size={14} /></span>
                        <span>{item}</span>
                        <ArrowRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </section>

      <Process />

      <section className="sp-banner">
        <div className="container">
          <h2>Have a project in mind?</h2>
          <p>Local or international — let's design something remarkable together.</p>
          <Link to="/contact" className="sp-cta light" id="services-contact-cta">
            Start Your Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
