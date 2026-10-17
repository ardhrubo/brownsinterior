import React, { useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft, Calculator, Phone, UserRound } from 'lucide-react';
import { PageHero, SectionHead, ProcessTimeline, CostCTA, TestimonialSlider, BlogCard } from './HomeSections';
import { testimonials, processSteps, blogPosts } from '../data/siteData';
import '../styles/site.css';
import './HomeSections.css';
import './ExtraPages.css';

export function ProcessPage() {
  return (
    <main>
      <PageHero
        title="Our Process"
        sub="A clear, step-by-step journey from your first idea to the final handover."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000"
      />
      <ProcessTimeline />
      <section className="section cream">
        <div className="container">
          <SectionHead
            eyebrow="Step-by-Step Journey"
            title="What to"
            script="Expect"
            sub="Every phase of your project is documented, scheduled, and supervised by our engineering and design team."
          />
          <div className="timeline">
            {processSteps.map((s, k) => (
              <motion.div
                key={s.title}
                className={`tl-item ${k % 2 ? 'right' : 'left'}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: k * 0.06 }}
              >
                <span className="tl-dot">{String(k + 1).padStart(2, '0')}</span>
                <div className="tl-card clay">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CostCTA />
    </main>
  );
}

export function TestimonialsPage() {
  return (
    <main>
      <PageHero title="Testimonials" sub="Hear from the clients who trusted us with their spaces." image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" />
      <section className="section cream">
        <div className="container">
          <SectionHead eyebrow="Client Stories" title="Words From Our" script="Clients" />
          <div className="grid-3">
            {testimonials.map((t, k) => (
              <motion.div key={t.name} className="testi-card clay" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (k % 3) * 0.1 }}>
                <Quote className="testi-quote" size={34} />
                <div className="testi-stars">{Array.from({ length: t.rating }).map((_, s) => <Star key={s} size={15} fill="currentColor" />)}</div>
                <p>"{t.text}"</p>
                <div className="testi-person">
                  <div className="testi-avatar" aria-hidden="true"><UserRound size={20} strokeWidth={1.8} /></div>
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CostCTA />
    </main>
  );
}

export function BlogPage() {
  return (
    <main>
      <PageHero title="Our Blog" sub="Design ideas, tips and insights from the Brown's Interior team." image="https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&q=80&w=2000" crumb="Blog" />
      <section className="section">
        <div className="container grid-3">
          {blogPosts.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
      </section>
    </main>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;
  const others = blogPosts.filter((p) => p.slug !== slug);
  return (
    <main>
      <PageHero title={post.category} sub={post.title} image={post.image} crumb="Blog" />
      <section className="section">
        <div className="container post-wrap">
          <article className="post">
            <Link to="/blog" className="post-back"><ArrowLeft size={16} /> Back to Blog</Link>
            <small>{post.date} · {post.category}</small>
            <h2>{post.title}</h2>
            {post.body.map((para, k) => <p key={k}>{para}</p>)}
          </article>
          <aside className="post-side">
            <h4>More Articles</h4>
            {others.map((p) => <BlogCard key={p.slug} post={p} />)}
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ---------- Cost Calculator ---------- */
const spaceTypes = [
  { id: 'residential', label: 'Residential', rate: 1800 },
  { id: 'office', label: 'Office / Commercial', rate: 2200 },
  { id: 'restaurant', label: 'Restaurant / Retail', rate: 2600 },
  { id: 'booth', label: 'Exhibition Booth', rate: 3500 },
];
const packages = [
  { id: 'basic', label: 'Standard', mult: 1, desc: 'Quality essentials, functional finish' },
  { id: 'premium', label: 'Premium', mult: 1.45, desc: 'Better materials & detailing' },
  { id: 'luxury', label: 'Luxury', mult: 2, desc: 'High-end imported finishes' },
];
const extras = [
  { id: 'design3d', label: '3D Visualization', cost: 25000 },
  { id: 'lighting', label: 'Lighting & Ceiling Design', cost: 60 },
  { id: 'furniture', label: 'Custom Furniture', cost: 450 },
  { id: 'mep', label: 'Electrical & Plumbing', cost: 120 },
];

const fmt = (n) => '৳ ' + Math.round(n).toLocaleString('en-IN');

export function CostCalculatorPage() {
  const [type, setType] = useState('residential');
  const [pkg, setPkg] = useState('premium');
  const [area, setArea] = useState(1200);
  const [sel, setSel] = useState(['design3d']);

  const total = useMemo(() => {
    const rate = spaceTypes.find((s) => s.id === type).rate;
    const mult = packages.find((p) => p.id === pkg).mult;
    let t = rate * mult * area;
    extras.forEach((e) => {
      if (sel.includes(e.id)) t += e.id === 'design3d' ? e.cost : e.cost * area;
    });
    return t;
  }, [type, pkg, area, sel]);

  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <main>
      <PageHero title="Cost Calculator" sub="Get an instant, approximate budget for your project." image="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2000" />
      <section className="section cream">
        <div className="container calc">
          <div className="calc-form clay">
            <h3>1. Type of Space</h3>
            <div className="opt-grid">
              {spaceTypes.map((s) => (
                <button key={s.id} id={`calc-type-${s.id}`} className={`opt ${type === s.id ? 'on' : ''}`} onClick={() => setType(s.id)}>{s.label}</button>
              ))}
            </div>

            <h3>2. Area — <span className="calc-area">{area.toLocaleString()} sq ft</span></h3>
            <input id="calc-area" type="range" min="200" max="10000" step="50" value={area} onChange={(e) => setArea(+e.target.value)} className="calc-range" />
            <input type="number" min="50" value={area} onChange={(e) => setArea(Math.max(0, +e.target.value))} className="calc-num" aria-label="Area in square feet" />

            <h3>3. Finish Level</h3>
            <div className="opt-grid three">
              {packages.map((p) => (
                <button key={p.id} id={`calc-pkg-${p.id}`} className={`opt ${pkg === p.id ? 'on' : ''}`} onClick={() => setPkg(p.id)}>
                  <strong>{p.label}</strong><small>{p.desc}</small>
                </button>
              ))}
            </div>

            <h3>4. Additional Services</h3>
            <div className="opt-grid">
              {extras.map((e) => (
                <label key={e.id} className={`opt check ${sel.includes(e.id) ? 'on' : ''}`}>
                  <input type="checkbox" checked={sel.includes(e.id)} onChange={() => toggle(e.id)} /> {e.label}
                </label>
              ))}
            </div>
          </div>

          <aside className="calc-result">
            <Calculator size={30} />
            <span>Estimated Budget</span>
            <motion.strong key={Math.round(total)} initial={{ scale: 0.9, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }}>{fmt(total * 0.9)} – {fmt(total * 1.1)}</motion.strong>
            <p>This is an approximate range. Final cost depends on site conditions, design and material choices.</p>
            <Link to="/contact" className="pill-btn" id="calc-get-quote"><Phone size={16} /> Get Exact Quote</Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
