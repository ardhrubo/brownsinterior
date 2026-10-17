import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, ShieldCheck } from 'lucide-react';
import './About.css';

export default function About({ full = false }) {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-image-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image-wrapper">
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" alt="About Browns Interior" />
              <div className="experience-badge">
                <span className="years">10+</span>
                <span className="text">Years of<br/>Excellence</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="sec-eyebrow">About Us — Brown's Interior</span>
            <h2 className="sec-title about-title">
              Designing <em>Beautiful Spaces</em> with Quality and Purpose
            </h2>
            <p className="about-description">
              Brown's Interior is a Dhaka-based interior design and execution firm providing professional design solutions for residential, commercial and exhibition spaces.
            </p>
            <p className="about-description">
              Led by <strong>Engr. Aslam Sheikh</strong>, we combine creative thinking, engineering knowledge and practical expertise to create spaces that are functional, elegant and tailored to our clients' needs.
            </p>
            {full && (
              <>
                <p className="about-description">
                  Our services include interior design, architectural design, structural consultancy, renovation and remodeling, exhibition and trade show booth design, and project management.
                </p>
                <p className="about-description">
                  We believe great design goes beyond appearance. It requires thoughtful planning, quality materials, attention to detail and a clear understanding of each client's vision and budget.
                </p>
                <p className="about-description">
                  From the initial concept to the final outcome, we focus on delivering practical solutions, professional service and lasting value.
                </p>
              </>
            )}
            {!full && <Link to="/about" className="pill-btn" id="about-discover-more">Discover More</Link>}
          </motion.div>
        </div>

        <div className="about-values">
          <motion.div className="value-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="value-icon"><Target size={26} strokeWidth={1.5} /></div>
            <h3>Our Mission</h3>
            <p>To create beautiful, functional and purposeful spaces through thoughtful design and quality-focused service.</p>
          </motion.div>
          <motion.div className="value-card dark" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="value-icon"><ShieldCheck size={26} strokeWidth={1.5} /></div>
            <h3>Our Commitment</h3>
            <p className="commitment">Creative Design. <span>Professional Service.</span> Quality You Can Trust.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
