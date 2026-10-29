import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import {
  FolderOpen, Phone, ArrowRight, ArrowUpRight, Star, Quote,
  ChevronLeft, ChevronRight, Calculator, MapPin, UserRound,
  Compass, LayoutGrid, Layers, ClipboardList, Hammer, Sparkles, CheckCircle2, Clock
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';
import { testimonials, blogPreviews, stats, processSteps } from '../data/siteData';
import '../styles/site.css';
import './HomeSections.css';

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 },
};

export function SectionHead({ eyebrow, title, script, sub }) {
  return (
    <motion.div className="sec-head" {...fadeUp}>
      {eyebrow && <span className="sec-eyebrow">{eyebrow}</span>}
      <h2 className="sec-title">{title} {script && <em>{script}</em>}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </motion.div>
  );
}

export function PageHero({ title, sub, image, crumb }) {
  return (
    <section className="page-hero" style={{ backgroundImage: `url("${image}")` }}>
      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>{title}</motion.h1>
      {sub && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>{sub}</motion.p>}
      <div className="crumbs"><Link to="/">Home</Link> &nbsp;/&nbsp; {crumb || title}</div>
    </section>
  );
}

/* ---------------- HERO ---------------- */
const slides = [
  {
    index: 1,
    img: '/optimized/hero/slide-1-1600.webp',
    srcSet: '/optimized/hero/slide-1-960.webp 960w, /optimized/hero/slide-1-1600.webp 1600w, /optimized/hero/slide-1-2200.webp 2200w',
    label: 'Luxury Residential Interior',
  },
  {
    index: 2,
    img: '/optimized/hero/slide-2-1600.webp',
    srcSet: '/optimized/hero/slide-2-960.webp 960w, /optimized/hero/slide-2-1600.webp 1600w, /optimized/hero/slide-2-2200.webp 2200w',
    label: 'Modern Interior Design',
  },
  {
    index: 3,
    img: '/optimized/hero/slide-3-1600.webp',
    srcSet: '/optimized/hero/slide-3-960.webp 960w, /optimized/hero/slide-3-1600.webp 1600w, /optimized/hero/slide-3-2200.webp 2200w',
    label: 'Bespoke Living Spaces',
  },
  {
    index: 4,
    img: '/optimized/hero/slide-4-1600.webp',
    srcSet: '/optimized/hero/slide-4-960.webp 960w, /optimized/hero/slide-4-1600.webp 1600w, /optimized/hero/slide-4-2200.webp 2200w',
    label: 'Contemporary Dining & Living',
  },
  {
    index: 5,
    img: '/optimized/hero/slide-5-1600.webp',
    srcSet: '/optimized/hero/slide-5-960.webp 960w, /optimized/hero/slide-5-1600.webp 1600w, /optimized/hero/slide-5-2200.webp 2200w',
    label: 'Visionary Architecture',
  },
  {
    index: 6,
    img: '/optimized/hero/slide-6-1600.webp',
    srcSet: '/optimized/hero/slide-6-960.webp 960w, /optimized/hero/slide-6-1600.webp 1600w, /optimized/hero/slide-6-2200.webp 2200w',
    label: 'Modern Turnkey Residence',
  },
];

export function HomeHero() {
  const [i, setI] = useState(0);
  const [hasTransitioned, setHasTransitioned] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setHasTransitioned(true);
      setI((p) => (p + 1) % slides.length);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  const currentSlide = slides[i];

  return (
    <section className="h-hero" id="home">
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="h-hero-bg"
          initial={hasTransitioned ? { opacity: 0, scale: 1.04 } : false}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.9 }, scale: { duration: 6, ease: 'linear' } }}
        >
          <img
            src={currentSlide.img}
            srcSet={currentSlide.srcSet}
            sizes="100vw"
            alt={currentSlide.label}
            className="h-hero-bg-img"
            fetchPriority={i === 0 ? 'high' : 'auto'}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding={i === 0 ? 'sync' : 'async'}
          />
        </motion.div>
      </AnimatePresence>
      <div className="h-hero-overlay" />
      <div className="h-hero-content">
        <span className="h-hero-tag">
          Interior Design · Turnkey Execution · Architecture
        </span>
        <h1>
          Designing <em>Timeless Interiors</em> with Purpose.
        </h1>
        <p>
          Residential &amp; Commercial Interior Design &amp; Execution, Architectural Design, Structural Consultancy &amp; Exhibition Booth Design.
          <span className="h-hero-sub-location">Serving Clients Across Bangladesh &amp; Worldwide.</span>
        </p>
        <div className="h-hero-ctas">
          <Link to="/projects" className="pill-btn glass" id="hero-view-projects"><FolderOpen size={16} /> Explore Interiors</Link>
          <Link to="/contact" className="pill-btn" id="hero-consultation"><Phone size={16} /> Book Free Consultation</Link>
        </div>
      </div>
      <div className="h-hero-dots">
        {slides.map((s, k) => (
          <button
            key={s.label}
            type="button"
            aria-label={`Slide ${k + 1}: ${s.label}`}
            className={k === i ? 'active' : ''}
            onClick={() => {
              setHasTransitioned(true);
              setI(k);
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.8, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container stats-inner clay">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <strong><Counter value={s.value} suffix={s.suffix} /></strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- VISUAL SERVICES SHOWCASE ---------------- */
export function ServicesGrid() {
  return (
    <section className="section cream">
      <div className="container">
        <SectionHead
          eyebrow="What We Do"
          title="Our"
          script="Expertise"
        />
        <div className="svc-visual-grid">
          {servicesData.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.slug}
                className="svc-vcard clay"
                {...fadeUp}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.06 }}
              >
                <Link to={`/services/${s.slug}`} className="svc-vcard-media">
                  <img src={s.image} alt={s.title} loading="lazy" />
                  <div className="svc-vcard-shade" />
                  <span className="svc-vcard-num">{s.number}</span>
                  <div className="svc-vcard-badge"><Icon size={18} /></div>
                </Link>

                <div className="svc-vcard-body">
                  <h3>
                    <Link to={`/services/${s.slug}`}>{s.shortTitle || s.title}</Link>
                  </h3>

                  <div className="svc-vcard-pills">
                    {s.options.map((opt) => (
                      <Link key={opt.slug} to={`/services/${opt.slug}`} className="svc-sub-pill">
                        {opt.title}
                      </Link>
                    ))}
                  </div>

                  <Link to={`/services/${s.slug}`} className="svc-more">
                    Explore ({s.options.length}) <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.article>
            );
          })}

          {/* Cost Estimator Card */}
          <motion.article className="svc-vcard svc-vcard-cta clay" {...fadeUp}>
            <div className="svc-vcard-cta-inner">
              <div className="svc-icon"><Calculator size={26} strokeWidth={1.6} /></div>
              <span className="svc-cta-tag">Budget Tool</span>
              <h3>Cost Estimator</h3>
              <p>Instant ballpark budget for your space.</p>
              <Link to="/cost-estimator" className="pill-btn" style={{ marginTop: 'auto', justifyContent: 'center' }}>
                Estimate Cost <ArrowRight size={15} />
              </Link>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

/* ---------------- EDITORIAL ASYMMETRIC PROJECTS ---------------- */
export function FeaturedProjects({ limit = 5 }) {
  const cats = ['All', ...new Set(projectsData.map((p) => p.category))];
  const [cat, setCat] = useState('All');
  const list = projectsData.filter((p) => cat === 'All' || p.category === cat).slice(0, limit);

  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Selected Portfolio"
          title="Curated"
          script="Spaces"
        />
        <div className="proj-tabs">
          {cats.map((c) => (
            <button key={c} type="button" className={c === cat ? 'active' : ''} onClick={() => setCat(c)}>
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
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

        <div className="proj-cta-wrap">
          <Link to="/projects" className="pill-btn dark" id="home-all-projects">
            All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BEFORE / AFTER & MATERIAL HOTSPOT SHOWCASE ---------------- */
const roomHotspots = [
  {
    id: 'millwork',
    num: '01',
    x: '25%',
    y: '45%',
    title: 'Fluted Walnut Joinery',
    finish: 'American Walnut · Acoustic Slat',
  },
  {
    id: 'lighting',
    num: '02',
    x: '56%',
    y: '22%',
    title: 'Warm Cove Lighting',
    finish: '2700K Dimmable Recessed LED',
  },
  {
    id: 'stone',
    num: '03',
    x: '64%',
    y: '72%',
    title: 'Travertine & Brass',
    finish: 'Honed Stone · Brushed Brass',
  },
];

export function TransformationShowcase() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeSpot, setActiveSpot] = useState(0);
  const isDraggingRef = useRef(false);
  const stageRef = useRef(null);

  const updateFromClientX = (clientX) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    if (!rect.width) return;
    const pct = Math.min(95, Math.max(5, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(Math.round(pct));
  };

  const handlePointerDown = (e) => {
    if (e.target.closest('.trans-hotspot')) return;
    isDraggingRef.current = true;
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (_) { }
    }
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (e.currentTarget.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (_) { }
    }
  };

  return (
    <section className="section cream trans-section">
      <div className="container">
        <SectionHead
          eyebrow="Craftsmanship & Execution"
          title="From Raw Space to"
          script="Living Art"
        />

        <div className="trans-grid">
          {/* Interactive Before/After Stage */}
          <div className="trans-stage-wrap">
            <div
              ref={stageRef}
              className="trans-stage"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* AFTER (Finished Turnkey Space - Base Layer) */}
              <img
                src="/portfolio/residential/living-marble-luxury-hall.webp"
                alt="Completed Brown's Interior Modern Dhaka Living Room"
                className="trans-img trans-after-img"
                loading="lazy"
                decoding="async"
                draggable={false}
              />

              {/* BEFORE (Raw Unfinished Space + Architectural Grid Layer - Clipped) */}
              <div
                className="trans-before-clip"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&fm=webp&q=70&w=900"
                  alt="Raw bare shell room before interior work"
                  className="trans-img trans-before-img"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <div className="trans-blueprint-grid" aria-hidden="true" />
              </div>

              {/* Corner Labels */}
              <span
                className={`trans-corner-tag before-tag ${sliderPos < 24 ? 'hidden-tag' : ''}`}
              >
                Before
              </span>
              <span
                className={`trans-corner-tag after-tag ${sliderPos > 76 ? 'hidden-tag' : ''}`}
              >
                After
              </span>

              {/* Interactive Material Hotspots */}
              {roomHotspots.map((spot, idx) => (
                <button
                  key={spot.id}
                  type="button"
                  className={`trans-hotspot ${activeSpot === idx ? 'active' : ''}`}
                  style={{ left: spot.x, top: spot.y }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSpot(idx);
                    if (sliderPos > 55) setSliderPos(18);
                  }}
                  aria-label={`${spot.num} — Inspect ${spot.title}`}
                >
                  <span className="trans-hotspot-pulse" />
                  <span className="trans-hotspot-num">{spot.num}</span>
                </button>
              ))}

              {/* Vertical Divider Line & Drag Handle */}
              <div className="trans-divider" style={{ left: `${sliderPos}%` }}>
                <div className="trans-handle" aria-hidden="true">
                  <ChevronLeft size={15} />
                  <ChevronRight size={15} />
                </div>
              </div>
            </div>

            {/* Minimal Comparison Presets Bar */}
            <div className="trans-controls-bar">
              <span className="trans-scrubber-label">View Mode</span>
              <div className="trans-preset-btns">
                <button
                  type="button"
                  className={sliderPos > 75 ? 'active' : ''}
                  onClick={() => setSliderPos(88)}
                >
                  Raw
                </button>
                <button
                  type="button"
                  className={sliderPos >= 35 && sliderPos <= 75 ? 'active' : ''}
                  onClick={() => setSliderPos(50)}
                >
                  50 / 50
                </button>
                <button
                  type="button"
                  className={sliderPos < 35 ? 'active' : ''}
                  onClick={() => setSliderPos(12)}
                >
                  Finished
                </button>
              </div>
            </div>
          </div>

          {/* Right: Minimal 3-Option Material Finishes */}
          <div className="trans-specs-panel">
            <div className="trans-specs-head">
              <span className="trans-specs-eyebrow">Material Finishes</span>
              <h3>Key Details</h3>
            </div>

            <div className="trans-specs-list">
              {roomHotspots.map((spot, idx) => {
                const isSelected = activeSpot === idx;
                return (
                  <div
                    key={spot.id}
                    className={`trans-spec-card ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSpot(idx);
                      if (sliderPos > 55) setSliderPos(18);
                    }}
                    onMouseEnter={() => setActiveSpot(idx)}
                  >
                    <div className="trans-spec-top">
                      <span className="trans-spec-num">{spot.num}</span>
                      <div>
                        <h4>{spot.title}</h4>
                        <small>{spot.finish}</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link to="/cost-estimator" className="pill-btn trans-cta-btn">
              <Calculator size={16} /> Estimate Similar Space <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- UNIFIED 6-STEP DESIGN PROCESS ---------------- */
const processIcons = [Compass, LayoutGrid, Layers, ClipboardList, Hammer, Sparkles];

export function ProcessTimeline({ showCta = false }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section dark proc-motion-section">
      <div className="container">
        <SectionHead
          eyebrow="How We Work"
          title="Our Design"
          script="Process"
        />

        <div className="proc-seq-grid">
          {processSteps.map((s, k) => {
            const StepIcon = processIcons[k] || Compass;
            const isActive = k === activeStep;
            return (
              <motion.div
                key={s.title}
                className={`proc-step-item ${isActive ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveStep(k)}
                onClick={() => setActiveStep(k)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: k * 0.07 }}
              >
                <div className="proc-step-node">
                  <span className="proc-step-num">{String(k + 1).padStart(2, '0')}</span>
                  {k < processSteps.length - 1 && (
                    <span className="proc-step-line" aria-hidden="true" />
                  )}
                </div>

                <div className="proc-card">
                  <div className="proc-card-top">
                    <div className="proc-card-icon-box">
                      <StepIcon size={18} strokeWidth={1.7} />
                    </div>
                    <span className="proc-phase-tag">{s.phase}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {showCta && (
          <div className="center mt-3">
            <Link to="/process" className="pill-btn glass" id="home-process-cta">
              Full Process <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
export function TestimonialSlider() {
  const [i, setI] = useState(0);
  const n = testimonials.length;
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);
  const visible = [0, 1, 2].map((o) => testimonials[(i + o) % n]);
  return (
    <section className="section cream">
      <div className="container">
        <SectionHead eyebrow="Client Stories" title="Trusted by" script="Clients" />
        <div className="testi-row">
          <AnimatePresence mode="popLayout">
            {visible.map((t, k) => (
              <motion.div key={t.name} className={`testi-card clay ${k === 0 ? 'lead' : ''}`} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45 }}>
                <Quote className="testi-quote" size={30} />
                <div className="testi-stars">{Array.from({ length: t.rating }).map((_, s) => <Star key={s} size={14} fill="currentColor" />)}</div>
                <p>"{t.text}"</p>
                <div className="testi-person">
                  <div className="testi-avatar" aria-hidden="true"><UserRound size={20} strokeWidth={1.8} /></div>
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="testi-nav">
          <button aria-label="Previous" onClick={() => setI((i - 1 + n) % n)}><ChevronLeft size={18} /></button>
          <button aria-label="Next" onClick={() => setI((i + 1) % n)}><ChevronRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
export function CostCTA() {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <motion.div {...fadeUp}>
          <h2>Ready to Build Your <em>Dream Space?</em></h2>
          <p>Book a free consultation or get an instant cost estimate.</p>
        </motion.div>
        <motion.div className="cta-btns" {...fadeUp}>
          <Link to="/cost-estimator" className="pill-btn glass" id="cta-calculator"><Calculator size={16} /> Estimate Cost</Link>
          <Link to="/contact" className="pill-btn" id="cta-contact"><Phone size={16} /> Book Consultation</Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- BLOG ---------------- */
export function BlogCard({ post }) {
  if (!post) return null;
  return (
    <Link to={`/blog/${post.slug}`} className="blog-card clay">
      <div className="blog-img">
        <img src={post.image} alt={post.title} loading="lazy" />
        <span>{post.category}</span>
      </div>
      <div className="blog-body">
        <small>{post.date} {post.readTime ? `· ${post.readTime}` : ''}</small>
        <h3>{post.title}</h3>
        {post.excerpt && (
          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              margin: '0.4rem 0 0.8rem',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </p>
        )}
        <span className="svc-more">Read Article <ArrowRight size={14} /></span>
      </div>
    </Link>
  );
}

export function BlogPreview() {
  return (
    <section className="section cream">
      <div className="container">
        <SectionHead eyebrow="Insights" title="Latest" script="Articles" />
        <div className="grid-3">
          {blogPreviews.map((p, k) => (
            <motion.div key={p.slug} {...fadeUp} transition={{ duration: 0.5, delay: k * 0.08 }}><BlogCard post={p} /></motion.div>
          ))}
        </div>
        <div className="center mt-3">
          <Link to="/blog" className="pill-btn dark" id="home-all-blog">All Articles <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}
