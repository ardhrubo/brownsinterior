import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { FolderOpen, Phone, ArrowRight, Star, Quote, ChevronLeft, ChevronRight, Calculator, MapPin } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';
import { testimonials, processSteps, blogPosts, stats } from '../data/siteData';
import '../styles/site.css';
import './HomeSections.css';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7 },
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
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>{title}</motion.h1>
      {sub && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>{sub}</motion.p>}
      <div className="crumbs"><Link to="/">Home</Link> &nbsp;/&nbsp; {crumb || title}</div>
    </section>
  );
}

/* ---------------- HERO ---------------- */
const slides = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2400',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2400',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2400',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2400',
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
          style={{ backgroundImage: `url("${slides[i]}")` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: 'linear' } }}
        />
      </AnimatePresence>
      <div className="h-hero-overlay" />
      <div className="h-hero-content">
        <motion.span className="h-hero-tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Brown's Interior
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }}>
          Designing Beautiful Spaces with Quality and Purpose.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          A Dhaka-based interior design and execution firm providing professional design solutions for residential, commercial and exhibition spaces.
        </motion.p>
      </div>
      <motion.div className="h-hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <Link to="/projects" className="pill-btn glass" id="hero-view-projects"><FolderOpen size={16} /> View Projects</Link>
        <Link to="/contact" className="pill-btn" id="hero-consultation"><Phone size={16} /> Free Consultation</Link>
      </motion.div>
      <div className="h-hero-dots">
        {slides.map((_, k) => (
          <button key={k} aria-label={`Slide ${k + 1}`} className={k === i ? 'active' : ''} onClick={() => setI(k)} />
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
    const c = animate(0, value, { duration: 2, onUpdate: (v) => setN(Math.round(v)) });
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

/* ---------------- SERVICES ---------------- */
export function ServicesGrid() {
  return (
    <section className="section cream">
      <div className="container">
        <SectionHead eyebrow="What We Offer" title="Our" script="Services" sub="Interior design, architectural design, structural consultancy, renovation and remodeling, exhibition and trade show booth design, and project management." />
        <div className="grid-4 svc-grid">
          {servicesData.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.slug} {...fadeUp} transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}>
                <Link to={`/services#${s.slug}`} className="svc-card clay">
                  <div className="svc-icon"><Icon size={26} strokeWidth={1.6} /></div>
                  <h3>{s.shortTitle || s.title}</h3>
                  <p>{s.items.slice(0, 3).join(' · ')}</p>
                  <span className="svc-more">Explore <ArrowRight size={14} /></span>
                </Link>
              </motion.div>
            );
          })}
          <motion.div {...fadeUp}>
            <Link to="/cost-estimator" className="svc-card clay svc-card-cta">
              <div className="svc-icon"><Calculator size={26} strokeWidth={1.6} /></div>
              <h3>Estimate Your Cost</h3>
              <p>Get an instant budget idea for your interior project.</p>
              <span className="svc-more">Try Calculator <ArrowRight size={14} /></span>
            </Link>
          </motion.div>
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
        <SectionHead eyebrow="Portfolio" title="Featured" script="Projects" sub="A selection of spaces we've designed and delivered." />
        <div className="proj-tabs">
          {cats.map((c) => (
            <button key={c} className={c === cat ? 'active' : ''} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <motion.div layout className="grid-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.4 }}>
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

/* ---------------- PROCESS ---------------- */
export function ProcessTimeline() {
  return (
    <section className="section dark">
      <div className="container">
        <SectionHead eyebrow="How We Work" title="Our Design" script="Process" sub="A clear, transparent journey from first idea to final handover." />
        <div className="grid-3 proc-grid">
          {processSteps.map((s, k) => (
            <motion.div key={s.title} className="proc-card" {...fadeUp} transition={{ duration: 0.6, delay: (k % 3) * 0.12 }}>
              <span className="proc-num">{String(k + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.div>
          ))}
        </div>
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
        <SectionHead eyebrow="Testimonials" title="What Our" script="Clients Say" />
        <div className="testi-row">
          <AnimatePresence mode="popLayout">
            {visible.map((t, k) => (
              <motion.div key={t.name} className={`testi-card clay ${k === 0 ? 'lead' : ''}`} layout initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.5 }}>
                <Quote className="testi-quote" size={34} />
                <div className="testi-stars">{Array.from({ length: t.rating }).map((_, s) => <Star key={s} size={15} fill="currentColor" />)}</div>
                <p>"{t.text}"</p>
                <div className="testi-person">
                  <div className="testi-avatar">{t.name.split(' ').map((w) => w[0]).join('')}</div>
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
          <h2>Creative Design. Professional Service. <em>Quality You Can Trust.</em></h2>
          <p>From the initial concept to the final outcome — get a free consultation or estimate your project cost.</p>
        </motion.div>
        <motion.div className="cta-btns" {...fadeUp}>
          <Link to="/cost-estimator" className="pill-btn glass" id="cta-calculator"><Calculator size={16} /> Cost Calculator</Link>
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
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="Insights" title="Latest From Our" script="Blog" />
        <div className="grid-3">
          {blogPosts.map((p, k) => (
            <motion.div key={p.slug} {...fadeUp} transition={{ duration: 0.6, delay: k * 0.1 }}><BlogCard post={p} /></motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
