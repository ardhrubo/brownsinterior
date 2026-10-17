import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Clock, CheckCircle2, Send, Loader2, Sparkles, AlertCircle
} from 'lucide-react';
import { PageHero, SectionHead } from './HomeSections';
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

  const currentCategoryObj = useMemo(
    () =>
      servicesData.find(
        (s) => s.title === form.service_category || s.slug === form.service_category
      ) || servicesData[0],
    [form.service_category]
  );

  const subServiceOptions = currentCategoryObj ? currentCategoryObj.options : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'service_category') {
      setForm((prev) => ({
        ...prev,
        service_category: value,
        sub_service: '',
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
      const refCode = `BI-${String(Date.now()).slice(-4)}`;
      setSubmittedResult({ ...res, refCode });
      setForm(initialForm);
    } catch (err) {
      setErrorMsg(
        err.message || 'Something went wrong while submitting your request. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {submittedResult && (
        <motion.div
          className="contact-floating-toast"
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <CheckCircle2 size={18} />
          <div>
            <strong>Request Sent Successfully! ({submittedResult.refCode})</strong>
            <span>Saved to studio database &amp; emailed to {submittedResult.recipientEmail}</span>
          </div>
        </motion.div>
      )}

      {showHero && (
        <PageHero
          title="Contact Us"
          sub="Tell us about your space — we'll help you plan, design and build it with quality and purpose."
          image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
        />
      )}
      <section className="contact-page-section" id="contact">
        <div className="container">
          {!showHero && (
            <SectionHead
              eyebrow="Get In Touch"
              title="Request a"
              script="Consultation"
              sub="Share your project requirements below. Your inquiry is saved directly to our studio system and emailed immediately to our team."
            />
          )}

          <div className="contact-wrapper">
            <motion.div
              className="contact-info-panel"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="contact-panel-tag">Brown's Interior</span>
              <h3>Contact Information</h3>
              <p className="info-desc">
                Reach out to Engr. Aslam Sheikh &amp; team directly, or submit the form for a tailored consultation and itemized BOQ.
              </p>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon"><Phone size={22} /></div>
                  <div>
                    <h4>Call or WhatsApp</h4>
                    <p><a href="tel:+8801715064415">+880 1715-064415</a></p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon"><Mail size={22} /></div>
                  <div>
                    <h4>Email Us</h4>
                    <p><a href={`mailto:${NOTIFICATION_EMAIL}`}>{NOTIFICATION_EMAIL}</a></p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon"><MapPin size={22} /></div>
                  <div>
                    <h4>Studio Address</h4>
                    <p>
                      House # 354, Flat # 5/A, Block-B, Khilgaon Taltola (Opposite side of PalliBidyut), Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon"><Clock size={22} /></div>
                  <div>
                    <h4>Studio Hours</h4>
                    <p>Sat – Thu: 9:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="contact-form-panel"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {submittedResult ? (
                <motion.div
                  className="contact-success-box"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="contact-success-top">
                    <div className="contact-success-icon">
                      <CheckCircle2 size={36} />
                    </div>
                    <span className="contact-ref-badge">
                      Reference #{submittedResult.refCode}
                    </span>
                    <h3>Consultation Request Confirmed!</h3>
                    <p>
                      Thank you, <strong>{submittedResult.record.name}</strong>. Your inquiry has been logged in our studio database and an instant email notification was sent to{' '}
                      <strong>{submittedResult.recipientEmail}</strong>.
                    </p>
                  </div>

                  {/* Submitted Details Receipt */}
                  <div className="contact-receipt-grid">
                    <div className="receipt-item">
                      <span>Selected Service</span>
                      <strong>
                        {submittedResult.record.service_category}
                        {submittedResult.record.sub_service
                          ? ` — ${submittedResult.record.sub_service}`
                          : ''}
                      </strong>
                    </div>
                    <div className="receipt-item">
                      <span>Contact Number</span>
                      <strong>{submittedResult.record.phone}</strong>
                    </div>
                    {submittedResult.record.location && (
                      <div className="receipt-item">
                        <span>Location</span>
                        <strong>{submittedResult.record.location}</strong>
                      </div>
                    )}
                    {(submittedResult.record.area_sqft ||
                      submittedResult.record.estimated_budget) && (
                      <div className="receipt-item">
                        <span>Space / Target Budget</span>
                        <strong>
                          {submittedResult.record.area_sqft
                            ? `${submittedResult.record.area_sqft} sq ft`
                            : ''}
                          {submittedResult.record.area_sqft &&
                          submittedResult.record.estimated_budget
                            ? ' · '
                            : ''}
                          {submittedResult.record.estimated_budget || ''}
                        </strong>
                      </div>
                    )}
                  </div>

                  {/* 3-Step What Happens Next */}
                  <div className="contact-next-steps">
                    <h4>What Happens Next</h4>
                    <div className="next-steps-row">
                      <div className="next-step-chip done">
                        <span className="step-badge">✓</span>
                        <div>
                          <strong>1. Request Logged</strong>
                          <small>Saved &amp; emailed to studio</small>
                        </div>
                      </div>
                      <div className="next-step-chip active">
                        <span className="step-badge">02</span>
                        <div>
                          <strong>2. Team Review</strong>
                          <small>Reviewed within 24 hours</small>
                        </div>
                      </div>
                      <div className="next-step-chip">
                        <span className="step-badge">03</span>
                        <div>
                          <strong>3. Direct Call / Visit</strong>
                          <small>Schedule consultation &amp; BOQ</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="contact-success-actions">
                    <a
                      href={`https://wa.me/8801715064415?text=${encodeURIComponent(
                        `Hello Brown's Interior! I just submitted a consultation request (Ref #${submittedResult.refCode}) for ${submittedResult.record.service_category}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="pill-btn"
                    >
                      <Phone size={15} /> Fast-Track on WhatsApp
                    </a>
                    <button
                      type="button"
                      className="pill-btn outline"
                      onClick={() => setSubmittedResult(null)}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="quote-form">
                  {form.estimated_budget && (
                    <div className="contact-prefill-banner">
                      <Sparkles size={16} />
                      <span>
                        Pre-filled from Cost Calculator — Estimated Budget:{' '}
                        <strong>{form.estimated_budget}</strong>
                        {form.area_sqft ? ` (${form.area_sqft} sq ft)` : ''}
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
                        placeholder="e.g. Rafiq Ahmed"
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
                      <label htmlFor="inq-email">Email Address *</label>
                      <input
                        id="inq-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inq-location">Project Location</label>
                      <input
                        id="inq-location"
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="e.g. Gulshan, Banani, Dhanmondi..."
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="inq-category">Service Category *</label>
                      <select
                        id="inq-category"
                        name="service_category"
                        value={form.service_category}
                        onChange={handleChange}
                        required
                      >
                        {servicesData.map((s) => (
                          <option key={s.slug} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inq-subservice">Specialized Service</label>
                      <select
                        id="inq-subservice"
                        name="sub_service"
                        value={form.sub_service}
                        onChange={handleChange}
                      >
                        <option value="">All / General {currentCategoryObj?.shortTitle}</option>
                        {subServiceOptions.map((opt) => (
                          <option key={opt.slug} value={opt.title}>
                            {opt.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="inq-area">Approx. Space Size (sq ft)</label>
                      <input
                        id="inq-area"
                        type="number"
                        min="50"
                        name="area_sqft"
                        value={form.area_sqft}
                        onChange={handleChange}
                        placeholder="e.g. 1650"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inq-budget">Target Budget Range</label>
                      <input
                        id="inq-budget"
                        type="text"
                        name="estimated_budget"
                        value={form.estimated_budget}
                        onChange={handleChange}
                        placeholder="e.g. ৳ 15L – 25L / Custom Quote"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inq-message">Project Details &amp; Vision *</label>
                    <textarea
                      id="inq-message"
                      name="message"
                      rows="4"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your rooms, timeline, preferred style, or site visit availability..."
                    />
                  </div>

                  <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="spin-icon" /> SENDING REQUEST...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> SEND CONSULTATION REQUEST
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

