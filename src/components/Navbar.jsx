import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Calculator, ArrowRight } from 'lucide-react';
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState('interior-design');
  const { pathname } = useLocation();

  const canBeTransparent =
    transparentPaths.includes(pathname) ||
    pathname.startsWith('/blog/') ||
    pathname.startsWith('/services/');
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
                <li
                  key={l.to}
                  className="has-mega"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <NavLink to={l.to} id="nav-services" className="nav-link">
                    {l.label} <ChevronDown size={14} className={`chev ${megaOpen ? 'open' : ''}`} />
                  </NavLink>
                  <div className={`mega-menu ${megaOpen ? 'open' : ''}`}>
                    <div className="mega-grid">
                      {servicesData.map((s) => {
                        const Icon = s.icon;
                        return (
                          <div key={s.slug} className="mega-col">
                            <Link
                              to={`/services/${s.slug}`}
                              className="mega-heading"
                              onClick={() => setMegaOpen(false)}
                            >
                              <Icon size={16} /> {s.shortTitle || s.title}
                            </Link>
                            <ul>
                              {s.items.map((item) => (
                                <li key={item}>
                                  <Link
                                    to={`/services/${s.slug}#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                    className="mega-item"
                                    onClick={() => setMegaOpen(false)}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mega-footer-bar">
                      <div className="mega-footer-note">
                        Looking for an end-to-end design &amp; turnkey execution solution?
                      </div>
                      <div className="mega-footer-actions">
                        <Link to="/services" className="mega-foot-btn" onClick={() => setMegaOpen(false)}>
                          All Services Overview <ArrowRight size={14} />
                        </Link>
                        <Link to="/cost-estimator" className="mega-foot-btn highlight" onClick={() => setMegaOpen(false)}>
                          <Calculator size={14} /> Calculate Project Cost
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className="nav-link"
                    id={`nav-${l.label.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {l.label}
                  </NavLink>
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            <ul>
              {links.map((l) =>
                l.mega ? (
                  <li key={l.to} className="mobile-mega-parent">
                    <div className="mobile-services-header">
                      <Link
                        to="/services"
                        className="mobile-main-link"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Services
                      </Link>
                      <button
                        type="button"
                        className="mobile-services-toggle"
                        aria-label="Toggle Services List"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      >
                        <ChevronDown size={18} className={`chev ${mobileServicesOpen ? 'open' : ''}`} />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="mobile-multimenu">
                        <Link
                          to="/services"
                          className="mobile-all-services-cta"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>All Services Overview</span>
                          <ArrowRight size={14} />
                        </Link>

                        <div className="mobile-category-list">
                          {servicesData.map((s) => {
                            const Icon = s.icon;
                            const isExpanded = expandedMobileCategory === s.slug;
                            return (
                              <div key={s.slug} className={`mobile-cat-card ${isExpanded ? 'active' : ''}`}>
                                <div
                                  className="mobile-cat-header"
                                  onClick={() =>
                                    setExpandedMobileCategory(isExpanded ? null : s.slug)
                                  }
                                >
                                  <div className="mobile-cat-title-wrap">
                                    <Icon size={18} className="mobile-cat-icon" />
                                    <span className="mobile-cat-name">{s.title}</span>
                                  </div>
                                  <ChevronDown size={16} className={`chev ${isExpanded ? 'open' : ''}`} />
                                </div>

                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="mobile-sub-options-box"
                                    >
                                      <ul className="mobile-options-list">
                                        {s.items.map((item) => (
                                          <li key={item}>
                                            <Link
                                              to={`/services/${s.slug}#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                              onClick={() => setMobileMenuOpen(false)}
                                              className="mobile-option-link"
                                            >
                                              <span className="dot">•</span>
                                              <span>{item}</span>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                      <Link
                                        to={`/services/${s.slug}`}
                                        className="mobile-view-service-btn"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        Explore {s.shortTitle || s.title} Page <ArrowRight size={13} />
                                      </Link>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={l.to}>
                    <Link to={l.to} className="mobile-main-link" onClick={() => setMobileMenuOpen(false)}>
                      {l.label}
                    </Link>
                  </li>
                )
              )}
              <li style={{ marginTop: '0.75rem' }}>
                <Link
                  to="/cost-estimator"
                  className="nav-cta mobile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calculator size={15} /> Cost Calculator
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
