import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calculator,
  Phone,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Layers,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { SectionHead } from './HomeSections';
import SEO from './SEO';
import './ServicesPage.css';

const processWorkflow = [
  {
    step: '01',
    title: 'Consultation & Site Survey',
    desc: 'Laser measurements, structural assessment, and deep discovery of your lifestyle or business vision.',
  },
  {
    step: '02',
    title: '2D & Photorealistic 3D',
    desc: 'Functional space zoning, CAD blueprints, and photorealistic 3D visualizations before anything is built.',
  },
  {
    step: '03',
    title: 'Itemized BOQ Costing',
    desc: 'Transparent Bill of Quantities with specified material brands, grades, and milestone timelines.',
  },
  {
    step: '04',
    title: 'Turnkey Handover & Warranty',
    desc: 'Daily engineer supervision, master craftsmanship, deep cleaning, and 1-year workmanship warranty.',
  },
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredServices = useMemo(() => {
    if (activeFilter === 'all') return servicesData;
    return servicesData.filter((s) => s.slug === activeFilter);
  }, [activeFilter]);

  return (
    <main className="sp-page">
      <SEO
        title="Our Services - Interior Design, Architecture & Turnkey Execution"
        description="Explore interior design, architectural planning, structural engineering, renovation, and trade show booth solutions by Brown's Interior in Dhaka."
        canonicalPath="/services"
      />

      {/* Disciplines Filter Bar */}
      <section className="sp-filter-section page-start-section">
        <div className="container">
          <SectionHead
            eyebrow="Disciplines & Solutions"
            title="Our Comprehensive"
            script="Services"
            sub="Holistic architecture, interior design, and turnkey engineering solutions crafted for residential, commercial, and exhibition spaces in Dhaka."
          />

          <div className="sp-metrics-row">
            <span className="sp-metric-pill">
              <Sparkles size={14} className="sp-gold-icon" /> 7 Core Disciplines
            </span>
            <span className="sp-metric-pill">
              <Layers size={14} className="sp-gold-icon" /> 30+ Turnkey Specializations
            </span>
            <span className="sp-metric-pill">
              <ShieldCheck size={14} className="sp-gold-icon" /> 100% In-House Supervision
            </span>
          </div>

          <div className="sp-filter-bar">
            <button
              type="button"
              className={`sp-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Disciplines
            </button>
            {servicesData.map((s) => (
              <button
                key={s.slug}
                type="button"
                className={`sp-filter-btn ${activeFilter === s.slug ? 'active' : ''}`}
                onClick={() => setActiveFilter(s.slug)}
              >
                {s.shortTitle || s.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section cream sp-grid-section">
        <div className="container">
          <motion.div layout className="sp-options-grid">
            <AnimatePresence>
              {filteredServices.map((s, i) => {
                const Icon = s.icon;
                const timelineSpec = s.specs?.find((sp) => sp.label === 'Timeline')?.value;
                const scopeSpec = s.specs?.find((sp) => sp.label === 'Scope' || sp.label === 'Compliance')?.value;

                return (
                  <motion.article
                    layout
                    key={s.slug}
                    className="sp-option-card clay"
                    id={`service-opt-${s.slug}`}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                  >
                    {/* Media Header */}
                    <Link to={`/services/${s.slug}`} className="sp-option-media" aria-label={s.title}>
                      <img src={s.image} alt={s.title} loading="lazy" />
                      <div className="sp-option-shade" />
                      <span className="sp-option-num">{s.number}</span>
                      <div className="sp-option-icon">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                      {timelineSpec && (
                        <span className="sp-media-tag">
                          <Clock size={12} /> {timelineSpec}
                        </span>
                      )}
                    </Link>

                    {/* Card Body */}
                    <div className="sp-option-body">
                      <div className="sp-title-row">
                        <h2>
                          <Link to={`/services/${s.slug}`}>{s.title}</Link>
                        </h2>
                      </div>

                      <p className="sp-option-tagline">{s.tagline || s.description}</p>

                      {/* Specs Row */}
                      {scopeSpec && (
                        <div className="sp-scope-row">
                          <span className="sp-scope-label">Focus:</span>
                          <span className="sp-scope-val">{scopeSpec}</span>
                        </div>
                      )}

                      {/* Sub-services Interactive Chips */}
                      <div className="sp-sub-chips-wrap">
                        <span className="sp-chips-label">Key Specializations:</span>
                        <div className="sp-sub-chips">
                          {s.options.map((opt) => (
                            <Link
                              key={opt.slug}
                              to={`/services/${opt.slug}`}
                              className="sp-sub-chip"
                              title={`Explore ${opt.title}`}
                            >
                              <span>{opt.title}</span>
                              <ArrowUpRight size={12} className="sp-chip-arrow" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="sp-option-footer">
                        <span className="sp-option-count">
                          {s.options.length} {s.options.length === 1 ? 'Specialization' : 'Specializations'}
                        </span>
                        <Link to={`/services/${s.slug}`} className="sp-option-Action">
                          Explore Category <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Turnkey Philosophy Spotlight Section */}
      <section className="sp-spotlight-section">
        <div className="container">
          <div className="sp-spotlight-grid">
            <div className="sp-spotlight-content">
              <span className="sp-spotlight-eyebrow">The Brown's Interior Standard</span>
              <h2>Why Turnkey Delivery Beats Fragmented Contractors</h2>
              <p>
                Managing separate architects, carpenters, electricians, and painters often leads to budget overruns, blame-shifting, and delayed deadlines. At Brown’s Interior, every phase is engineered and built in-house.
              </p>

              <div className="sp-spotlight-perks">
                <div className="sp-perk-item">
                  <CheckCircle2 size={18} className="sp-perk-icon" />
                  <div>
                    <strong>Single-Source Accountability</strong>
                    <span>One dedicated project manager and engineer handles the entire lifecycle.</span>
                  </div>
                </div>
                <div className="sp-perk-item">
                  <CheckCircle2 size={18} className="sp-perk-icon" />
                  <div>
                    <strong>Transparent BOQ &amp; Cost Control</strong>
                    <span>No mid-project surprises. Every screw, board, and light fixture is itemized upfront.</span>
                  </div>
                </div>
                <div className="sp-perk-item">
                  <CheckCircle2 size={18} className="sp-perk-icon" />
                  <div>
                    <strong>Permanent In-House Master Artisans</strong>
                    <span>Dedicated carpentry, glazing, electrical, and polish craftsmen with 10+ years experience.</span>
                  </div>
                </div>
              </div>

              <div className="sp-spotlight-btns">
                <Link to="/contact" className="pill-btn dark">
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
                <Link to="/cost-estimator" className="pill-btn">
                  <Calculator size={15} /> Calculate Budget
                </Link>
              </div>
            </div>

            <div className="sp-spotlight-visual">
              <div className="sp-visual-card clay">
                <img
                  src="/portfolio/residential/living-marble-luxury-hall.webp"
                  alt="Turnkey Interior Execution by Brown's Interior"
                  loading="lazy"
                />
                <div className="sp-visual-badge">
                  <Compass size={20} />
                  <div>
                    <strong>10+ Years Experience</strong>
                    <span>250+ Successful Turnkey Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Roadmap */}
      <section className="section cream sp-process-section">
        <div className="container">
          <div className="sp-section-head">
            <span className="sp-eyebrow">Structured Execution</span>
            <h3>How Your Project Unfolds</h3>
            <p>From the initial laser site measurement to the final handover inspection.</p>
          </div>

          <div className="sp-workflow-grid">
            {processWorkflow.map((item, idx) => (
              <div key={item.step} className="sp-workflow-step clay">
                <span className="sp-workflow-num">{item.step}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="sp-banner">
        <div className="container sp-banner-inner">
          <div>
            <h2>Ready to transform your space?</h2>
            <p>Speak with Engr. Aslam Sheikh and our architectural team for a tailored proposal.</p>
          </div>
          <div className="sp-banner-btns">
            <Link to="/cost-estimator" className="pill-btn glass" id="services-calc-cta">
              <Calculator size={16} /> Estimate Cost
            </Link>
            <Link to="/contact" className="pill-btn" id="services-contact-cta">
              <Phone size={16} /> Free Consultation <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
