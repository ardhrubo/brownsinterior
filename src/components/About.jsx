import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
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
            {/* Founder Section on About Page: Clean portrait (NO IEB card on image, NO text on image) with credentials beside */}
            <motion.div
              className="about-founder-spotlight clay"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="founder-spotlight-photo-wrap">
                <div className="founder-spotlight-frame">
                  <img
                    src="/team/engr-aslam-sheikh.jpg"
                    alt="Engr. Aslam Sheikh - Founder & Principal Designer"
                    className="founder-spotlight-img"
                    loading="lazy"
                  />
                  {/* Clean photo: No card, badge, or text overlay on top of the image */}
                </div>
              </div>

              <div className="founder-spotlight-content">
                <span className="sec-eyebrow">The Founder</span>
                <h3 className="founder-spotlight-title">Engr. Aslam Sheikh</h3>
                <p className="founder-spotlight-subtitle">Founder & Principal Designer · Structural Consultant</p>

                <p className="about-description" style={{ marginBottom: '1.25rem' }}>
                  Engr. Aslam Sheikh founded Brown’s Interior with a clear mission: bringing formal architectural design and civil engineering precision together. Over the past decade, he has directed 250+ turnkey residential, commercial, and trade fair projects across Bangladesh.
                </p>

                <div className="founder-credentials-bar" aria-label="Credentials">
                  <span className="founder-cred-pill">Dip. Architecture & Interior Design (School of Architecture, NPI)</span>
                  <span className="founder-cred-pill">B.Sc. in Civil Engg. (IUBAT)</span>
                  <span className="founder-cred-pill">IEB Membership No: A29734</span>
                </div>

                <blockquote className="founder-quote">
                  “In high-density urban flats and commercial centers, interior design without engineering discipline is high-risk. We combine spatial luxury with load calculations, certified MEP routing, and honest BOQs to build spaces that endure for generations.”
                </blockquote>

                <div className="founder-spotlight-actions">
                  <a
                    href="https://wa.me/8801768436319?text=Hello%20Engr.%20Aslam%2C%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20discuss%20an%20interior%20design%20project."
                    target="_blank"
                    rel="noreferrer"
                    className="pill-btn dark"
                  >
                    Consult Directly on WhatsApp <ArrowRight size={15} />
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
