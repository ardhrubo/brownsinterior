import React from 'react';
import { motion } from 'framer-motion';
import { UserRound, Award, Briefcase, Compass, Mail } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { SectionHead } from './HomeSections';
import './Team.css';

const team = [
  {
    name: 'Engr. Aslam Sheikh',
    role: 'CEO & Founder',
    specialty: 'Structural Engineering & Turnkey Execution',
    bio: 'Leads structural safety, engineering supervision, and turnkey project delivery across residential and commercial developments.',
    badgeIcon: Award,
    email: 'mailto:brownsinterior.bd@gmail.com',
  },
  {
    name: 'Md. Kaisar Hamid',
    role: 'Director / Head of Operation',
    specialty: 'Project Coordination & Procurement',
    bio: 'Oversees site operations, vendor logistics, material quality assurance, and milestone-based handover schedules.',
    badgeIcon: Briefcase,
    email: 'mailto:brownsinterior.bd@gmail.com',
  },
  {
    name: 'Ahmed Jamil Rahul',
    role: 'Director / Head of Design',
    specialty: 'Interior Architecture & 3D Visualization',
    bio: 'Directs spatial planning, bespoke furniture concepts, lighting schemes, and photorealistic 3D visualizations.',
    badgeIcon: Compass,
    email: 'mailto:brownsinterior.bd@gmail.com',
  },
];

export default function Team({ cream = false }) {
  return (
    <section id="team" className={`section ${cream ? 'cream' : ''} team-section`}>
      <div className="container">
        <SectionHead
          eyebrow="Leadership"
          title="Meet Our"
          script="Experts"
          sub="The engineering, operations, and design leadership behind every Brown's Interior project."
        />

        <div className="team-grid">
          {team.map((member, index) => {
            const BadgeIcon = member.badgeIcon;
            return (
              <motion.article
                key={member.name}
                className="team-card clay"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
              >
                <div className="team-avatar-wrap">
                  <div className="team-avatar-circle" aria-hidden="true">
                    <UserRound size={44} strokeWidth={1.5} />
                  </div>
                  <span className="team-role-badge" title={member.specialty}>
                    <BadgeIcon size={15} strokeWidth={1.8} />
                  </span>
                </div>

                <div className="team-info">
                  <span className="team-role">{member.role}</span>
                  <h3 className="team-name">{member.name}</h3>
                  <span className="team-specialty">{member.specialty}</span>
                  <p className="team-bio">{member.bio}</p>
                </div>

                <div className="team-socials">
                  <a href={member.email} aria-label={`Email ${member.name}`} title="Email">
                    <Mail size={15} />
                    <span>Contact</span>
                  </a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label={`${member.name} LinkedIn`} title="LinkedIn">
                    <FaLinkedin size={15} />
                    <span>Profile</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

