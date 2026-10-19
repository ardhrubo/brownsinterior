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
              <p>Crafting enduring spaces through smart planning, honest materials, and engineering precision.</p>
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
              <p className="commitment">Creative Design. <span>Professional Service.</span> Quality You Can Trust.</p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
