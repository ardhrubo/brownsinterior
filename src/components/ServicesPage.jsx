import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Phone } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { PageHero } from './HomeSections';
import SEO from './SEO';
import './ServicesPage.css';

export default function ServicesPage() {
  return (
    <main className="sp-page">
      <SEO
        title="Our Services - Interior Design, Architecture & Turnkey Execution"
        description="Explore interior design, architectural planning, structural engineering, renovation, and trade show booth solutions by Brown's Interior in Dhaka."
        canonicalPath="/services"
      />
      <PageHero
        title="Our Services"
        sub="Select a service category to explore our specialized solutions."
        image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="section cream">
        <div className="container">
          <div className="sp-options-grid">
            {servicesData.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.slug}
                  className="sp-option-card clay"
                  id={`service-opt-${s.slug}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                >
                  <Link to={`/services/${s.slug}`} className="sp-option-media" aria-label={s.title}>
                    <img src={s.image} alt={s.title} loading="lazy" />
                    <div className="sp-option-shade" />
                    <span className="sp-option-num">{s.number}</span>
                    <div className="sp-option-icon">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                  </Link>

                  <div className="sp-option-body">
                    <h2>
                      <Link to={`/services/${s.slug}`}>{s.title}</Link>
                    </h2>

                    <ul className="sp-sub-list">
                      {s.options.map((opt) => (
                        <li key={opt.slug}>
                          <Link to={`/services/${opt.slug}`} className="sp-sub-link">
                            <span className="sp-sub-dot" />
                            <span>{opt.title}</span>
                            <ArrowRight size={13} className="sp-sub-arrow" />
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="sp-option-footer">
                      <span className="sp-option-count">{s.options.length} Services</span>
                      <Link to={`/services/${s.slug}`} className="sp-option-Action">
                        Explore <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sp-banner">
        <div className="container sp-banner-inner">
          <div>
            <h2>Need help choosing the right service?</h2>
            <p>Book a free consultation or estimate your project budget online.</p>
          </div>
          <div className="sp-banner-btns">
            <Link to="/cost-estimator" className="pill-btn glass" id="services-calc-cta">
              <Calculator size={16} /> Estimate Cost
            </Link>
            <Link to="/contact" className="pill-btn" id="services-contact-cta">
              <Phone size={16} /> Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
