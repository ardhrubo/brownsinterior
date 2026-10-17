import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { servicesData } from '../data/servicesData';
import './Footer.css';

const quickLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/projects', label: 'Projects' },
  { to: '/process', label: 'Our Process' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blog', label: 'Blog' },
  { to: '/cost-estimator', label: 'Cost Calculator' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <h3>Have a project in mind?</h3>
            <p>Creative Design. Professional Service. Quality You Can Trust.</p>
          </div>
          <Link to="/contact" className="pill-btn" id="footer-consultation">Get Free Consultation <ArrowRight size={16} /></Link>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo.svg" alt="Brown's Interior Logo" className="footer-logo-img" />
            <p className="footer-desc">
              Brown's Interior is a Dhaka-based interior design and execution firm providing professional design solutions for residential, commercial and exhibition spaces. Led by Engr. Aslam Sheikh.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/brownsengineeringbd" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook"><FaFacebook size={18} /></a>
              <a href="https://wa.me/8801768436319" target="_blank" rel="noreferrer" className="social-icon" aria-label="WhatsApp"><FaWhatsapp size={18} /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram size={18} /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Our Services</h4>
            <ul>
              {servicesData.map((s) => (
                <li key={s.slug}><Link to={`/services#${s.slug}`}>{s.shortTitle || s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Quick Links</h4>
            <ul>
              {quickLinks.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contact Us</h4>
            <a href="https://maps.google.com/?q=Dhaka,Bangladesh" target="_blank" rel="noreferrer" className="contact-item"><MapPin size={18} /><span>Dhaka, Bangladesh</span></a>
            <a href="tel:+8801768436319" className="contact-item"><Phone size={18} /><span>+880 1768-436319</span></a>
            <a href="mailto:brownsinteriorstudio@gmail.com" className="contact-item"><Mail size={18} /><span>brownsinteriorstudio@gmail.com</span></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Brown's Interior. All rights reserved.</p>
          <p>Designing Beautiful Spaces with Quality and Purpose.</p>
        </div>
      </div>
    </footer>
  );
}
