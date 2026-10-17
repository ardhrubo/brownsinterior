import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Phone, Calculator, Sparkles, Compass, Layers, CheckCircle2, ArrowUpRight
} from 'lucide-react';
import { servicesData, findServiceOrOption } from '../data/servicesData';
import { SectionHead, CostCTA } from './HomeSections';
import '../styles/site.css';
import './ServiceDetail.css';

const quickSteps = [
  { num: '01', icon: Compass, title: 'Site Visit & Brief', text: 'Measurements, lifestyle needs & budget alignment.' },
  { num: '02', icon: Layers, title: '3D & Material Board', text: 'Photorealistic 3D views & itemized BOQ sign-off.' },
  { num: '03', icon: CheckCircle2, title: 'Turnkey Handover', text: 'Engineer-supervised execution & on-time delivery.' },
];

const galleryLabels = ['Spatial Concept', 'Material & Detail', 'Finished Execution'];

export default function ServiceDetail() {
  const { slug } = useParams();
  const result = findServiceOrOption(slug);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
  }, [slug]);

  if (!result) {
    return <Navigate to="/services" replace />;
  }

  const { type, data, category } = result;

  // -------------------------------------------------------------
  // CASE 1: Individual Sub-Option Page (e.g. /services/residential-interior)
  // -------------------------------------------------------------
  if (type === 'option') {
    const option = data;
    const CategoryIcon = category.icon;
    const siblingOptions = category.options.filter((o) => o.slug !== option.slug);
    const photos = option.gallery && option.gallery.length > 0 ? option.gallery : [option.image, ...category.gallery.slice(0, 2)];

    return (
      <main className="sd-page">
        {/* Bespoke Dark Split Showcase Hero */}
        <section className="sd-opt-hero">
          <div
            className="sd-opt-hero-backdrop"
            style={{ backgroundImage: `url("${photos[activeImg] || option.image}")` }}
          />
          <div className="sd-opt-hero-overlay" />

          <div className="container sd-opt-hero-grid">
            <motion.div
              className="sd-opt-hero-copy"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sd-crumbs">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/services">Services</Link>
                <span>/</span>
                <Link to={`/services/${category.slug}`}>{category.shortTitle || category.title}</Link>
              </div>

              <div className="sd-cat-badge">
                <CategoryIcon size={14} />
                <span>{category.title}</span>
              </div>

              <h1>{option.title}</h1>
              <p className="sd-opt-tagline">{option.tagline || option.desc}</p>

              {option.highlights && (
                <div className="sd-highlight-pills">
                  {option.highlights.map((h) => (
                    <span key={h} className="sd-pill-tag">
                      <Sparkles size={11} /> {h}
                    </span>
                  ))}
                </div>
              )}

              <div className="sd-hero-actions">
                <Link to="/contact" className="pill-btn" id="option-quote-btn">
                  <Phone size={15} /> Book Free Consultation
                </Link>
                <Link to="/cost-estimator" className="pill-btn glass" id="option-calc-btn">
                  <Calculator size={15} /> Estimate Cost
                </Link>
              </div>
            </motion.div>

            {/* Interactive Visual Lookbook Frame */}
            <motion.div
              className="sd-opt-showcase"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="sd-showcase-main">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={photos[activeImg]}
                    src={photos[activeImg]}
                    alt={`${option.title} view ${activeImg + 1}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                  />
                </AnimatePresence>
                <span className="sd-showcase-caption">
                  {galleryLabels[activeImg] || 'Studio Showcase'}
                </span>
              </div>

              {photos.length > 1 && (
                <div className="sd-showcase-thumbs">
                  {photos.map((imgUrl, idx) => (
                    <button
                      key={imgUrl + idx}
                      type="button"
                      className={`sd-thumb-btn ${idx === activeImg ? 'active' : ''}`}
                      onClick={() => setActiveImg(idx)}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img src={imgUrl} alt="" loading="lazy" />
                      <span>0{idx + 1}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Minimal Spec Strip */}
          {option.specs && (
            <div className="container">
              <div className="sd-specs-bar">
                {option.specs.map((s) => (
                  <div key={s.label} className="sd-spec-item">
                    <span className="sd-spec-label">{s.label}</span>
                    <strong className="sd-spec-val">{s.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Visual Deliverables Bento (Minimal Text) */}
        <section className="section">
          <div className="container">
            <SectionHead
              eyebrow="Scope of Work"
              title="What's"
              script="Included"
              sub={option.desc}
            />

            <div className="sd-bento-features">
              {option.features.map((feat, i) => (
                <motion.div
                  key={feat}
                  className="sd-feature-card clay"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <div className="sd-feature-top">
                    <span className="sd-feature-num">0{i + 1}</span>
                    <span className="sd-feature-dot" />
                  </div>
                  <h3>{feat}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Lookbook Triptych */}
        <section className="section cream">
          <div className="container">
            <SectionHead
              eyebrow="Visual Inspiration"
              title="Design"
              script="Lookbook"
            />
            <div className="sd-lookbook-grid">
              {photos.map((imgUrl, idx) => (
                <motion.figure
                  key={imgUrl + idx}
                  className={`sd-lookbook-item ${idx === 0 ? 'wide' : ''}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <img src={imgUrl} alt={`${option.title} ${ galleryLabels[idx] || '' }`} loading="lazy" />
                  <figcaption>
                    <span>0{idx + 1}</span>
                    <strong>{galleryLabels[idx] || option.title}</strong>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* 3-Step Minimal Execution Flow */}
        <section className="section">
          <div className="container">
            <SectionHead
              eyebrow="Simple & Transparent"
              title="How It"
              script="Works"
            />
            <div className="sd-steps-strip">
              {quickSteps.map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    className="sd-step-box clay"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="sd-step-header">
                      <div className="sd-step-icon"><StepIcon size={20} /></div>
                      <span className="sd-step-num">{step.num}</span>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sibling Options in this Category */}
        {siblingOptions.length > 0 && (
          <section className="section cream">
            <div className="container">
              <SectionHead
                eyebrow={category.title}
                title="Related"
                script="Services"
              />
              <div className="sd-related-grid">
                {siblingOptions.map((sib) => (
                  <Link key={sib.slug} to={`/services/${sib.slug}`} className="sd-visual-card">
                    <img src={sib.image} alt={sib.title} loading="lazy" />
                    <div className="sd-visual-card-overlay">
                      <div className="sd-visual-card-tags">
                        {(sib.highlights || []).slice(0, 2).map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                      <h3>{sib.title}</h3>
                      <p>{sib.tagline || sib.desc}</p>
                      <span className="sd-visual-link">
                        Explore <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CostCTA />
      </main>
    );
  }

  // -------------------------------------------------------------
  // CASE 2: Category Landing Page (e.g. /services/interior-design)
  // -------------------------------------------------------------
  const CategoryIcon = category.icon;
  const otherCategories = servicesData.filter((s) => s.slug !== category.slug);

  return (
    <main className="sd-page">
      {/* Category Hero */}
      <section className="sd-cat-hero" style={{ backgroundImage: `url("${category.image}")` }}>
        <div className="sd-cat-hero-overlay" />
        <div className="container sd-cat-hero-inner">
          <div className="sd-crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span>{category.shortTitle || category.title}</span>
          </div>
          <span className="sd-cat-badge">
            <CategoryIcon size={14} /> Service {category.number}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {category.title}
          </motion.h1>
          <motion.p
            className="sd-cat-lead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {category.tagline || category.description}
          </motion.p>

          {/* Quick Jump Option Chips */}
          <motion.div
            className="sd-cat-jump-pills"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {category.options.map((opt) => (
              <Link key={opt.slug} to={`/services/${opt.slug}`} className="sd-jump-pill">
                {opt.title} <ArrowUpRight size={13} />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Specialized Options Grid — Visual & Scannable */}
      <section className="section cream" id="services-options-grid">
        <div className="container">
          <SectionHead
            eyebrow={`Service ${category.number} · ${category.shortTitle || category.title}`}
            title="Select a"
            script="Specialization"
            sub={category.intro}
          />

          <div className="category-options-grid">
            {category.options.map((opt, idx) => (
              <motion.article
                key={opt.slug}
                className="category-opt-card clay"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Link to={`/services/${opt.slug}`} className="opt-card-media" aria-label={opt.title}>
                  <img src={opt.image} alt={opt.title} loading="lazy" />
                  <span className="opt-card-num">0{idx + 1}</span>
                  {opt.specs && opt.specs[1] && (
                    <span className="opt-card-badge">{opt.specs[1].value}</span>
                  )}
                </Link>
                <div className="opt-card-content">
                  <h3>
                    <Link to={`/services/${opt.slug}`}>{opt.title}</Link>
                  </h3>
                  <p>{opt.tagline || opt.desc}</p>

                  {opt.highlights && (
                    <div className="opt-tag-row">
                      {opt.highlights.map((tag) => (
                        <span key={tag} className="opt-mini-tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className="opt-card-footer">
                    <Link to={`/services/${opt.slug}`} className="read-more">
                      Explore Option <ArrowRight size={14} />
                    </Link>
                    <Link to="/contact" className="opt-quick-quote">
                      Get Quote
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Other Categories Strip */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Full-Service Studio" title="Other" script="Categories" />
          <div className="sd-others">
            {otherCategories.map((s) => {
              const O = s.icon;
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="sd-other clay">
                  <div className="sd-other-img">
                    <img src={s.image} alt={s.title} loading="lazy" />
                    <span className="sd-other-num">{s.number}</span>
                  </div>
                  <div className="sd-other-body">
                    <O size={18} />
                    <h3>{s.shortTitle || s.title}</h3>
                    <ArrowRight size={15} className="sd-arrow" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CostCTA />
    </main>
  );
}
