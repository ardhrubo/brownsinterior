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
  HomeHero, StatsBar, ServicesGrid, FeaturedProjects, TransformationShowcase,
  ProcessTimeline, TestimonialSlider, CostCTA, BlogPreview, PageHero,
} from './components/HomeSections';
import SEO from './components/SEO';
import NotFound from './components/NotFound';
import { ProcessPage, TestimonialsPage, BlogPage, BlogPost, CostCalculatorPage } from './components/ExtraPages';

const ScrollToTop = () => {
  const { pathname, key } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, key]);
  return null;
};

// Streamlined, natural storytelling Home Page sequence:
// 1. Hero -> 2. Stats -> 3. The Studio -> 4. Services -> 5. Curated Spaces -> 6. Before/After & Material Hotspots -> 7. Process -> 8. Leadership -> 9. Testimonials -> 10. Contact -> 11. Blog
const Home = () => (
  <main>
    <SEO />
    <HomeHero />
    <StatsBar />
    <About />
    <ServicesGrid />
    <FeaturedProjects />
    <TransformationShowcase />
    <ProcessTimeline showCta />
    <Team />
    <TestimonialSlider />
    <Contact showHero={false} />
    <BlogPreview />
  </main>
);

const AboutPage = () => (
  <main>
    <SEO
      title="About Us - Luxury Interior Designers in Dhaka"
      description="Learn about Brown's Interior, led by Engr. Aslam Sheikh. Over 10 years of experience delivering premium interior design, architecture, and turnkey construction across Bangladesh."
      canonicalPath="/about"
    />
    <PageHero title="About Us" sub="Designing beautiful spaces with quality and purpose." image="/portfolio/cover/cover-1.jpeg" />
    <StatsBar />
    <About full />
    <Team cream full />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <FloatingContact />
    </Router>
  );
}

export default App;
