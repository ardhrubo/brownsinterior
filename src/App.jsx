import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import {
  HomeHero, StatsBar, ServicesGrid, FeaturedProjects, TransformationShowcase,
  ProcessTimeline, TestimonialSlider, BlogPreview, SectionHead,
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
const CareersPage = lazy(() => import('./components/ExtraPages').then((m) => ({ default: m.CareersPage })));

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
      <Team cream />
      <TestimonialSlider />
      <Contact showHero={false} cream />
      <BlogPreview />
    </Suspense>
  </main>
);

const AboutPage = () => {
  const { isBn } = useLanguage();
  return (
    <main>
      <SEO
        title="About Us & Leadership Team"
        description="Meet Engr. Aslam Sheikh and the Brown's Interiors team in Uttara, Dhaka. 10+ years delivering turnkey interiors, architecture, and civil engineering."
        canonicalPath="/about"
      />
      <section className="section page-head-section">
        <div className="container">
          <SectionHead
            eyebrow={isBn ? 'আমাদের পরিচয় ও নেতৃত্ব' : 'Our Story & Leadership'}
            title={isBn ? 'পরিচিতি —' : 'About'}
            script="Brown's Interiors"
            as="h1"
            sub={
              isBn
                ? 'সঠিক ইঞ্জিনিয়ারিং প্ল্যানিং, ভালো মানের ম্যাটেরিয়াল এবং স্বচ্ছ বাজেটের মাধ্যমে আমরা গড়ে তুলি আপনার স্বপ্নের বাসা ও অফিস।'
                : 'Designing and executing beautiful spaces with engineering precision, quality materials, and transparent accountability across Bangladesh.'
            }
          />
        </div>
      </section>
      <StatsBar />
      <About full />
      <Team cream full />
      <ProcessTimeline />
    </main>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<div style={{ minHeight: '70vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<Navigate to="/about" replace />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/renovation" element={<Navigate to="/services/renovation-remodeling" replace />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/services/:categorySlug/:slug" element={<ServiceDetail />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/cost-estimator" element={<CostCalculatorPage />} />
            <Route path="/cost-calculator" element={<Navigate to="/cost-estimator" replace />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/career" element={<Navigate to="/careers" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <FloatingContact />
      </Router>
    </LanguageProvider>
  );
}

export default App;
