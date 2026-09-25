import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled || !isHome ? 'scrolled' : ''}`}>
      <div className="container nav-container" style={{ padding: '1rem 0' }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="logo-container"
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo.svg" alt="Brown's Interior Logo" className="navbar-logo-img" />
          </Link>
        </motion.div>

        <nav className="desktop-nav">
          <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none' }}>
            <motion.li initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Link to="/" className="nav-link" style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Home</Link>
            </motion.li>
            <motion.li initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Link to="/about" className="nav-link" style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>About</Link>
            </motion.li>
            <motion.li initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Link to="/services" className="nav-link" style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Services</Link>
            </motion.li>
            <motion.li initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Link to="/contact" className="nav-link" style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</Link>
            </motion.li>
          </ul>
        </nav>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mobile-menu"
        >
          <ul>
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
            <li><Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link></li>
            <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
