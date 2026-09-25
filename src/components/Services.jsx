import React from 'react';
import { motion } from 'framer-motion';
import { Compass, PenTool, Home, Maximize } from 'lucide-react';
import './Services.css';

const services = [
  {
    title: 'Architectural Design',
    description: 'Bespoke architectural solutions that merge aesthetic elegance with structural integrity.',
    icon: <Compass size={32} />
  },
  {
    title: 'Interior Styling',
    description: 'Curated spaces with premium materials, lighting, and bespoke furniture selection.',
    icon: <Home size={32} />
  },
  {
    title: '3D Visualization',
    description: 'Hyper-realistic renders and immersive 3D walkthroughs of your future space.',
    icon: <Maximize size={32} />
  },
  {
    title: 'Engineering Planning',
    description: 'Comprehensive mechanical, electrical, and plumbing blueprints for modern buildings.',
    icon: <PenTool size={32} />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Our <span className="italic-serif">Expertise</span></h2>
          <div className="title-divider"></div>
          <p className="section-subtitle">Crafting environments that inspire, comfort, and elevate.</p>
        </motion.div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} className="service-card" variants={cardVariants}>
              <div className="icon-wrapper text-accent">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <div className="card-hover-effect"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
