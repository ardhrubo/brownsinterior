import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

export default function About() {
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
            <h4 className="subtitle text-accent">About Us</h4>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Redefining <span className="italic-serif">Luxury</span> Spaces
            </h2>
            <p className="about-description">
              Brown's Interior Studio is a premier luxury design firm based in Dhaka. We specialize in transforming ordinary spaces into extraordinary spatial experiences. With a meticulous eye for detail and a passion for bespoke aesthetics, we bridge the gap between brilliant design and flawless execution.
            </p>
            <p className="about-description">
              Our philosophy is rooted in understanding our clients' deepest lifestyle aspirations and bringing them to life through comprehensive turnkey interior solutions. Whether it's a high-end residence, a boutique commercial space, or a corporate headquarters, we deliver unparalleled luxury and quality on time, every time.
            </p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <h3 className="stat-number">250+</h3>
                <p className="stat-label">Projects Completed</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number">30+</h3>
                <p className="stat-label">Design Professionals</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number">100%</h3>
                <p className="stat-label">Client Satisfaction</p>
              </div>
            </div>
            
            <a href="#contact" className="btn mt-4">Discover More</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
