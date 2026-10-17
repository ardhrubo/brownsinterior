import React, { useEffect } from 'react';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Phone, Calculator, PencilRuler, BadgeCheck, Wallet, Users } from 'lucide-react';
import { servicesData, getService } from '../data/servicesData';
import { PageHero, SectionHead, CostCTA } from './HomeSections';
import '../styles/site.css';
import './ServiceDetail.css';

const why = [
  { icon: PencilRuler, title: 'Creative Design', text: 'Thoughtful, functional designs tailored to your needs.' },
  { icon: Users, title: 'Engineering Expertise', text: 'Led by Engr. Aslam Sheikh — design backed by technical knowledge.' },
  { icon: BadgeCheck, title: 'Quality Materials', text: 'Attention to detail and materials that last.' },
  { icon: Wallet, title: 'Budget Clarity', text: 'Transparent costing that respects your vision and budget.' },
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const { hash } = useLocation();
  const service = getService(slug);
  if (!service) return <Navigate to="/services" replace />;

  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 110,
          behavior: 'smooth'
        });
      }
    }, 150);
    return () => clearTimeout(t);
  }, [hash, slug]);

  const Icon = service.icon;
  const others = servicesData.filter((s) => s.slug !== slug);

  return (
    <main>
      <PageHero title={service.shortTitle || service.title} sub={service.description} image={service.image} crumb={<><Link to="/services">Services</Link> &nbsp;/&nbsp; {service.shortTitle || service.title}</>} />

      {/* Overview */}
      <section className="section">
        <div className="container sd-overview">
          <motion.div className="sd-text" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="sd-icon"><Icon size={28} strokeWidth={1.6} /></div>
            <span className="sec-eyebrow">Service {service.number}</span>
            <h2 className="sec-title">{service.title}</h2>
            <p className="sd-intro">{service.intro}</p>
            <ul className="sd-checks">
              {service.items.map((it) => (
                <li key={it}>
                  <a href={`#${it.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'inherit' }}>
                    <span><Check size={13} /></span>
                    {it}
                  </a>
                </li>
              ))}
            </ul>
            <div className="sd-actions">
              <Link to="/contact" className="pill-btn" id="sd-quote"><Phone size={16} /> Get a Free Quote</Link>
              <Link to="/cost-estimator" className="pill-btn outline" id="sd-calc"><Calculator size={16} /> Estimate Cost</Link>
            </div>
          </motion.div>
          <motion.div className="sd-collage" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            {service.gallery.map((g, k) => <img key={g} src={g} alt={`${service.title} ${k + 1}`} loading="lazy" className={`c${k}`} />)}
          </motion.div>
        </div>
      </section>

      {/* What's included */}
      <section className="section cream" id="included-options">
        <div className="container">
          <SectionHead eyebrow="What's Included" title="Our" script={service.shortTitle || service.title} sub="Every service is tailored to your space, needs and budget." />
          <div className="sd-items">
            {service.items.map((it, k) => (
              <motion.div
                key={it}
                id={it.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                className="sd-item clay"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (k % 3) * 0.1 }}
              >
                <span className="sd-item-num">{String(k + 1).padStart(2, '0')}</span>
                <h3>{it}</h3>
                <p>{service.itemDesc?.[k]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Why Brown's Interior" title="Why Choose" script="Us" />
          <div className="grid-4">
            {why.map((w, k) => {
              const W = w.icon;
              return (
                <motion.div key={w.title} className="sd-why" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.1 }}>
                  <div className="sd-why-icon"><W size={24} strokeWidth={1.6} /></div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="section cream">
        <div className="container">
          <SectionHead eyebrow="Explore More" title="Other" script="Services" />
          <div className="sd-others">
            {others.map((s) => {
              const O = s.icon;
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="sd-other clay">
                  <div className="sd-other-img"><img src={s.gallery[0]} alt={s.title} loading="lazy" /></div>
                  <div className="sd-other-body">
                    <O size={20} />
                    <h3>{s.shortTitle || s.title}</h3>
                    <ArrowRight size={16} className="sd-arrow" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CostCTA />
    </main>
  );
}
