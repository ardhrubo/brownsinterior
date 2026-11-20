import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Calculator } from 'lucide-react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { servicesData } from '../data/servicesData';
import { getWhatsAppUrl } from '../data/siteData';
import { useLanguage, serviceCategoryBn } from '../context/LanguageContext';
import './Footer.css';

const quickLinks = [
  { to: '/about', label: 'About Us', bn: 'আমাদের সম্পর্কে' },
  { to: '/projects', label: 'Projects', bn: 'প্রজেক্ট' },
  { to: '/process', label: 'Our Process', bn: 'কাজের ধাপ' },
  { to: '/testimonials', label: 'Testimonials', bn: 'মতামত' },
  { to: '/cost-estimator', label: 'Estimate Cost', bn: 'খরচ হিসাব' },
  { to: '/careers', label: 'Careers', bn: 'Careers' },
  { to: '/contact', label: 'Contact', bn: 'যোগাযোগ' },
  { to: '/blog', label: 'Blog', bn: 'ব্লগ' },
];

export default function Footer() {
  const { isBn } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className={`footer-top ${isBn ? 'is-bn' : ''}`}>
          <div>
            <h2>
              {isBn ? (
                <>আপনার <em>স্বপ্নের ঘর বা অফিস</em> সাজাতে প্রস্তুত?</>
              ) : (
                <>Ready to Build Your <em>Dream Space?</em></>
              )}
            </h2>
            <p>
              {isBn
                ? 'ফ্রি পরামর্শের জন্য যোগাযোগ করুন অথবা অনলাইনে আনুমানিক খরচ হিসাব করুন।'
                : 'Book a free consultation or get an instant cost estimate.'}
            </p>
          </div>
          <div className="footer-top-btns">
            <Link to="/cost-estimator" className="pill-btn glass" id="footer-calculator">
              <Calculator size={16} /> {isBn ? 'খরচ হিসাব করুন' : 'Estimate Cost'}
            </Link>
            <Link to="/contact" className="pill-btn" id="footer-consultation">
              <Phone size={16} /> {isBn ? 'ফ্রি পরামর্শ নিন' : 'Book Consultation'}
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-main-mask">
        <div className="container">
          <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Go to top">
              <img src="/logo.svg" alt="Brown's Interiors Logo" width="316" height="48" className="footer-logo-img" />
            </Link>
            <p className="footer-desc">
              {isBn
                ? 'Engr. Aslam Sheikh-এর নেতৃত্বে Brown’s Interiors ঢাকা ও সারা বাংলাদেশে ফ্ল্যাট, ডুপ্লেক্স, অফিস ও এক্সিবিশন বুথের কমপ্লিট Interior Design ও Turnkey কাজ করে থাকে।'
                : "Brown's Interiors is a premier interior design and execution studio providing professional design solutions for residential, commercial, and exhibition spaces all over Bangladesh and worldwide. Led by Engr. Aslam Sheikh."}
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/brownsinteriorsbd" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook"><FaFacebook size={18} /></a>
              <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className="social-icon" aria-label="WhatsApp"><FaWhatsapp size={18} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">{isBn ? 'আমাদের সার্ভিসসমূহ' : 'Our Services'}</h4>
            <ul>
              {servicesData.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>
                    {isBn ? (serviceCategoryBn[s.slug]?.shortTitle || s.shortTitle || s.title) : (s.shortTitle || s.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">{isBn ? 'প্রয়োজনীয় লিংক' : 'Quick Links'}</h4>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{isBn ? l.bn : l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">{isBn ? 'যোগাযোগের ঠিকানা' : 'Contact Us'}</h4>
            <a href="https://maps.google.com/?q=Uttara,Dhaka,Bangladesh" target="_blank" rel="noreferrer" className="contact-item"><MapPin size={18} /><span>Uttara, Dhaka, Bangladesh</span></a>
            <a href="tel:+8801768436319" className="contact-item"><Phone size={18} /><span>+880 1768-436319</span></a>
            <a href="mailto:info@brownsinteriorsbd.com" className="contact-item"><Mail size={18} /><span>info@brownsinteriorsbd.com</span></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Brown&apos;s Interiors - ইন্টেরিয়র ডিজাইন স্টুডিও. All rights reserved.</p>
          <p>
            {isBn
              ? 'মানসম্মত কাজ ও সুপরিকল্পিত ডিজাইনে গড়ে তুলি আপনার স্বপ্নের ঘর।'
              : 'Designing Beautiful Spaces with Quality and Purpose.'}
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
