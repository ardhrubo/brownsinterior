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
  Globe,
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { teamMembers } from '../data/siteData';
import { SectionHead } from './HomeSections';
import './Team.css';

const profileLinks = [
  { field: 'website', label: 'Website', Icon: Globe },
  { field: 'linkedin', label: 'LinkedIn', Icon: FaLinkedinIn },
  { field: 'github', label: 'GitHub', Icon: FaGithub },
];

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
          {member.qualifications.map((qualification) => (
            <span key={qualification} className="team-pro-cred-badge">
              {qualification}
            </span>
          ))}
        </div>
      )}

      {profileLinks.some(({ field }) => member[field]) && (
        <div className="team-pro-socials" role="group" aria-label={`${member.name}'s profile links`}>
          {profileLinks.filter(({ field }) => member[field]).map(({ field, label, Icon }) => (
            <a
              key={field}
              href={member[field]}
              target="_blank"
              rel="noopener noreferrer"
              className="team-pro-social-link"
              aria-label={`${member.name} — ${label}`}
              title={label}
            >
              <Icon size={18} aria-hidden="true" />
            </a>
          ))}
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
