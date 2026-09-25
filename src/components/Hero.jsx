import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const backgrounds = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2500', // Luxury Interior
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2500', // Architecture Exterior
  'https://images.unsplash.com/photo-1541888086225-ee5315ffabfc?auto=format&fit=crop&q=80&w=2500'  // Structure / Construction
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero-section">
      <AnimatePresence>
        <motion.div 
          key={currentIndex}
          className="hero-bg" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ 
            backgroundImage: `url("${backgrounds[currentIndex]}")`,
            position: 'absolute'
          }}
        />
      </AnimatePresence>
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
