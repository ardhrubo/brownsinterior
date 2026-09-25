import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      {/* Real Photorealistic Background */}
      <div 
        className="hero-bg" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2500")' 
        }}
      ></div>
      <div className="hero-overlay"></div>

      <div className="container hero-container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="hero-greeting">Welcome to Brown's Engineering & Architecture</p>
          </motion.div>
          
          <motion.h1 
            className="title-massive"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            INTERIOR &<br />
            ARCHITECTURE
          </motion.h1>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Elevating spaces through premium interior styling, <br />
            visionary architecture, and structural excellence.
          </motion.p>
          
          <motion.div 
            className="hero-accent-dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="dots-grid">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="dot"></div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
