import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Phone, Calculator, Sparkles, ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2
} from 'lucide-react';
import { servicesData, findServiceOrOption } from '../data/servicesData';
import { SectionHead, ProcessTimeline, CostCTA } from './HomeSections';
import SEO from './SEO';
import NotFound from './NotFound';
import '../styles/site.css';
import './ServiceDetail.css';

const defaultGalleryLabels = [
  'Spatial Concept & Planning',
  'Material & Detailing',
  'Zoning & Workstation Layout',
  'Conference & Meeting Hub',
  'Acoustic Glass Architecture',
  'Lighting & Texture Harmony',
  'Executive Millwork',
  'Surface Craftsmanship',
  'Finished Turnkey Execution'
];

export default function ServiceDetail() {
  const { slug, categorySlug } = useParams();
  const targetSlug = slug || categorySlug;
  const result = findServiceOrOption(targetSlug);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState('ALL');

  useEffect(() => {
    setActiveImg(0);
    setLightboxIndex(null);
    setGalleryFilter('ALL');
  }, [targetSlug]);

  const { type, data, category } = result || {};
  const isCategory = type === 'category';
  const CategoryIcon = category?.icon;
  const photos =
    data?.gallery && data.gallery.length > 0
      ? data.gallery
      : [data?.image, ...(category?.gallery || []).slice(0, 2)].filter(Boolean);

  const currentLabels = data?.galleryLabels || (isCategory ? category?.galleryLabels : null) || defaultGalleryLabels;
  const getGalleryLabel = (index) =>
    (currentLabels && currentLabels[index]) || defaultGalleryLabels[index] || `Perspective 0${index + 1}`;

  useEffect(() => {
    if (lightboxIndex === null || !photos.length) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % photos.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  if (!result) {
    return <NotFound message="The requested interior design or architecture service could not be found." />;
  }

  const defaultSpecs = isCategory
    ? [
        { label: 'Service Category', value: `${category.options.length} Specialized Options` },
        { label: 'Execution Model', value: 'Design + Turnkey Build' },
        { label: 'Supervision', value: 'Engr. Aslam Sheikh & Team' },
      ]
    : [];

  const specsToRender = data.specs || defaultSpecs;
  const highlightsToRender =
    data.highlights ||
    (isCategory ? category.options.map((o) => o.title) : []);
  const featuresToRender =
    data.features ||
    (isCategory ? category.options.map((o) => `${o.title} — ${o.tagline || o.desc}`) : []);

  const siblingOptions = !isCategory
    ? category.options.filter((o) => o.slug !== data.slug)
    : [];
  const otherCategories = servicesData.filter((s) => s.slug !== category.slug);

  return (
    <main className="sd-page">
      <SEO
        title={`${data.title} - Interior & Architectural Service`}
        description={data.intro || data.tagline || data.desc || data.description}
        canonicalPath={`/services/${targetSlug}`}
        image={data.image || (data.gallery && data.gallery[0])}
      />
      {/* Bespoke Dark Split Showcase Hero (for every service & sub-service page) */}
      <section className="sd-opt-hero">
        <div
          className="sd-opt-hero-backdrop"
          style={{ backgroundImage: `url("${photos[activeImg] || data.image}")` }}
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
              {!isCategory && (
                <>
                  <span>/</span>
                  <Link to={`/services/${category.slug}`}>{category.shortTitle || category.title}</Link>
                </>
              )}
              <span>/</span>
              <span>{data.shortTitle || data.title}</span>
            </div>

            <div className="sd-cat-badge">
              <CategoryIcon size={14} />
              <span>{isCategory ? `Service ${category.number}` : category.title}</span>
            </div>

            <h1>{data.title}</h1>
            <p className="sd-opt-tagline">{data.tagline || data.description || data.desc}</p>

            {highlightsToRender.length > 0 && (
              <div className="sd-highlight-pills">
                {highlightsToRender.map((h) => (
                  <span key={h} className="sd-pill-tag">
                    <Sparkles size={11} /> {h}
                  </span>
                ))}
              </div>
            )}

            <div className="sd-hero-actions">
              <Link
                to={`/contact?category=${encodeURIComponent(category.title)}${
                  !isCategory ? `&service=${encodeURIComponent(data.title)}` : ''
                }`}
                className="pill-btn"
                id="option-quote-btn"
              >
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
            <div
              className="sd-showcase-main"
              onClick={() => setLightboxIndex(activeImg)}
              style={{ cursor: 'pointer' }}
              title="Click to expand"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={photos[activeImg]}
                  src={photos[activeImg]}
                  alt={`${data.title} view ${activeImg + 1}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                />
              </AnimatePresence>
              <span className="sd-showcase-caption">
                {getGalleryLabel(activeImg)}
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
        {specsToRender.length > 0 && (
          <div className="container">
            <div className="sd-specs-bar">
              {specsToRender.map((s) => (
                <div key={s.label} className="sd-spec-item">
                  <span className="sd-spec-label">{s.label}</span>
                  <strong className="sd-spec-val">{s.value}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* If this is a Category Page, show all Individual Sub-Service Cards right below the hero */}
      {isCategory && (
        <section className="section cream" id="services-options-grid">
          <div className="container">
            <SectionHead
              eyebrow={`Service ${category.number}`}
              title={category.shortTitle || category.title}
              script="Services"
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

                    <div className="opt-card-footer">
                      <Link to={`/services/${opt.slug}`} className="read-more">
                        Explore <ArrowRight size={14} />
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
      )}

      {/* Visual Deliverables Bento (What's Included) */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Scope of Work"
            title="What's"
            script="Included"
          />

          <div className="sd-bento-features">
            {featuresToRender.map((feat, i) => (
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

      {/* Visual Lookbook Section */}
      <section className="section cream" id="design-lookbook">
        <div className="container">
          <SectionHead
            eyebrow="Visual Inspiration"
            title="Design"
            script="Lookbook"
          />

          {(() => {
            const galleryCats = data.galleryCategories || null;
            const uniqueCats = galleryCats ? ['ALL', ...new Set(galleryCats)] : null;
            const filteredIndices = photos
              .map((_, i) => i)
              .filter((i) => {
                if (!galleryCats || galleryFilter === 'ALL') return true;
                return galleryCats[i] === galleryFilter;
              });

            return (
              <>
                {uniqueCats && uniqueCats.length > 1 && (
                  <div className="sd-lookbook-tabs" role="tablist" aria-label="Space Categories">
                    {uniqueCats.map((catName) => (
                      <button
                        key={catName}
                        type="button"
                        role="tab"
                        aria-selected={catName === galleryFilter}
                        className={`sd-lookbook-tab ${catName === galleryFilter ? 'active' : ''}`}
                        onClick={() => setGalleryFilter(catName)}
                      >
                        {catName}
                      </button>
                    ))}
                  </div>
                )}

                <div className={`sd-lookbook-grid count-${filteredIndices.length}`}>
                  {filteredIndices.map((origIdx, displayIdx) => {
                    const imgUrl = photos[origIdx];
                    const catTag = galleryCats ? galleryCats[origIdx] : null;
                    return (
                      <motion.figure
                        key={imgUrl + origIdx}
                        className="sd-lookbook-item"
                        onClick={() => setLightboxIndex(origIdx)}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: (displayIdx % 6) * 0.05 }}
                      >
                        <img src={imgUrl} alt={`${data.title} - ${getGalleryLabel(origIdx)}`} loading="lazy" />
                        {catTag && (
                          <span className="sd-lookbook-cat-badge">{catTag}</span>
                        )}
                        <div className="sd-lookbook-zoom-hint" aria-hidden="true">
                          <Maximize2 size={16} />
                        </div>
                        <figcaption>
                          <span>0{displayIdx + 1}</span>
                          <strong>{getGalleryLabel(origIdx)}</strong>
                        </figcaption>
                      </motion.figure>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* Unified Process Section matching Home & Process Page */}
      <ProcessTimeline />

      {/* Sibling Sub-Services (when on an individual sub-service page) */}
      {!isCategory && siblingOptions.length > 0 && (
        <section className="section cream">
          <div className="container">
            <SectionHead
              eyebrow={category.title}
              title="Other"
              script={`${category.shortTitle || category.title} Services`}
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
                      View Service Page <ArrowUpRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Main Service Categories */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Full-Service Studio" title="Explore Other" script="Categories" />
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

      {/* Elegant Fullscreen Lookbook Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="sd-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
          >
            <div className="sd-lightbox-container" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="sd-lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>

              <button
                type="button"
                className="sd-lightbox-nav prev"
                onClick={() => setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length)}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="sd-lightbox-stage">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={photos[lightboxIndex]}
                    src={photos[lightboxIndex]}
                    alt={`${data.title} - ${getGalleryLabel(lightboxIndex)}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.28 }}
                  />
                </AnimatePresence>
                <div className="sd-lightbox-info">
                  <span className="sd-lightbox-counter">
                    0{lightboxIndex + 1} / 0{photos.length}
                  </span>
                  <h3>{getGalleryLabel(lightboxIndex)}</h3>
                  <p>{data.title}</p>
                </div>
              </div>

              <button
                type="button"
                className="sd-lightbox-nav next"
                onClick={() => setLightboxIndex((prev) => (prev + 1) % photos.length)}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
