import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Award,
  ClipboardCheck,
  Laptop,
  Layers,
  TrendingUp,
  Hammer,
  Zap,
  Layers3,
  Paintbrush,
  ArrowRight,
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
};

function getInitials(name = '') {
  const cleaned = name.replace(/^Engr\.\s*/i, '').trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function MemberCard({ member, index, isFeatured = false }) {
  const RoleIcon = iconMap[member.badgeIcon] || Award;
  const initials = getInitials(member.name);

  return (
    <motion.article
      className={`team-pro-card ${isFeatured ? 'is-founder' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
    >
      <div className="team-pro-top">
        <div className="team-pro-avatar">
          <span>{initials}</span>
        </div>
        <div className="team-pro-badges">
          <span className="team-pro-dept">{member.categoryLabel}</span>
          <div className="team-pro-icon" aria-hidden="true">
            <RoleIcon size={16} strokeWidth={1.8} />
          </div>
        </div>
      </div>

      <div className="team-pro-body">
        <span className="team-pro-role">{member.role}</span>
        <h3 className="team-pro-name">{member.name}</h3>
        <p className="team-pro-resp">{member.responsibilities}</p>
      </div>
    </motion.article>
  );
}

export default function Team({ cream = false, full = false }) {
  const homeMembers = teamMembers.slice(0, 3);
  const restMembers = teamMembers.slice(3);

  return (
    <section id="team" className={`section ${cream ? 'cream' : ''} team-section`}>
      <div className="container">
        <SectionHead
          eyebrow="Brown's Interiors"
          title="Our Professional"
          script="Team"
          sub="Interior Design & Execution"
        />

        {/* Top 3 Core Members (Always shown on Home & About) */}
        <div className="team-pro-grid">
          {homeMembers.map((member, index) => (
            <MemberCard
              key={member.id || member.name}
              member={member}
              index={index}
              isFeatured={index === 0}
            />
          ))}
        </div>

        {/* Rest of the Team (Shown on About page) */}
        {full && restMembers.length > 0 && (
          <div className="team-rest-block">
            <div className="team-rest-divider">
              <span>Design, Visualization &amp; Execution Specialists</span>
            </div>
            <div className="team-pro-grid">
              {restMembers.map((member, index) => (
                <MemberCard
                  key={member.id || member.name}
                  member={member}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {!full && (
          <div className="team-more-wrap">
            <Link to="/about" className="pill-btn dark">
              View All Team Members <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
