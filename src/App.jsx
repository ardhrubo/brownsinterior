import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import {
  HomeHero, StatsBar, ServicesGrid, FeaturedProjects, TransformationShowcase,
  ProcessTimeline, TestimonialSlider, CostCTA, BlogPreview, SectionHead,
} from './components/HomeSections';
import SEO from './components/SEO';

const Team = lazy(() => import('./components/Team'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const ProjectsPage = lazy(() => import('./components/ProjectsPage'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const ServiceDetail = lazy(() => import('./components/ServiceDetail'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const NotFound = lazy(() => import('./components/NotFound'));
const ProcessPage = lazy(() => import('./components/ExtraPages').then((m) => ({ default: m.ProcessPage })));
const TestimonialsPage = lazy(() => import('./components/ExtraPages').then((m) => ({ default: m.TestimonialsPage })));
const BlogPage = lazy(() => import('./components/ExtraPages').then((m) => ({ default: m.BlogPage })));
const CostCalculatorPage = lazy(() => import('./components/ExtraPages').then((m) => ({ default: m.CostCalculatorPage })));

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
    <Suspense fallback={null}>
      <Team />
      <TestimonialSlider />
      <Contact showHero={false} />
      <BlogPreview />
    </Suspense>
  </main>
);

const AboutPage = () => (
  <main className="page-start-section">
    <SEO
      title="About Us - Luxury Interior Designers in Dhaka"
      description="Learn about Brown's Interior, led by Engr. Aslam Sheikh. Over 10 years of experience delivering premium interior design, architecture, and turnkey construction across Bangladesh."
      canonicalPath="/about"
    />
    <div className="container" style={{ marginBottom: '2rem' }}>
      <SectionHead
        eyebrow="Our Story & Leadership"
        title="About"
        script="Brown's Interior"
        sub="Designing and executing beautiful spaces with engineering precision, quality materials, and transparent accountability across Bangladesh."
      />
    </div>
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
      <Suspense fallback={<div style={{ minHeight: '70vh' }} />}>
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
          <Route path="/cost-calculator" element={<CostCalculatorPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingContact />
    </Router>
  );
}

export default App;
