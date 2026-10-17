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

const transparentPaths = ['/', '/about', '/process', '/testimonials', '/blog', '/cost-estimator', '/contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
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

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    setMegaOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${solid ? 'solid' : 'clear'}`}>
      <div className="nav-container">
        <Link
          to="/"
          className="logo-container"
          aria-label="Brown's Interior home"
          onClick={handleLogoClick}
        >
          <img src="/logo.svg" alt="Brown's Interior Logo" className="navbar-logo-img" />
        </Link>

        {/* Desktop Nav */}
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
                              {s.options.map((opt) => (
                                <li key={opt.slug}>
                                  <Link
                                    to={`/services/${opt.slug}`}
                                    className="mega-item"
                                    onClick={() => setMegaOpen(false)}
                                  >
                                    {opt.title}
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
                        Complete architecture, engineering &amp; turnkey interior solutions in Dhaka.
                      </div>
                      <div className="mega-footer-actions">
                        <Link to="/services" className="mega-foot-btn" onClick={() => setMegaOpen(false)}>
                          All Services Overview <ArrowRight size={14} />
                        </Link>
                        <Link to="/cost-estimator" className="mega-foot-btn highlight" onClick={() => setMegaOpen(false)}>
                          <Calculator size={14} /> Cost Calculator
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

      {/* Mobile Drawer */}
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
                  <li key={l.to} className="mobile-services-section">
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
                        className="mobile-services-toggle-btn"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        aria-label="Toggle Services list"
                      >
                        <ChevronDown size={18} className={`chev ${mobileServicesOpen ? 'open' : ''}`} />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="mobile-clean-services-container">
                        <Link
                          to="/services"
                          className="mobile-all-services-pill"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          All Services Overview <ArrowRight size={13} />
                        </Link>

                        <div className="mobile-clean-grid">
                          {servicesData.map((s) => {
                            const Icon = s.icon;
                            return (
                              <div key={s.slug} className="mobile-clean-category">
                                <Link
                                  to={`/services/${s.slug}`}
                                  className="mobile-clean-cat-title"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <Icon size={16} className="text-accent" />
                                  <span>{s.title}</span>
                                </Link>
                                <ul className="mobile-clean-options">
                                  {s.options.map((opt) => (
                                    <li key={opt.slug}>
                                      <Link
                                        to={`/services/${opt.slug}`}
                                        className="mobile-clean-opt-link"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {opt.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
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
