import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Hammer, CheckCircle } from 'lucide-react';
import './Process.css';

const steps = [
  {
    icon: <Lightbulb size={32} />,
    title: '1. Consultation & Idea',
    description: 'We meet to discuss your vision, requirements, and budget, ensuring we understand the core of your dream space.'
  },
  {
    icon: <PenTool size={32} />,
    title: '2. Concept & Design',
    description: 'Our expert architects craft bespoke 2D layouts and 3D visualizations, refining every detail before execution.'
  },
  {
    icon: <Hammer size={32} />,
    title: '3. Build & Install',
    description: 'Our engineers and craftsmen meticulously bring the designs to life using premium materials and flawless execution.'
  },
  {
    icon: <CheckCircle size={32} />,
    title: '4. Handover',
    description: 'A comprehensive quality check ensures perfection before we hand over the keys to your newly transformed space.'
  }
];

export default function Process() {
  return (
    <section className="process-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="subtitle text-accent">How We Work</h4>
          <h2 className="section-title">Our <span className="italic-serif">Process</span></h2>
          <div className="title-divider"></div>
        </motion.div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="process-step"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="step-icon-wrapper">
                {step.icon}
                {index !== steps.length - 1 && <div className="step-connector"></div>}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
