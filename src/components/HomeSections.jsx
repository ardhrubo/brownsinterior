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
import { testimonials, blogPosts, stats, processSteps } from '../data/siteData';
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
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2400',
    label: 'Residential Luxury',
  },
  {
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2400',
    label: 'Bespoke Living Spaces',
  },
  {
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2400',
    label: 'Modern Workplaces',
  },
  {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2400',
    label: 'Architecture & Turnkey',
  },
];

export function HomeHero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="h-hero" id="home">
      <AnimatePresence>
        <motion.div
          key={i}
          className="h-hero-bg"
          style={{ backgroundImage: `url("${slides[i].img}")` }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1 }, scale: { duration: 6, ease: 'linear' } }}
        />
      </AnimatePresence>
      <div className="h-hero-overlay" />
      <div className="h-hero-content">
        <motion.span className="h-hero-tag" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          Architecture · Interior · Turnkey
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          Designing <em>Timeless Spaces</em> with Purpose.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          Residential, commercial &amp; exhibition design-build studio in Dhaka.
        </motion.p>
        <motion.div className="h-hero-ctas" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
          <Link to="/projects" className="pill-btn glass" id="hero-view-projects"><FolderOpen size={16} /> Explore Work</Link>
          <Link to="/contact" className="pill-btn" id="hero-consultation"><Phone size={16} /> Free Consultation</Link>
        </motion.div>
      </div>
      <div className="h-hero-dots">
        {slides.map((s, k) => (
          <button key={s.label} aria-label={`Slide ${k + 1}`} className={k === i ? 'active' : ''} onClick={() => setI(k)} />
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
          sub="Select a discipline or jump straight to a specialized service."
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
                  <p>{s.tagline || s.description}</p>

                  <div className="svc-vcard-pills">
                    {s.options.map((opt) => (
                      <Link key={opt.slug} to={`/services/${opt.slug}`} className="svc-sub-pill">
                        {opt.title}
                      </Link>
                    ))}
                  </div>

                  <Link to={`/services/${s.slug}`} className="svc-more">
                    View All {s.options.length} Services <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.article>
            );
          })}

          {/* Cost Estimator Card */}
          <motion.article className="svc-vcard svc-vcard-cta clay" {...fadeUp}>
            <div className="svc-vcard-cta-inner">
              <div className="svc-icon"><Calculator size={26} strokeWidth={1.6} /></div>
              <span className="svc-cta-tag">Instant Budget Tool</span>
              <h3>Estimate Your Project Cost</h3>
              <p>Calculate a tailored ballpark budget for your apartment, office, or renovation in seconds.</p>
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

/* ---------------- PROJECTS ---------------- */
export function FeaturedProjects({ limit = 6 }) {
  const cats = ['All', ...new Set(projectsData.map((p) => p.category))];
  const [cat, setCat] = useState('All');
  const list = projectsData.filter((p) => cat === 'All' || p.category === cat).slice(0, limit);
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="Selected Works" title="Featured" script="Projects" />
        <div className="proj-tabs">
          {cats.map((c) => (
            <button key={c} className={c === cat ? 'active' : ''} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <motion.div layout className="grid-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.35 }}>
                <Link to={`/project/${p.id}`} className="proj-card">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="proj-info">
                    <span className="proj-cat">{p.category}</span>
                    <h3>{p.title}</h3>
                    {p.location && <span className="proj-loc"><MapPin size={13} /> {p.location}</span>}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="center mt-3">
          <Link to="/projects" className="pill-btn outline" id="home-all-projects">View All Projects <ArrowRight size={16} /></Link>
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
          sub="Six clear steps from your first consultation to move-in ready handover."
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
                {/* Step node badge (sits on top on desktop, on the left timeline rail on mobile) */}
                <div className="proc-step-node">
                  <span className="proc-step-num">{String(k + 1).padStart(2, '0')}</span>
                  {k < processSteps.length - 1 && (
                    <span className="proc-step-line" aria-hidden="true" />
                  )}
                </div>

                {/* Card body */}
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
              Explore Full Process <ArrowRight size={15} />
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
        <SectionHead eyebrow="Client Stories" title="Trusted by" script="Homeowners & Brands" />
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
          <p>Book a free consultation or get an instant project cost estimate.</p>
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
  return (
    <Link to={`/blog/${post.slug}`} className="blog-card clay">
      <div className="blog-img"><img src={post.image} alt={post.title} loading="lazy" /><span>{post.category}</span></div>
      <div className="blog-body">
        <small>{post.date}</small>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="svc-more">Read More <ArrowRight size={14} /></span>
      </div>
    </Link>
  );
}

export function BlogPreview() {
  return (
    <section className="section cream">
      <div className="container">
        <SectionHead eyebrow="Insights & Ideas" title="Latest From Our" script="Blog" />
        <div className="grid-3">
          {blogPosts.map((p, k) => (
            <motion.div key={p.slug} {...fadeUp} transition={{ duration: 0.5, delay: k * 0.08 }}><BlogCard post={p} /></motion.div>
          ))}
        </div>
        <div className="center mt-3">
          <Link to="/blog" className="pill-btn dark" id="home-all-blog">View All Articles <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}
