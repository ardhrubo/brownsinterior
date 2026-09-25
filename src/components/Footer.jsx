import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ marginBottom: '1.5rem' }}>
              <img src="/browns-logo.svg" alt="Brown's Architecture Logo" style={{ height: '120px' }} />
            </div>
            <p className="footer-desc">
              A breathtaking interior space does not rely on beautiful design alone—meticulous space planning, premium material selection, and flawless execution are equally important. We provide an integrated, high-end turnkey solution from conceptualization to final styling.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/brownsengineeringbd" target="_blank" rel="noreferrer" className="social-icon">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3 className="footer-title">Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-item">
              <MapPin size={18} className="text-accent" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="contact-item">
              <Phone size={18} className="text-accent" />
              <span>+880 1768-436319</span>
            </div>
            <div className="contact-item">
              <Mail size={18} className="text-accent" />
              <span>brownsinteriorstudio@gmail.com</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Brown's Interior Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
