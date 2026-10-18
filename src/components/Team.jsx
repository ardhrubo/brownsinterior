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
        <div className="team-pro-avatar" aria-hidden="true">
          <UserRound size={42} strokeWidth={1.4} />
        </div>
        <span className="team-pro-role-badge" title={member.role}>
          <RoleIcon size={15} strokeWidth={2} />
        </span>
      </div>

      <span className="team-pro-role">{member.role}</span>
      <h3 className="team-pro-name">{member.name}</h3>
      <div className="team-pro-divider" aria-hidden="true" />
      <p className="team-pro-resp">{member.responsibilities}</p>
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

        <div className="team-pro-grid">
          {homeMembers.map((member, index) => (
            <MemberCard
              key={member.id || member.name}
              member={member}
              index={index}
            />
          ))}
        </div>

        {full && restMembers.length > 0 && (
          <div className="team-rest-block">
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
