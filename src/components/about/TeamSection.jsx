import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ABOUT_TEAM_DATA } from '../../data/aboutData';
import { fadeUpVariant } from '../../utils/motion';

export const TeamSection = () => {
  return (
    <section className="section" style={{ backgroundColor: '#ffffff', paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
      <Container>
        <SectionHeading
          eyebrow={ABOUT_TEAM_DATA.eyebrow}
          title={ABOUT_TEAM_DATA.headline}
          subtitle={ABOUT_TEAM_DATA.description}
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2.5rem',
            maxWidth: '860px',
            margin: '0 auto',
          }}
          className="team-grid"
        >
          {ABOUT_TEAM_DATA.members.map((member, idx) => (
            <motion.div
              key={idx}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              style={{
                padding: '2.75rem 2.25rem',
                textAlign: 'center',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
              }}
            >
              {/* Avatar / Monogram */}
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem',
                  background: '#f8fafc',
                  border: '2px solid #0066ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0, 102, 255, 0.15)',
                }}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.75rem',
                      fontWeight: '800',
                      color: '#0066ff',
                    }}
                  >
                    {member.initials}
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.55rem', fontWeight: '800', marginBottom: '0.4rem', color: '#090d1a', letterSpacing: '-0.02em' }}>
                {member.name}
              </h3>

              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  color: '#0066ff',
                  marginBottom: '1.25rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {member.role}
              </div>

              <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: '1.6', margin: '0 0 1.25rem 0' }}>
                {member.bio}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                {(member.focusAreas || []).map((focus, fIdx) => (
                  <span
                    key={fIdx}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      backgroundColor: '#f1f5f9',
                      color: '#334155',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <style>{`
        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
