import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import './About.css';

const quickHighlights = [
  'Led by Engr. Aslam Sheikh',
  'Architecture + Interior + Structural',
  'Transparent BOQ & On-Time Delivery',
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
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000"
                alt="About Brown's Interior"
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
              Where <em>Creative Vision</em> Meets Engineering Precision.
            </h2>
            <p className="about-description">
              Based in Dhaka and led by <strong>Engr. Aslam Sheikh</strong>, Brown's Interior blends architectural aesthetics with structural reliability across homes, offices, and exhibition spaces.
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
              <>
                <p className="about-description">
                  Our multidisciplinary team handles interior design, architectural planning, structural consultancy, renovation, trade show booth fabrication, and end-to-end project management under one roof.
                </p>
                <p className="about-description">
                  Every project begins with how you live and work — pairing honest materials, realistic 3D visualization, and itemized budgets so there are zero surprises during execution.
                </p>
              </>
            )}

            {!full && (
              <div className="about-cta-row">
                <Link to="/about" className="pill-btn outline" id="about-discover-more">
                  More About Us <ArrowRight size={15} />
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
              <p>To craft purposeful, enduring spaces through intelligent planning, honest materials, and engineering precision.</p>
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
