import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Clock, Calendar, ShieldCheck, Copy, Check,
  ChevronDown, ArrowUpRight, Sparkles, CheckCircle2, Play, Calculator,
  Phone, MessageSquare, ExternalLink, Bookmark, Layers
} from 'lucide-react';
import { FaWhatsapp, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import SEO from './SEO';
import NotFound from './NotFound';
import { blogPosts, getBlogPostBySlug } from '../data/blogData';
import { BlogCard } from './HomeSections';
import './BlogPost.css';

const SITE_URL = 'https://www.brownsinterior.com';

/**
 * Rich Text Parser:
 * Transforms markdown-style [Anchor Text](/path), **bold**, and *italic*
 * into styled interactive React elements without external heavy parser dependencies.
 */
function renderRichText(content) {
  if (!content) return null;
  if (typeof content !== 'string') return content;

  // Split by markdown link pattern: [label](url)
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const nodes = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(parseFormatting(content.substring(lastIndex, match.index), `txt-${lastIndex}`));
    }

    const label = match[1];
    const url = match[2];
    const isInternal = url.startsWith('/');
    const key = `link-${match.index}`;

    if (isInternal) {
      nodes.push(
        <Link
          key={key}
          to={url}
          className="blog-inline-link"
          title={`Explore ${label} at Brown’s Interior`}
        >
          <span>{label}</span>
          <ArrowUpRight className="inline-arrow" size={13} />
        </Link>
      );
    } else {
      nodes.push(
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-inline-link"
          title={`Visit ${label}`}
        >
          <span>{label}</span>
          <ExternalLink className="inline-arrow" size={13} />
        </a>
      );
    }

    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < content.length) {
    nodes.push(parseFormatting(content.substring(lastIndex), `txt-end`));
  }

  return nodes.length === 1 ? nodes[0] : nodes;
}

function parseFormatting(text, keyPrefix) {
  // Simple bold **text** parser
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${keyPrefix}-b-${idx}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={`${keyPrefix}-i-${idx}`}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function AuthorAvatar({ author, size = 52, isBio = false }) {
  if (author?.avatar) {
    return (
      <img
        src={author.avatar}
        alt={author.name || 'Engr. Aslam Sheikh'}
        className={isBio ? 'blog-author-bio-avatar' : 'blog-author-avatar'}
      />
    );
  }

  // Prestigious Executive Monogram Seal for Engr. Aslam Sheikh
  return (
    <div
      className={`blog-author-crest-avatar ${isBio ? 'bio-crest' : ''}`}
      style={{ width: size, height: size }}
      title={author?.name || 'Engr. Aslam Sheikh · Founder & Principal Designer'}
      aria-label={author?.name || 'Engr. Aslam Sheikh'}
    >
      <div className="blog-author-crest-inner">
        <span className="blog-author-initials">AS</span>
      </div>
      <span className="blog-author-crest-badge" title="Certified Engineering Lead">
        <ShieldCheck size={isBio ? 15 : 11} strokeWidth={2.4} />
      </span>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = useMemo(() => getBlogPostBySlug(slug), [slug]);
  const others = useMemo(
    () => blogPosts.filter((p) => p.slug !== post?.slug),
    [post]
  );

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTocId, setActiveTocId] = useState('');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll listener for reading progress bar and TOC scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }

      // Scrollspy: detect active TOC section
      if (post?.tableOfContents && post.tableOfContents.length > 0) {
        const tocIds = post.tableOfContents.map((t) => t.id);
        let currentActive = '';
        for (const id of tocIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 180) {
              currentActive = id;
            }
          }
        }
        if (currentActive) {
          setActiveTocId(currentActive);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const handleCopyLink = useCallback(() => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 95;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveTocId(id);
      setMobileTocOpen(false);
    }
  };

  if (!post) {
    return <NotFound />;
  }

  // Schema Generation for BlogPosting + FAQPage
  const toAbsoluteUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: [toAbsoluteUrl(post.image)],
    datePublished: post.publishDateISO || '2026-10-20T09:00:00+06:00',
    dateModified: post.publishDateISO || '2026-10-20T09:00:00+06:00',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Engr. Aslam Sheikh',
      jobTitle: post.author?.role || 'Founder & Principal Designer',
      image: post.author?.avatar ? toAbsoluteUrl(post.author.avatar) : `${SITE_URL}/team/engr-aslam-sheikh.jpg`,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: "Brown's Interior",
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.jpg`,
      },
    },
    keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : undefined,
  };

  const faqSchema =
    Array.isArray(post.faqs) && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  const dynamicSchemas = faqSchema ? [blogPostingSchema, faqSchema] : [blogPostingSchema];

  const shareUrl = encodeURIComponent(`${SITE_URL}/blog/${post.slug}`);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <main className="blog-article-page">
      {/* Top Reading Progress Bar */}
      <div
        className="blog-reading-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <SEO
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        schema={dynamicSchemas}
      />

      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="blog-breadcrumb-sep">/</span>
          <Link to="/blog">Blog</Link>
          <span className="blog-breadcrumb-sep">/</span>
          {post.categorySlug ? (
            <Link to={`/services/${post.categorySlug}`}>{post.category}</Link>
          ) : (
            <span>{post.category}</span>
          )}
          <span className="blog-breadcrumb-sep">/</span>
          <span className="current">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="blog-header">
          <div className="blog-meta-tags">
            <span className="blog-cat-badge">{post.category}</span>
            <span className="blog-read-badge">
              <Clock size={14} /> {post.readTime || '8 min read'}
            </span>
            <span className="blog-date-badge">
              <Calendar size={14} /> {post.date}
            </span>
          </div>

          <h1 className="blog-main-title">{post.title}</h1>
          {post.subtitle && <p className="blog-subtitle">{post.subtitle}</p>}

          {/* Author Byline Bar */}
          <div className="blog-author-byline">
            <div className="blog-author-info">
              <AuthorAvatar author={post.author} size={50} />
              <div className="blog-author-text">
                <strong>
                  {post.author?.name || 'Engr. Aslam Sheikh'}
                  <ShieldCheck size={16} className="blog-author-badge-icon" title="Verified Engineering Lead" />
                </strong>
                <span>{post.author?.role || 'Founder & Principal Designer'} · Brown’s Interior Studio</span>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="blog-share-actions">
              <span className="blog-share-label">Share:</span>
              <a
                href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-share-btn whatsapp"
                title="Share on WhatsApp"
              >
                <FaWhatsapp size={16} />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-share-btn facebook"
                title="Share on Facebook"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-share-btn linkedin"
                title="Share on LinkedIn"
              >
                <FaLinkedinIn size={14} />
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="blog-share-btn copy"
                title={copiedLink ? 'Link Copied!' : 'Copy Article Link'}
              >
                {copiedLink ? <Check size={15} style={{ color: '#25d366' }} /> : <Copy size={15} />}
              </button>
            </div>
          </div>
        </header>

        {/* Featured Hero Media */}
        <div className="blog-hero-image-wrap">
          <img
            src={post.image}
            alt={post.title}
            className="blog-hero-image"
            loading="eager"
          />
          {post.imageCaption && (
            <div className="blog-hero-caption">
              <Sparkles size={14} style={{ color: '#a88a66', flexShrink: 0 }} />
              <span>{post.imageCaption}</span>
            </div>
          )}
        </div>

        {/* Main Layout Grid (Content + Sticky Sidebar) */}
        <div className="blog-layout-grid">
          {/* Main Article Body */}
          <article className="blog-article-content">
            {/* Mobile Collapsible Table of Contents */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="blog-mobile-toc">
                <div
                  className="blog-mobile-toc-header"
                  onClick={() => setMobileTocOpen(!mobileTocOpen)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bookmark size={16} style={{ color: '#a88a66' }} />
                    Table of Contents
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: mobileTocOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </div>
                {mobileTocOpen && (
                  <ul className="blog-mobile-toc-list">
                    {post.tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => scrollToSection(e, item.id)}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Introduction Paragraphs */}
            <div className="blog-intro-lead">
              {Array.isArray(post.intro) && post.intro.length > 0 ? (
                post.intro.map((para, i) => (
                  <p key={i}>{renderRichText(para)}</p>
                ))
              ) : Array.isArray(post.body) && post.body.length > 0 ? (
                post.body.map((para, i) => (
                  <p key={i}>{renderRichText(para)}</p>
                ))
              ) : null}
            </div>

            {/* Detailed Content Sections */}
            {Array.isArray(post.sections) &&
              post.sections.map((section, idx) => (
                <section
                  key={section.id || idx}
                  id={section.id}
                  className="blog-section-block"
                >
                  <div className="blog-section-header">
                    {section.number && (
                      <span className="blog-section-num">{section.number}</span>
                    )}
                    <h2 className="blog-section-title">{section.title}</h2>
                    {section.lead && (
                      <p className="blog-section-lead">{section.lead}</p>
                    )}
                  </div>

                  <div className="blog-section-body">
                    {Array.isArray(section.paragraphs) &&
                      section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{renderRichText(p)}</p>
                      ))}

                    {/* Pro-Tip Callout Box */}
                    {section.proTip && (
                      <div className="blog-protip">
                        <div className="blog-protip-head">
                          <Sparkles size={16} />
                          <span>{section.proTip.title || 'Studio Engineering Insight'}</span>
                        </div>
                        <p>{renderRichText(section.proTip.text)}</p>
                      </div>
                    )}

                    {/* Inline Section Image */}
                    {section.inlineImage && section.inlineImage.src && (
                      <div className="blog-section-image-card">
                        <img
                          src={section.inlineImage.src}
                          alt={section.inlineImage.alt || section.title}
                          className="blog-section-image"
                          loading="lazy"
                        />
                        {section.inlineImage.caption && (
                          <div className="blog-section-image-caption">
                            {section.inlineImage.caption}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Key Takeaways Checklist */}
                    {Array.isArray(section.keyTakeaways) && section.keyTakeaways.length > 0 && (
                      <div className="blog-takeaways">
                        <div className="blog-takeaways-title">Key Architectural Takeaways:</div>
                        <ul className="blog-takeaways-list">
                          {section.keyTakeaways.map((point, kIdx) => (
                            <li key={kIdx}>
                              <CheckCircle2 size={16} className="blog-takeaways-icon" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Mid-Article Cost Calculator CTA Banner (inserted right after Section 3) */}
                  {idx === 2 && post.midArticleCta && (
                    <div className="blog-mid-cta-banner">
                      <div className="blog-mid-cta-badge">
                        <Calculator size={13} />
                        {post.midArticleCta.badge || 'Instant Planning Tool'}
                      </div>
                      <h3 className="blog-mid-cta-title">{post.midArticleCta.title}</h3>
                      <p className="blog-mid-cta-sub">{post.midArticleCta.subtitle}</p>
                      <div className="blog-mid-cta-actions">
                        <Link
                          to={post.midArticleCta.buttonLink || '/cost-estimator'}
                          className="blog-cta-pill-btn"
                        >
                          <Calculator size={16} />
                          {post.midArticleCta.buttonText || 'Open Cost Calculator'}
                          <ArrowUpRight size={16} />
                        </Link>
                        {post.midArticleCta.secondaryText && (
                          <span className="blog-mid-cta-hint">
                            {post.midArticleCta.secondaryText}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              ))}

            {/* Video Showcase Section */}
            {post.videoSection && (
              <section id="video-showcase" className="blog-video-showcase">
                <div className="blog-video-header">
                  <span className="blog-cat-badge" style={{ marginBottom: '0.75rem' }}>
                    <Play size={12} fill="currentColor" /> Featured Video
                  </span>
                  <h3 className="blog-video-title">{post.videoSection.title}</h3>
                  <p className="blog-video-sub">{post.videoSection.subtitle}</p>
                </div>

                <div className="blog-video-container">
                  {isPlayingVideo ? (
                    <iframe
                      src={`${post.videoSection.videoUrl}?autoplay=1`}
                      title={post.videoSection.title}
                      className="blog-video-iframe"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div
                      className="blog-video-play-overlay"
                      onClick={() => setIsPlayingVideo(true)}
                    >
                      <img
                        src={post.videoSection.previewImage || post.image}
                        alt={post.videoSection.title}
                        className="blog-video-thumbnail"
                      />
                      <div className="blog-video-play-btn">
                        <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />
                      </div>
                      <span className="blog-video-play-text">Click to Play Walkthrough</span>
                      {post.videoSection.duration && (
                        <span className="blog-video-duration">
                          {post.videoSection.duration}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {Array.isArray(post.videoSection.highlights) && (
                  <div className="blog-video-highlights">
                    {post.videoSection.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="blog-video-hl-item">
                        <span className="blog-video-hl-dot" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* FAQ Accordion Section */}
            {Array.isArray(post.faqs) && post.faqs.length > 0 && (
              <section id="faqs" className="blog-faqs-section">
                <div className="blog-faqs-header">
                  <span className="blog-cat-badge" style={{ marginBottom: '0.6rem' }}>
                    Engineering Insights
                  </span>
                  <h3 className="blog-faqs-title">Frequently Asked Questions</h3>
                  <p className="blog-faqs-sub">
                    Direct answers by Engr. Aslam Sheikh regarding costs, execution timelines, and materials in Bangladesh.
                  </p>
                </div>

                <div className="blog-faq-list">
                  {post.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div
                        key={fIdx}
                        className={`blog-faq-item ${isOpen ? 'open' : ''}`}
                      >
                        <button
                          type="button"
                          className="blog-faq-trigger"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : fIdx)}
                          aria-expanded={isOpen}
                        >
                          <span>{faq.question}</span>
                          <ChevronDown size={18} className="blog-faq-chevron" />
                        </button>
                        {isOpen && (
                          <div className="blog-faq-body">
                            <p>{renderRichText(faq.answer)}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Author Bio Box */}
            <div className="blog-author-bio-card">
              <AuthorAvatar author={post.author} size={84} isBio />
              <div className="blog-author-bio-content">
                <h4>{post.author?.name || 'Engr. Aslam Sheikh'}</h4>
                <span className="blog-author-bio-role">
                  {post.author?.role || 'Founder & Principal Designer'} · {post.author?.qualification || 'B.Sc. Civil Engineering'}
                </span>
                <p className="blog-author-bio-text">
                  {post.author?.bio ||
                    'With over a decade of leadership in structural engineering and luxury interior execution, Engr. Aslam Sheikh has spearheaded 250+ turnkey residential, commercial, and trade fair projects across Dhaka and throughout Bangladesh.'}
                </p>
                <Link to="/about" className="blog-author-bio-link">
                  Learn more about our studio leadership <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Bottom Conversion Lead-Capture Card */}
            {post.bottomCta && (
              <div className="blog-bottom-conversion">
                <span className="blog-bottom-eyebrow">
                  {post.bottomCta.eyebrow || 'Consultation & Inquiries'}
                </span>
                <h3 className="blog-bottom-title">{post.bottomCta.title}</h3>
                <p className="blog-bottom-sub">{post.bottomCta.subtitle}</p>
                <div className="blog-bottom-buttons">
                  <Link
                    to={post.bottomCta.primaryBtn?.link || '/contact'}
                    className="blog-btn-primary"
                  >
                    <MessageSquare size={16} />
                    {post.bottomCta.primaryBtn?.text || 'Schedule Free Consultation'}
                  </Link>
                  <a
                    href={post.bottomCta.secondaryBtn?.link || 'https://wa.me/8801768436319'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-btn-whatsapp"
                  >
                    <FaWhatsapp size={19} className="wa-icon" />
                    <span>{post.bottomCta.secondaryBtn?.text || 'WhatsApp Engr. Aslam'}</span>
                  </a>
                </div>
                <div className="blog-bottom-phone">
                  <span>Prefer to speak directly? Call us: </span>
                  <a href="tel:+8801768436319">+880 1768-436319</a>
                </div>
              </div>
            )}
          </article>

          {/* Sticky Desktop Sidebar */}
          <aside className="blog-sticky-sidebar">
            {/* Desktop Table of Contents */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="blog-sidebar-widget blog-sidebar-toc-widget">
                <div className="blog-sidebar-title">
                  <Bookmark size={14} /> Table of Contents
                </div>
                <nav className="blog-toc-nav" aria-label="Table of contents">
                  {post.tableOfContents.map((item) => {
                    const isActive = activeTocId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`blog-toc-link ${isActive ? 'active' : ''}`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Quick Cost Estimator Sidebar Widget */}
            <div className="blog-sidebar-widget blog-sidebar-cta">
              <span className="blog-cat-badge" style={{ marginBottom: '0.65rem' }}>
                <Calculator size={12} /> Instant Estimator
              </span>
              <h4>Planning a Project?</h4>
              <p>
                Calculate your customized BDT budget estimate in under 30 seconds with our interactive tool.
              </p>
              <Link to="/cost-estimator" className="blog-sidebar-btn">
                <Calculator size={15} /> Calculate Project Cost
              </Link>
            </div>

            {/* Direct WhatsApp Consultation with Engr. Aslam Sheikh */}
            <div className="blog-sidebar-widget blog-sidebar-consult-card" style={{ textAlign: 'center' }}>
              <div className="blog-sidebar-lead-profile">
                <div className="blog-sidebar-lead-avatar">
                  <img
                    src="/team/engr-aslam-sheikh.jpg"
                    alt="Engr. Aslam Sheikh - Founder & Principal Designer"
                    className="blog-sidebar-lead-img"
                  />
                  <span className="blog-sidebar-lead-badge" title="Certified IEB Engineer">
                    <ShieldCheck size={12} strokeWidth={2.4} />
                  </span>
                </div>
                <h5 className="blog-sidebar-lead-name">Engr. Aslam Sheikh</h5>
                <span className="blog-sidebar-lead-role">Founder & Principal Designer</span>
                <span className="blog-sidebar-lead-qual">B.Sc. Civil Engg. · IEB A29734</span>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#5a544e', margin: '0.85rem 0 1rem', lineHeight: 1.5 }}>
                Have questions regarding floor layouts, BOQ rates, or structural renovation?
              </p>
              <a
                href="https://wa.me/8801768436319?text=Hello%20Brown%E2%80%99s%20Interior%2C%20I%20am%20reading%20your%20blog%20and%20would%20like%20to%20consult%20regarding%20my%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="blog-sidebar-wa-btn"
              >
                <FaWhatsapp size={17} className="wa-icon" />
                <span>WhatsApp Engr. Aslam</span>
              </a>
            </div>

            {/* Mini Related Articles in Sidebar */}
            {others.length > 0 && (
              <div className="blog-sidebar-widget">
                <div className="blog-sidebar-title">
                  <Layers size={14} /> More Articles
                </div>
                <div className="blog-sidebar-related">
                  {others.slice(0, 3).map((otherPost) => (
                    <Link
                      key={otherPost.slug}
                      to={`/blog/${otherPost.slug}`}
                      className="blog-mini-card"
                    >
                      <img
                        src={otherPost.image}
                        alt={otherPost.title}
                        className="blog-mini-img"
                      />
                      <div className="blog-mini-info">
                        <h5>{otherPost.title}</h5>
                        <span>{otherPost.readTime || otherPost.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Bottom Related Articles Section */}
      {others.length > 0 && (
        <section className="blog-related-section">
          <div className="container">
            <div className="blog-related-head">
              <span className="sec-eyebrow">Explore More Insights</span>
              <h2 className="sec-title">
                Related <em>Articles & Guides</em>
              </h2>
              <p className="sec-sub">
                Engineering-led interior design, commercial stall architecture, and renovation benchmarks in Bangladesh.
              </p>
            </div>
            <div className="blog-related-grid">
              {others.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
