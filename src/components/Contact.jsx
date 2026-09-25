import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  return (
    <section className="contact-page-section">
      <div className="container">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="title-massive" style={{ color: '#1a1a1a', fontSize: '5rem', marginBottom: '1rem' }}>GET A QUOTE</h1>
          <p className="contact-subtitle">Let's discuss your next architectural or interior masterpiece.</p>
        </motion.div>

        <div className="contact-wrapper">
          <motion.div 
            className="contact-info-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Contact Information</h3>
            <p className="info-desc">Reach out to us directly or fill out the form to request a consultation and quote.</p>
            
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon"><Phone size={24} /></div>
                <div>
                  <h4>Call or WhatsApp</h4>
                  <p>+880 1768-436319</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon"><Mail size={24} /></div>
                <div>
                  <h4>Email Us</h4>
                  <p>brownsinteriorstudio@gmail.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon"><MapPin size={24} /></div>
                <div>
                  <h4>Office Address</h4>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><Clock size={24} /></div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Sat - Thu: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* FormSubmit.co Integration - Sends directly to client inbox */}
            <form action="https://formsubmit.co/brownsinteriorstudio@gmail.com" method="POST" className="quote-form">
              {/* Redirect back to contact page after submission */}
              <input type="hidden" name="_next" value={window.location.href} />
              {/* Disable Captcha for better UX (optional) */}
              <input type="hidden" name="_captcha" value="false" />
              {/* Email subject */}
              <input type="hidden" name="_subject" value="New Quote Request from Website!" />

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" required placeholder="john@example.com" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" required placeholder="+880 1..." />
                </div>
                <div className="form-group">
                  <label>Project Type</label>
                  <select name="project_type" required>
                    <option value="" disabled selected>Select a service...</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Consultancy">Consultancy</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Project Details</label>
                <textarea name="message" rows="5" required placeholder="Tell us about your project requirements, space dimensions, and vision..."></textarea>
              </div>

              <button type="submit" className="submit-btn">SEND REQUEST</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
