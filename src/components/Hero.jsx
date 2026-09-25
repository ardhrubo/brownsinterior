import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';
import './Hero.css';
import heroImg from '../assets/hero.png';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      {/* 3D Canvas Background */}
      <ThreeCanvas />

      <div className="container hero-container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="subtitle text-accent">Elevating Spaces</h2>
          </motion.div>
          
          <motion.h1 
            className="title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Design That Speaks<br />
            <span className="italic-serif">Elegance.</span>
          </motion.h1>
          
          <motion.p 
            className="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Browns Interior & Engineering brings unparalleled luxury and functional excellence to every architectural endeavor. Experience the premium standard of modern living.
          </motion.p>
          
          <motion.div 
            className="cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <a href="#portfolio" className="btn">
              Explore Portfolio <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Consultation
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
