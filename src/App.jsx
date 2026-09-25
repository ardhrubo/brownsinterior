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
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import ProjectsPage from './components/ProjectsPage';

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
    <About />
    <Services />
    <Process />
    <Portfolio />
    <Team />
    <Clients />
    <Contact />
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
      <Footer />
      <FloatingContact />
    </Router>
  );
}

export default App;
