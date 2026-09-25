import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, TrendingUp, Building2, Landmark, Factory } from 'lucide-react';
import './Clients.css';

const clients = [
  { name: 'Corporate Banking', icon: <Landmark size={40} /> },
  { name: 'Real Estate Dev', icon: <Building2 size={40} /> },
  { name: 'Industrial Sector', icon: <Factory size={40} /> },
  { name: 'Global Tech', icon: <TrendingUp size={40} /> },
  { name: 'Healthcare Plus', icon: <Shield size={40} /> },
  { name: 'Retail Brand', icon: <Target size={40} /> }
];

export default function Clients() {
  return (
    <section className="clients-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="subtitle text-accent">Trusted By</h4>
          <h2 className="section-title">Our <span className="italic-serif">Partners</span></h2>
        </motion.div>

        <div className="clients-grid">
          {clients.map((client, index) => (
            <motion.div 
              key={index}
              className="client-logo-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="client-icon">{client.icon}</div>
              <p className="client-name">{client.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
