import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Clock, CheckCircle2, Send, Loader2, Sparkles, AlertCircle
} from 'lucide-react';
import { PageHero, SectionHead } from './HomeSections';
import SEO from './SEO';
import { servicesData } from '../data/servicesData';
import { submitInquiry, NOTIFICATION_EMAIL } from '../lib/supabase';
import './Contact.css';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service_category: 'Interior Design',
  sub_service: '',
  location: '',
  area_sqft: '',
  estimated_budget: '',
  message: '',
};

export default function Contact({ showHero = true }) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-fill form if user came from a Service Page or the Cost Calculator
  useEffect(() => {
    const catParam = searchParams.get('category');
    const subParam = searchParams.get('service');
    const areaParam = searchParams.get('area');
    const budgetParam = searchParams.get('budget');

    if (catParam || subParam || areaParam || budgetParam) {
      setForm((prev) => ({
        ...prev,
        service_category: catParam || prev.service_category,
        sub_service: subParam || prev.sub_service,
        area_sqft: areaParam || prev.area_sqft,
        estimated_budget: budgetParam || prev.estimated_budget,
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await submitInquiry({
        ...form,
        source: searchParams.get('budget') ? 'cost_calculator_quote' : 'website_contact_form',
      });
      setSubmittedResult(res);
      setForm(initialForm);
    } catch (err) {
      setErrorMsg(
        err.message || 'Unable to send your request right now. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {showHero && (
        <>
          <SEO
            title="Contact Us & Book Free Design Consultation"
            description="Contact Brown's Interior in Dhaka. Book a free consultation, site visit, or request an itemized BOQ estimate for your residential or commercial project."
            canonicalPath="/contact"
          />
          <PageHero
            title="Contact Us"
            sub="Let's plan, design, and build your space."
            image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
          />
        </>
      )}

      <section className="contact-page-section" id="contact">
        <div className="container">
          {!showHero && (
            <SectionHead
              eyebrow="Get In Touch"
              title="Book a"
              script="Consultation"
            />
          )}

          <div className="contact-wrapper">
            {/* Left / Top: Compact Studio Info */}
            <motion.div
              className="contact-info-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="contact-info-head">
                <span className="contact-panel-tag">Brown's Interior</span>
                <h3>Let's Talk About Your Space</h3>
                <p className="info-desc">
                  Call, WhatsApp, or send a quick note for a free consultation.
                </p>
              </div>

              <div className="info-items">
                <a href="tel:+8801715064415" className="info-item">
                  <div className="info-icon"><Phone size={18} /></div>
                  <div>
                    <h4>Call / WhatsApp</h4>
                    <p>+880 1715-064415</p>
                  </div>
                </a>

                <a href={`mailto:${NOTIFICATION_EMAIL}`} className="info-item">
                  <div className="info-icon"><Mail size={18} /></div>
                  <div>
                    <h4>Email</h4>
                    <p>{NOTIFICATION_EMAIL}</p>
                  </div>
                </a>

                <div className="info-item">
                  <div className="info-icon"><MapPin size={18} /></div>
                  <div>
                    <h4>Studio</h4>
                    <p>House #354, Flat #5/A, Block-B, Khilgaon Taltola, Dhaka</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon"><Clock size={18} /></div>
                  <div>
                    <h4>Hours</h4>
                    <p>Sat – Thu · 9 AM – 7 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right / Bottom: Minimal Form or Clean Feedback */}
            <motion.div
              className="contact-form-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {submittedResult ? (
                <motion.div
                  className="contact-success-minimal"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="contact-success-badge">
                    <CheckCircle2 size={32} strokeWidth={1.8} />
                  </div>
                  <h3>Thank You, {submittedResult.record.name}!</h3>
                  <p>
                    We've received your consultation request for{' '}
                    <strong>{submittedResult.record.service_category}</strong>. Our design team will reach out to you shortly via phone or WhatsApp.
                  </p>

                  <div className="contact-success-actions">
                    <a
                      href={`https://wa.me/8801715064415?text=${encodeURIComponent(
                        `Hello Brown's Interior! I just requested a consultation for ${submittedResult.record.service_category}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="pill-btn"
                    >
                      <Phone size={15} /> Chat on WhatsApp
                    </a>
                    <button
                      type="button"
                      className="pill-btn outline"
                      onClick={() => setSubmittedResult(null)}
                    >
                      Send Another Request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="quote-form">
                  {form.estimated_budget && (
                    <div className="contact-prefill-banner">
                      <Sparkles size={15} />
                      <span>
                        Estimated Budget: <strong>{form.estimated_budget}</strong>
                        {form.area_sqft ? ` · ${form.area_sqft} sq ft` : ''}
                      </span>
                    </div>
                  )}

                  {errorMsg && (
                    <div className="contact-error-banner">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="inq-name">Full Name *</label>
                      <input
                        id="inq-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inq-phone">Phone / WhatsApp *</label>
                      <input
                        id="inq-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+880 17..."
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="inq-category">Service Type *</label>
                      <select
                        id="inq-category"
                        name="service_category"
                        value={form.service_category}
                        onChange={handleChange}
                        required
                      >
                        {servicesData.map((s) => (
                          <option key={s.slug} value={s.title}>
                            {s.shortTitle || s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inq-location">Location</label>
                      <input
                        id="inq-location"
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="e.g. Gulshan, Banani, Dhanmondi"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inq-message">Project Note</label>
                    <textarea
                      id="inq-message"
                      name="message"
                      rows="3"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us briefly about your space or preferred time for a call..."
                    />
                  </div>

                  <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 size={17} className="spin-icon" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Book Free Consultation
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
