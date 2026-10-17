import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, Calculator, ArrowRight } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services', multimenu: true },
  { to: '/projects', label: 'Projects' },
  { to: '/process', label: 'Process' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const transparentPaths = ['/', '/about', '/services', '/process', '/testimonials', '/blog', '/cost-estimator', '/contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(servicesData[0].slug);
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
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`navbar ${solid ? 'solid' : 'clear'}`}>
      <div className="nav-container">
        <Link
          to="/"
          className="logo-container"
          aria-label="Brown's Interior home"
          onClick={() => {
            setMobileMenuOpen(false);
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src="/logo.svg" alt="Brown's Interior Logo" className="navbar-logo-img" />
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul>
            {links.map((l) =>
              l.multimenu ? (
                <li
                  key={l.to}
                  className="has-multimenu"
                  onMouseEnter={() => setMenuOpen(true)}
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <NavLink
                    to={l.to}
                    id="nav-services"
                    className={({ isActive }) =>
                      `nav-link ${isActive || pathname.startsWith('/services/') ? 'active' : ''}`
                    }
                  >
                    {l.label} <ChevronDown size={14} className={`chev ${menuOpen ? 'open' : ''}`} />
                  </NavLink>

                  {/* Cascading Multi-Menu Dropdown */}
                  <div className={`services-multimenu ${menuOpen ? 'open' : ''}`}>
                    <ul className="multimenu-primary">
                      {servicesData.map((s) => {
                        const Icon = s.icon;
                        const isCatActive = activeCategory === s.slug;
                        return (
                          <li
                            key={s.slug}
                            className={`multimenu-item ${isCatActive ? 'active' : ''}`}
                            onMouseEnter={() => setActiveCategory(s.slug)}
                          >
                            <Link
                              to={`/services/${s.slug}`}
                              className={`multimenu-cat-link ${pathname === `/services/${s.slug}` ? 'current' : ''}`}
                              onClick={() => setMenuOpen(false)}
                            >
                              <span className="multimenu-cat-icon">
                                <Icon size={16} />
                              </span>
                              <span className="multimenu-cat-text">{s.title}</span>
                              <ChevronRight size={15} className="multimenu-arrow" />
                            </Link>

                            {/* Submenu flying out right beside this service category */}
                            <div className={`multimenu-flyout ${menuOpen && isCatActive ? 'visible' : ''}`}>
                              <div className="multimenu-flyout-head">
                                <Link
                                  to={`/services/${s.slug}`}
                                  className="multimenu-flyout-title"
                                  onClick={() => setMenuOpen(false)}
                                >
                                  <span>{s.title}</span>
                                  <ArrowRight size={13} />
                                </Link>
                                <p>{s.tagline}</p>
                              </div>

                              <ul className="multimenu-sub-list">
                                {s.options.map((opt) => (
                                  <li key={opt.slug}>
                                    <Link
                                      to={`/services/${opt.slug}`}
                                      className={`multimenu-sub-link ${pathname === `/services/${opt.slug}` ? 'active' : ''}`}
                                      onClick={() => setMenuOpen(false)}
                                    >
                                      <span className="multimenu-sub-dot" />
                                      <span className="multimenu-sub-label">{opt.title}</span>
                                      <ArrowRight size={13} className="multimenu-sub-go" />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="multimenu-footer">
                      <Link to="/services" className="multimenu-all-link" onClick={() => setMenuOpen(false)}>
                        <span>All Services Overview</span>
                        <ArrowRight size={14} />
                      </Link>
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

        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
        </button>
      </div>

      {/* Mobile Drawer with Nested Services Menu */}
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
                l.multimenu ? (
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
                                        {s.options.map((opt) => (
                                          <li key={opt.slug}>
                                            <Link
                                              to={`/services/${opt.slug}`}
                                              onClick={() => setMobileMenuOpen(false)}
                                              className="mobile-option-link"
                                            >
                                              <span className="dot">•</span>
                                              <span>{opt.title}</span>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                      <Link
                                        to={`/services/${s.slug}`}
                                        className="mobile-view-service-btn"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        View All {s.shortTitle || s.title} <ArrowRight size={13} />
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
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className="mobile-main-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {l.label}
                    </NavLink>
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
