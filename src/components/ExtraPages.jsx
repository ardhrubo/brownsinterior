import React, { useMemo, useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Quote, ArrowLeft, Calculator, Phone, UserRound, Mail, MapPin, Clock, ArrowRight,
  CheckCircle2, Sparkles, Home, Building2, Store, Layers, Check, ShieldCheck
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SectionHead, ProcessTimeline, CostCTA, BlogCard } from './HomeSections';
import SEO from './SEO';
import NotFound from './NotFound';
import { testimonials, processSteps, blogPosts } from '../data/siteData';
import { NOTIFICATION_EMAIL } from '../lib/supabase';
import '../styles/site.css';
import './HomeSections.css';
import './ExtraPages.css';

export function ProcessPage() {
  return (
    <main className="page-start-section">
      <SEO
        title="Our Process - 6-Step Interior Design & Execution Journey"
        description="Explore our proven 6-step interior and architecture process from consultation and 3D visualization to turnkey handover in Dhaka."
        canonicalPath="/process"
      />
      <div className="container" style={{ marginBottom: '1.5rem' }}>
        <SectionHead
          eyebrow="Proven Methodology"
          title="Our Execution"
          script="Process"
          sub="A clear, systematic 6-step journey from your first concept to final turnkey handover."
        />
      </div>
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
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: k * 0.08 }}
              >
                <span className="tl-dot">{String(k + 1).padStart(2, '0')}</span>
                <div className="tl-card clay">
                  <div className="tl-meta-row">
                    {s.phase && <span className="tl-phase">{s.phase}</span>}
                    {s.duration && <span className="tl-duration">{s.duration}</span>}
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  {s.deliverables && (
                    <div className="tl-tags">
                      {s.deliverables.map((d) => (
                        <span key={d} className="tl-tag">{d}</span>
                      ))}
                    </div>
                  )}
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
    <main className="page-start-section">
      <SEO
        title="Client Reviews & Testimonials - Brown's Interior"
        description="Read genuine testimonials from apartment owners, corporate directors, and commercial clients across Dhaka who transformed their spaces with Brown's Interior."
        canonicalPath="/testimonials"
      />
      <section className="section cream" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          <SectionHead
            eyebrow="Client Stories"
            title="Words From Our"
            script="Clients"
            sub="Hear from homeowners, developers, and corporate executives who trusted Brown's Interior with their spaces."
          />
          <div className="grid-3" style={{ marginTop: '2.5rem' }}>
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
    <main className="page-start-section">
      <SEO
        title="Interior Design & Renovation Blog"
        description="Practical guides, styling tips, budget planning advice, and exhibition stall design ideas from the Brown's Interior design studio."
        canonicalPath="/blog"
      />
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <SectionHead
            eyebrow="Insights & Guides"
            title="Design"
            script="Journal"
            sub="Design ideas, renovation guides, budget planning tips, and trends from the Brown's Interior team."
          />
          <div className="grid-3" style={{ marginTop: '2.5rem' }}>
            {blogPosts.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <NotFound message="The requested blog article could not be found." />;
  const others = blogPosts.filter((p) => p.slug !== slug);
  return (
    <main className="page-start-section">
      <SEO
        title={`${post.title} - Blog`}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        image={post.image}
        type="article"
      />
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container post-wrap">
          <article className="post">
            <Link to="/blog" className="post-back"><ArrowLeft size={16} /> Back to Blog</Link>
            <span className="sec-eyebrow" style={{ display: 'block', marginTop: '1rem' }}>{post.category}</span>
            <h1 className="post-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '0.5rem 0 1rem', lineHeight: 1.2 }}>{post.title}</h1>
            <small style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '1.5rem' }}>{post.date} · By Brown's Interior Studio</small>
            <div className="post-featured-image" style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem', maxHeight: '480px' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
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
// Studio benchmark calibrated for Dhaka Interior market (Engr. Aslam Sheikh):
// For 1200 sft Residential:
// - Standard: ৳ 9 Lac to 13 Lac (~৳ 750 – ৳ 1,083.33 / sft)
// - Premium:  ৳ 13 Lac to 25 Lac (~৳ 1,083.33 – ৳ 2,083.33 / sft)
// - Luxury:   ৳ 20 Lac to 45 Lac (~৳ 1,666.67 – ৳ 3,750 / sft)

const spaceTypes = [
  { id: 'residential', label: 'Residential Interior', mult: 1.0, icon: Home, hint: 'Apartments & Duplexes' },
  { id: 'commercial', label: 'Commercial Interior', mult: 1.2, icon: Building2, hint: 'Corporate HQ & Offices' },
  { id: 'office', label: 'Office & Retail Interior', mult: 1.15, icon: Store, hint: 'Showrooms, Cafes & Retail' },
  { id: 'booth', label: 'Exhibition Stall & Booth', mult: 1.45, icon: Layers, hint: 'Trade Fair & Expos' },
];

const packages = [
  {
    id: 'basic',
    label: 'Standard',
    rateLabel: '৳ 750 – ৳ 1,080 / sft',
    minRate: 750,
    maxRate: 1083.333,
    benchmark: '৳ 9 – 13 Lac (1200 sft)',
    desc: 'Functional essentials, HPL board & quality turnkey hardware',
    features: ['Standard HPL & Melamine Board', 'Quality Commercial Hardware', 'Clean Electrical Fit-out'],
  },
  {
    id: 'premium',
    label: 'Premium',
    rateLabel: '৳ 1,080 – ৳ 2,080 / sft',
    minRate: 1083.333,
    maxRate: 2083.333,
    benchmark: '৳ 13 – 25 Lac (1200 sft)',
    desc: 'Designer woodwork, bespoke acrylic/veneer & ambient lighting',
    features: ['High-Gloss Acrylic & Natural Veneer', 'Custom Ambient Cove Lighting', 'Branded Hardware & Soft-Close'],
  },
  {
    id: 'luxury',
    label: 'Luxury',
    rateLabel: '৳ 1,670 – ৳ 3,750 / sft',
    minRate: 1666.667,
    maxRate: 3750,
    benchmark: '৳ 20 – 45 Lac (1200 sft)',
    desc: 'Signature bespoke interiors, imported marble, acoustic panels & smart automation',
    features: ['Imported Italian Marble & Fluted Panels', 'Acoustic Ceilings & Hidden Partitions', 'Complete Smart Home & Luxury Millwork'],
  },
];

const fmtBDT = (n) => '৳ ' + Math.round(n).toLocaleString('en-IN');
const fmtLakh = (n) => {
  const l = n / 100000;
  if (l >= 100) return (l / 100).toFixed(2) + ' Cr';
  return Number.isInteger(l) ? l + ' Lac' : l.toFixed(1) + ' Lac';
};

export function CostCalculatorPage() {
  const [type, setType] = useState('residential');
  const [pkg, setPkg] = useState('basic');
  const [area, setArea] = useState(1200);

  useEffect(() => {
    document.body.classList.add('has-cost-calc');
    return () => document.body.classList.remove('has-cost-calc');
  }, []);

  const selectedSpace = spaceTypes.find((s) => s.id === type) || spaceTypes[0];
  const selectedPkg = packages.find((p) => p.id === pkg) || packages[0];

  const { minBudget, maxBudget } = useMemo(() => {
    const mult = selectedSpace.mult;
    const bMin = Math.round(selectedPkg.minRate * mult * area);
    const bMax = Math.round(selectedPkg.maxRate * mult * area);
    return {
      minBudget: bMin,
      maxBudget: bMax,
    };
  }, [selectedSpace, selectedPkg, area]);

  const summaryLakh = `Approx. ${fmtLakh(minBudget)} – ${fmtLakh(maxBudget)} BDT`;
  const summaryBDT = `${fmtBDT(minBudget)} – ${fmtBDT(maxBudget)}`;

  return (
    <main className="page-start-section">
      <SEO
        title="Interior Design Cost Calculator - Dhaka, Bangladesh"
        description="Estimate residential, commercial, and exhibition booth interior design costs instantly with our transparent budget calculator."
        canonicalPath="/cost-estimator"
      />
      <div className="container" style={{ marginBottom: '1.5rem' }}>
        <SectionHead
          eyebrow="Instant Budget Calculator"
          title="Estimate"
          script="Your Space"
          sub="Instant, transparent budget calculation calibrated for Dhaka's residential and commercial interior market."
        />
      </div>
      <section className="section cream calc-section">
        <div className="calc-container calc">
          <div className="calc-form clay">
            {/* Step 1: Type of Space */}
            <div className="calc-sec-head">
              <h3>
                <span className="calc-step-num">1</span>
                Type of Space
              </h3>
              <span className="calc-sec-badge">{selectedSpace.label}</span>
            </div>
            <div className="space-grid">
              {spaceTypes.map((s) => {
                const IconComponent = s.icon;
                const isSelected = type === s.id;
                return (
                  <button
                    key={s.id}
                    id={`calc-type-${s.id}`}
                    type="button"
                    className={`space-card ${isSelected ? 'on' : ''}`}
                    onClick={() => setType(s.id)}
                  >
                    <div className="space-card-icon">
                      <IconComponent size={20} />
                    </div>
                    <strong>{s.label}</strong>
                    <small>{s.hint}</small>
                  </button>
                );
              })}
            </div>

            {/* Step 2: Area */}
            <div className="calc-sec-head">
              <h3>
                <span className="calc-step-num">2</span>
                Area — <span className="calc-area">{area.toLocaleString()} sq ft</span>
              </h3>
              <span className="calc-sec-badge">Floor Footprint</span>
            </div>
            <div className="calc-area-controls">
              <input
                id="calc-area"
                type="range"
                min="200"
                max="10000"
                step="50"
                value={area}
                onChange={(e) => setArea(+e.target.value)}
                className="calc-range"
                aria-label="Area range slider"
              />
              <div className="calc-area-action-row">
                <div className="calc-area-pills" role="group" aria-label="Quick area presets">
                  {[800, 1200, 1500, 2000, 2500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={`area-pill ${area === preset ? 'active' : ''}`}
                      onClick={() => setArea(preset)}
                    >
                      {preset} sft
                    </button>
                  ))}
                </div>
                <div className="calc-num-wrap">
                  <span className="calc-num-label">Exact:</span>
                  <input
                    type="number"
                    min="50"
                    value={area}
                    onChange={(e) => setArea(Math.max(0, +e.target.value))}
                    className="calc-num"
                    aria-label="Area in square feet"
                    inputMode="numeric"
                  />
                  <span>sq ft</span>
                </div>
              </div>
            </div>

            {/* Step 3: Finish Level */}
            <div className="calc-sec-head">
              <h3>
                <span className="calc-step-num">3</span>
                Finish Level
              </h3>
              <span className="calc-sec-badge">{selectedPkg.label} Tier</span>
            </div>
            <div className="pkg-grid">
              {packages.map((p) => {
                const isSelected = pkg === p.id;
                return (
                  <button
                    key={p.id}
                    id={`calc-pkg-${p.id}`}
                    type="button"
                    className={`pkg-card ${isSelected ? 'on' : ''}`}
                    onClick={() => setPkg(p.id)}
                  >
                    <div className="pkg-top">
                      <div className="pkg-title-row">
                        <strong>{p.label}</strong>
                        <span className="pkg-rate-badge">{p.rateLabel}</span>
                      </div>
                      <span className="pkg-benchmark">{p.benchmark}</span>
                    </div>
                    <p className="pkg-desc">{p.desc}</p>
                    <div className="pkg-features">
                      {p.features.map((feat) => (
                        <div key={feat} className="pkg-feat-item">
                          <Check size={13} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Calculation Result Sidebar */}
          <aside className="calc-result" id="calc-result-box">
            <div className="calc-res-header">
              <Calculator size={22} />
              <span>ESTIMATED BUDGET RANGE</span>
            </div>

            {/* Transparent Tier Breakdown */}
            <div className="calc-breakdown-card">
              <div className="calc-breakdown-header">
                <span>Estimate Summary</span>
              </div>

              <div className="cbr-item">
                <div className="cbr-info">
                  <span className="cbr-title">Space Category</span>
                  <span className="cbr-sub">{selectedSpace.label}</span>
                </div>
                <div className="cbr-amount">
                  {area.toLocaleString()} sq ft
                </div>
              </div>

              <div className="cbr-item">
                <div className="cbr-info">
                  <span className="cbr-title">Execution Tier</span>
                  <span className="cbr-sub">{selectedPkg.label} Finish</span>
                </div>
                <div className="cbr-amount">
                  {selectedPkg.rateLabel}
                </div>
              </div>

              <div className="cbr-divider" />

              <div className="cbr-summary-row">
                <span className="cbr-total-label">ESTIMATED BUDGET RANGE</span>
                <span className="cbr-total-bdt">{summaryBDT}</span>
              </div>
            </div>

            <motion.div
              key={`${minBudget}-${maxBudget}`}
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="calc-res-pricing"
            >
              <div className="calc-lakh-chip">{summaryLakh}</div>
              <div className="calc-rate-sub">
                Effective ৳ {Math.round(minBudget / area).toLocaleString()} – ৳ {Math.round(maxBudget / area).toLocaleString()} / sq ft
              </div>
            </motion.div>

            <p className="calc-res-note">
              Calibrated for Dhaka turnkey standards. Final cost depends on customized 3D layout, material grade, and site conditions.
            </p>

            <Link
              to={`/contact?category=${encodeURIComponent(selectedSpace.label)}&area=${area}&budget=${encodeURIComponent(
                `${summaryBDT} (${summaryLakh})`
              )}`}
              className="cch-primary-btn"
              id="calc-get-quote"
            >
              <span>Get Exact Quotation & BOQ</span>
              <ArrowRight size={16} />
            </Link>

            {/* Direct Studio Connect */}
            <div className="calc-contact-highlight">
              <div className="cch-head">
                <span className="cch-badge">Direct Studio Connect</span>
                <h4>Speak with Engr. Aslam</h4>
                <p>Discuss your floor plan, get instant advice, or book an on-site visit.</p>
              </div>

              <div className="cch-actions">
                <a href="tel:+8801768436319" className="cch-btn cch-call" id="calc-call-btn">
                  <Phone size={16} />
                  <span>Call: +880 1768-436319</span>
                </a>

                <a
                  href={`https://wa.me/8801768436319?text=${encodeURIComponent(
                    `Hello Brown's Interior! I estimated a budget of ${summaryBDT} (${summaryLakh}) for my ${area} sq ft ${selectedSpace.label} (${selectedPkg.label} finish) on your website. I'd like to consult with Engr. Aslam.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="cch-btn cch-whatsapp"
                  id="calc-whatsapp-btn"
                >
                  <FaWhatsapp size={17} />
                  <span>WhatsApp Engr. Aslam</span>
                </a>
              </div>

              <div className="cch-meta">
                <div className="cch-meta-item">
                  <MapPin size={14} /> <span>Uttara, Dhaka, Bangladesh</span>
                </div>
                <div className="cch-meta-item">
                  <Mail size={14} /> <span>{NOTIFICATION_EMAIL}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile Floating Sticky Live Budget Bar */}
        <div className="calc-mobile-sticky-bar">
          <div className="cmsb-content">
            <span className="cmsb-label">{selectedSpace.label.split(' ')[0]} • {selectedPkg.label} • {area.toLocaleString()} sft</span>
            <strong className="cmsb-price">{summaryLakh}</strong>
          </div>
          <button
            type="button"
            className="cmsb-action-btn"
            aria-label="Scroll to cost breakdown"
            onClick={() => {
              const el = document.getElementById('calc-result-box');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            <span>View Breakdown</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Highlighted Consultation Banner below */}
        <div className="container calc-bottom-banner">
          <div className="cbb-card">
            <div className="cbb-content">
              <span className="sec-eyebrow">Personalized Architecture & Interior Service</span>
              <h2>Planning an interior project in Dhaka?</h2>
              <p>
                From 1,200 sq ft apartments in Uttara and Mirpur to luxury residences in Gulshan, Banani, and corporate headquarters — our team led by <strong>Engr. Aslam Sheikh</strong> delivers turnkey design-build excellence tailored to your exact budget.
              </p>
            </div>

            <div className="cbb-grid">
              <a href="tel:+8801768436319" className="cbb-item cbb-item-phone">
                <div className="cbb-icon"><Phone size={20} /></div>
                <div>
                  <small>Direct Phone Call</small>
                  <strong>+880 1768-436319</strong>
                  <span>Instant consultation with Aslam & team</span>
                </div>
              </a>

              <a
                href={`https://wa.me/8801768436319?text=${encodeURIComponent(
                  `Hello Brown's Interior, I would like to schedule a site consultation and discuss interior design for my space in Dhaka.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="cbb-item cbb-item-wa"
              >
                <div className="cbb-icon"><FaWhatsapp size={22} /></div>
                <div>
                  <small>Instant WhatsApp</small>
                  <strong>+880 1768-436319</strong>
                  <span>Share floor plans, photos & requirements</span>
                </div>
              </a>

              <div className="cbb-item cbb-item-studio">
                <div className="cbb-icon"><MapPin size={20} /></div>
                <div>
                  <small>Design Studio</small>
                  <strong>Uttara, Dhaka</strong>
                  <span>Open Sat – Thu · 9:00 AM – 7:00 PM</span>
                </div>
              </div>

              <a href={`mailto:${NOTIFICATION_EMAIL}`} className="cbb-item cbb-item-mail">
                <div className="cbb-icon"><Mail size={20} /></div>
                <div>
                  <small>Official Studio Email</small>
                  <strong>{NOTIFICATION_EMAIL}</strong>
                  <span>Send detailed tender / RFQ files</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
