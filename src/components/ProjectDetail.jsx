import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calculator, Check, Phone } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { projectCaseStudies } from '../data/projectCaseStudies';
import { findServiceOrOption } from '../data/servicesData';
import SEO from './SEO';
import { SITE_URL } from '../lib/site-url';
import NotFound from './NotFound';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === parseInt(id, 10));

  if (!project) {
    return <NotFound message="We could not find the interior project you requested." />;
  }

  const study = projectCaseStudies[project.id] || null;
  const relatedServices = (study?.relatedServiceSlugs || [])
    .map((s) => findServiceOrOption(s)?.data)
    .filter(Boolean);
  const otherProjects = projectsData.filter((p) => p.id !== project.id).slice(0, 3);

  const projectImg = project.coverImage || project.image || '/og-image.jpg';
  const projectTitle = study?.seoTitle || `${project.title} — ${project.location}`;
  const projectDesc = study?.seoDescription || project.description;

  const projectSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: projectDesc,
      image: projectImg.startsWith('http') ? projectImg : `${SITE_URL}${projectImg}`,
      url: `${SITE_URL}/project/${project.id}`,
      creator: { '@id': `${SITE_URL}/#organization` },
      locationCreated: project.location ? { '@type': 'Place', name: project.location } : undefined,
      dateCreated: project.year,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
        { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE_URL}/project/${project.id}` },
      ],
    },
  ];

  return (
    <main style={{ minHeight: '100vh' }}>
      <SEO
        title={projectTitle}
        description={projectDesc}
        canonicalPath={`/project/${project.id}`}
        image={projectImg}
        schema={projectSchemas}
      />
      <section className="section page-head-section">
        <div className="container">
          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.25rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              fontSize: '0.82rem',
              letterSpacing: '1.5px',
              fontWeight: '600',
            }}
          >
            <ArrowLeft size={16} /> Back to All Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ marginBottom: '0.5rem' }}>
              <span
                style={{
                  color: 'var(--gold-dark)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                }}
              >
                {project.category}
              </span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.85rem, 4.5vw, 3.2rem)',
                color: '#1a1a1a',
                marginBottom: 0,
                lineHeight: '1.18',
              }}
            >
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '3.25rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem',
                padding: '1.25rem 1.5rem',
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e5dfd8',
              }}
            >
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Client
                </p>
                <p style={{ fontWeight: '600', fontSize: '0.96rem' }}>{project.client}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Location
                </p>
                <p style={{ fontWeight: '600', fontSize: '0.96rem' }}>{project.location}</p>
              </div>
              {project.area && (
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Area
                  </p>
                  <p style={{ fontWeight: '600', fontSize: '0.96rem' }}>{project.area}</p>
                </div>
              )}
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Year
                </p>
                <p style={{ fontWeight: '600', fontSize: '0.96rem' }}>{project.year}</p>
              </div>
              {study?.timeline && (
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Timeline
                  </p>
                  <p style={{ fontWeight: '600', fontSize: '0.96rem' }}>{study.timeline}</p>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <img
                src={project.image}
                alt={`${project.title} — ${project.category} in ${project.location}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '64vh',
                  objectFit: 'cover',
                  borderRadius: '16px',
                }}
              />
            </div>

            <div style={{ maxWidth: '860px', margin: '0 auto 3rem auto' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)', marginBottom: '0.85rem' }}>
                Project Overview
              </h2>
              <p style={{ fontSize: '1.02rem', color: '#444', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                {project.description}
              </p>

              {study && (
                <>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '0.55rem' }}>
                    Design Brief &amp; Site Context
                  </h3>
                  <p style={{ fontSize: '0.98rem', color: '#4a433d', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                    {study.brief}
                  </p>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '0.55rem' }}>
                    Architectural &amp; Engineering Execution
                  </h3>
                  <p style={{ fontSize: '0.98rem', color: '#4a433d', lineHeight: '1.8', marginBottom: '1.75rem' }}>
                    {study.solution}
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '1.25rem',
                    }}
                  >
                    <div style={{ padding: '1.4rem', background: 'var(--cream, #f9f6f1)', borderRadius: '14px', border: '1px solid #e5dfd8' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.12rem', marginBottom: '0.85rem' }}>
                        Materials &amp; Finishes Specified
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {study.materials.map((mat) => (
                          <li key={mat} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.92rem', color: '#3f3934', lineHeight: '1.55' }}>
                            <Check size={15} style={{ color: 'var(--gold-dark)', flexShrink: 0, marginTop: '3px' }} />
                            <span>{mat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ padding: '1.4rem', background: 'var(--cream, #f9f6f1)', borderRadius: '14px', border: '1px solid #e5dfd8' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.12rem', marginBottom: '0.85rem' }}>
                        Key Delivery Highlights
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {study.highlights.map((hl) => (
                          <li key={hl} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.92rem', color: '#3f3934', lineHeight: '1.55' }}>
                            <Check size={15} style={{ color: 'var(--gold-dark)', flexShrink: 0, marginTop: '3px' }} />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)', marginBottom: '1.25rem', textAlign: 'center' }}>
                Project Gallery
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {project.gallery.map((img, idx) => {
                  const caption = study?.galleryCaptions?.[idx] || `${project.title} — View ${idx + 1}`;
                  return (
                    <figure key={idx} style={{ margin: 0 }}>
                      <img
                        src={img}
                        alt={caption}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          borderRadius: '14px',
                          display: 'block',
                        }}
                      />
                      <figcaption style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.5' }}>
                        {caption}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>

            {relatedServices.length > 0 && (
              <div style={{ maxWidth: '860px', margin: '0 auto 2.5rem auto', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '0.9rem' }}>
                  Services Behind This Project
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.65rem' }}>
                  {relatedServices.map((srv) => (
                    <Link
                      key={srv.slug}
                      to={`/services/${srv.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.55rem 1rem',
                        borderRadius: '999px',
                        background: 'var(--cream, #f9f6f1)',
                        border: '1px solid #e5dfd8',
                        color: 'var(--text-color)',
                        fontSize: '0.88rem',
                        fontWeight: '500',
                      }}
                    >
                      {srv.title} <ArrowUpRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <Link to="/cost-estimator" className="pill-btn dark">
                <Calculator size={16} /> Estimate Similar Cost
              </Link>
              <Link to="/contact" className="pill-btn">
                <Phone size={16} /> Book Free Consultation
              </Link>
            </div>

            <div style={{ borderTop: '1px solid #e5dfd8', paddingTop: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                Explore More Completed Projects
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.15rem' }}>
                {otherProjects.map((other) => (
                  <Link
                    key={other.id}
                    to={`/project/${other.id}`}
                    style={{
                      display: 'block',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: '1px solid #e5dfd8',
                      background: '#ffffff',
                      color: 'inherit',
                    }}
                  >
                    <img
                      src={other.image}
                      alt={`${other.title} in ${other.location}`}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '170px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: '1rem' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                        {other.category} · {other.area}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.08rem', margin: '0 0 0.25rem' }}>
                        {other.title}
                      </h3>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{other.location}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
