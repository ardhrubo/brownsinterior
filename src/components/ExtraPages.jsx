import { SITE_URL } from '../lib/site-url';
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Quote, UserRound, ArrowRight, CheckCircle2, Sparkles, Home, Building2, Layers,
  Briefcase, MapPin, Clock, Send, Loader2, ChevronDown, GraduationCap, ShieldCheck, Compass, Mail
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SectionHead, ProcessTimeline, CostCTA, BlogCard } from './HomeSections';
import SEO from './SEO';
import { testimonials, processSteps, blogPreviews, careerPositions } from '../data/siteData';
import { submitInquiry } from '../lib/supabase';
import { useLanguage, processStepsBn } from '../context/LanguageContext';
import '../styles/site.css';
import './HomeSections.css';
import './ExtraPages.css';

const testimonialBnMap = {
  'Rafiq Ahmed': {
    role: 'ফ্ল্যাট মালিক, গুলশান',
    text: 'গুলশানের ফ্ল্যাটের জন্য নিখুঁত পরিকল্পনা, ভালো ম্যাটেরিয়াল এবং সময়মতো কাজ বুঝিয়ে দিয়েছেন।',
  },
  'Nusrat Jahan': {
    role: 'Café Owner, Dhanmondi',
    text: 'তারা আমাদের ব্র্যান্ডের আবহ চমৎকারভাবে ফুটিয়ে তুলেছেন, সিটিং লেআউট ও পরিবেশ অতিথিদের দারুণ পছন্দ হয়েছে।',
  },
  'Tanvir Hasan': {
    role: 'Marketing Manager, Expo',
    text: 'আমাদের Exhibition Booth-টি হুবহু 3D ডিজাইনের মতো করেই নিখুঁতভাবে তৈরি হয়েছে।',
  },
  'Shirin Akter': {
    role: 'বাড়ির মালিক, বসুন্ধরা',
    text: 'বাজেটের পুরো স্বচ্ছতা ছিল এবং কাজের প্রতিটি ছোট বিষয়েও দারুণ মনোযোগ দিয়েছেন।',
  },
  'Mahmud Karim': {
    role: 'Director, Corporate Office',
    text: 'ফ্লোর প্ল্যান থেকে শুরু করে কমপ্লিট Turnkey ডেলিভারি পর্যন্ত পুরো অফিসের কাজ বাজেটের মধ্যেই শেষ হয়েছে।',
  },
  'Farzana Rahman': {
    role: 'প্রবাসী ক্লায়েন্ট, UK',
    text: 'UK থেকে নিয়মিত আপডেট ও পরিষ্কার ড্রয়িংয়ের মাধ্যমে পুরো ঢাকার ফ্ল্যাটের কাজ ঝামেলামুক্তভাবে করিয়েছি।',
  },
};

export function ProcessPage() {
  const { isBn } = useLanguage();
  return (
    <main className="page-start-section">
      <SEO
        title="Our Process"
        description="Explore our proven 6-step interior and architecture process from consultation and 3D visualization to turnkey handover in Dhaka."
        canonicalPath="/process"
      />
      <div className="container" style={{ marginBottom: '1.5rem' }}>
        <SectionHead
          eyebrow={isBn ? 'আমাদের কাজের নিয়ম' : 'Proven Methodology'}
          title={isBn ? 'কাজের' : 'Our Execution'}
          script={isBn ? 'ধাপসমূহ' : 'Process'}
          as="h1"
          sub={
            isBn
              ? 'প্রথম দিন আলোচনা ও সাইট পরিদর্শন থেকে শুরু করে সম্পূর্ণ চাবি হস্তান্তর পর্যন্ত ৬টি সুশৃঙ্খল ধাপ।'
              : 'A clear, systematic 6-step journey from your first concept to final turnkey handover.'
          }
        />
      </div>
      <ProcessTimeline />
      <section className="section cream">
        <div className="container">
          <SectionHead
            eyebrow={isBn ? 'ধাপে ধাপে অগ্রগতি' : 'Step-by-Step Journey'}
            title={isBn ? 'কীভাবে কাজ' : 'What to'}
            script={isBn ? 'এগিয়ে যায়' : 'Expect'}
            sub={
              isBn
                ? 'আপনার প্রজেক্টের প্রতিটি পর্যায় আমাদের আর্কিটেক্ট ও ইঞ্জিনিয়ারদের সরাসরি তত্ত্বাবধানে সম্পন্ন হয়।'
                : 'Every phase of your project is documented, scheduled, and supervised by our engineering and design team.'
            }
          />
          <div className="timeline">
            {processSteps.map((s, k) => {
              const localized = isBn ? (processStepsBn[s.step] || s) : s;
              return (
                <motion.div
                  key={s.step}
                  className={`tl-item ${k % 2 ? 'right' : 'left'}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: k * 0.08 }}
                >
                  <span className="tl-dot">{String(k + 1).padStart(2, '0')}</span>
                  <div className="tl-card clay">
                    <div className="tl-meta-row">
                      {(localized.phase || s.phase) && <span className="tl-phase">{localized.phase || s.phase}</span>}
                      {(localized.duration || s.duration) && <span className="tl-duration">{localized.duration || s.duration}</span>}
                    </div>
                    <h3>{localized.title || s.title}</h3>
                    <p>{localized.text}</p>
                    {s.deliverables && (
                      <div className="tl-tags">
                        {s.deliverables.map((d) => (
                          <span key={d} className="tl-tag">{d}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <CostCTA />
    </main>
  );
}

export function TestimonialsPage() {
  const { isBn } = useLanguage();
  return (
    <main className="page-start-section">
      <SEO
        title="Client Reviews & Testimonials"
        description="Read genuine testimonials from apartment owners, corporate directors, and commercial clients across Dhaka who transformed their spaces with Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও."
        canonicalPath="/testimonials"
      />
      <section className="section cream" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          <SectionHead
            eyebrow={isBn ? 'ক্লায়েন্টদের অভিজ্ঞতা' : 'Client Stories'}
            title={isBn ? 'ক্লায়েন্টদের' : 'Words From Our'}
            script={isBn ? 'মতামত' : 'Clients'}
            as="h1"
            sub={
              isBn
                ? 'যাঁরা তাঁদের স্বপ্নের ঘর, অফিস ও ব্যবসা প্রতিষ্ঠানের জন্য Brown’s Interiors-এর ওপর আস্থা রেখেছেন।'
                : "Hear from homeowners, developers, and corporate executives who trusted Brown's Interiors with their spaces."
            }
          />
          <div className="grid-3" style={{ marginTop: '2.5rem' }}>
            {testimonials.map((t, k) => {
              const bnEntry = testimonialBnMap[t.name];
              return (
                <motion.div key={t.name} className="testi-card clay" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (k % 3) * 0.1 }}>
                  <Quote className="testi-quote" size={34} />
                  <div className="testi-stars">{Array.from({ length: t.rating }).map((_, s) => <Star key={s} size={15} fill="currentColor" />)}</div>
                  <p>"{isBn && bnEntry ? bnEntry.text : t.text}"</p>
                  <div className="testi-person">
                    <div className="testi-avatar" aria-hidden="true"><UserRound size={20} strokeWidth={1.8} /></div>
                    <div><strong>{t.name}</strong><span>{isBn && bnEntry ? bnEntry.role : t.role}</span></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <CostCTA />
    </main>
  );
}

export function BlogPage() {
  const { isBn } = useLanguage();

  return (
    <main className="page-start-section">
      <SEO
        title="Interior Design & Renovation Blog"
        description="Practical guides, styling tips, budget planning advice, and exhibition stall design ideas from Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও."
        canonicalPath="/blog"
      />
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <SectionHead
            eyebrow={isBn ? 'পরামর্শ ও গাইড' : 'Insights & Guides'}
            title={isBn ? 'ডিজাইন' : 'Design'}
            script={isBn ? 'ব্লগ' : 'Journal'}
            as="h1"
            sub={
              isBn
                ? 'ফ্ল্যাট বা অফিস সাজানোর পরামর্শ, বাজেট পরিকল্পনা এবং আমাদের কাজের পদ্ধতি নিয়ে প্রশ্নোত্তর ও গাইড।'
                : "Design ideas, renovation guides, budget planning tips, and trends from the Brown's Interiors team."
            }
          />
          <div className="grid-3" style={{ marginTop: '2.5rem' }}>
            {blogPreviews.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
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
  {
    id: 'residential',
    label: 'Residential',
    mult: 1.0,
    icon: Home,
    hint: 'Apartments & Duplexes',
    bnHint: 'ফ্ল্যাট, বাসা ও ডুপ্লেক্স',
  },
  {
    id: 'commercial',
    label: 'Commercial & Office',
    mult: 1.2,
    icon: Building2,
    hint: 'Offices, Retail & Showrooms',
    bnHint: 'অফিস, শোরুম ও রেস্তোরাঁ',
  },
  {
    id: 'booth',
    label: 'Exhibition Booth',
    mult: 1.45,
    icon: Layers,
    hint: 'Trade Fair Stalls & Expos',
    bnHint: 'ট্রেড ফেয়ার ও এক্সপো স্টল',
  },
];

const packages = [
  {
    id: 'basic',
    label: 'Standard',
    rateLabel: '৳ 750 – 1,080 / sft',
    minRate: 750,
    maxRate: 1083.333,
    desc: 'Quality HPL board, clean electrical fit-out & commercial hardware',
    bnDesc: 'মানসম্মত HPL বোর্ড, ইলেকট্রিক্যাল কাজ ও টেকসই হার্ডওয়্যার',
  },
  {
    id: 'premium',
    label: 'Premium',
    rateLabel: '৳ 1,080 – 2,080 / sft',
    minRate: 1083.333,
    maxRate: 2083.333,
    desc: 'High-gloss acrylic, natural teak/oak veneer & warm cove lighting',
    bnDesc: 'হাই-গ্লস অ্যাক্রিলিক, ন্যাচারাল ভিনিয়ার ও ওয়ার্ম কোভ লাইটিং',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    rateLabel: '৳ 1,670 – 3,750 / sft',
    minRate: 1666.667,
    maxRate: 3750,
    desc: 'Italian marble, acoustic paneling, smart dimming & bespoke millwork',
    bnDesc: 'ইতালিয়ান মার্বেল, অ্যাকোস্টিক প্যানেলিং, স্মার্ট লাইটিং ও কাস্টম ডিজাইন',
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
  const { isBn } = useLanguage();

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
        title="Interior Design Cost Calculator"
        description="Estimate residential, commercial, and exhibition booth interior design costs instantly with our transparent budget calculator."
        canonicalPath="/cost-estimator"
      />
      <div className="container" style={{ marginBottom: '1.5rem' }}>
        <SectionHead
          eyebrow={isBn ? 'বাজেট ক্যালকুলেটর' : 'Instant Budget Calculator'}
          title={isBn ? 'সম্ভাব্য খরচ' : 'Estimate'}
          script={isBn ? 'হিসাব করুন' : 'Your Space'}
          as="h1"
          sub={
            isBn
              ? 'ঢাকার আবাসিক ফ্ল্যাট, অফিস ও এক্সিবিশন বুথের বর্তমান বাজারদর অনুযায়ী তাৎক্ষণিক সম্ভাব্য বাজেট দেখে নিন।'
              : "Instant, transparent budget calculation calibrated for Dhaka's residential and commercial interior market."
          }
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
                    <small>{isBn ? s.bnHint : s.hint}</small>
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
                    <p className="pkg-desc">{isBn ? p.bnDesc : p.desc}</p>
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

            {/* Consultant Preview */}
            <div className="calc-consultant-preview">
              <img
                src="/team/engr-aslam-sheikh.webp"
                alt="Engr. Aslam Sheikh"
                className="calc-consultant-avatar"
              />
              <div className="calc-consultant-meta">
                <span className="calc-consultant-lead">Direct Consultation</span>
                <strong>Engr. Aslam Sheikh</strong>
                <small>B.Sc. Civil Engg. · IEB A29734</small>
              </div>
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
                <span>{isBn ? 'WhatsApp-এ কথা বলুন' : 'Chat on WhatsApp'}</span>
              </a>

              <Link
                to={`/contact?category=${encodeURIComponent(selectedSpace.label)}&area=${area}&budget=${encodeURIComponent(
                  `${summaryBDT} (${summaryLakh})`
                )}`}
                className="calc-btn-quote"
                id="calc-get-quote"
              >
                <span>{isBn ? 'সাইট ভিজিট ও BOQ বুক করুন' : 'Book Site Visit & BOQ'}</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <p className="calc-res-note">
              {isBn
                ? 'ঢাকার বর্তমান বাজারদর অনুযায়ী আনুমানিক টার্নকি হিসাব। এর মধ্যে লেআউট ডিজাইন, কাস্টম ফার্নিচার ও সম্পূর্ণ ফিনিশিং অন্তর্ভুক্ত।'
                : 'Turnkey estimate based on Dhaka market standards. Includes layout design, custom woodwork fabrication & complete handover.'}
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

/* ---------- Careers Page ---------- */
const careerPerks = [
  {
    icon: Compass,
    title: 'Concept-to-Turnkey',
    desc: 'Take projects from 3D concept to real-world execution.',
  },
  {
    icon: ShieldCheck,
    title: 'Design & Engineering',
    desc: 'Work alongside IEB-certified engineers and architects.',
  },
  {
    icon: Sparkles,
    title: 'Pay & Incentives',
    desc: 'Competitive salary with project handover bonuses.',
  },
  {
    icon: GraduationCap,
    title: 'Mentorship & Growth',
    desc: 'Hands-on studio and site training in Uttara, Dhaka.',
  },
];

export function CareersPage() {
  const [expandedJob, setExpandedJob] = useState(null);
  const [activeDept, setActiveDept] = useState('All');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    position: careerPositions[0]?.title || 'Senior Interior Designer & 3D Visualizer',
    experience: '2 – 4 Years',
    portfolio: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const departments = ['All', ...new Set(careerPositions.map((p) => p.department))];
  const filteredJobs = activeDept === 'All'
    ? careerPositions
    : careerPositions.filter((p) => p.department === activeDept);

  const careerSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': careerPositions.map((job) => ({
        '@type': 'JobPosting',
        title: job.title,
        description: `${job.summary} Responsibilities: ${job.responsibilities.join(' ')} Requirements: ${job.requirements.join(' ')}`,
        datePosted: '2026-11-01',
        employmentType: job.type.includes('Intern') ? 'INTERN' : 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: "Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও",
          sameAs: SITE_URL,
          logo: `${SITE_URL}/logo.svg`,
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Uttara',
            addressLocality: 'Dhaka',
            postalCode: '1230',
            addressCountry: 'BD',
          },
        },
      })),
    }),
    []
  );

  const handleSelectRole = (roleTitle) => {
    setForm((prev) => ({ ...prev, position: roleTitle }));
    const el = document.getElementById('career-apply-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const formattedMessage = [
        `[CAREER APPLICATION]`,
        `Position: ${form.position}`,
        `Experience: ${form.experience}`,
        form.portfolio ? `Portfolio / CV Link: ${form.portfolio}` : 'Portfolio / CV Link: Will share via WhatsApp/Email',
        form.message ? `Candidate Note: ${form.message}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      const result = await submitInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: 'Uttara / Dhaka (Career Applicant)',
        service_category: 'Career Application',
        sub_service: form.position,
        estimated_budget: form.experience,
        message: formattedMessage,
      });

      setSubmittedResult({ ...result, applicant: { ...form } });
    } catch {
      setErrorMsg('Could not submit your application right now. Please send your CV directly via WhatsApp or Email below.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-start-section career-page">
      <SEO
        title="Careers"
        description="Join Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও in Uttara, Dhaka. Explore open career opportunities for Interior Designers, 3D Visualizers, Project Architects, Site Engineers, and Interns."
        keywords="Interior Design Jobs Dhaka, Architect Jobs Bangladesh, Civil Engineer Jobs Dhaka, 3D Visualizer Jobs, Brown's Interiors Careers"
        canonicalPath="/careers"
        schema={careerSchema}
      />

      {/* Hero Header */}
      <section className="career-hero-section">
        <div className="container">
          <SectionHead
            eyebrow="Join Our Studio"
            title="Build Your"
            script="Career With Us"
            as="h1"
            sub="Join our architects, interior designers, 3D visualizers, and site engineers in Uttara, Dhaka."
          />

          <div className="career-hero-pills">
            <span className="career-pill">
              <MapPin size={14} /> Uttara, Dhaka-1230 Studio
            </span>
            <span className="career-pill">
              <Briefcase size={14} /> {careerPositions.length} Open Positions
            </span>
          </div>
        </div>
      </section>

      {/* Why Join Brown's Interiors */}
      <section className="section cream career-culture-section">
        <div className="container">
          <SectionHead
            eyebrow="Studio Culture"
            title="Why Join"
            script="Brown's Interiors"
          />

          <div className="career-perks-grid">
            {careerPerks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  className="career-perk-card clay"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                >
                  <div className="career-perk-icon">
                    <Icon size={22} strokeWidth={1.7} />
                  </div>
                  <h3>{perk.title}</h3>
                  <p>{perk.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section career-jobs-section" id="open-positions">
        <div className="container">
          <SectionHead
            eyebrow="Current Openings"
            title="Open"
            script="Positions"
          />

          {/* Department Filter Tabs */}
          <div className="proj-tabs career-dept-tabs">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                className={activeDept === dept ? 'active' : ''}
                onClick={() => setActiveDept(dept)}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="career-jobs-list">
            {filteredJobs.map((job, idx) => {
              const isOpen = expandedJob === job.id;
              return (
                <motion.article
                  key={job.id}
                  className={`career-job-card clay ${isOpen ? 'expanded' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <div
                    className="career-job-header"
                    onClick={() => setExpandedJob(isOpen ? null : job.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedJob(isOpen ? null : job.id);
                      }
                    }}
                  >
                    <div className="career-job-title-block">
                      <div className="career-job-badges">
                        <span className="career-badge dept">{job.department}</span>
                        <span className="career-badge type">{job.type}</span>
                        <span className="career-badge exp">
                          <Clock size={12} /> {job.experience}
                        </span>
                      </div>
                      <h2>{job.title}</h2>
                    </div>

                    <div className="career-job-header-actions">
                      <button
                        type="button"
                        className="pill-btn dark career-quick-apply-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectRole(job.title);
                        }}
                      >
                        <span>Apply Now</span>
                        <ArrowRight size={14} />
                      </button>
                      <span className={`career-expand-icon ${isOpen ? 'open' : ''}`} aria-hidden="true">
                        <ChevronDown size={20} />
                      </span>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="career-job-details">
                      <div className="career-job-summary-row">
                        <p>{job.summary}</p>
                      </div>
                      <div className="career-job-cols">
                        <div className="career-job-col">
                          <h4>Key Responsibilities</h4>
                          <ul>
                            {job.responsibilities.map((item) => (
                              <li key={item}>
                                <CheckCircle2 size={15} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="career-job-col">
                          <h4>Requirements &amp; Qualifications</h4>
                          <ul>
                            {job.requirements.map((req) => (
                              <li key={req}>
                                <CheckCircle2 size={15} />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="career-job-footer">
                        <div className="career-comp-tag">
                          <strong>Compensation:</strong> <span>{job.compensation}</span>
                        </div>
                        <div className="career-job-cta-group">
                          <button
                            type="button"
                            className="pill-btn dark"
                            onClick={() => handleSelectRole(job.title)}
                          >
                            <Send size={14} />
                            <span>Apply Online for This Role</span>
                          </button>
                          <a
                            href={`https://wa.me/8801768436319?text=${encodeURIComponent(
                              `Hello Brown's Interiors! I would like to apply for the "${job.title}" position at your Uttara, Dhaka studio.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="pill-btn outline"
                          >
                            <FaWhatsapp size={16} />
                            <span>Send CV on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="section cream career-apply-section" id="career-apply-form">
        <div className="container">
          <div className="career-apply-grid">
            <div className="career-apply-info">
              <span className="sec-eyebrow">Submit Your Application</span>
              <h2>Apply Online</h2>
              <p className="career-apply-bn-lead">
                Share your details &amp; portfolio link, or send your CV via WhatsApp or email.
              </p>

              <div className="career-direct-channels clay">
                <h4>Direct HR &amp; Studio Contact</h4>
                <a
                  href="mailto:info@brownsinterior.com?subject=Job%20Application%20-%20Brown's%20Interiors"
                  className="career-channel-item"
                >
                  <Mail size={18} />
                  <div>
                    <strong>Email Your CV &amp; Portfolio</strong>
                    <span>info@brownsinterior.com</span>
                  </div>
                </a>
                <a
                  href="https://wa.me/8801768436319?text=Hello%20Brown's%20Interiors%2C%20I%20would%20like%20to%20share%20my%20CV%20and%20Portfolio%20for%20a%20career%20opportunity."
                  target="_blank"
                  rel="noreferrer"
                  className="career-channel-item"
                >
                  <FaWhatsapp size={18} />
                  <div>
                    <strong>WhatsApp HR Desk</strong>
                    <span>+880 1768-436319</span>
                  </div>
                </a>
                <div className="career-channel-item">
                  <MapPin size={18} />
                  <div>
                    <strong>Studio Location</strong>
                    <span>Uttara, Dhaka-1230, Bangladesh</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="career-apply-form-card clay">
              {submittedResult ? (
                <div className="career-apply-success">
                  <div className="career-success-icon">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3>Application Received, {submittedResult.applicant.name}!</h3>
                  <p>
                    Thank you for applying for <strong>{submittedResult.applicant.position}</strong>. Our team will review your profile and reach out to you.
                  </p>
                  <div className="career-success-actions">
                    <a
                      href={`https://wa.me/8801768436319?text=${encodeURIComponent(
                        `Hello Brown's Interiors! I just submitted my online application for "${submittedResult.applicant.position}". Name: ${submittedResult.applicant.name}, Phone: ${submittedResult.applicant.phone}, Experience: ${submittedResult.applicant.experience}. Here is my CV/Portfolio:`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="pill-btn dark"
                    >
                      <FaWhatsapp size={16} />
                      <span>Send PDF CV on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      className="pill-btn outline"
                      onClick={() => setSubmittedResult(null)}
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="career-form">
                  <h3>Candidate Application Form</h3>
                  <p className="career-form-sub">
                    Complete the required (*) fields below and include a link to your CV or design portfolio.
                  </p>

                  {errorMsg && <div className="career-form-error" role="alert">{errorMsg}</div>}

                  <div className="career-form-row">
                    <div className="career-field">
                      <label htmlFor="car-name">Full Name *</label>
                      <input
                        id="car-name"
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Ar. Tanvir Hasan"
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="car-phone">Phone / WhatsApp *</label>
                      <input
                        id="car-phone"
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+880 17XX-XXXXXX"
                      />
                    </div>
                  </div>

                  <div className="career-form-row">
                    <div className="career-field">
                      <label htmlFor="car-email">Email Address *</label>
                      <input
                        id="car-email"
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="car-exp">Experience *</label>
                      <select
                        id="car-exp"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                      >
                        <option value="Fresh Graduate / Intern">Fresh Graduate / Intern</option>
                        <option value="1 – 2 Years">1 – 2 Years</option>
                        <option value="2 – 4 Years">2 – 4 Years</option>
                        <option value="4 – 7 Years">4 – 7 Years</option>
                        <option value="7+ Years">7+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div className="career-field">
                    <label htmlFor="car-pos">Position Applying For *</label>
                    <select
                      id="car-pos"
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                    >
                      {careerPositions.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                      <option value="General / Open Application (Spontaneous CV)">
                        General / Open Application
                      </option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="car-portfolio">
                      Portfolio / CV Link (Google Drive, Behance, LinkedIn)
                    </label>
                    <input
                      id="car-portfolio"
                      type="url"
                      name="portfolio"
                      value={form.portfolio}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/... or https://behance.net/..."
                    />
                  </div>

                  <div className="career-field">
                    <label htmlFor="car-msg">
                      Key Software Skills &amp; Short Cover Note
                    </label>
                    <textarea
                      id="car-msg"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Mention your proficiency in 3ds Max, V-Ray/Corona, AutoCAD, SketchUp, BOQ, or site supervision experience..."
                    />
                  </div>

                  <button type="submit" className="pill-btn dark career-submit-btn" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="spin-icon" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
