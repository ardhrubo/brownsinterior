import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Clients from './components/Clients';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Pages
const Home = () => (
  <main>
    <Hero />
    <Services />
    <Portfolio />
    <Clients />
  </main>
);

const AboutPage = () => (
  <main style={{ paddingTop: '80px' }}>
    <About />
    <Process />
    <Team />
  </main>
);

const ServicesPage = () => (
  <main style={{ paddingTop: '80px' }}>
    <Services />
    <Process />
  </main>
);

const ContactPage = () => (
  <main style={{ paddingTop: '80px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-massive)', fontSize: '4rem', marginBottom: '1rem' }}>CONTACT US</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Get in touch for your next big project.</p>
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p><strong>Phone:</strong> +880 1768-436319</p>
        <p><strong>Email:</strong> brownsinteriorstudio@gmail.com</p>
        <p><strong>Address:</strong> Dhaka, Bangladesh</p>
      </div>
    </div>
  </main>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <FloatingContact />
    </Router>
  );
}

export default App;
