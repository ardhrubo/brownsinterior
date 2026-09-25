import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Team.css';

const team = [
  {
    name: 'Engr. Aslam Sheikh',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Md. Kaisar Hamid',
    role: 'Director / Head of Operation',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Ahmed Jamil Rahul',
    role: 'Director / Head of Design',
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&q=80&w=400'
  }
];

export default function Team() {
  return (
    <section id="team" className="team-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="subtitle text-accent">Leadership</h4>
          <h2 className="section-title">Meet Our <span className="italic-serif">Experts</span></h2>
          <div className="title-divider"></div>
        </motion.div>

        <div className="team-grid">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              className="team-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="team-image">
                <img src={member.image} alt={member.name} />
                <div className="team-socials">
                  <a href="#"><FaLinkedin size={20} /></a>
                  <a href="#"><FaEnvelope size={20} /></a>
                </div>
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
