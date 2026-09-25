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
            <h2 className="footer-logo">BROWN'S <span>ENGINEERING & ARCHITECTURE</span></h2>
            <p className="footer-desc">
              A good interior or building project does not rely on beautiful design alone—proper planning, engineering, material selection, and quality execution are equally important. We provide an integrated and professional solution from design to execution.
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
          <p>&copy; {new Date().getFullYear()} Browns Interior & Engineering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
