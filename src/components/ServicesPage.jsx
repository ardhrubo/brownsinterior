import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calculator,
  Phone,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Layers,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { SectionHead } from './HomeSections';
import { useLanguage, serviceCategoryBn, serviceOptionBn } from '../context/LanguageContext';
import SEO from './SEO';
import './ServicesPage.css';

const processWorkflow = [
  {
    step: '01',
    title: 'Consultation & Site Survey',
    bnTitle: 'আলোচনা ও সাইট সার্ভে',
    desc: 'Laser measurements, structural assessment, and deep discovery of your lifestyle or business vision.',
    bnDesc: 'সরাসরি সাইট ভিজিট করে নিখুঁত মাপ নেওয়া, কাঠামোগত অবস্থা যাচাই এবং আপনার চাহিদা ও বাজেট বুঝে নেওয়া।',
  },
  {
    step: '02',
    title: '2D & Photorealistic 3D',
    bnTitle: '2D লেআউট ও ফটোরিয়েলিস্টিক 3D',
    desc: 'Functional space zoning, CAD blueprints, and photorealistic 3D visualizations before anything is built.',
    bnDesc: 'কাজ শুরুর আগেই কার্যকর 2D AutoCAD লেআউট ও বাস্তবসম্মত 3D ভিউয়ের মাধ্যমে চূড়ান্ত ডিজাইন দেখানো।',
  },
  {
    step: '03',
    title: 'Itemized BOQ Costing',
    bnTitle: 'বিস্তারিত লিখিত BOQ বাজেট',
    desc: 'Transparent Bill of Quantities with specified material brands, grades, and milestone timelines.',
    bnDesc: 'প্রতিটি ম্যাটেরিয়ালের ব্র্যান্ড, গ্রেড ও কাজের সময়সীমাসহ স্পষ্ট লিখিত বাজেট (BOQ) প্রদান।',
  },
  {
    step: '04',
    title: 'Turnkey Handover & Warranty',
    bnTitle: 'টার্নকি হস্তান্তর ও ওয়ারেন্টি',
    desc: 'Daily engineer supervision, master craftsmanship, deep cleaning, and 1-year workmanship warranty.',
    bnDesc: 'প্রতিদিন ইঞ্জিনিয়ারদের তত্ত্বাবধানে কাজ শেষ করে ক্লিনিং ও ১ বছরের সার্ভিস ওয়ারেন্টিসহ প্রজেক্ট বুঝিয়ে দেওয়া।',
  },
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { isBn } = useLanguage();

  const filteredServices = useMemo(() => {
    if (activeFilter === 'all') return servicesData;
    return servicesData.filter((s) => s.slug === activeFilter);
  }, [activeFilter]);

  return (
    <main className="sp-page">
      <SEO
        title="Our Services"
        description="Explore interior design, architectural planning, structural engineering, renovation, and trade show booth solutions by Brown's Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও in Dhaka."
        canonicalPath="/services"
      />

      {/* Services Intro Headline Section */}
      <section className="sp-intro-section page-start-section">
        <div className="container">
          <div className="sp-intro-grid">
          <div className="sp-intro-copy">
          <SectionHead
            eyebrow={isBn ? 'সার্ভিস ও সমাধান' : 'Disciplines & Solutions'}
            title={isBn ? 'আমাদের' : 'Our'}
            script={isBn ? 'সার্ভিসসমূহ' : 'Services'}
            as="h1"
            sub={
              isBn
                ? 'ঢাকা ও সারা বাংলাদেশে আবাসিক, কমার্শিয়াল ও এক্সিবিশন প্রজেক্টের জন্য সম্পূর্ণ আর্কিটেকচার, ইন্টেরিয়র এবং টার্নকি ইঞ্জিনিয়ারিং সমাধান।'
                : 'Holistic architecture, interior design, and turnkey engineering solutions crafted for residential, commercial, and exhibition spaces in Dhaka.'
            }
          />
          <a href="#service-disciplines" className="sp-intro-link">
            {isBn ? 'সার্ভিসগুলো দেখুন' : 'Explore our services'} <ArrowRight size={16} />
          </a>
          </div>
          <div className="sp-intro-media">
            <img src={servicesData[0].image} alt={isBn ? "আমাদের ইন্টেরিয়র ডিজাইন প্রজেক্ট" : "Interior design by Brown’s Interiors"} width="960" height="640" loading="eager" decoding="async" />
          </div>
          </div>
        </div>
      </section>

      {/* Disciplines Filter Bar */}
      <section className="sp-filter-section">
        <div className="container">
          <div className="sp-metrics-row">
            <span className="sp-metric-pill">
              <Layers size={14} className="sp-gold-icon" /> 7 Core Disciplines
            </span>
            <span className="sp-metric-pill">
              <Layers size={14} className="sp-gold-icon" /> 30+ Turnkey Specializations
            </span>
            <span className="sp-metric-pill">
              <ShieldCheck size={14} className="sp-gold-icon" /> 100% In-House Supervision
            </span>
          </div>

          <div id="service-disciplines" className="sp-filter-bar" role="group" aria-label={isBn ? "সার্ভিস বাছাই করুন" : "Filter services"}>
            <button
              type="button"
              className={`sp-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
              aria-pressed={activeFilter === 'all'}
            >
              {isBn ? 'সব সার্ভিস' : 'All Disciplines'}
            </button>
            {servicesData.map((s) => (
              <button
                key={s.slug}
                type="button"
                className={`sp-filter-btn ${activeFilter === s.slug ? 'active' : ''}`}
                onClick={() => setActiveFilter(s.slug)}
                aria-pressed={activeFilter === s.slug}
              >
                {isBn ? (serviceCategoryBn[s.slug]?.shortTitle || s.shortTitle || s.title) : (s.shortTitle || s.title)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section sp-grid-section">
        <div className="container">
          <motion.div layout className="sp-options-grid">
            <AnimatePresence>
              {filteredServices.map((s, i) => {
                const Icon = s.icon;
                const timelineSpec = s.specs?.find((sp) => sp.label === 'Timeline')?.value;
                const scopeSpec = s.specs?.find((sp) => sp.label === 'Scope' || sp.label === 'Compliance')?.value;
                const catBn = serviceCategoryBn[s.slug];
                const catTitle = isBn ? (catBn?.title || s.title) : s.title;
                const catDesc = isBn ? (catBn?.shortDesc || s.tagline || s.description) : (s.tagline || s.description);

                return (
                  <motion.article
                    layout
                    key={s.slug}
                    className="sp-option-card"
                    id={`service-opt-${s.slug}`}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                  >
                    {/* Media Header */}
                    <Link to={`/services/${s.slug}`} className="sp-option-media" aria-label={catTitle}>
                      <img src={s.image} alt={catTitle} loading="lazy" decoding="async" />
                      <div className="sp-option-shade" />
                      <span className="sp-option-num">{s.number}</span>
                      <div className="sp-option-icon">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                      {timelineSpec && (
                        <span className="sp-media-tag">
                          <Clock size={12} /> {timelineSpec}
                        </span>
                      )}
                    </Link>

                    {/* Card Body */}
                    <div className="sp-option-body">
                      <div className="sp-title-row">
                        <h2>
                          <Link to={`/services/${s.slug}`}>{catTitle}</Link>
                        </h2>
                      </div>

                      <p className="sp-option-tagline">{catDesc}</p>

                      {/* Specs Row */}
                      {scopeSpec && (
                        <div className="sp-scope-row">
                          <span className="sp-scope-label">Focus:</span>
                          <span className="sp-scope-val">{scopeSpec}</span>
                        </div>
                      )}

                      {/* Sub-services Interactive Chips */}
                      <div className="sp-sub-chips-wrap">
                        <span className="sp-chips-label">Key Specializations:</span>
                        <div className="sp-sub-chips">
                          {s.options.map((opt) => (
                            <Link
                              key={opt.slug}
                              to={`/services/${opt.slug}`}
                              className="sp-sub-chip"
                              title={`Explore ${opt.title}`}
                            >
                              <span>{isBn ? (serviceOptionBn[opt.slug] || opt.title) : opt.title}</span>
                              <ArrowUpRight size={12} className="sp-chip-arrow" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="sp-option-footer">
                        <span className="sp-option-count">
                          {s.options.length} {s.options.length === 1 ? 'Specialization' : 'Specializations'}
                        </span>
                        <Link to={`/services/${s.slug}`} className="sp-option-Action">
                          {isBn ? 'বিস্তারিত দেখুন' : 'Explore Category'} <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Turnkey Philosophy Spotlight Section */}
      <section className="sp-spotlight-section">
        <div className="container">
          <div className="sp-spotlight-grid">
            <div className="sp-spotlight-content">
              <span className="sp-spotlight-eyebrow">The Brown&apos;s Interior Standard</span>
              <h2>{isBn ? 'কেন আলাদা মিস্ত্রির চেয়ে কমপ্লিট Turnkey সার্ভিস সেরা?' : 'Why Turnkey Delivery Beats Fragmented Contractors'}</h2>
              <p>
                {isBn
                  ? 'আলাদা আর্কিটেক্ট, মিস্ত্রি, ইলেকট্রিশিয়ান ও পেইন্টার দিয়ে কাজ করালে প্রায়ই খরচ বেড়ে যায় এবং কাজের সমন্বয়হীনতা দেখা দেয়। Brown’s Interior-এ ডিজাইন থেকে হ্যান্ডওভার সবকিছু হয় নিজস্ব ইঞ্জিনিয়ারিং টিমের অধীনে।'
                  : 'Managing separate architects, carpenters, electricians, and painters often leads to budget overruns, blame-shifting, and delayed deadlines. At Brown’s Interior, every phase is engineered and built in-house.'}
              </p>

              <div className="sp-spotlight-perks">
                <div className="sp-perk-item">
                  <CheckCircle2 size={18} className="sp-perk-icon" />
                  <div>
                    <strong>Single-Source Accountability</strong>
                    <span>
                      {isBn
                        ? 'একজন নির্দিষ্ট প্রজেক্ট ম্যানেজার ও ইঞ্জিনিয়ার পুরো কাজ শুরু থেকে শেষ পর্যন্ত তদারকি করেন।'
                        : 'One dedicated project manager and engineer handles the entire lifecycle.'}
                    </span>
                  </div>
                </div>
                <div className="sp-perk-item">
                  <CheckCircle2 size={18} className="sp-perk-icon" />
                  <div>
                    <strong>Transparent BOQ &amp; Cost Control</strong>
                    <span>
                      {isBn
                        ? 'কাজের মাঝপথে কোনো লুকানো খরচ নেই। প্রতিটি বোর্ড, হার্ডওয়্যার ও লাইটের দাম আগেই লিখিত থাকে।'
                        : 'No mid-project surprises. Every screw, board, and light fixture is itemized upfront.'}
                    </span>
                  </div>
                </div>
                <div className="sp-perk-item">
                  <CheckCircle2 size={18} className="sp-perk-icon" />
                  <div>
                    <strong>Permanent In-House Master Artisans</strong>
                    <span>
                      {isBn
                        ? '১০+ বছরের অভিজ্ঞতা সম্পন্ন নিজস্ব কার্পেন্ট্রি, গ্লাস, ইলেকট্রিক্যাল ও পলিশ মিস্ত্রি দল।'
                        : 'Dedicated carpentry, glazing, electrical, and polish craftsmen with 10+ years experience.'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sp-spotlight-btns">
                <Link to="/contact" className="pill-btn dark">
                  {isBn ? 'ফ্রি পরামর্শ নিন' : 'Book Free Consultation'} <ArrowRight size={15} />
                </Link>
                <Link to="/cost-estimator" className="pill-btn">
                  <Calculator size={15} /> {isBn ? 'খরচ হিসাব করুন' : 'Calculate Budget'}
                </Link>
              </div>
            </div>

            <div className="sp-spotlight-visual">
              <div className="sp-visual-card clay">
                <img
                  src="/portfolio/residential/living-marble-luxury-hall.webp"
                  alt="Turnkey Interior Execution by Brown's Interior"
                  loading="lazy"
                />
                <div className="sp-visual-badge">
                  <Compass size={20} />
                  <div>
                    <strong>10+ Years Experience</strong>
                    <span>250+ Successful Turnkey Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Roadmap */}
      <section className="section cream sp-process-section">
        <div className="container">
          <div className="sp-section-head">
            <span className="sp-eyebrow">Structured Execution</span>
            <h3>{isBn ? 'কীভাবে আপনার প্রজেক্ট সম্পন্ন হয়' : 'How Your Project Unfolds'}</h3>
            <p>
              {isBn
                ? 'প্রথম দিন সাইট সার্ভে থেকে শুরু করে চূড়ান্ত চাবি হস্তান্তর পর্যন্ত প্রতিটি ধাপ।'
                : 'From the initial laser site measurement to the final handover inspection.'}
            </p>
          </div>

          <div className="sp-workflow-grid">
            {processWorkflow.map((item) => (
              <div key={item.step} className="sp-workflow-step clay">
                <span className="sp-workflow-num">{item.step}</span>
                <h4>{isBn ? item.bnTitle : item.title}</h4>
                <p>{isBn ? item.bnDesc : item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="sp-banner">
        <div className="container sp-banner-inner">
          <div>
            <h2>{isBn ? 'আপনার ঘর বা অফিস সাজাতে প্রস্তুত?' : 'Ready to transform your space?'}</h2>
            <p>
              {isBn
                ? 'ইঞ্জিনিয়ার আসলাম শেখ ও আমাদের আর্কিটেকচারাল টিমের সাথে পরামর্শ করুন।'
                : 'Speak with Engr. Aslam Sheikh and our architectural team for a tailored proposal.'}
            </p>
          </div>
          <div className="sp-banner-btns">
            <Link to="/cost-estimator" className="pill-btn outline" id="services-calc-cta">
              <Calculator size={16} /> {isBn ? 'খরচ হিসাব করুন' : 'Estimate Cost'}
            </Link>
            <Link to="/contact" className="pill-btn" id="services-contact-cta">
              <Phone size={16} /> {isBn ? 'ফ্রি পরামর্শ নিন' : 'Free Consultation'} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
