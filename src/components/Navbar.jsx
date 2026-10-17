import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Calculator } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services', mega: true },
  { to: '/projects', label: 'Projects' },
  { to: '/process', label: 'Process' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

// Pages with a full-bleed dark hero where the navbar starts transparent
const transparentPaths = ['/', '/about', '/process', '/testimonials', '/blog', '/cost-estimator', '/contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { pathname } = useLocation();
  const canBeTransparent = transparentPaths.includes(pathname) || pathname.startsWith('/blog/');
  const solid = scrolled || !canBeTransparent || mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  return (
    <header className={`navbar ${solid ? 'solid' : 'clear'}`}>
      <div className="nav-container">
        <Link to="/" className="logo-container" aria-label="Brown's Interior home">
          <img src="/logo.svg" alt="Brown's Interior Logo" className="navbar-logo-img" />
        </Link>

        <nav className="desktop-nav">
          <ul>
            {links.map((l) =>
              l.mega ? (
                <li key={l.to} className="has-mega" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
                  <NavLink to={l.to} id="nav-services" className="nav-link">
                    {l.label} <ChevronDown size={14} className={`chev ${megaOpen ? 'open' : ''}`} />
                  </NavLink>
                  <div className={`mega-menu ${megaOpen ? 'open' : ''}`}>
                    <div className="mega-grid">
                      {servicesData.map((s) => {
                        const Icon = s.icon;
                        return (
                          <div key={s.slug} className="mega-col">
                            <Link to={`/services#${s.slug}`} className="mega-heading" onClick={() => setMegaOpen(false)}>
                              <Icon size={16} /> {s.shortTitle || s.title}
                            </Link>
                            <ul>
                              {s.items.map((item) => (
                                <li key={item}>
                                  <Link to={`/services#${s.slug}`} className="mega-item" onClick={() => setMegaOpen(false)}>{item}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              ) : (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.to === '/'} className="nav-link" id={`nav-${l.label.toLowerCase().replace(/\s/g, '-')}`}>{l.label}</NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        <Link to="/cost-estimator" className="nav-cta" id="nav-cost-calculator">
          <Calculator size={15} /> Cost Calculator
        </Link>

        <button className="mobile-toggle" aria-label="Toggle menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mobile-menu">
            <ul>
              {links.map((l) =>
                l.mega ? (
                  <li key={l.to}>
                    <button className="mobile-services-toggle" onClick={() => setMobileServicesOpen(!mobileServicesOpen)}>
                      Services <ChevronDown size={18} className={`chev ${mobileServicesOpen ? 'open' : ''}`} />
                    </button>
                    {mobileServicesOpen && (
                      <ul className="mobile-sub">
                        <li><Link to="/services">All Services</Link></li>
                        {servicesData.map((s) => (
                          <li key={s.slug}><Link to={`/services#${s.slug}`} onClick={() => setMobileMenuOpen(false)}>{s.shortTitle || s.title}</Link></li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
                )
              )}
              <li><Link to="/cost-estimator" className="nav-cta mobile"><Calculator size={15} /> Cost Calculator</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
