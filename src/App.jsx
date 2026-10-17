import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Team from './components/Team';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import ProjectsPage from './components/ProjectsPage';
import ServicesPage from './components/ServicesPage';
import ServiceDetail from './components/ServiceDetail';
import {
  HomeHero, StatsBar, ServicesGrid, FeaturedProjects, ProcessTimeline,
  TestimonialSlider, CostCTA, PageHero,
} from './components/HomeSections';
import { ProcessPage, TestimonialsPage, BlogPage, BlogPost, CostCalculatorPage } from './components/ExtraPages';

const ScrollToTop = () => {
  const { pathname, key } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, key]);
  return null;
};

// Streamlined, natural storytelling Home Page sequence:
// 1. Hero -> 2. Stats -> 3. The Studio -> 4. Services -> 5. Projects -> 6. Process -> 7. Leadership -> 8. Testimonials -> 9. Contact
const Home = () => (
  <main>
    <HomeHero />
    <StatsBar />
    <About />
    <ServicesGrid />
    <FeaturedProjects />
    <ProcessTimeline showCta />
    <Team />
    <TestimonialSlider />
    <Contact showHero={false} />
  </main>
);

const AboutPage = () => (
  <main>
    <PageHero title="About Us" sub="Designing beautiful spaces with quality and purpose." image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000" />
    <StatsBar />
    <About full />
    <Team cream />
    <ProcessTimeline />
    <CostCTA />
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
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/services/:categorySlug/:slug" element={<ServiceDetail />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/cost-estimator" element={<CostCalculatorPage />} />
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
