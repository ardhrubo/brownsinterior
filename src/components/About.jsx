import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Quote,
  Award,
  GraduationCap,
  Building2,
  BadgeCheck,
  MessageCircle,
} from 'lucide-react';
import './About.css';

const quickHighlights = [
  'Led by Engr. Aslam Sheikh',
  'All Over Bangladesh & Worldwide Design Service',
  'Architecture · Interior · Structural',
  'Transparent BOQ & Turnkey Build',
];

export default function About({ full = false }) {
  return (
    <section id="about" className={`about-section ${full ? 'about-full' : 'about-compact'}`}>
      <div className="container">
        {/* Main Studio Section */}
        <div className="about-grid">
          <motion.div
            className="about-image-container"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-image-wrapper">
              <img
                src="/portfolio/residential/living-marble-luxury-hall.jpg"
                alt="About Brown's Interior Studio"
              />
              <div className="experience-badge">
                <span className="years">10+</span>
                <span className="text">Years of<br />Excellence</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="sec-eyebrow">The Studio</span>
            <h2 className="sec-title about-title">
              Where <em>Design</em> Meets Engineering.
            </h2>
            <p className="about-description">
              Led by <strong>Engr. Aslam Sheikh</strong>, we design and build bespoke homes, offices, and exhibition spaces all over Bangladesh, alongside worldwide architectural and interior design services.
            </p>

            {!full && (
              <ul className="about-quick-list">
                {quickHighlights.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {full && (
              <p className="about-description">
                Our in-house team unites interior architecture, structural consultancy, custom millwork, and turnkey execution—backed by 3D visualization and itemized budgets.
              </p>
            )}

            {!full && (
              <div className="about-cta-row">
                <Link to="/about" className="pill-btn outline" id="about-discover-more">
                  About Us <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {full && (
          <>
            {/* Executive Founder Spotlight & Personal Message */}
            <motion.div
              className="about-founder-spotlight clay"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="founder-spotlight-photo-wrap">
                <div className="founder-spotlight-card">
                  <div className="founder-photo-frame">
                    <img
                      src="/team/engr-aslam-sheikh.jpg"
                      alt="Engr. Aslam Sheikh - Founder & Principal Designer"
                      className="founder-portrait-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="founder-photo-caption">
                    <div className="founder-caption-item">
                      <span className="caption-num">10+</span>
                      <span className="caption-lbl">Years Exp.</span>
                    </div>
                    <div className="founder-caption-sep" />
                    <div className="founder-caption-item">
                      <span className="caption-num">250+</span>
                      <span className="caption-lbl">Projects</span>
                    </div>
                    <div className="founder-caption-sep" />
                    <div className="founder-caption-item">
                      <span className="caption-num">IEB</span>
                      <span className="caption-lbl">Certified</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="founder-spotlight-content">
                <div className="founder-eyebrow-row">
                  <span className="sec-eyebrow">Message From The Founder</span>
                </div>
                <h3 className="founder-spotlight-title">Engr. Aslam Sheikh</h3>
                <p className="founder-spotlight-subtitle">Founder & Principal Designer · Structural Consultant</p>

                <div className="founder-message-box">
                  <Quote className="founder-message-quote-icon" size={28} />
                  <p className="founder-message-p">
                    “I believe a beautiful interior is not just about looks, but also about comfort, functionality, and quality. My goal is to create spaces that reflect each client’s taste and make everyday living better.”
                  </p>
                  <p className="founder-message-p">
                    “Along with interior design, I also focus on building design and exterior aesthetics. With proper structural planning and engineering, I aim to create buildings that are safe, functional, and built to last.”
                  </p>
                </div>

                <div className="founder-credentials-section">
                  <h4 className="founder-credentials-heading">
                    <Award size={18} />
                    <span>Credentials & Professional Affiliations</span>
                  </h4>
                  <div className="founder-credentials-list">
                    <div className="founder-credential-item">
                      <div className="credential-icon-wrap">
                        <GraduationCap size={18} />
                      </div>
                      <div className="credential-details">
                        <strong className="credential-title">Dip. Architecture & Interior Design</strong>
                        <span className="credential-institution">School of Architecture (NPI)</span>
                      </div>
                    </div>
                    <div className="founder-credential-item">
                      <div className="credential-icon-wrap">
                        <Building2 size={18} />
                      </div>
                      <div className="credential-details">
                        <strong className="credential-title">B.Sc. in Civil Engineering</strong>
                        <span className="credential-institution">International University of Business Agriculture and Technology (IUBAT)</span>
                      </div>
                    </div>
                    <div className="founder-credential-item">
                      <div className="credential-icon-wrap">
                        <BadgeCheck size={18} />
                      </div>
                      <div className="credential-details">
                        <strong className="credential-title">IEB Membership No: A29734</strong>
                        <span className="credential-institution">The Institution of Engineers, Bangladesh (IEB)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="founder-spotlight-actions">
                  <a
                    href="https://wa.me/8801768436319?text=Hello%20Engr.%20Aslam%2C%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20discuss%20an%20interior%20design%20project."
                    target="_blank"
                    rel="noreferrer"
                    className="pill-btn dark"
                  >
                    <MessageCircle size={16} />
                    <span>Consult Directly on WhatsApp</span>
                    <ArrowRight size={15} />
                  </a>
                  <a
                    href="tel:+8801768436319"
                    className="pill-btn outline"
                  >
                    <span>Direct Line: +880 1768-436319</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="about-values">
              <motion.div
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="value-icon"><Target size={26} strokeWidth={1.5} /></div>
                <h3>Our Mission</h3>
                <p>Crafting enduring spaces through smart spatial planning, honest materials, and civil structural engineering precision.</p>
              </motion.div>
              <motion.div
                className="value-card dark"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
              >
                <div className="value-icon"><ShieldCheck size={26} strokeWidth={1.5} /></div>
                <h3>Our Commitment</h3>
                <p className="commitment">Creative Design. <span>Professional Engineering.</span> Quality You Can Trust.</p>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
