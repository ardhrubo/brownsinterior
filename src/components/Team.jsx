import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  UserRound,
  Award,
  ClipboardCheck,
  Laptop,
  Layers,
  TrendingUp,
  Hammer,
  Zap,
  Layers3,
  Paintbrush,
  Compass,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { teamMembers } from '../data/siteData';
import { SectionHead } from './HomeSections';
import './Team.css';

const iconMap = {
  Award,
  ClipboardCheck,
  Laptop,
  Layers,
  TrendingUp,
  Hammer,
  Zap,
  Layers3,
  Paintbrush,
  Compass,
};

function MemberCard({ member, index }) {
  const RoleIcon = iconMap[member.badgeIcon] || Award;

  return (
    <motion.article
      className="team-pro-card clay"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <div className="team-pro-avatar-wrap">
        <div className={`team-pro-avatar ${member.image ? 'has-image' : ''}`} aria-hidden={!member.image}>
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="team-pro-photo"
              loading="lazy"
            />
          ) : (
            <UserRound size={42} strokeWidth={1.4} />
          )}
        </div>
        <span className="team-pro-role-badge" title={member.role}>
          <RoleIcon size={15} strokeWidth={2} />
        </span>
      </div>

      <span className="team-pro-role">{member.role}</span>
      <h3 className="team-pro-name">{member.name}</h3>

      {member.qualifications && member.qualifications.length > 0 && (
        <div className="team-pro-creds" aria-label="Professional Credentials">
          {member.qualifications.map((q, idx) => {
            const isPortfolio =
              member.website &&
              (q.toLowerCase().includes('portfolio') || q.toLowerCase().includes('ardhrubo.dev'));

            if (isPortfolio) {
              return (
                <a
                  key={idx}
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-pro-cred-badge team-pro-cred-link"
                  title={`Visit ${member.name}'s portfolio`}
                >
                  <span>{q}</span>
                  <ExternalLink size={11} strokeWidth={2.4} />
                </a>
              );
            }

            return (
              <span key={idx} className="team-pro-cred-badge">
                {q}
              </span>
            );
          })}
        </div>
      )}

      <div className="team-pro-divider" aria-hidden="true" />
      <p className="team-pro-resp">{member.responsibilities}</p>
    </motion.article>
  );
}

export default function Team({ cream = false, full = false }) {
  const displayedMembers = full ? teamMembers : teamMembers.slice(0, 3);

  return (
    <section id="team" className={`section ${cream ? 'cream' : ''} team-section`}>
      <div className="container">
        <SectionHead
          eyebrow="Brown's Interiors"
          title={full ? 'All Professional' : 'Our Professional'}
          script="Team"
          sub={
            full
              ? 'Complete Directory of Interior Designers, Civil Engineers & Specialists'
              : 'Interior Design, Civil Structural Engineering & Systems Leadership'
          }
        />

        <div className="team-pro-grid">
          {displayedMembers.map((member, index) => (
            <MemberCard
              key={member.id || member.name}
              member={member}
              index={index}
            />
          ))}
        </div>

        {!full && (
          <div className="team-more-wrap">
            <Link
              to="/about#team"
              className="pill-btn dark"
              id="team-view-all-about-btn"
            >
              <span>View All Team Members on About Page</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
