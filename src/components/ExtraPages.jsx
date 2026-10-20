import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Quote, UserRound, ArrowRight, CheckCircle2, Sparkles, Home, Building2, Layers
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SectionHead, ProcessTimeline, CostCTA, BlogCard } from './HomeSections';
import SEO from './SEO';
import { testimonials, processSteps, blogPosts } from '../data/siteData';
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

export { default as BlogPost } from './BlogPost';

/* ---------- Cost Calculator ---------- */
// Studio benchmark calibrated for Dhaka Interior market (Engr. Aslam Sheikh):
// For 1200 sft Residential:
// - Standard: ৳ 9 Lac to 13 Lac (~৳ 750 – ৳ 1,083.33 / sft)
// - Premium:  ৳ 13 Lac to 25 Lac (~৳ 1,083.33 – ৳ 2,083.33 / sft)
// - Luxury:   ৳ 20 Lac to 45 Lac (~৳ 1,666.67 – ৳ 3,750 / sft)

const spaceTypes = [
  { id: 'residential', label: 'Residential', mult: 1.0, icon: Home, hint: 'Apartments & Duplexes' },
  { id: 'commercial', label: 'Commercial & Office', mult: 1.2, icon: Building2, hint: 'Offices, Retail & Showrooms' },
  { id: 'booth', label: 'Exhibition Booth', mult: 1.45, icon: Layers, hint: 'Trade Fair Stalls & Expos' },
];

const packages = [
  {
    id: 'basic',
    label: 'Standard',
    rateLabel: '৳ 750 – 1,080 / sft',
    minRate: 750,
    maxRate: 1083.333,
    desc: 'Quality HPL board, clean electrical fit-out & commercial hardware',
  },
  {
    id: 'premium',
    label: 'Premium',
    rateLabel: '৳ 1,080 – 2,080 / sft',
    minRate: 1083.333,
    maxRate: 2083.333,
    desc: 'High-gloss acrylic, natural teak/oak veneer & warm cove lighting',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    rateLabel: '৳ 1,670 – 3,750 / sft',
    minRate: 1666.667,
    maxRate: 3750,
    desc: 'Italian marble, acoustic paneling, smart dimming & bespoke millwork',
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
                    <div className="pkg-title-row">
                      <strong>{p.label}</strong>
                      <span className="pkg-rate-badge">{p.rateLabel}</span>
                    </div>
                    <p className="pkg-desc">{p.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean, Decongested Calculation Result Sidebar */}
          <aside className="calc-result" id="calc-result-box">
            <div className="calc-res-header">
              <Sparkles size={16} />
              <span>ESTIMATED BUDGET</span>
            </div>

            <motion.div
              key={`${minBudget}-${maxBudget}`}
              initial={{ scale: 0.97, opacity: 0.85 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="calc-res-pricing"
            >
              <div className="calc-lakh-chip">{summaryLakh}</div>
              <div className="calc-exact-bdt">{summaryBDT}</div>
              <div className="calc-rate-sub">
                Effective ৳ {Math.round(minBudget / area).toLocaleString()} – ৳ {Math.round(maxBudget / area).toLocaleString()} / sq ft
              </div>
            </motion.div>

            {/* Clean Spec Summary */}
            <div className="calc-selected-summary">
              <span className="calc-summary-pill">{selectedSpace.label}</span>
              <span className="calc-summary-pill">{area.toLocaleString()} sq ft</span>
              <span className="calc-summary-pill">{selectedPkg.label} Tier</span>
            </div>

            <div className="calc-action-group">
              <a
                href={`https://wa.me/8801768436319?text=${encodeURIComponent(
                  `Hello Brown's Interior! I estimated a budget of ${summaryBDT} (${summaryLakh}) for my ${area} sq ft ${selectedSpace.label} (${selectedPkg.label} tier) on your website. I'd like to consult with Engr. Aslam.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="calc-btn-whatsapp"
                id="calc-whatsapp-btn"
              >
                <FaWhatsapp size={18} />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                to={`/contact?category=${encodeURIComponent(selectedSpace.label)}&area=${area}&budget=${encodeURIComponent(
                  `${summaryBDT} (${summaryLakh})`
                )}`}
                className="calc-btn-quote"
                id="calc-get-quote"
              >
                <span>Book Site Visit & BOQ</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <p className="calc-res-note">
              Turnkey estimate based on Dhaka market standards. Includes layout design, custom woodwork fabrication & complete handover.
            </p>
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
            <span>View Estimate</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Clean Reassuring Trust Strip */}
        <div className="container" style={{ marginTop: '3.5rem' }}>
          <div className="calc-trust-strip">
            <div className="calc-trust-item">
              <CheckCircle2 size={18} />
              <span>Turnkey Execution in Dhaka</span>
            </div>
            <div className="calc-trust-item">
              <CheckCircle2 size={18} />
              <span>Transparent Itemized BOQ</span>
            </div>
            <div className="calc-trust-item">
              <CheckCircle2 size={18} />
              <span>In-House Carpentry Workshop</span>
            </div>
            <div className="calc-trust-item">
              <CheckCircle2 size={18} />
              <span>1-Year Craftsmanship Support</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
