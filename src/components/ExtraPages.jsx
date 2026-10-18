import React, { useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft, Calculator, Phone, UserRound, Mail, MapPin, Clock, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { PageHero, SectionHead, ProcessTimeline, CostCTA, BlogCard } from './HomeSections';
import SEO from './SEO';
import NotFound from './NotFound';
import { testimonials, processSteps, blogPosts } from '../data/siteData';
import { NOTIFICATION_EMAIL } from '../lib/supabase';
import '../styles/site.css';
import './HomeSections.css';
import './ExtraPages.css';

export function ProcessPage() {
  return (
    <main>
      <SEO
        title="Our Process - 6-Step Interior Design & Execution Journey"
        description="Explore our proven 6-step interior and architecture process from consultation and 3D visualization to turnkey handover in Dhaka."
        canonicalPath="/process"
      />
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
    <main>
      <SEO
        title="Client Reviews & Testimonials - Brown's Interior"
        description="Read genuine testimonials from apartment owners, corporate directors, and commercial clients across Dhaka who transformed their spaces with Brown's Interior."
        canonicalPath="/testimonials"
      />
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
      <SEO
        title="Interior Design & Renovation Blog"
        description="Practical guides, styling tips, budget planning advice, and exhibition stall design ideas from the Brown's Interior design studio."
        canonicalPath="/blog"
      />
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
  if (!post) return <NotFound message="The requested blog article could not be found." />;
  const others = blogPosts.filter((p) => p.slug !== slug);
  return (
    <main>
      <SEO
        title={`${post.title} - Blog`}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        image={post.image}
        type="article"
      />
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
// Studio benchmark calibrated for Dhaka Interior market (Engr. Aslam Sheikh):
// For 1200 sft Residential:
// - Standard: ৳ 9 Lac to 13 Lac (~৳ 750 – ৳ 1,083.33 / sft)
// - Premium:  ৳ 13 Lac to 25 Lac (~৳ 1,083.33 – ৳ 2,083.33 / sft)
// - Luxury:   ৳ 20 Lac to 45 Lac (~৳ 1,666.67 – ৳ 3,750 / sft)

const spaceTypes = [
  { id: 'residential', label: 'Residential Interior', mult: 1.0 },
  { id: 'commercial', label: 'Commercial Interior', mult: 1.2 },
  { id: 'office', label: 'Office & Retail Interior', mult: 1.15 },
  { id: 'booth', label: 'Exhibition Stall & Booth', mult: 1.45 },
];

const packages = [
  {
    id: 'basic',
    label: 'Standard',
    minRate: 750,
    maxRate: 1083.333,
    benchmark: '৳ 9 – 13 Lac (1200 sft)',
    desc: 'Functional essentials, HPL board & quality turnkey hardware',
  },
  {
    id: 'premium',
    label: 'Premium',
    minRate: 1083.333,
    maxRate: 2083.333,
    benchmark: '৳ 13 – 25 Lac (1200 sft)',
    desc: 'Designer woodwork, bespoke acrylic/veneer & ambient lighting',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    minRate: 1666.667,
    maxRate: 3750,
    benchmark: '৳ 20 – 45 Lac (1200 sft)',
    desc: 'Signature bespoke interiors, imported marble, acoustic panels & smart automation',
  },
];

const extras = [
  { id: 'lighting', label: 'Custom Architectural Lighting & False Ceiling', rate: 60 },
  { id: 'furniture', label: 'Bespoke Loose & Built-in Furniture Set', rate: 200 },
  { id: 'mep', label: 'Complete MEP (Sanitary, HVAC & Electrical overhaul)', rate: 90 },
  { id: 'smartHome', label: 'Smart Home Automation & Digital Access', rate: 120 },
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
  const [sel, setSel] = useState([]);

  const selectedSpace = spaceTypes.find((s) => s.id === type) || spaceTypes[0];
  const selectedPkg = packages.find((p) => p.id === pkg) || packages[0];

  const { minBudget, maxBudget } = useMemo(() => {
    const mult = selectedSpace.mult;
    let baseMin = selectedPkg.minRate * mult * area;
    let baseMax = selectedPkg.maxRate * mult * area;

    let addOnTotal = 0;
    extras.forEach((e) => {
      if (sel.includes(e.id)) {
        addOnTotal += e.rate * area;
      }
    });

    return {
      minBudget: Math.round(baseMin + addOnTotal),
      maxBudget: Math.round(baseMax + addOnTotal),
    };
  }, [selectedSpace, selectedPkg, area, sel]);

  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const summaryLakh = `Approx. ${fmtLakh(minBudget)} – ${fmtLakh(maxBudget)} BDT`;
  const summaryBDT = `${fmtBDT(minBudget)} – ${fmtBDT(maxBudget)}`;

  return (
    <main>
      <SEO
        title="Interior Design Cost Calculator - Dhaka, Bangladesh"
        description="Estimate residential, commercial, and exhibition booth interior design costs instantly with our transparent budget calculator."
        canonicalPath="/cost-estimator"
      />
      <PageHero
        title="Estimate Cost"
        sub="Instant, transparent budget calculation calibrated for Dhaka's interior market."
        image="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2000"
      />
      <section className="section cream">
        <div className="container calc">
          <div className="calc-form clay">
            <h3>1. Type of Space</h3>
            <div className="opt-grid">
              {spaceTypes.map((s) => (
                <button
                  key={s.id}
                  id={`calc-type-${s.id}`}
                  className={`opt ${type === s.id ? 'on' : ''}`}
                  onClick={() => setType(s.id)}
                >
                  <strong>{s.label}</strong>
                </button>
              ))}
            </div>

            <h3>2. Area — <span className="calc-area">{area.toLocaleString()} sq ft</span></h3>
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
              />
              <div className="calc-area-quick">
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
                <div className="calc-num-wrap">
                  <input
                    type="number"
                    min="50"
                    value={area}
                    onChange={(e) => setArea(Math.max(0, +e.target.value))}
                    className="calc-num"
                    aria-label="Area in square feet"
                  />
                  <span>sq ft</span>
                </div>
              </div>
            </div>

            <h3>3. Finish Level</h3>
            <div className="opt-grid three">
              {packages.map((p) => (
                <button
                  key={p.id}
                  id={`calc-pkg-${p.id}`}
                  className={`opt ${pkg === p.id ? 'on' : ''}`}
                  onClick={() => setPkg(p.id)}
                >
                  <div className="opt-top">
                    <strong>{p.label}</strong>
                    <span className="opt-benchmark">{p.benchmark}</span>
                  </div>
                  <small>{p.desc}</small>
                </button>
              ))}
            </div>

            <h3>4. Optional Add-on Services</h3>
            <div className="opt-grid">
              {extras.map((e) => (
                <label key={e.id} className={`opt check ${sel.includes(e.id) ? 'on' : ''}`}>
                  <input type="checkbox" checked={sel.includes(e.id)} onChange={() => toggle(e.id)} />
                  <div>
                    <strong>{e.label}</strong>
                    <small>+ ৳ {e.rate}/sq ft</small>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <aside className="calc-result">
            <div className="calc-res-header">
              <Calculator size={28} />
              <span>ESTIMATED BUDGET RANGE</span>
            </div>

            <motion.div
              key={`${minBudget}-${maxBudget}`}
              initial={{ scale: 0.95, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="calc-res-pricing"
            >
              <div className="calc-lakh-chip">{summaryLakh}</div>
              <strong className="calc-bdt-range">{summaryBDT}</strong>
              <div className="calc-rate-sub">
                Approx. ৳ {Math.round(minBudget / area).toLocaleString()} – ৳ {Math.round(maxBudget / area).toLocaleString()} / sq ft
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

            {/* Highlighted Direct Contact Block */}
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
